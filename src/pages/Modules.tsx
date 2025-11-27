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
      "Understand policy review and approval cycles"
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
      }
    ],
    exercise: {
      title: "Policy Gap Analysis",
      description: "Review your organization's current cyber security policies against the CIP-003 requirements. For each required topic area, verify you have a policy that addresses it, check the last review and approval date, and confirm the CIP Senior Manager's approval is documented. Create an action list for any gaps."
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
        question: "Can the CIP Senior Manager delegate their accountability?",
        options: [
          "Yes, to anyone they choose",
          "Yes, but only to executives",
          "No, accountability cannot be delegated",
          "Only during audits"
        ],
        correctAnswer: 2,
        explanation: "The CIP Senior Manager can delegate specific tasks but not overall accountability for the program."
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
      "Describe incident response plan requirements",
      "Understand incident reporting obligations",
      "Explain recovery plan testing requirements"
    ],
    content: [
      {
        title: "Incident Response Plans",
        text: "CIP-008 requires documented Cyber Security Incident response plans that identify, classify, and respond to incidents. Plans must include roles and responsibilities, incident handling procedures, and communication procedures. The plan must address Reportable Cyber Security Incidents that compromise or disrupt BES Cyber Systems."
      },
      {
        title: "Incident Reporting",
        text: "Reportable Cyber Security Incidents must be reported to the Electricity Information Sharing and Analysis Center (E-ISAC) within one hour of identification. This includes incidents that compromise or disrupt BES Cyber Systems, Electronic Security Perimeters, or associated Electronic Access Control Systems."
      },
      {
        title: "Recovery Plans",
        text: "CIP-009 requires recovery plans for BES Cyber Systems. These plans must include conditions for activation, roles and responsibilities, and procedures for recovering BES Cyber System functionality. Plans must address backup and storage of information, and verification of successful backup completion."
      },
      {
        title: "Testing Requirements",
        text: "Both incident response and recovery plans must be tested. Incident response plans must be tested at least once every 15 calendar months through operational exercises, tabletops, or actual incidents. Recovery plans must also be tested at least once every 15 calendar months with additional requirements for testing backup media."
      }
    ],
    exercise: {
      title: "Incident Response Tabletop",
      description: "Conduct a tabletop exercise with your incident response team. Present a scenario: 'An operator reports unusual behavior on an HMI workstation.' Walk through your response plan. Who is notified? What initial actions are taken? How do you determine if this is a Reportable Cyber Security Incident? Document lessons learned."
    },
    quiz: [
      {
        id: 1,
        question: "How quickly must Reportable Cyber Security Incidents be reported to E-ISAC?",
        options: ["15 minutes", "1 hour", "24 hours", "72 hours"],
        correctAnswer: 1,
        explanation: "Reportable incidents must be reported within one hour of identification."
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
        question: "What must recovery plans address?",
        options: [
          "Only hardware replacement",
          "Backup, storage, and verification of BES Cyber System information",
          "Only network connectivity",
          "Insurance claims"
        ],
        correctAnswer: 1,
        explanation: "Recovery plans must address backup, storage of information, and verification of successful backups."
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
      "Define BES Cyber System Information (BCSI)",
      "Describe BCSI protection and handling requirements",
      "Understand supply chain risk management requirements"
    ],
    content: [
      {
        title: "What is BCSI?",
        text: "BES Cyber System Information (BCSI) is information about BES Cyber Systems that could be used to gain unauthorized access or pose a security threat. This includes network diagrams, security configuration information, floor plans showing BES Cyber System locations, and detailed equipment specifications. BCSI must be identified, protected, and properly handled throughout its lifecycle."
      },
      {
        title: "BCSI Protection Requirements",
        text: "BCSI must be protected both in storage and in transit. This means implementing access controls so only authorized personnel can view BCSI, encrypting BCSI when transmitting over public networks, and properly disposing of BCSI when no longer needed. The key is preventing unauthorized access to information that could enable attacks."
      },
      {
        title: "Supply Chain Risk Management",
        text: "CIP-013 requires a supply chain cyber security risk management plan. This plan must address vendor notification of incidents affecting products, coordination of responses to vulnerabilities, verification of software integrity, and authentication of vendor remote access. The goal is to manage risks introduced through your supply chain."
      },
      {
        title: "Vendor Management",
        text: "Your supply chain plan should establish processes for evaluating vendors before procurement, including security practices during the planning and procurement phases. You must also have methods to verify the authenticity and integrity of products you receive and procedures for terminating vendor access when no longer needed."
      }
    ],
    exercise: {
      title: "BCSI Inventory",
      description: "Conduct an inventory of BCSI in your environment. Where are network diagrams stored? Who has access? How are security configurations protected? Document all locations where BCSI exists and verify that appropriate protections are in place. Create an action plan for any gaps."
    },
    quiz: [
      {
        id: 1,
        question: "What is BES Cyber System Information (BCSI)?",
        options: [
          "Public information about the grid",
          "Information that could enable unauthorized access to BES Cyber Systems",
          "Marketing materials about your organization",
          "Employee personal information"
        ],
        correctAnswer: 1,
        explanation: "BCSI is information about BES Cyber Systems that could enable unauthorized access or pose a security threat."
      },
      {
        id: 2,
        question: "What must a supply chain risk management plan address?",
        options: [
          "Only product pricing",
          "Only delivery schedules",
          "Vendor incident notification and vulnerability coordination",
          "Only warranty terms"
        ],
        correctAnswer: 2,
        explanation: "Plans must address vendor incident notification, vulnerability coordination, software integrity, and vendor access."
      },
      {
        id: 3,
        question: "How must BCSI be protected during transmission?",
        options: [
          "No protection is required",
          "Only over internal networks",
          "Encryption when transmitted over public networks",
          "Only during business hours"
        ],
        correctAnswer: 2,
        explanation: "BCSI must be encrypted when transmitted over public networks."
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
