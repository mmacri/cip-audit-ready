import { useCallback } from 'react';
import { UserRole } from '@/hooks/useUserPreferences';
import { RoleProgressData } from '@/hooks/useRoleProgress';
import { BadgeId, roleCompletionRequirements } from '@/types/progressTypes';
import { roleTrainingPlans } from '@/data/roleTrainingData';
import { roleMissions } from '@/data/roleMissionsData';

interface BadgeEvaluationContext {
  roleProgress: RoleProgressData;
  role: UserRole;
  toolsUsed?: {
    selfAssessment?: boolean;
    readinessPlan?: boolean;
    auditSimulator?: boolean;
    evidenceLab?: boolean;
  };
}

export function useBadges() {
  const evaluateBadgesForRole = useCallback((context: BadgeEvaluationContext): BadgeId[] => {
    const { roleProgress, role, toolsUsed = {} } = context;
    const badges: BadgeId[] = [];
    const plan = roleTrainingPlans[role];
    const missions = roleMissions[role] || [];
    const requirements = roleCompletionRequirements[role];

    if (!plan) return badges;

    // Scope Navigator: Complete scope/asset modules (1, 2) and related tasks
    const scopeModules = [1, 2];
    const scopeModulesComplete = scopeModules.filter(m => 
      roleProgress.modulesCompleted.includes(m)
    ).length >= 1;
    const foundationsPhase = plan.phases.find(p => p.id === 'foundations');
    const foundationsTasks = foundationsPhase?.tasks.map(t => t.id) || [];
    const foundationsTasksComplete = foundationsTasks.filter(t =>
      roleProgress.tasksCompleted.includes(t)
    ).length >= Math.ceil(foundationsTasks.length * 0.75);
    
    if (scopeModulesComplete && foundationsTasksComplete) {
      badges.push('scope_navigator');
    }

    // Evidence Architect: Evidence-related tasks and Evidence Lab usage
    const evidenceRelatedTasks = roleProgress.tasksCompleted.filter(t =>
      t.includes('evidence') || t.includes('lab')
    );
    const hasEvidenceProgress = evidenceRelatedTasks.length >= 1 || toolsUsed.evidenceLab;
    const practicePhase = plan.phases.find(p => p.id === 'practice');
    const practiceTasks = practicePhase?.tasks.map(t => t.id) || [];
    const someEvidenceTasks = practiceTasks.filter(t =>
      roleProgress.tasksCompleted.includes(t)
    ).length >= 2;

    if (hasEvidenceProgress && someEvidenceTasks) {
      badges.push('evidence_architect');
    }

    // Patch Guardian: System security modules (6, 8) and patching tasks
    const patchModules = [6, 8];
    const patchModulesComplete = patchModules.filter(m =>
      roleProgress.modulesCompleted.includes(m)
    ).length >= 1;
    const deepDivesPhase = plan.phases.find(p => p.id === 'deep-dives');
    const deepDivesTasks = deepDivesPhase?.tasks.map(t => t.id) || [];
    const deepDivesTasksComplete = deepDivesTasks.filter(t =>
      roleProgress.tasksCompleted.includes(t)
    ).length >= Math.ceil(deepDivesTasks.length * 0.5);

    if (patchModulesComplete && deepDivesTasksComplete) {
      badges.push('patch_guardian');
    }

    // Incident Responder: Module 7 and incident-related missions
    const incidentModuleComplete = roleProgress.modulesCompleted.includes(7);
    const incidentMissions = missions.filter(m =>
      m.title.toLowerCase().includes('incident') ||
      m.title.toLowerCase().includes('recovery') ||
      m.relevantModules.includes(7)
    );
    const incidentMissionComplete = incidentMissions.some(m =>
      roleProgress.missionsCompleted.includes(m.id)
    );

    if (incidentModuleComplete && (incidentMissionComplete || roleProgress.missionsCompleted.length >= 2)) {
      badges.push('incident_responder');
    }

    // Audit Ready: Used Self-Assessment, Readiness Plan, and Audit Simulator
    const auditToolsUsed = 
      (toolsUsed.selfAssessment || roleProgress.tasksCompleted.some(t => t.includes('assessment'))) &&
      (toolsUsed.readinessPlan || roleProgress.tasksCompleted.some(t => t.includes('readiness'))) &&
      (toolsUsed.auditSimulator || roleProgress.tasksCompleted.some(t => t.includes('simulator') || t.includes('audit')));
    
    const module10Complete = roleProgress.modulesCompleted.includes(10);

    if (auditToolsUsed || (module10Complete && roleProgress.missionsCompleted.length >= 2)) {
      badges.push('audit_ready');
    }

    // Role Path Complete: All required steps and missions
    const allRequiredModulesComplete = requirements.requiredModules.every(m =>
      roleProgress.modulesCompleted.includes(m)
    );
    const enoughMissionsComplete = roleProgress.missionsCompleted.length >= requirements.minimumMissions;
    
    // Count phase tasks completed
    let totalRequiredTasks = 0;
    let completedRequiredTasks = 0;
    plan.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        totalRequiredTasks++;
        if (roleProgress.tasksCompleted.includes(task.id)) {
          completedRequiredTasks++;
        }
      });
    });
    const taskCompletionRate = totalRequiredTasks > 0 
      ? completedRequiredTasks / totalRequiredTasks 
      : 0;

    if (allRequiredModulesComplete && enoughMissionsComplete && taskCompletionRate >= 0.75) {
      badges.push('role_path_complete');
    }

    return [...new Set(badges)]; // Deduplicate
  }, []);

  const isRoleComplete = useCallback((role: UserRole, roleProgress: RoleProgressData): boolean => {
    const requirements = roleCompletionRequirements[role];
    const plan = roleTrainingPlans[role];

    if (!requirements || !plan) return false;

    // Check required modules
    const allRequiredModulesComplete = requirements.requiredModules.every(m =>
      roleProgress.modulesCompleted.includes(m)
    );

    // Check minimum missions
    const enoughMissionsComplete = roleProgress.missionsCompleted.length >= requirements.minimumMissions;

    // Check phase tasks (at least 75% of each required phase)
    let allPhasesComplete = true;
    requirements.requiredPhases.forEach(phaseId => {
      const phase = plan.phases.find(p => p.id === phaseId);
      if (phase) {
        const phaseTasks = phase.tasks.map(t => t.id);
        const completedInPhase = phaseTasks.filter(t => 
          roleProgress.tasksCompleted.includes(t)
        ).length;
        const requiredComplete = Math.ceil(phaseTasks.length * 0.75);
        if (completedInPhase < requiredComplete) {
          allPhasesComplete = false;
        }
      }
    });

    return allRequiredModulesComplete && enoughMissionsComplete && allPhasesComplete;
  }, []);

  const getRoleCompletionProgress = useCallback((role: UserRole, roleProgress: RoleProgressData) => {
    const requirements = roleCompletionRequirements[role];
    const plan = roleTrainingPlans[role];
    const missions = roleMissions[role] || [];

    if (!requirements || !plan) {
      return { modulesProgress: 0, missionsProgress: 0, tasksProgress: 0, overall: 0 };
    }

    // Modules progress
    const modulesComplete = requirements.requiredModules.filter(m =>
      roleProgress.modulesCompleted.includes(m)
    ).length;
    const modulesProgress = (modulesComplete / requirements.requiredModules.length) * 100;

    // Missions progress
    const missionsComplete = Math.min(roleProgress.missionsCompleted.length, requirements.minimumMissions);
    const missionsProgress = (missionsComplete / requirements.minimumMissions) * 100;

    // Tasks progress
    let totalTasks = 0;
    let completedTasks = 0;
    plan.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        totalTasks++;
        if (roleProgress.tasksCompleted.includes(task.id)) {
          completedTasks++;
        }
      });
    });
    const tasksProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Overall (weighted average)
    const overall = (modulesProgress * 0.4 + missionsProgress * 0.3 + tasksProgress * 0.3);

    return {
      modulesProgress: Math.round(modulesProgress),
      missionsProgress: Math.round(missionsProgress),
      tasksProgress: Math.round(tasksProgress),
      overall: Math.round(overall),
      modulesComplete,
      totalModules: requirements.requiredModules.length,
      missionsComplete,
      totalMissions: missions.length,
      tasksComplete: completedTasks,
      totalTasks,
    };
  }, []);

  return {
    evaluateBadgesForRole,
    isRoleComplete,
    getRoleCompletionProgress,
  };
}
