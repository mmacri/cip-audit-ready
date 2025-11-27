import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserRole } from '@/hooks/useUserPreferences';
import { RoleProgressData } from '@/hooks/useRoleProgress';
import { useBadges } from '@/hooks/useBadges';
import { badgeDefinitions, BadgeId } from '@/types/progressTypes';
import { 
  Trophy, 
  Compass, 
  FolderSearch, 
  Shield, 
  AlertTriangle, 
  ClipboardCheck,
  Award,
  ArrowRight
} from 'lucide-react';

const badgeIconMap: Record<string, React.ElementType> = {
  Compass: Compass,
  FolderSearch: FolderSearch,
  Shield: Shield,
  AlertTriangle: AlertTriangle,
  ClipboardCheck: ClipboardCheck,
  Trophy: Trophy,
};

interface BadgeDisplayProps {
  role: UserRole;
  roleProgress: RoleProgressData;
  compact?: boolean;
}

export function BadgeDisplay({ role, roleProgress, compact = false }: BadgeDisplayProps) {
  const { evaluateBadgesForRole } = useBadges();

  const earnedBadges = useMemo(() => {
    return evaluateBadgesForRole({ roleProgress, role });
  }, [evaluateBadgesForRole, roleProgress, role]);

  const unlockedBadges = badgeDefinitions.filter(b => earnedBadges.includes(b.id));
  const lockedBadges = badgeDefinitions.filter(b => !earnedBadges.includes(b.id));

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Badges:</span>
        {earnedBadges.length > 0 ? (
          <div className="flex gap-1">
            {unlockedBadges.map(badge => {
              const Icon = badgeIconMap[badge.icon] || Trophy;
              return (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 rounded-lg bg-success/10 cursor-help">
                      <Icon className="h-4 w-4 text-success" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">None yet</span>
        )}
        <Link 
          to="/achievements" 
          className="text-xs text-primary hover:underline ml-auto"
        >
          View all
        </Link>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Achievements
          </span>
          <Badge variant="outline">
            {earnedBadges.length} / {badgeDefinitions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Earned Badges */}
          {unlockedBadges.length > 0 && (
            <div>
              <p className="text-sm font-medium text-navy mb-2">Earned</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {unlockedBadges.map(badge => {
                  const Icon = badgeIconMap[badge.icon] || Trophy;
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 cursor-help">
                          <Icon className="h-5 w-5 text-success shrink-0" />
                          <span className="text-sm font-medium text-navy truncate">
                            {badge.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked Badges */}
          {lockedBadges.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {unlockedBadges.length > 0 ? 'Locked' : 'Available to earn'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {lockedBadges.map(badge => {
                  const Icon = badgeIconMap[badge.icon] || Trophy;
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 cursor-help opacity-60">
                          <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
                          <span className="text-sm text-muted-foreground truncate">
                            {badge.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">{badge.criteria}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          )}

          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to="/achievements">
              View All Achievements <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
