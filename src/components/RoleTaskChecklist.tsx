import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CheckSquare, Square, ExternalLink } from 'lucide-react';

export interface RoleTask {
  id: string;
  label: string;
  moduleLink?: number;
  toolLink?: string;
}

interface RoleTaskChecklistProps {
  title: string;
  tasks: RoleTask[];
  completedTasks: string[];
  onToggleTask: (taskId: string) => void;
  className?: string;
}

export function RoleTaskChecklist({
  title,
  tasks,
  completedTasks,
  onToggleTask,
  className,
}: RoleTaskChecklistProps) {
  const completedCount = tasks.filter(t => completedTasks.includes(t.id)).length;
  
  return (
    <div className={cn("", className)}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-navy">{title}</h4>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {completedCount} / {tasks.length}
          </span>
        </div>
      )}
      <div className="space-y-2">
        {tasks.map((task) => {
          const isComplete = completedTasks.includes(task.id);
          return (
            <div 
              key={task.id} 
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                isComplete ? "bg-success/10" : "bg-muted/50 hover:bg-muted"
              )}
              onClick={() => onToggleTask(task.id)}
            >
              {isComplete ? (
                <CheckSquare className="h-5 w-5 text-success shrink-0 mt-0.5" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className={cn(
                  "text-sm leading-relaxed",
                  isComplete ? "text-muted-foreground line-through" : "text-foreground"
                )}>
                  {task.label}
                </span>
                {(task.moduleLink || task.toolLink) && (
                  <div className="flex gap-3 mt-1" onClick={e => e.stopPropagation()}>
                    {task.moduleLink && (
                      <Link
                        to={`/modules#module-${task.moduleLink}`}
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Module {task.moduleLink}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                    {task.toolLink && (
                      <Link
                        to={task.toolLink}
                        className="text-xs text-accent hover:underline inline-flex items-center gap-1"
                      >
                        Open Tool
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
