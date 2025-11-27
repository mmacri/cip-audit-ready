import { useCallback } from 'react';
import { ProgressBackup } from '@/types/progressTypes';
import { toast } from '@/hooks/use-toast';

const BACKUP_VERSION = '1.0';

const PROGRESS_KEYS = [
  'cip-academy-preferences',
  'cip-academy-role-progress',
  'cip-module-progress',
  'finalExamPassed',
  'finalExamDate',
  'cip-academy-badges',
  'cip-academy-tools-used',
];

export function useProgressBackup() {
  const exportProgress = useCallback((): ProgressBackup => {
    const backup: ProgressBackup = {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
    };

    // Gather all progress-related data
    try {
      const preferences = localStorage.getItem('cip-academy-preferences');
      if (preferences) {
        const prefs = JSON.parse(preferences);
        backup.selectedRole = prefs.role;
        backup.firstName = prefs.firstName;
        backup.experience = prefs.experience;
        backup.onboardingComplete = prefs.onboardingComplete;
      }

      const roleProgress = localStorage.getItem('cip-academy-role-progress');
      if (roleProgress) {
        backup.roleProgress = JSON.parse(roleProgress);
      }

      const moduleProgress = localStorage.getItem('cip-module-progress');
      if (moduleProgress) {
        backup.moduleProgress = JSON.parse(moduleProgress);
      }

      const finalExamPassed = localStorage.getItem('finalExamPassed');
      if (finalExamPassed) {
        backup.finalExamPassed = finalExamPassed === 'true';
      }

      const finalExamDate = localStorage.getItem('finalExamDate');
      if (finalExamDate) {
        backup.finalExamDate = finalExamDate;
      }

      const badges = localStorage.getItem('cip-academy-badges');
      if (badges) {
        backup.badges = JSON.parse(badges);
      }
    } catch (error) {
      console.error('Error gathering progress data:', error);
    }

    return backup;
  }, []);

  const downloadBackup = useCallback(() => {
    const backup = exportProgress();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cip-readiness-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Progress Exported',
      description: 'Your training progress has been downloaded as a JSON file.',
    });
  }, [exportProgress]);

  const validateBackup = useCallback((data: unknown): { valid: boolean; error?: string; backup?: ProgressBackup } => {
    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'This file does not appear to be a valid CIP Readiness progress backup.' };
    }

    const backup = data as ProgressBackup;

    if (!backup.version || !backup.exportedAt) {
      return { valid: false, error: 'This file is missing required backup metadata (version or export date).' };
    }

    // Check version compatibility
    const [major] = backup.version.split('.');
    if (parseInt(major) > parseInt(BACKUP_VERSION.split('.')[0])) {
      return { valid: false, error: `This backup was created with a newer version (${backup.version}). Please update your app.` };
    }

    return { valid: true, backup };
  }, []);

  const restoreProgress = useCallback((backup: ProgressBackup): boolean => {
    try {
      // Restore preferences
      if (backup.selectedRole || backup.firstName || backup.experience || backup.onboardingComplete !== undefined) {
        const existingPrefs = localStorage.getItem('cip-academy-preferences');
        const prefs = existingPrefs ? JSON.parse(existingPrefs) : {};
        
        if (backup.selectedRole) prefs.role = backup.selectedRole;
        if (backup.firstName) prefs.firstName = backup.firstName;
        if (backup.experience) prefs.experience = backup.experience;
        if (backup.onboardingComplete !== undefined) prefs.onboardingComplete = backup.onboardingComplete;
        
        localStorage.setItem('cip-academy-preferences', JSON.stringify(prefs));
      }

      // Restore role progress
      if (backup.roleProgress) {
        localStorage.setItem('cip-academy-role-progress', JSON.stringify(backup.roleProgress));
      }

      // Restore module progress
      if (backup.moduleProgress) {
        localStorage.setItem('cip-module-progress', JSON.stringify(backup.moduleProgress));
      }

      // Restore final exam status
      if (backup.finalExamPassed !== undefined) {
        localStorage.setItem('finalExamPassed', String(backup.finalExamPassed));
      }

      if (backup.finalExamDate) {
        localStorage.setItem('finalExamDate', backup.finalExamDate);
      }

      // Restore badges
      if (backup.badges) {
        localStorage.setItem('cip-academy-badges', JSON.stringify(backup.badges));
      }

      return true;
    } catch (error) {
      console.error('Error restoring progress:', error);
      return false;
    }
  }, []);

  const getBackupSummary = useCallback((backup: ProgressBackup): string[] => {
    const summary: string[] = [];

    if (backup.selectedRole) {
      summary.push(`Selected role: ${backup.selectedRole}`);
    }

    if (backup.roleProgress) {
      const roles = Object.keys(backup.roleProgress);
      let totalTasks = 0;
      let totalMissions = 0;
      roles.forEach(role => {
        const rp = backup.roleProgress?.[role];
        if (rp) {
          totalTasks += rp.tasksCompleted?.length || 0;
          totalMissions += rp.missionsCompleted?.length || 0;
        }
      });
      if (totalTasks > 0 || totalMissions > 0) {
        summary.push(`${totalTasks} tasks and ${totalMissions} missions completed across roles`);
      }
    }

    if (backup.moduleProgress?.completedModules?.length) {
      summary.push(`${backup.moduleProgress.completedModules.length} modules completed`);
    }

    if (backup.finalExamPassed) {
      summary.push('Final exam passed');
    }

    if (backup.badges) {
      let totalBadges = 0;
      Object.values(backup.badges).forEach(b => {
        totalBadges += b?.length || 0;
      });
      if (totalBadges > 0) {
        summary.push(`${totalBadges} badges earned`);
      }
    }

    summary.push(`Exported on: ${new Date(backup.exportedAt).toLocaleDateString()}`);

    return summary;
  }, []);

  return {
    exportProgress,
    downloadBackup,
    validateBackup,
    restoreProgress,
    getBackupSummary,
  };
}
