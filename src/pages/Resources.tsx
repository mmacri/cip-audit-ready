import { Layout } from "@/components/layout/Layout";
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  Table
} from "lucide-react";

const templates = [
  {
    icon: FileSpreadsheet,
    title: "Evidence Inventory Spreadsheet",
    description: "Track all evidence documents mapped to CIP requirements, including owners, dates, and locations.",
    format: "Excel Template"
  },
  {
    icon: Table,
    title: "Training Matrix",
    description: "Map personnel to required training, track completion dates, and identify upcoming renewals.",
    format: "Excel Template"
  },
  {
    icon: FileText,
    title: "Incident Response Tabletop Script",
    description: "Scenario-based exercise script for testing your incident response plan with your team.",
    format: "Word Document"
  },
  {
    icon: FileText,
    title: "Change Control Checklist",
    description: "Step-by-step checklist for documenting configuration changes to BES Cyber Systems.",
    format: "PDF Checklist"
  },
  {
    icon: FileSpreadsheet,
    title: "Patch Assessment Tracker",
    description: "Track security patches from identification through assessment and implementation or mitigation.",
    format: "Excel Template"
  },
  {
    icon: FileText,
    title: "Access Review Documentation Form",
    description: "Standardized form for documenting quarterly access reviews with approval signatures.",
    format: "Word Document"
  }
];

const glossaryTerms = [
  {
    term: "BES (Bulk Electric System)",
    definition: "The electrical generation resources, transmission lines, interconnections with neighboring systems, and associated equipment, generally operated at voltages of 100 kV or higher."
  },
  {
    term: "BES Cyber System",
    definition: "One or more BES Cyber Assets logically grouped by a responsible entity to perform one or more reliability tasks for a functional entity."
  },
  {
    term: "BES Cyber Asset",
    definition: "A Cyber Asset that if rendered unavailable, degraded, or misused would, within 15 minutes, adversely impact the reliable operation of the BES."
  },
  {
    term: "ESP (Electronic Security Perimeter)",
    definition: "The logical border surrounding a network to which BES Cyber Systems are connected using a routable protocol."
  },
  {
    term: "PSP (Physical Security Perimeter)",
    definition: "The physical border surrounding locations in which BES Cyber Assets, BES Cyber Systems, or Electronic Access Control or Monitoring Systems reside."
  },
  {
    term: "PACS (Physical Access Control Systems)",
    definition: "Cyber Assets that control, alert, or log access to Physical Security Perimeters, exclusive of locally mounted hardware or devices at the PSP."
  },
  {
    term: "EACMS (Electronic Access Control or Monitoring Systems)",
    definition: "Cyber Assets that perform electronic access control or monitoring of the Electronic Security Perimeter or BES Cyber Systems."
  },
  {
    term: "BCSI (BES Cyber System Information)",
    definition: "Information about BES Cyber Systems that could be used to gain unauthorized access or pose a security threat to the system."
  },
  {
    term: "CIP Senior Manager",
    definition: "A single senior management official with overall authority and responsibility for leading and managing implementation of the CIP standards."
  },
  {
    term: "High/Medium/Low Impact",
    definition: "BES Cyber System categorization levels based on the adverse impact that loss, compromise, or misuse could have on reliable BES operation."
  },
  {
    term: "Reportable Cyber Security Incident",
    definition: "A Cyber Security Incident that compromised or disrupted a BES Cyber System, ESP, or associated EACMS, and must be reported to ES-ISAC."
  },
  {
    term: "Interactive Remote Access",
    definition: "User-initiated access by a person employing a remote access client or other remote access technology using a routable protocol."
  }
];

const externalLinks = [
  {
    title: "NERC Official Website",
    description: "Access official NERC standards, implementation guidance, and reliability resources.",
    url: "https://www.nerc.com"
  },
  {
    title: "NERC CIP Standards Page",
    description: "Direct link to all current CIP reliability standards and associated documents.",
    url: "https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx"
  },
  {
    title: "E-ISAC Portal",
    description: "Electricity Information Sharing and Analysis Center for threat intelligence and incident reporting.",
    url: "https://www.eisac.com"
  },
  {
    title: "Regional Entity Websites",
    description: "Find your regional entity (SERC, RF, WECC, etc.) for region-specific guidance and reporting.",
    url: "https://www.nerc.com/pa/comp/Pages/Regional-Entities.aspx"
  }
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
              NERC CIP compliance program.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Downloadable Templates</h2>
            <p className="text-muted-foreground mb-8">
              These templates provide starting points for common CIP documentation needs. 
              Customize them to fit your organization's specific requirements and processes.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div 
                  key={template.title}
                  className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <template.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy mb-1 group-hover:text-primary transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
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
                  <dt className="font-semibold text-navy mb-1">{item.term}</dt>
                  <dd className="text-sm text-muted-foreground">{item.definition}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* External Links Section */}
      <section className="py-12 md:py-16">
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
