import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, GraduationCap, FileText, Shield, Users, Target, Zap, ArrowRight } from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  keywords: string[];
  cipRequirement?: string;
  priority?: number;
}

// Enhanced search index with CIP requirement mapping
const searchIndex: SearchItem[] = [
  // Modules with CIP requirement tags
  { id: "mod-1", title: "Module 1: Foundations of NERC and CIP", description: "NERC's role, 11 CIP standards overview", category: "Modules", path: "/modules#module-1", keywords: ["nerc", "cip", "standards", "foundations", "basics", "overview", "regional entity", "compliance"], priority: 1 },
  { id: "mod-2", title: "Module 2: Asset Identification (CIP-002)", description: "BES Cyber System categorization, impact ratings", category: "Modules", path: "/modules#module-2", keywords: ["cip-002", "assets", "bes", "cyber", "high", "medium", "low", "impact", "15 minutes", "categorization", "scope", "bright line"], cipRequirement: "CIP-002", priority: 1 },
  { id: "mod-3", title: "Module 3: Governance (CIP-003)", description: "CIP Senior Manager, policies, low-impact, CIP-003-9, TCA", category: "Modules", path: "/modules#module-3", keywords: ["cip-003", "cip-003-9", "governance", "senior manager", "policies", "cyber security policy", "low-impact", "tca", "transient", "usb", "laptop", "removable media"], cipRequirement: "CIP-003", priority: 1 },
  { id: "mod-4", title: "Module 4: Personnel & Training (CIP-004)", description: "Training, risk assessments, access revocation", category: "Modules", path: "/modules#module-4", keywords: ["cip-004", "training", "pra", "personnel risk assessment", "access revocation", "24 hours", "15 months", "background check"], cipRequirement: "CIP-004", priority: 1 },
  { id: "mod-5", title: "Module 5: Perimeters (CIP-005/CIP-006)", description: "ESP, PSP, physical and electronic access", category: "Modules", path: "/modules#module-5", keywords: ["cip-005", "cip-006", "esp", "psp", "electronic security perimeter", "physical security perimeter", "firewall", "eap", "external routable"], cipRequirement: "CIP-005/CIP-006", priority: 1 },
  { id: "mod-6", title: "Module 6: System Security (CIP-007)", description: "Patch management, ports/services, logging", category: "Modules", path: "/modules#module-6", keywords: ["cip-007", "patch", "patching", "ports", "services", "logging", "malware", "antivirus", "35 days", "r2", "r3", "r4", "r5", "patch management"], cipRequirement: "CIP-007", priority: 1 },
  { id: "mod-7", title: "Module 7: Incident Response (CIP-008/CIP-009)", description: "ES-ISAC reporting, incident classification, recovery plans", category: "Modules", path: "/modules#module-7", keywords: ["cip-008", "cip-009", "incident", "response", "recovery", "es-isac", "reportable", "lessons learned", "backup verification", "72 hours", "rci", "cyber security incident"], cipRequirement: "CIP-008/CIP-009", priority: 1 },
  { id: "mod-8", title: "Module 8: Configuration Management (CIP-010)", description: "Baseline configs, change management, vulnerability assessments", category: "Modules", path: "/modules#module-8", keywords: ["cip-010", "configuration", "baseline", "change", "vulnerability", "assessment", "tfe", "30 days", "15 months"], cipRequirement: "CIP-010", priority: 1 },
  { id: "mod-9", title: "Module 9: Information Protection (CIP-011/CIP-013)", description: "BCSI, supply chain, EACMS, PACS, vendor risk", category: "Modules", path: "/modules#module-9", keywords: ["cip-011", "cip-013", "cip-013-2", "bcsi", "information protection", "supply chain", "vendor", "eacms", "pacs", "third-party", "remote access", "15 months", "procurement", "vendor risk"], cipRequirement: "CIP-011/CIP-013", priority: 1 },
  { id: "mod-10", title: "Module 10: Audit Preparation", description: "Mock audits, evidence organization, continuous improvement", category: "Modules", path: "/modules#module-10", keywords: ["audit", "preparation", "evidence", "rsaw", "mock", "cmep", "self-assessment"], priority: 1 },
  { id: "mod-11", title: "Module 11: Control Center Communications (CIP-012)", description: "Real-time data protection, encryption, ICCP security", category: "Modules", path: "/modules#module-11", keywords: ["cip-012", "control center", "communications", "real-time", "encryption", "iccp", "integrity", "confidentiality", "data links"], cipRequirement: "CIP-012", priority: 1 },
  { id: "mod-12", title: "Module 12: Physical Security of Transmission (CIP-014)", description: "Transmission stations, risk assessment, third-party review", category: "Modules", path: "/modules#module-12", keywords: ["cip-014", "physical security", "transmission", "substation", "500 kv", "risk assessment", "third-party", "threat", "vulnerability", "ballistic", "attack"], cipRequirement: "CIP-014", priority: 1 },

  // CIP Requirements - Direct access
  { id: "req-002", title: "CIP-002 – BES Cyber System Categorization", description: "Asset identification and impact rating", category: "CIP Requirements", path: "/modules#module-2", keywords: ["cip-002", "categorization", "impact", "bes", "cyber system", "high", "medium", "low"], cipRequirement: "CIP-002", priority: 2 },
  { id: "req-003", title: "CIP-003 – Security Management Controls", description: "Policies, senior manager, low-impact requirements", category: "CIP Requirements", path: "/modules#module-3", keywords: ["cip-003", "cip-003-9", "governance", "policy", "senior manager", "low-impact"], cipRequirement: "CIP-003", priority: 2 },
  { id: "req-004", title: "CIP-004 – Personnel & Training", description: "Training, PRAs, access management", category: "CIP Requirements", path: "/modules#module-4", keywords: ["cip-004", "training", "personnel", "pra", "access", "revocation"], cipRequirement: "CIP-004", priority: 2 },
  { id: "req-005", title: "CIP-005 – Electronic Security Perimeter", description: "ESP, EAP, external routable connectivity", category: "CIP Requirements", path: "/modules#module-5", keywords: ["cip-005", "esp", "electronic", "perimeter", "firewall", "eap"], cipRequirement: "CIP-005", priority: 2 },
  { id: "req-006", title: "CIP-006 – Physical Security of BES Cyber Systems", description: "PSP, physical access controls", category: "CIP Requirements", path: "/modules#module-5", keywords: ["cip-006", "psp", "physical", "perimeter", "access"], cipRequirement: "CIP-006", priority: 2 },
  { id: "req-007", title: "CIP-007 – System Security Management", description: "Patch management, ports, logging, malware prevention", category: "CIP Requirements", path: "/modules#module-6", keywords: ["cip-007", "patch", "ports", "logging", "malware", "system security"], cipRequirement: "CIP-007", priority: 2 },
  { id: "req-007-r2", title: "CIP-007 R2 – Patch Management", description: "Security patch assessment within 35 days", category: "CIP Requirements", path: "/modules#module-6", keywords: ["cip-007", "r2", "patch", "35 days", "security patch", "assessment", "patch management"], cipRequirement: "CIP-007 R2", priority: 3 },
  { id: "req-007-r3", title: "CIP-007 R3 – Malicious Code Prevention", description: "Antivirus and malware protection", category: "CIP Requirements", path: "/modules#module-6", keywords: ["cip-007", "r3", "malware", "antivirus", "malicious code"], cipRequirement: "CIP-007 R3", priority: 3 },
  { id: "req-007-r4", title: "CIP-007 R4 – Security Event Monitoring", description: "Logging and alerting requirements", category: "CIP Requirements", path: "/modules#module-6", keywords: ["cip-007", "r4", "logging", "monitoring", "alerts", "security events"], cipRequirement: "CIP-007 R4", priority: 3 },
  { id: "req-008", title: "CIP-008 – Incident Reporting & Response", description: "Incident response plans, ES-ISAC notification", category: "CIP Requirements", path: "/modules#module-7", keywords: ["cip-008", "incident", "response", "es-isac", "reportable"], cipRequirement: "CIP-008", priority: 2 },
  { id: "req-009", title: "CIP-009 – Recovery Plans", description: "BES Cyber System recovery, backup verification", category: "CIP Requirements", path: "/modules#module-7", keywords: ["cip-009", "recovery", "backup", "verification", "continuity"], cipRequirement: "CIP-009", priority: 2 },
  { id: "req-010", title: "CIP-010 – Configuration Change Management", description: "Baselines, change control, vulnerability assessments", category: "CIP Requirements", path: "/modules#module-8", keywords: ["cip-010", "configuration", "baseline", "change", "vulnerability"], cipRequirement: "CIP-010", priority: 2 },
  { id: "req-011", title: "CIP-011 – Information Protection", description: "BCSI handling and disposal", category: "CIP Requirements", path: "/modules#module-9", keywords: ["cip-011", "bcsi", "information", "protection", "disposal"], cipRequirement: "CIP-011", priority: 2 },
  { id: "req-012", title: "CIP-012 – Control Center Communications", description: "Real-time monitoring and control data protection", category: "CIP Requirements", path: "/modules#module-11", keywords: ["cip-012", "control center", "communications", "encryption"], cipRequirement: "CIP-012", priority: 2 },
  { id: "req-013", title: "CIP-013 – Supply Chain Risk Management", description: "Vendor risk management, EACMS/PACS procurement", category: "CIP Requirements", path: "/modules#module-9", keywords: ["cip-013", "supply chain", "vendor", "risk", "eacms", "pacs"], cipRequirement: "CIP-013", priority: 2 },
  { id: "req-014", title: "CIP-014 – Physical Security of Transmission", description: "Critical transmission stations, third-party review", category: "CIP Requirements", path: "/modules#module-12", keywords: ["cip-014", "physical security", "transmission", "substation"], cipRequirement: "CIP-014", priority: 2 },

  // Key Topics - Direct jumps
  { id: "topic-patch", title: "Patch Management", description: "CIP-007 R2 requirements and best practices", category: "Key Topics", path: "/modules#module-6", keywords: ["patch", "patching", "35 days", "cip-007", "r2"], cipRequirement: "CIP-007 R2", priority: 3 },
  { id: "topic-tca", title: "Transient Cyber Assets (TCA)", description: "USB drives, laptops, and removable media", category: "Key Topics", path: "/scope-matrix", keywords: ["tca", "transient", "usb", "laptop", "removable", "media"], priority: 3 },
  { id: "topic-esisac", title: "ES-ISAC Reporting", description: "Incident notification requirements and timelines", category: "Key Topics", path: "/modules#module-7", keywords: ["es-isac", "reporting", "notification", "72 hours", "incident"], cipRequirement: "CIP-008", priority: 3 },
  { id: "topic-pra", title: "Personnel Risk Assessment (PRA)", description: "Background checks and seven-year requirements", category: "Key Topics", path: "/modules#module-4", keywords: ["pra", "personnel", "risk", "assessment", "background", "check", "seven year"], cipRequirement: "CIP-004", priority: 3 },
  { id: "topic-bcsi", title: "BES Cyber System Information (BCSI)", description: "Handling sensitive system information", category: "Key Topics", path: "/modules#module-9", keywords: ["bcsi", "information", "protection", "sensitive", "handling"], cipRequirement: "CIP-011", priority: 3 },
  { id: "topic-revocation", title: "Access Revocation", description: "24-hour termination requirements", category: "Key Topics", path: "/modules#module-4", keywords: ["revocation", "access", "24 hours", "termination", "removal"], cipRequirement: "CIP-004 R5", priority: 3 },

  // Tools & Resources
  { id: "tool-scope", title: "Scope & TCA Matrix", description: "Asset classification and transient cyber assets", category: "Tools", path: "/scope-matrix", keywords: ["scope", "matrix", "tca", "transient", "usb", "laptop", "classification", "cip-002"], priority: 2 },
  { id: "tool-simulator", title: "Audit Request Simulator", description: "Practice responding to audit requests", category: "Tools", path: "/audit-simulator", keywords: ["simulator", "practice", "audit", "requests"], priority: 2 },
  { id: "tool-evidence", title: "Evidence Lab", description: "Evidence organization and sample artifacts", category: "Tools", path: "/evidence-lab", keywords: ["evidence", "lab", "artifacts", "documentation"], priority: 2 },
  { id: "tool-readiness", title: "Readiness Plan Builder", description: "Build your compliance readiness plan", category: "Tools", path: "/readiness-plan", keywords: ["readiness", "plan", "builder"], priority: 2 },
  { id: "tool-rsaw", title: "RSAW Tutorial", description: "How to complete RSAWs with examples", category: "Tools", path: "/rsaw-tutorial", keywords: ["rsaw", "reliability standard audit worksheet", "template", "evidence", "response", "audit worksheet"], priority: 2 },

  // Pages
  { id: "page-getstarted", title: "Get Started", description: "Guided onboarding and learning path", category: "Pages", path: "/get-started", keywords: ["start", "begin", "onboarding", "new", "first"], priority: 1 },
  { id: "page-101", title: "NERC CIP 101", description: "Introduction to NERC CIP fundamentals", category: "Pages", path: "/nerc-cip-101", keywords: ["101", "introduction", "basics", "nerc", "cip"], priority: 2 },
  { id: "page-audit", title: "Audit Journey", description: "90-day audit timeline and preparation", category: "Pages", path: "/audit-journey", keywords: ["audit", "timeline", "90 day", "preparation", "journey", "cmep"], priority: 2 },
  { id: "page-soft", title: "Auditor Etiquette Training", description: "Interview skills and the 'I don't know' protocol", category: "Pages", path: "/soft-skills", keywords: ["soft skills", "interview", "etiquette", "auditor", "i don't know", "sme"], priority: 2 },
  { id: "page-case", title: "Case Studies", description: "Real-world compliance scenarios", category: "Pages", path: "/case-studies", keywords: ["case", "studies", "scenarios", "examples"], priority: 2 },
  { id: "page-resources", title: "Resources & Templates", description: "Downloadable templates and glossary", category: "Pages", path: "/resources", keywords: ["resources", "templates", "downloads", "glossary"], priority: 2 },
  { id: "page-manager", title: "Manager Guide", description: "Guide for team-based training delivery", category: "Pages", path: "/manager-guide", keywords: ["manager", "guide", "team", "training", "rollout"], priority: 2 },

  // Role Training
  { id: "role-compliance", title: "Compliance Manager Training", description: "Training path for compliance professionals", category: "Role Training", path: "/role-training/compliance", keywords: ["compliance", "manager", "role", "training"], priority: 2 },
  { id: "role-it", title: "IT/OT Engineer Training", description: "Training path for technical staff", category: "Role Training", path: "/role-training/it-ot", keywords: ["it", "ot", "engineer", "technical", "role", "training"], priority: 2 },
  { id: "role-physical", title: "Physical Security Training", description: "Training path for physical security", category: "Role Training", path: "/role-training/physical-security", keywords: ["physical", "security", "role", "training"], priority: 2 },
  { id: "role-hr", title: "HR/Training Training", description: "Training path for HR and training professionals", category: "Role Training", path: "/role-training/hr-training", keywords: ["hr", "human resources", "training", "role"], priority: 2 },
  { id: "role-leadership", title: "Leadership Training", description: "Training path for executives and managers", category: "Role Training", path: "/role-training/leadership", keywords: ["leadership", "executive", "manager", "role", "training"], priority: 2 },

  // Glossary terms
  { id: "term-bes", title: "BES (Bulk Electric System)", description: "The electrical generation, transmission, and interconnection facilities", category: "Glossary", path: "/resources#glossary", keywords: ["bes", "bulk", "electric", "system"], priority: 4 },
  { id: "term-esp", title: "ESP (Electronic Security Perimeter)", description: "Logical border surrounding networks with BES Cyber Systems", category: "Glossary", path: "/resources#glossary", keywords: ["esp", "electronic", "security", "perimeter", "network"], priority: 4 },
  { id: "term-psp", title: "PSP (Physical Security Perimeter)", description: "Physical border around locations housing BES Cyber Systems", category: "Glossary", path: "/resources#glossary", keywords: ["psp", "physical", "security", "perimeter"], priority: 4 },
  { id: "term-eacms", title: "EACMS (Electronic Access Control/Monitoring)", description: "Systems that control or monitor electronic access", category: "Glossary", path: "/resources#glossary", keywords: ["eacms", "access", "control", "monitoring", "electronic"], priority: 4 },
  { id: "term-pacs", title: "PACS (Physical Access Control Systems)", description: "Systems that control physical access to PSPs", category: "Glossary", path: "/resources#glossary", keywords: ["pacs", "physical", "access", "control", "badge"], priority: 4 },
  { id: "term-rsaw", title: "RSAW (Reliability Standard Audit Worksheet)", description: "Official audit checklist from Regional Entities", category: "Glossary", path: "/resources#glossary", keywords: ["rsaw", "audit", "worksheet", "checklist"], priority: 4 },
];

// CIP requirement suggestions for context-aware search
const cipSuggestions: Record<string, { requirement: string; path: string }> = {
  'patch': { requirement: 'CIP-007 R2', path: '/modules#module-6' },
  'patching': { requirement: 'CIP-007 R2', path: '/modules#module-6' },
  'training': { requirement: 'CIP-004', path: '/modules#module-4' },
  'access': { requirement: 'CIP-004/CIP-005', path: '/modules#module-4' },
  'revocation': { requirement: 'CIP-004 R5', path: '/modules#module-4' },
  'incident': { requirement: 'CIP-008', path: '/modules#module-7' },
  'recovery': { requirement: 'CIP-009', path: '/modules#module-7' },
  'logging': { requirement: 'CIP-007 R4', path: '/modules#module-6' },
  'configuration': { requirement: 'CIP-010', path: '/modules#module-8' },
  'baseline': { requirement: 'CIP-010', path: '/modules#module-8' },
  'vendor': { requirement: 'CIP-013', path: '/modules#module-9' },
  'supply chain': { requirement: 'CIP-013', path: '/modules#module-9' },
  'bcsi': { requirement: 'CIP-011', path: '/modules#module-9' },
  'physical': { requirement: 'CIP-006/CIP-014', path: '/modules#module-5' },
  'esp': { requirement: 'CIP-005', path: '/modules#module-5' },
  'psp': { requirement: 'CIP-006', path: '/modules#module-5' },
  'tca': { requirement: 'CIP-003-9', path: '/scope-matrix' },
  'transient': { requirement: 'CIP-003-9', path: '/scope-matrix' },
  'usb': { requirement: 'CIP-003-9', path: '/scope-matrix' },
};

export function EnhancedGlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((path: string) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  }, [navigate]);

  // Get CIP suggestion based on query
  const cipSuggestion = useMemo(() => {
    if (!query) return null;
    const lowerQuery = query.toLowerCase();
    for (const [keyword, suggestion] of Object.entries(cipSuggestions)) {
      if (lowerQuery.includes(keyword)) {
        return suggestion;
      }
    }
    return null;
  }, [query]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    if (!query) return searchIndex;
    
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(item => {
        const searchString = `${item.title} ${item.description} ${item.keywords.join(" ")} ${item.cipRequirement || ""}`.toLowerCase();
        return searchString.includes(lowerQuery);
      })
      .sort((a, b) => (a.priority || 5) - (b.priority || 5));
  }, [query]);

  const groupedItems = useMemo(() => {
    return filteredResults.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, SearchItem[]>);
  }, [filteredResults]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Modules":
        return <BookOpen className="h-4 w-4 mr-2 text-primary" />;
      case "CIP Requirements":
        return <Shield className="h-4 w-4 mr-2 text-accent" />;
      case "Key Topics":
        return <Zap className="h-4 w-4 mr-2 text-warning" />;
      case "Tools":
        return <Target className="h-4 w-4 mr-2 text-teal" />;
      case "Pages":
        return <FileText className="h-4 w-4 mr-2 text-muted-foreground" />;
      case "Role Training":
        return <Users className="h-4 w-4 mr-2 text-primary" />;
      case "Glossary":
        return <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />;
      default:
        return <Shield className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search CIP topics...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search modules, CIP requirements, topics..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {/* CIP Requirement Suggestion */}
          {cipSuggestion && (
            <>
              <CommandGroup heading="Suggested CIP Requirement">
                <CommandItem
                  onSelect={() => handleSelect(cipSuggestion.path)}
                  className="cursor-pointer"
                >
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Go to {cipSuggestion.requirement}</span>
                      <Badge variant="secondary" className="text-[10px]">Suggested</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Jump directly to this requirement's module
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandEmpty>No results found. Try a CIP requirement number or topic.</CommandEmpty>
          
          {Object.entries(groupedItems).map(([category, items], index) => (
            <div key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {items.slice(0, category === "Glossary" ? 3 : 5).map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.keywords.join(" ")} ${item.cipRequirement || ""}`}
                    onSelect={() => handleSelect(item.path)}
                    className="cursor-pointer"
                  >
                    {getCategoryIcon(category)}
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                        {item.cipRequirement && (
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            {item.cipRequirement}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">{item.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
