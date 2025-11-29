import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CIPStandardsRelationshipDiagram } from "@/components/diagrams/CIPStandardsRelationshipDiagram";
import { 
  Shield, 
  BookOpen, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  ArrowRight,
  Building2,
  Server,
  Users,
  FileText,
  Lock,
  Activity
} from "lucide-react";

const cipStandards = [
  {
    id: "CIP-002",
    title: "BES Cyber System Categorization",
    description: "Identify and categorize BES Cyber Systems based on their impact on the reliability of the Bulk Electric System.",
    focus: "Asset identification, impact ratings (High/Medium/Low)",
    module: 2
  },
  {
    id: "CIP-003",
    title: "Security Management Controls",
    description: "Establish responsibility and accountability for CIP compliance through policies and governance.",
    focus: "CIP Senior Manager, cyber security policies, low-impact requirements",
    module: 3
  },
  {
    id: "CIP-004",
    title: "Personnel & Training",
    description: "Ensure personnel with access to BES Cyber Systems are trained and have appropriate risk assessments.",
    focus: "Training programs, personnel risk assessments, access revocation",
    module: 4
  },
  {
    id: "CIP-005",
    title: "Electronic Security Perimeter(s)",
    description: "Manage electronic access to BES Cyber Systems through defined security perimeters.",
    focus: "ESPs, remote access, network segmentation",
    module: 5
  },
  {
    id: "CIP-006",
    title: "Physical Security of BES Cyber Systems",
    description: "Manage physical access to BES Cyber Systems through defined Physical Security Perimeters.",
    focus: "PSPs, access controls, visitor management",
    module: 5
  },
  {
    id: "CIP-007",
    title: "System Security Management",
    description: "Define methods, processes, and procedures for securing systems and ports/services.",
    focus: "Ports and services, patch management, malicious code prevention, logging",
    module: 6
  },
  {
    id: "CIP-008",
    title: "Incident Reporting and Response Planning",
    description: "Develop and maintain plans to identify, classify, and respond to Cyber Security Incidents.",
    focus: "Incident response plans, ES-ISAC reporting, incident handling",
    module: 7
  },
  {
    id: "CIP-009",
    title: "Recovery Plans for BES Cyber Systems",
    description: "Ensure recovery plans are established for BES Cyber Systems.",
    focus: "Recovery plans, backup and storage, testing",
    module: 7
  },
  {
    id: "CIP-010",
    title: "Configuration Change Management and Vulnerability Assessments",
    description: "Prevent and detect unauthorized changes to BES Cyber Systems.",
    focus: "Baseline configurations, change management, vulnerability assessments",
    module: 8
  },
  {
    id: "CIP-011",
    title: "Information Protection",
    description: "Prevent unauthorized access to BES Cyber System Information (BCSI).",
    focus: "BCSI handling, storage, disposal",
    module: 9
  },
  {
    id: "CIP-012",
    title: "Communications Between Control Centers",
    description: "Protect the confidentiality and integrity of Real-time Assessment and Real-time monitoring data.",
    focus: "Control center communications, encryption, data integrity",
    module: null
  },
  {
    id: "CIP-013",
    title: "Supply Chain Risk Management",
    description: "Mitigate cyber security risks to BES Cyber Systems from supply chain compromises.",
    focus: "Vendor risk management, procurement, EACMS/PACS coverage",
    module: 9
  },
  {
    id: "CIP-014",
    title: "Physical Security",
    description: "Identify and protect Transmission stations and substations, and their associated primary control centers.",
    focus: "Physical security assessments, threat and vulnerability analysis",
    module: null
  }
];

const keyTerms = [
  { term: "BES", definition: "Bulk Electric System - the electrical generation, transmission, and interconnection facilities" },
  { term: "BES Cyber Asset", definition: "A Cyber Asset that could impact BES reliability within 15 minutes if compromised" },
  { term: "BES Cyber System", definition: "One or more BES Cyber Assets logically grouped to perform a reliability task" },
  { term: "ESP", definition: "Electronic Security Perimeter - logical border around networks with BES Cyber Systems" },
  { term: "PSP", definition: "Physical Security Perimeter - physical border around locations housing BES Cyber Systems" },
  { term: "EACMS", definition: "Electronic Access Control or Monitoring Systems" },
  { term: "PACS", definition: "Physical Access Control Systems" },
  { term: "BCSI", definition: "BES Cyber System Information - sensitive information about BES Cyber Systems" }
];

export default function NercCip101() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-primary/20 text-navy-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Foundational Knowledge
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NERC CIP 101: Your Starting Point
            </h1>
            <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              Critical Infrastructure Protection (CIP) standards are mandatory reliability standards 
              that apply to the bulk power system in North America. This guide introduces you to 
              the framework, terminology, and key concepts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/modules">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning Modules
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/audit-journey">
                  <Target className="mr-2 h-5 w-5" />
                  View Audit Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why CIP Matters */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Why NERC CIP Matters</h2>
              <p className="text-muted-foreground text-lg">
                The power grid is critical infrastructure. A successful cyber attack could disrupt 
                electricity for millions, affecting hospitals, water systems, and emergency services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Protect the Grid</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    CIP standards establish baseline cyber security protections for systems that 
                    operate the bulk electric system.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center mb-3">
                    <AlertTriangle className="h-6 w-6 text-amber" />
                  </div>
                  <CardTitle className="text-lg">Avoid Penalties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Violations can result in penalties up to $1 million per violation per day, 
                    plus reputational damage and increased audit scrutiny.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle className="text-lg">Demonstrate Due Diligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compliance demonstrates your organization takes security seriously and meets 
                    its obligations to the interconnected grid.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CIP Standards Relationship Diagram */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  How CIP Standards Fit Together
                </CardTitle>
                <CardDescription>
                  Understanding how standards relate helps you see the big picture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CIPStandardsRelationshipDiagram className="animate-fade-in" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Terminology */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Key Terminology</h2>
            <p className="text-muted-foreground text-center mb-8">
              Before diving into the standards, familiarize yourself with these essential terms. 
              Understanding this vocabulary is critical for audit conversations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {keyTerms.map((item) => (
                <Card key={item.term} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 font-mono">
                        {item.term}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{item.definition}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/resources#glossary">
                  View Full Glossary
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The 13 CIP Standards */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">The 13 CIP Standards</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Each standard addresses a specific aspect of cyber security. Click on a standard 
                to learn more through our training modules.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <em>Last verified against NERC Standards Library: November 2025</em>
              </p>
            </div>

            <div className="space-y-4">
              {cipStandards.map((standard) => (
                <Card key={standard.id} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Badge className="shrink-0 bg-primary text-primary-foreground font-mono">
                        {standard.id}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-navy">{standard.title}</h3>
                          {standard.module && (
                            <Button size="sm" variant="ghost" asChild className="shrink-0">
                              <Link to="/modules">
                                Module {standard.module}
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{standard.description}</p>
                        <p className="text-xs text-primary/80">
                          <strong>Key Focus:</strong> {standard.focus}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">The Compliance Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>NERC</CardTitle>
                  </div>
                  <CardDescription>
                    North American Electric Reliability Corporation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    NERC develops and enforces reliability standards for the bulk power system. 
                    It operates under oversight from FERC (US) and governmental authorities in Canada.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-primary" />
                    <CardTitle>Regional Entities</CardTitle>
                  </div>
                  <CardDescription>
                    Delegated compliance monitoring and enforcement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Six Regional Entities (SERC, RF, WECC, NPCC, MRO, Texas RE) conduct audits, 
                    spot checks, and investigations on NERC's behalf.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Registered Entities</CardTitle>
                  </div>
                  <CardDescription>
                    Organizations responsible for compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your organization, registered with NERC for specific functions (Generation Owner, 
                    Transmission Operator, etc.), responsible for meeting applicable CIP requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>RSAW</CardTitle>
                  </div>
                  <CardDescription>
                    Reliability Standard Audit Worksheet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The official audit tool used by Regional Entities. Each RSAW lists specific 
                    evidence requirements for each standard requirement. Use these to prepare.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 md:py-16 bg-navy text-navy-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Go Deeper?</h2>
            <p className="text-navy-foreground/80 mb-8 text-lg">
              Now that you understand the basics, explore our structured learning path or 
              jump straight to role-based training for your specific responsibilities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/learning-path">
                  <Activity className="mr-2 h-5 w-5" />
                  View Learning Path
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/role-training">
                  <Lock className="mr-2 h-5 w-5" />
                  Role-Based Training
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
