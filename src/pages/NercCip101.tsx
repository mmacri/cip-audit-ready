import { Layout } from "@/components/layout/Layout";
import { Shield, HelpCircle } from "lucide-react";

const cipStandards = [
  {
    id: "CIP-002",
    title: "BES Cyber System Categorization",
    description: "Identifies and categorizes Bulk Electric System (BES) Cyber Systems based on their impact to the reliable operation of the grid.",
    questions: [
      "How do you determine which systems are High, Medium, or Low impact?",
      "When was your last BES Cyber System identification review?"
    ]
  },
  {
    id: "CIP-003",
    title: "Security Management Controls",
    description: "Requires documented cyber security policies and assigns clear accountability for protecting BES Cyber Systems.",
    questions: [
      "Who is your designated CIP Senior Manager?",
      "When was your cyber security policy last reviewed and approved?"
    ]
  },
  {
    id: "CIP-004",
    title: "Personnel & Training",
    description: "Ensures that personnel with access to BES Cyber Systems are properly trained, vetted, and have appropriate access revoked when necessary.",
    questions: [
      "How do you verify that all personnel complete CIP training before access?",
      "What is your process for revoking access within 24 hours of termination?"
    ]
  },
  {
    id: "CIP-005",
    title: "Electronic Security Perimeters",
    description: "Establishes electronic security perimeters (ESPs) around BES Cyber Systems and controls all inbound and outbound access.",
    questions: [
      "Can you show the network diagram defining your ESP boundaries?",
      "How do you detect and alert on unauthorized access attempts?"
    ]
  },
  {
    id: "CIP-006",
    title: "Physical Security",
    description: "Requires physical security controls to protect BES Cyber Systems, including access controls, monitoring, and visitor management.",
    questions: [
      "How do you log and monitor physical access to your PSPs?",
      "What is your visitor escort policy for sensitive areas?"
    ]
  },
  {
    id: "CIP-007",
    title: "System Security Management",
    description: "Addresses technical security controls including ports and services, patch management, malicious code prevention, and security event monitoring.",
    questions: [
      "How do you track the 35-day patch assessment timeline?",
      "What evidence do you have of monthly log reviews?"
    ]
  },
  {
    id: "CIP-008",
    title: "Incident Reporting & Response Planning",
    description: "Requires organizations to identify, classify, and respond to Cyber Security Incidents, including mandatory reporting to the Electricity Sector ISAC.",
    questions: [
      "Have you tested your incident response plan within the last 15 months?",
      "How do you determine if an incident is reportable?"
    ]
  },
  {
    id: "CIP-009",
    title: "Recovery Plans",
    description: "Mandates recovery plans for BES Cyber Systems, including backup and restoration procedures, with regular testing requirements.",
    questions: [
      "When was your last recovery plan test for each High/Medium impact system?",
      "How do you verify backup data integrity?"
    ]
  },
  {
    id: "CIP-010",
    title: "Configuration Change Management & Vulnerability Assessments",
    description: "Requires baseline configurations, a formal change management process, and regular vulnerability assessments for BES Cyber Systems.",
    questions: [
      "How do you document and authorize configuration changes?",
      "When was your last vulnerability assessment performed?"
    ]
  },
  {
    id: "CIP-011",
    title: "Information Protection",
    description: "Protects BES Cyber System Information (BCSI) from unauthorized access, misuse, and improper disposal throughout its lifecycle.",
    questions: [
      "How do you identify and label BCSI?",
      "What is your process for sanitizing media containing BCSI?"
    ]
  },
  {
    id: "CIP-013",
    title: "Supply Chain Risk Management",
    description: "Addresses cyber security risks in the supply chain for industrial control system hardware, software, and services.",
    questions: [
      "How do you assess vendor security practices before procurement?",
      "What contract language do you use to address supply chain risks?"
    ]
  }
];

export default function NercCip101() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              NERC CIP 101
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding the Critical Infrastructure Protection standards that keep the North American power grid secure.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto prose-academy">
            <h2 className="text-2xl font-bold text-navy mb-4">What is NERC and Why Does CIP Exist?</h2>
            <p className="text-muted-foreground mb-4">
              The <strong className="text-foreground">North American Electric Reliability Corporation (NERC)</strong> is 
              the non-profit organization responsible for ensuring the reliability and security of the bulk power 
              system across North America. NERC develops and enforces reliability standards that all registered 
              entities must follow.
            </p>
            <p className="text-muted-foreground mb-4">
              The <strong className="text-foreground">Critical Infrastructure Protection (CIP)</strong> standards are 
              a set of mandatory cybersecurity requirements designed to protect the critical cyber assets essential 
              to the reliable operation of the electric grid. These standards address everything from identifying 
              which systems matter most to training personnel and responding to incidents.
            </p>
            <p className="text-muted-foreground">
              Non-compliance with CIP standards can result in significant financial penalties—up to $1 million per 
              violation per day—and reputational damage. More importantly, strong CIP compliance helps prevent 
              cyber attacks that could disrupt power delivery to millions of people.
            </p>
          </div>
        </div>
      </section>

      {/* Standards Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">The 11 CIP Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each standard addresses a specific aspect of cybersecurity for the bulk electric system. 
              Click on any card to explore what auditors typically ask about each standard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cipStandards.map((standard, index) => (
              <div
                key={standard.id}
                className="bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {standard.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{standard.description}</p>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm font-medium text-accent mb-2">
                      <HelpCircle className="h-4 w-4" />
                      <span>You should be able to answer:</span>
                    </div>
                    <ul className="space-y-2">
                      {standard.questions.map((question, qIndex) => (
                        <li key={qIndex} className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Compliance is a Journey, Not a Destination
            </h2>
            <p className="text-muted-foreground mb-6">
              Understanding the CIP standards is just the first step. True compliance requires ongoing 
              processes, regular training, and continuous improvement. The standards are designed to 
              work together—a gap in one area often creates vulnerabilities in others.
            </p>
            <p className="text-muted-foreground">
              Ready to create your compliance roadmap? Continue to the Audit Journey to build your 
              step-by-step plan for audit readiness.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
