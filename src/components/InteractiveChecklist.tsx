import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { CheckSquare, Square } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
}

interface InteractiveChecklistProps {
  title: string;
  items: ChecklistItem[];
  storagePrefix: string;
}

export function InteractiveChecklist({ title, items, storagePrefix }: InteractiveChecklistProps) {
  const { getChecklistItem, setChecklistItem } = useProgress();

  const completedCount = items.filter(item => 
    getChecklistItem(`${storagePrefix}-${item.id}`)
  ).length;

  return (
    <div className="bg-card rounded-xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{items.length} complete
        </span>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => {
          const key = `${storagePrefix}-${item.id}`;
          const isChecked = getChecklistItem(key);
          
          return (
            <button
              key={item.id}
              onClick={() => setChecklistItem(key, !isChecked)}
              className={cn(
                "w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all",
                isChecked 
                  ? "bg-success/10 text-success" 
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {isChecked ? (
                <CheckSquare className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <Square className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <span className={cn("text-sm", isChecked && "line-through")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
