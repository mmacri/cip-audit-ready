import { UserRole } from '@/hooks/useUserPreferences';

// Badge definitions
export type BadgeId =
  | 'scope_navigator'
  | 'evidence_architect'
  | 'patch_guardian'
  | 'incident_responder'
  | 'audit_ready'
  | 'role_path_complete';

export interface BadgeDefinition {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'scope_navigator',
    name: 'Scope Navigator',
    description: 'Mastered asset identification and CIP-002 scope determination',
    icon: 'Compass',
    criteria: 'Complete asset identification modules and scope-related tasks',
  },
  {
    id: 'evidence_architect',
    name: 'Evidence Architect',
    description: 'Expert in organizing and mapping CIP compliance evidence',
    icon: 'FolderSearch',
    criteria: 'Complete evidence-related tasks and use the Evidence Lab',
  },
  {
    id: 'patch_guardian',
    name: 'Patch Guardian',
    description: 'Proficient in system security and CIP-007 patch management',
    icon: 'Shield',
    criteria: 'Complete system security and patching modules and related tasks',
  },
  {
    id: 'incident_responder',
    name: 'Incident Responder',
    description: 'Ready to handle CIP-008/009 incident and recovery scenarios',
    icon: 'AlertTriangle',
    criteria: 'Complete incident response modules and scenario-based missions',
  },
  {
    id: 'audit_ready',
    name: 'Audit Ready',
    description: 'Prepared for NERC CIP audit interactions and evidence presentation',
    icon: 'ClipboardCheck',
    criteria: 'Use Self-Assessment, Readiness Plan, and Audit Simulator tools',
  },
  {
    id: 'role_path_complete',
    name: 'Role Path Complete',
    description: 'Completed all required training for your designated role',
    icon: 'Trophy',
    criteria: 'Complete all required steps and missions for your role',
  },
];

// Progress backup type
export interface ProgressBackup {
  version: string;
  exportedAt: string;
  selectedRole?: UserRole | null;
  firstName?: string;
  experience?: string;
  onboardingComplete?: boolean;
  roleProgress?: Record<string, any>;
  moduleProgress?: {
    completedModules: number[];
    checklistStates: Record<string, boolean>;
  };
  finalExamPassed?: boolean;
  finalExamDate?: string;
  badges?: Record<string, BadgeId[]>;
}

// Role completion requirements
export interface RoleCompletionRequirements {
  requiredModules: number[];
  minimumMissions: number;
  requiredPhases: string[];
}

export const roleCompletionRequirements: Record<UserRole, RoleCompletionRequirements> = {
  compliance: {
    requiredModules: [1, 3, 7, 9, 10],
    minimumMissions: 3,
    requiredPhases: ['foundations', 'deep-dives', 'practice', 'lead'],
  },
  'it-ot': {
    requiredModules: [1, 2, 5, 6, 7, 8],
    minimumMissions: 3,
    requiredPhases: ['foundations', 'deep-dives', 'practice', 'lead'],
  },
  'physical-security': {
    requiredModules: [1, 2, 5, 7],
    minimumMissions: 3,
    requiredPhases: ['foundations', 'deep-dives', 'practice', 'lead'],
  },
  'hr-training': {
    requiredModules: [1, 3, 4],
    minimumMissions: 3,
    requiredPhases: ['foundations', 'deep-dives', 'practice', 'lead'],
  },
  leadership: {
    requiredModules: [1, 3, 10],
    minimumMissions: 3,
    requiredPhases: ['foundations', 'deep-dives', 'practice', 'lead'],
  },
  other: {
    requiredModules: [1, 2, 3],
    minimumMissions: 2,
    requiredPhases: ['foundations', 'deep-dives'],
  },
};
