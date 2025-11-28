import { useState, useEffect, useCallback } from "react";
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
import { Search, BookOpen, GraduationCap, FileText, Shield, Users, Target } from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  keywords: string[];
}

const searchIndex: SearchItem[] = [
  // Modules
  { id: "mod-1", title: "Module 1: Foundations of NERC and CIP", description: "NERC's role, 11 CIP standards overview", category: "Modules", path: "/modules", keywords: ["nerc", "cip", "standards", "foundations", "basics", "overview"] },
  { id: "mod-2", title: "Module 2: Asset Identification (CIP-002)", description: "BES Cyber System categorization, impact ratings", category: "Modules", path: "/modules", keywords: ["cip-002", "assets", "bes", "cyber", "high", "medium", "low", "impact", "15 minutes", "categorization"] },
  { id: "mod-3", title: "Module 3: Governance (CIP-003)", description: "CIP Senior Manager, policies, low-impact", category: "Modules", path: "/modules", keywords: ["cip-003", "governance", "senior manager", "policies", "cyber security policy"] },
  { id: "mod-4", title: "Module 4: Personnel & Training (CIP-004)", description: "Training, risk assessments, access revocation", category: "Modules", path: "/modules", keywords: ["cip-004", "training", "pra", "personnel risk assessment", "access revocation", "24 hours"] },
  { id: "mod-5", title: "Module 5: Perimeters (CIP-005/CIP-006)", description: "ESP, PSP, physical and electronic access", category: "Modules", path: "/modules", keywords: ["cip-005", "cip-006", "esp", "psp", "electronic security perimeter", "physical security perimeter", "firewall"] },
  { id: "mod-6", title: "Module 6: System Security (CIP-007)", description: "Patch management, ports/services, logging", category: "Modules", path: "/modules", keywords: ["cip-007", "patch", "patching", "ports", "services", "logging", "malware", "antivirus"] },
  { id: "mod-7", title: "Module 7: Incident Response (CIP-008/CIP-009)", description: "Incident handling, recovery plans", category: "Modules", path: "/modules", keywords: ["cip-008", "cip-009", "incident", "response", "recovery", "es-isac", "reportable"] },
  { id: "mod-8", title: "Module 8: Configuration Management (CIP-010)", description: "Baseline configs, change management, vulnerability assessments", category: "Modules", path: "/modules", keywords: ["cip-010", "configuration", "baseline", "change", "vulnerability", "assessment"] },
  { id: "mod-9", title: "Module 9: Information Protection (CIP-011/CIP-013)", description: "BCSI, supply chain risk", category: "Modules", path: "/modules", keywords: ["cip-011", "cip-013", "bcsi", "information protection", "supply chain", "vendor"] },
  { id: "mod-10", title: "Module 10: Audit Preparation", description: "Mock audits, evidence organization, continuous improvement", category: "Modules", path: "/modules", keywords: ["audit", "preparation", "evidence", "rsaw", "mock"] },
  
  // Pages
  { id: "page-101", title: "NERC CIP 101", description: "Introduction to NERC CIP fundamentals", category: "Pages", path: "/nerc-cip-101", keywords: ["101", "introduction", "basics", "nerc", "cip"] },
  { id: "page-audit", title: "Audit Journey", description: "90-day audit timeline and preparation", category: "Pages", path: "/audit-journey", keywords: ["audit", "timeline", "90 day", "preparation", "journey"] },
  { id: "page-soft", title: "Auditor Etiquette Training", description: "Interview skills and the 'I don't know' protocol", category: "Pages", path: "/soft-skills", keywords: ["soft skills", "interview", "etiquette", "auditor", "i don't know"] },
  { id: "page-scope", title: "Scope Matrix & TCA Guidance", description: "Asset classification and transient cyber assets", category: "Pages", path: "/scope-matrix", keywords: ["scope", "matrix", "tca", "transient", "usb", "laptop", "classification"] },
  { id: "page-sim", title: "Audit Request Simulator", description: "Practice responding to audit requests", category: "Pages", path: "/audit-simulator", keywords: ["simulator", "practice", "audit", "requests"] },
  { id: "page-evidence", title: "Evidence Lab", description: "Evidence organization and sample artifacts", category: "Pages", path: "/evidence-lab", keywords: ["evidence", "lab", "artifacts", "documentation"] },
  { id: "page-readiness", title: "Readiness Plan Builder", description: "Build your compliance readiness plan", category: "Pages", path: "/readiness-plan", keywords: ["readiness", "plan", "builder"] },
  { id: "page-case", title: "Case Studies", description: "Real-world compliance scenarios", category: "Pages", path: "/case-studies", keywords: ["case", "studies", "scenarios", "examples"] },
  { id: "page-resources", title: "Resources & Templates", description: "Downloadable templates and glossary", category: "Pages", path: "/resources", keywords: ["resources", "templates", "downloads", "glossary"] },
  
  // Role Training
  { id: "role-compliance", title: "Compliance Manager Training", description: "Training path for compliance professionals", category: "Role Training", path: "/role-training/compliance", keywords: ["compliance", "manager", "role", "training"] },
  { id: "role-it", title: "IT/OT Engineer Training", description: "Training path for technical staff", category: "Role Training", path: "/role-training/it-ot", keywords: ["it", "ot", "engineer", "technical", "role", "training"] },
  { id: "role-physical", title: "Physical Security Training", description: "Training path for physical security", category: "Role Training", path: "/role-training/physical-security", keywords: ["physical", "security", "role", "training"] },
  { id: "role-hr", title: "HR/Training Training", description: "Training path for HR and training professionals", category: "Role Training", path: "/role-training/hr-training", keywords: ["hr", "human resources", "training", "role"] },
  { id: "role-leadership", title: "Leadership Training", description: "Training path for executives and managers", category: "Role Training", path: "/role-training/leadership", keywords: ["leadership", "executive", "manager", "role", "training"] },

  // Glossary terms
  { id: "term-bes", title: "BES (Bulk Electric System)", description: "The electrical generation, transmission, and interconnection facilities", category: "Glossary", path: "/resources#glossary", keywords: ["bes", "bulk", "electric", "system"] },
  { id: "term-bcsi", title: "BCSI (BES Cyber System Information)", description: "Sensitive information about BES Cyber Systems", category: "Glossary", path: "/resources#glossary", keywords: ["bcsi", "information", "protection", "sensitive"] },
  { id: "term-esp", title: "ESP (Electronic Security Perimeter)", description: "Logical border surrounding networks with BES Cyber Systems", category: "Glossary", path: "/resources#glossary", keywords: ["esp", "electronic", "security", "perimeter", "network"] },
  { id: "term-psp", title: "PSP (Physical Security Perimeter)", description: "Physical border around locations housing BES Cyber Systems", category: "Glossary", path: "/resources#glossary", keywords: ["psp", "physical", "security", "perimeter"] },
  { id: "term-eacms", title: "EACMS (Electronic Access Control/Monitoring)", description: "Systems that control or monitor electronic access", category: "Glossary", path: "/resources#glossary", keywords: ["eacms", "access", "control", "monitoring", "electronic"] },
  { id: "term-pacs", title: "PACS (Physical Access Control Systems)", description: "Systems that control physical access to PSPs", category: "Glossary", path: "/resources#glossary", keywords: ["pacs", "physical", "access", "control", "badge"] },
  { id: "term-rsaw", title: "RSAW (Reliability Standard Audit Worksheet)", description: "Official audit checklist from Regional Entities", category: "Glossary", path: "/resources#glossary", keywords: ["rsaw", "audit", "worksheet", "checklist"] },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
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
    navigate(path);
  }, [navigate]);

  const groupedItems = searchIndex.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Modules":
        return <BookOpen className="h-4 w-4 mr-2" />;
      case "Pages":
        return <FileText className="h-4 w-4 mr-2" />;
      case "Role Training":
        return <Users className="h-4 w-4 mr-2" />;
      case "Glossary":
        return <Target className="h-4 w-4 mr-2" />;
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
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, pages, terms..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {Object.entries(groupedItems).map(([category, items], index) => (
            <div key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.keywords.join(" ")}`}
                    onSelect={() => handleSelect(item.path)}
                    className="cursor-pointer"
                  >
                    {getCategoryIcon(category)}
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
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
