import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import { useProgress } from "@/hooks/useProgress";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { roleTrainingPlans } from "@/data/roleTrainingData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModuleRecap } from "@/components/ModuleRecap";
import { SpacedReviewQuiz } from "@/components/SpacedReviewQuiz";
import { RoleModuleCallout } from "@/components/RoleModuleCallout";
import { ESPPSPDiagram } from "@/components/diagrams/ESPPSPDiagram";
import { PatchManagementDiagram } from "@/components/diagrams/PatchManagementDiagram";
import { IncidentResponseDiagram } from "@/components/diagrams/IncidentResponseDiagram";
import { TrainingMatrixDiagram } from "@/components/diagrams/TrainingMatrixDiagram";
import { 
  BookOpen, 
  ChevronDown, 
  CheckCircle2,
  Target,
  Lightbulb,
  GraduationCap,
  Star,
  Shield
} from "lucide-react";

interface ModuleData {
  id: number;
  title: string;
  objectives: string[];
  content: {
    title: string;
    text: string;
  }[];
  exercise: {
    title: string;
    description: string;
  };
  quiz: QuizQuestion[];
}

const modulesData: ModuleData[] = [
  {
    id: 1,
    title: "Foundations of NERC and CIP",
    objectives: [
      "Understand NERC's role in North American grid reliability",
      "Identify the 11 CIP standards and their general purpose",
      "Explain the relationship between NERC, Regional Entities, and Registered Entities"
    ],
    content: [
      {
        title: "What is NERC?",
        text: "The North American Electric Reliability Corporation (NERC) is a not-for-profit international regulatory authority responsible for ensuring the reliability of the bulk power system in North America. NERC develops and enforces reliability standards, monitors the grid, and assesses future adequacy. It operates under oversight from the Federal Energy Regulatory Commission (FERC) in the United States and governmental authorities in Canada."
      },
      {
        title: "The Purpose of CIP Standards",
        text: "Critical Infrastructure Protection (CIP) standards are a set of requirements designed to secure the cyber assets essential to operating the bulk electric system. Following the 2003 Northeast blackout and growing concerns about cyber threats to critical infrastructure, NERC developed CIP standards to establish baseline security requirements for the electricity sector. These standards address everything from physical security to incident response."
      },
      {
        title: "The 11 CIP Standards Overview",
        text: "The CIP standards are numbered CIP-002 through CIP-014 (with some numbers retired or reserved). CIP-002 covers asset categorization. CIP-003 through CIP-011 address security management, personnel, electronic and physical perimeters, systems security, incident response, recovery, configuration management, and information protection. CIP-013 addresses supply chain risk management, and CIP-014 covers physical security of transmission stations."
      },
      {
        title: "Compliance Enforcement",
        text: "NERC delegates compliance monitoring and enforcement to six Regional Entities across North America. These Regional Entities conduct audits, spot checks, and investigations. Violations can result in penalties up to $1 million per violation per day. Beyond financial penalties, non-compliance creates real risks to grid reliability and public safety."
      }
    ],
    exercise: {
      title: "Map Your Organization",
      description: "Create a simple diagram showing your organization's relationship to NERC. Identify your Regional Entity, your registration categories (e.g., Generation Owner, Transmission Operator), and list which CIP standards apply to your registration. This exercise helps you understand exactly which requirements your organization must meet."
    },
    quiz: [
      {
        id: 1,
        question: "What is NERC's primary responsibility?",
        options: [
          "Generating electricity for North America",
          "Ensuring the reliability of the bulk power system",
          "Setting electricity prices",
          "Building transmission lines"
        ],
        correctAnswer: 1,
        explanation: "NERC is responsible for ensuring the reliability of the bulk power system through developing and enforcing standards."
      },
      {
        id: 2,
        question: "How many CIP standards are currently in effect?",
        options: ["5", "8", "11", "14"],
        correctAnswer: 2,
        explanation: "There are 11 active CIP standards (CIP-002 through CIP-014, with some numbers retired or reserved)."
      },
      {
        id: 3,
        question: "Who conducts compliance audits for NERC CIP standards?",
        options: [
          "NERC directly",
          "The Department of Energy",
          "Regional Entities",
          "State public utility commissions"
        ],
        correctAnswer: 2,
        explanation: "Regional Entities conduct compliance monitoring and enforcement activities on behalf of NERC."
      }
    ]
  },
  {
    id: 2,
    title: "Asset Identification & Scope (CIP-002)",
    objectives: [
      "Explain the BES Cyber System categorization process",
      "Distinguish between High, Medium, and Low impact ratings",
      "Identify assets that are in scope for CIP requirements"
    ],
    content: [
      {
        title: "Why Asset Identification Matters",
        text: "CIP-002 is the foundation of your entire compliance program. Before you can protect assets, you must identify them. The categorization process determines which systems are in scope and what level of protection they require. Getting this wrong—either by missing assets or miscategorizing them—can result in violations and leave critical systems unprotected."
      },
      {
        title: "BES Cyber Systems and BES Cyber Assets",
        text: "A BES Cyber Asset is any programmable electronic device that, if compromised, could impact the reliable operation of the Bulk Electric System within 15 minutes. BES Cyber Systems are logical groupings of these assets that perform reliability functions. Understanding this distinction is critical—you protect BES Cyber Systems, but you identify assets first."
      },
      {
        title: "Impact Rating Categories",
        text: "Systems are categorized as High, Medium, or Low impact based on the potential effect their compromise could have on grid reliability. High impact systems include control centers that control 1,500 MW or more. Medium impact includes certain generation facilities and transmission stations. Low impact includes all other BES Cyber Systems. Each category has different security requirements."
      },
      {
        title: "The 15-Minute Test",
        text: "When evaluating whether an asset is a BES Cyber Asset, apply the 15-minute test: if this asset were rendered unavailable, degraded, or misused, could it adversely impact the reliable operation of the BES within 15 minutes? If yes, it's likely a BES Cyber Asset and must be included in your inventory."
      }
    ],
    exercise: {
      title: "Asset Discovery Walk-Through",
      description: "Walk through one control room or substation in your organization with an engineer. For each electronic device you encounter, ask: Does this device affect BES operations? If compromised, could it impact reliability within 15 minutes? Document your findings and compare them to your current BES Cyber Asset inventory."
    },
    quiz: [
      {
        id: 1,
        question: "What timeframe defines whether an asset is a BES Cyber Asset?",
        options: ["1 hour", "15 minutes", "24 hours", "1 week"],
        correctAnswer: 1,
        explanation: "The 15-minute rule determines if an asset's compromise could adversely impact BES reliability within 15 minutes."
      },
      {
        id: 2,
        question: "Which impact category has the most stringent requirements?",
        options: ["Low", "Medium", "High", "Critical"],
        correctAnswer: 2,
        explanation: "High impact BES Cyber Systems have the most stringent requirements due to their potential effect on grid reliability."
      },
      {
        id: 3,
        question: "What is a BES Cyber System?",
        options: [
          "Any computer connected to the internet",
          "A logical grouping of BES Cyber Assets performing reliability functions",
          "Only control room computers",
          "Any device with an IP address"
        ],
        correctAnswer: 1,
        explanation: "A BES Cyber System is a logical grouping of BES Cyber Assets that perform one or more reliability tasks."
      }
    ]
  },
  {
    id: 3,
    title: "Governance & Program Management (CIP-003)",
    objectives: [
      "Describe the role of the CIP Senior Manager",
      "Identify required cyber security policies",
      "Understand policy review and approval cycles",
      "Explain CIP-003-9 low-impact BES Cyber System requirements"
    ],
    content: [
      {
        title: "The CIP Senior Manager Role",
        text: "CIP-003 requires that each Responsible Entity designate a single CIP Senior Manager with overall authority and responsibility for leading and managing implementation of CIP standards. This person must have the authority to ensure compliance and is accountable for the program. They can delegate specific tasks but not overall accountability."
      },
      {
        title: "Required Cyber Security Policies",
        text: "Your organization must maintain documented cyber security policies addressing specific topics: personnel and training, electronic security perimeters, physical security of BES Cyber Systems, system security management, incident reporting and response, recovery plans, configuration change management, information protection, and declaring and responding to CIP Exceptional Circumstances."
      },
      {
        title: "Policy Review Cycles",
        text: "CIP-003 requires that cyber security policies be reviewed and approved by the CIP Senior Manager at least once every 15 calendar months. This review must be documented with evidence of the review date and approval. Many organizations align this with annual reviews, leaving buffer time for the 15-month requirement."
      },
      {
        title: "Delegation of Authority",
        text: "While the CIP Senior Manager has overall accountability, they can delegate specific responsibilities to qualified individuals. These delegations must be documented. Common delegations include day-to-day compliance management, technical security functions, and training administration. Each delegation should clearly define the scope of responsibility."
      },
      {
        title: "CIP-003-9: Low-Impact BES Cyber System Requirements",
        text: "CIP-003-9 significantly expanded requirements for low-impact BES Cyber Systems. Organizations must now implement cyber security awareness, physical security controls, electronic access controls, and Cyber Security Incident response for low-impact assets. These requirements apply to ALL low-impact BES Cyber Systems—not just a subset."
      },
      {
        title: "Low-Impact Transient Cyber Asset (TCA) Management",
        text: "CIP-003-9 requires specific controls for Transient Cyber Assets connecting to low-impact BES Cyber Systems. Before connecting removable media or transient devices, you must either: review authorization of the device, use an entity-managed TCA with documented security controls, or use methods to mitigate software vulnerabilities (antivirus scans, application whitelisting). USB drives are a top violation area."
      },
      {
        title: "Low-Impact Password and Authentication Controls",
        text: "For low-impact BES Cyber Systems with External Routable Connectivity, CIP-003-9 requires: changing default passwords, establishing minimum password parameters or using multi-factor authentication, and having processes for password changes when personnel no longer require access. These are often overlooked for devices like RTUs and relays."
      },
      {
        title: "Low-Impact Patching Requirements",
        text: "CIP-003-9 requires a patch management process for low-impact assets. You must identify security patches, assess applicability, and either install or document why you chose not to install. While less prescriptive than High/Medium requirements, you still need documented evidence of patch evaluation for low-impact systems."
      }
    ],
    exercise: {
      title: "Low-Impact Inventory Review",
      description: "Review your low-impact BES Cyber System inventory. For each asset type (RTUs, relays, communication equipment), verify: Are default passwords changed? Is there a documented patching process? How are TCAs managed when connecting? Create an action plan for any gaps specific to CIP-003-9 requirements."
    },
    quiz: [
      {
        id: 1,
        question: "How often must cyber security policies be reviewed?",
        options: ["Every 6 months", "Every 12 months", "Every 15 months", "Every 24 months"],
        correctAnswer: 2,
        explanation: "CIP-003 requires policies to be reviewed and approved at least once every 15 calendar months."
      },
      {
        id: 2,
        question: "Who has overall accountability for CIP compliance?",
        options: ["The IT Director", "The CIP Senior Manager", "The CEO", "The Compliance Team"],
        correctAnswer: 1,
        explanation: "The CIP Senior Manager has overall authority and responsibility for CIP implementation."
      },
      {
        id: 3,
        question: "What does CIP-003-9 require for low-impact BES Cyber Systems with External Routable Connectivity?",
        options: [
          "No password requirements",
          "Changing default passwords and minimum password parameters",
          "Only physical security",
          "No requirements apply"
        ],
        correctAnswer: 1,
        explanation: "CIP-003-9 requires changing default passwords and establishing minimum password parameters or using multi-factor authentication for low-impact systems with External Routable Connectivity."
      },
      {
        id: 4,
        question: "What must be done before connecting a USB drive to a low-impact BES Cyber System?",
        options: [
          "Nothing is required",
          "Use documented methods to mitigate software vulnerabilities",
          "Only label the USB drive",
          "Format the drive"
        ],
        correctAnswer: 1,
        explanation: "CIP-003-9 requires methods to mitigate software vulnerabilities on TCAs, such as antivirus scanning, before connecting to low-impact BES Cyber Systems."
      }
    ]
  },
  {
    id: 4,
    title: "People & Training (CIP-004)",
    objectives: [
      "Explain personnel risk assessment requirements",
      "Describe the CIP training program requirements",
      "Understand access management and revocation timelines"
    ],
    content: [
      {
        title: "Security Awareness Program",
        text: "CIP-004 requires a security awareness program that reinforces cyber security practices at least once every calendar quarter. This can include physical or electronic communications, direct training, or other awareness methods. The key is regular reinforcement of security practices for all personnel with authorized access."
      },
      {
        title: "CIP Training Requirements",
        text: "Before personnel can receive authorized electronic or physical access to BES Cyber Systems, they must complete training on cyber security policies, physical security procedures, handling of BES Cyber System Information, and their specific responsibilities. Training must be completed initially and then at least once every 15 calendar months."
      },
      {
        title: "Personnel Risk Assessments",
        text: "Personnel risk assessments (PRAs) must be completed before granting access to BES Cyber Systems. This includes identity verification and a seven-year criminal history check. PRAs must be updated every seven years for those maintaining access. If a PRA reveals concerning information, you have seven days to evaluate and respond."
      },
      {
        title: "Access Revocation",
        text: "When personnel no longer require access—whether due to termination, transfer, or other reasons—access must be revoked within 24 hours of notification. For terminations with cause, access should be revoked immediately. This requirement applies to both electronic and physical access. Documentation of revocation timing is critical evidence."
      }
    ],
    exercise: {
      title: "Access Revocation Drill",
      description: "Conduct a tabletop exercise simulating an employee termination. Walk through your process: Who receives notification? How is access revoked for each system? Can you demonstrate the revocation occurred within 24 hours? Document any gaps in your process and create an improvement plan."
    },
    quiz: [
      {
        id: 1,
        question: "How quickly must access be revoked after an employee's termination notification?",
        options: ["Immediately", "24 hours", "7 days", "30 days"],
        correctAnswer: 1,
        explanation: "Access must be revoked within 24 hours of receiving notification of termination."
      },
      {
        id: 2,
        question: "How often must CIP training be completed after initial training?",
        options: ["Every 6 months", "Every 12 months", "Every 15 months", "Every 24 months"],
        correctAnswer: 2,
        explanation: "CIP training must be completed initially and then at least once every 15 calendar months."
      },
      {
        id: 3,
        question: "How far back must personnel risk assessments check criminal history?",
        options: ["3 years", "5 years", "7 years", "10 years"],
        correctAnswer: 2,
        explanation: "Personnel risk assessments require a seven-year criminal history records check."
      }
    ]
  },
  {
    id: 5,
    title: "Electronic & Physical Perimeters (CIP-005 / CIP-006)",
    objectives: [
      "Define Electronic Security Perimeters (ESPs) and their requirements",
      "Understand Physical Security Perimeter (PSP) requirements",
      "Explain access point monitoring and logging"
    ],
    content: [
      {
        title: "Electronic Security Perimeters",
        text: "An Electronic Security Perimeter (ESP) is the logical border surrounding a network to which BES Cyber Systems are connected. Every point of access to the ESP must be identified and protected. This includes firewalls, routers, and any device that provides connectivity between the ESP and external networks."
      },
      {
        title: "Physical Security Perimeters",
        text: "A Physical Security Perimeter (PSP) is the physical border surrounding locations where BES Cyber Systems, Electronic Access Control Systems, or Physical Access Control Systems reside. PSPs must have at least one physical access point, and all access points must be protected with access control mechanisms."
      },
      {
        title: "Access Control Requirements",
        text: "Both ESPs and PSPs require strict access control. For ESPs, this means denying access by default and only permitting necessary communications. For PSPs, this means controlling who can physically enter the protected space. All access—both electronic and physical—must be logged and monitored."
      },
      {
        title: "Visitor Management",
        text: "Visitors to PSPs must be continuously escorted by authorized personnel. Visitor logs must document the date and time of entry and exit, the visitor's name, and the escort's name. Some organizations implement temporary badges that visually distinguish visitors from authorized personnel."
      }
    ],
    exercise: {
      title: "Perimeter Walk-Through",
      description: "Conduct a physical walk-through of one PSP in your environment. Document every potential entry point—doors, windows, cable penetrations, HVAC ducts. Then review your ESP documentation for that location. Can you trace the electronic boundary? Are all access points documented and monitored?"
    },
    quiz: [
      {
        id: 1,
        question: "What is an Electronic Security Perimeter?",
        options: [
          "A firewall device",
          "The logical border surrounding a network with BES Cyber Systems",
          "A physical fence around a substation",
          "Antivirus software"
        ],
        correctAnswer: 1,
        explanation: "An ESP is the logical border surrounding a network to which BES Cyber Systems are connected."
      },
      {
        id: 2,
        question: "How must visitors be managed within a PSP?",
        options: [
          "They can roam freely with a visitor badge",
          "They must be continuously escorted",
          "They only need to sign in at the entrance",
          "Visitors are not allowed in PSPs"
        ],
        correctAnswer: 1,
        explanation: "Visitors must be continuously escorted by authorized personnel when in a PSP."
      },
      {
        id: 3,
        question: "What should be logged for PSP access?",
        options: [
          "Only failed access attempts",
          "Only successful entries",
          "Entry and exit times for all access",
          "Only visitor access"
        ],
        correctAnswer: 2,
        explanation: "All access to PSPs must be logged, including entry and exit times."
      }
    ]
  },
  {
    id: 6,
    title: "System Security & Patching (CIP-007)",
    objectives: [
      "Describe port and service management requirements",
      "Explain the patch management timeline and process",
      "Understand malicious code prevention and security logging"
    ],
    content: [
      {
        title: "Ports and Services Management",
        text: "CIP-007 requires that you enable only necessary logical network accessible ports and protect against unnecessary physical input/output ports. You must document which ports and services are needed and disable or restrict all others. This reduces the attack surface of your BES Cyber Systems."
      },
      {
        title: "Patch Management Process",
        text: "Security patches must be assessed within 35 calendar days of availability. Assessment means evaluating the patch's applicability and determining a course of action. After assessment, you must either implement the patch, create a mitigation plan, or document why the patch doesn't apply. Implementation timelines vary based on patch criticality."
      },
      {
        title: "Malicious Code Prevention",
        text: "BES Cyber Systems must have methods to deter, detect, or prevent malicious code. This typically means antivirus or application whitelisting solutions. Signature or pattern updates must be tested and installed in a timely manner, and you must document your process for addressing identified malicious code."
      },
      {
        title: "Security Event Monitoring",
        text: "CIP-007 requires logging and monitoring of security events. This includes login attempts, detected malicious code, and other security-relevant events. Logs must be retained for at least 90 days and reviewed at specified intervals—at least every 15 calendar days for High impact systems."
      }
    ],
    exercise: {
      title: "Patch Assessment Practice",
      description: "Select a recent security patch applicable to systems in your environment. Walk through your patch assessment process: When was the patch released? When was it assessed? What was the disposition? Is the assessment documented? Time yourself to see how quickly you can produce this evidence."
    },
    quiz: [
      {
        id: 1,
        question: "Within how many days must security patches be assessed?",
        options: ["15 days", "30 days", "35 days", "60 days"],
        correctAnswer: 2,
        explanation: "Security patches must be assessed within 35 calendar days of availability."
      },
      {
        id: 2,
        question: "How long must security logs be retained?",
        options: ["30 days", "60 days", "90 days", "1 year"],
        correctAnswer: 2,
        explanation: "Security logs must be retained for at least 90 calendar days."
      },
      {
        id: 3,
        question: "What is required for ports and services?",
        options: [
          "All ports must be open for monitoring",
          "Only necessary ports should be enabled",
          "Ports are not covered by CIP standards",
          "All ports must be closed"
        ],
        correctAnswer: 1,
        explanation: "CIP-007 requires enabling only necessary logical network accessible ports."
      }
    ]
  },
  {
    id: 7,
    title: "Incident Response & Recovery (CIP-008 / CIP-009)",
    objectives: [
      "Describe incident response plan requirements and ES-ISAC coordination",
      "Understand incident classification and reporting timelines",
      "Explain recovery plan testing requirements and backup verification",
      "Document lessons learned from incidents and exercises"
    ],
    content: [
      {
        title: "Cyber Security Incident Response Plans (CIP-008 R1)",
        text: "CIP-008 requires documented Cyber Security Incident response plans that identify, classify, and respond to incidents. Plans must include: one or more processes to identify and classify incidents, response actions for incidents including containment, eradication, and recovery procedures, and roles and responsibilities. Plans must be specific enough to guide responders but flexible enough to handle unknown situations."
      },
      {
        title: "Incident Classification: Reportable vs. Non-Reportable",
        text: "Not all incidents require external reporting. A Reportable Cyber Security Incident is one that compromised or disrupted: (1) a BES Cyber System that performs a reliability task, (2) an Electronic Security Perimeter, or (3) an associated Electronic Access Control or Monitoring System. Your plan must include clear criteria for making this determination—this is often tested by auditors."
      },
      {
        title: "ES-ISAC Reporting Requirements",
        text: "Reportable incidents must be reported to the Electricity Information Sharing and Analysis Center (ES-ISAC) within ONE HOUR of determination that an incident is reportable. The initial report can be brief—you are not required to have all details. You must also submit follow-up reports as additional information becomes available. Document all notification times carefully."
      },
      {
        title: "Notification Timeline Evidence",
        text: "Auditors will verify your notification timelines. Document: (1) When the incident was detected, (2) When it was classified as a Reportable Cyber Security Incident, (3) When ES-ISAC was notified (must be within 1 hour of #2), (4) Who made the report and the method used. Many violations occur from late reporting or inadequate documentation of timeline."
      },
      {
        title: "Incident Response Plan Testing (CIP-008 R2)",
        text: "Plans must be tested at least once every 15 calendar months through: (1) responding to an actual incident, (2) paper drills or tabletop exercises, or (3) operational exercises. Testing must include both the Cyber Security Incident response plan and the process for making initial notifications. Document participants, scenarios, and test results."
      },
      {
        title: "Lessons Learned (CIP-008 R3)",
        text: "After a Reportable Cyber Security Incident or test completion, you must conduct a lessons learned review within 90 days. Document what worked well, what needs improvement, and specific corrective actions. Update your incident response plan if the review identifies gaps. This drives continuous improvement of your response capability."
      },
      {
        title: "Recovery Plans (CIP-009 R1)",
        text: "CIP-009 requires recovery plans for BES Cyber Systems. Plans must include: conditions for activation, roles and responsibilities, specific procedures for recovering BES Cyber System functionality, and processes for backup and storage of information required for recovery. Recovery plans should enable restoration of critical functions within acceptable timeframes."
      },
      {
        title: "Backup and Storage Requirements (CIP-009 R1)",
        text: "Recovery plans must address information preservation. You must: identify information needed for recovery, document backup processes, verify successful backup completion, and protect backup media (stored at safe locations, protected from unauthorized access). Test that you can actually restore from your backups—a backup that cannot be restored is not a backup."
      },
      {
        title: "Recovery Plan Testing (CIP-009 R2)",
        text: "Recovery plans must be tested at least once every 15 calendar months. Testing includes: exercising the recovery plan in a paper drill, operational exercise, or actual recovery, and testing backup media to ensure information essential for recovery is retrievable. Many organizations combine incident response and recovery testing for efficiency."
      },
      {
        title: "Recovery Plan Updating",
        text: "Update recovery plans within 60 days of changes to roles or responsibilities, changes to recovery procedures, or lessons learned from exercises/actual recoveries. Maintain a version history showing when plans were updated and what changed. Auditors will compare your current plan to your testing evidence."
      }
    ],
    exercise: {
      title: "Incident Classification Drill",
      description: "Review these scenarios and determine if each is a Reportable Cyber Security Incident: (1) Malware detected on an office workstation with no BES connectivity, (2) Failed login attempts on an ESP firewall, (3) Ransomware encryption of an EMS server. For each, document your classification rationale and who would be notified. Practice the ES-ISAC notification call script."
    },
    quiz: [
      {
        id: 1,
        question: "How quickly must Reportable Cyber Security Incidents be reported to ES-ISAC?",
        options: ["15 minutes", "1 hour", "24 hours", "72 hours"],
        correctAnswer: 1,
        explanation: "Reportable incidents must be reported within one hour of determination that the incident is reportable."
      },
      {
        id: 2,
        question: "How often must incident response plans be tested?",
        options: ["Every 6 months", "Every 12 months", "Every 15 months", "Every 24 months"],
        correctAnswer: 2,
        explanation: "Incident response plans must be tested at least once every 15 calendar months."
      },
      {
        id: 3,
        question: "Within how many days must lessons learned be documented after a Reportable Cyber Security Incident?",
        options: ["30 days", "60 days", "90 days", "120 days"],
        correctAnswer: 2,
        explanation: "Lessons learned must be documented within 90 calendar days of completing a Reportable Cyber Security Incident response or test."
      },
      {
        id: 4,
        question: "What must recovery plans address for backup and storage?",
        options: [
          "Only hardware replacement procedures",
          "Information needed for recovery, backup processes, and verification of successful backups",
          "Only cloud storage options",
          "Insurance claim procedures"
        ],
        correctAnswer: 1,
        explanation: "Recovery plans must address identifying information needed for recovery, backup processes, and verification that backups were successful."
      }
    ]
  },
  {
    id: 8,
    title: "Configuration & Vulnerability Management (CIP-010)",
    objectives: [
      "Describe baseline configuration requirements",
      "Understand configuration change management",
      "Explain vulnerability assessment requirements"
    ],
    content: [
      {
        title: "Baseline Configurations",
        text: "CIP-010 requires documented baseline configurations for all applicable BES Cyber Systems. Baselines must include operating system, firmware, or other configuration, commercially available or open-source software, custom software, logical network accessible ports, and security patches applied. Baselines must be updated within 30 days of completing a change."
      },
      {
        title: "Configuration Change Management",
        text: "Before making changes to baseline configurations, you must develop a plan that includes testing in a test environment or documented analysis, documentation of security controls, and required approvals. After implementation, you must verify that the change did not adversely affect existing security controls and update your baseline documentation."
      },
      {
        title: "Vulnerability Assessments",
        text: "Active vulnerability assessments must be performed at least once every 15 calendar months. These assessments identify vulnerabilities in your BES Cyber Systems, and you must create an action plan to address discovered vulnerabilities. The process must be documented with evidence of assessment activities and remediation plans."
      },
      {
        title: "Transient Cyber Assets",
        text: "CIP-010 also addresses Transient Cyber Assets—devices like laptops and USB drives that connect to BES Cyber Systems but are not permanently installed. These devices must be managed, protected, and documented to prevent them from introducing malware or other threats into your protected environments."
      }
    ],
    exercise: {
      title: "Baseline Verification",
      description: "Select one BES Cyber Asset and compare its current configuration against your documented baseline. Are all software versions current? Are all ports and services accurately documented? If you find discrepancies, investigate whether undocumented changes were made or if your baseline needs updating."
    },
    quiz: [
      {
        id: 1,
        question: "How quickly must baseline documentation be updated after a change?",
        options: ["7 days", "14 days", "30 days", "60 days"],
        correctAnswer: 2,
        explanation: "Baseline documentation must be updated within 30 calendar days of completing a change."
      },
      {
        id: 2,
        question: "How often must vulnerability assessments be performed?",
        options: ["Every 6 months", "Every 12 months", "Every 15 months", "Every 24 months"],
        correctAnswer: 2,
        explanation: "Active vulnerability assessments must be performed at least once every 15 calendar months."
      },
      {
        id: 3,
        question: "What must be included in a baseline configuration?",
        options: [
          "Only the operating system version",
          "Operating system, software, ports, and security patches",
          "Only the hardware model",
          "The asset purchase date"
        ],
        correctAnswer: 1,
        explanation: "Baselines must include OS/firmware, software, logical ports, and security patches."
      }
    ]
  },
  {
    id: 9,
    title: "Information Protection & Supply Chain (CIP-011 / CIP-013)",
    objectives: [
      "Define BES Cyber System Information (BCSI) and protection requirements",
      "Describe BCSI storage, transit, and disposal requirements",
      "Understand CIP-013-2 supply chain risk management for EACMS and PACS",
      "Explain vendor verification and third-party remote access security"
    ],
    content: [
      {
        title: "What is BCSI?",
        text: "BES Cyber System Information (BCSI) is information about BES Cyber Systems that could be used to gain unauthorized access or pose a security threat. This includes network diagrams, security configuration information, floor plans showing BES Cyber System locations, and detailed equipment specifications. BCSI must be identified, protected, and properly handled throughout its lifecycle."
      },
      {
        title: "BCSI Protection in Storage (CIP-011 R1)",
        text: "BCSI must be protected in storage locations—both physical and electronic. Implement access controls so only authorized personnel can access BCSI. Track access to BCSI storage locations. For shared storage systems, ensure BCSI is segregated and protected. Document who has access and conduct periodic reviews to verify access remains appropriate."
      },
      {
        title: "BCSI Protection in Transit",
        text: "BCSI must be encrypted when transmitted over public networks or through untrusted channels. Use secure file transfer protocols, encrypted email, or VPNs when sharing BCSI externally. For physical transit of BCSI (USB drives, paper documents), implement chain of custody controls. Never email unencrypted BCSI externally."
      },
      {
        title: "BCSI Disposal Requirements",
        text: "When BCSI is no longer needed, it must be properly destroyed or disposed of to prevent unauthorized retrieval. This includes sanitizing electronic media (secure wiping, degaussing, or physical destruction) and shredding paper documents. Document disposal actions—auditors will ask for evidence of proper BCSI disposal."
      },
      {
        title: "CIP-013-2: Expanded Supply Chain Scope",
        text: "CIP-013-2 significantly expanded supply chain requirements to include EACMS (Electronic Access Control or Monitoring Systems) and PACS (Physical Access Control Systems). Previously focused on BES Cyber Systems, you must now verify vendor security practices for firewalls, intrusion detection systems, badge readers, and cameras that support your CIP program."
      },
      {
        title: "Supply Chain Risk Management Plan",
        text: "Your CIP-013 plan must address: (1) Notification by vendors of incidents related to products, (2) Coordination of responses to vendor-disclosed vulnerabilities, (3) Verification of software integrity and authenticity before installation, (4) Controls for vendor-initiated remote access. The plan applies during procurement planning—not just after purchase."
      },
      {
        title: "EACMS and PACS Vendor Verification",
        text: "For EACMS (firewalls, authentication servers, logging systems) and PACS (badge systems, cameras, door controllers), you must: assess vendor security practices before procurement, verify software/firmware integrity before deployment, coordinate vulnerability responses with vendors, and control remote access by vendor personnel. Many organizations overlook these 'supporting' systems."
      },
      {
        title: "Third-Party Remote Access Security",
        text: "CIP-013-2 requires controls for vendor remote access to EACMS and PACS. Establish procedures for: authorizing vendor remote access, authenticating remote users, monitoring vendor sessions, logging vendor activities, and terminating access when no longer needed. Treat vendor access with the same rigor as employee access to critical systems."
      },
      {
        title: "Software Integrity Verification",
        text: "Before installing software or firmware on BES Cyber Systems, EACMS, or PACS, verify its authenticity and integrity. Methods include: verifying digital signatures, comparing hash values against vendor-published values, obtaining software from trusted sources only, and documenting verification activities. This prevents supply chain attacks through compromised software."
      }
    ],
    exercise: {
      title: "EACMS/PACS Supply Chain Review",
      description: "Identify all EACMS and PACS in your environment (firewalls, IDS, badge systems, cameras). For each system: Who is the vendor? What is your process for receiving vulnerability notifications? How do you verify software integrity before updates? How is vendor remote access controlled? Document gaps against CIP-013-2 requirements."
    },
    quiz: [
      {
        id: 1,
        question: "What does CIP-013-2 add to supply chain requirements?",
        options: [
          "Only BES Cyber Systems",
          "EACMS and PACS in addition to BES Cyber Systems",
          "Only network equipment",
          "No changes from CIP-013-1"
        ],
        correctAnswer: 1,
        explanation: "CIP-013-2 expanded supply chain requirements to include EACMS and PACS, not just BES Cyber Systems."
      },
      {
        id: 2,
        question: "What must be verified before installing vendor software on applicable systems?",
        options: [
          "Only the price",
          "Software integrity and authenticity",
          "Only the installation date",
          "Only the file size"
        ],
        correctAnswer: 1,
        explanation: "CIP-013 requires verification of software integrity and authenticity, typically through digital signatures or hash verification."
      },
      {
        id: 3,
        question: "How must BCSI be protected during transmission over public networks?",
        options: [
          "No protection is required",
          "Only password protection",
          "Encryption when transmitted over public networks",
          "Only during business hours"
        ],
        correctAnswer: 2,
        explanation: "BCSI must be encrypted when transmitted over public networks."
      },
      {
        id: 4,
        question: "What systems are considered EACMS?",
        options: [
          "Only office computers",
          "Firewalls, intrusion detection, authentication servers, and logging systems",
          "Only printers",
          "Only backup systems"
        ],
        correctAnswer: 1,
        explanation: "EACMS include systems that control or monitor electronic access, such as firewalls, IDS, authentication servers, and logging systems."
      }
    ]
  },
  {
    id: 10,
    title: "Audit Simulation & Continuous Improvement",
    objectives: [
      "Prepare for the NERC CIP audit process",
      "Conduct effective internal mock audits",
      "Build a continuous improvement program"
    ],
    content: [
      {
        title: "Understanding the Audit Process",
        text: "NERC CIP audits are conducted by Regional Entities and typically follow a structured process: advance notification, data request submission, on-site or virtual audit week, and post-audit reporting. Understanding this process helps you prepare effectively. Auditors will request evidence, conduct interviews, and observe operations."
      },
      {
        title: "Evidence Preparation",
        text: "Before an audit, organize your evidence to align with the RSAW (Reliability Standard Audit Worksheet). Pre-stage evidence packages for each requirement. Ensure evidence is properly dated, shows who performed actions, and clearly demonstrates compliance. Practice retrieving evidence quickly—auditors notice when you struggle to find documentation."
      },
      {
        title: "Conducting Mock Audits",
        text: "Regular internal audits help identify gaps before official audits. Use the official RSAW format, assign someone to play the auditor role, and treat it as realistically as possible. Document findings, create corrective action plans, and track remediation. Mock audits build confidence and reveal areas needing improvement."
      },
      {
        title: "Building Continuous Improvement",
        text: "Compliance is not a destination but an ongoing process. Establish metrics to track compliance health: evidence collection rates, training completion percentages, timely patch assessments, and incident response drill results. Review these metrics regularly and adjust your program based on findings. Learn from each audit cycle."
      }
    ],
    exercise: {
      title: "Mini Mock Audit",
      description: "Select one CIP requirement your organization must meet. Review the RSAW for that requirement. Gather the evidence you would present to an auditor. Have a colleague review the evidence as if they were an auditor—does it clearly demonstrate compliance? Document any gaps and create an improvement plan."
    },
    quiz: [
      {
        id: 1,
        question: "What is an RSAW?",
        options: [
          "Remote System Access Workflow",
          "Reliability Standard Audit Worksheet",
          "Required Security Assessment Work",
          "Regional System Analysis Window"
        ],
        correctAnswer: 1,
        explanation: "RSAW stands for Reliability Standard Audit Worksheet, used to structure compliance audits."
      },
      {
        id: 2,
        question: "Why are mock audits valuable?",
        options: [
          "They replace official audits",
          "They help identify gaps before official audits",
          "They are required by NERC",
          "They reduce penalties automatically"
        ],
        correctAnswer: 1,
        explanation: "Mock audits help identify and address gaps before official audits occur."
      },
      {
        id: 3,
        question: "What makes evidence effective for auditors?",
        options: [
          "Large file sizes",
          "Proper dates, responsible parties, and clear demonstration of compliance",
          "Complex formatting",
          "Verbal explanations only"
        ],
        correctAnswer: 1,
        explanation: "Effective evidence is dated, shows who performed actions, and clearly demonstrates compliance."
      }
    ]
  },
  {
    id: 11,
    title: "Control Center Communications (CIP-012)",
    objectives: [
      "Understand CIP-012 applicability to Control Centers",
      "Explain requirements for protecting Real-time data between Control Centers",
      "Describe encryption and integrity protection methods",
      "Identify what constitutes Real-time Assessment and Monitoring data"
    ],
    content: [
      {
        title: "CIP-012 Overview and Applicability",
        text: "CIP-012 protects the confidentiality and integrity of Real-time Assessment and Real-time monitoring data transmitted between Control Centers. This standard applies when data is transmitted between: (1) Control Centers operated by the same entity, (2) Control Centers operated by different entities, or (3) a Control Center and any other location with EMS applications. Unlike most CIP standards, this focuses on data in transit, not systems."
      },
      {
        title: "What is Real-time Assessment and Monitoring Data?",
        text: "Protected data includes information used for Real-time situational awareness: generation output, load data, tie-line flows, voltage levels, breaker status, and other data exchanged for reliable grid operation. This data, if intercepted or manipulated, could enable attackers to understand grid state or inject false information affecting operator decisions."
      },
      {
        title: "Protection Requirements (CIP-012 R1)",
        text: "You must implement one or more documented plan(s) to mitigate risks of unauthorized disclosure and modification of Real-time data while in transit. Plans must address both confidentiality (preventing eavesdropping) and integrity (preventing modification). Encryption alone is not sufficient—you must also protect against tampering."
      },
      {
        title: "Encryption Methods for Control Center Communications",
        text: "Common methods include: TLS/SSL encryption for ICCP links, IPsec VPNs for dedicated circuits, and encryption built into application protocols. When selecting methods, consider: algorithm strength (avoid deprecated protocols like SSL 3.0), key management procedures, and performance impact on Real-time data delivery. Document your encryption standards."
      },
      {
        title: "Integrity Protection",
        text: "Beyond encryption, protect data integrity using: message authentication codes (MACs), digital signatures, or integrity verification built into protocols. The goal is detecting if data was modified in transit. If an attacker could change generation readings or breaker status mid-transmission, operators might make decisions based on false information."
      },
      {
        title: "ICCP and Inter-Control Center Communications",
        text: "Many utilities use ICCP (Inter-Control Center Communications Protocol) for data exchange. CIP-012 doesn't mandate specific protocols but requires protection of the data. If using ICCP, implement ICCP Secure (TASE.2 with TLS) or protect the underlying transport. Document how your ICCP links are secured and evidence that encryption is active."
      },
      {
        title: "Evidence and Documentation",
        text: "Maintain documentation showing: what communication links are in scope, the protection methods applied to each, configuration evidence (encryption settings, certificates), and testing that protections are operational. Auditors will ask to see proof that encryption is actually enabled, not just planned."
      }
    ],
    exercise: {
      title: "Control Center Communications Inventory",
      description: "Create an inventory of all data links between your Control Center and other Control Centers or EMS-connected locations. For each link: What protocol is used (ICCP, DNP3, proprietary)? Is the link encrypted? What integrity protection exists? Document any gaps and prioritize remediation."
    },
    quiz: [
      {
        id: 1,
        question: "What does CIP-012 protect?",
        options: [
          "Physical access to Control Centers",
          "Real-time Assessment and monitoring data in transit between Control Centers",
          "Only backup data",
          "Employee personal information"
        ],
        correctAnswer: 1,
        explanation: "CIP-012 protects the confidentiality and integrity of Real-time Assessment and monitoring data transmitted between Control Centers."
      },
      {
        id: 2,
        question: "What two properties must be protected under CIP-012?",
        options: [
          "Availability and performance",
          "Confidentiality and integrity",
          "Speed and reliability",
          "Cost and efficiency"
        ],
        correctAnswer: 1,
        explanation: "CIP-012 requires protection of both confidentiality (preventing unauthorized disclosure) and integrity (preventing unauthorized modification) of data in transit."
      },
      {
        id: 3,
        question: "When does CIP-012 apply?",
        options: [
          "Only within a single Control Center",
          "When Real-time data is transmitted between Control Centers or to EMS-connected locations",
          "Only for backup communications",
          "Only for voice communications"
        ],
        correctAnswer: 1,
        explanation: "CIP-012 applies when Real-time Assessment or monitoring data is transmitted between Control Centers or to other locations with EMS applications."
      }
    ]
  },
  {
    id: 12,
    title: "Physical Security of Transmission Assets (CIP-014)",
    objectives: [
      "Distinguish CIP-014 from CIP-006 physical security requirements",
      "Understand risk assessment requirements for transmission stations",
      "Explain threat and vulnerability evaluation processes",
      "Describe physical security plan development and third-party review"
    ],
    content: [
      {
        title: "CIP-014 vs. CIP-006: Key Differences",
        text: "CIP-006 protects Physical Security Perimeters around BES Cyber Systems—focused on cyber assets. CIP-014 protects transmission stations and substations themselves from physical attack, regardless of cyber systems. CIP-014 addresses the risk that physical destruction of critical transmission facilities could cause widespread outages affecting the grid's ability to serve load."
      },
      {
        title: "Applicability: Which Facilities Are In Scope?",
        text: "CIP-014 applies to Transmission Owners and Transmission Operators for: (1) Transmission stations and substations operated at 500 kV or higher, and (2) Transmission stations and substations that meet specific criteria indicating their loss could result in instability, uncontrolled separation, or cascading failures. Not all substations are in scope—only those critical to grid stability."
      },
      {
        title: "Risk Assessment (CIP-014 R1)",
        text: "You must perform an initial risk assessment and subsequent assessments at least once every 30 months to identify transmission stations and substations that if rendered inoperable or damaged could result in instability, uncontrolled separation, or cascading within an Interconnection. This is an engineering analysis, not a cyber assessment."
      },
      {
        title: "Third-Party Verification (CIP-014 R2)",
        text: "Your risk assessment must be verified by an unaffiliated third party. This reviewer must have relevant transmission planning or operations experience. They verify the methodology and results—confirming that the correct facilities were identified (or not identified) as critical. This adds independent oversight to self-assessments."
      },
      {
        title: "Threat and Vulnerability Evaluation (CIP-014 R4)",
        text: "For identified facilities, conduct a threat and vulnerability evaluation at least once every 30 months. Consider: physical attack methods (ballistic, intrusion, explosives), current security measures, facility characteristics affecting vulnerability, and potential attack impacts. This evaluation informs your security plan development."
      },
      {
        title: "Physical Security Plan (CIP-014 R5)",
        text: "Develop and implement a physical security plan that addresses threats identified in your evaluation. Plans may include: enhanced perimeter barriers, lighting improvements, video surveillance, intrusion detection, hardening of critical equipment, and coordination with law enforcement. Plans must be reviewed by an unaffiliated third party."
      },
      {
        title: "Third-Party Review of Security Plans",
        text: "Physical security plans must be reviewed by an unaffiliated third party with relevant physical security expertise. They evaluate whether the plan addresses identified threats and vulnerabilities. Consider using physical security consultants, law enforcement advisors, or industry peers (not competitors in the same market area)."
      },
      {
        title: "Sensitive Information Protection",
        text: "CIP-014 information is highly sensitive—it identifies your most critical facilities and their vulnerabilities. Protect this information carefully. Limit distribution, control storage, and be cautious about who has access. Improper disclosure could literally provide attackers a target list and vulnerability assessment."
      }
    ],
    exercise: {
      title: "Facility Criticality Review",
      description: "Using publicly available transmission maps, identify which of your facilities might meet CIP-014 criteria (500 kV and above, or critical to grid stability). Consider: What would happen if this facility were destroyed? Could load be served through alternate paths? This exercise builds intuition for the risk assessment process."
    },
    quiz: [
      {
        id: 1,
        question: "What is the primary difference between CIP-014 and CIP-006?",
        options: [
          "CIP-014 is older than CIP-006",
          "CIP-006 protects cyber assets in PSPs; CIP-014 protects transmission facilities from physical attack",
          "CIP-014 only applies to generators",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "CIP-006 focuses on physical security of areas containing BES Cyber Systems, while CIP-014 protects critical transmission facilities from physical attack regardless of cyber systems."
      },
      {
        id: 2,
        question: "How often must CIP-014 risk assessments be performed?",
        options: [
          "Every 12 months",
          "Every 24 months",
          "Every 30 months",
          "Every 60 months"
        ],
        correctAnswer: 2,
        explanation: "CIP-014 risk assessments must be performed at least once every 30 calendar months."
      },
      {
        id: 3,
        question: "Who must review a CIP-014 physical security plan?",
        options: [
          "Only internal staff",
          "The CIP Senior Manager only",
          "An unaffiliated third party with relevant expertise",
          "No review is required"
        ],
        correctAnswer: 2,
        explanation: "CIP-014 physical security plans must be reviewed by an unaffiliated third party with physical security expertise."
      },
      {
        id: 4,
        question: "What types of facilities are potentially in scope for CIP-014?",
        options: [
          "All substations regardless of voltage",
          "Only generation facilities",
          "Transmission stations at 500 kV+ or critical to grid stability",
          "Only Control Centers"
        ],
        correctAnswer: 2,
        explanation: "CIP-014 applies to transmission stations operated at 500 kV or higher, plus those whose loss could cause instability, uncontrolled separation, or cascading."
      }
    ]
  }
];

export default function Modules() {
  const [openModules, setOpenModules] = useState<number[]>([]);
  const { isModuleComplete, markModuleComplete, isLoaded } = useProgress();
  const { isModuleRecommended, preferences } = useUserPreferences();

  const toggleModule = (moduleId: number) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Diagram components for specific modules
  const moduleDiagrams: Record<number, React.ReactNode> = {
    4: <TrainingMatrixDiagram className="my-6" />,
    5: <ESPPSPDiagram className="my-6" />,
    6: <PatchManagementDiagram className="my-6" />,
    7: <IncidentResponseDiagram className="my-6" />,
  };

  const handleQuizPass = (moduleId: number) => {
    markModuleComplete(moduleId);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Training Modules
            </h1>
            <p className="text-lg text-muted-foreground">
              Work through each module to build comprehensive NERC CIP knowledge. 
              Complete the quiz at the end of each module to track your progress.
            </p>
          </div>
        </div>
      </section>

      {/* Module List */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {modulesData.map((module) => {
              const isComplete = isLoaded && isModuleComplete(module.id);
              const isOpen = openModules.includes(module.id);
              
              // Check if module is required or recommended for current role
              const rolePlan = preferences.role ? roleTrainingPlans[preferences.role] : null;
              const requiredModules = rolePlan 
                ? [...new Set(rolePlan.phases.flatMap(p => p.modules.filter(m => m.required).map(m => m.id)))]
                : [];
              const recommendedModules = rolePlan
                ? [...new Set(rolePlan.phases.flatMap(p => p.modules.filter(m => !m.required).map(m => m.id)))]
                : [];
              
              const isRequired = requiredModules.includes(module.id);
              const isRecommended = recommendedModules.includes(module.id);
              const isRoleRelevant = isRequired || isRecommended;

              return (
                <div 
                  key={module.id} 
                  id={`module-${module.id}`}
                  className={cn(
                    "bg-card rounded-xl border-2 overflow-hidden transition-all",
                    isComplete ? "border-success/50" : 
                    isRequired ? "border-primary/50 shadow-sm" : 
                    isRecommended ? "border-accent/40" : 
                    preferences.role && !isRoleRelevant ? "border-border/30 opacity-60" : "border-border/50"
                  )}
                >
                  <Collapsible open={isOpen} onOpenChange={() => toggleModule(module.id)}>
                    <CollapsibleTrigger className="w-full p-6 text-left hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg",
                          isComplete 
                            ? "bg-success text-success-foreground" 
                            : isRequired
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                        )}>
                          {isComplete ? <CheckCircle2 className="h-6 w-6" /> : module.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h2 className="text-lg font-semibold text-navy">
                              Module {module.id}: {module.title}
                            </h2>
                            {isComplete && preferences.role && (
                              <Badge variant="default" className="bg-success text-success-foreground text-[10px]">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Complete for your role
                              </Badge>
                            )}
                            {!isComplete && isRequired && (
                              <Badge variant="default" className="text-[10px]">
                                <Shield className="h-3 w-3 mr-1" /> Required for your role
                              </Badge>
                            )}
                            {!isComplete && isRecommended && (
                              <Badge variant="secondary" className="text-[10px]">
                                <Star className="h-3 w-3 mr-1" /> Recommended for your role
                              </Badge>
                            )}
                          </div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {module.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Target className="h-3 w-3 shrink-0 mt-1" />
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <ChevronDown className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                          isOpen && "rotate-180"
                        )} />
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-8 border-t border-border">
                        {/* Module Recap - Shows key points from previous module */}
                        <div className="pt-6">
                          <ModuleRecap moduleId={module.id} />
                        </div>

                        {/* Learning Objectives */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Target className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-navy">Learning Objectives</h3>
                          </div>
                          <ul className="space-y-2">
                            {module.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-1" />
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Role-Specific Callout */}
                        <RoleModuleCallout moduleId={module.id} />

                        {/* Content Sections */}
                        <div className="space-y-6">
                          {module.content.map((section, i) => (
                            <div key={i}>
                              <h4 className="font-semibold text-navy mb-2">{section.title}</h4>
                              <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                            </div>
                          ))}
                        </div>

                        {/* Visual Diagram (if applicable) */}
                        {moduleDiagrams[module.id] && (
                          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                            <h4 className="font-semibold text-navy mb-4">Visual Reference</h4>
                            {moduleDiagrams[module.id]}
                          </div>
                        )}

                        {/* Exercise */}
                        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="h-5 w-5 text-accent" />
                            <h4 className="font-semibold text-navy">Apply This: {module.exercise.title}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm">{module.exercise.description}</p>
                        </div>

                        {/* Quiz */}
                        <Quiz 
                          questions={module.quiz} 
                          onPass={() => handleQuizPass(module.id)}
                          title={`Module ${module.id} Quiz`}
                        />

                        {/* Spaced Review Questions */}
                        <SpacedReviewQuiz currentModule={module.id} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
