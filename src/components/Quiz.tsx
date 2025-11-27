import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onPass?: () => void;
  passingScore?: number;
  title?: string;
}

export function Quiz({ questions, onPass, passingScore = 0.7, title = "Quiz" }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
    const score = calculateScore();
    const percentage = score / questions.length;
    if (percentage >= passingScore && onPass) {
      onPass();
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= passingScore * 100;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-card rounded-xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold text-navy mb-4">{title}</h3>
      
      {showResults && (
        <div className={cn(
          "mb-6 p-4 rounded-lg border",
          passed 
            ? "bg-success/10 border-success/30" 
            : "bg-destructive/10 border-destructive/30"
        )}>
          <div className="flex items-center gap-3">
            {passed ? (
              <Trophy className="h-6 w-6 text-success" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            <div>
              <p className={cn("font-semibold", passed ? "text-success" : "text-destructive")}>
                Score: {score}/{questions.length} ({percentage}%)
              </p>
              <p className="text-sm text-muted-foreground">
                {passed 
                  ? "Congratulations! You passed the quiz." 
                  : `You need ${Math.round(passingScore * 100)}% to pass. Review the material and try again.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isCorrect = submitted && answers[q.id] === q.correctAnswer;
          const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer;
          
          return (
            <div key={q.id} className="space-y-3">
              <p className="font-medium text-foreground">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  const isCorrectOption = optIndex === q.correctAnswer;
                  
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswer(q.id, optIndex)}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border transition-all text-sm",
                        submitted ? (
                          isCorrectOption
                            ? "bg-success/10 border-success text-success"
                            : isSelected
                              ? "bg-destructive/10 border-destructive text-destructive"
                              : "bg-muted/50 border-border text-muted-foreground"
                        ) : (
                          isSelected
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-muted/50 border-border hover:bg-muted hover:border-border text-muted-foreground"
                        )
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          submitted ? (
                            isCorrectOption
                              ? "bg-success text-success-foreground"
                              : isSelected
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-muted text-muted-foreground"
                          ) : (
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )
                        )}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{option}</span>
                        {submitted && isCorrectOption && (
                          <CheckCircle2 className="h-4 w-4 ml-auto text-success" />
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <XCircle className="h-4 w-4 ml-auto text-destructive" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered} className="flex-1">
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
