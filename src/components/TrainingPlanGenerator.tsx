import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { roleTrainingPlans, moduleNames } from '@/data/roleTrainingData';
import { UserRole, roleLabels } from '@/hooks/useUserPreferences';
import { Copy, FileText, Sparkles } from 'lucide-react';

interface TrainingPlanGeneratorProps {
  role: UserRole;
}

const timeHorizonDescriptions: Record<string, string> = {
  '30': '30 Days - Quick Start',
  '60': '60 Days - Foundation Building',
  '90': '90 Days - Comprehensive Preparation',
};

export function TrainingPlanGenerator({ role }: TrainingPlanGeneratorProps) {
  const [timeHorizon, setTimeHorizon] = useState<string>('');
  const [riskArea, setRiskArea] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<string>('');

  const rolePlan = roleTrainingPlans[role];

  const generatePlan = () => {
    if (!timeHorizon || !riskArea) {
      toast({
        title: 'Missing selections',
        description: 'Please select both a time horizon and risk area.',
        variant: 'destructive',
      });
      return;
    }

    const days = parseInt(timeHorizon);
    const roleTitle = roleLabels[role];
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Get modules based on time horizon
    let recommendedModules: number[] = [];
    if (days === 30) {
      recommendedModules = rolePlan.phases[0]?.modules.map(m => m.id) || [];
    } else if (days === 60) {
      recommendedModules = [
        ...(rolePlan.phases[0]?.modules.map(m => m.id) || []),
        ...(rolePlan.phases[1]?.modules.map(m => m.id) || []),
      ];
    } else {
      recommendedModules = rolePlan.phases.flatMap(p => p.modules.map(m => m.id));
    }
    recommendedModules = [...new Set(recommendedModules)];

    // Get tasks for the time horizon
    const horizon = rolePlan.timeHorizons.find(h => 
      (days === 30 && h.id === 'first-30') ||
      (days === 60 && (h.id === 'first-30' || h.id === 'next-60')) ||
      (days === 90 && (h.id === 'first-30' || h.id === 'next-60' || h.id === 'pre-audit'))
    );

    // Risk area specific recommendations
    const riskRecommendations: Record<string, { modules: number[], tools: string[], focus: string }> = {
      'Scope & Asset Clarity': {
        modules: [2, 1],
        tools: ['Evidence Lab', 'Self-Assessment'],
        focus: 'Document your BES Cyber Systems and verify your scope is accurate.',
      },
      'Training & Personnel': {
        modules: [4, 3],
        tools: ['Evidence Lab'],
        focus: 'Review training records and personnel risk assessment documentation.',
      },
      'Technical Controls & Patching': {
        modules: [6, 8, 5],
        tools: ['Audit Simulator', 'Evidence Lab'],
        focus: 'Verify patch timelines are met and baseline configurations are current.',
      },
      'Incident Response & Recovery': {
        modules: [7],
        tools: ['Audit Simulator'],
        focus: 'Test your incident response procedures and recovery plans.',
      },
      'Evidence Organization & Audit Readiness': {
        modules: [10, 9],
        tools: ['Evidence Lab', 'Audit Simulator', 'Readiness Plan'],
        focus: 'Organize evidence and practice audit response scenarios.',
      },
    };

    const riskRec = riskRecommendations[riskArea] || { modules: [], tools: [], focus: '' };

    // Merge recommended modules with risk-specific
    const priorityModules = [...new Set([...riskRec.modules, ...recommendedModules])].slice(0, 5);

    // Generate next week actions
    const nextWeekActions = [
      `Complete Module ${priorityModules[0]} (${moduleNames[priorityModules[0]]})`,
      `Review current ${riskArea.toLowerCase()} documentation`,
      riskRec.tools.length > 0 ? `Use the ${riskRec.tools[0]} tool to assess your current state` : 'Document your top 3 compliance gaps',
    ];

    // Build the plan text
    const plan = `
═══════════════════════════════════════════════════════════════
CIP READINESS TRAINING PLAN
═══════════════════════════════════════════════════════════════

Generated: ${today}
Role: ${roleTitle}
Time Horizon: ${days} Days
Primary Risk Area: ${riskArea}

───────────────────────────────────────────────────────────────
PRIORITY FOCUS
───────────────────────────────────────────────────────────────

${riskRec.focus}

───────────────────────────────────────────────────────────────
RECOMMENDED MODULES (Complete in order)
───────────────────────────────────────────────────────────────

${priorityModules.map((m, i) => `${i + 1}. Module ${m}: ${moduleNames[m]}`).join('\n')}

───────────────────────────────────────────────────────────────
KEY TOOLS TO USE
───────────────────────────────────────────────────────────────

${riskRec.tools.length > 0 ? riskRec.tools.map(t => `• ${t}`).join('\n') : '• Evidence Lab\n• Audit Simulator\n• Self-Assessment'}

───────────────────────────────────────────────────────────────
NEXT ACTIONS THIS WEEK
───────────────────────────────────────────────────────────────

${nextWeekActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

───────────────────────────────────────────────────────────────
${days}-DAY MILESTONES
───────────────────────────────────────────────────────────────

${days >= 30 ? `Week 1-2: Complete foundational modules and identify top gaps
Week 3-4: Deep dive into ${riskArea.toLowerCase()} requirements` : ''}
${days >= 60 ? `
Week 5-6: Practice with Audit Simulator and Evidence Lab
Week 7-8: Build evidence maps and documentation` : ''}
${days >= 90 ? `
Week 9-10: Conduct internal review and mock audit
Week 11-12: Address findings and finalize readiness plan` : ''}

───────────────────────────────────────────────────────────────

Remember: Progress over perfection. Complete one module at a time
and apply what you learn before moving to the next.

Generated by CIP Readiness Academy
═══════════════════════════════════════════════════════════════
`.trim();

    setGeneratedPlan(plan);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPlan);
      toast({
        title: 'Copied!',
        description: 'Training plan copied to clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Copy failed',
        description: 'Please select and copy the text manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-navy">Training Plan Generator</h3>
          <p className="text-xs text-muted-foreground">Create a personalized action plan</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Time Horizon
          </label>
          <Select value={timeHorizon} onValueChange={setTimeHorizon}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Days - Quick Start</SelectItem>
              <SelectItem value="60">60 Days - Foundation</SelectItem>
              <SelectItem value="90">90 Days - Comprehensive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Biggest Risk Area
          </label>
          <Select value={riskArea} onValueChange={setRiskArea}>
            <SelectTrigger>
              <SelectValue placeholder="Select risk area" />
            </SelectTrigger>
            <SelectContent>
              {rolePlan.riskAreas.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={generatePlan} className="w-full mb-4">
        <Sparkles className="mr-2 h-4 w-4" />
        Generate My Role Training Plan
      </Button>

      {generatedPlan && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy">Your Training Plan</span>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="mr-1 h-3 w-3" />
              Copy to Clipboard
            </Button>
          </div>
          <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto border border-border/50">
            {generatedPlan}
          </pre>
        </div>
      )}
    </div>
  );
}
