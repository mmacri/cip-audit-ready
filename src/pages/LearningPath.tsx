import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProgressWidget } from "@/components/ProgressWidget";
import { RoleSelector } from "@/components/RoleSelector";
import { useUserPreferences, roleLabels } from "@/hooks/useUserPreferences";
import { useProgress } from "@/hooks/useProgress";
import { roleTrainingPlans, moduleNames } from "@/data/roleTrainingData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Route, 
  Users, 
  Wrench,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Star
} from "lucide-react";

const tracks = [
  {
    id: "foundations",
    icon: BookOpen,
    title: "Foundations Track",
    description: "For anyone who needs to understand the overall CIP picture and core program elements. Start here if you're new to NERC CIP or need a refresher on the fundamentals.",
    modules: [1, 2, 3],
    color: "bg-primary/10 text-primary border-primary/30",
    audience: "All staff, new compliance team members, leadership needing overview"
  },
  {
    id: "role-based",
    icon: Users,
    title: "Role-Based Track",
    description: "Select modules based on your specific job function. Each role has different compliance responsibilities and needs focused training on the requirements most relevant to their work.",
    roles: [
      { name: "Compliance / Risk Manager", modules: [1, 3, 7, 9, 10], why: "Focus on governance, documentation, and audit readiness" },
      { name: "IT/OT Engineer", modules: [1, 2, 5, 6, 7, 8], why: "Focus on technical controls and system security" },
      { name: "Physical Security", modules: [1, 2, 5, 7], why: "Focus on perimeters and incident response" },
      { name: "HR/Training", modules: [1, 3, 4], why: "Focus on people, policies, and training requirements" },
      { name: "Leadership", modules: [1, 3, 10], why: "Focus on oversight, governance, and continuous improvement" }
    ],
    color: "bg-accent/10 text-accent border-accent/30",
    note: "Visit the Role-Based Training page for detailed responsibilities and scenarios for each role."
  },
  {
    id: "implementation",
    icon: Wrench,
    title: "Implementation & Audit Track",
    description: "For teams building evidence inventories, audit playbooks, and continuous improvement cycles. This track focuses on practical implementation and preparing for the actual audit experience.",
    modules: [6, 7, 8, 9, 10],
    color: "bg-success/10 text-success border-success/30",
    audience: "Compliance managers, audit coordinators, senior technical staff"
  }
];

export default function LearningPath() {
  const { preferences } = useUserPreferences();
  const { progress } = useProgress();
  
  // Get role-specific module recommendations
  const rolePlan = preferences.role ? roleTrainingPlans[preferences.role] : null;
  const requiredModules = rolePlan 
    ? [...new Set(rolePlan.phases.flatMap(p => p.modules.filter(m => m.required).map(m => m.id)))]
    : [];
  const recommendedModules = rolePlan
    ? [...new Set(rolePlan.phases.flatMap(p => p.modules.filter(m => !m.required).map(m => m.id)))]
    : [];

  const getModuleBadge = (moduleNum: number) => {
    if (requiredModules.includes(moduleNum)) return 'required';
    if (recommendedModules.includes(moduleNum)) return 'recommended';
    return null;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Route className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Learning Path
            </h1>
            <p className="text-lg text-muted-foreground">
              Use this page as your roadmap through the training content. Choose the track that 
              matches your role and experience level, then work through the recommended modules.
            </p>
          </div>
        </div>
      </section>

      {/* Role Selector & Progress Widget */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">Select Your Role Path</h2>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <RoleSelector className="flex-1" />
                {preferences.role && (
                  <Button asChild>
                    <Link to={`/role-training/${preferences.role}`}>
                      View Full Training Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
              {preferences.role && (
                <p className="text-sm text-muted-foreground mt-3">
                  Your role selection personalizes module recommendations below and unlocks your dedicated training plan.
                </p>
              )}
            </div>
            <ProgressWidget />
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {tracks.map((track) => (
              <div 
                key={track.id}
                className={`bg-card rounded-xl border-2 p-6 md:p-8 ${track.color}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center shrink-0">
                    <track.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-2">{track.title}</h2>
                    <p className="text-muted-foreground">{track.description}</p>
                  </div>
                </div>

                {track.modules && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-navy mb-3">Recommended Modules:</h3>
                    <div className="flex flex-wrap gap-2">
                      {track.modules.map((moduleNum) => {
                        const badge = getModuleBadge(moduleNum);
                        const isComplete = progress.completedModules.includes(moduleNum);
                        return (
                          <Link
                            key={moduleNum}
                            to={`/modules#module-${moduleNum}`}
                            className={cn(
                              "inline-flex items-center gap-2 bg-background rounded-lg px-3 py-2 text-sm hover:shadow-md transition-all group",
                              badge === 'required' && "ring-2 ring-primary/30",
                              badge === 'recommended' && "ring-1 ring-accent/30"
                            )}
                          >
                            <span className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                              isComplete 
                                ? "bg-success text-success-foreground" 
                                : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                            )}>
                              {isComplete ? <CheckCircle2 className="h-3 w-3" /> : moduleNum}
                            </span>
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {moduleNames[moduleNum]}
                            </span>
                            {badge === 'required' && preferences.role && (
                              <Badge variant="default" className="text-[10px] px-1.5">Required</Badge>
                            )}
                            {badge === 'recommended' && preferences.role && (
                              <Badge variant="secondary" className="text-[10px] px-1.5">Recommended</Badge>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                    {preferences.role && track.id === 'foundations' && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Star className="h-3 w-3 text-primary" />
                        For {roleLabels[preferences.role]}: This track provides essential context for your role.
                      </p>
                    )}
                  </div>
                )}

                {track.roles && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-navy mb-3">Modules by Role:</h3>
                    <div className="bg-background rounded-xl p-4 space-y-4">
                      {track.roles.map((role) => {
                        const isCurrentRole = preferences.role && roleLabels[preferences.role] === role.name;
                        return (
                          <div 
                            key={role.name} 
                            className={cn(
                              "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg transition-colors",
                              isCurrentRole && "bg-primary/5 ring-1 ring-primary/20"
                            )}
                          >
                            <div>
                              <span className={cn("font-medium", isCurrentRole ? "text-primary" : "text-navy")}>
                                {role.name}
                                {isCurrentRole && <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Your Role</span>}
                              </span>
                              {role.why && <p className="text-xs text-muted-foreground">{role.why}</p>}
                            </div>
                            <div className="flex gap-1">
                              {role.modules.map((m) => {
                                const isComplete = progress.completedModules.includes(m);
                                return (
                                  <Link
                                    key={m}
                                    to={`/modules#module-${m}`}
                                    className={cn(
                                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                                      isComplete 
                                        ? "bg-success text-success-foreground" 
                                        : "bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground"
                                    )}
                                  >
                                    {isComplete ? <CheckCircle2 className="h-3 w-3" /> : m}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {track.note && (
                      <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        {track.note}
                      </p>
                    )}
                    {preferences.role && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/role-training/${preferences.role}`}>
                            View Full {roleLabels[preferences.role]} Training Plan
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {track.audience && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Best for:</strong> {track.audience}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-navy mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-muted-foreground mb-6">
              Head to the Modules page to begin your training journey. Each module includes 
              learning objectives, content sections, exercises, and a quiz to test your knowledge.
            </p>
            <Button asChild size="lg">
              <Link to="/modules">
                Browse All Modules
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
