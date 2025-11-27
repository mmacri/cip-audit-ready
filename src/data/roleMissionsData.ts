import { UserRole } from '@/hooks/useUserPreferences';

export interface RoleMission {
  id: string;
  title: string;
  scenario: string;
  steps: string[];
  relevantModules: number[];
  toolLinks: { name: string; link: string }[];
}

export const roleMissions: Record<UserRole, RoleMission[]> = {
  compliance: [
    {
      id: 'comp-mission-1',
      title: 'Respond to CIP-004 Training Evidence Request',
      scenario: "You've just received an audit request for evidence demonstrating that all personnel with authorized cyber access have completed role-based training within the required timeframe. The auditor wants training rosters, completion dates, and proof that the training content aligns with each person's job responsibilities.",
      steps: [
        'Identify all personnel with authorized cyber or unescorted physical access to BES Cyber Systems',
        'Pull training completion records from your LMS or tracking system',
        'Verify completion dates fall within required timelines (initial and annual refresher)',
        'Cross-reference training content against job functions to confirm role-appropriateness',
        'Prepare a summary matrix showing personnel, access type, required training, and completion status'
      ],
      relevantModules: [4, 3],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' },
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'comp-mission-2',
      title: 'Conduct a CIP-003 Policy Gap Analysis',
      scenario: "Leadership has asked you to verify that all required CIP policies are current, approved, and aligned with the latest regulatory guidance. You need to review each policy area and identify any gaps before the next compliance review.",
      steps: [
        'List all CIP-003 required policy areas (access controls, physical security, incident response, etc.)',
        'Locate the current version of each policy and verify approval signatures',
        'Check that review dates fall within the 15-month cycle requirement',
        'Compare policy content against current CIP standard language for alignment',
        'Document gaps and create a remediation timeline with owners assigned'
      ],
      relevantModules: [3, 1],
      toolLinks: [
        { name: 'Self-Assessment', link: '/self-assessment' },
        { name: 'Readiness Plan', link: '/readiness-plan' }
      ]
    },
    {
      id: 'comp-mission-3',
      title: 'Prepare Quarterly Compliance Status Briefing',
      scenario: "You need to prepare a quarterly briefing for leadership and the CIP Senior Manager covering current compliance status, outstanding items, upcoming deadlines, and any audit findings or corrective actions in progress.",
      steps: [
        'Compile status of all open corrective actions and mitigation plans',
        'Review upcoming compliance calendar deadlines for the next quarter',
        'Summarize any internal audit or spot-check findings from the past quarter',
        'Identify resource needs or risks that require leadership attention',
        'Create a one-page executive summary with key metrics and action items'
      ],
      relevantModules: [10, 3],
      toolLinks: [
        { name: 'Readiness Plan', link: '/readiness-plan' }
      ]
    },
    {
      id: 'comp-mission-4',
      title: 'Coordinate Evidence Collection for Multi-Standard Audit',
      scenario: "Your organization is facing an upcoming audit covering CIP-002 through CIP-011. You need to coordinate evidence collection across multiple departments and ensure all documentation is properly organized, named, and accessible.",
      steps: [
        'Create a master evidence request list organized by CIP standard',
        'Assign evidence owners for each requirement area (IT, OT, Physical Security, HR)',
        'Establish naming conventions and folder structure for the evidence repository',
        'Schedule check-in meetings with each department to track collection progress',
        'Conduct a completeness review one week before the audit start date'
      ],
      relevantModules: [10, 9, 7],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' },
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'comp-mission-5',
      title: 'Assess Supply Chain Risk Management Practices',
      scenario: "CIP-013 requires documented supply chain risk management practices. You need to assess your current vendor management processes against the requirements and identify any documentation or process gaps.",
      steps: [
        'Review your current supply chain risk management plan for completeness',
        'Identify all vendors providing products or services impacting BES Cyber Systems',
        'Verify procurement language includes required security provisions',
        'Check that vendor risk assessments are documented and current',
        'Ensure processes exist for notification of vendor security incidents'
      ],
      relevantModules: [9],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    }
  ],

  'it-ot': [
    {
      id: 'itot-mission-1',
      title: 'Execute Emergency Patch Assessment',
      scenario: "A critical security patch has been released for a vulnerability affecting your BES Cyber Systems. You need to assess the patch, determine applicability, schedule deployment, and ensure all documentation meets CIP-007 requirements within the 35-day assessment window.",
      steps: [
        'Document receipt date of patch notification and start the 35-day clock',
        'Assess patch applicability to each BES Cyber System (vendor bulletins, CVE analysis)',
        'Determine if patch is applicable, not applicable, or requires mitigation plan',
        'For applicable patches, create deployment schedule within required timeframes',
        'Document assessment rationale and approval in your patch tracking system'
      ],
      relevantModules: [6, 8],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' },
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'itot-mission-2',
      title: 'Verify ESP Network Diagram Accuracy',
      scenario: "You've been asked to verify that all Electronic Security Perimeter (ESP) network diagrams are current and accurately reflect the actual network topology. This is critical for CIP-005 compliance and audit readiness.",
      steps: [
        'Obtain current ESP network diagrams and access point documentation',
        'Physically or logically verify each access point shown on the diagrams',
        'Confirm all EAPs (Electronic Access Points) are documented with their protective controls',
        'Verify external routable connectivity paths are accurately depicted',
        'Update diagrams to reflect any changes and obtain change control approval'
      ],
      relevantModules: [5, 2],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'itot-mission-3',
      title: 'Conduct Security Log Review',
      scenario: "CIP-007 requires regular review of security logs for BES Cyber Systems. You need to conduct a log review, document findings, and ensure any anomalies are investigated and addressed.",
      steps: [
        'Identify all log sources within scope (authentication, access, system events)',
        'Review logs at the interval specified in your documentation (at minimum every 15 days)',
        'Look for failed login attempts, unauthorized access attempts, and system anomalies',
        'Document review date, reviewer, systems reviewed, and any findings',
        'For anomalies found, document investigation and any corrective actions taken'
      ],
      relevantModules: [6, 7],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'itot-mission-4',
      title: 'Baseline Configuration Change Management',
      scenario: "A configuration change is needed on a BES Cyber System. You must follow change management procedures, update baseline documentation, verify the change, and maintain proper evidence throughout the process.",
      steps: [
        'Submit change request documenting the change, justification, and risk assessment',
        'Obtain required approvals per your change management process',
        'Implement the change during the approved maintenance window',
        'Update baseline configuration documentation to reflect the new state',
        'Verify the change was successful and document completion with evidence'
      ],
      relevantModules: [8, 6],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'itot-mission-5',
      title: 'Test Backup and Recovery Procedures',
      scenario: "Per CIP-009, you need to test the backup and recovery capability for a BES Cyber System. This includes verifying that backups are current and that recovery procedures work as documented.",
      steps: [
        'Verify backup procedures are current and last backup was within required timeframe',
        'Select a test recovery scenario (full restore or specific data recovery)',
        'Execute recovery procedure in test environment if available',
        'Document test date, procedures followed, and results',
        'Note any issues encountered and update recovery procedures if needed'
      ],
      relevantModules: [7],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    }
  ],

  'physical-security': [
    {
      id: 'phys-mission-1',
      title: 'Execute 24-Hour Access Revocation',
      scenario: "A contractor who had authorized unescorted physical access to a PSP has completed their project. Per CIP-006, you must revoke their access within 24 hours. Document the process to demonstrate timely compliance.",
      steps: [
        'Receive notification of access termination requirement (email, ticket, verbal)',
        'Document the timestamp when revocation was requested',
        'Remove badge access from the access control system',
        'Retrieve physical badge if applicable',
        'Document completion time and retain evidence showing the 24-hour requirement was met'
      ],
      relevantModules: [5, 4],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'phys-mission-2',
      title: 'Conduct PSP Boundary Inspection',
      scenario: "You need to conduct a physical inspection of a PSP to verify that all six-wall boundaries are secure, access points are properly controlled, and the physical access control system (PACS) is functioning correctly.",
      steps: [
        'Review PSP diagram showing boundaries and all access points',
        'Physically walk the perimeter verifying walls, doors, and barriers',
        'Test all badge readers and verify they are operational',
        'Check for any unauthorized access points or boundary compromises',
        'Document inspection date, findings, and any corrective actions needed'
      ],
      relevantModules: [5],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'phys-mission-3',
      title: 'Manage Visitor Escort for Audit',
      scenario: "Auditors are scheduled to visit your facility and will need escorted access to PSPs. You need to coordinate visitor management procedures ensuring all CIP-006 requirements are met.",
      steps: [
        'Obtain visitor names in advance and verify need for PSP access',
        'Brief assigned escorts on responsibilities (continuous monitoring, logging)',
        'Prepare visitor badges and sign-in log with required information',
        'Ensure escorts document entry/exit times and areas visited',
        'Collect and secure visitor badges at end of visit'
      ],
      relevantModules: [5, 10],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'phys-mission-4',
      title: 'Test Physical Access Alerting',
      scenario: "CIP-006 requires testing of physical access control system alerting mechanisms. You need to verify that unauthorized access attempts generate alerts and that those alerts are monitored and responded to appropriately.",
      steps: [
        'Review your PACS alerting configuration and monitoring procedures',
        'Conduct a test by triggering an access denial (invalid badge, tailgating sensor)',
        'Verify alert was generated and logged in the monitoring system',
        'Confirm monitoring personnel received and acknowledged the alert',
        'Document test date, method, results, and any issues identified'
      ],
      relevantModules: [5, 7],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'phys-mission-5',
      title: 'Reconcile Physical Access Authorization List',
      scenario: "You need to verify that your authorized physical access list is accurate and that only personnel with a valid need maintain access to PSPs. This reconciliation helps identify stale accounts or unauthorized access.",
      steps: [
        'Export current authorized access list from PACS',
        'Cross-reference against HR records for active employees and contractors',
        'Verify each person has documented authorization and valid need for access',
        'Identify and investigate any discrepancies',
        'Initiate access revocation for any personnel without valid authorization'
      ],
      relevantModules: [5, 4],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    }
  ],

  'hr-training': [
    {
      id: 'hr-mission-1',
      title: 'Onboard New Engineer with BES Cyber Access',
      scenario: "A new engineer has been hired who will need authorized cyber access to BES Cyber Systems. You must ensure all CIP-004 requirements are met before access is provisioned, including PRA, training, and access authorization.",
      steps: [
        'Initiate Personnel Risk Assessment (PRA) including identity verification and criminal history check',
        'Verify PRA is completed and documented before access provisioning',
        'Enroll employee in required CIP awareness and role-based training',
        'Obtain training completion certificates and file in personnel records',
        'Coordinate with system owners to provision access only after all requirements are met'
      ],
      relevantModules: [4, 3],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'hr-mission-2',
      title: 'Coordinate Annual Training Refresh',
      scenario: "CIP-004 requires annual training refresh for all personnel with authorized access. You need to ensure everyone completes their training before their anniversary dates and maintain proper records.",
      steps: [
        'Generate report of all personnel with authorized access and their training due dates',
        'Send reminder notices 30, 15, and 7 days before training expiration',
        'Track completion and follow up with managers for non-responders',
        'Document completion dates and update training tracking system',
        'Coordinate with access managers to suspend access for overdue personnel'
      ],
      relevantModules: [4],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'hr-mission-3',
      title: 'Process Termination with CIP Access',
      scenario: "An employee with authorized cyber and physical access to BES Cyber Systems is leaving the organization. You must coordinate timely access revocation and ensure all CIP-004 requirements for termination are met.",
      steps: [
        'Receive termination notification and document the timestamp',
        'Notify IT/OT team for cyber access revocation (same calendar day for involuntary)',
        'Notify Physical Security for badge deactivation within 24 hours',
        'Collect any company property including badges and authentication tokens',
        'Document all revocation completion times and retain as evidence'
      ],
      relevantModules: [4],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'hr-mission-4',
      title: 'Update Role-Based Training Content',
      scenario: "Regulatory changes or internal process updates require you to review and update role-based training content. You need to ensure training accurately reflects current requirements and job responsibilities.",
      steps: [
        'Review latest CIP standards and implementation guidance for changes',
        'Identify which roles are affected by any requirement changes',
        'Update training content to reflect current standards and procedures',
        'Have subject matter experts review updated content for accuracy',
        'Document training revision, approval, and effective date'
      ],
      relevantModules: [4, 3],
      toolLinks: [
        { name: 'Self-Assessment', link: '/self-assessment' }
      ]
    },
    {
      id: 'hr-mission-5',
      title: 'Conduct PRA Seven-Year Reverification',
      scenario: "CIP-004 requires Personnel Risk Assessment reverification every seven years. You need to identify personnel approaching reverification deadlines and initiate the process before their current PRA expires.",
      steps: [
        'Run report of personnel whose PRA will expire in the next 90 days',
        'Initiate reverification process including updated criminal history check',
        'Document identity verification using approved methods',
        'Obtain and review reverification results before current PRA expires',
        'Update PRA completion dates in tracking system and personnel files'
      ],
      relevantModules: [4],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    }
  ],

  leadership: [
    {
      id: 'lead-mission-1',
      title: 'Prepare Board-Level CIP Risk Summary',
      scenario: "The board has requested a summary of NERC CIP compliance status and associated risks. You need to translate technical compliance details into strategic risk language that supports informed decision-making.",
      steps: [
        'Gather current compliance metrics: audit results, open findings, upcoming deadlines',
        'Identify top 3 compliance risks and their potential business impact',
        'Quantify resource needs for addressing any compliance gaps',
        'Prepare executive summary with risk ratings (high/medium/low)',
        'Include recommendations for risk mitigation and resource allocation'
      ],
      relevantModules: [10, 3, 1],
      toolLinks: [
        { name: 'Readiness Plan', link: '/readiness-plan' }
      ]
    },
    {
      id: 'lead-mission-2',
      title: 'Review CIP Senior Manager Delegation',
      scenario: "As a leader, you need to ensure the CIP Senior Manager designation is current and that any delegations are properly documented. This is a foundational governance requirement under CIP-003.",
      steps: [
        'Locate current CIP Senior Manager designation document',
        'Verify designation was made by a senior officer with authority',
        'Review any delegations to confirm they are documented and current',
        'Check that designated individuals have appropriate authority levels',
        'Update documentation if any changes in personnel or responsibilities'
      ],
      relevantModules: [3, 1],
      toolLinks: [
        { name: 'Evidence Lab', link: '/evidence-lab' }
      ]
    },
    {
      id: 'lead-mission-3',
      title: 'Approve Annual CIP Budget Request',
      scenario: "The compliance team has submitted the annual CIP program budget request. You need to review the request, understand the compliance drivers, and make informed resource allocation decisions.",
      steps: [
        'Review budget request against regulatory requirements and audit findings',
        'Understand compliance risks associated with underfunding specific areas',
        'Compare request to industry benchmarks and peer organizations if available',
        'Identify areas for efficiency or potential risk acceptance',
        'Document approval decision and any conditions or priorities'
      ],
      relevantModules: [10, 3],
      toolLinks: [
        { name: 'Readiness Plan', link: '/readiness-plan' }
      ]
    },
    {
      id: 'lead-mission-4',
      title: 'Champion Compliance Culture Initiative',
      scenario: "Compliance is everyone's responsibility, but staff engagement varies. You've been asked to champion an initiative to strengthen the organization's compliance culture and awareness.",
      steps: [
        'Review current compliance awareness metrics (training completion, incident reporting)',
        'Identify cultural barriers to compliance engagement',
        'Develop messaging that connects CIP compliance to organizational mission',
        'Plan visible leadership actions (site visits, town halls, recognition programs)',
        'Establish metrics to measure culture improvement over time'
      ],
      relevantModules: [3, 4],
      toolLinks: [
        { name: 'Self-Assessment', link: '/self-assessment' }
      ]
    },
    {
      id: 'lead-mission-5',
      title: 'Conduct Post-Audit Leadership Debrief',
      scenario: "Following a NERC CIP audit, leadership needs to understand results, any findings, and implications. You need to lead a debrief that ensures appropriate follow-up and organizational learning.",
      steps: [
        'Receive and review formal audit results and any findings',
        'Schedule debrief with compliance team and affected department heads',
        'Understand root causes of any findings and corrective action plans',
        'Allocate resources needed for remediation',
        'Document lessons learned and improvements to prevent recurrence'
      ],
      relevantModules: [10],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' },
        { name: 'Readiness Plan', link: '/readiness-plan' }
      ]
    }
  ],

  other: [
    {
      id: 'other-mission-1',
      title: 'Understand Your CIP Responsibilities',
      scenario: "You're new to a role that may have NERC CIP compliance implications. You need to understand what CIP requirements apply to your work and who to contact for guidance.",
      steps: [
        'Complete CIP Awareness Training (Module 1) to understand the framework',
        'Meet with your supervisor to clarify any CIP-related job responsibilities',
        'Identify the Compliance Manager and understand how to report concerns',
        'Review any CIP-related procedures specific to your department',
        'Complete role-specific training if you have authorized access to BES Cyber Systems'
      ],
      relevantModules: [1, 3],
      toolLinks: [
        { name: 'Self-Assessment', link: '/self-assessment' }
      ]
    },
    {
      id: 'other-mission-2',
      title: 'Report a Potential CIP Incident',
      scenario: "You've observed something that might be a security incident or compliance violation. You need to know how to properly report it and what information to provide.",
      steps: [
        'Do not attempt to investigate or fix the issue yourself',
        'Contact your supervisor or the Compliance Manager immediately',
        'Document what you observed: date, time, location, and what happened',
        'Preserve any relevant evidence (do not delete logs or emails)',
        'Follow up to confirm your report was received and being addressed'
      ],
      relevantModules: [7, 1],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    },
    {
      id: 'other-mission-3',
      title: 'Participate in a Mock Audit Interview',
      scenario: "You've been selected to participate in a mock audit interview to practice answering questions about your work area. This helps prepare the organization for actual audits.",
      steps: [
        'Review the CIP standards relevant to your job function',
        'Gather any documentation or evidence you typically work with',
        'Be prepared to explain your processes and how you document your work',
        "Answer questions honestly - if you don't know, say so",
        'Note any areas where you felt unprepared for follow-up training'
      ],
      relevantModules: [10],
      toolLinks: [
        { name: 'Audit Simulator', link: '/audit-simulator' }
      ]
    }
  ]
};
