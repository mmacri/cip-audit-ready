import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  Table,
  AlertTriangle,
  Calendar
} from "lucide-react";
import {
  generateEvidenceInventory,
  generateTrainingMatrix,
  generateIncidentResponseScript,
  generateChangeControlChecklist,
  generatePatchTracker,
  generateAccessReviewForm,
} from "@/utils/pdfTemplates";
import {
  generateEvidenceInventoryExcel,
  generateTrainingMatrixExcel,
  generatePatchTrackerExcel,
  generateAccessReviewExcel,
} from "@/utils/excelTemplates";

interface Template {
  icon: typeof FileSpreadsheet;
  title: string;
  description: string;
  format: string;
  columns?: string[];
  fields?: string[];
  sections?: string[];
  generatePdf: () => void;
  generateExcel?: () => void;
}

const templates: Template[] = [
  {
    icon: FileSpreadsheet,
    title: "Evidence Inventory Spreadsheet",
    description: "Track all evidence documents mapped to CIP requirements, including owners, dates, and locations.",
    format: "PDF or Excel",
    columns: ["CIP Requirement ID", "Evidence Description", "Document Location", "Owner", "Last Updated", "Expiration Date", "Status"],
    generatePdf: generateEvidenceInventory,
    generateExcel: generateEvidenceInventoryExcel,
  },
  {
    icon: Table,
    title: "Training Matrix",
    description: "Map personnel to required training, track completion dates, and identify upcoming renewals.",
    format: "PDF or Excel",
    columns: ["Employee Name", "Role", "Required Training", "Completion Date", "Next Due Date", "Trainer", "Status"],
    generatePdf: generateTrainingMatrix,
    generateExcel: generateTrainingMatrixExcel,
  },
  {
    icon: FileText,
    title: "Incident Response Tabletop Script",
    description: "Scenario-based exercise script for testing your incident response plan with your team.",
    format: "PDF with Example Scenario",
    sections: ["Scenario Overview", "Inject Timeline", "Discussion Questions", "Expected Actions", "Lessons Learned Template"],
    generatePdf: generateIncidentResponseScript,
  },
  {
    icon: FileText,
    title: "Change Control Checklist",
    description: "Step-by-step checklist for documenting configuration changes to BES Cyber Systems.",
    format: "PDF with Example Data",
    fields: ["Change Request ID", "Requestor", "System Affected", "Change Description", "Risk Assessment", "Approvals", "Implementation Date", "Rollback Plan", "Post-Change Verification"],
    generatePdf: generateChangeControlChecklist,
  },
  {
    icon: FileSpreadsheet,
    title: "Patch Assessment Tracker",
    description: "Track security patches from identification through assessment and implementation or mitigation.",
    format: "PDF or Excel",
    columns: ["Patch ID", "Vendor", "Affected Systems", "Release Date", "Assessment Due", "Disposition", "Implementation Date", "Mitigation Details"],
    generatePdf: generatePatchTracker,
    generateExcel: generatePatchTrackerExcel,
  },
  {
    icon: FileText,
    title: "Access Review Documentation Form",
    description: "Standardized form for documenting quarterly access reviews with approval signatures.",
    format: "PDF or Excel",
    fields: ["Review Period", "System/Application", "Access List Reviewed", "Reviewer Name", "Date", "Discrepancies Found", "Corrective Actions", "Approver Signature"],
    generatePdf: generateAccessReviewForm,
    generateExcel: generateAccessReviewExcel,
  }
];

const glossaryTerms = [
  {
    term: "BES (Bulk Electric System)",
    definition: "The electrical generation resources, transmission lines, interconnections with neighboring systems, and associated equipment, generally operated at voltages of 100 kV or higher.",
    module: 1
  },
  {
    term: "BES Cyber System",
    definition: "One or more BES Cyber Assets logically grouped by a responsible entity to perform one or more reliability tasks for a functional entity.",
    module: 2
  },
  {
    term: "BES Cyber Asset",
    definition: "A Cyber Asset that if rendered unavailable, degraded, or misused would, within 15 minutes, adversely impact the reliable operation of the BES.",
    module: 2
  },
  {
    term: "ESP (Electronic Security Perimeter)",
    definition: "The logical border surrounding a network to which BES Cyber Systems are connected using a routable protocol.",
    module: 5
  },
  {
    term: "PSP (Physical Security Perimeter)",
    definition: "The physical border surrounding locations in which BES Cyber Assets, BES Cyber Systems, or Electronic Access Control or Monitoring Systems reside.",
    module: 5
  },
  {
    term: "PACS (Physical Access Control Systems)",
    definition: "Cyber Assets that control, alert, or log access to Physical Security Perimeters, exclusive of locally mounted hardware or devices at the PSP.",
    module: 5
  },
  {
    term: "EACMS (Electronic Access Control or Monitoring Systems)",
    definition: "Cyber Assets that perform electronic access control or monitoring of the Electronic Security Perimeter or BES Cyber Systems.",
    module: 5
  },
  {
    term: "BCSI (BES Cyber System Information)",
    definition: "Information about BES Cyber Systems that could be used to gain unauthorized access or pose a security threat to the system.",
    module: 9
  },
  {
    term: "CIP Senior Manager",
    definition: "A single senior management official with overall authority and responsibility for leading and managing implementation of the CIP standards.",
    module: 3
  },
  {
    term: "High/Medium/Low Impact",
    definition: "BES Cyber System categorization levels based on the adverse impact that loss, compromise, or misuse could have on reliable BES operation.",
    module: 2
  },
  {
    term: "Reportable Cyber Security Incident",
    definition: "A Cyber Security Incident that compromised or disrupted a BES Cyber System, ESP, or associated EACMS, and must be reported to ES-ISAC.",
    module: 7
  },
  {
    term: "Interactive Remote Access",
    definition: "User-initiated access by a person employing a remote access client or other remote access technology using a routable protocol.",
    module: 5
  },
  {
    term: "Responsible Entity",
    definition: "An entity registered with NERC as being responsible for compliance with one or more reliability standards. This includes Generator Owners, Transmission Operators, and other registered functions.",
    module: 1
  },
  {
    term: "Regional Entity",
    definition: "An organization delegated enforcement authority by NERC for compliance monitoring, enforcement actions, and reliability standards within a geographic region (e.g., SERC, WECC, RF).",
    module: 1
  },
  {
    term: "Baseline Configuration",
    definition: "A documented set of specifications for a system or component that includes the operating system, installed software, logical network ports, and applied patches.",
    module: 8
  }
];

const externalLinks = [
  {
    title: "NERC Standards Library",
    description: "Official NERC Standards library with all current reliability standards, including CIP standards and implementation guidance.",
    url: "https://www.nerc.com/pa/Stand/Pages/ReliabilityStandards.aspx"
  },
  {
    title: "NERC CIP Standards (Direct)",
    description: "Direct link to Critical Infrastructure Protection reliability standards and associated documents.",
    url: "https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx"
  },
  {
    title: "FERC CIP Orders",
    description: "Federal Energy Regulatory Commission orders related to CIP standards approval and directives.",
    url: "https://www.ferc.gov/industries-data/electric/industry-activities/cyber-security-cip"
  },
  {
    title: "E-ISAC Portal",
    description: "Electricity Information Sharing and Analysis Center for threat intelligence and incident reporting.",
    url: "https://www.eisac.com"
  },
  {
    title: "Regional Entity Websites",
    description: "Find your regional entity (SERC, RF, WECC, NPCC, MRO, Texas RE) for region-specific guidance and reporting.",
    url: "https://www.nerc.com/pa/comp/Pages/Regional-Entities.aspx"
  },
  {
    title: "NERC Compliance Guidance",
    description: "Implementation guidance documents, FAQs, and compliance application notices.",
    url: "https://www.nerc.com/pa/comp/guidance/Pages/default.aspx"
  }
];

const regionalEntities = [
  { abbr: "SERC", name: "SERC Reliability Corporation", region: "Southeastern US" },
  { abbr: "RF", name: "ReliabilityFirst", region: "Mid-Atlantic & Great Lakes" },
  { abbr: "WECC", name: "Western Electricity Coordinating Council", region: "Western US & Canada" },
  { abbr: "NPCC", name: "Northeast Power Coordinating Council", region: "Northeastern US & Eastern Canada" },
  { abbr: "MRO", name: "Midwest Reliability Organization", region: "Upper Midwest US & Central Canada" },
  { abbr: "Texas RE", name: "Texas Reliability Entity", region: "Texas (ERCOT region)" }
];

export default function Resources() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Resources & Templates
            </h1>
            <p className="text-lg text-muted-foreground">
              Practical tools, templates, and reference materials to support your 
              NERC CIP compliance program. Download PDF or Excel templates with pre-filled examples.
            </p>
          </div>
        </div>
      </section>

      {/* Content Version Notice */}
      <section className="py-4 border-b border-border/50">
        <div className="container">
          <Alert className="max-w-4xl mx-auto border-primary/20 bg-primary/5">
            <Calendar className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Content Last Updated: November 2025</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Templates and external links verified against NERC CIP Standards effective as of November 2025. 
              NERC updates standards periodically—always verify requirements against the{" "}
              <a 
                href="https://www.nerc.com/pa/Stand/Pages/ReliabilityStandards.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                official NERC Standards Library
              </a>.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Downloadable Templates</h2>
            <p className="text-muted-foreground mb-8">
              These templates include pre-filled example data to help you understand the format and structure. 
              Download them as PDFs and use them as references when building your own documentation.
            </p>

            <div className="space-y-4">
              {templates.map((template) => (
                <div 
                  key={template.title}
                  className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <template.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1 flex-wrap">
                        <h3 className="font-semibold text-navy group-hover:text-primary transition-colors">
                          {template.title}
                        </h3>
                        <div className="flex gap-2 shrink-0">
                          <Button 
                            size="sm" 
                            onClick={template.generatePdf}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          {template.generateExcel && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={template.generateExcel}
                            >
                              <FileSpreadsheet className="h-4 w-4 mr-1" />
                              Excel
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      
                      {/* Show columns/fields/sections */}
                      {template.columns && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <p className="text-xs font-medium text-navy mb-1">Key Columns:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.columns.map((col) => (
                              <span key={col} className="text-xs bg-background px-2 py-0.5 rounded text-muted-foreground">
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {template.fields && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <p className="text-xs font-medium text-navy mb-1">Key Fields:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.fields.map((field) => (
                              <span key={field} className="text-xs bg-background px-2 py-0.5 rounded text-muted-foreground">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {template.sections && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <p className="text-xs font-medium text-navy mb-1">Sections:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.sections.map((section) => (
                              <span key={section} className="text-xs bg-background px-2 py-0.5 rounded text-muted-foreground">
                                {section}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-primary">
                        <Download className="h-3 w-3" />
                        {template.format}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section id="glossary" className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">NERC CIP Glossary</h2>
            <p className="text-muted-foreground mb-8">
              Key terms and definitions you will encounter throughout your CIP compliance journey. 
              Understanding this vocabulary is essential for communicating with auditors and 
              interpreting requirements correctly.
            </p>

            <div className="bg-card rounded-xl border border-border/50 divide-y divide-border">
              {glossaryTerms.map((item) => (
                <div key={item.term} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <dt className="font-semibold text-navy mb-1">{item.term}</dt>
                      <dd className="text-sm text-muted-foreground">{item.definition}</dd>
                    </div>
                    {item.module && (
                      <span className="shrink-0 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Module {item.module}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regional Entities Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Regional Entities</h2>
            <p className="text-muted-foreground mb-8">
              NERC delegates compliance monitoring and enforcement to Regional Entities. 
              Know which Regional Entity oversees your organization for audit coordination and reporting.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalEntities.map((entity) => (
                <div key={entity.abbr} className="bg-card rounded-xl border border-border/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-primary">{entity.abbr}</span>
                  </div>
                  <p className="text-sm font-medium text-navy mb-1">{entity.name}</p>
                  <p className="text-xs text-muted-foreground">{entity.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* External Links Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">External Resources</h2>
            <p className="text-muted-foreground mb-8">
              Official sources and regulatory websites for the most current information on 
              NERC CIP requirements and guidance.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {externalLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-navy mb-1 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
