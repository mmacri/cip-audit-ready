import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cip-academy-progress';

export interface ProgressData {
  completedModules: number[];
  checklistStates: Record<string, boolean>;
  lastUpdated: string;
}

const defaultProgress: ProgressData = {
  completedModules: [],
  checklistStates: {},
  lastUpdated: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = useCallback((newProgress: ProgressData) => {
    try {
      const updated = { ...newProgress, lastUpdated: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setProgress(updated);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, []);

  const markModuleComplete = useCallback((moduleId: number) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const newProgress = {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const markModuleIncomplete = useCallback((moduleId: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedModules: prev.completedModules.filter(id => id !== moduleId),
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const isModuleComplete = useCallback((moduleId: number) => {
    return progress.completedModules.includes(moduleId);
  }, [progress.completedModules]);

  const setChecklistItem = useCallback((key: string, checked: boolean) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        checklistStates: { ...prev.checklistStates, [key]: checked },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const getChecklistItem = useCallback((key: string) => {
    return progress.checklistStates[key] ?? false;
  }, [progress.checklistStates]);

  const getCompletionPercentage = useCallback(() => {
    return Math.round((progress.completedModules.length / 12) * 100);
  }, [progress.completedModules]);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    isLoaded,
    markModuleComplete,
    markModuleIncomplete,
    isModuleComplete,
    setChecklistItem,
    getChecklistItem,
    getCompletionPercentage,
    resetProgress,
  };
}
