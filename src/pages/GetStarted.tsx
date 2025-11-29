import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useUserPreferences, UserRole, roleLabels, experienceLabels, ExperienceLevel } from "@/hooks/useUserPreferences";
import { useProgress } from "@/hooks/useProgress";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Target, 
  ClipboardCheck,
  BookOpen,
  FolderSearch,
  Users,
  UserCog,
  Shield,
  Building2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  FileText,
  Download,
  Lightbulb
} from "lucide-react";

const roleIcons: Record<UserRole, React.ElementType> = {
  'compliance': Building2,
  'it-ot': UserCog,
  'physical-security': Shield,
  'hr-training': Users,
  'leadership': GraduationCap,
  'other': HelpCircle,
};

const roleDescriptions: Record<UserRole, string> = {
  'compliance': 'You oversee the CIP program, manage evidence, and coordinate audits.',
  'it-ot': 'You manage technical controls, patches, and system configurations.',
  'physical-security': 'You manage physical access, PSPs, and CIP-014 requirements.',
  'hr-training': 'You manage personnel training, PRAs, and access provisioning.',
  'leadership': 'You provide oversight, resources, and strategic direction for CIP.',
  'other': 'Explore all content to find what applies to your responsibilities.',
};

const gettingStartedSteps = [
  {
    id: 'role',
    title: 'Select Your Role',
    description: 'Choose your primary function to get personalized recommendations',
    icon: Users,
    completed: false,
  },
  {
    id: 'assessment',
    title: 'Take the Self-Assessment',
    description: 'Identify your knowledge gaps and focus areas',
    icon: ClipboardCheck,
    path: '/self-assessment',
    completed: false,
  },
  {
    id: 'foundations',
    title: 'Complete Foundations',
    description: 'Start with Module 1 to build your NERC CIP knowledge base',
    icon: BookOpen,
    path: '/modules#module-1',
    completed: false,
  },
  {
    id: 'role-training',
    title: 'Follow Your Role Path',
    description: 'Work through the modules most relevant to your responsibilities',
    icon: Target,
    completed: false,
  },
];

const quickResources = [
  {
    title: 'Scope & TCA Matrix',
    description: 'Determine asset classification and TCA handling',
    icon: FolderSearch,
    path: '/scope-matrix',
    badge: 'Essential',
  },
  {
    title: 'Evidence Lab',
    description: 'Sample artifacts and evidence organization',
    icon: FileText,
    path: '/evidence-lab',
    badge: 'Practice',
  },
  {
    title: 'Templates & Downloads',
    description: 'Patch tracker, training matrix, checklists',
    icon: Download,
    path: '/resources',
    badge: 'Tools',
  },
  {
    title: 'Audit Simulator',
    description: 'Practice responding to audit requests',
    icon: ClipboardCheck,
    path: '/audit-simulator',
    badge: 'Practice',
  },
];

export default function GetStarted() {
  const navigate = useNavigate();
  const { preferences, savePreferences, isLoaded } = useUserPreferences();
  const { isModuleComplete } = useProgress();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(preferences.role);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(preferences.experience);
  const [step, setStep] = useState<'role' | 'experience' | 'ready'>(
    preferences.onboardingComplete ? 'ready' : 'role'
  );

  const roles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];
  const experiences: ExperienceLevel[] = ['new', 'some', 'experienced'];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('experience');
  };

  const handleExperienceSelect = (exp: ExperienceLevel) => {
    setSelectedExperience(exp);
    if (selectedRole) {
      savePreferences({ role: selectedRole, experience: exp, onboardingComplete: true });
    }
    setStep('ready');
  };

  const getCompletedSteps = () => {
    const completed = [];
    if (preferences.role) completed.push('role');
    if (isModuleComplete(1)) completed.push('foundations');
    return completed;
  };

  const completedSteps = getCompletedSteps();
  const progressPercent = (completedSteps.length / gettingStartedSteps.length) * 100;

  const getNextStep = () => {
    if (!preferences.role) return '/self-assessment';
    if (!isModuleComplete(1)) return '/modules#module-1';
    return `/role-training/${preferences.role}`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" /> Getting Started
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-foreground mb-4">
              Your CIP Readiness Journey Starts Here
            </h1>
            <p className="text-lg text-navy-foreground/80 mb-6">
              Follow this guided path to build comprehensive NERC CIP knowledge tailored to your role.
            </p>
            
            {/* Progress indicator */}
            {preferences.onboardingComplete && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-navy-foreground/80">Your Progress</span>
                  <span className="text-sm font-medium text-navy-foreground">{completedSteps.length}/{gettingStartedSteps.length} steps</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Step 1: Role Selection (if not set) */}
          {step === 'role' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2">Step 1: What's Your Role?</h2>
                <p className="text-muted-foreground">
                  Select your primary function to get personalized module recommendations.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => {
                  const Icon = roleIcons[role];
                  return (
                    <button
                      key={role}
                      onClick={() => handleRoleSelect(role)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-center group",
                        selectedRole === role
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                        selectedRole === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy mb-1">{roleLabels[role]}</h3>
                        <p className="text-xs text-muted-foreground">{roleDescriptions[role]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Experience Selection */}
          {step === 'experience' && selectedRole && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2">Step 2: Your Experience Level</h2>
                <p className="text-muted-foreground">
                  This helps us suggest where to start and what to focus on.
                </p>
              </div>
              
              <div className="space-y-3 mb-8">
                {experiences.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => handleExperienceSelect(exp)}
                    className={cn(
                      "w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left",
                      selectedExperience === exp
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      selectedExperience === exp ? "border-primary bg-primary" : "border-muted-foreground"
                    )}>
                      {selectedExperience === exp && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{experienceLabels[exp]}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp === 'new' && "I'm just getting started with NERC CIP compliance."}
                        {exp === 'some' && "I have basic knowledge but want to deepen my understanding."}
                        {exp === 'experienced' && "I have significant CIP experience and want advanced content."}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <Button variant="ghost" onClick={() => setStep('role')} className="mr-2">
                Back
              </Button>
            </div>
          )}

          {/* Step 3: Ready - Show Learning Path */}
          {step === 'ready' && (
            <div className="max-w-5xl mx-auto">
              {/* Progress Dashboard & Role Display */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Progress Dashboard */}
                <div className="lg:col-span-2">
                  <ProgressDashboard />
                </div>

                {/* Current Role Display */}
                <div className="bg-card rounded-xl border border-border p-6 flex flex-col justify-between">
                  {preferences.role ? (
                    <>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          {(() => {
                            const Icon = roleIcons[preferences.role];
                            return (
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                            );
                          })()}
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Role</p>
                            <p className="font-semibold text-navy">{roleLabels[preferences.role]}</p>
                          </div>
                        </div>
                        {preferences.experience && (
                          <Badge variant="secondary" className="mb-4">
                            {experienceLabels[preferences.experience]}
                          </Badge>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {roleDescriptions[preferences.role]}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setStep('role')} className="mt-4">
                        Change Role
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-4">No role selected</p>
                      <Button variant="outline" size="sm" onClick={() => setStep('role')}>
                        Select Role
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Getting Started Steps */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Your Getting Started Checklist
                </h2>
                
                <div className="space-y-4">
                  {gettingStartedSteps.map((item, index) => {
                    const isComplete = completedSteps.includes(item.id);
                    const Icon = item.icon;
                    const path = item.id === 'role-training' && preferences.role 
                      ? `/role-training/${preferences.role}` 
                      : item.path;
                    
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border transition-all",
                          isComplete 
                            ? "bg-success/5 border-success/30" 
                            : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          isComplete ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {isComplete ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-bold">{index + 1}</span>}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={cn("font-semibold", isComplete ? "text-success" : "text-navy")}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        
                        {path && !isComplete && (
                          <Button asChild size="sm">
                            <Link to={path}>
                              Start <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        )}
                        
                        {isComplete && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                            Complete
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Resources */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <FolderSearch className="h-6 w-6 text-primary" />
                  Key Resources
                </h2>
                <p className="text-muted-foreground mb-6">
                  These tools and references are used throughout your learning. Bookmark them for quick access.
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickResources.map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <Link
                        key={resource.path}
                        to={resource.path}
                        className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                          </div>
                          <Badge variant="secondary" className="text-[10px]">{resource.badge}</Badge>
                        </div>
                        <h3 className="font-semibold text-navy mb-1 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Button asChild size="lg">
                  <Link to={getNextStep()}>
                    Continue Your Journey <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
