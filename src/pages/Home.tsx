import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/OnboardingModal";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { 
  BookOpen, 
  FolderSearch, 
  Users, 
  ClipboardCheck,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Lightbulb,
  Target,
  Trophy,
  Save
} from "lucide-react";

const learnCards = [
  {
    icon: BookOpen,
    title: "Understand NERC CIP Standards",
    description: "Learn all 11 CIP standards in plain language, with practical examples and real-world context for every requirement."
  },
  {
    icon: FolderSearch,
    title: "Build an Evidence System",
    description: "Create a repeatable documentation and evidence collection process that keeps you audit-ready year-round."
  },
  {
    icon: Users,
    title: "Train Every Role",
    description: "Ensure everyone from engineers to executives knows their specific CIP responsibilities and recurring tasks."
  },
  {
    icon: Target,
    title: "Practice Before the Audit",
    description: "Run through scenarios and simulations so your team is confident and prepared when auditors arrive."
  }
];

const howItWorks = [
  {
    icon: BookOpen,
    title: "Module-Based Learning",
    description: "Work through 10 structured modules covering everything from foundational concepts to advanced audit preparation."
  },
  {
    icon: ClipboardCheck,
    title: "Quizzes & Checklists",
    description: "Test your knowledge with quizzes after each module and track tasks with interactive checklists."
  },
  {
    icon: Lightbulb,
    title: "Scenarios & Case Studies",
    description: "Apply your knowledge to realistic situations you might encounter during audits or daily operations."
  },
  {
    icon: Save,
    title: "Progress Tracking",
    description: "Your progress is saved in your browser so you can pick up where you left off anytime."
  }
];

export default function Home() {
  const { preferences, isLoaded } = useUserPreferences();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (isLoaded && !preferences.onboardingComplete) {
      // Small delay to let the page render first
      const timer = setTimeout(() => setShowOnboarding(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, preferences.onboardingComplete]);

  return (
    <Layout>
      {/* Onboarding Modal */}
      <OnboardingModal 
        open={showOnboarding} 
        onComplete={() => setShowOnboarding(false)} 
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <GraduationCap className="h-5 w-5 text-white" />
              <span className="text-white/90 text-sm font-medium">NERC CIP Training Platform</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Be NERC CIP Audit-Ready All Year Long
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              A complete, end-to-end training program for power utilities preparing for NERC CIP audits. 
              Learn the standards, build your evidence system, and practice before auditors arrive.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/learning-path">
                  View the Learning Path
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/self-assessment">
                  Start the Readiness Self-Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Master the knowledge and skills needed to build a sustainable compliance program.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learnCards.map((card) => (
              <Card key={card.title} className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg text-navy">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How This Training Works */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              How This Training Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A structured approach to building audit readiness, designed for busy utility professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={item.title} className="relative">
                <div className="bg-card rounded-xl border border-border/50 p-6 h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-xl font-semibold text-navy mb-2">
                Ready to Begin?
              </h3>
              <p className="text-muted-foreground">
                Choose your starting point based on your experience level.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link 
                to="/self-assessment" 
                className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <p className="font-semibold text-navy mb-1">New to CIP?</p>
                <p className="text-sm text-muted-foreground">Take the Self-Assessment to identify gaps</p>
              </Link>
              <Link 
                to="/learning-path" 
                className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6" />
                </div>
                <p className="font-semibold text-navy mb-1">Know the Basics?</p>
                <p className="text-sm text-muted-foreground">View the Learning Path and choose your track</p>
              </Link>
              <Link 
                to="/modules" 
                className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6" />
                </div>
                <p className="font-semibold text-navy mb-1">Ready to Learn?</p>
                <p className="text-sm text-muted-foreground">Jump into Module 1 and start learning</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
