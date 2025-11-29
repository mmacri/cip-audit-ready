import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useUserPreferences, UserRole, roleLabels, experienceLabels } from '@/hooks/useUserPreferences';
import { useRoleProgress } from '@/hooks/useRoleProgress';
import { useProgress } from '@/hooks/useProgress';
import { useBadges } from '@/hooks/useBadges';
import { usePreAssessment } from '@/hooks/usePreAssessment';
import { roleTrainingPlans, moduleNames } from '@/data/roleTrainingData';
import { roleMissions } from '@/data/roleMissionsData';
import { domainLabels, domainModuleMapping } from '@/data/preAssessmentData';
import { getReflectionContextForRole } from '@/data/reflectionPromptsData';
import { RoleTaskChecklist } from '@/components/RoleTaskChecklist';
import { TrainingPlanGenerator } from '@/components/TrainingPlanGenerator';
import { MissionCard } from '@/components/MissionCard';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { PreAssessment } from '@/components/PreAssessment';
import { RoleScenarioPlayer } from '@/components/RoleScenarioPlayer';
import { PitfallsSection } from '@/components/PitfallsSection';
import { ReflectionPanel } from '@/components/ReflectionPanel';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  Wrench,
  ArrowRight,
  ExternalLink,
  Star,
  Rocket,
  Award,
  ClipboardCheck,
  AlertTriangle,
  Lightbulb,
  ChevronDown
} from 'lucide-react';

const roleIcons: Record<UserRole, typeof Target> = {
  compliance: Target,
  'it-ot': Wrench,
  'physical-security': CheckCircle2,
  'hr-training': BookOpen,
  leadership: Star,
  other: BookOpen,
};

export default function RoleTrainingDetail() {
  const { roleId } = useParams<{ roleId: string }>();
  const { preferences } = useUserPreferences();
  const { progress } = useProgress();
  const { getCurrentRoleProgress, toggleTask, isTaskComplete, toggleMission, isMissionComplete, allProgress } = useRoleProgress(roleId as UserRole);
  const { isRoleComplete, getRoleCompletionProgress } = useBadges();
  const { hasCompletedAssessment, getRecommendedFocus } = usePreAssessment();

  // Validate roleId
  const validRoles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];
  if (!roleId || !validRoles.includes(roleId as UserRole)) {
    return <Navigate to="/role-training" replace />;
  }

  const role = roleId as UserRole;
  const rolePlan = roleTrainingPlans[role];
  const missions = roleMissions[role] || [];
  const roleProgress = getCurrentRoleProgress();
  const RoleIcon = roleIcons[role];

  // Calculate stats
  const totalTasks = rolePlan.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = roleProgress.tasksCompleted.length;
  const taskPercentage = Math.round((completedTasks / totalTasks) * 100);

  const completedMissions = roleProgress.missionsCompleted.length;
  const totalMissions = missions.length;

  const requiredModules = [...new Set(rolePlan.phases.flatMap(p => p.modules.filter(m => m.required).map(m => m.id)))];
  const completedRequiredModules = requiredModules.filter(m => progress.completedModules.includes(m)).length;

  const allModules = [...new Set(rolePlan.phases.flatMap(p => p.modules.map(m => m.id)))];
  const completedAllModules = allModules.filter(m => progress.completedModules.includes(m)).length;

  const roleComplete = isRoleComplete(role, allProgress[role]);
  const completionProgress = getRoleCompletionProgress(role, allProgress[role]);
  const hasAssessment = hasCompletedAssessment(role);
  const recommendedFocus = getRecommendedFocus(role);
  const reflectionContext = getReflectionContextForRole(role);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <RoleIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
                  {rolePlan.title} Training Plan
                </h1>
                <p className="text-muted-foreground">
                  Your personalized path to NERC CIP compliance mastery
                </p>
              </div>
            </div>

            {/* Role Dashboard */}
            <div className="bg-card rounded-xl border border-border/50 p-6 shadow-card">
              <div className="grid sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-navy">Tasks</span>
                  </div>
                  <p className="text-2xl font-bold text-success">{completedTasks} / {totalTasks}</p>
                  <Progress value={taskPercentage} className="h-1.5 mt-2" />
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-navy">Missions</span>
                  </div>
                  <p className="text-2xl font-bold text-accent">{completedMissions} / {totalMissions}</p>
                  <Progress value={totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0} className="h-1.5 mt-2" />
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-navy">Required Modules</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{completedRequiredModules} / {requiredModules.length}</p>
                  <Progress value={requiredModules.length > 0 ? (completedRequiredModules / requiredModules.length) * 100 : 0} className="h-1.5 mt-2" />
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-navy" />
                    <span className="text-sm font-medium text-navy">All Modules</span>
                  </div>
                  <p className="text-2xl font-bold text-navy">{completedAllModules} / {allModules.length}</p>
                  <Progress value={allModules.length > 0 ? (completedAllModules / allModules.length) * 100 : 0} className="h-1.5 mt-2" />
                </div>
              </div>

              {/* Key Tools */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-muted-foreground mr-2">Key Tools:</span>
                {rolePlan.keyTools.map((tool) => (
                  <Link
                    key={tool.link}
                    to={tool.link}
                    className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {tool.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ))}
              </div>

              {/* Certificate Button */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Award className={`h-5 w-5 ${roleComplete ? 'text-success' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {roleComplete ? 'Role Path Complete!' : 'Role Completion Certificate'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {roleComplete 
                          ? 'You\'ve completed all requirements for this role path.'
                          : `${completionProgress.overall}% complete - finish required steps to unlock your certificate`}
                      </p>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    variant={roleComplete ? 'default' : 'outline'}
                    size="sm"
                    className={!roleComplete ? 'opacity-70' : ''}
                  >
                    <Link to={`/role-training/${role}/certificate`}>
                      {roleComplete ? 'View Certificate' : 'View Requirements'}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Assessment Banner or Recommendations */}
      <section className="py-6 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {!hasAssessment ? (
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    Readiness Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a quick 10-question assessment to identify your focus areas and get personalized recommendations.
                  </p>
                  <PreAssessment role={role} />
                </CardContent>
              </Card>
            ) : recommendedFocus && (
              <Card className="border-success/30 bg-success/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-success">
                    <Lightbulb className="h-5 w-5" />
                    Recommended Starting Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your assessment (avg: {Math.round(recommendedFocus.averageScore)}%), we recommend focusing on:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendedFocus.weakestDomains.map(domain => (
                      <Badge key={domain} variant="outline" className="bg-background">
                        {domainLabels[domain]}
                      </Badge>
                    ))}
                  </div>
                  {recommendedFocus.needsFoundations && (
                    <p className="text-xs text-muted-foreground">
                      Start with Phase 1 – Foundations before diving into specialized content.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Role Overview */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-navy mb-4">Role Overview</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold text-navy mb-2">Your Role</h3>
                <p className="text-sm text-muted-foreground">{rolePlan.overview}</p>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold text-navy mb-2">Your Accountability</h3>
                <p className="text-sm text-muted-foreground">{rolePlan.accountability}</p>
              </div>
            </div>
            
            {/* Achievements Section */}
            <BadgeDisplay role={role} roleProgress={allProgress[role]} />
          </div>
        </div>
      </section>

      {/* Main Content Tabs - Consolidated into Plan and Tools */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="plan" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              {/* Plan Tab - Phases, Missions, with collapsible Scenario/Pitfalls */}
              <TabsContent value="plan" className="space-y-6">
                {/* Phased Training Plan */}
                {rolePlan.phases.map((phase, index) => (
                  <div key={phase.id} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                    <div className="bg-muted/50 px-6 py-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-navy">{phase.name}</h3>
                          <p className="text-xs text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Modules for this phase */}
                      {phase.modules.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-navy mb-3">Modules</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.modules.map((module) => (
                              <Link
                                key={module.id}
                                to={`/modules#module-${module.id}`}
                                className="inline-flex items-center gap-2 bg-muted hover:bg-primary/10 rounded-lg px-3 py-2 text-sm transition-colors group border border-transparent hover:border-primary/30"
                                title="Click to open module"
                              >
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                  {module.id}
                                </span>
                                <span className="text-muted-foreground group-hover:text-foreground">
                                  {module.name}
                                </span>
                                <Badge variant={module.required ? "default" : "secondary"} className="text-[10px]">
                                  {module.required ? 'Required' : 'Recommended'}
                                </Badge>
                                {progress.completedModules.includes(module.id) ? (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                ) : (
                                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tasks checklist */}
                      <RoleTaskChecklist
                        title="Tasks"
                        tasks={phase.tasks}
                        completedTasks={roleProgress.tasksCompleted}
                        onToggleTask={toggleTask}
                      />
                    </div>
                  </div>
                ))}

                {/* Missions Section */}
                <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <div className="bg-accent/10 px-6 py-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <Rocket className="h-5 w-5 text-accent" />
                      <div>
                        <h3 className="font-semibold text-navy">Role Missions</h3>
                        <p className="text-xs text-muted-foreground">Scenario-based assignments that apply what you've learned</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">{completedMissions}/{totalMissions}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {missions.map((mission) => (
                      <MissionCard
                        key={mission.id}
                        mission={mission}
                        isComplete={isMissionComplete(mission.id)}
                        onToggleComplete={toggleMission}
                      />
                    ))}
                    <ReflectionPanel
                      role={role}
                      contextType="mission"
                      contextId={`${role}-missions`}
                      reflectionContext={reflectionContext}
                    />
                  </div>
                </div>

                {/* Collapsible Scenario Section */}
                <Collapsible>
                  <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                    <CollapsibleTrigger className="w-full bg-muted/50 px-6 py-4 border-b border-border/50 flex items-center justify-between hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-accent" />
                        <div className="text-left">
                          <h3 className="font-semibold text-navy">Interactive Branching Scenario</h3>
                          <p className="text-xs text-muted-foreground">Practice decision-making in realistic situations</p>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-6 space-y-4">
                        <RoleScenarioPlayer role={role} />
                        <ReflectionPanel
                          role={role}
                          contextType="scenario"
                          contextId={`${role}-scenario`}
                          reflectionContext={reflectionContext}
                        />
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Collapsible Pitfalls Section */}
                <Collapsible>
                  <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                    <CollapsibleTrigger className="w-full bg-muted/50 px-6 py-4 border-b border-border/50 flex items-center justify-between hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber" />
                        <div className="text-left">
                          <h3 className="font-semibold text-navy">Common Pitfalls & Audit Red Flags</h3>
                          <p className="text-xs text-muted-foreground">Learn from mistakes and recognize warning signs</p>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-6">
                        <PitfallsSection role={role} />
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </TabsContent>

              {/* Tools Tab - Timeline and Export */}
              <TabsContent value="tools" className="space-y-6">
                {/* Timeline View */}
                <div className="bg-muted/30 rounded-xl border border-border/50 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-navy">Timeline View</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Organize your training by time horizon. Use these milestones to plan your progress.
                  </p>
                </div>
                
                {rolePlan.timeHorizons.map((horizon) => (
                  <div key={horizon.id} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                    <div className="bg-muted/50 px-6 py-4 border-b border-border/50 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-navy">{horizon.name}</h3>
                    </div>
                    <div className="p-6">
                      <RoleTaskChecklist
                        title=""
                        tasks={horizon.tasks}
                        completedTasks={roleProgress.tasksCompleted}
                        onToggleTask={toggleTask}
                      />
                    </div>
                  </div>
                ))}

                {/* Training Plan Generator */}
                <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b border-border/50 flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-navy">Export Training Plan</h3>
                      <p className="text-xs text-muted-foreground">Generate a personalized plan to share or print</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <TrainingPlanGenerator role={role} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-navy mb-4">
              Ready to Start?
            </h3>
            <p className="text-muted-foreground mb-6">
              Begin with the first phase of your training plan, or jump to the modules page to explore all content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/modules">
                  Browse Modules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/get-started">
                  Back to My Training Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
