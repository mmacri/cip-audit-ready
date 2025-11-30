import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface PageIntroProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle';
}

export function PageIntro({ children, className, variant = 'default' }: PageIntroProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 rounded-lg p-4 mb-6",
      variant === 'default' && "bg-muted/50 border border-border/50",
      variant === 'subtle' && "text-muted-foreground",
      className
    )}>
      {variant === 'default' && (
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      )}
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
