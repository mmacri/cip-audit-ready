import { useProgress } from '@/hooks/useProgress';
import { useRoleProgress } from '@/hooks/useRoleProgress';
import { useUserPreferences, UserRole, roleLabels, roleModules } from '@/hooks/useUserPreferences';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  BookOpen, 
  Target, 
  CheckCircle2,
  Rocket,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_MODULES = 12;

export function ProgressDashboard() {
  const { preferences, isLoaded: prefsLoaded } = useUserPreferences();
  const { progress, getCompletionPercentage, isLoaded: progressLoaded } = useProgress();
  const { getProgressStats, isLoaded: roleProgressLoaded } = useRoleProgress(preferences.role);

  if (!prefsLoaded || !progressLoaded || !roleProgressLoaded) {
    return null;
  }

  const overallPercentage = getCompletionPercentage();
  const completedModules = progress.completedModules.length;
  
  // Role-specific stats
  const roleStats = preferences.role ? getProgressStats(preferences.role) : null;
  const roleRequiredModules = preferences.role ? roleModules[preferences.role] : [];
  const roleModulesCompleted = roleRequiredModules.filter(m => progress.completedModules.includes(m)).length;
  const roleModulePercentage = roleRequiredModules.length > 0 
    ? Math.round((roleModulesCompleted / roleRequiredModules.length) * 100) 
    : 0;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-navy">Progress Dashboard</h3>
            <p className="text-sm text-muted-foreground">Track your learning journey</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-navy">Overall Modules</span>
            </div>
            <Badge variant={overallPercentage === 100 ? "default" : "secondary"} className="text-xs">
              {completedModules}/{TOTAL_MODULES}
            </Badge>
          </div>
          <Progress value={overallPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {overallPercentage === 100 
              ? "🎉 All modules complete!" 
              : `${overallPercentage}% complete`}
          </p>
        </div>

        {/* Role-Specific Progress */}
        {preferences.role && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-teal" />
                <span className="text-sm font-medium text-navy">{roleLabels[preferences.role]} Path</span>
              </div>
              <Badge variant={roleModulePercentage === 100 ? "default" : "outline"} className="text-xs">
                {roleModulesCompleted}/{roleRequiredModules.length} modules
              </Badge>
            </div>
            <Progress value={roleModulePercentage} className="h-2 bg-teal/20 [&>div]:bg-teal" />
            
            {/* Stats Grid */}
            {roleStats && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <StatCard 
                  icon={CheckCircle2}
                  label="Tasks"
                  value={roleStats.tasksCompleted}
                  color="text-success"
                  bgColor="bg-success/10"
                />
                <StatCard 
                  icon={Rocket}
                  label="Missions"
                  value={roleStats.missionsCompleted}
                  color="text-amber-500"
                  bgColor="bg-amber-500/10"
                />
                <StatCard 
                  icon={Trophy}
                  label="Exam"
                  value={roleStats.finalExamPassed ? "Passed" : "—"}
                  color={roleStats.finalExamPassed ? "text-primary" : "text-muted-foreground"}
                  bgColor={roleStats.finalExamPassed ? "bg-primary/10" : "bg-muted"}
                />
              </div>
            )}
          </div>
        )}

        {/* No role selected hint */}
        {!preferences.role && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Select your role to see personalized progress tracking
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  bgColor: string;
}

function StatCard({ icon: Icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div className={cn("rounded-lg p-3 text-center", bgColor)}>
      <Icon className={cn("h-4 w-4 mx-auto mb-1", color)} />
      <p className={cn("text-lg font-bold", color)}>{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
  );
}
