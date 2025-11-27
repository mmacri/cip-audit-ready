import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  ClipboardCheck, 
  Users, 
  CalendarCheck,
  Building2,
  Factory,
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const whyCards = [
  {
    icon: Shield,
    title: "Demystify NERC CIP",
    description: "Break down complex regulatory requirements into plain-English explanations that everyone on your team can understand and act on."
  },
  {
    icon: ClipboardCheck,
    title: "Turn Chaos Into a Plan",
    description: "Transform overwhelming compliance tasks into a structured, step-by-step journey with clear milestones and accountability."
  },
  {
    icon: Users,
    title: "Train Every Role",
    description: "Role-specific training ensures that compliance managers, engineers, HR, and leadership all know exactly what they need to do."
  },
  {
    icon: CalendarCheck,
    title: "Stay Ready, Not Just Audit Ready",
    description: "Build sustainable compliance practices that keep you prepared 365 days a year, not just the week before an audit."
  }
];

const audiences = [
  { icon: Zap, label: "Investor-Owned Utilities (IOUs)" },
  { icon: Building2, label: "Municipal Electric Utilities" },
  { icon: Factory, label: "Electric Cooperatives" },
  { icon: Zap, label: "Independent Power Producers" },
  { icon: Building2, label: "Transmission Owners & Operators" },
  { icon: Factory, label: "Generation Owners & Operators" }
];

const learningOutcomes = [
  "Understand what each of the 11 CIP standards requires and why",
  "Build an evidence collection system that auditors love",
  "Create recurring task schedules that prevent last-minute scrambles",
  "Train staff at every level on their specific responsibilities",
  "Conduct internal mock audits to find gaps before regulators do",
  "Organize documentation so any evidence is findable in minutes",
  "Respond confidently to auditor questions with prepared answers"
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
              Be NERC CIP Audit-Ready All Year Long
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Learn exactly what auditors look for, how to organize your evidence, and how to train your team. 
              Stop dreading audits and start confidently demonstrating compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Button asChild size="xl" variant="white">
                <Link to="/audit-journey">
                  Start the Readiness Path
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/self-assessment">
                  Take the Quick Self-Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Why CIP Readiness Academy */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why CIP Readiness Academy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              NERC CIP compliance is complex, but it does not have to be chaotic. 
              We help you build a sustainable compliance program.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, index) => (
              <div
                key={card.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Who This Is For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CIP Readiness Academy serves NERC-registered entities who own, operate, or maintain critical bulk electric system infrastructure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {audiences.map((audience, index) => (
              <div
                key={audience.label}
                className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <audience.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="font-medium text-navy">{audience.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                What You Will Learn
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive curriculum takes you from understanding the basics of NERC CIP 
                to confidently walking auditors through your compliance program.
              </p>
              <ul className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border/50">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-primary">11</div>
                  <div className="text-muted-foreground">CIP Standards Covered</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-accent">5</div>
                  <div className="text-muted-foreground">Role-Specific Training Tracks</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-navy">∞</div>
                  <div className="text-muted-foreground">Ongoing Readiness Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-navy">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Compliance Program?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Start your journey to audit confidence today. Explore our comprehensive training materials 
            and take your first step toward sustainable compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="white">
              <Link to="/audit-journey">
                Begin Your Audit Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              <Link to="/about">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
