import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Trophy,
  Target
} from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "Do you have a designated CIP Senior Manager with documented delegation of authority?",
    category: "CIP-003"
  },
  {
    id: 2,
    question: "Can you produce a complete inventory of all BES Cyber Systems with their impact ratings?",
    category: "CIP-002"
  },
  {
    id: 3,
    question: "Do all personnel with access to BES Cyber Systems complete CIP training before being granted access?",
    category: "CIP-004"
  },
  {
    id: 4,
    question: "Is there documented evidence of quarterly access reviews for all High and Medium impact BES Cyber Systems?",
    category: "CIP-004"
  },
  {
    id: 5,
    question: "Can you produce a network diagram showing all Electronic Security Perimeter boundaries?",
    category: "CIP-005"
  },
  {
    id: 6,
    question: "Do you have documented baseline configurations for all in-scope cyber assets?",
    category: "CIP-010"
  },
  {
    id: 7,
    question: "Are security patches assessed within 35 days of availability with documented disposition?",
    category: "CIP-007"
  },
  {
    id: 8,
    question: "Is there evidence of monthly security log reviews with documented findings?",
    category: "CIP-007"
  },
  {
    id: 9,
    question: "Has your incident response plan been tested within the last 15 months?",
    category: "CIP-008"
  },
  {
    id: 10,
    question: "Can you demonstrate that recovery plans have been tested for all High and Medium impact systems?",
    category: "CIP-009"
  },
  {
    id: 11,
    question: "Do you have a formal change management process for all BES Cyber System changes?",
    category: "CIP-010"
  },
  {
    id: 12,
    question: "Is BES Cyber System Information (BCSI) identified, labeled, and protected throughout its lifecycle?",
    category: "CIP-011"
  },
  {
    id: 13,
    question: "Do you have supply chain risk management procedures for procurement of industrial control systems?",
    category: "CIP-013"
  },
  {
    id: 14,
    question: "Can personnel changes result in access revocation within 24 hours?",
    category: "CIP-004"
  },
  {
    id: 15,
    question: "Is there a documented process for managing visitors within Physical Security Perimeters?",
    category: "CIP-006"
  }
];

const scoreBands = [
  {
    min: 0,
    max: 5,
    title: "Critical Gaps Identified",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    guidance: "Your organization has significant compliance gaps that need immediate attention. Many fundamental CIP requirements appear to be missing or undocumented. We recommend starting with the Audit Journey baseline assessment and prioritizing the NERC CIP 101 training to understand requirements before building your compliance program."
  },
  {
    min: 6,
    max: 10,
    title: "Foundation Building Needed",
    icon: Target,
    color: "text-amber",
    bgColor: "bg-amber/10",
    borderColor: "border-amber/30",
    guidance: "Your organization has some compliance elements in place but gaps remain in key areas. Focus on strengthening your evidence collection practices and ensuring recurring requirements are consistently met. The Evidence Lab and Role-Based Training modules will help you build sustainable processes."
  },
  {
    min: 11,
    max: 15,
    title: "Strong Foundation",
    icon: Trophy,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    guidance: "Your organization demonstrates solid CIP compliance fundamentals. Focus now on continuous improvement—conducting mock audits to test your processes, refining your evidence organization, and ensuring all personnel understand their specific responsibilities. You are well-positioned for audit success."
  }
];

const checklistSections = [
  {
    title: "Overall NERC CIP Readiness Checklist",
    items: [
      "BES Cyber System inventory is complete and current",
      "CIP Senior Manager delegation is documented and current",
      "All required policies are approved within the last 15 months",
      "Evidence repository is organized by CIP requirement",
      "All personnel have completed required CIP training",
      "Recurring task schedule is established and tracked",
      "Change management process is documented and followed",
      "Incident response plan has been tested",
      "Recovery plans have been tested for all applicable systems"
    ]
  },
  {
    title: "Audit Week Preparation Checklist",
    items: [
      "Audit room is prepared with necessary equipment",
      "All potential interviewees have been briefed",
      "Single point of contact for auditors is designated",
      "Evidence packages are pre-staged for common requests",
      "Daily debrief schedule is established",
      "Contact list for all SMEs is current",
      "Backup evidence retrieval process is in place"
    ]
  }
];

export default function SelfAssessment() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter(Boolean).length;
  };

  const getScoreBand = (score: number) => {
    return scoreBands.find(band => score >= band.min && score <= band.max) || scoreBands[0];
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const scoreBand = getScoreBand(score);
  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === quizQuestions.length;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Self-Assessment & Checklists
            </h1>
            <p className="text-lg text-muted-foreground">
              Take our quick readiness assessment to identify gaps, then use our checklists 
              to track your progress toward audit confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">CIP Readiness Assessment</h2>
            
            {!showResults ? (
              <>
                <p className="text-muted-foreground mb-8">
                  Answer honestly—this assessment is for your benefit. Can you confidently say yes 
                  to each of these questions?
                </p>

                <div className="space-y-4 mb-8">
                  {quizQuestions.map((q) => (
                    <div 
                      key={q.id} 
                      className={cn(
                        "bg-card rounded-xl border p-4 transition-all",
                        answers[q.id] === true 
                          ? "border-success/50 bg-success/5" 
                          : answers[q.id] === false 
                          ? "border-destructive/50 bg-destructive/5"
                          : "border-border/50"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
                          {q.id}
                        </span>
                        <div className="flex-1">
                          <p className="text-foreground font-medium mb-3">{q.question}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAnswer(q.id, true)}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                answers[q.id] === true
                                  ? "bg-success text-success-foreground"
                                  : "bg-muted hover:bg-success/20 text-muted-foreground hover:text-success"
                              )}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Yes
                            </button>
                            <button
                              onClick={() => handleAnswer(q.id, false)}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                answers[q.id] === false
                                  ? "bg-destructive text-destructive-foreground"
                                  : "bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
                              )}
                            >
                              <XCircle className="h-4 w-4" />
                              No
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground mt-2 inline-block">
                            {q.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {answeredCount} of {quizQuestions.length} answered
                  </span>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!canSubmit}
                    size="lg"
                  >
                    See Results
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {/* Score Display */}
                <div className={cn(
                  "rounded-xl border p-8 text-center",
                  scoreBand.bgColor,
                  scoreBand.borderColor
                )}>
                  <scoreBand.icon className={cn("h-12 w-12 mx-auto mb-4", scoreBand.color)} />
                  <div className="text-5xl font-bold text-navy mb-2">
                    {score} / {quizQuestions.length}
                  </div>
                  <h3 className={cn("text-xl font-semibold mb-4", scoreBand.color)}>
                    {scoreBand.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {scoreBand.guidance}
                  </p>
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Checklists Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">Downloadable Checklists</h2>
            <p className="text-muted-foreground mb-8">
              Use these checklists to track your compliance activities and prepare for audits. 
              Print them out or use them as reference guides.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {checklistSections.map((section) => (
                <div key={section.title} className="bg-card rounded-xl border border-border/50 p-6">
                  <h3 className="font-semibold text-navy mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded border-2 border-border shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
