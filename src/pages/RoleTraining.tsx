import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Quiz, QuizQuestion } from "@/components/Quiz";
import { cn } from "@/lib/utils";
import { 
  ClipboardList, 
  Monitor, 
  ShieldCheck, 
  Users, 
  Briefcase,
  CheckSquare,
  Clock,
  Lightbulb,
  MessageSquare
} from "lucide-react";

interface RoleData {
  id: string;
  icon: typeof ClipboardList;
  title: string;
  description: string;
  topFive: string[];
  recurring: string[];
  thisWeek: string[];
  scenario: {
    story: string;
    questions: string[];
  };
  quiz: QuizQuestion[];
  recommendedModules: { id: number; title: string }[];
}

const roles: RoleData[] = [
  {
    id: "compliance-manager",
    icon: ClipboardList,
    title: "Compliance Manager",
    description: "The Compliance Manager is the central coordinator of all CIP activities. You are responsible for maintaining the overall compliance program, ensuring evidence is collected, tracking deadlines, and serving as the primary liaison with auditors and regional entities.",
    topFive: [
      "Know every applicable CIP requirement for your registration and which team member owns each one",
      "Understand the evidence lifecycle—from creation to retention to disposal",
      "Master your evidence management system so you can retrieve any document in minutes",
      "Build relationships with regional entity contacts before audit time",
      "Maintain a compliance calendar that tracks all recurring requirements and deadlines"
    ],
    recurring: [
      "Review evidence collection status weekly",
      "Verify all periodic tasks are completed on schedule",
      "Update the compliance calendar with any changes",
      "Coordinate with department heads on upcoming requirements",
      "Monitor regulatory updates and assess impacts",
      "Prepare monthly compliance status reports for leadership"
    ],
    thisWeek: [
      "Audit your evidence folders—are all required documents present and properly named?",
      "Confirm next month's recurring tasks are assigned with clear owners",
      "Schedule a check-in with one department to review their CIP responsibilities"
    ],
    scenario: {
      story: "An auditor contacts you requesting evidence for CIP-007 R2 patch management for the past 6 months. You have 48 hours to compile the evidence package. Your IT team informs you that patch assessment documentation for Q2 is incomplete—some assessments were performed but not fully documented.",
      questions: [
        "What evidence would you pull first to respond to this request?",
        "How would you address the documentation gap for Q2?",
        "Who else in your organization needs to be involved in preparing this response?"
      ]
    },
    quiz: [
      { id: 1, question: "How often should you review evidence collection status?", options: ["Daily", "Weekly", "Monthly", "Quarterly"], correctAnswer: 1 },
      { id: 2, question: "What is the primary role of the Compliance Manager during an audit?", options: ["Technical support", "Primary liaison with auditors", "Physical security", "IT administration"], correctAnswer: 1 },
      { id: 3, question: "Why is a compliance calendar important?", options: ["For vacation tracking", "To track recurring requirements and deadlines", "For budget planning", "For employee reviews"], correctAnswer: 1 }
    ],
    recommendedModules: [
      { id: 1, title: "Foundations of NERC and CIP" },
      { id: 3, title: "Governance & Program Management" },
      { id: 7, title: "Incident Response & Recovery" },
      { id: 9, title: "Information Protection & Supply Chain" },
      { id: 10, title: "Audit Simulation & Continuous Improvement" }
    ]
  },
  {
    id: "it-ot-engineer",
    icon: Monitor,
    title: "IT/OT Engineer",
    description: "IT and OT Engineers are responsible for implementing and maintaining the technical controls required by CIP standards. This includes network security, system hardening, patch management, logging, and change control for all BES Cyber Systems.",
    topFive: [
      "Understand exactly which systems are in scope as BES Cyber Systems or Protected Cyber Assets",
      "Know the baseline configurations for every in-scope device and how changes are authorized",
      "Master the patch management timeline—35 days to assess, then mitigate or implement",
      "Understand ESP boundaries and how to document all access points",
      "Know what logs must be retained, for how long, and how to prove you reviewed them"
    ],
    recurring: [
      "Review security logs at least monthly (more frequently for High impact)",
      "Assess new patches within 35 days of release",
      "Document all configuration changes through the change management process",
      "Verify baseline configurations match actual system states",
      "Test backup and recovery procedures per the required schedule",
      "Update network diagrams when any ESP changes occur"
    ],
    thisWeek: [
      "Verify your most recent log review is documented with findings",
      "Check if any patches are approaching the 35-day assessment deadline",
      "Confirm your ESP network diagram reflects current architecture"
    ],
    scenario: {
      story: "A critical security patch is released for your SCADA system on a Monday. The vendor rates it as critical due to active exploitation in the wild. Your change management process typically requires a 2-week testing period, but the 35-day assessment clock is now ticking.",
      questions: [
        "What is your first step upon learning about this patch?",
        "How do you balance the urgency of the vulnerability against change management requirements?",
        "What documentation must you create regardless of whether you implement immediately or mitigate?"
      ]
    },
    quiz: [
      { id: 1, question: "Within how many days must security patches be assessed?", options: ["15 days", "30 days", "35 days", "60 days"], correctAnswer: 2 },
      { id: 2, question: "How long must security logs be retained?", options: ["30 days", "60 days", "90 days", "1 year"], correctAnswer: 2 },
      { id: 3, question: "When must baseline documentation be updated after a change?", options: ["Immediately", "Within 30 days", "Within 60 days", "At next audit"], correctAnswer: 1 }
    ],
    recommendedModules: [
      { id: 1, title: "Foundations of NERC and CIP" },
      { id: 2, title: "Asset Identification & Scope" },
      { id: 5, title: "Electronic & Physical Perimeters" },
      { id: 6, title: "System Security & Patching" },
      { id: 7, title: "Incident Response & Recovery" },
      { id: 8, title: "Configuration & Vulnerability Management" }
    ]
  },
  {
    id: "physical-security",
    icon: ShieldCheck,
    title: "Physical Security",
    description: "Physical Security personnel manage access to Physical Security Perimeters (PSPs), monitor physical access logs, maintain visitor management programs, and ensure that physical protection systems are operational and tested.",
    topFive: [
      "Know the boundaries of every PSP and PACS in your environment",
      "Understand authorized access lists and the process for adding or removing individuals",
      "Master visitor management—escorts, logging, and badge procedures",
      "Know testing requirements for physical access control systems",
      "Understand the 24-hour access revocation requirement for personnel changes"
    ],
    recurring: [
      "Review physical access logs for unauthorized attempts",
      "Verify all PSP access lists are current and accurate",
      "Test physical access control systems per required schedule",
      "Update visitor logs and ensure proper escort documentation",
      "Coordinate with HR on personnel changes affecting access",
      "Inspect PSP boundaries for any unauthorized entry points"
    ],
    thisWeek: [
      "Pull a sample of recent visitor logs and verify proper documentation",
      "Confirm your PSP access list matches currently authorized personnel",
      "Check that the last PACS test is documented and within schedule"
    ],
    scenario: {
      story: "A contractor arrives at your control center for scheduled maintenance on an HMI system. The contractor claims they were added to the access list last week, but their name does not appear in your system. The maintenance is time-sensitive and operations is expecting them.",
      questions: [
        "What is your immediate response to this situation?",
        "How do you verify the contractor's authorization without delaying critical work?",
        "What documentation is required if you allow the contractor access as a visitor?"
      ]
    },
    quiz: [
      { id: 1, question: "How must visitors be managed within a PSP?", options: ["Sign in and roam freely", "Continuous escort required", "Badge and go", "No visitors allowed"], correctAnswer: 1 },
      { id: 2, question: "How quickly must physical access be revoked after termination?", options: ["Immediately", "24 hours", "7 days", "30 days"], correctAnswer: 1 },
      { id: 3, question: "What must visitor logs include?", options: ["Just the visitor name", "Entry/exit times, visitor name, escort name", "Badge number only", "Company name only"], correctAnswer: 1 }
    ],
    recommendedModules: [
      { id: 1, title: "Foundations of NERC and CIP" },
      { id: 2, title: "Asset Identification & Scope" },
      { id: 5, title: "Electronic & Physical Perimeters" },
      { id: 7, title: "Incident Response & Recovery" }
    ]
  },
  {
    id: "hr-training",
    icon: Users,
    title: "HR & Training",
    description: "HR and Training teams ensure that all personnel with access to BES Cyber Systems complete required training, undergo personnel risk assessments, and have access revoked appropriately when their roles change or they leave the organization.",
    topFive: [
      "Know which positions require CIP training and personnel risk assessments",
      "Understand the training timeline—training must occur before granting access",
      "Master the 24-hour access revocation process for terminations",
      "Know the 7-day timeline for reporting personnel risk assessment issues",
      "Maintain records that prove training completion dates and content"
    ],
    recurring: [
      "Track training completion and flag personnel approaching deadlines",
      "Process access revocations within 24 hours of notification",
      "Initiate personnel risk assessments for new hires and role changes",
      "Update training materials when CIP requirements change",
      "Coordinate with department managers on training schedules",
      "Maintain training records with dates, content, and completion evidence"
    ],
    thisWeek: [
      "Review the list of personnel due for annual training renewal",
      "Verify recent terminations had access revoked within 24 hours",
      "Confirm training records include specific content covered, not just attendance"
    ],
    scenario: {
      story: "On Friday at 4:30 PM, you receive notification that a system administrator with access to High impact BES Cyber Systems has been terminated effective immediately due to a policy violation. IT has already left for the day. The 24-hour clock is now running.",
      questions: [
        "What is your immediate first action upon receiving this notification?",
        "How do you ensure all electronic and physical access is revoked within 24 hours?",
        "What documentation must you create to demonstrate timely revocation?"
      ]
    },
    quiz: [
      { id: 1, question: "When must CIP training be completed?", options: ["Within 30 days of access", "Before access is granted", "Within the first year", "During annual review"], correctAnswer: 1 },
      { id: 2, question: "How far back must personnel risk assessments check?", options: ["3 years", "5 years", "7 years", "10 years"], correctAnswer: 2 },
      { id: 3, question: "What is the access revocation timeline for terminations?", options: ["Immediately", "24 hours", "48 hours", "1 week"], correctAnswer: 1 }
    ],
    recommendedModules: [
      { id: 1, title: "Foundations of NERC and CIP" },
      { id: 3, title: "Governance & Program Management" },
      { id: 4, title: "People & Training" }
    ]
  },
  {
    id: "leadership",
    icon: Briefcase,
    title: "Leadership",
    description: "Leadership provides strategic oversight, ensures adequate resources for compliance activities, designates the CIP Senior Manager, and maintains awareness of compliance status and risks that could affect the organization.",
    topFive: [
      "Know who your designated CIP Senior Manager is and their specific responsibilities",
      "Understand the potential financial and operational impacts of non-compliance",
      "Recognize that leadership awareness and support is itself a compliance requirement",
      "Ensure the compliance program has adequate budget and staffing",
      "Understand the importance of a culture that prioritizes security and compliance"
    ],
    recurring: [
      "Review monthly compliance status reports from the Compliance Manager",
      "Ensure the CIP Senior Manager delegation is current and documented",
      "Approve cyber security policies at required intervals",
      "Allocate resources for identified compliance gaps",
      "Stay informed about significant regulatory changes",
      "Champion compliance culture in organizational communications"
    ],
    thisWeek: [
      "Confirm your CIP Senior Manager delegation letter is current",
      "Review the latest compliance readiness score with your Compliance Manager",
      "Ask your team: do they have the resources needed for current compliance activities?"
    ],
    scenario: {
      story: "Your Compliance Manager presents the quarterly compliance report showing that your organization is at risk of missing the 15-month policy review deadline. The CIP Senior Manager has been on extended leave, and the backup delegate's authority expired last month. The audit notification just arrived for next quarter.",
      questions: [
        "What is the most urgent compliance issue in this scenario?",
        "How do you address the CIP Senior Manager delegation gap?",
        "What resources or decisions might be needed to resolve the policy review deadline?"
      ]
    },
    quiz: [
      { id: 1, question: "How often must cyber security policies be reviewed?", options: ["Every 6 months", "Every 12 months", "Every 15 months", "Every 24 months"], correctAnswer: 2 },
      { id: 2, question: "Can the CIP Senior Manager delegate their accountability?", options: ["Yes, to anyone", "Yes, to executives only", "No, accountability cannot be delegated", "Only during audits"], correctAnswer: 2 },
      { id: 3, question: "Why is leadership support a compliance requirement?", options: ["It's not required", "CIP-003 requires designated senior management", "Only for large utilities", "Only during audits"], correctAnswer: 1 }
    ],
    recommendedModules: [
      { id: 1, title: "Foundations of NERC and CIP" },
      { id: 3, title: "Governance & Program Management" },
      { id: 10, title: "Audit Simulation & Continuous Improvement" }
    ]
  }
];

export default function RoleTraining() {
  const [activeRole, setActiveRole] = useState(roles[0].id);
  const currentRole = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Role-Based Training</h1>
            <p className="text-lg text-muted-foreground">
              Every role in your organization has specific NERC CIP responsibilities. 
              Select your role to see what you need to know and do.
            </p>
          </div>
        </div>
      </section>

      {/* Role Selector */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all",
                  activeRole === role.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <role.icon className="h-4 w-4" />
                {role.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Role Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Role Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <currentRole.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">{currentRole.title}</h2>
                <p className="text-muted-foreground">{currentRole.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top 5 Things */}
              <div className="bg-card rounded-xl border border-border/50 p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber" />
                  <h3 className="text-lg font-semibold text-navy">Top 5 Things to Understand</h3>
                </div>
                <ol className="space-y-3">
                  {currentRole.topFive.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Recurring Responsibilities */}
              <div className="bg-card rounded-xl border border-border/50 p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-navy">Recurring Responsibilities</h3>
                </div>
                <ul className="space-y-2">
                  {currentRole.recurring.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckSquare className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border border-accent/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-navy">3 Things to Do This Week</h3>
              </div>
              <ul className="space-y-3">
                {currentRole.thisWeek.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded bg-accent text-accent-foreground flex items-center justify-center shrink-0 text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scenario */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold text-navy">Role Scenario</h3>
              </div>
              <p className="text-muted-foreground mb-4">{currentRole.scenario.story}</p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-navy mb-2">Reflection Questions:</h4>
                <ol className="space-y-2">
                  {currentRole.scenario.questions.map((q, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="font-medium">{i + 1}.</span> {q}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Quiz */}
            <Quiz 
              questions={currentRole.quiz} 
              title={`${currentRole.title} Quiz`}
            />

            {/* Recommended Modules */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-navy mb-3">Recommended Modules for {currentRole.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These modules cover the key CIP requirements most relevant to your role:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentRole.recommendedModules.map((mod) => (
                  <Link
                    key={mod.id}
                    to={`/modules#module-${mod.id}`}
                    className="inline-flex items-center gap-2 bg-card border border-border/50 rounded-lg px-3 py-2 text-sm hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {mod.id}
                    </span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {mod.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
