import { UserRole } from '@/hooks/useUserPreferences';

export interface RoleTask {
  id: string;
  label: string;
  moduleLink?: number;
  toolLink?: string;
}

export interface RolePhase {
  id: string;
  name: string;
  description: string;
  modules: { id: number; name: string; required: boolean }[];
  tasks: RoleTask[];
}

export interface TimeHorizon {
  id: string;
  name: string;
  tasks: RoleTask[];
}

export interface RoleTrainingPlan {
  id: UserRole;
  title: string;
  overview: string;
  accountability: string;
  phases: RolePhase[];
  timeHorizons: TimeHorizon[];
  keyTools: { name: string; link: string; description: string }[];
  riskAreas: string[];
}

export const moduleNames: Record<number, string> = {
  1: "Foundations of NERC and CIP",
  2: "Asset Identification & Scope",
  3: "Governance & Program Management",
  4: "People & Training",
  5: "Electronic & Physical Perimeters",
  6: "System Security & Patching",
  7: "Incident Response & Recovery",
  8: "Configuration & Vulnerability Management",
  9: "Information Protection & Supply Chain",
  10: "Audit Simulation & Continuous Improvement"
};

export const roleTrainingPlans: Record<UserRole, RoleTrainingPlan> = {
  compliance: {
    id: 'compliance',
    title: 'Compliance / Risk Manager',
    overview: 'As a Compliance Manager, you are the central coordinator for all NERC CIP activities. You maintain the overall compliance program, ensure evidence is collected and organized, track deadlines, manage corrective actions, and serve as the primary liaison with auditors and regional entities.',
    accountability: 'You are accountable for program-level compliance, ensuring all requirements are assigned, tracked, and documented. You coordinate across departments, manage the evidence repository, and lead audit preparation activities. Your role requires understanding all CIP standards at a program level while relying on subject matter experts for technical implementation details.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Build your foundational understanding of NERC CIP and your compliance program structure.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 3, name: moduleNames[3], required: true },
        ],
        tasks: [
          { id: 'comp-p1-1', label: 'Complete Module 1 and document the CIP standards applicable to your registration', moduleLink: 1 },
          { id: 'comp-p1-2', label: 'Complete Module 3 and review your existing CIP policies for gaps', moduleLink: 3 },
          { id: 'comp-p1-3', label: 'Identify your CIP Senior Manager and verify delegation documentation is current' },
          { id: 'comp-p1-4', label: 'Create or update your compliance calendar with all recurring requirements' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Develop deeper knowledge of key compliance areas and evidence management.',
        modules: [
          { id: 7, name: moduleNames[7], required: true },
          { id: 9, name: moduleNames[9], required: true },
        ],
        tasks: [
          { id: 'comp-p2-1', label: 'Complete Module 7 and review your incident response plan documentation', moduleLink: 7 },
          { id: 'comp-p2-2', label: 'Complete Module 9 and audit your BES Cyber System Information protection practices', moduleLink: 9 },
          { id: 'comp-p2-3', label: 'Use the Evidence Lab to map evidence to CIP-003 and CIP-004 requirements', toolLink: '/evidence-lab' },
          { id: 'comp-p2-4', label: 'Review supply chain risk management documentation with procurement' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Practice audit scenarios and refine your evidence presentation skills.',
        modules: [
          { id: 10, name: moduleNames[10], required: true },
        ],
        tasks: [
          { id: 'comp-p3-1', label: 'Complete Module 10 and conduct an internal mock audit', moduleLink: 10 },
          { id: 'comp-p3-2', label: 'Run the Audit Request Simulator with all standards you are registered for', toolLink: '/audit-simulator' },
          { id: 'comp-p3-3', label: 'Practice explaining your compliance program to a colleague as if they were an auditor' },
          { id: 'comp-p3-4', label: 'Create a one-page audit readiness summary for leadership' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Lead compliance improvements and mentor others in the organization.',
        modules: [],
        tasks: [
          { id: 'comp-p4-1', label: 'Build your Readiness Plan using the Readiness Plan Builder', toolLink: '/readiness-plan' },
          { id: 'comp-p4-2', label: 'Establish a quarterly compliance review meeting with all stakeholders' },
          { id: 'comp-p4-3', label: 'Create a lessons-learned document from your last audit or assessment' },
          { id: 'comp-p4-4', label: 'Mentor a new team member on CIP compliance basics' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'comp-30-1', label: 'Complete Modules 1 and 3 to understand the CIP landscape', moduleLink: 1 },
          { id: 'comp-30-2', label: 'Review your current compliance calendar and evidence repository' },
          { id: 'comp-30-3', label: 'Meet with each department head to understand their CIP responsibilities' },
          { id: 'comp-30-4', label: 'Identify the top 3 compliance risks or gaps' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'comp-60-1', label: 'Complete Modules 7, 9, and 10', moduleLink: 7 },
          { id: 'comp-60-2', label: 'Conduct a gap analysis using the Self-Assessment tool', toolLink: '/self-assessment' },
          { id: 'comp-60-3', label: 'Run the Audit Simulator and practice evidence retrieval', toolLink: '/audit-simulator' },
          { id: 'comp-60-4', label: 'Update or create standard operating procedures for evidence collection' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'comp-ong-1', label: 'Review compliance status weekly with evidence collection teams' },
          { id: 'comp-ong-2', label: 'Monitor regulatory updates and assess impacts monthly' },
          { id: 'comp-ong-3', label: 'Prepare quarterly compliance reports for leadership' },
          { id: 'comp-ong-4', label: 'Conduct internal spot-checks on evidence quality' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'comp-pre-1', label: 'Conduct a comprehensive internal mock audit' },
          { id: 'comp-pre-2', label: 'Verify all evidence is complete, properly named, and accessible' },
          { id: 'comp-pre-3', label: 'Brief all stakeholders on audit logistics and expectations' },
          { id: 'comp-pre-4', label: 'Prepare an audit response team roster with contact information' },
          { id: 'comp-pre-5', label: 'Create an audit room setup checklist and test evidence retrieval' },
        ],
      },
    ],
    keyTools: [
      { name: 'Evidence Lab', link: '/evidence-lab', description: 'Map and organize your compliance evidence' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Practice responding to audit requests' },
      { name: 'Self-Assessment', link: '/self-assessment', description: 'Evaluate your compliance readiness' },
      { name: 'Readiness Plan', link: '/readiness-plan', description: 'Build your action plan' },
    ],
    riskAreas: ['Scope & Asset Clarity', 'Evidence Organization & Audit Readiness', 'Training & Personnel', 'Technical Controls & Patching', 'Incident Response & Recovery'],
  },

  'it-ot': {
    id: 'it-ot',
    title: 'IT / OT Engineer',
    overview: 'As an IT/OT Engineer, you implement and maintain the technical controls required by CIP standards. This includes network security, system hardening, patch management, logging, access control, and change management for all BES Cyber Systems.',
    accountability: 'You are accountable for technical implementation of security controls, maintaining baseline configurations, managing patches within required timelines, and ensuring proper logging and monitoring. You work closely with the compliance team to provide evidence of technical controls.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Understand the CIP landscape and which systems are in scope.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 2, name: moduleNames[2], required: true },
        ],
        tasks: [
          { id: 'itot-p1-1', label: 'Complete Module 1 to understand how NERC CIP affects your systems', moduleLink: 1 },
          { id: 'itot-p1-2', label: 'Complete Module 2 and verify you know which systems are BES Cyber Systems', moduleLink: 2 },
          { id: 'itot-p1-3', label: 'Document your top 5 BES Cyber Systems with their impact ratings' },
          { id: 'itot-p1-4', label: 'Review your ESP and PSP diagrams for accuracy' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Master the technical controls required for your systems.',
        modules: [
          { id: 5, name: moduleNames[5], required: true },
          { id: 6, name: moduleNames[6], required: true },
          { id: 8, name: moduleNames[8], required: true },
        ],
        tasks: [
          { id: 'itot-p2-1', label: 'Complete Module 5 and verify all ESP access points are documented', moduleLink: 5 },
          { id: 'itot-p2-2', label: 'Complete Module 6 and review your patch management process timeline', moduleLink: 6 },
          { id: 'itot-p2-3', label: 'Complete Module 8 and verify baseline configurations are current', moduleLink: 8 },
          { id: 'itot-p2-4', label: 'Document your log review process and retention periods' },
          { id: 'itot-p2-5', label: 'Use the Evidence Lab to map evidence for CIP-007 requirements', toolLink: '/evidence-lab' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Practice presenting technical evidence and handling audit scenarios.',
        modules: [
          { id: 7, name: moduleNames[7], required: true },
        ],
        tasks: [
          { id: 'itot-p3-1', label: 'Complete Module 7 and review your incident response procedures', moduleLink: 7 },
          { id: 'itot-p3-2', label: 'Run the Audit Simulator selecting CIP-005, CIP-007, and CIP-010', toolLink: '/audit-simulator' },
          { id: 'itot-p3-3', label: 'Practice retrieving patch reports and baseline documentation quickly' },
          { id: 'itot-p3-4', label: 'Conduct a tabletop exercise for a security incident scenario' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Lead technical improvements and optimize processes.',
        modules: [],
        tasks: [
          { id: 'itot-p4-1', label: 'Automate patch tracking and reporting where possible' },
          { id: 'itot-p4-2', label: 'Create technical documentation templates for evidence collection' },
          { id: 'itot-p4-3', label: 'Build your section of the Readiness Plan', toolLink: '/readiness-plan' },
          { id: 'itot-p4-4', label: 'Train a colleague on the technical evidence they need to maintain' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'itot-30-1', label: 'Complete Modules 1 and 2 to understand scope', moduleLink: 1 },
          { id: 'itot-30-2', label: 'Identify all BES Cyber Systems you are responsible for' },
          { id: 'itot-30-3', label: 'Review current baseline configurations and patch status' },
          { id: 'itot-30-4', label: 'Understand your 35-day patch assessment timeline' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'itot-60-1', label: 'Complete Modules 5, 6, 7, and 8', moduleLink: 5 },
          { id: 'itot-60-2', label: 'Verify all ESP network diagrams are current' },
          { id: 'itot-60-3', label: 'Conduct a security log review and document findings' },
          { id: 'itot-60-4', label: 'Test your change management process end-to-end' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'itot-ong-1', label: 'Review security logs at required intervals' },
          { id: 'itot-ong-2', label: 'Assess new patches within 35 days of release' },
          { id: 'itot-ong-3', label: 'Update baseline documentation after approved changes' },
          { id: 'itot-ong-4', label: 'Test backup and recovery procedures per schedule' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'itot-pre-1', label: 'Verify all patch assessments are documented within timelines' },
          { id: 'itot-pre-2', label: 'Confirm baseline documentation matches actual configurations' },
          { id: 'itot-pre-3', label: 'Prepare a summary of all exceptions and mitigations' },
          { id: 'itot-pre-4', label: 'Practice explaining technical controls to non-technical auditors' },
        ],
      },
    ],
    keyTools: [
      { name: 'Evidence Lab', link: '/evidence-lab', description: 'Map technical evidence to requirements' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Practice technical evidence requests' },
      { name: 'Readiness Plan', link: '/readiness-plan', description: 'Document your technical readiness' },
    ],
    riskAreas: ['Technical Controls & Patching', 'Scope & Asset Clarity', 'Evidence Organization & Audit Readiness', 'Incident Response & Recovery', 'Training & Personnel'],
  },

  'physical-security': {
    id: 'physical-security',
    title: 'Physical Security',
    overview: 'As Physical Security personnel, you manage access to Physical Security Perimeters (PSPs), monitor physical access logs, maintain visitor management programs, and ensure physical protection systems are operational and tested.',
    accountability: 'You are accountable for controlling physical access to BES Cyber Systems, maintaining accurate access lists, managing visitor escorts, and testing physical access control systems. You coordinate with HR on personnel changes affecting access.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Understand CIP requirements related to physical security.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 2, name: moduleNames[2], required: true },
        ],
        tasks: [
          { id: 'phys-p1-1', label: 'Complete Module 1 to understand the CIP framework', moduleLink: 1 },
          { id: 'phys-p1-2', label: 'Complete Module 2 to understand which assets require physical protection', moduleLink: 2 },
          { id: 'phys-p1-3', label: 'Identify all PSPs in your environment and their boundaries' },
          { id: 'phys-p1-4', label: 'Review current physical access authorization lists for accuracy' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Master PSP requirements and access control procedures.',
        modules: [
          { id: 5, name: moduleNames[5], required: true },
        ],
        tasks: [
          { id: 'phys-p2-1', label: 'Complete Module 5 focusing on PSP and PACS requirements', moduleLink: 5 },
          { id: 'phys-p2-2', label: 'Document your visitor management process end-to-end' },
          { id: 'phys-p2-3', label: 'Review testing schedules for all physical access control systems' },
          { id: 'phys-p2-4', label: 'Use the Evidence Lab to map CIP-006 evidence', toolLink: '/evidence-lab' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Practice handling audit scenarios and access emergencies.',
        modules: [
          { id: 7, name: moduleNames[7], required: true },
        ],
        tasks: [
          { id: 'phys-p3-1', label: 'Complete Module 7 to understand incident response requirements', moduleLink: 7 },
          { id: 'phys-p3-2', label: 'Run the Audit Simulator selecting CIP-006', toolLink: '/audit-simulator' },
          { id: 'phys-p3-3', label: 'Practice retrieving visitor logs and access records quickly' },
          { id: 'phys-p3-4', label: 'Conduct a drill for the 24-hour access revocation process' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Lead physical security improvements.',
        modules: [],
        tasks: [
          { id: 'phys-p4-1', label: 'Implement automated alerts for access list discrepancies' },
          { id: 'phys-p4-2', label: 'Create a physical security checklist for PSP inspections' },
          { id: 'phys-p4-3', label: 'Build your section of the Readiness Plan', toolLink: '/readiness-plan' },
          { id: 'phys-p4-4', label: 'Train colleagues on visitor escort requirements' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'phys-30-1', label: 'Complete Modules 1 and 2', moduleLink: 1 },
          { id: 'phys-30-2', label: 'Tour all PSPs and verify boundary documentation' },
          { id: 'phys-30-3', label: 'Review the current authorized access list process' },
          { id: 'phys-30-4', label: 'Understand the 24-hour access revocation requirement' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'phys-60-1', label: 'Complete Modules 5 and 7', moduleLink: 5 },
          { id: 'phys-60-2', label: 'Audit a sample of visitor logs for completeness' },
          { id: 'phys-60-3', label: 'Verify PACS testing is documented and on schedule' },
          { id: 'phys-60-4', label: 'Coordinate with HR on access revocation procedures' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'phys-ong-1', label: 'Review physical access logs for anomalies' },
          { id: 'phys-ong-2', label: 'Verify PSP access lists match currently authorized personnel' },
          { id: 'phys-ong-3', label: 'Test PACS per the required schedule' },
          { id: 'phys-ong-4', label: 'Inspect PSP boundaries for unauthorized entry points' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'phys-pre-1', label: 'Verify all visitor logs are complete with required fields' },
          { id: 'phys-pre-2', label: 'Confirm PACS test documentation is current' },
          { id: 'phys-pre-3', label: 'Prepare summary of any physical security exceptions' },
          { id: 'phys-pre-4', label: 'Practice walking an auditor through a PSP tour' },
        ],
      },
    ],
    keyTools: [
      { name: 'Evidence Lab', link: '/evidence-lab', description: 'Organize physical security evidence' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Practice CIP-006 audit requests' },
      { name: 'Readiness Plan', link: '/readiness-plan', description: 'Document your security posture' },
    ],
    riskAreas: ['Scope & Asset Clarity', 'Training & Personnel', 'Evidence Organization & Audit Readiness', 'Technical Controls & Patching', 'Incident Response & Recovery'],
  },

  'hr-training': {
    id: 'hr-training',
    title: 'HR / Training',
    overview: 'As HR and Training personnel, you ensure all staff with access to BES Cyber Systems complete required training, undergo personnel risk assessments, and have access revoked appropriately when roles change or employment ends.',
    accountability: 'You are accountable for training program administration, personnel risk assessment management, and coordinating access revocations with IT and physical security teams. You maintain records that prove training completion and personnel vetting.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Understand CIP requirements related to personnel and training.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 3, name: moduleNames[3], required: true },
        ],
        tasks: [
          { id: 'hr-p1-1', label: 'Complete Module 1 to understand the CIP framework', moduleLink: 1 },
          { id: 'hr-p1-2', label: 'Complete Module 3 to understand governance requirements', moduleLink: 3 },
          { id: 'hr-p1-3', label: 'Identify all positions requiring CIP training and PRAs' },
          { id: 'hr-p1-4', label: 'Review current training materials for CIP content accuracy' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Master CIP-004 requirements for personnel and training.',
        modules: [
          { id: 4, name: moduleNames[4], required: true },
        ],
        tasks: [
          { id: 'hr-p2-1', label: 'Complete Module 4 on people and training requirements', moduleLink: 4 },
          { id: 'hr-p2-2', label: 'Document your training program curriculum and completion tracking' },
          { id: 'hr-p2-3', label: 'Review PRA procedures and 7-year background check requirements' },
          { id: 'hr-p2-4', label: 'Use the Evidence Lab to map CIP-004 evidence', toolLink: '/evidence-lab' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Practice presenting training records and handling audit scenarios.',
        modules: [],
        tasks: [
          { id: 'hr-p3-1', label: 'Run the Audit Simulator selecting CIP-004', toolLink: '/audit-simulator' },
          { id: 'hr-p3-2', label: 'Practice retrieving training records for a sample of employees' },
          { id: 'hr-p3-3', label: 'Conduct a drill for the 24-hour access revocation process' },
          { id: 'hr-p3-4', label: 'Review sample termination scenarios with IT and physical security' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Lead training program improvements.',
        modules: [],
        tasks: [
          { id: 'hr-p4-1', label: 'Implement automated training renewal reminders' },
          { id: 'hr-p4-2', label: 'Create a training completion dashboard for leadership' },
          { id: 'hr-p4-3', label: 'Build your section of the Readiness Plan', toolLink: '/readiness-plan' },
          { id: 'hr-p4-4', label: 'Train managers on their CIP training responsibilities' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'hr-30-1', label: 'Complete Modules 1, 3, and 4', moduleLink: 1 },
          { id: 'hr-30-2', label: 'Identify all personnel requiring CIP training' },
          { id: 'hr-30-3', label: 'Review training completion records and identify gaps' },
          { id: 'hr-30-4', label: 'Understand the 24-hour access revocation timeline' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'hr-60-1', label: 'Audit training records for a sample of personnel' },
          { id: 'hr-60-2', label: 'Verify PRA documentation is complete and current' },
          { id: 'hr-60-3', label: 'Establish coordination procedures with IT and physical security' },
          { id: 'hr-60-4', label: 'Create a training calendar for upcoming renewal deadlines' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'hr-ong-1', label: 'Track training completion and flag approaching deadlines' },
          { id: 'hr-ong-2', label: 'Process access revocations within 24 hours of notification' },
          { id: 'hr-ong-3', label: 'Update training materials when CIP requirements change' },
          { id: 'hr-ong-4', label: 'Coordinate with managers on training schedules' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'hr-pre-1', label: 'Verify all training records include content, dates, and completion evidence' },
          { id: 'hr-pre-2', label: 'Confirm PRA documentation is complete for all required personnel' },
          { id: 'hr-pre-3', label: 'Prepare summary of any training or PRA exceptions' },
          { id: 'hr-pre-4', label: 'Practice explaining training requirements to an auditor' },
        ],
      },
    ],
    keyTools: [
      { name: 'Evidence Lab', link: '/evidence-lab', description: 'Organize training and personnel evidence' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Practice CIP-004 audit requests' },
      { name: 'Readiness Plan', link: '/readiness-plan', description: 'Document your training program' },
    ],
    riskAreas: ['Training & Personnel', 'Evidence Organization & Audit Readiness', 'Scope & Asset Clarity', 'Technical Controls & Patching', 'Incident Response & Recovery'],
  },

  leadership: {
    id: 'leadership',
    title: 'Leadership',
    overview: 'As a leader, you provide strategic oversight for NERC CIP compliance, ensure adequate resources, designate the CIP Senior Manager, and maintain awareness of compliance status and risks that could affect the organization.',
    accountability: 'You are accountable for organizational commitment to compliance, resource allocation, CIP Senior Manager designation, and fostering a culture of security and compliance. While you delegate operational tasks, accountability for compliance cannot be delegated.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Understand the CIP landscape and leadership responsibilities.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 3, name: moduleNames[3], required: true },
        ],
        tasks: [
          { id: 'lead-p1-1', label: 'Complete Module 1 to understand CIP fundamentals', moduleLink: 1 },
          { id: 'lead-p1-2', label: 'Complete Module 3 to understand governance requirements', moduleLink: 3 },
          { id: 'lead-p1-3', label: 'Verify your CIP Senior Manager delegation is documented and current' },
          { id: 'lead-p1-4', label: 'Review the current compliance readiness score with your Compliance Manager' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Develop deeper understanding of compliance risks and audit processes.',
        modules: [
          { id: 10, name: moduleNames[10], required: true },
        ],
        tasks: [
          { id: 'lead-p2-1', label: 'Complete Module 10 on audit simulation and improvement', moduleLink: 10 },
          { id: 'lead-p2-2', label: 'Review recent audit findings and corrective actions with the compliance team' },
          { id: 'lead-p2-3', label: 'Understand the potential financial and operational impacts of non-compliance' },
          { id: 'lead-p2-4', label: 'Assess whether the compliance program has adequate budget and staffing' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Prepare for leadership involvement in audit activities.',
        modules: [],
        tasks: [
          { id: 'lead-p3-1', label: 'Participate in or observe an internal mock audit', toolLink: '/audit-simulator' },
          { id: 'lead-p3-2', label: 'Practice delivering opening remarks to an audit team' },
          { id: 'lead-p3-3', label: 'Review the compliance team\'s audit readiness summary' },
          { id: 'lead-p3-4', label: 'Understand your role in the audit entrance and exit meetings' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Champion compliance culture and drive continuous improvement.',
        modules: [],
        tasks: [
          { id: 'lead-p4-1', label: 'Communicate the importance of compliance in organizational messaging' },
          { id: 'lead-p4-2', label: 'Establish regular compliance status reviews in leadership meetings' },
          { id: 'lead-p4-3', label: 'Allocate resources to address identified compliance gaps', toolLink: '/readiness-plan' },
          { id: 'lead-p4-4', label: 'Recognize and reward compliance achievements' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'lead-30-1', label: 'Complete Modules 1 and 3', moduleLink: 1 },
          { id: 'lead-30-2', label: 'Meet with the Compliance Manager for a program overview' },
          { id: 'lead-30-3', label: 'Verify CIP Senior Manager delegation documentation' },
          { id: 'lead-30-4', label: 'Understand the current compliance status and top risks' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'lead-60-1', label: 'Complete Module 10 on audit and improvement', moduleLink: 10 },
          { id: 'lead-60-2', label: 'Review policy approval timelines (15-month review requirement)' },
          { id: 'lead-60-3', label: 'Assess resource needs with department heads' },
          { id: 'lead-60-4', label: 'Establish recurring compliance status reporting' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'lead-ong-1', label: 'Review monthly compliance status reports' },
          { id: 'lead-ong-2', label: 'Approve cyber security policies at required intervals' },
          { id: 'lead-ong-3', label: 'Stay informed about significant regulatory changes' },
          { id: 'lead-ong-4', label: 'Champion compliance culture in communications' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'lead-pre-1', label: 'Review audit readiness assessment with compliance team' },
          { id: 'lead-pre-2', label: 'Prepare leadership talking points for audit meetings' },
          { id: 'lead-pre-3', label: 'Ensure audit response team has necessary support' },
          { id: 'lead-pre-4', label: 'Confirm contingency plans for any identified gaps' },
        ],
      },
    ],
    keyTools: [
      { name: 'Self-Assessment', link: '/self-assessment', description: 'Evaluate organizational readiness' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Understand audit expectations' },
      { name: 'Readiness Plan', link: '/readiness-plan', description: 'Review the organizational action plan' },
    ],
    riskAreas: ['Scope & Asset Clarity', 'Training & Personnel', 'Evidence Organization & Audit Readiness', 'Technical Controls & Patching', 'Incident Response & Recovery'],
  },

  other: {
    id: 'other',
    title: 'General Staff',
    overview: 'Even if your role doesn\'t fall into a specific category, understanding NERC CIP helps you contribute to your organization\'s compliance posture. This path provides a broad overview of CIP requirements.',
    accountability: 'You contribute to compliance by following security policies, completing required training, and reporting security concerns. Your awareness of CIP requirements helps the organization maintain a strong compliance culture.',
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Build a foundational understanding of NERC CIP.',
        modules: [
          { id: 1, name: moduleNames[1], required: true },
          { id: 2, name: moduleNames[2], required: false },
          { id: 3, name: moduleNames[3], required: false },
        ],
        tasks: [
          { id: 'other-p1-1', label: 'Complete Module 1 to understand the CIP framework', moduleLink: 1 },
          { id: 'other-p1-2', label: 'Review Module 2 to understand asset scope', moduleLink: 2 },
          { id: 'other-p1-3', label: 'Review Module 3 to understand governance', moduleLink: 3 },
          { id: 'other-p1-4', label: 'Identify how your role relates to CIP compliance' },
        ],
      },
      {
        id: 'deep-dives',
        name: 'Phase 2: Deep Dives',
        description: 'Explore modules relevant to your specific interests.',
        modules: [
          { id: 4, name: moduleNames[4], required: false },
          { id: 5, name: moduleNames[5], required: false },
          { id: 6, name: moduleNames[6], required: false },
        ],
        tasks: [
          { id: 'other-p2-1', label: 'Complete the Self-Assessment to identify focus areas', toolLink: '/self-assessment' },
          { id: 'other-p2-2', label: 'Review modules most relevant to your work', moduleLink: 4 },
          { id: 'other-p2-3', label: 'Understand how your actions affect compliance' },
        ],
      },
      {
        id: 'practice',
        name: 'Phase 3: Practice & Audits',
        description: 'Understand audit processes and your role in them.',
        modules: [
          { id: 7, name: moduleNames[7], required: false },
          { id: 10, name: moduleNames[10], required: false },
        ],
        tasks: [
          { id: 'other-p3-1', label: 'Review Module 7 on incident response', moduleLink: 7 },
          { id: 'other-p3-2', label: 'Review Module 10 on audit processes', moduleLink: 10 },
          { id: 'other-p3-3', label: 'Run the Audit Simulator to see typical requests', toolLink: '/audit-simulator' },
        ],
      },
      {
        id: 'lead',
        name: 'Phase 4: Lead & Improve',
        description: 'Contribute to continuous improvement.',
        modules: [],
        tasks: [
          { id: 'other-p4-1', label: 'Identify one way to improve compliance in your area' },
          { id: 'other-p4-2', label: 'Share CIP awareness with colleagues' },
          { id: 'other-p4-3', label: 'Complete the Final Exam to test your knowledge', toolLink: '/final-exam' },
        ],
      },
    ],
    timeHorizons: [
      {
        id: 'first-30',
        name: 'First 30 Days',
        tasks: [
          { id: 'other-30-1', label: 'Complete Module 1 for CIP overview', moduleLink: 1 },
          { id: 'other-30-2', label: 'Identify your connection to CIP compliance' },
          { id: 'other-30-3', label: 'Complete any required organizational training' },
        ],
      },
      {
        id: 'next-60',
        name: 'Next 60 Days',
        tasks: [
          { id: 'other-60-1', label: 'Complete additional modules based on interest' },
          { id: 'other-60-2', label: 'Take the Self-Assessment', toolLink: '/self-assessment' },
          { id: 'other-60-3', label: 'Explore the Evidence Lab and Audit Simulator' },
        ],
      },
      {
        id: 'ongoing',
        name: 'Ongoing (Monthly/Quarterly)',
        tasks: [
          { id: 'other-ong-1', label: 'Stay current on compliance policies and updates' },
          { id: 'other-ong-2', label: 'Report any security concerns promptly' },
          { id: 'other-ong-3', label: 'Complete required training renewals on time' },
        ],
      },
      {
        id: 'pre-audit',
        name: 'Pre-Audit (90 Days Before)',
        tasks: [
          { id: 'other-pre-1', label: 'Review your responsibilities during audits' },
          { id: 'other-pre-2', label: 'Know who to contact if approached by auditors' },
          { id: 'other-pre-3', label: 'Ensure your training records are up to date' },
        ],
      },
    ],
    keyTools: [
      { name: 'Self-Assessment', link: '/self-assessment', description: 'Evaluate your CIP knowledge' },
      { name: 'Audit Simulator', link: '/audit-simulator', description: 'Understand audit requests' },
      { name: 'Final Exam', link: '/final-exam', description: 'Test your overall knowledge' },
    ],
    riskAreas: ['Scope & Asset Clarity', 'Training & Personnel', 'Technical Controls & Patching', 'Evidence Organization & Audit Readiness', 'Incident Response & Recovery'],
  },
};

export const roleModuleCallouts: Record<number, Record<UserRole, string>> = {
  1: {
    compliance: 'As a Compliance Manager, this module establishes your foundation for understanding all CIP requirements and how they interconnect. Focus on the regulatory structure and how violations are assessed.',
    'it-ot': 'As an IT/OT Engineer, this module helps you understand why CIP controls exist and how your technical work fits into the broader compliance picture.',
    'physical-security': 'As Physical Security personnel, this module explains how physical protection requirements connect to the broader CIP framework.',
    'hr-training': 'As HR/Training staff, this module shows how personnel and training requirements fit within the overall CIP compliance structure.',
    leadership: 'As a leader, this module provides the strategic context for CIP compliance and helps you understand your governance responsibilities.',
    other: 'This module provides essential context for understanding how CIP compliance affects your organization.',
  },
  2: {
    compliance: 'As a Compliance Manager, accurate asset identification is the foundation of your program. Scope errors cascade into compliance gaps across all other standards.',
    'it-ot': 'As an IT/OT Engineer, you must know exactly which systems are in scope. This module teaches you how assets are classified and what that means for your work.',
    'physical-security': 'As Physical Security personnel, understanding asset scope tells you which areas require physical protection measures.',
    'hr-training': 'As HR/Training staff, asset scope determines which positions require CIP training and personnel risk assessments.',
    leadership: 'As a leader, understanding scope helps you allocate resources appropriately and assess organizational risk.',
    other: 'This module helps you understand which systems in your organization require special protection.',
  },
  3: {
    compliance: 'As a Compliance Manager, governance is your domain. This module covers policy requirements, CIP Senior Manager responsibilities, and program structure you manage daily.',
    'it-ot': 'As an IT/OT Engineer, understanding governance helps you know who approves changes and how policies affect your technical decisions.',
    'physical-security': 'As Physical Security personnel, governance defines the policies and procedures that guide your access control activities.',
    'hr-training': 'As HR/Training staff, governance establishes the policy framework for training programs and personnel management.',
    leadership: 'As a leader, this module is essential. CIP-003 requires designated senior management and policy approval at your level.',
    other: 'This module helps you understand how your organization structures its compliance program.',
  },
  4: {
    compliance: 'As a Compliance Manager, you oversee training compliance. Focus on tracking requirements and coordinating with HR on deadlines and documentation.',
    'it-ot': 'As an IT/OT Engineer, you need to complete required training before accessing BES Cyber Systems. Understand what training you need and when.',
    'physical-security': 'As Physical Security personnel, training requirements apply to you and those you manage access for. Understand the access prerequisites.',
    'hr-training': 'As HR/Training staff, this is your core module. Master the training program requirements, PRA timelines, and access revocation procedures.',
    leadership: 'As a leader, ensure your organization has adequate training resources and that you understand personnel compliance requirements.',
    other: 'This module explains the training and vetting requirements that may apply to your position.',
  },
  5: {
    compliance: 'As a Compliance Manager, perimeter controls are frequently audited. Know the documentation requirements for ESPs and PSPs.',
    'it-ot': 'As an IT/OT Engineer, ESP boundaries and access controls are your responsibility. Master the technical requirements in this module.',
    'physical-security': 'As Physical Security personnel, this is your core module. PSP requirements, visitor management, and PACS testing are central to your role.',
    'hr-training': 'As HR/Training staff, understand how personnel changes affect physical and electronic access rights.',
    leadership: 'As a leader, understand the investment required for proper perimeter controls and their role in protecting critical assets.',
    other: 'This module explains how access to critical systems is controlled electronically and physically.',
  },
  6: {
    compliance: 'As a Compliance Manager, patch management timelines are critical. Ensure you understand the 35-day assessment requirement and mitigation documentation.',
    'it-ot': 'As an IT/OT Engineer, this is your core module. Master patch management timelines, security logging, malicious code prevention, and port management.',
    'physical-security': 'As Physical Security personnel, understand how technical security controls complement your physical protection measures.',
    'hr-training': 'As HR/Training staff, know that technical staff need specialized training on these requirements.',
    leadership: 'As a leader, understand the resources needed for effective patch management and the risks of falling behind.',
    other: 'This module explains how systems are protected through technical security controls.',
  },
  7: {
    compliance: 'As a Compliance Manager, incident response and recovery plans require regular testing and updates. Focus on documentation and coordination requirements.',
    'it-ot': 'As an IT/OT Engineer, you likely execute incident response procedures. Understand the technical and documentation requirements.',
    'physical-security': 'As Physical Security personnel, physical security incidents require similar response procedures. Understand how they integrate with cyber incidents.',
    'hr-training': 'As HR/Training staff, personnel may need training on their incident response roles and responsibilities.',
    leadership: 'As a leader, you may be involved in incident escalation and communication. Understand the response framework.',
    other: 'This module explains how your organization responds to and recovers from security incidents.',
  },
  8: {
    compliance: 'As a Compliance Manager, configuration management affects multiple standards. Ensure baseline documentation and change control processes are audit-ready.',
    'it-ot': 'As an IT/OT Engineer, configuration management and vulnerability assessments are your responsibility. Master the 35-day and 15-month timelines.',
    'physical-security': 'As Physical Security personnel, understand how configuration changes might affect physical security systems.',
    'hr-training': 'As HR/Training staff, configuration management may require specialized training for technical personnel.',
    leadership: 'As a leader, understand the resources needed for proper configuration and vulnerability management.',
    other: 'This module explains how system configurations are documented and managed.',
  },
  9: {
    compliance: 'As a Compliance Manager, BES Cyber System Information protection and supply chain risk management are increasingly scrutinized. Master the documentation requirements.',
    'it-ot': 'As an IT/OT Engineer, understand how to protect sensitive information about your systems and assess vendor security.',
    'physical-security': 'As Physical Security personnel, information protection includes physical documents and media. Understand storage and disposal requirements.',
    'hr-training': 'As HR/Training staff, personnel handling BCSI may need additional training on protection requirements.',
    leadership: 'As a leader, supply chain risk management requires procurement policy decisions at your level.',
    other: 'This module explains how sensitive system information is protected.',
  },
  10: {
    compliance: 'As a Compliance Manager, this is your capstone module. Audit preparation, internal assessments, and continuous improvement are your core responsibilities.',
    'it-ot': 'As an IT/OT Engineer, understand how to present technical evidence and respond to audit requests professionally.',
    'physical-security': 'As Physical Security personnel, know how to demonstrate physical security compliance during audits.',
    'hr-training': 'As HR/Training staff, training records are frequently requested during audits. Ensure you can retrieve them efficiently.',
    leadership: 'As a leader, understand your role in audit entrance and exit meetings and in driving continuous improvement.',
    other: 'This module explains how audits work and how to prepare for them.',
  },
};
