import { Layout } from '@/components/layout/Layout';
import { PageIntro } from '@/components/PageIntro';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, Award, RefreshCw, Target, BookOpen, Rocket } from 'lucide-react';

export default function ManagerGuide() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Manager & Team Guide</h1>
          </div>
        </div>
      </section>

      {/* Page Intro */}
      <section className="py-6 border-b border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <PageIntro>
              This guide helps managers and team leads use CIP Readiness Academy as a structured training program 
              for their teams. Learn how to assign roles, run team sessions, and track progress across your organization.
            </PageIntro>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>CIP Readiness Academy is designed to help your team build practical knowledge for NERC CIP compliance. Unlike generic security training, this program is structured around the actual responsibilities, evidence requirements, and audit scenarios your team will face.</p>
                <p><strong>Important:</strong> This is an internal training resource. Completion certificates recognize internal achievement—they are not official NERC or regulatory certifications.</p>
              </CardContent>
            </Card>

            {/* Assigning Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Assigning Roles & Paths</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Map job titles to training paths:</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Compliance/Risk Manager:</strong> Compliance officers, risk analysts, program coordinators</li>
                  <li><strong>IT/OT Engineer:</strong> Network engineers, system administrators, SCADA/EMS engineers</li>
                  <li><strong>Physical Security:</strong> Security officers, access control managers, facility staff</li>
                  <li><strong>HR/Training:</strong> HR coordinators, training specialists, personnel managers</li>
                  <li><strong>Leadership:</strong> Directors, VPs, CIP Senior Managers, executives with oversight</li>
                  <li><strong>Other/Mixed:</strong> Procurement, facilities, contractors with partial CIP exposure</li>
                </ul>
                <p className="text-sm text-muted-foreground">For personnel wearing multiple hats, use "Other/Mixed" or have them complete multiple role paths.</p>
              </CardContent>
            </Card>

            {/* 6-Week Rollout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Suggested 6-Week Rollout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { week: 'Week 1-2', title: 'Foundations', tasks: ['Complete role selection and pre-assessment', 'Finish Phase 1 modules', 'Review role overview and accountability'] },
                    { week: 'Week 3-4', title: 'Deep Dives & Scenarios', tasks: ['Complete role-specific modules', 'Work through branching scenarios', 'Begin role missions'] },
                    { week: 'Week 5', title: 'Evidence & Audit Prep', tasks: ['Use Evidence Lab to map your evidence', 'Complete Audit Simulator exercises', 'Review sample artifacts'] },
                    { week: 'Week 6', title: 'Completion & Next Steps', tasks: ['Finish remaining missions', 'Complete role path for certificate', 'Build team readiness plan'] },
                  ].map(item => (
                    <div key={item.week} className="border-l-2 border-primary/30 pl-4">
                      <p className="font-medium text-navy">{item.week}: {item.title}</p>
                      <ul className="text-sm text-muted-foreground mt-1">
                        {item.tasks.map((t, i) => <li key={i}>• {t}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Running Team Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Use these for 30-60 minute group discussions:</p>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-navy text-sm">Mission Walkthrough</p>
                    <p className="text-xs text-muted-foreground">Pick one mission and have the team discuss how they'd execute it in your environment. What evidence exists? What's missing?</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-navy text-sm">Tabletop Scenario</p>
                    <p className="text-xs text-muted-foreground">Use branching scenarios as tabletop exercises. Project the scenario and have the team debate each decision point.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium text-navy text-sm">Reflection Discussion</p>
                    <p className="text-xs text-muted-foreground">Use reflection prompts from modules as discussion starters. "What would be hardest to prove to an auditor?"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificates & Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" />Certificates & Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Use recognition tools strategically:</p>
                <ul className="text-sm space-y-2">
                  <li><strong>Role Completion Certificates:</strong> Can be used for internal training records. Include in personnel files to document CIP awareness training.</li>
                  <li><strong>Achievement Badges:</strong> Highlight team member strengths. "Evidence Architect" on your compliance team, "Patch Guardian" for IT.</li>
                  <li><strong>Progress Tracking:</strong> Export progress backups for training documentation.</li>
                </ul>
                <p className="text-sm text-muted-foreground italic">Remember: These are internal recognition tools, not official certifications.</p>
              </CardContent>
            </Card>

            {/* Sustaining */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-primary" />Sustaining the Program</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li><strong>Quarterly Refresh:</strong> Have team members retake pre-assessments to identify knowledge decay</li>
                  <li><strong>Post-Change Review:</strong> When CIP scope or tools change, revisit relevant modules</li>
                  <li><strong>New Hire Onboarding:</strong> Include role path assignment in onboarding checklist</li>
                  <li><strong>Pre-Audit Sprint:</strong> 90 days before audit, run team through Audit Simulator and evidence review</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
