import { Layout } from "@/components/layout/Layout";
import { InteractiveChecklist } from "@/components/InteractiveChecklist";
import { SampleArtifact } from "@/components/SampleArtifact";
import { sampleArtifacts } from "@/data/sampleArtifactsData";
import { cn } from "@/lib/utils";
import { 
  FileSearch, 
  CheckCircle2, 
  XCircle, 
  FolderTree, 
  AlertTriangle,
  Lightbulb,
  Target,
  FileText
} from "lucide-react";

const strongVsWeak = [
  { category: "Training Records", strong: "Sign-in sheet with dates, specific training content list, quiz scores, and trainer signature", weak: "Email saying 'Training completed' without specifics" },
  { category: "Access Reviews", strong: "Screenshot of access list with reviewer initials, date, and documented approval/removal actions", weak: "Calendar reminder that review was scheduled" },
  { category: "Log Reviews", strong: "Summary report documenting review date, logs examined, findings, and any follow-up actions", weak: "Assumption that logging is enabled" },
  { category: "Configuration Changes", strong: "Change ticket with request, approval, implementation steps, testing, and sign-off", weak: "Verbal confirmation that change was made" },
  { category: "Patch Management", strong: "Assessment document dated within 35 days of patch release with disposition and timeline", weak: "Patch installed without documented assessment" }
];

const evidenceTypes = [
  { standard: "CIP-004 Training", examples: ["Training sign-in sheets", "Completion certificates", "Quiz results", "Training content materials"] },
  { standard: "CIP-005 Network Security", examples: ["Firewall rule exports", "Network diagrams", "Access control lists", "VPN configuration docs"] },
  { standard: "CIP-007 Patching", examples: ["Patch assessment forms", "Implementation records", "Mitigation plans", "Vendor advisories"] },
  { standard: "CIP-008 Incident Response", examples: ["Incident reports", "Tabletop exercise records", "Plan test results", "Post-mortem analyses"] }
];

const folderStructure = [
  { name: "CIP-002 - BES Cyber System Categorization", indent: 0 },
  { name: "R1 - Impact Categorization", indent: 1 },
  { name: "Asset_Inventory_2024.xlsx", indent: 2 },
  { name: "Categorization_Methodology.pdf", indent: 2 },
  { name: "CIP-004 - Personnel & Training", indent: 0 },
  { name: "R2 - Training Program", indent: 1 },
  { name: "2024-Q1_Training_Records", indent: 2 },
  { name: "2024-Q2_Training_Records", indent: 2 },
  { name: "CIP-007 - System Security Management", indent: 0 },
  { name: "R2 - Patch Management", indent: 1 },
  { name: "2024_Patch_Assessments", indent: 2 },
  { name: "Implementation_Records", indent: 2 },
];

const checklistItems = [
  { id: "folder-structure", label: "We have a clear folder structure organized by CIP requirement" },
  { id: "naming-conventions", label: "We use consistent naming conventions with dates and asset identifiers" },
  { id: "retrieval-time", label: "We can find any evidence item in under 2 minutes" },
  { id: "dates-parties", label: "All evidence includes dates and responsible parties" },
  { id: "version-control", label: "We maintain version control for policies and procedures" },
  { id: "backup-evidence", label: "Evidence is backed up and protected from loss" }
];

const exerciseSteps = [
  { step: 1, title: "Choose one CIP standard", description: "Select a standard your organization must comply with (e.g., CIP-007 System Security)." },
  { step: 2, title: "List the main controls", description: "Identify 3-5 key controls or requirements within that standard for your environment." },
  { step: 3, title: "Identify evidence types", description: "For each control, determine what evidence would prove compliance (logs, reports, screenshots)." },
  { step: 4, title: "Document ownership", description: "Decide where that evidence will live and who is responsible for collecting and maintaining it." }
];

export default function EvidenceLab() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Evidence & Documentation Lab</h1>
            <p className="text-lg text-muted-foreground">
              Learn how to create, organize, and maintain the evidence that proves your compliance. 
              If it is not documented, it did not happen.
            </p>
          </div>
        </div>
      </section>

      {/* What Counts as Evidence */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">What Counts as Evidence</h2>
            <p className="text-muted-foreground mb-6">
              Evidence is documentation that proves a compliance activity occurred. Different CIP standards require different types of evidence:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {evidenceTypes.map((type) => (
                <div key={type.standard} className="bg-card rounded-xl border border-border/50 p-5">
                  <h3 className="font-semibold text-navy mb-3">{type.standard}</h3>
                  <ul className="space-y-1">
                    {type.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" /> {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber shrink-0" />
              <div>
                <h4 className="font-semibold text-navy mb-1">Remember</h4>
                <p className="text-sm text-muted-foreground">
                  Auditors cannot give credit for activities you performed but cannot prove. Create evidence as a natural part of doing compliance work—not as an afterthought.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong vs Weak */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Strong vs Weak Evidence</h2>
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <div className="grid grid-cols-3 bg-navy text-navy-foreground text-sm font-semibold">
                <div className="p-4">Category</div>
                <div className="p-4 border-l border-navy-foreground/20 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Strong</div>
                <div className="p-4 border-l border-navy-foreground/20 flex items-center gap-2"><XCircle className="h-4 w-4 text-destructive" /> Weak</div>
              </div>
              {strongVsWeak.map((item, i) => (
                <div key={item.category} className={cn("grid grid-cols-3 text-sm", i % 2 === 0 ? "bg-card" : "bg-muted/30")}>
                  <div className="p-4 font-medium text-navy">{item.category}</div>
                  <div className="p-4 border-l border-border text-muted-foreground">{item.strong}</div>
                  <div className="p-4 border-l border-border text-muted-foreground">{item.weak}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organization */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FolderTree className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-navy">Evidence Organization Patterns</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Organize evidence to mirror CIP requirements so auditors can navigate your repository easily.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-semibold text-navy mb-4">Example Folder Structure</h3>
                <div className="font-mono text-sm space-y-1">
                  {folderStructure.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground" style={{ paddingLeft: `${item.indent * 20}px` }}>
                      <span className="text-primary">{item.indent < 2 ? "📁" : "📄"}</span> {item.name}
                    </div>
                  ))}
                </div>
              </div>
              <InteractiveChecklist title="Evidence Organization Checklist" items={checklistItems} storagePrefix="evidence-lab" />
            </div>
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-6 flex gap-4">
              <Lightbulb className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-navy mb-1">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Use naming conventions like "CIP007-R2_PatchAssessment_2024-Q4_SCADA-01.pdf"—it tells you exactly what the document is without opening it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guided Exercise */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-navy">Guided Exercise: Build Your Evidence Map</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Follow these steps to create an evidence map for one CIP standard in your environment:
            </p>
            <div className="space-y-4">
              {exerciseSteps.map((step) => (
                <div key={step.step} className="bg-card rounded-xl border border-border/50 p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Artifacts */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-navy">Sample Artifacts</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              See examples of what audit-ready evidence looks like. These samples demonstrate the level of detail 
              and organization that auditors expect.
            </p>
            <div className="space-y-6">
              {sampleArtifacts.map((artifact) => (
                <SampleArtifact key={artifact.id} artifact={artifact} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
