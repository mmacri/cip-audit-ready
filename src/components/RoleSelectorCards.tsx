import { useUserPreferences, UserRole, roleLabels } from '@/hooks/useUserPreferences';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Wrench, 
  Lock, 
  Users, 
  Building, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface RoleSelectorCardsProps {
  className?: string;
  compact?: boolean;
}

const roleData: Record<UserRole, { 
  icon: typeof Shield; 
  summary: string; 
  focus: string[];
}> = {
  compliance: {
    icon: Shield,
    summary: 'As a Compliance Manager, your priority is: governance, evidence organization, policy management, and audit coordination.',
    focus: ['Governance & Policies', 'Evidence Management', 'Audit Coordination', 'Risk Oversight']
  },
  'it-ot': {
    icon: Wrench,
    summary: 'As an IT / OT Engineer, your priority is: systems, perimeters, patching, and technical evidence.',
    focus: ['System Security', 'Patch Management', 'Network Perimeters', 'Technical Controls']
  },
  'physical-security': {
    icon: Lock,
    summary: 'As Physical Security, your priority is: access control, PSPs, visitor management, and physical monitoring.',
    focus: ['Physical Access Control', 'PSP Management', 'Visitor Logs', 'Badge Systems']
  },
  'hr-training': {
    icon: Users,
    summary: 'As HR / Training, your priority is: personnel risk assessments, training records, and access provisioning.',
    focus: ['Training Records', 'Background Checks', 'Access Provisioning', 'Awareness Programs']
  },
  leadership: {
    icon: Building,
    summary: 'As Leadership, your priority is: strategic oversight, risk metrics, resource allocation, and program accountability.',
    focus: ['Risk Oversight', 'Resource Planning', 'Strategic Decisions', 'Program Accountability']
  },
  other: {
    icon: HelpCircle,
    summary: 'Explore all modules and find training relevant to your specific responsibilities.',
    focus: ['Full Curriculum', 'All Standards', 'Flexible Path', 'Cross-Training']
  }
};

const roles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];

export function RoleSelectorCards({ className, compact = false }: RoleSelectorCardsProps) {
  const { preferences, savePreferences } = useUserPreferences();

  const handleRoleSelect = (role: UserRole) => {
    savePreferences({ 
      role, 
      onboardingComplete: true 
    });
  };

  return (
    <div className={className}>
      <div className={cn(
        "grid gap-3",
        compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {roles.map((role) => {
          const isSelected = preferences.role === role;
          const Icon = roleData[role].icon;
          
          return (
            <button
              key={role}
              onClick={() => handleRoleSelect(role)}
              className={cn(
                "relative flex flex-col items-start text-left rounded-xl border-2 transition-all",
                compact ? "p-3" : "p-4",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border/50 bg-card hover:border-primary/30 hover:bg-muted/50"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <div className={cn(
                "rounded-lg flex items-center justify-center mb-2",
                compact ? "w-8 h-8" : "w-10 h-10",
                isSelected ? "bg-primary/10" : "bg-muted"
              )}>
                <Icon className={cn(
                  isSelected ? "text-primary" : "text-muted-foreground",
                  compact ? "h-4 w-4" : "h-5 w-5"
                )} />
              </div>
              
              <span className={cn(
                "font-semibold text-navy",
                compact ? "text-xs" : "text-sm"
              )}>
                {roleLabels[role]}
              </span>
              
              {!compact && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {roleData[role].focus.slice(0, 2).map((item) => (
                    <span 
                      key={item}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Role Summary */}
      {preferences.role && (
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              {(() => {
                const Icon = roleData[preferences.role].icon;
                return <Icon className="h-4 w-4 text-primary" />;
              })()}
            </div>
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                {roleLabels[preferences.role]}
              </p>
              <p className="text-sm text-muted-foreground">
                {roleData[preferences.role].summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { roleData };
