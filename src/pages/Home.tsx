import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Route, 
  Users, 
  FolderSearch, 
  ClipboardCheck, 
  FileText,
  ArrowRight,
  GraduationCap
} from "lucide-react";

const navigationCards = [
  {
    icon: BookOpen,
    title: "NERC CIP 101",
    description: "Learn the fundamentals of all 11 CIP standards with plain-English explanations and example audit questions.",
    href: "/nerc-cip-101",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Route,
    title: "Audit Journey",
    description: "Follow a 5-step roadmap from baseline assessment through audit week with actionable checklists.",
    href: "/audit-journey",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Users,
    title: "Role-Based Training",
    description: "Training tailored for Compliance Managers, IT/OT Engineers, Physical Security, HR, and Leadership.",
    href: "/role-training",
    color: "bg-teal/10 text-teal"
  },
  {
    icon: FolderSearch,
    title: "Evidence & Documentation Lab",
    description: "Understand what auditors consider valid evidence and how to organize documentation effectively.",
    href: "/evidence-lab",
    color: "bg-success/10 text-success"
  },
  {
    icon: ClipboardCheck,
    title: "Self-Assessment & Checklists",
    description: "Take a readiness quiz and access comprehensive checklists for audit preparation.",
    href: "/self-assessment",
    color: "bg-warning/10 text-warning"
  },
  {
    icon: FileText,
    title: "Resources & Templates",
    description: "Download templates, review glossary terms, and access external NERC resources.",
    href: "/resources",
    color: "bg-sky/10 text-sky"
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <GraduationCap className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">NERC CIP Training Platform</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              CIP Readiness Academy
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Your comprehensive resource for NERC CIP audit preparation. Learn what auditors look for, 
              train your team, and build sustainable compliance practices.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Quick Navigation Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Explore the Academy
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select a module below to begin your NERC CIP readiness journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card) => (
              <Link key={card.href} to={card.href} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg text-navy group-hover:text-primary transition-colors flex items-center gap-2">
                      {card.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Suggestions */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-navy mb-6 text-center">
              Recommended Starting Points
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link 
                to="/self-assessment" 
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="text-sm font-medium text-navy">Take the Self-Assessment</p>
                <p className="text-xs text-muted-foreground mt-1">Gauge your current readiness</p>
              </Link>
              <Link 
                to="/nerc-cip-101" 
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <div className="text-3xl font-bold text-accent mb-2">2</div>
                <p className="text-sm font-medium text-navy">Review CIP Standards</p>
                <p className="text-xs text-muted-foreground mt-1">Understand the requirements</p>
              </Link>
              <Link 
                to="/audit-journey" 
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <div className="text-3xl font-bold text-teal mb-2">3</div>
                <p className="text-sm font-medium text-navy">Plan Your Audit Journey</p>
                <p className="text-xs text-muted-foreground mt-1">Follow the 5-step roadmap</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
