import { useState } from "react";
import { Link } from "react-router-dom";
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
  Target,
  Shield,
  FolderSearch,
  Building
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  category: "governance" | "technical" | "evidence";
}

const questions: Question[] = [
  // Governance & Scope (5 questions)
  { id: 1, question: "Do you have a designated CIP Senior Manager with documented delegation of authority?", category: "governance" },
  { id: 2, question: "Can you produce a complete inventory of all BES Cyber Systems with their impact ratings?", category: "governance" },
  { id: 3, question: "Are all cyber security policies reviewed and approved within the last 15 months?", category: "governance" },
  { id: 4, question: "Is there clear documentation of which CIP requirements apply to your organization?", category: "governance" },
  { id: 5, question: "Are roles and responsibilities for CIP compliance clearly defined and communicated?", category: "governance" },
  // Technical Controls (5 questions)
  { id: 6, question: "Are security patches assessed within 35 days of availability with documented disposition?", category: "technical" },
  { id: 7, question: "Is there evidence of monthly security log reviews with documented findings?", category: "technical" },
  { id: 8, question: "Can you demonstrate that all in-scope systems have documented baseline configurations?", category: "technical" },
  { id: 9, question: "Has your incident response plan been tested within the last 15 months?", category: "technical" },
  { id: 10, question: "Are all Electronic Security Perimeter access points documented and monitored?", category: "technical" },
  // Evidence & Audit Readiness (5 questions)
  { id: 11, question: "Is your evidence organized by CIP requirement in a structure auditors can follow?", category: "evidence" },
  { id: 12, question: "Can you retrieve any piece of compliance evidence in under 2 minutes?", category: "evidence" },
  { id: 13, question: "Have you conducted a mock audit or internal assessment in the past year?", category: "evidence" },
  { id: 14, question: "Does evidence include dates, responsible parties, and clear proof of compliance?", category: "evidence" },
  { id: 15, question: "Do you have pre-staged evidence packages ready for common audit requests?", category: "evidence" }
];

const categoryInfo = {
  governance: { name: "Governance & Scope", icon: Building, color: "text-primary", modules: [1, 2, 3] },
  technical: { name: "Technical Controls", icon: Shield, color: "text-accent", modules: [5, 6, 7, 8] },
  evidence: { name: "Evidence & Audit Readiness", icon: FolderSearch, color: "text-success", modules: [6, 9, 10] }
};

export default function SelfAssessment() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateCategoryScores = () => {
    const scores: Record<string, { yes: number; total: number }> = {
      governance: { yes: 0, total: 0 },
      technical: { yes: 0, total: 0 },
      evidence: { yes: 0, total: 0 }
    };
    
    questions.forEach(q => {
      scores[q.category].total++;
      if (answers[q.id] === true) scores[q.category].yes++;
    });
    
    return scores;
  };

  const getLowestCategory = () => {
    const scores = calculateCategoryScores();
    let lowest = "governance";
    let lowestPercent = 100;
    
    Object.entries(scores).forEach(([cat, { yes, total }]) => {
      const percent = (yes / total) * 100;
      if (percent < lowestPercent) {
        lowestPercent = percent;
        lowest = cat;
      }
    });
    
    return lowest as keyof typeof categoryInfo;
  };

  const handleSubmit = () => setShowResults(true);
  const handleReset = () => { setAnswers({}); setShowResults(false); };

  const totalScore = Object.values(answers).filter(Boolean).length;
  const categoryScores = calculateCategoryScores();
  const lowestCategory = getLowestCategory();
  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === questions.length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Self-Assessment</h1>
            <p className="text-lg text-muted-foreground">
              This diagnostic helps identify gaps in your NERC CIP program across three key areas.
              Answer honestly—this is for your benefit, not a formal audit.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {!showResults ? (
              <>
                {(["governance", "technical", "evidence"] as const).map((category) => {
                  const info = categoryInfo[category];
                  const categoryQuestions = questions.filter(q => q.category === category);
                  
                  return (
                    <div key={category} className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <info.icon className={cn("h-5 w-5", info.color)} />
                        <h2 className="text-lg font-semibold text-navy">{info.name}</h2>
                      </div>
                      <div className="space-y-3">
                        {categoryQuestions.map((q) => (
                          <div 
                            key={q.id} 
                            className={cn(
                              "bg-card rounded-xl border p-4 transition-all",
                              answers[q.id] === true ? "border-success/50 bg-success/5" 
                                : answers[q.id] === false ? "border-destructive/50 bg-destructive/5"
                                : "border-border/50"
                            )}
                          >
                            <p className="text-foreground mb-3">{q.question}</p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAnswer(q.id, true)}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                  answers[q.id] === true
                                    ? "bg-success text-success-foreground"
                                    : "bg-muted hover:bg-success/20 text-muted-foreground"
                                )}
                              >
                                <CheckCircle2 className="h-4 w-4" /> Yes
                              </button>
                              <button
                                onClick={() => handleAnswer(q.id, false)}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                  answers[q.id] === false
                                    ? "bg-destructive text-destructive-foreground"
                                    : "bg-muted hover:bg-destructive/20 text-muted-foreground"
                                )}
                              >
                                <XCircle className="h-4 w-4" /> No
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{answeredCount} of {questions.length} answered</span>
                  <Button onClick={handleSubmit} disabled={!canSubmit} size="lg">
                    See Results <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className={cn(
                  "rounded-xl border p-8 text-center",
                  totalScore >= 12 ? "bg-success/10 border-success/30" 
                    : totalScore >= 8 ? "bg-warning/10 border-warning/30" 
                    : "bg-destructive/10 border-destructive/30"
                )}>
                  {totalScore >= 12 ? <Trophy className="h-12 w-12 text-success mx-auto mb-4" />
                    : totalScore >= 8 ? <Target className="h-12 w-12 text-warning mx-auto mb-4" />
                    : <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />}
                  <div className="text-5xl font-bold text-navy mb-2">{totalScore} / {questions.length}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {totalScore >= 12 ? "Strong Foundation" : totalScore >= 8 ? "Building Progress" : "Gaps Identified"}
                  </h3>
                </div>

                {/* Category Breakdown */}
                <div className="grid md:grid-cols-3 gap-4">
                  {(["governance", "technical", "evidence"] as const).map((cat) => {
                    const info = categoryInfo[cat];
                    const { yes, total } = categoryScores[cat];
                    const percent = Math.round((yes / total) * 100);
                    
                    return (
                      <div key={cat} className={cn(
                        "bg-card rounded-xl border p-4 text-center",
                        cat === lowestCategory ? "border-warning border-2" : "border-border/50"
                      )}>
                        <info.icon className={cn("h-6 w-6 mx-auto mb-2", info.color)} />
                        <h4 className="font-semibold text-navy text-sm mb-1">{info.name}</h4>
                        <p className="text-2xl font-bold text-navy">{yes}/{total}</p>
                        <p className="text-xs text-muted-foreground">{percent}%</p>
                        {cat === lowestCategory && (
                          <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded mt-2 inline-block">
                            Focus Area
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Recommendations */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h4 className="font-semibold text-navy mb-3">Recommended Next Steps</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your lowest scoring area ({categoryInfo[lowestCategory].name}), we recommend:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categoryInfo[lowestCategory].modules.map(m => (
                      <Link key={m} to={`/modules#module-${m}`} className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm hover:bg-primary/90">
                        Module {m}
                      </Link>
                    ))}
                  </div>
                  {lowestCategory === "evidence" && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Also visit the <Link to="/evidence-lab" className="text-primary hover:underline font-medium">Evidence Lab</Link> for 
                      hands-on guidance on organizing and strengthening your evidence practices.
                    </p>
                  )}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Ready to create an action plan based on your assessment?
                    </p>
                    <Link 
                      to="/readiness-plan"
                      className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                    >
                      Build Your Readiness Plan <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" /> Retake Assessment
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
