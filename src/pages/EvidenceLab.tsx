import { Layout } from "@/components/layout/Layout";
import { 
  FileSearch, 
  CheckCircle2, 
  XCircle, 
  FolderTree, 
  Timer,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

const strongVsWeak = [
  {
    category: "Training Records",
    strong: "Sign-in sheet with dates, specific training content list, quiz scores, and trainer signature",
    weak: "Email saying 'Training completed' without specifics"
  },
  {
    category: "Access Reviews",
    strong: "Screenshot of access list with reviewer initials, date, and documented approval/removal actions",
    weak: "Calendar reminder that review was scheduled"
  },
  {
    category: "Log Reviews",
    strong: "Summary report documenting review date, logs examined, findings, and any follow-up actions",
    weak: "Assumption that logging is enabled"
  },
  {
    category: "Configuration Changes",
    strong: "Change ticket with request, approval, implementation steps, testing, and sign-off",
    weak: "Verbal confirmation that change was made"
  },
  {
    category: "Patch Management",
    strong: "Assessment document dated within 35 days of patch release with disposition and timeline",
    weak: "Patch installed without documented assessment"
  }
];

const folderStructure = [
  { name: "CIP-002 - BES Cyber System Categorization", indent: 0 },
  { name: "R1 - Impact Categorization", indent: 1 },
  { name: "Asset Inventory 2024.xlsx", indent: 2 },
  { name: "Categorization Methodology.pdf", indent: 2 },
  { name: "R2 - Review and Approval", indent: 1 },
  { name: "CIP-004 - Personnel & Training", indent: 0 },
  { name: "R1 - Security Awareness", indent: 1 },
  { name: "Awareness Materials", indent: 2 },
  { name: "Distribution Records", indent: 2 },
  { name: "R2 - Training Program", indent: 1 },
  { name: "Training Content", indent: 2 },
  { name: "Completion Records", indent: 2 },
  { name: "R3 - Personnel Risk Assessment", indent: 1 },
  { name: "CIP-007 - System Security Management", indent: 0 },
  { name: "R1 - Ports and Services", indent: 1 },
  { name: "R2 - Patch Management", indent: 1 },
  { name: "Assessments", indent: 2 },
  { name: "Implementation Records", indent: 2 },
];

const exerciseSteps = [
  {
    step: 1,
    prompt: "Find the most recent quarterly access review for your highest-impact BES Cyber System",
    timeTarget: "Under 2 minutes"
  },
  {
    step: 2,
    prompt: "Locate evidence that a specific employee completed CIP training before being granted access",
    timeTarget: "Under 3 minutes"
  },
  {
    step: 3,
    prompt: "Retrieve the patch assessment for the last critical security patch affecting your control systems",
    timeTarget: "Under 2 minutes"
  }
];

export default function EvidenceLab() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Evidence & Documentation Lab
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how to create, organize, and maintain the evidence that proves your compliance. 
              If it is not documented, it did not happen.
            </p>
          </div>
        </div>
      </section>

      {/* What Auditors Consider Evidence */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-4">What Auditors Consider Evidence</h2>
            <p className="text-muted-foreground mb-6">
              Evidence is documentation that proves a compliance activity occurred. Auditors are looking 
              for artifacts that demonstrate you did what you were supposed to do, when you were supposed 
              to do it, and that appropriate people were involved.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-semibold text-navy mb-3">Good Evidence Includes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Specific dates showing when activities occurred
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Names or roles of individuals who performed or approved actions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Screenshots, logs, or exports from systems
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Signatures or documented approvals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    Version numbers and effective dates on policies
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-semibold text-navy mb-3">Weak Evidence Includes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    Undated documents or records
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    Verbal claims without documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    Generic statements without specifics
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    Evidence created after the fact
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    Documents that cannot be tied to specific systems or periods
                  </li>
                </ul>
              </div>
            </div>

            {/* Tip Callout */}
            <div className="bg-amber/10 border border-amber/30 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber shrink-0" />
              <div>
                <h4 className="font-semibold text-navy mb-1">Remember This</h4>
                <p className="text-sm text-muted-foreground">
                  If it is not documented, it did not happen. Auditors cannot give you credit for activities 
                  you performed but cannot prove. Create evidence as a natural part of doing compliance 
                  work—not as an afterthought.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong vs Weak Evidence */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Strong vs Weak Evidence</h2>
            
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <div className="grid grid-cols-3 bg-navy text-navy-foreground text-sm font-semibold">
                <div className="p-4">Category</div>
                <div className="p-4 border-l border-navy-foreground/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Strong Evidence
                  </div>
                </div>
                <div className="p-4 border-l border-navy-foreground/20">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-destructive" />
                    Weak Evidence
                  </div>
                </div>
              </div>
              
              {strongVsWeak.map((item, index) => (
                <div key={item.category} className={cn("grid grid-cols-3 text-sm", index % 2 === 0 ? "bg-card" : "bg-muted/30")}>
                  <div className="p-4 font-medium text-navy">{item.category}</div>
                  <div className="p-4 border-l border-border text-muted-foreground">{item.strong}</div>
                  <div className="p-4 border-l border-border text-muted-foreground">{item.weak}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Evidence */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FolderTree className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-navy">Organizing Evidence by Requirement</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              A well-organized evidence repository mirrors the structure of the CIP standards themselves. 
              When an auditor asks for evidence of CIP-007 R2 patch management, you should be able to 
              navigate directly to that folder and find what they need.
            </p>

            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="font-semibold text-navy mb-4">Example Folder Structure</h3>
              <div className="font-mono text-sm space-y-1">
                {folderStructure.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 text-muted-foreground"
                    style={{ paddingLeft: `${item.indent * 24}px` }}
                  >
                    <span className="text-primary">{item.indent < 2 ? "📁" : "📄"}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Tip Callout */}
            <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-6 flex gap-4">
              <Lightbulb className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-navy mb-1">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Use consistent naming conventions that include dates. For example: 
                  "CIP007-R2_PatchAssessment_2024-Q4_SCADA-Server-01.pdf" tells you exactly what the 
                  document is without opening it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Retrieval Exercise */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Timer className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-navy">How Fast Can You Find It?</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              During an audit, you will be asked to produce evidence for specific requirements. 
              Practice retrieving evidence quickly with this exercise. Time yourself on each prompt.
            </p>

            <div className="space-y-4">
              {exerciseSteps.map((exercise) => (
                <div key={exercise.step} className="bg-card rounded-xl border border-border/50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shrink-0">
                      {exercise.step}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-navy mb-2">{exercise.prompt}</p>
                      <div className="flex items-center gap-2 text-sm text-accent">
                        <Timer className="h-4 w-4" />
                        Target: {exercise.timeTarget}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                If any of these took longer than the target time, your evidence organization needs work. 
                Auditors notice when you struggle to find documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
