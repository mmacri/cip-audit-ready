import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUserPreferences, roleLabels, UserRole } from '@/hooks/useUserPreferences';
import { useRoleProgress } from '@/hooks/useRoleProgress';
import { useBadges } from '@/hooks/useBadges';
import { badgeDefinitions, BadgeId } from '@/types/progressTypes';
import { 
  Trophy, 
  Compass, 
  FolderSearch, 
  Shield, 
  AlertTriangle, 
  ClipboardCheck,
  Lock,
  ArrowRight,
  Award
} from 'lucide-react';

const badgeIconMap: Record<string, React.ElementType> = {
  Compass: Compass,
  FolderSearch: FolderSearch,
  Shield: Shield,
  AlertTriangle: AlertTriangle,
  ClipboardCheck: ClipboardCheck,
  Trophy: Trophy,
};

const allRoles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership'];

export default function Achievements() {
  const { preferences } = useUserPreferences();
  const { allProgress } = useRoleProgress(preferences.role);
  const { evaluateBadgesForRole, getRoleCompletionProgress } = useBadges();

  const rolesBadges = useMemo(() => {
    const result: Record<UserRole, BadgeId[]> = {} as Record<UserRole, BadgeId[]>;
    allRoles.forEach(role => {
      const roleProgress = allProgress[role];
      if (roleProgress) {
        result[role] = evaluateBadgesForRole({ roleProgress, role });
      } else {
        result[role] = [];
      }
    });
    return result;
  }, [allProgress, evaluateBadgesForRole]);

  const totalBadgesEarned = useMemo(() => {
    const allBadges = new Set<BadgeId>();
    Object.values(rolesBadges).forEach(badges => {
      badges.forEach(b => allBadges.add(b));
    });
    return allBadges.size;
  }, [rolesBadges]);

  const currentRoleBadges = preferences.role ? rolesBadges[preferences.role] : [];
  const currentRoleProgress = preferences.role 
    ? getRoleCompletionProgress(preferences.role, allProgress[preferences.role])
    : null;

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Achievements
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Track your progress and earn badges as you master NERC CIP compliance concepts 
              across different role paths.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-primary">{totalBadgesEarned}</p>
                <p className="text-sm text-muted-foreground">Total Badges Earned</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-primary">{badgeDefinitions.length}</p>
                <p className="text-sm text-muted-foreground">Badges Available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-primary">
                  {Math.round((totalBadgesEarned / badgeDefinitions.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Overall Completion</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Role Progress */}
          {preferences.role && currentRoleProgress && (
            <Card className="mb-10 max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Your {roleLabels[preferences.role]} Progress
                </CardTitle>
                <CardDescription>
                  {currentRoleBadges.length > 0 
                    ? `You've earned ${currentRoleBadges.length} badge(s) in this role path`
                    : 'Complete tasks and missions to earn badges'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Completion</span>
                      <span className="font-medium">{currentRoleProgress.overall}%</span>
                    </div>
                    <Progress value={currentRoleProgress.overall} className="h-2" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xl font-bold text-navy">{currentRoleProgress.modulesProgress}%</p>
                      <p className="text-xs text-muted-foreground">Modules</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xl font-bold text-navy">{currentRoleProgress.tasksProgress}%</p>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-xl font-bold text-navy">{currentRoleProgress.missionsProgress}%</p>
                      <p className="text-xs text-muted-foreground">Missions</p>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/role-training/${preferences.role}`}>
                      Continue Training <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Badge Legend */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-6 text-center">Available Badges</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {badgeDefinitions.map(badge => {
                const Icon = badgeIconMap[badge.icon] || Trophy;
                const isEarned = Object.values(rolesBadges).some(badges => badges.includes(badge.id));
                
                return (
                  <Card 
                    key={badge.id} 
                    className={`transition-all ${isEarned ? 'border-success/50 bg-success/5' : 'opacity-60'}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${isEarned ? 'bg-success/10' : 'bg-muted'}`}>
                          {isEarned ? (
                            <Icon className="h-6 w-6 text-success" />
                          ) : (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-navy">{badge.name}</h3>
                            {isEarned && (
                              <Badge variant="outline" className="text-success border-success/50 text-xs">
                                Earned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {badge.description}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {badge.criteria}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Badges by Role */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6 text-center">Progress by Role</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {allRoles.map(role => {
                const badges = rolesBadges[role];
                const progress = getRoleCompletionProgress(role, allProgress[role]);
                const isCurrentRole = preferences.role === role;
                
                return (
                  <Card 
                    key={role}
                    className={isCurrentRole ? 'border-primary/50 bg-primary/5' : ''}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{roleLabels[role]}</span>
                        {isCurrentRole && (
                          <Badge variant="outline" className="text-xs">Current</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress.overall}%</span>
                          </div>
                          <Progress value={progress.overall} className="h-1.5" />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Badges:</span>
                          {badges.length > 0 ? (
                            <div className="flex gap-1">
                              {badges.map(badgeId => {
                                const badge = badgeDefinitions.find(b => b.id === badgeId);
                                const Icon = badge ? badgeIconMap[badge.icon] || Trophy : Trophy;
                                return (
                                  <div 
                                    key={badgeId}
                                    className="p-1 rounded bg-success/10"
                                    title={badge?.name}
                                  >
                                    <Icon className="h-4 w-4 text-success" />
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">None yet</span>
                          )}
                        </div>

                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to={`/role-training/${role}`}>
                            {isCurrentRole ? 'Continue' : 'View Path'}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
