import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  FileText, 
  PlayCircle, 
  Search, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Download
} from "lucide-react";

const journeySteps = [
  {
    number: 1,
    icon: Target,
    title: "Baseline Assessment",
    subtitle: "Know Where You Stand",
    description: "Before you can improve, you need to honestly assess your current compliance posture. This phase identifies gaps, documents existing processes, and establishes your starting point.",
    actions: [
      "Complete the CIP Readiness Self-Assessment questionnaire",
      "Inventory all BES Cyber Systems and their current categorization",
      "Review existing policies and identify outdated or missing documentation",
      "Map current roles and responsibilities against CIP requirements",
      "Identify quick wins—gaps that can be closed with minimal effort"
    ]
  },
  {
    number: 2,
    icon: FileText,
    title: "Evidence Plan",
    subtitle: "Build Your Evidence Strategy",
    description: "Auditors need proof. This phase creates a systematic approach to collecting, organizing, and maintaining the evidence that demonstrates compliance across all applicable requirements.",
    actions: [
      "Create an evidence inventory mapped to each CIP requirement",
      "Establish naming conventions and folder structures",
      "Assign evidence owners for each requirement area",
      "Set up automated collection where possible (logs, access reviews)",
      "Define evidence retention schedules aligned with audit periods"
    ]
  },
  {
    number: 3,
    icon: PlayCircle,
    title: "Execute & Document",
    subtitle: "Do the Work, Prove the Work",
    description: "With your plan in place, this phase focuses on executing compliance activities and documenting them in real-time. The goal is to generate evidence as a natural byproduct of doing compliance right.",
    actions: [
      "Implement recurring task schedules for periodic requirements",
      "Train all personnel and document training completion",
      "Execute technical controls and capture configuration evidence",
      "Conduct required reviews (access, logs, policies) on schedule",
      "Document all changes through your change management process"
    ]
  },
  {
    number: 4,
    icon: Search,
    title: "Internal Mock Audit",
    subtitle: "Find Gaps Before Auditors Do",
    description: "A mock audit simulates the real audit experience, allowing you to identify remaining gaps, practice responding to auditor questions, and verify that evidence is complete and findable.",
    actions: [
      "Assemble an internal audit team (or engage external support)",
      "Select a sample of requirements to review in depth",
      "Request evidence as an auditor would—test retrieval speed",
      "Conduct mock interviews with SMEs and system owners",
      "Document findings and create remediation plans for any gaps"
    ]
  },
  {
    number: 5,
    icon: Calendar,
    title: "Audit Week Playbook",
    subtitle: "Execute with Confidence",
    description: "When audit week arrives, you should feel prepared rather than panicked. This phase covers logistics, communication protocols, and daily routines that keep everything running smoothly.",
    actions: [
      "Prepare a dedicated audit room with necessary equipment",
      "Brief all potential interviewees on what to expect",
      "Establish a single point of contact for auditor requests",
      "Create a daily debrief schedule to track open items",
      "Have evidence packages pre-staged for common requests"
    ]
  }
];

export default function AuditJourney() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Your Audit Readiness Journey
            </h1>
            <p className="text-lg text-muted-foreground">
              A structured 5-step path from wherever you are today to confident audit readiness. 
              Each step builds on the previous one, creating a sustainable compliance foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {journeySteps.map((step, index) => (
              <div 
                key={step.number} 
                className="relative pb-12 last:pb-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Connection Line */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-border" />
                )}

                <div className="flex gap-6">
                  {/* Step Number */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <step.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-xl border border-border/50 p-6 shadow-card">
                    <div className="mb-4">
                      <span className="text-sm font-medium text-primary">{step.subtitle}</span>
                      <h2 className="text-2xl font-bold text-navy">{step.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{step.description}</p>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-navy mb-3">Key Actions</h4>
                      <ul className="space-y-2">
                        {step.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Ready for Audit Week?
            </h2>
            <p className="text-muted-foreground mb-8">
              Download our comprehensive Audit Week Checklist to ensure you have everything 
              prepared when auditors arrive. It covers logistics, documentation, and daily 
              routines for a smooth audit experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/resources">
                  <Download className="mr-2 h-5 w-5" />
                  Download Audit Week Checklist
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/self-assessment">
                  Start Your Baseline Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
