import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calendar,
  FileText,
  Users,
  ClipboardCheck,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Send,
  UserCheck,
  Building,
  FileSearch,
  Video,
  Shield,
  Lightbulb
} from "lucide-react";

const timelinePhases = [
  {
    id: "notice",
    phase: "90-Day Notice",
    timeframe: "Day 0",
    icon: Calendar,
    color: "bg-primary",
    description: "Regional Entity sends official audit notification",
    details: [
      "Receive formal notification letter from your Regional Entity",
      "Notification specifies audit scope, standards to be reviewed, and timeframe",
      "Identifies audit team lead and contact information",
      "Lists preliminary data/evidence requests due before audit",
      "Designate your internal audit coordinator immediately"
    ],
    tips: [
      "Calendar all key dates immediately",
      "Brief leadership within 24 hours",
      "Identify SMEs for each standard in scope",
      "Start gathering evidence against the RSAW checklist"
    ]
  },
  {
    id: "pre-audit-request",
    phase: "Pre-Audit Information Request",
    timeframe: "Days 1-30",
    icon: FileText,
    color: "bg-amber",
    description: "Compile and submit required documentation",
    details: [
      "Review the formal data request list carefully",
      "Gather policies, procedures, and evidence samples",
      "Prepare network diagrams (ESP/PSP documentation)",
      "Compile personnel lists and training records",
      "Submit evidence through the designated secure portal",
      "Track what was submitted and when"
    ],
    tips: [
      "Don't wait until the deadline—submit early if possible",
      "Use the RSAW to verify you're providing complete evidence",
      "Document any items you cannot provide and why",
      "Have a second set of eyes review submissions"
    ]
  },
  {
    id: "preparation",
    phase: "Internal Preparation",
    timeframe: "Days 30-75",
    icon: ClipboardCheck,
    color: "bg-teal",
    description: "Conduct internal readiness activities",
    details: [
      "Run internal mock audits using the RSAW",
      "Conduct tabletop exercises for incident response",
      "Review and update any stale documentation",
      "Train SMEs on interview protocols",
      "Prepare opening presentation materials",
      "Walk through physical sites that may be visited",
      "Test all evidence retrieval processes"
    ],
    tips: [
      "Practice the 'I don't know' protocol with SMEs",
      "Identify gaps and create mitigation plans",
      "Brief executives on potential findings",
      "Prepare backup SMEs for critical areas"
    ]
  },
  {
    id: "pre-audit-call",
    phase: "Pre-Audit Conference Call",
    timeframe: "Day 75-80",
    icon: Video,
    color: "bg-sky",
    description: "Coordinate logistics with audit team",
    details: [
      "Confirm audit dates and daily schedule",
      "Discuss site visit logistics and access requirements",
      "Clarify any questions about submitted evidence",
      "Confirm interview subjects and schedule",
      "Discuss any confidentiality or safety protocols",
      "Establish communication protocols during audit"
    ],
    tips: [
      "Record action items and share with your team",
      "Ask clarifying questions—don't assume",
      "Confirm IT requirements for auditor access"
    ]
  },
  {
    id: "audit-week",
    phase: "Audit Week(s)",
    timeframe: "Days 80-90",
    icon: UserCheck,
    color: "bg-primary",
    description: "On-site and remote audit activities",
    details: [
      "Opening meeting with leadership and audit team",
      "Daily SME interviews (typically 30-60 minutes each)",
      "Evidence walkthrough sessions",
      "Physical site visits and inspections",
      "Real-time evidence requests and follow-ups",
      "Daily status meetings with audit team",
      "Closing meeting with preliminary findings"
    ],
    tips: [
      "Answer only the question asked—don't volunteer extra info",
      "Use the RSAW to frame your responses",
      "If you don't know, say so and offer to find out",
      "Keep detailed notes of all questions and responses"
    ]
  },
  {
    id: "post-audit",
    phase: "Post-Audit Activities",
    timeframe: "Days 90+",
    icon: FileSearch,
    color: "bg-success",
    description: "Address findings and close out audit",
    details: [
      "Receive draft audit report (typically 30-45 days post-audit)",
      "Review findings and potential violations",
      "Submit factual corrections if needed (usually 14-21 days)",
      "Develop mitigation plans for any findings",
      "Receive final audit report",
      "Track mitigation completion and submit evidence",
      "Conduct internal lessons learned session"
    ],
    tips: [
      "Respond to every finding, even if just to acknowledge",
      "Focus factual corrections on objective errors",
      "Start mitigation work immediately—don't wait for final report",
      "Document everything for future audits"
    ]
  }
];

const auditEtiquette = [
  {
    title: "Answer Only What's Asked",
    description: "Listen carefully to the question. Provide a complete but concise answer. Don't volunteer additional information that wasn't requested.",
    icon: MessageSquare
  },
  {
    title: "It's OK to Say 'I Don't Know'",
    description: "If you don't know the answer, say so. Offer to find out and get back to the auditor. Never guess or speculate.",
    icon: AlertTriangle
  },
  {
    title: "Use the RSAW as Your Guide",
    description: "Frame your answers around the specific requirement being discussed. Reference the evidence that demonstrates compliance.",
    icon: ClipboardCheck
  },
  {
    title: "Defer Complex Questions",
    description: "If a question is outside your expertise or involves complex policy interpretation, defer to the appropriate SME or compliance lead.",
    icon: Users
  }
];

export default function AuditJourney() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-primary/20 text-navy-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Audit Preparation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The NERC CIP Audit Journey
            </h1>
            <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              From the 90-day notice to post-audit closeout, understand every phase of the 
              audit process. Preparation is the key to a smooth audit experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/audit-simulator">
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  Practice with Audit Simulator
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/readiness-plan">
                  <FileText className="mr-2 h-5 w-5" />
                  Build Readiness Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Audit Timeline</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A typical NERC CIP compliance audit follows this general timeline. 
                Actual durations may vary based on scope and Regional Entity.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-8">
                {timelinePhases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Timeline dot */}
                      <div className="hidden md:flex items-start">
                        <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center text-white z-10`}>
                          <phase.icon className="h-7 w-7" />
                        </div>
                      </div>

                      {/* Content card */}
                      <Card className="flex-1 hover:shadow-card-hover transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                              <div className={`md:hidden w-10 h-10 rounded-full ${phase.color} flex items-center justify-center text-white`}>
                                <phase.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {phase.timeframe}
                                </Badge>
                                <CardTitle className="text-xl">{phase.phase}</CardTitle>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-base">
                            {phase.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                Key Activities
                              </h4>
                              <ul className="space-y-2">
                                {phase.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-amber/5 rounded-lg p-4">
                              <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-amber" />
                                Pro Tips
                              </h4>
                              <ul className="space-y-2">
                                {phase.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-amber mt-1">→</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auditor Etiquette */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Interview Best Practices</h2>
              <p className="text-muted-foreground text-lg">
                How you respond during audit interviews can significantly impact findings. 
                Train your SMEs on these critical protocols.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {auditEtiquette.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="mt-8 border-amber bg-amber/5">
              <AlertTriangle className="h-4 w-4 text-amber" />
              <AlertTitle className="text-amber">The "I Don't Know" Protocol</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                If an auditor asks a question you cannot answer with certainty, respond with: 
                <em>"I don't have that information readily available, but I can get it for you. 
                Would it be acceptable if I provide that by [specific time]?"</em> Never guess. 
                Speculation can create new audit threads.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Sample Interview Dialogues */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Sample Interview Dialogues</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge className="bg-success">Good Response</Badge>
                    CIP-007 Patch Management Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-medium text-navy mb-1">Auditor:</p>
                    <p className="text-sm text-muted-foreground">
                      "How do you assess security patches for your BES Cyber Systems?"
                    </p>
                  </div>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-navy mb-1">SME (Good):</p>
                    <p className="text-sm text-muted-foreground">
                      "We have a documented patch assessment process. Within 35 days of a patch release 
                      from our tracked sources, we evaluate applicability to our BES Cyber Systems. 
                      I can show you our Patch Assessment Tracker that documents each patch, the 
                      assessment date, and our disposition—whether we implemented, created a mitigation 
                      plan, or determined it was not applicable."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="destructive">Avoid This</Badge>
                    Same Question, Poor Response
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-medium text-navy mb-1">Auditor:</p>
                    <p className="text-sm text-muted-foreground">
                      "How do you assess security patches for your BES Cyber Systems?"
                    </p>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-navy mb-1">SME (Poor):</p>
                    <p className="text-sm text-muted-foreground">
                      "Oh, we handle patches when they come up. IT usually gets vendor emails and 
                      we try to install them during maintenance windows. Sometimes we're a bit behind, 
                      but we eventually get to them. We also had some issues with our old systems 
                      that can't be patched anymore..."
                    </p>
                    <p className="text-xs text-destructive mt-2">
                      ⚠️ This response is vague, admits to delays, and volunteers information about 
                      legacy system issues that wasn't asked.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-navy text-navy-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Prepare Your Team</h2>
            <p className="text-navy-foreground/80 mb-8 text-lg">
              Use our tools to practice audit scenarios, build your readiness plan, and 
              train your SMEs before the real audit arrives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/soft-skills">
                  <Users className="mr-2 h-5 w-5" />
                  Auditor Etiquette Training
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/audit-simulator">
                  <Shield className="mr-2 h-5 w-5" />
                  Audit Request Simulator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
