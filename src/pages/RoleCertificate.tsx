import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserPreferences, roleLabels, UserRole } from '@/hooks/useUserPreferences';
import { useRoleProgress } from '@/hooks/useRoleProgress';
import { useBadges } from '@/hooks/useBadges';
import { 
  Award, 
  GraduationCap, 
  Printer, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const validRoles: UserRole[] = ['compliance', 'it-ot', 'physical-security', 'hr-training', 'leadership', 'other'];

export default function RoleCertificate() {
  const { roleId } = useParams<{ roleId: string }>();
  const { preferences } = useUserPreferences();
  const { getCurrentRoleProgress, allProgress } = useRoleProgress(roleId as UserRole);
  const { isRoleComplete, getRoleCompletionProgress } = useBadges();
  
  const [learnerName, setLearnerName] = useState('');
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  const role = roleId as UserRole;
  const isValidRole = validRoles.includes(role);

  useEffect(() => {
    if (preferences.firstName) {
      setLearnerName(preferences.firstName);
    }
    setIsLoaded(true);
  }, [preferences.firstName]);

  if (!isValidRole) {
    return <Navigate to="/role-training" replace />;
  }

  const roleProgress = allProgress[role];
  const roleComplete = isRoleComplete(role, roleProgress);
  const progress = getRoleCompletionProgress(role, roleProgress);

  const printCertificate = () => {
    window.print();
  };

  if (!isLoaded) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!roleComplete) {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="h-10 w-10 text-warning" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Certificate Not Yet Available
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Complete all required steps and missions in your <strong>{roleLabels[role]}</strong> path 
                to unlock your role completion certificate.
              </p>
              
              <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
                <h3 className="font-semibold text-navy mb-4">Your Progress:</h3>
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">{progress.modulesProgress}%</p>
                    <p className="text-sm text-muted-foreground">Modules</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{progress.tasksProgress}%</p>
                    <p className="text-sm text-muted-foreground">Tasks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{progress.missionsProgress}%</p>
                    <p className="text-sm text-muted-foreground">Missions</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-navy mb-3">To earn your certificate:</h4>
                <ul className="space-y-2 text-left text-muted-foreground">
                  <li className="flex items-start gap-3">
                    {progress.modulesProgress >= 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                    )}
                    <span>Complete all required modules for this role ({progress.modulesComplete}/{progress.totalModules})</span>
                  </li>
                  <li className="flex items-start gap-3">
                    {progress.tasksProgress >= 75 ? (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                    )}
                    <span>Complete at least 75% of phase tasks ({progress.tasksComplete}/{progress.totalTasks})</span>
                  </li>
                  <li className="flex items-start gap-3">
                    {progress.missionsProgress >= 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0 mt-0.5" />
                    )}
                    <span>Complete at least 3 role-specific missions ({progress.missionsComplete}/3 minimum)</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                  <Link to={`/role-training/${role}`}>
                    Continue Training <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/modules">
                    Browse Modules
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Controls - Hidden when printing */}
      <section className="py-8 bg-muted/50 print:hidden">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-semibold text-navy mb-4">Customize Your Certificate</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-navy block mb-1">Your Name</label>
                <Input
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy block mb-1">Completion Date</label>
                <Input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={printCertificate} size="lg">
              <Printer className="mr-2 h-5 w-5" /> Print / Save as PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="py-12 print:py-0">
        <div className="container print:max-w-none print:p-0">
          <div className="max-w-4xl mx-auto print:max-w-none">
            <div 
              className="bg-white border-8 border-double border-primary/30 rounded-lg p-12 print:border-[12px] print:rounded-none print:p-16"
              style={{ aspectRatio: '1.414/1' }}
            >
              {/* Decorative corners */}
              <div className="relative h-full flex flex-col">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-primary/40" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-primary/40" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-primary/40" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-primary/40" />

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="h-12 w-12 text-primary print:h-16 print:w-16" />
                    <GraduationCap className="h-12 w-12 text-primary print:h-16 print:w-16" />
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2 print:text-5xl font-serif">
                    Role Completion Certificate
                  </h1>
                  
                  <p className="text-muted-foreground mb-4 print:text-lg">
                    CIP Readiness Academy
                  </p>

                  <p className="text-lg text-muted-foreground mb-2 print:text-xl">
                    This certifies that
                  </p>

                  <p className="text-3xl md:text-4xl font-bold text-navy mb-2 font-serif print:text-5xl">
                    {learnerName || '[Your Name]'}
                  </p>

                  <p className="text-lg text-muted-foreground mb-4 print:text-xl">
                    has successfully completed the
                  </p>

                  <p className="text-2xl md:text-3xl font-bold text-primary mb-6 print:text-4xl">
                    {roleLabels[role]} Track
                  </p>

                  <p className="text-base text-muted-foreground mb-8 max-w-xl print:text-lg print:max-w-2xl">
                    demonstrating understanding of applicable NERC CIP responsibilities for this role, 
                    including core controls, evidence expectations, audit preparation, and practical 
                    application through scenario-based missions and exercises.
                  </p>

                  <div className="flex items-center gap-8 mb-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <p className="text-lg font-semibold text-navy">
                        {new Date(completionDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="border-t-2 border-primary/20 pt-4 w-full max-w-lg">
                    <div className="flex justify-between items-end mb-4">
                      <div className="text-left">
                        <div className="w-48 border-b border-muted-foreground/30 mb-1" />
                        <p className="text-xs text-muted-foreground">Program Owner / CIP Training Lead</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-navy">CIP Readiness Academy</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      This certificate acknowledges completion of the {roleLabels[role]} learning path 
                      within the CIP Readiness Academy. This is an internal training program certificate 
                      and does not represent an official NERC, Regional Entity, or regulatory certification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:p-16 { padding: 4rem !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:border-\\[12px\\] { border-width: 12px !important; }
          .print\\:text-5xl { font-size: 3rem !important; }
          .print\\:text-4xl { font-size: 2.25rem !important; }
          .print\\:text-xl { font-size: 1.25rem !important; }
          .print\\:text-lg { font-size: 1.125rem !important; }
          .print\\:h-16 { height: 4rem !important; }
          .print\\:w-16 { width: 4rem !important; }
          .print\\:max-w-2xl { max-width: 42rem !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: landscape; margin: 0.5in; }
        }
      `}</style>
    </Layout>
  );
}
