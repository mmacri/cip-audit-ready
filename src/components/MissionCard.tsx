import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, ExternalLink, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { moduleNames } from '@/data/roleTrainingData';
import type { RoleMission } from '@/data/roleMissionsData';

interface MissionCardProps {
  mission: RoleMission;
  isComplete: boolean;
  onToggleComplete: (missionId: string) => void;
}

export function MissionCard({ mission, isComplete, onToggleComplete }: MissionCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border overflow-hidden transition-all",
        isComplete ? "border-success/50 bg-success/5" : "border-border/50"
      )}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            isComplete ? "bg-success/20" : "bg-primary/10"
          )}>
            <Target className={cn("h-6 w-6", isComplete ? "text-success" : "text-primary")} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-navy">{mission.title}</h3>
              {isComplete && (
                <Badge variant="default" className="bg-success text-success-foreground shrink-0">
                  Complete
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{mission.scenario}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-navy mb-2">Steps to Complete:</h4>
            <ol className="space-y-2">
              {mission.steps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
            {mission.relevantModules.length > 0 && (
              <div>
                <span className="text-xs font-medium text-navy block mb-1.5">Related Modules:</span>
                <div className="flex flex-wrap gap-1">
                  {mission.relevantModules.map((moduleId) => (
                    <Link
                      key={moduleId}
                      to={`/modules#module-${moduleId}`}
                      className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                    >
                      <BookOpen className="h-3 w-3" />
                      {moduleNames[moduleId]}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {mission.toolLinks.length > 0 && (
              <div>
                <span className="text-xs font-medium text-navy block mb-1.5">Tools to Use:</span>
                <div className="flex flex-wrap gap-1">
                  {mission.toolLinks.map((tool) => (
                    <Link
                      key={tool.link}
                      to={tool.link}
                      className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded hover:bg-accent/20 transition-colors"
                    >
                      {tool.name}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <Button
            variant={isComplete ? "outline" : "default"}
            size="sm"
            onClick={() => onToggleComplete(mission.id)}
            className="w-full sm:w-auto"
          >
            {isComplete ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mission Complete
              </>
            ) : (
              <>
                <Circle className="mr-2 h-4 w-4" />
                Mark Mission Complete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
