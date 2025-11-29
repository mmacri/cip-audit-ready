# CIP Readiness Academy - Project Documentation Index (PDI)

## Overview

**Project Name:** CIP Readiness Academy  
**Purpose:** A comprehensive training platform for power utilities preparing for NERC CIP (Critical Infrastructure Protection) audits  
**Deployment:** Static GitHub Pages at `https://mmacri.github.io/cip-audit-ready/`  
**Technology Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Backend:** None (fully client-side with localStorage persistence)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Core Features](#core-features)
5. [Data Models & Types](#data-models--types)
6. [Hooks & State Management](#hooks--state-management)
7. [Components](#components)
8. [Pages & Routing](#pages--routing)
9. [Design System](#design-system)
10. [LocalStorage Schema](#localstorage-schema)
11. [Role-Based System](#role-based-system)
12. [Progress Tracking](#progress-tracking)
13. [Achievement Badges](#achievement-badges)
14. [Pre-Assessment System](#pre-assessment-system)
15. [Branching Scenarios](#branching-scenarios)
16. [Certificates](#certificates)
17. [Sample Artifacts](#sample-artifacts)
18. [Reflection System](#reflection-system)
19. [Progress Backup](#progress-backup)
20. [Deployment Configuration](#deployment-configuration)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CIP Readiness Academy                     │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Layer (React + TypeScript)                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │   Pages     │ │ Components  │ │   Hooks     │               │
│  │  (Routes)   │ │    (UI)     │ │  (State)    │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Static Data │ │ localStorage│ │   Types     │               │
│  │  (src/data) │ │ Persistence │ │ Definitions │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│  UI Framework                                                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │  shadcn/ui  │ │ Tailwind CSS│ │ Lucide Icons│               │
│  │ Components  │ │   Styling   │ │             │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Static-First:** No backend required; all data persisted in localStorage
2. **Role-Centric:** Every feature adapts to the user's selected role
3. **Progressive Learning:** Phased training paths with clear milestones
4. **Audit-Aligned:** All content uses realistic NERC CIP terminology and scenarios
5. **Gamification:** Badges, certificates, and progress tracking for engagement

---

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | - | Type Safety |
| Vite | - | Build Tool & Dev Server |
| React Router DOM | 6.30.1 | Client-side Routing |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | - | Utility-first CSS |
| shadcn/ui | - | Component Library |
| Lucide React | 0.462.0 | Icon Library |
| tailwindcss-animate | 1.0.7 | Animation Utilities |

### State & Data
| Technology | Version | Purpose |
|------------|---------|---------|
| TanStack React Query | 5.83.0 | Server State Management |
| React Hook Form | 7.61.1 | Form Management |
| Zod | 3.25.76 | Schema Validation |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| date-fns | 3.6.0 | Date Formatting |
| jsPDF | 3.0.4 | PDF Generation |
| jspdf-autotable | 5.0.2 | PDF Tables |
| Recharts | 2.15.4 | Charts/Visualizations |
| Sonner | 1.7.4 | Toast Notifications |

---

## File Structure

```
cip-audit-ready/
├── public/
│   ├── 404.html              # GitHub Pages SPA fallback
│   ├── robots.txt            # SEO configuration
│   └── favicon.ico           # Site icon
├── src/
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   │   ├── Layout.tsx    # Main layout wrapper
│   │   │   ├── Navbar.tsx    # Navigation bar
│   │   │   └── Footer.tsx    # Site footer
│   │   ├── ui/               # shadcn/ui components (40+ components)
│   │   ├── diagrams/         # Visual diagrams
│   │   │   ├── ESPPSPDiagram.tsx
│   │   │   ├── IncidentResponseDiagram.tsx
│   │   │   ├── PatchManagementDiagram.tsx
│   │   │   └── TrainingMatrixDiagram.tsx
│   │   ├── BadgeDisplay.tsx          # Achievement badges UI
│   │   ├── InteractiveChecklist.tsx  # Phase checklists
│   │   ├── MissionCard.tsx           # Mission display cards
│   │   ├── ModuleRecap.tsx           # Module recap component
│   │   ├── MyRoleBar.tsx             # Persistent role indicator
│   │   ├── NavLink.tsx               # Navigation link component
│   │   ├── OnboardingModal.tsx       # First-visit onboarding
│   │   ├── PitfallsSection.tsx       # Common pitfalls display
│   │   ├── PreAssessment.tsx         # Pre-assessment quiz
│   │   ├── ProgressWidget.tsx        # Progress display widget
│   │   ├── Quiz.tsx                  # Module quiz component
│   │   ├── ReflectionPanel.tsx       # Reflection notes UI
│   │   ├── RoleModuleCallout.tsx     # Role-specific callouts
│   │   ├── RoleScenarioPlayer.tsx    # Branching scenario player
│   │   ├── RoleSelector.tsx          # Role selection dropdown
│   │   ├── RoleSelectorCards.tsx     # Role selection cards
│   │   ├── RoleTaskChecklist.tsx     # Role task lists
│   │   ├── SampleArtifact.tsx        # Sample artifact display
│   │   ├── SpacedReviewQuiz.tsx      # Spaced repetition quiz
│   │   ├── TrainingPlanGenerator.tsx # Training plan wizard
│   │   └── UserRoleBadge.tsx         # User role badge display
│   ├── data/
│   │   ├── preAssessmentData.ts      # Pre-assessment questions
│   │   ├── reflectionPromptsData.ts  # Reflection prompts
│   │   ├── roleMissionsData.ts       # Role-specific missions
│   │   ├── rolePitfallsData.ts       # Role pitfalls & red flags
│   │   ├── roleScenariosData.ts      # Branching scenarios
│   │   ├── roleTrainingData.ts       # Training phases & steps
│   │   └── sampleArtifactsData.ts    # Sample artifact content
│   ├── hooks/
│   │   ├── useBadges.ts              # Badge evaluation logic
│   │   ├── useMobile.tsx             # Mobile detection
│   │   ├── usePreAssessment.ts       # Pre-assessment state
│   │   ├── useProgress.ts            # Module progress tracking
│   │   ├── useProgressBackup.ts      # Export/import progress
│   │   ├── useReflectionNotes.ts     # Reflection notes state
│   │   ├── useRoleProgress.ts        # Role-specific progress
│   │   ├── useScenarioProgress.ts    # Scenario completion state
│   │   ├── useToast.ts               # Toast notifications
│   │   └── useUserPreferences.ts     # User preferences state
│   ├── pages/
│   │   ├── AboutContact.tsx          # About page
│   │   ├── Achievements.tsx          # Global achievements view
│   │   ├── AuditSimulator.tsx        # Audit request simulator
│   │   ├── CaseStudies.tsx           # Case study scenarios
│   │   ├── Certificate.tsx           # Global completion certificate
│   │   ├── EvidenceLab.tsx           # Evidence organization lab
│   │   ├── FinalExam.tsx             # Final assessment
│   │   ├── Home.tsx                  # Landing page
│   │   ├── LearningPath.tsx          # Learning path overview
│   │   ├── ManagerGuide.tsx          # Manager/team guide
│   │   ├── Modules.tsx               # Module listing
│   │   ├── NotFound.tsx              # 404 page
│   │   ├── ProgressBackup.tsx        # Export/import UI
│   │   ├── ReadinessPlan.tsx         # Readiness plan builder
│   │   ├── Resources.tsx             # Resources page
│   │   ├── RoleCertificate.tsx       # Role completion certificate
│   │   ├── RoleTraining.tsx          # Role selection page
│   │   ├── RoleTrainingDetail.tsx    # Role training dashboard
│   │   └── SelfAssessment.tsx        # Self-assessment tool
│   ├── types/
│   │   └── progressTypes.ts          # Type definitions
│   ├── lib/
│   │   └── utils.ts                  # Utility functions (cn)
│   ├── utils/
│   │   └── pdfTemplates.ts           # PDF generation utilities
│   ├── App.tsx                       # Root component & routes
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles & CSS variables
├── index.html                        # HTML entry point
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── pdi.md                            # This documentation file
```

---

## Core Features

### 1. Role-Based Training System
- **5 Primary Roles:** Compliance/Risk Manager, IT/OT Engineer, Physical Security, HR/Training, Leadership
- **6th "Other" Role:** For users with mixed responsibilities
- **Role Selection:** Persistent via localStorage, displayed in MyRoleBar
- **Role-Specific Content:** Modules, missions, scenarios, pitfalls all adapt to selected role

### 2. Phased Learning Paths
Each role has 4 training phases:
1. **Get Oriented** - Foundations and core concepts
2. **Master Your Controls** - Technical deep dives
3. **Evidence & Audit Prep** - Practical preparation
4. **Lead & Improve** - Advanced topics and continuous improvement

### 3. Module System
- **10 Modules** covering all NERC CIP standards
- **Role Recommendations:** Modules tagged as Required/Recommended per role
- **Quizzes:** Each module has completion quiz
- **Progress Tracking:** Completion persisted to localStorage

### 4. Role Missions
- **3-5 Missions per Role** with realistic scenarios
- **Step-by-Step Tasks** tied to existing tools (Evidence Lab, Audit Simulator)
- **Completion Tracking:** Mission progress stored per role

### 5. Interactive Scenarios
- **Branching Narratives** with multiple paths
- **Role-Specific Themes:** Each role has unique scenario
- **Outcome Types:** Good, Neutral, Poor endings with feedback

### 6. Pre-Assessment System
- **10-12 Questions per Role** across 5 domains
- **Adaptive Recommendations** based on weakest domains
- **Retake Option** to track improvement

### 7. Achievement Badges
- **6 Badge Types:** Scope Navigator, Evidence Architect, Patch Guardian, Incident Responder, Audit Ready, Role Path Complete
- **Automatic Evaluation** based on progress
- **Display:** Role dashboard and global achievements page

### 8. Certificates
- **Role Completion Certificates** unlock when all requirements met
- **Global Certificate** for completing all modules
- **Print-Friendly Design** with proper styling

### 9. Progress Backup
- **JSON Export** of all progress data
- **Import/Restore** with validation
- **Includes:** Role progress, reflection notes, scenario progress, pre-assessment results

### 10. Reflection System
- **Reflection Panels** in modules and missions
- **Personal Notes** with auto-save
- **Prompts** role-specific and CIP-aligned

### 11. Sample Artifacts
- **Realistic Examples** of audit-ready documentation
- **Before/After Comparisons** showing improvements
- **Context Notes** explaining what makes strong evidence

### 12. Common Pitfalls & Red Flags
- **Role-Specific Pitfalls** for each training path
- **Audit Red Flags** that trigger deeper scrutiny
- **Practical Guidance** to avoid common mistakes

### 13. Manager/Team Guide
- **Program Administration** guidance
- **Rollout Plans** for team training
- **Session Facilitation** tips

---

## Data Models & Types

### src/types/progressTypes.ts

```typescript
// Badge System
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
}

// Role Completion Requirements
export interface RoleCompletionRequirements {
  requiredSteps: string[];
  minimumMissions: number;
  requiredModules: number[];
}

// Progress Backup
export interface ProgressBackup {
  version: string;
  exportedAt: string;
  selectedRole?: string;
  roleProgress?: Record<string, any>;
  moduleProgress?: Record<string, any>;
  reflectionNotes?: Record<string, any>;
  scenarioProgress?: Record<string, any>;
  preAssessment?: Record<string, any>;
  otherKeys?: Record<string, any>;
}

// Badge Definitions
export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'scope_navigator',
    name: 'Scope Navigator',
    description: 'Mastered asset identification and CIP scope determination',
    icon: 'Compass'
  },
  {
    id: 'evidence_architect',
    name: 'Evidence Architect',
    description: 'Built strong evidence organization practices',
    icon: 'FolderOpen'
  },
  {
    id: 'patch_guardian',
    name: 'Patch Guardian',
    description: 'Completed system security and patch management training',
    icon: 'Shield'
  },
  {
    id: 'incident_responder',
    name: 'Incident Responder',
    description: 'Prepared for incident response and recovery scenarios',
    icon: 'AlertTriangle'
  },
  {
    id: 'audit_ready',
    name: 'Audit Ready',
    description: 'Completed self-assessment, readiness plan, and audit simulation',
    icon: 'CheckCircle'
  },
  {
    id: 'role_path_complete',
    name: 'Role Path Complete',
    description: 'Finished all required steps and missions for your role',
    icon: 'Award'
  }
];

// Role Completion Requirements per Role
export const roleCompletionRequirements: Record<string, RoleCompletionRequirements> = {
  compliance: {
    requiredSteps: ['phase1_foundations', 'phase2_governance', 'phase3_evidence', 'phase4_audit'],
    minimumMissions: 3,
    requiredModules: [1, 3, 7, 9, 10]
  },
  'it-ot': {
    requiredSteps: ['phase1_foundations', 'phase2_technical', 'phase3_patching', 'phase4_security'],
    minimumMissions: 3,
    requiredModules: [1, 2, 5, 6, 7, 8]
  },
  'physical-security': {
    requiredSteps: ['phase1_foundations', 'phase2_access', 'phase3_monitoring', 'phase4_incidents'],
    minimumMissions: 3,
    requiredModules: [1, 2, 5, 7]
  },
  'hr-training': {
    requiredSteps: ['phase1_foundations', 'phase2_personnel', 'phase3_training', 'phase4_records'],
    minimumMissions: 3,
    requiredModules: [1, 3, 4]
  },
  leadership: {
    requiredSteps: ['phase1_foundations', 'phase2_governance', 'phase3_risk', 'phase4_oversight'],
    minimumMissions: 3,
    requiredModules: [1, 3, 10]
  }
};
```

### src/hooks/useUserPreferences.ts

```typescript
export type UserRole = 'compliance' | 'it-ot' | 'physical-security' | 'hr-training' | 'leadership' | 'other';
export type ExperienceLevel = 'new' | 'some' | 'experienced';

export interface UserPreferences {
  role: UserRole | null;
  experience: ExperienceLevel | null;
  onboardingComplete: boolean;
  firstName?: string;
}

export const roleLabels: Record<UserRole, string> = {
  'compliance': 'Compliance / Risk Manager',
  'it-ot': 'IT / OT Engineer',
  'physical-security': 'Physical Security',
  'hr-training': 'HR / Training',
  'leadership': 'Leadership',
  'other': 'Other',
};

export const roleModules: Record<UserRole, number[]> = {
  'compliance': [1, 3, 7, 9, 10],
  'it-ot': [1, 2, 5, 6, 7, 8],
  'physical-security': [1, 2, 5, 7],
  'hr-training': [1, 3, 4],
  'leadership': [1, 3, 10],
  'other': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};
```

### Pre-Assessment Types

```typescript
export type AssessmentDomain = 
  | 'scope_assets'
  | 'training_people'
  | 'technical_controls'
  | 'incidents_recovery'
  | 'evidence_audit';

export interface PreAssessmentQuestion {
  id: string;
  domain: AssessmentDomain;
  question: string;
  options: { id: string; text: string; correct: boolean }[];
  explanation: string;
}

export interface PreAssessmentResults {
  [roleKey: string]: {
    completedAt: string;
    domainScores: Record<AssessmentDomain, number>;
  };
}
```

### Scenario Types

```typescript
export interface ScenarioChoice {
  id: string;
  label: string;
  nextNodeId: string;
}

export interface ScenarioNode {
  id: string;
  title: string;
  description: string;
  choices: ScenarioChoice[];
  isEnding?: boolean;
  endingSummary?: string;
  outcomeType?: 'good' | 'neutral' | 'poor';
  relatedModules?: number[];
}

export interface RoleScenario {
  roleKey: string;
  name: string;
  intro: string;
  nodes: ScenarioNode[];
}
```

### Reflection Types

```typescript
export interface ReflectionNote {
  updatedAt: string;
  text: string;
}

export type ReflectionNotesStore = Record<string, ReflectionNote>;
// Key format: `${roleKey}:${contextType}:${contextId}`
```

---

## Hooks & State Management

### useUserPreferences
**File:** `src/hooks/useUserPreferences.ts`  
**Storage Key:** `cip-academy-preferences`

| Function | Purpose |
|----------|---------|
| `preferences` | Current user preferences state |
| `isLoaded` | Whether preferences loaded from storage |
| `savePreferences(newPrefs)` | Update and persist preferences |
| `completeOnboarding(role, experience)` | Mark onboarding complete |
| `resetPreferences()` | Clear all preferences |
| `getRecommendedModules()` | Get role-specific module recommendations |
| `isModuleRecommended(moduleId)` | Check if module recommended for role |

### useRoleProgress
**File:** `src/hooks/useRoleProgress.ts`  
**Storage Key:** `cip-academy-role-progress`

| Function | Purpose |
|----------|---------|
| `roleProgress` | Progress data for all roles |
| `getCurrentRoleProgress()` | Get progress for selected role |
| `completeStep(stepId)` | Mark step as complete |
| `completeMission(missionId)` | Mark mission as complete |
| `getCompletedSteps(role)` | Get list of completed steps |
| `getCompletedMissions(role)` | Get list of completed missions |

### useProgress
**File:** `src/hooks/useProgress.ts`  
**Storage Key:** `cip-academy-progress`

| Function | Purpose |
|----------|---------|
| `progress` | Module completion progress |
| `isModuleComplete(moduleId)` | Check module completion |
| `completeModule(moduleId)` | Mark module complete |
| `getCompletedCount()` | Get total completed modules |

### useBadges
**File:** `src/hooks/useBadges.ts`

| Function | Purpose |
|----------|---------|
| `evaluateBadgesForRole(role, progress)` | Calculate earned badges |
| `isRoleComplete(role, progress)` | Check if role path complete |
| `getRoleCompletionProgress(role, progress)` | Get completion percentage |

### usePreAssessment
**File:** `src/hooks/usePreAssessment.ts`  
**Storage Key:** `cip-academy-pre-assessment`

| Function | Purpose |
|----------|---------|
| `results` | Pre-assessment results by role |
| `hasCompletedAssessment(role)` | Check if assessment done |
| `submitAssessment(role, scores)` | Save assessment results |
| `getWeakestDomains(role, count)` | Get lowest-scoring domains |
| `getRecommendedFocus(role)` | Get recommendations |

### useScenarioProgress
**File:** `src/hooks/useScenarioProgress.ts`  
**Storage Key:** `cip-academy-scenario-progress`

| Function | Purpose |
|----------|---------|
| `progress` | Scenario progress by role |
| `isScenarioComplete(role)` | Check if scenario finished |
| `updateScenarioProgress(role, nodeId, path)` | Update current progress |
| `completeScenario(role, path, outcome)` | Mark scenario complete |
| `resetScenario(role)` | Reset scenario for replay |

### useReflectionNotes
**File:** `src/hooks/useReflectionNotes.ts`  
**Storage Key:** `cip-academy-reflection-notes`

| Function | Purpose |
|----------|---------|
| `notes` | All reflection notes |
| `getNote(role, type, id)` | Get specific note |
| `saveNote(role, type, id, text)` | Save/update note |
| `deleteNote(role, type, id)` | Remove note |

### useProgressBackup
**File:** `src/hooks/useProgressBackup.ts`

| Function | Purpose |
|----------|---------|
| `exportProgress()` | Create backup object |
| `downloadBackup()` | Trigger JSON download |
| `validateBackup(data)` | Validate import file |
| `restoreProgress(backup)` | Restore from backup |
| `getBackupSummary(backup)` | Get import preview |

---

## Components

### Layout Components

#### Layout (`src/components/layout/Layout.tsx`)
Main wrapper providing consistent structure:
- Navbar at top
- MyRoleBar below navbar
- Main content area
- Footer at bottom

#### Navbar (`src/components/layout/Navbar.tsx`)
Primary navigation with:
- Logo/brand link
- Main nav links (Home, Learning Path, Modules, Role Training, Evidence Lab)
- Dropdown "More" menu (Resources, Self-Assessment, Case Studies, Audit Simulator, Readiness Plan, Final Exam, Achievements, Progress Backup, Manager Guide)
- Mobile hamburger menu

#### MyRoleBar (`src/components/MyRoleBar.tsx`)
Persistent role indicator:
- Shows current selected role
- Quick access to change role
- Experience level badge

### Feature Components

#### BadgeDisplay (`src/components/BadgeDisplay.tsx`)
Shows earned and locked badges:
- Icon display with Lucide icons
- Earned vs locked visual states
- Tooltip descriptions
- Grid layout

#### PreAssessment (`src/components/PreAssessment.tsx`)
Pre-assessment quiz interface:
- Question display with multiple choice
- Domain tracking
- Score calculation
- Results summary with recommendations

#### RoleScenarioPlayer (`src/components/RoleScenarioPlayer.tsx`)
Branching scenario interface:
- Intro display
- Node navigation
- Choice buttons
- Ending summary with outcome type
- Related module links

#### ReflectionPanel (`src/components/ReflectionPanel.tsx`)
Reflection notes interface:
- Prompt display
- Textarea for notes
- Auto-save functionality
- Last saved timestamp

#### SampleArtifact (`src/components/SampleArtifact.tsx`)
Artifact display component:
- Title and CIP standard
- Context explanation
- Table/snippet rendering
- Before/after comparison support
- Strengths highlighting

#### PitfallsSection (`src/components/PitfallsSection.tsx`)
Pitfalls and red flags display:
- Common pitfalls card
- Audit red flags card
- Role-specific content

#### TrainingPlanGenerator (`src/components/TrainingPlanGenerator.tsx`)
Training plan wizard:
- Time horizon selection (30/60/90 days)
- Risk area focus selection
- Generated plan output
- Copy to clipboard

#### MissionCard (`src/components/MissionCard.tsx`)
Mission display card:
- Mission title and description
- Step list with checkboxes
- Completion status
- Related module links

#### InteractiveChecklist (`src/components/InteractiveChecklist.tsx`)
Phase step checklist:
- Checkbox items
- Completion tracking
- Visual progress indicator

---

## Pages & Routing

### Route Configuration (`src/App.tsx`)

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/learning-path" element={<LearningPath />} />
  <Route path="/modules" element={<Modules />} />
  <Route path="/role-training" element={<RoleTraining />} />
  <Route path="/role-training/:roleId" element={<RoleTrainingDetail />} />
  <Route path="/role-training/:roleId/certificate" element={<RoleCertificate />} />
  <Route path="/evidence-lab" element={<EvidenceLab />} />
  <Route path="/self-assessment" element={<SelfAssessment />} />
  <Route path="/resources" element={<Resources />} />
  <Route path="/about" element={<AboutContact />} />
  <Route path="/case-studies" element={<CaseStudies />} />
  <Route path="/audit-simulator" element={<AuditSimulator />} />
  <Route path="/readiness-plan" element={<ReadinessPlan />} />
  <Route path="/final-exam" element={<FinalExam />} />
  <Route path="/certificate" element={<Certificate />} />
  <Route path="/achievements" element={<Achievements />} />
  <Route path="/progress-backup" element={<ProgressBackup />} />
  <Route path="/manager-guide" element={<ManagerGuide />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Page Descriptions

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Landing page with overview and quick links |
| Learning Path | `/learning-path` | Visual learning path with track options |
| Modules | `/modules` | All 10 modules with role recommendations |
| Role Training | `/role-training` | Role selection cards |
| Role Training Detail | `/role-training/:roleId` | Full role dashboard with phases, missions, scenarios |
| Role Certificate | `/role-training/:roleId/certificate` | Role completion certificate |
| Evidence Lab | `/evidence-lab` | Evidence organization exercises and artifacts |
| Self Assessment | `/self-assessment` | Diagnostic self-assessment tool |
| Resources | `/resources` | External resources and references |
| About | `/about` | About the academy |
| Case Studies | `/case-studies` | Realistic compliance scenarios |
| Audit Simulator | `/audit-simulator` | Audit request generator |
| Readiness Plan | `/readiness-plan` | Readiness plan builder |
| Final Exam | `/final-exam` | Comprehensive final assessment |
| Certificate | `/certificate` | Global completion certificate |
| Achievements | `/achievements` | Badge overview across all roles |
| Progress Backup | `/progress-backup` | Export/import progress |
| Manager Guide | `/manager-guide` | Team training administration guide |

---

## Design System

### CSS Variables (`src/index.css`)

```css
:root {
  /* Core Colors */
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  
  /* Card Surfaces */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  /* Primary Brand */
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  
  /* Secondary */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  
  /* Muted */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  
  /* Accent */
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  
  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;
  
  /* Border & Input */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;
  
  /* Radius */
  --radius: 0.5rem;
  
  /* CIP Academy Specific */
  --navy: 222 47% 20%;
  --teal: 173 58% 39%;
  --sky: 199 89% 48%;
  --amber: 38 92% 50%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
}
```

### Tailwind Configuration (`tailwind.config.ts`)

Key extensions:
- Custom colors mapped to CSS variables
- Animation keyframes (accordion, fade-in, etc.)
- Custom font families
- Responsive breakpoints

### Component Styling Guidelines

1. **Use semantic tokens:** `bg-background`, `text-foreground`, `border-border`
2. **Use HSL colors:** All colors defined as HSL for consistency
3. **Avoid hardcoded colors:** Never use `text-white`, `bg-black` directly
4. **Use shadcn variants:** Leverage existing button, card, badge variants
5. **Responsive design:** Mobile-first with proper breakpoints

---

## LocalStorage Schema

### Storage Keys

| Key | Purpose | Type |
|-----|---------|------|
| `cip-academy-preferences` | User role, experience, onboarding status | UserPreferences |
| `cip-academy-progress` | Module completion status | Record<number, boolean> |
| `cip-academy-role-progress` | Per-role steps, missions, badges | RoleProgress |
| `cip-academy-pre-assessment` | Pre-assessment results by role | PreAssessmentResults |
| `cip-academy-scenario-progress` | Scenario completion by role | ScenarioProgress |
| `cip-academy-reflection-notes` | Reflection notes | ReflectionNotesStore |

### Data Structures

#### cip-academy-preferences
```json
{
  "role": "compliance",
  "experience": "some",
  "onboardingComplete": true,
  "firstName": "Jane"
}
```

#### cip-academy-role-progress
```json
{
  "compliance": {
    "stepsCompleted": ["phase1_step1", "phase1_step2"],
    "missionsCompleted": ["mission1"],
    "modulesCompleted": [1, 3],
    "badges": ["scope_navigator"],
    "scenarioCompleted": true
  }
}
```

#### cip-academy-pre-assessment
```json
{
  "compliance": {
    "completedAt": "2024-01-15T10:30:00Z",
    "domainScores": {
      "scope_assets": 80,
      "training_people": 60,
      "technical_controls": 70,
      "incidents_recovery": 50,
      "evidence_audit": 90
    }
  }
}
```

#### cip-academy-reflection-notes
```json
{
  "compliance:module:1": {
    "updatedAt": "2024-01-15T10:30:00Z",
    "text": "Need to review our asset inventory process..."
  }
}
```

---

## Role-Based System

### Role Definitions

| Role Key | Label | Focus Areas |
|----------|-------|-------------|
| `compliance` | Compliance / Risk Manager | Governance, policies, audit prep |
| `it-ot` | IT / OT Engineer | Technical controls, patching, security |
| `physical-security` | Physical Security | Access control, monitoring, PSP |
| `hr-training` | HR / Training | Personnel, training records, PRA |
| `leadership` | Leadership | Oversight, risk management, budget |
| `other` | Other | Mixed/general responsibilities |

### Role-Module Mapping

```typescript
const roleModules = {
  'compliance': [1, 3, 7, 9, 10],
  'it-ot': [1, 2, 5, 6, 7, 8],
  'physical-security': [1, 2, 5, 7],
  'hr-training': [1, 3, 4],
  'leadership': [1, 3, 10],
  'other': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};
```

### Training Phases

Each role has 4 phases defined in `roleTrainingData.ts`:

1. **Phase 1: Get Oriented**
   - Foundations modules
   - Understanding role responsibilities
   - Initial assessments

2. **Phase 2: Master Your Controls**
   - Technical deep dives
   - Control-specific training
   - Hands-on exercises

3. **Phase 3: Evidence & Audit Prep**
   - Evidence organization
   - Documentation practices
   - Audit simulation

4. **Phase 4: Lead & Improve**
   - Advanced topics
   - Continuous improvement
   - Leadership skills

---

## Progress Tracking

### Module Progress
- Tracked in `cip-academy-progress`
- Boolean completion per module ID
- Updated when quiz passed

### Role Progress
- Tracked in `cip-academy-role-progress`
- Per-role data structure containing:
  - `stepsCompleted`: Array of completed step IDs
  - `missionsCompleted`: Array of completed mission IDs
  - `modulesCompleted`: Array of completed module IDs
  - `badges`: Array of earned badge IDs
  - `scenarioCompleted`: Boolean

### Progress Calculation

```typescript
// Role completion percentage
function getRoleCompletionProgress(role, progress) {
  const requirements = roleCompletionRequirements[role];
  const stepsComplete = requirements.requiredSteps.filter(
    step => progress.stepsCompleted?.includes(step)
  ).length;
  const missionsComplete = Math.min(
    progress.missionsCompleted?.length || 0,
    requirements.minimumMissions
  );
  const modulesComplete = requirements.requiredModules.filter(
    mod => progress.modulesCompleted?.includes(mod)
  ).length;
  
  const total = requirements.requiredSteps.length + 
                requirements.minimumMissions + 
                requirements.requiredModules.length;
  const completed = stepsComplete + missionsComplete + modulesComplete;
  
  return Math.round((completed / total) * 100);
}
```

---

## Achievement Badges

### Badge Definitions

| Badge ID | Name | Criteria |
|----------|------|----------|
| `scope_navigator` | Scope Navigator | Complete scope/asset modules and steps |
| `evidence_architect` | Evidence Architect | Complete evidence steps and Evidence Lab |
| `patch_guardian` | Patch Guardian | Complete CIP-007 patching training |
| `incident_responder` | Incident Responder | Complete incident response modules |
| `audit_ready` | Audit Ready | Complete self-assessment, readiness plan, audit simulator |
| `role_path_complete` | Role Path Complete | All required steps and missions complete |

### Badge Evaluation Logic

```typescript
function evaluateBadgesForRole(role: string, progress: RoleProgress): BadgeId[] {
  const badges: BadgeId[] = [];
  
  // Scope Navigator: Complete scope-related steps
  if (progress.stepsCompleted?.includes('phase1_scope') && 
      progress.modulesCompleted?.includes(2)) {
    badges.push('scope_navigator');
  }
  
  // Evidence Architect: Complete evidence organization
  if (progress.stepsCompleted?.includes('phase3_evidence') && 
      progress.missionsCompleted?.some(m => m.includes('evidence'))) {
    badges.push('evidence_architect');
  }
  
  // Patch Guardian: Complete patching modules
  if (progress.modulesCompleted?.includes(6) || 
      progress.modulesCompleted?.includes(8)) {
    badges.push('patch_guardian');
  }
  
  // Incident Responder: Complete incident modules
  if (progress.modulesCompleted?.includes(7)) {
    badges.push('incident_responder');
  }
  
  // Audit Ready: Complete all audit prep tools
  if (progress.stepsCompleted?.includes('self_assessment') &&
      progress.stepsCompleted?.includes('readiness_plan') &&
      progress.stepsCompleted?.includes('audit_simulator')) {
    badges.push('audit_ready');
  }
  
  // Role Path Complete: All requirements met
  if (isRoleComplete(role, progress)) {
    badges.push('role_path_complete');
  }
  
  return [...new Set(badges)]; // Deduplicate
}
```

---

## Pre-Assessment System

### Domain Structure

| Domain | Focus | Related Modules |
|--------|-------|-----------------|
| `scope_assets` | Asset identification, BES Cyber Systems | 1, 2 |
| `training_people` | Personnel, access, training records | 3, 4 |
| `technical_controls` | Patching, security, configurations | 5, 6, 8 |
| `incidents_recovery` | Incident response, recovery plans | 7 |
| `evidence_audit` | Documentation, audit preparation | 9, 10 |

### Question Format

```typescript
{
  id: 'scope_1',
  domain: 'scope_assets',
  question: 'Which of the following is required when determining BES Cyber System categorization?',
  options: [
    { id: 'a', text: 'Only considering systems directly connected to BES', correct: false },
    { id: 'b', text: 'Applying the 15-minute impact criterion', correct: true },
    { id: 'c', text: 'Including all IT systems in the organization', correct: false },
    { id: 'd', text: 'Excluding EACMS from consideration', correct: false }
  ],
  explanation: 'The 15-minute adverse impact criterion is central to determining High and Medium impact BES Cyber Systems under CIP-002.'
}
```

### Scoring & Recommendations

- **Score Calculation:** (correct answers in domain / total domain questions) × 100
- **Weakest Domains:** Domains scoring below 60% flagged for focus
- **Recommendations:** Map weak domains to specific modules and phases

---

## Branching Scenarios

### Scenario Structure

```typescript
const complianceScenario: RoleScenario = {
  roleKey: 'compliance',
  name: 'Surprise CIP Audit Request',
  intro: 'You receive an email Friday afternoon: the regional auditor has scheduled a CIP compliance review for next month...',
  nodes: [
    {
      id: 'start',
      title: 'The Notification',
      description: 'The audit scope includes CIP-002, CIP-004, CIP-005, and CIP-007...',
      choices: [
        { id: 'a', label: 'Immediately notify leadership and form a response team', nextNodeId: 'team_formed' },
        { id: 'b', label: 'Start gathering evidence on your own first', nextNodeId: 'solo_effort' },
        { id: 'c', label: 'Wait until Monday to assess the situation', nextNodeId: 'delayed_response' }
      ]
    },
    {
      id: 'team_formed',
      title: 'Response Team Assembled',
      description: 'Leadership approves forming a cross-functional team...',
      choices: [/* ... */]
    },
    {
      id: 'good_ending',
      title: 'Audit Complete',
      description: 'The audit concludes with minimal findings...',
      isEnding: true,
      endingSummary: 'Your proactive approach and team coordination resulted in a successful audit.',
      outcomeType: 'good',
      relatedModules: [7, 10]
    }
  ]
};
```

### Scenario Themes by Role

| Role | Scenario Theme |
|------|----------------|
| Compliance | Surprise CIP audit request week |
| IT/OT | Emergency security patch with system impact risk |
| Physical Security | Suspicious badge activity at a PSP |
| HR/Training | Onboarding new remote-access staff under time pressure |
| Leadership | Board wants a CIP risk update after a regional incident |

---

## Certificates

### Role Completion Certificate

**Unlock Criteria:**
- All required steps completed
- Minimum missions completed (typically 3)
- Required modules completed

**Certificate Content:**
- Academy name and logo
- Role name (e.g., "Compliance / Risk Manager Track")
- Learner name (user-entered)
- Completion date
- List of competencies demonstrated
- Disclaimer about informal training status

### Print Styling

```css
@media print {
  .no-print { display: none; }
  .certificate-content {
    max-width: 100%;
    margin: 0;
    padding: 2rem;
    border: 2px solid #1e3a5f;
  }
}
```

---

## Sample Artifacts

### Artifact Types

| Type | Content | Used In |
|------|---------|---------|
| Training Matrix | Role × Training × Status table | Module 4, Evidence Lab |
| Patch Report | Patch details with BES categorization | Module 6, Evidence Lab |
| Incident Report | Incident summary with key fields | Module 7, Evidence Lab |
| Evidence Inventory | Control × Evidence × Owner table | Evidence Lab |

### Before/After Examples

**Before (Weak):**
```
Training done for Jim and Sarah in March.
```

**After (Strong):**
```
| Employee | Training | Date | Status | Next Due |
|----------|----------|------|--------|----------|
| Jim Smith | CIP-004 PRA | 2024-03-15 | Complete | 2025-03-15 |
| Sarah Jones | CIP-004 PRA | 2024-03-15 | Complete | 2025-03-15 |
```

---

## Reflection System

### Reflection Contexts

| Context Type | Locations |
|--------------|-----------|
| `module` | Within module content |
| `mission` | After mission description |
| `scenario` | After scenario completion |

### Prompt Examples

```typescript
const reflectionPrompts = {
  compliance: {
    module: [
      'What is the biggest gap you see in your current compliance practice?',
      'What would be hardest to prove to an auditor today?',
      'What is one concrete change you could make in the next 30 days?'
    ],
    mission: [
      'How does this mission apply to your actual work environment?',
      'What resources would you need to complete this in real life?'
    ]
  }
};
```

### Storage Format

```json
{
  "compliance:module:3": {
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "text": "Our biggest gap is the lack of centralized evidence repository..."
  }
}
```

---

## Progress Backup

### Export Format

```json
{
  "version": "1.0",
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "selectedRole": "compliance",
  "roleProgress": { /* ... */ },
  "moduleProgress": { /* ... */ },
  "reflectionNotes": { /* ... */ },
  "scenarioProgress": { /* ... */ },
  "preAssessment": { /* ... */ }
}
```

### Import Validation

1. Check JSON parse success
2. Verify `version` field exists
3. Verify it's an object (not array)
4. Show preview summary before restore
5. Confirm user wants to overwrite

### Backup Summary Display

```typescript
function getBackupSummary(backup: ProgressBackup) {
  return {
    exportDate: backup.exportedAt,
    hasRoleProgress: !!backup.roleProgress,
    hasModuleProgress: !!backup.moduleProgress,
    hasReflectionNotes: !!backup.reflectionNotes,
    hasScenarioProgress: !!backup.scenarioProgress,
    hasPreAssessment: !!backup.preAssessment,
    rolesPresent: Object.keys(backup.roleProgress || {})
  };
}
```

---

## Deployment Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isGitHubPages = env.GITHUB_PAGES === 'true' || process.env.GITHUB_PAGES === 'true';
  
  return {
    base: isGitHubPages ? "/cip-audit-ready/" : "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
```

### GitHub Pages SPA Support

**public/404.html** handles client-side routing:
```html
<script>
  // Redirect 404s to index.html with path preserved
  var pathSegmentsToKeep = 1;
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>
```

### BrowserRouter Base Path

```typescript
<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
```

---

## Module Content Structure

### 10 Modules Overview

| # | Title | CIP Standards | Key Topics |
|---|-------|---------------|------------|
| 1 | Foundations of NERC and CIP | Overview | NERC structure, CIP purpose, compliance framework |
| 2 | Asset Identification & Scope | CIP-002 | BES Cyber Systems, impact ratings, scope determination |
| 3 | Governance & Program Management | CIP-003 | Policies, procedures, roles, program structure |
| 4 | People & Training | CIP-004 | Personnel risk assessment, training, access management |
| 5 | Electronic & Physical Perimeters | CIP-005, CIP-006 | ESP, PSP, access control, monitoring |
| 6 | System Security & Patching | CIP-007 | Ports/services, patching, malware, logging |
| 7 | Incident Response & Recovery | CIP-008, CIP-009 | Response plans, testing, recovery procedures |
| 8 | Configuration & Vulnerability Management | CIP-010 | Baselines, change management, vulnerability assessments |
| 9 | Information Protection & Supply Chain | CIP-011, CIP-013 | BES Cyber System Information, vendor management |
| 10 | Audit Simulation & Continuous Improvement | Audit Prep | Mock audits, evidence review, continuous improvement |

---

## Diagram Components

### Available Diagrams

| Component | File | Purpose |
|-----------|------|---------|
| ESPPSPDiagram | `src/components/diagrams/ESPPSPDiagram.tsx` | Electronic/Physical Security Perimeter visual |
| IncidentResponseDiagram | `src/components/diagrams/IncidentResponseDiagram.tsx` | Incident response flow |
| PatchManagementDiagram | `src/components/diagrams/PatchManagementDiagram.tsx` | Patch lifecycle visual |
| TrainingMatrixDiagram | `src/components/diagrams/TrainingMatrixDiagram.tsx` | Training requirements matrix |

---

## Testing & Quality

### Manual Testing Checklist

- [ ] Role selection persists across sessions
- [ ] Module completion saves to localStorage
- [ ] Pre-assessment scores calculate correctly
- [ ] Scenarios branch properly to endings
- [ ] Badges award when criteria met
- [ ] Certificates unlock at correct completion
- [ ] Progress export generates valid JSON
- [ ] Progress import restores all data
- [ ] Reflection notes auto-save
- [ ] Mobile navigation works
- [ ] Print styling renders correctly

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Future Enhancement Ideas

1. **Module Detail Pages:** Individual pages for each module with full content
2. **Offline Support:** Service worker for offline access
3. **Team Progress Dashboard:** Aggregate view for managers
4. **Notification Toasts:** Real-time badge unlock celebrations
5. **Spaced Repetition:** Review scheduling for retention
6. **Assessment Analytics:** Detailed domain weakness trends
7. **Custom Scenarios:** User-created branching scenarios
8. **Evidence Templates:** Downloadable document templates

---

## Changelog

### Version 1.0 (Initial Release)
- Core role-based training system
- 10 module structure
- Progress tracking with localStorage
- Role selector and MyRoleBar

### Version 1.1
- Added Achievement Badges system
- Added Progress Export/Import
- Added Role Completion Certificates

### Version 1.2
- Added Pre-Assessment with adaptive recommendations
- Added Branching Scenarios per role
- Added Sample Artifacts with before/after examples
- Added Reflection Panels with auto-save
- Added Common Pitfalls & Audit Red Flags
- Added Manager/Team Guide page
- Extended Progress Backup to include new data types

### Version 1.3 (November 2025)
- **New Pages:**
  - `/nerc-cip-101` - NERC CIP 101 foundational overview with all 13 CIP standards
  - `/audit-journey` - Complete 90-day audit timeline with phases, tips, and interview best practices
  - `/soft-skills` - Auditor etiquette training with interactive practice scenarios
  - `/scope-matrix` - Interactive BES Cyber Asset classification tool and TCA handling guidance
- **Global Search:** Site-wide search (Cmd+K) for modules, pages, glossary terms
- **Excel Downloads:** Templates now available in both PDF and Excel formats (xlsx package)
- **Updated External Links:** Current NERC Standards Library, FERC CIP Orders, Compliance Guidance
- **Content Version Tracking:** Resources page shows last updated date and verification status
- **Navigation Updates:** 
  - CIP 101 and Audit Journey added to main navigation
  - Soft Skills, Scope Matrix added to More dropdown
- **Fixed Broken Links:** Footer links to NERC CIP 101, Audit Journey, and Templates now work
- **Expanded Module Content:**
  - **Module 3 (CIP-003):** Added CIP-003-9 low-impact BES Cyber System requirements including TCA management, password controls, and patching for low-impact devices
  - **Module 7 (CIP-008/CIP-009):** Expanded with ES-ISAC reporting timelines, notification evidence requirements, incident classification criteria, lessons learned documentation, backup verification
  - **Module 9 (CIP-011/CIP-013):** Added CIP-013-2 EACMS and PACS coverage, third-party remote access security, software integrity verification
  - **New Module 11 (CIP-012):** Control Center Communications - Real-time data protection, ICCP security, encryption methods
  - **New Module 12 (CIP-014):** Physical Security of Transmission Assets - Risk assessments, threat evaluations, physical security plans, third-party reviews

---

## New Pages Detail (v1.3)

### NERC CIP 101 (`/nerc-cip-101`)
**File:** `src/pages/NercCip101.tsx`

Overview page introducing NERC CIP fundamentals:
- Why NERC CIP matters (penalties, grid protection)
- Key terminology (BES, ESP, PSP, EACMS, PACS, BCSI, etc.)
- All 13 CIP standards with descriptions and module links
- Compliance framework (NERC → Regional Entities → Registered Entities)

### Audit Journey (`/audit-journey`)
**File:** `src/pages/AuditJourney.tsx`

Complete audit timeline covering:
- **90-Day Notice** - Receiving notification, initial steps
- **Pre-Audit Information Request** - Evidence compilation (Days 1-30)
- **Internal Preparation** - Mock audits, SME training (Days 30-75)
- **Pre-Audit Conference Call** - Logistics coordination (Days 75-80)
- **Audit Week(s)** - On-site activities, interviews (Days 80-90)
- **Post-Audit Activities** - Findings, mitigation, closeout (Days 90+)

Also includes:
- Interview best practices ("I don't know" protocol)
- Sample interview dialogues (good vs. poor responses)

### Soft Skills Training (`/soft-skills`)
**File:** `src/pages/SoftSkillsTraining.tsx`

Auditor etiquette training featuring:
- Core interview principles (answer only what's asked, defer appropriately)
- Interactive practice scenarios with CIP-specific questions
- Compare good vs. poor responses with explanations
- Script examples for common situations

### Scope Matrix & TCA (`/scope-matrix`)
**File:** `src/pages/ScopeMatrix.tsx`

Asset scoping tool with:
- Interactive questionnaire for BES Cyber Asset determination
- Impact rating guidance (High/Medium/Low)
- Comprehensive TCA (Transient Cyber Asset) handling guidance
- USB drive and maintenance laptop requirements
- Best practices checklist

### Global Search Component
**File:** `src/components/GlobalSearch.tsx`

Site-wide search using shadcn Command component:
- Keyboard shortcut: ⌘K / Ctrl+K
- Searches modules, pages, role training, glossary terms
- Categorized results with icons
- Direct navigation on selection

### Excel Templates
**File:** `src/utils/excelTemplates.ts`

Downloadable Excel templates using xlsx library:
- Evidence Inventory Spreadsheet
- Training Matrix
- Patch Assessment Tracker (with Legend sheet)
- Access Review Documentation

---

## Contact & Support

**Repository:** https://github.com/mmacri/cip-audit-ready  
**Live Site:** https://mmacri.github.io/cip-audit-ready/

---

## Changelog

### November 2025 - CMEP Audit Readiness Enhancements

**New Page: RSAW Tutorial (`/rsaw-tutorial`)**
- Complete RSAW walkthrough with section-by-section guidance
- Sample responses comparing good vs. poor RSAW narratives
- Evidence naming conventions and best practices
- Common pitfalls to avoid

**Enhanced Global Search**
- Module deep links now navigate directly to specific modules (e.g., `/modules#module-11`)
- Added Modules 11 & 12 to search index with CIP-012/CIP-014 keywords
- Added RSAW tutorial and Manager Guide to search results
- Enhanced keyword coverage for CIP-003-9, CIP-013-2, EACMS, PACS

**Audit Journey Enhancements**
- Added downloadable checklists section for CIP-012, CIP-014, and RSAW
- Links to relevant modules and tutorials

**Footer & Navigation Updates**
- Added Auditor Etiquette link to Quick Links
- Added Manager Guide link to Resources section

**Mobile Responsiveness**
- Added responsive text utilities in CSS
- Touch-friendly button sizing for mobile
- Responsive section padding and grid gaps

### November 2025 - Module 11 & 12 Role Integration

**Module 11 (CIP-012 - Control Center Communications)** integrated into:
- **IT/OT Engineer** (Phase 2: Deep Dives) - Primary technical responsibility for securing real-time data links
- **Compliance/Risk Manager** (Phase 2: Deep Dives) - Understand scope, risk, and documentation requirements
- **Leadership** (Phase 2: Deep Dives) - Understand resource allocation and oversight requirements

**Module 12 (CIP-014 - Physical Security of Transmission Assets)** integrated into:
- **Physical Security** (Phase 2: Deep Dives) - Primary responsibility after Module 5 (CIP-006)
- **Compliance/Risk Manager** (Phase 2: Deep Dives) - Programmatic duties and third-party review requirements
- **Leadership** (Phase 2: Deep Dives) - Third-party review and mitigation obligations oversight

**HR/Training** role does not include Module 11 or 12 unless staff are cross-trained on network operations or physical security assessments.

Files modified:
- `src/data/roleTrainingData.ts` - Added moduleNames entries, updated role phases
- `src/hooks/useUserPreferences.ts` - Updated roleModules mapping
- `src/types/progressTypes.ts` - Updated roleCompletionRequirements
- `src/pages/LearningPath.tsx` - Updated track role module listings

---

## Changelog - November 2025 Visual Learning Update

### Visual Timeline & Diagrams Added

**Interactive Audit Timeline Flowchart** (`src/components/AuditTimelineFlowchart.tsx`)
- Clickable 6-stage audit lifecycle visualization
- Stage details with tasks, due dates, and pro tips
- Navigation between stages
- Integrated into Audit Journey page

**New Visual Diagrams:**
- `CIPStandardsRelationshipDiagram.tsx` - Shows how CIP standards build upon each other (added to CIP 101 page)
- `EvidenceOrganizationDiagram.tsx` - Visual guide for evidence folder structure and naming (added to Evidence Lab)
- `AuditPreparationDiagram.tsx` - 90-day audit workflow visualization

**Audit Journey Enhancements:**
- Added interactive flowchart section
- Tabbed view (Timeline View / Checklist View)
- Printable checklist format for audit preparation
- Fade-in animations on timeline items

**Other Updates:**
- Enhanced GlobalSearch with CIP requirement autocomplete (e.g., "CIP-007 R2")
- Added TCA checklist templates (PDF/Excel)
- Added Supply Chain questionnaire template
- Added CIP-014 Risk Assessment template
- Centralized NERC URLs in `src/config/nercUrls.ts`
- Mobile responsiveness CSS utilities in index.css
- Entrance/Exit meeting guidance in Soft Skills Training
- SME Interview Checklist (Before/During/After)

---

*This documentation was last updated November 2025 based on the complete codebase analysis of CIP Readiness Academy.*
