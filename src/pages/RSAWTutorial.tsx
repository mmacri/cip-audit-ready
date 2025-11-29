import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  ArrowRight,
  ClipboardCheck,
  BookOpen,
  Target,
  Lightbulb,
  Search,
  FileSearch
} from "lucide-react";

interface RSAWSection {
  id: string;
  title: string;
  description: string;
  fields: {
    name: string;
    guidance: string;
    example?: string;
    commonMistakes?: string[];
  }[];
}

const rsawSections: RSAWSection[] = [
  {
    id: "requirement-info",
    title: "Requirement Information",
    description: "The top section identifies the specific CIP requirement being evaluated",
    fields: [
      {
        name: "Standard & Requirement Number",
        guidance: "Pre-populated by the Regional Entity (e.g., CIP-007-6 R2)",
        example: "CIP-007-6 R2 - Patch Management"
      },
      {
        name: "Requirement Language",
        guidance: "The exact text of the requirement. Read this carefully—compliance is measured against the precise language.",
        example: "Each Responsible Entity shall implement one or more documented process(es) that collectively include..."
      },
      {
        name: "Applicable Systems",
        guidance: "Lists which system types (High, Medium, Low impact) the requirement applies to. Check if your systems are in scope.",
        example: "High Impact BES Cyber Systems and their associated: EACMS, PACS, PCA"
      }
    ]
  },
  {
    id: "evidence-request",
    title: "Evidence Request",
    description: "What the auditor is asking you to provide",
    fields: [
      {
        name: "Evidence Requested",
        guidance: "Specific documentation or records the auditor needs. Provide exactly what is requested—no more, no less.",
        example: "Provide patch assessment records for all applicable BES Cyber Systems for the audit period showing: source identification, assessment dates, disposition, and mitigation plans if applicable.",
        commonMistakes: [
          "Providing too much information that opens new audit threads",
          "Providing evidence outside the requested audit period",
          "Missing specific elements mentioned in the request"
        ]
      }
    ]
  },
  {
    id: "registered-entity",
    title: "Registered Entity Response Section",
    description: "This is where YOU document your compliance demonstration",
    fields: [
      {
        name: "Narrative Response",
        guidance: "Explain HOW you comply. Be specific about your process, reference your procedures, and point to the evidence you're providing.",
        example: "Per our Patch Management Procedure (PM-001 Rev 3), we identify security patches from tracked sources within 35 days of release. Our Patch Tracker (Exhibit A) documents each assessment. For patches not applied, we document technical basis and mitigation plans per R2.3."
      },
      {
        name: "Evidence References",
        guidance: "List each piece of evidence by exhibit number or filename. Use a consistent naming convention.",
        example: "Exhibit A: Patch Assessment Tracker 2024\nExhibit B: Patch Management Procedure PM-001 Rev 3\nExhibit C: Sample Mitigation Plan for CVE-2024-1234"
      },
      {
        name: "Evidence File Naming",
        guidance: "Use clear, consistent naming: [Standard]-[Req]-[Description]-[Date/Period]",
        example: "CIP007-R2-PatchTracker-Q1-2024.xlsx",
        commonMistakes: [
          "Vague filenames like 'evidence.pdf' or 'document1.docx'",
          "No date or version information",
          "Different naming conventions across evidence sets"
        ]
      }
    ]
  },
  {
    id: "compliance-assessment",
    title: "Compliance Assessment (Auditor Section)",
    description: "How auditors will evaluate your response",
    fields: [
      {
        name: "Compliance Determination",
        guidance: "Auditors assess: Compliant, Non-Compliant, or Unable to Determine. Unable to Determine usually leads to additional requests.",
        example: "Compliant - Evidence demonstrates implementation of documented patch assessment process within required timeframes."
      },
      {
        name: "Auditor Notes",
        guidance: "Auditors document their analysis. Review any notes—they may indicate areas of concern even if compliant.",
        example: "Reviewed 47 patch assessments from audit period. All assessments completed within 35 days. Mitigation plans properly documented for 3 patches with delayed implementation."
      }
    ]
  }
];

const rsawTips = [
  {
    category: "Before the Audit",
    tips: [
      "Download a blank RSAW template from your Regional Entity to understand the format",
      "Pre-stage evidence for each requirement during your normal operations",
      "Use the RSAW structure to organize your evidence folders",
      "Conduct internal assessments using the RSAW before official audits"
    ]
  },
  {
    category: "Writing Responses",
    tips: [
      "Reference specific procedure names and version numbers",
      "Point directly to the evidence that demonstrates each element of the requirement",
      "Use consistent terminology that matches your documented procedures",
      "Be specific about timeframes and quantities when relevant"
    ]
  },
  {
    category: "Common Pitfalls",
    tips: [
      "Don't volunteer information beyond what's requested",
      "Don't use vague language like 'we usually' or 'typically'",
      "Don't provide evidence from outside the audit period unless specifically requested",
      "Don't leave any required field blank—if not applicable, explain why"
    ]
  },
  {
    category: "Evidence Quality",
    tips: [
      "Ensure dates are clearly visible and within the audit period",
      "Include evidence of WHO performed actions, not just WHAT was done",
      "Make sure evidence is legible—avoid blurry screenshots",
      "Redact sensitive information appropriately while preserving audit relevance"
    ]
  }
];

const sampleRSAWData = {
  standard: "CIP-007-6",
  requirement: "R2",
  title: "Patch Management",
  auditorQuestion: "Provide documentation demonstrating your patch management process for High and Medium Impact BES Cyber Systems, including: (1) Patch source identification, (2) Assessment within 35 days of availability, (3) Implementation or documented mitigation for applicable patches.",
  goodResponse: {
    narrative: "Per Patch Management Procedure PM-001 Rev 4.2, we implement the following process for all High and Medium Impact BES Cyber Systems:\n\n1. Source Identification: We track security patches from the sources identified in PM-001 Appendix A. Our tracked sources include Microsoft, Red Hat, Cisco, Siemens, and all vendors listed in our BES Cyber Asset inventory.\n\n2. Assessment Process: Within 35 days of patch release, our Security Team evaluates applicability using our Patch Assessment Checklist (PM-001 Form B). Assessments are documented in our Patch Tracker.\n\n3. Implementation/Mitigation: Applicable patches are scheduled for implementation per our Change Management process. Where patches cannot be applied within timeframes, we document technical basis and create mitigation plans per R2.3.\n\nSee attached evidence demonstrating compliance for the audit period.",
    evidence: [
      "Exhibit A: Patch Management Procedure PM-001 Rev 4.2",
      "Exhibit B: Tracked Sources List (PM-001 Appendix A)",
      "Exhibit C: Patch Assessment Tracker (01/01/2024 - 06/30/2024)",
      "Exhibit D: Sample Patch Assessments (5 samples from audit period)",
      "Exhibit E: Mitigation Plan for CVE-2024-2876 (Server unable to patch due to software compatibility)"
    ]
  },
  poorResponse: {
    narrative: "We do patch management. IT handles this and pushes patches out when they're available. We've been doing this for years and haven't had any security issues.",
    issues: [
      "No reference to documented procedures",
      "Vague about process and responsibilities",
      "No mention of assessment timeframes",
      "No discussion of mitigation for patches not applied",
      "No evidence referenced"
    ]
  }
};

export default function RSAWTutorial() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-primary/20 text-navy-foreground py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Audit Documentation
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-navy-foreground">
              RSAW Walkthrough & Templates
            </h1>
            <p className="text-lg md:text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              The Reliability Standard Audit Worksheet (RSAW) is the official audit checklist. 
              Learn how to navigate it, document your compliance, and avoid common mistakes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <a href="https://www.nerc.com/pa/comp/Pages/Audit-Worksheets.aspx" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Official RSAWs
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/audit-simulator">
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  Practice Audit Requests
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is an RSAW */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">What is an RSAW?</h2>
                <p className="text-muted-foreground mb-4">
                  The <strong>Reliability Standard Audit Worksheet</strong> is NERC's official tool for 
                  compliance audits. Each CIP standard has its own RSAW that auditors use to evaluate 
                  whether you meet each requirement.
                </p>
                <p className="text-muted-foreground mb-4">
                  RSAWs are structured documents with specific sections for requirement language, 
                  evidence requests, your compliance narrative, and auditor findings. Understanding 
                  this structure helps you prepare evidence and respond effectively.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Available for free from NERC's website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Updated when standards are revised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Use for internal self-assessments and mock audits</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileSearch className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-navy">RSAW Key Sections</h3>
                      <p className="text-sm text-muted-foreground">What you'll find in every RSAW</p>
                    </div>
                  </div>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                      <span>Requirement language and applicability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                      <span>Evidence request from auditor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                      <span>Your narrative response section</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
                      <span>Evidence attachments list</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">5</span>
                      <span>Auditor assessment and findings</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* RSAW Sections Deep Dive */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
              Understanding Each RSAW Section
            </h2>

            <div className="space-y-6">
              {rsawSections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium text-navy mb-2">{field.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{field.guidance}</p>
                          {field.example && (
                            <div className="bg-success/5 border border-success/20 rounded p-3 mt-2">
                              <p className="text-xs font-medium text-success mb-1">Example:</p>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{field.example}</p>
                            </div>
                          )}
                          {field.commonMistakes && field.commonMistakes.length > 0 && (
                            <div className="bg-destructive/5 border border-destructive/20 rounded p-3 mt-2">
                              <p className="text-xs font-medium text-destructive mb-1">Common Mistakes:</p>
                              <ul className="space-y-1">
                                {field.commonMistakes.map((mistake, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <AlertTriangle className="h-3 w-3 text-destructive mt-1 shrink-0" />
                                    {mistake}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample RSAW Response */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Sample RSAW Response</h2>
              <p className="text-muted-foreground">
                Compare a strong response to a weak one for {sampleRSAWData.standard} {sampleRSAWData.requirement}
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader className="bg-navy text-navy-foreground">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {sampleRSAWData.standard} {sampleRSAWData.requirement}: {sampleRSAWData.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-navy mb-2">Auditor Evidence Request:</p>
                  <p className="text-sm text-muted-foreground">{sampleRSAWData.auditorQuestion}</p>
                </div>

                <Tabs defaultValue="good" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="good" className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Strong Response
                    </TabsTrigger>
                    <TabsTrigger value="poor" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Weak Response
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="good" className="mt-4">
                    <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-navy mb-2">Narrative Response:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sampleRSAWData.goodResponse.narrative}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-navy mb-2">Evidence Provided:</p>
                      <ul className="space-y-1">
                        {sampleRSAWData.goodResponse.evidence.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Alert className="mt-4 bg-success/5 border-success/20">
                      <Lightbulb className="h-4 w-4 text-success" />
                      <AlertTitle className="text-success">Why This Works</AlertTitle>
                      <AlertDescription className="text-sm">
                        References specific procedures by name/version, addresses each element of the requirement, 
                        provides organized evidence list, and demonstrates systematic process.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="poor" className="mt-4">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-navy mb-2">Narrative Response:</p>
                      <p className="text-sm text-muted-foreground">{sampleRSAWData.poorResponse.narrative}</p>
                    </div>
                    <Alert variant="destructive" className="bg-destructive/5">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Issues With This Response</AlertTitle>
                      <AlertDescription>
                        <ul className="mt-2 space-y-1">
                          {sampleRSAWData.poorResponse.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span>•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
              RSAW Best Practices
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {rsawTips.map((section) => (
                <Card key={section.category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {section.category === "Before the Audit" && <Target className="h-5 w-5 text-primary" />}
                      {section.category === "Writing Responses" && <FileText className="h-5 w-5 text-primary" />}
                      {section.category === "Common Pitfalls" && <AlertTriangle className="h-5 w-5 text-amber" />}
                      {section.category === "Evidence Quality" && <Search className="h-5 w-5 text-primary" />}
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-navy text-navy-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Practice?</h2>
            <p className="text-navy-foreground/80 mb-8">
              Use our Audit Request Simulator to practice responding to common audit evidence 
              requests, or build your evidence organization strategy in the Evidence Lab.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/audit-simulator">
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  Audit Request Simulator
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/evidence-lab">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Evidence Lab
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}