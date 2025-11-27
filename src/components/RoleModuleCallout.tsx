import { useState } from 'react';
import { useUserPreferences, UserRole, roleLabels } from '@/hooks/useUserPreferences';
import { roleModuleCallouts } from '@/data/roleTrainingData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleModuleCalloutProps {
  moduleId: number;
  className?: string;
}

const roleOrder: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];

export function RoleModuleCallout({ moduleId, className }: RoleModuleCalloutProps) {
  const { preferences } = useUserPreferences();
  const [showAll, setShowAll] = useState(false);

  const callouts = roleModuleCallouts[moduleId];
  if (!callouts) return null;

  const currentRole = preferences.role;
  
  // Reorder roles to put current role first
  const orderedRoles = currentRole 
    ? [currentRole, ...roleOrder.filter(r => r !== currentRole)]
    : roleOrder;

  const displayedRoles = showAll ? orderedRoles : (currentRole ? [currentRole] : orderedRoles.slice(0, 1));

  return (
    <div className={cn("bg-muted/30 rounded-lg border border-border/50 overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b border-border/50 flex items-center gap-2">
        <User className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-navy">Role-Specific Guidance</span>
      </div>
      <div className="p-4 space-y-3">
        {displayedRoles.map((role) => {
          const isCurrentRole = role === currentRole;
          return (
            <div 
              key={role}
              className={cn(
                "rounded-lg p-3 text-sm",
                isCurrentRole 
                  ? "bg-primary/10 border border-primary/20" 
                  : "bg-background border border-border/50"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "font-medium",
                  isCurrentRole ? "text-primary" : "text-navy"
                )}>
                  For {roleLabels[role]}:
                </span>
                {isCurrentRole && (
                  <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                    Your Role
                  </span>
                )}
              </div>
              <p className={cn(
                "text-sm leading-relaxed",
                isCurrentRole ? "text-foreground" : "text-muted-foreground"
              )}>
                {callouts[role]}
              </p>
            </div>
          );
        })}
        
        {orderedRoles.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show all roles ({orderedRoles.length - 1} more)
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
