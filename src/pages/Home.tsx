import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/OnboardingModal";
import { useUserPreferences, UserRole, roleLabels } from "@/hooks/useUserPreferences";
import { 
  ArrowRight,
  GraduationCap,
  Target,
  BookOpen,
  Rocket,
  Award,
  CheckCircle2,
  User
} from "lucide-react";

// Map UserRole to URL slugs
const roleToSlug: Record<UserRole, string> = {
  'compliance': 'compliance',
  'it-ot': 'it-ot',
  'physical-security': 'physical-security',
  'hr-training': 'hr-training',
  'leadership': 'leadership',
  'other': 'compliance',
};

const journeySteps = [
  {
    number: 1,
    icon: User,
    title: "Choose your role",
    description: "Understand how CIP applies to your specific responsibilities.",
  },
  {
    number: 2,
    icon: Target,
    title: "Follow your role's training steps",
    description: "Use your role training page as your home base with phases, checklists, and missions.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Practice with missions and tools",
    description: "Apply what you learn with scenarios, evidence guidance, and audit simulations.",
  },
  {
    number: 4,
    icon: Award,
    title: "Check your readiness and earn your certificate",
    description: "Complete your path, review your achievements, and generate a role completion certificate.",
  },
];

export default function Home() {
  const { preferences, isLoaded } = useUserPreferences();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !preferences.onboardingComplete) {
      const timer = setTimeout(() => setShowOnboarding(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, preferences.onboardingComplete]);

  const handleOnboardingComplete = (selectedRole?: UserRole) => {
    setShowOnboarding(false);
    if (selectedRole) {
      navigate(`/role-training/${roleToSlug[selectedRole]}`);
    } else {
      navigate('/get-started');
    }
  };

  const handleChooseRole = () => {
    if (preferences.role) {
      navigate(`/role-training/${roleToSlug[preferences.role]}`);
    } else {
      navigate('/get-started');
    }
  };

  return (
    <Layout>
      {/* Onboarding Modal */}
      <OnboardingModal 
        open={showOnboarding} 
        onComplete={handleOnboardingComplete} 
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
              A complete training program for power utilities preparing for NERC CIP audits. 
              Learn the standards, build your evidence system, and practice before auditors arrive.
            </p>
            <div className="flex flex-col items-center gap-4 pt-6">
              <p className="text-white/80 text-sm max-w-md text-center">
                Begin by choosing your role so we can tailor the CIP training path to your responsibilities.
              </p>
              <Button 
                onClick={handleChooseRole}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-6 h-auto font-semibold"
              >
                {preferences.role ? (
                  <>
                    Continue as {roleLabels[preferences.role].split(' ')[0]}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    Start: Choose Your Role
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Link 
                to="/modules"
                className="text-white/80 hover:text-white text-sm underline underline-offset-4 transition-colors"
              >
                Or browse all modules without choosing a role
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Your CIP Readiness Journey - Golden Path */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              Your CIP Readiness Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow this proven path to build practical audit readiness for your role.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {journeySteps.map((step) => (
                <Card key={step.number} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg text-navy">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="mt-10 text-center space-y-6">
              <Button 
                onClick={handleChooseRole}
                size="lg" 
                className="shadow-xl text-lg px-8 py-6 h-auto font-semibold"
              >
                {preferences.role ? (
                  <>
                    Go to My Role Training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    Start: Choose Your Role
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                Or{" "}
                <Link to="/modules" className="text-primary hover:underline">
                  browse all modules
                </Link>
                {" "}to explore content without committing to a role yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role Status (if role selected) */}
      {preferences.role && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-navy">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    You're following the {roleLabels[preferences.role]} path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Your role training page is your home base. Continue where you left off or explore other areas.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to={`/role-training/${roleToSlug[preferences.role]}`}>
                        Go to My Role Training
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/achievements">
                        View Achievements
                      </Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link to="/get-started">
                        Change Role
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* What You'll Learn - simplified */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Build practical knowledge and skills for NERC CIP compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, title: "All 13 CIP Standards", description: "Learn requirements in plain language with practical examples." },
              { icon: Target, title: "Role-Specific Tasks", description: "Know exactly what's expected for your position." },
              { icon: Rocket, title: "Hands-On Practice", description: "Build evidence skills through missions and simulations." },
              { icon: Award, title: "Verifiable Progress", description: "Track completion and earn role certificates." },
            ].map((item) => (
              <Card key={item.title} className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
