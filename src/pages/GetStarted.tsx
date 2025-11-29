import { useState, useEffect } from "react";
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
  Lightbulb,
  ArrowLeft,
  XCircle
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

// Assessment questions embedded in onboarding
const assessmentQuestions = [
  { id: 1, question: "Do you have a designated CIP Senior Manager with documented delegation?", category: "governance" },
  { id: 2, question: "Can you produce a complete BES Cyber System inventory with impact ratings?", category: "governance" },
  { id: 3, question: "Are all cyber security policies reviewed within the last 15 months?", category: "governance" },
  { id: 4, question: "Are security patches assessed within 35 days with documented disposition?", category: "technical" },
  { id: 5, question: "Is there evidence of monthly security log reviews?", category: "technical" },
  { id: 6, question: "Has your incident response plan been tested within the last 15 months?", category: "technical" },
  { id: 7, question: "Is your evidence organized by CIP requirement for easy retrieval?", category: "evidence" },
  { id: 8, question: "Can you retrieve any piece of compliance evidence in under 5 minutes?", category: "evidence" },
  { id: 9, question: "Have you conducted a mock audit or internal assessment this year?", category: "evidence" },
];

const categoryModules: Record<string, number[]> = {
  governance: [1, 2, 3],
  technical: [5, 6, 7, 8],
  evidence: [9, 10],
};

const quickResources = [
  { title: 'Scope & TCA Matrix', description: 'Asset classification guide', icon: FolderSearch, path: '/scope-matrix', badge: 'Essential' },
  { title: 'Evidence Lab', description: 'Sample artifacts & evidence', icon: FileText, path: '/evidence-lab', badge: 'Practice' },
  { title: 'Templates', description: 'Checklists & matrices', icon: Download, path: '/resources', badge: 'Tools' },
  { title: 'Audit Simulator', description: 'Practice requests', icon: ClipboardCheck, path: '/audit-simulator', badge: 'Practice' },
];

export default function GetStarted() {
  const navigate = useNavigate();
  const { preferences, savePreferences, isLoaded } = useUserPreferences();
  const { progress, isModuleComplete } = useProgress();
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(preferences.role);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(preferences.experience);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, boolean>>({});
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);
  
  // Determine current step based on saved preferences
  const [step, setStep] = useState<'role' | 'experience' | 'assessment' | 'ready'>(
    preferences.onboardingComplete ? 'ready' : 'role'
  );

  const roles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];
  const experiences: ExperienceLevel[] = ['new', 'some', 'experienced'];

  // Load any saved assessment from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cip-readiness-assessment');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAssessmentAnswers(parsed.answers || {});
        if (parsed.completed) setShowAssessmentResults(true);
      } catch (e) {
        console.error('Failed to load assessment', e);
      }
    }
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('experience');
  };

  const handleExperienceSelect = (exp: ExperienceLevel) => {
    setSelectedExperience(exp);
    // For new users, show assessment; for experienced users, skip to ready
    if (exp === 'experienced') {
      if (selectedRole) {
        savePreferences({ role: selectedRole, experience: exp, onboardingComplete: true });
      }
      setStep('ready');
    } else {
      setStep('assessment');
    }
  };

  const handleAssessmentAnswer = (questionId: number, answer: boolean) => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleAssessmentSubmit = () => {
    // Save assessment results
    localStorage.setItem('cip-readiness-assessment', JSON.stringify({
      answers: assessmentAnswers,
      completed: true,
      date: new Date().toISOString()
    }));
    
    // Complete onboarding
    if (selectedRole) {
      savePreferences({ role: selectedRole, experience: selectedExperience!, onboardingComplete: true });
    }
    
    setShowAssessmentResults(true);
    setStep('ready');
  };

  const getWeakestCategory = () => {
    const scores: Record<string, { yes: number; total: number }> = {
      governance: { yes: 0, total: 0 },
      technical: { yes: 0, total: 0 },
      evidence: { yes: 0, total: 0 },
    };
    
    assessmentQuestions.forEach(q => {
      scores[q.category].total++;
      if (assessmentAnswers[q.id] === true) scores[q.category].yes++;
    });
    
    let weakest = 'governance';
    let lowestPercent = 100;
    Object.entries(scores).forEach(([cat, { yes, total }]) => {
      const pct = total > 0 ? (yes / total) * 100 : 0;
      if (pct < lowestPercent) {
        lowestPercent = pct;
        weakest = cat;
      }
    });
    
    return weakest;
  };

  const getRecommendedModules = () => {
    const weakest = getWeakestCategory();
    return categoryModules[weakest] || [1, 2, 3];
  };

  const assessmentComplete = Object.keys(assessmentAnswers).length === assessmentQuestions.length;
  const completedModulesCount = progress.completedModules.length;

  // Steps for the checklist
  const gettingStartedSteps = [
    { id: 'role', title: 'Select Your Role', description: 'Personalize your learning path', completed: !!preferences.role },
    { id: 'assessment', title: 'Complete Readiness Assessment', description: 'Identify your focus areas', completed: showAssessmentResults },
    { id: 'foundations', title: 'Complete Module 1', description: 'Build your NERC CIP foundation', completed: isModuleComplete(1), path: '/modules#module-1' },
    { id: 'role-training', title: 'Follow Your Role Path', description: 'Complete role-specific modules', completed: completedModulesCount >= 5, path: preferences.role ? `/role-training/${preferences.role}` : '/role-training' },
    { id: 'final-exam', title: 'Pass the Final Exam', description: 'Earn your certificate', completed: localStorage.getItem('finalExamPassed') === 'true', path: '/final-exam' },
  ];

  const completedStepsCount = gettingStartedSteps.filter(s => s.completed).length;
  const progressPercent = (completedStepsCount / gettingStartedSteps.length) * 100;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" /> My Training Plan
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-foreground mb-4">
              {step === 'ready' ? 'Your CIP Readiness Journey' : 'Get Started with CIP Training'}
            </h1>
            <p className="text-lg text-navy-foreground/80 mb-6">
              {step === 'ready' 
                ? 'Track your progress and continue your personalized learning path.'
                : 'Complete a quick setup to get personalized training recommendations.'
              }
            </p>
            
            {/* Progress indicator for ready state */}
            {step === 'ready' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-navy-foreground/80">Journey Progress</span>
                  <span className="text-sm font-medium text-navy-foreground">{completedStepsCount}/{gettingStartedSteps.length}</span>
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
          {/* Step 1: Role Selection */}
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
              
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't worry—you can change this anytime from your dashboard.
              </p>
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
                  This helps us suggest where to start.
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

              <Button variant="ghost" onClick={() => setStep('role')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
          )}

          {/* Step 3: Readiness Assessment */}
          {step === 'assessment' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2">Step 3: Readiness Assessment</h2>
                <p className="text-muted-foreground">
                  Answer these 9 questions to identify your focus areas. Be honest—this helps personalize your path.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {assessmentQuestions.map((q, index) => (
                  <div 
                    key={q.id}
                    className={cn(
                      "bg-card rounded-xl border p-4 transition-all",
                      assessmentAnswers[q.id] === true ? "border-success/50 bg-success/5" 
                        : assessmentAnswers[q.id] === false ? "border-warning/50 bg-warning/5"
                        : "border-border/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-foreground mb-3">{q.question}</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAssessmentAnswer(q.id, true)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                              assessmentAnswers[q.id] === true
                                ? "bg-success text-success-foreground"
                                : "bg-muted hover:bg-success/20 text-muted-foreground"
                            )}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Yes
                          </button>
                          <button
                            onClick={() => handleAssessmentAnswer(q.id, false)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                              assessmentAnswers[q.id] === false
                                ? "bg-warning text-warning-foreground"
                                : "bg-muted hover:bg-warning/20 text-muted-foreground"
                            )}
                          >
                            <XCircle className="h-4 w-4" /> No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep('experience')}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {Object.keys(assessmentAnswers).length}/{assessmentQuestions.length} answered
                  </span>
                  <Button onClick={handleAssessmentSubmit} disabled={!assessmentComplete}>
                    See My Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                <button 
                  onClick={() => {
                    if (selectedRole) savePreferences({ role: selectedRole, experience: selectedExperience!, onboardingComplete: true });
                    setStep('ready');
                  }}
                  className="text-primary hover:underline"
                >
                  Skip assessment and explore all modules →
                </button>
              </p>
            </div>
          )}

          {/* Ready State - Main Dashboard */}
          {step === 'ready' && (
            <div className="max-w-5xl mx-auto">
              {/* Assessment Results Banner (if just completed) */}
              {showAssessmentResults && Object.keys(assessmentAnswers).length > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-2">Based on Your Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your weakest area is <strong className="text-foreground">{getWeakestCategory()}</strong>. 
                        We recommend focusing on these modules first:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {getRecommendedModules().map(m => (
                          <Link 
                            key={m} 
                            to={`/modules#module-${m}`}
                            className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                          >
                            Module {m}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Dashboard & Role Display */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
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
                      <div className="flex flex-col gap-2 mt-4">
                        <Button asChild>
                          <Link to={`/role-training/${preferences.role}`}>
                            View Role Training <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setStep('role')}>
                          Change Role
                        </Button>
                      </div>
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

              {/* Journey Checklist */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Your Learning Journey
                </h2>
                
                <div className="space-y-3">
                  {gettingStartedSteps.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all",
                        item.completed 
                          ? "bg-success/5 border-success/30" 
                          : "bg-card border-border hover:border-primary/30"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        item.completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-bold">{index + 1}</span>}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={cn("font-semibold", item.completed ? "text-success" : "text-navy")}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      
                      {item.path && !item.completed && (
                        <Button asChild size="sm">
                          <Link to={item.path}>
                            Start <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      )}
                      
                      {item.completed && (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                          Complete
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Resources */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                  <FolderSearch className="h-6 w-6 text-primary" />
                  Quick Access
                </h2>
                
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

              {/* CTA to Explore All Modules */}
              <div className="mt-12 text-center p-8 bg-muted/50 rounded-xl">
                <h3 className="text-xl font-semibold text-navy mb-2">Want to explore everything?</h3>
                <p className="text-muted-foreground mb-4">
                  Browse all 12 modules covering every aspect of NERC CIP compliance.
                </p>
                <Button asChild size="lg">
                  <Link to="/modules">
                    Browse All Modules <ArrowRight className="ml-2 h-5 w-5" />
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