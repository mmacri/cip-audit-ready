import { useProgress } from '@/hooks/useProgress';
import { Progress } from '@/components/ui/progress';
import { Trophy, BookOpen } from 'lucide-react';

export function ProgressWidget() {
  const { progress, getCompletionPercentage, isLoaded } = useProgress();
  
  if (!isLoaded) return null;

  const percentage = getCompletionPercentage();
  const completed = progress.completedModules.length;

  return (
    <div className="bg-card rounded-xl border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-4">
        {percentage === 100 ? (
          <Trophy className="h-6 w-6 text-success" />
        ) : (
          <BookOpen className="h-6 w-6 text-primary" />
        )}
        <div>
          <h3 className="font-semibold text-navy">Your Progress</h3>
          <p className="text-sm text-muted-foreground">
            You have completed {completed} of 12 modules
          </p>
        </div>
      </div>
      
      <Progress value={percentage} className="h-3" />
      
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-muted-foreground">{percentage}% complete</span>
        {percentage === 100 && (
          <span className="text-success font-medium">All modules complete!</span>
        )}
      </div>
    </div>
  );
}
