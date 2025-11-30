import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserPreferences, UserRole, ExperienceLevel, roleLabels, experienceLabels } from '@/hooks/useUserPreferences';
import { GraduationCap, Users, Shield, UserCog, Building2, HelpCircle, ArrowRight } from 'lucide-react';

const roleIcons: Record<UserRole, React.ElementType> = {
  'compliance': Building2,
  'it-ot': UserCog,
  'physical-security': Shield,
  'hr-training': Users,
  'leadership': GraduationCap,
  'other': HelpCircle,
};

interface OnboardingModalProps {
  open: boolean;
  onComplete: (selectedRole?: UserRole) => void;
}

export function OnboardingModal({ open, onComplete }: OnboardingModalProps) {
  const { completeOnboarding } = useUserPreferences();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(null);

  const handleComplete = () => {
    if (selectedRole && selectedExperience) {
      completeOnboarding(selectedRole, selectedExperience);
      onComplete(selectedRole);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const roles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];
  const experiences: ExperienceLevel[] = ['new', 'some', 'experienced'];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="h-6 w-6 text-primary" />
            Welcome to CIP Readiness Academy
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Let's personalize your learning experience. What is your primary role?"
              : "What is your current experience with NERC CIP?"
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid grid-cols-2 gap-3 py-4">
            {roles.map((role) => {
              const Icon = roleIcons[role];
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm",
                    selectedRole === role
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="font-medium text-center">{roleLabels[role]}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 py-4">
            {experiences.map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExperience(exp)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                  selectedExperience === exp
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2",
                  selectedExperience === exp ? "border-primary bg-primary" : "border-muted-foreground"
                )} />
                <div>
                  <p className="font-medium text-foreground">{experienceLabels[exp]}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp === 'new' && "I'm just getting started with NERC CIP compliance."}
                    {exp === 'some' && "I have basic knowledge but want to deepen my understanding."}
                    {exp === 'experienced' && "I have significant CIP experience and want advanced content."}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          {step === 2 ? (
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleSkip}>
              Skip tour – show me the overview
            </Button>
          )}
          
          {step === 1 ? (
            <Button onClick={() => setStep(2)} disabled={!selectedRole}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={!selectedExperience}>
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
