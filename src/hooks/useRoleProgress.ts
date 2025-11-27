import { useState, useEffect, useCallback } from 'react';
import { UserRole } from './useUserPreferences';

const STORAGE_KEY = 'cip-academy-role-progress';

export interface RoleProgressData {
  modulesCompleted: number[];
  tasksCompleted: string[];
  missionsCompleted: string[];
  finalExamPassed: boolean;
}

export interface AllRoleProgress {
  compliance: RoleProgressData;
  'it-ot': RoleProgressData;
  'physical-security': RoleProgressData;
  'hr-training': RoleProgressData;
  leadership: RoleProgressData;
  other: RoleProgressData;
}

const defaultRoleProgress: RoleProgressData = {
  modulesCompleted: [],
  tasksCompleted: [],
  missionsCompleted: [],
  finalExamPassed: false,
};

const defaultAllProgress: AllRoleProgress = {
  compliance: { ...defaultRoleProgress },
  'it-ot': { ...defaultRoleProgress },
  'physical-security': { ...defaultRoleProgress },
  'hr-training': { ...defaultRoleProgress },
  leadership: { ...defaultRoleProgress },
  other: { ...defaultRoleProgress },
};

export function useRoleProgress(currentRole: UserRole | null) {
  const [allProgress, setAllProgress] = useState<AllRoleProgress>(defaultAllProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAllProgress({ ...defaultAllProgress, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load role progress:', error);
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = useCallback((newProgress: AllRoleProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setAllProgress(newProgress);
    } catch (error) {
      console.error('Failed to save role progress:', error);
    }
  }, []);

  const getCurrentRoleProgress = useCallback((): RoleProgressData => {
    if (!currentRole) return defaultRoleProgress;
    return allProgress[currentRole] || defaultRoleProgress;
  }, [currentRole, allProgress]);

  const markModuleComplete = useCallback((moduleId: number) => {
    if (!currentRole) return;
    setAllProgress(prev => {
      const roleProgress = prev[currentRole] || defaultRoleProgress;
      if (roleProgress.modulesCompleted.includes(moduleId)) return prev;
      const newProgress = {
        ...prev,
        [currentRole]: {
          ...roleProgress,
          modulesCompleted: [...roleProgress.modulesCompleted, moduleId],
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [currentRole, saveProgress]);

  const markTaskComplete = useCallback((taskId: string) => {
    if (!currentRole) return;
    setAllProgress(prev => {
      const roleProgress = prev[currentRole] || defaultRoleProgress;
      if (roleProgress.tasksCompleted.includes(taskId)) return prev;
      const newProgress = {
        ...prev,
        [currentRole]: {
          ...roleProgress,
          tasksCompleted: [...roleProgress.tasksCompleted, taskId],
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [currentRole, saveProgress]);

  const markTaskIncomplete = useCallback((taskId: string) => {
    if (!currentRole) return;
    setAllProgress(prev => {
      const roleProgress = prev[currentRole] || defaultRoleProgress;
      const newProgress = {
        ...prev,
        [currentRole]: {
          ...roleProgress,
          tasksCompleted: roleProgress.tasksCompleted.filter(id => id !== taskId),
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [currentRole, saveProgress]);

  const toggleTask = useCallback((taskId: string) => {
    if (!currentRole) return;
    const roleProgress = allProgress[currentRole] || defaultRoleProgress;
    if (roleProgress.tasksCompleted.includes(taskId)) {
      markTaskIncomplete(taskId);
    } else {
      markTaskComplete(taskId);
    }
  }, [currentRole, allProgress, markTaskComplete, markTaskIncomplete]);

  const isTaskComplete = useCallback((taskId: string): boolean => {
    if (!currentRole) return false;
    const roleProgress = allProgress[currentRole] || defaultRoleProgress;
    return roleProgress.tasksCompleted.includes(taskId);
  }, [currentRole, allProgress]);

  const isModuleCompleteForRole = useCallback((moduleId: number): boolean => {
    if (!currentRole) return false;
    const roleProgress = allProgress[currentRole] || defaultRoleProgress;
    return roleProgress.modulesCompleted.includes(moduleId);
  }, [currentRole, allProgress]);

  const setFinalExamPassed = useCallback((passed: boolean) => {
    if (!currentRole) return;
    setAllProgress(prev => {
      const newProgress = {
        ...prev,
        [currentRole]: {
          ...prev[currentRole],
          finalExamPassed: passed,
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [currentRole, saveProgress]);

  const toggleMission = useCallback((missionId: string) => {
    if (!currentRole) return;
    setAllProgress(prev => {
      const roleProgress = prev[currentRole] || defaultRoleProgress;
      const isComplete = roleProgress.missionsCompleted.includes(missionId);
      const newProgress = {
        ...prev,
        [currentRole]: {
          ...roleProgress,
          missionsCompleted: isComplete
            ? roleProgress.missionsCompleted.filter(id => id !== missionId)
            : [...roleProgress.missionsCompleted, missionId],
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [currentRole, saveProgress]);

  const isMissionComplete = useCallback((missionId: string): boolean => {
    if (!currentRole) return false;
    const roleProgress = allProgress[currentRole] || defaultRoleProgress;
    return roleProgress.missionsCompleted.includes(missionId);
  }, [currentRole, allProgress]);

  const getProgressStats = useCallback((role: UserRole) => {
    const roleProgress = allProgress[role] || defaultRoleProgress;
    return {
      modulesCompleted: roleProgress.modulesCompleted.length,
      tasksCompleted: roleProgress.tasksCompleted.length,
      missionsCompleted: roleProgress.missionsCompleted.length,
      finalExamPassed: roleProgress.finalExamPassed,
    };
  }, [allProgress]);

  const resetRoleProgress = useCallback((role?: UserRole) => {
    if (role) {
      setAllProgress(prev => {
        const newProgress = {
          ...prev,
          [role]: { ...defaultRoleProgress },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    } else {
      saveProgress(defaultAllProgress);
    }
  }, [saveProgress]);

  return {
    allProgress,
    isLoaded,
    getCurrentRoleProgress,
    markModuleComplete,
    markTaskComplete,
    markTaskIncomplete,
    toggleTask,
    isTaskComplete,
    toggleMission,
    isMissionComplete,
    isModuleCompleteForRole,
    setFinalExamPassed,
    getProgressStats,
    resetRoleProgress,
  };
}
