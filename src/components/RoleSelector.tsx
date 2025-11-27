import { useUserPreferences, UserRole, roleLabels } from '@/hooks/useUserPreferences';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

interface RoleSelectorProps {
  className?: string;
  showLabel?: boolean;
}

const roles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];

export function RoleSelector({ className, showLabel = true }: RoleSelectorProps) {
  const { preferences, savePreferences } = useUserPreferences();

  const handleRoleChange = (value: string) => {
    savePreferences({ 
      role: value as UserRole, 
      onboardingComplete: true 
    });
  };

  return (
    <div className={className}>
      {showLabel && (
        <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Select Your Role
        </label>
      )}
      <Select value={preferences.role || ''} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-full sm:w-[280px]">
          <SelectValue placeholder="Choose your role path" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {roleLabels[role]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
