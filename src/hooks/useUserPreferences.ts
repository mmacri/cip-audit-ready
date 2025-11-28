import { useState, useEffect, useCallback } from 'react';

const PREFS_KEY = 'cip-academy-preferences';

export type UserRole = 'compliance' | 'it-ot' | 'physical-security' | 'hr-training' | 'leadership' | 'other';
export type ExperienceLevel = 'new' | 'some' | 'experienced';

export interface UserPreferences {
  role: UserRole | null;
  experience: ExperienceLevel | null;
  onboardingComplete: boolean;
  firstName?: string;
}

const defaultPreferences: UserPreferences = {
  role: null,
  experience: null,
  onboardingComplete: false,
};

export const roleLabels: Record<UserRole, string> = {
  'compliance': 'Compliance / Risk Manager',
  'it-ot': 'IT / OT Engineer',
  'physical-security': 'Physical Security',
  'hr-training': 'HR / Training',
  'leadership': 'Leadership',
  'other': 'Other',
};

export const experienceLabels: Record<ExperienceLevel, string> = {
  'new': 'New to NERC CIP',
  'some': 'Some Experience',
  'experienced': 'Experienced',
};

export const roleModules: Record<UserRole, number[]> = {
  'compliance': [1, 3, 7, 9, 10, 11, 12],
  'it-ot': [1, 2, 5, 6, 7, 8, 11],
  'physical-security': [1, 2, 5, 7, 12],
  'hr-training': [1, 3, 4],
  'leadership': [1, 3, 10, 11, 12],
  'other': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    setIsLoaded(true);
  }, []);

  const savePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
      setPreferences(updated);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [preferences]);

  const completeOnboarding = useCallback((role: UserRole, experience: ExperienceLevel) => {
    savePreferences({ role, experience, onboardingComplete: true });
  }, [savePreferences]);

  const resetPreferences = useCallback(() => {
    localStorage.removeItem(PREFS_KEY);
    setPreferences(defaultPreferences);
  }, []);

  const getRecommendedModules = useCallback(() => {
    if (!preferences.role) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return roleModules[preferences.role];
  }, [preferences.role]);

  const isModuleRecommended = useCallback((moduleId: number) => {
    return getRecommendedModules().includes(moduleId);
  }, [getRecommendedModules]);

  return {
    preferences,
    isLoaded,
    savePreferences,
    completeOnboarding,
    resetPreferences,
    getRecommendedModules,
    isModuleRecommended,
  };
}
