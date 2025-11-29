import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  ClipboardCheck,
  Lightbulb,
  Play,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Target
} from "lucide-react";

interface DialogueScenario {
  id: string;
  category: string;
  cipArea: string;
  auditorQuestion: string;
  goodResponse: {
    text: string;
    explanation: string;
  };
  poorResponse: {
    text: string;
    issues: string[];
  };
}

const dialogueScenarios: DialogueScenario[] = [
  {
    id: "patch-assessment",
    category: "Technical",
    cipArea: "CIP-007 R2",
    auditorQuestion: "Walk me through your patch assessment process for BES Cyber Systems.",
    goodResponse: {
      text: "We have a documented patch assessment procedure. When a security patch is released by a tracked vendor, we evaluate it within 35 days for applicability to our BES Cyber Systems. Our Patch Tracker documents each patch, the systems affected, our assessment date, and disposition—implement, mitigate, or not applicable. I can show you our tracker and the supporting procedure document.",
      explanation: "This response is structured, references specific evidence, cites the timeline requirement, and offers to demonstrate compliance."
    },
    poorResponse: {
      text: "We handle patches as they come in. IT monitors vendor sites and we try to install them during maintenance windows. We've been pretty good about it lately, though we had some backlogs last year due to staffing.",
      issues: [
        "Vague and lacks reference to documented procedures",
        "\"Pretty good\" and \"try to\" suggest inconsistency",
        "Volunteers negative information about past backlogs",
        "No mention of assessment timeline or documentation"
      ]
    }
  },
  {
    id: "access-revocation",
    category: "Personnel",
    cipArea: "CIP-004 R5",
    auditorQuestion: "How do you ensure access is revoked within 24 hours when someone leaves the organization?",
    goodResponse: {
      text: "We have an integrated termination process that triggers automatic notifications to IT and Physical Security. Within 24 hours of HR confirming termination, we revoke both logical and physical access. Our Access Revocation Log documents the termination notification time and the revocation completion time for each system. Would you like to see a sample of our recent termination records?",
      explanation: "Demonstrates a defined process, mentions specific systems involved, references documentation, and offers evidence."
    },
    poorResponse: {
      text: "HR sends us an email when someone leaves and we disable their accounts. It usually happens pretty quickly, same day most of the time. We've had a few cases where it took a bit longer because the notification was delayed.",
      issues: [
        "\"Pretty quickly\" and \"most of the time\" lack precision",
        "Admits to cases where timing requirements may have been missed",
        "Doesn't mention documentation or tracking",
        "No reference to physical access revocation"
      ]
    }
  },
  {
    id: "incident-reporting",
    category: "Incident Response",
    cipArea: "CIP-008 R1",
    auditorQuestion: "What criteria do you use to determine if an incident is reportable to ES-ISAC?",
    goodResponse: {
      text: "Our Incident Response Plan includes specific criteria for Reportable Cyber Security Incidents based on NERC's definition. We assess whether the incident compromised or disrupted a BES Cyber System, ESP, or associated EACMS. Our Incident Classification Checklist guides responders through this determination. When we classify an incident as reportable, we submit to ES-ISAC within the required timeframe and document the notification in our incident record.",
      explanation: "References the plan, explains the criteria, mentions the classification process, and addresses reporting documentation."
    },
    poorResponse: {
      text: "If something serious happens that affects our control systems, we report it. Our security team makes the call on whether it's bad enough to report externally. We haven't had anything major, so we haven't had to report anything yet.",
      issues: [
        "\"Something serious\" and \"bad enough\" are subjective",
        "No mention of documented criteria or procedures",
        "\"Haven't had anything major\" could prompt questions about detection capability",
        "No reference to ES-ISAC or reporting timeframes"
      ]
    }
  },
  {
    id: "esp-documentation",
    category: "Technical",
    cipArea: "CIP-005 R1",
    auditorQuestion: "Show me how you document your Electronic Security Perimeter.",
    goodResponse: {
      text: "Our ESP documentation includes network diagrams showing the logical boundary, all access points, and the protective devices at each point. Here is our current diagram, dated and version-controlled. Each External Routable Connectivity point is identified with the associated firewall rules. We update this documentation within 35 days of any changes per our Change Management procedure.",
      explanation: "Provides the requested evidence, mentions version control, addresses all ESP components, and references update procedures."
    },
    poorResponse: {
      text: "We have network diagrams that IT maintains. They should be up to date—we did a major update after last year's infrastructure project. The firewalls are configured to only allow approved traffic.",
      issues: [
        "\"Should be up to date\" expresses uncertainty",
        "Doesn't present the actual documentation",
        "No mention of version control or review cycle",
        "Vague about firewall rule documentation"
      ]
    }
  },
  {
    id: "training-records",
    category: "Personnel",
    cipArea: "CIP-004 R2",
    auditorQuestion: "How do you track that personnel complete required CIP training before receiving access?",
    goodResponse: {
      text: "Our Training Matrix tracks all personnel requiring CIP training, their required training modules, completion dates, and next renewal dates. Before any access is provisioned, our Access Request Form requires verification that the individual has completed applicable training—this is a checkbox that blocks approval if training isn't current. I can show you the training matrix and a sample access request demonstrating this workflow.",
      explanation: "Explains the tracking system, describes the control preventing access without training, and offers to demonstrate with evidence."
    },
    poorResponse: {
      text: "Everyone goes through training when they're hired. We use our LMS to track it. If someone needs access, they should have done their training already. I think we run reports periodically to check.",
      issues: [
        "\"Should have\" suggests no verification control",
        "\"I think\" expresses uncertainty about the process",
        "No mention of pre-access verification",
        "Doesn't address the ongoing 15-month training requirement"
      ]
    }
  }
];

const keyPrinciples = [
  {
    title: "Answer Only the Question",
    description: "Listen carefully. Provide a complete but focused answer. Don't elaborate beyond what's asked.",
    icon: Target,
    examples: [
      "If asked about patch timing, don't volunteer information about past system issues",
      "If asked about a specific control, don't expand to discuss related areas unprompted"
    ]
  },
  {
    title: "The 'I Don't Know' Protocol",
    description: "It's acceptable—even professional—to acknowledge when you don't have an answer. Never guess.",
    icon: AlertTriangle,
    scriptExample: "I don't have that information available right now, but I can find out. Would it be acceptable if I provide that by [specific time]?"
  },
  {
    title: "Reference Your Evidence",
    description: "Frame responses around documented procedures and evidence. Show, don't just tell.",
    icon: ClipboardCheck,
    examples: [
      "\"Our procedure document specifies...\"",
      "\"The tracker shows that on [date]...\"",
      "\"Would you like to see the evidence for that?\""
    ]
  },
  {
    title: "Defer When Appropriate",
    description: "If a question is outside your expertise or involves policy interpretation, defer to the right person.",
    icon: Users,
    scriptExample: "That's a great question. For the policy interpretation aspect, I'd like to have our Compliance Manager speak to that. Can we schedule a follow-up?"
  }
];

const entranceExitMeetings = {
  entrance: {
    title: "Entrance Meeting Best Practices",
    description: "The entrance meeting sets the tone for the entire audit. Be prepared, professional, and welcoming.",
    tips: [
      "Have the CIP Senior Manager or delegate open the meeting",
      "Provide a brief company overview and CIP program summary",
      "Introduce key SMEs and their areas of responsibility",
      "Review the audit schedule and logistics",
      "Clarify communication protocols (single point of contact preferred)",
      "Confirm evidence submission process and response timeframes",
      "Address any questions about facility access or safety requirements"
    ],
    donts: [
      "Don't make excuses about program gaps before questions are asked",
      "Don't promise things you can't deliver",
      "Don't overwhelm auditors with unnecessary detail"
    ]
  },
  exit: {
    title: "Exit Meeting Best Practices",
    description: "The exit meeting provides preliminary findings. Stay professional even if findings are unexpected.",
    tips: [
      "Thank the audit team for their professionalism",
      "Take detailed notes on all preliminary findings",
      "Ask clarifying questions about any findings you don't understand",
      "Request specific evidence or documentation that led to findings",
      "Discuss timeline for formal report and response window",
      "Identify any opportunities for immediate clarification",
      "Debrief your team immediately after auditors leave"
    ],
    donts: [
      "Don't argue with findings in the exit meeting",
      "Don't commit to mitigation approaches on the spot",
      "Don't express frustration or disappointment visibly"
    ]
  }
};

const interviewChecklist = [
  { id: "review-rsaw", text: "Review RSAW requirements for your area before the interview", category: "Before" },
  { id: "gather-evidence", text: "Have relevant evidence readily accessible (digital or physical)", category: "Before" },
  { id: "know-procedures", text: "Know where your documented procedures are located", category: "Before" },
  { id: "identify-backup", text: "Identify backup SME in case questions exceed your expertise", category: "Before" },
  { id: "bring-notes", text: "Bring a notepad to write down questions for follow-up", category: "During" },
  { id: "listen-fully", text: "Listen to the complete question before responding", category: "During" },
  { id: "pause-think", text: "Pause and think before answering—silence is acceptable", category: "During" },
  { id: "reference-evidence", text: "Reference specific evidence when possible", category: "During" },
  { id: "document-questions", text: "Document any questions you couldn't answer immediately", category: "After" },
  { id: "follow-up", text: "Provide promised follow-up information within agreed timeframe", category: "After" },
  { id: "debrief", text: "Debrief with your compliance team about interview topics", category: "After" }
];

export default function SoftSkillsTraining() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedTab, setSelectedTab] = useState("good");

  const currentScenario = dialogueScenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex + 1) / dialogueScenarios.length) * 100;

  const nextScenario = () => {
    setShowAnswer(false);
    setSelectedTab("good");
    setCurrentScenarioIndex((prev) => 
      prev < dialogueScenarios.length - 1 ? prev + 1 : 0
    );
  };

  const prevScenario = () => {
    setShowAnswer(false);
    setSelectedTab("good");
    setCurrentScenarioIndex((prev) => 
      prev > 0 ? prev - 1 : dialogueScenarios.length - 1
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-primary/20 text-navy-foreground py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Soft Skills Training
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-foreground">
              Auditor Etiquette & Interview Skills
            </h1>
            <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              How you respond during audit interviews matters. Learn the protocols that help 
              SMEs communicate effectively with auditors while avoiding common pitfalls.
            </p>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Core Interview Principles</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {keyPrinciples.map((principle) => (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <principle.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{principle.description}</p>
                    
                    {principle.scriptExample && (
                      <Alert className="bg-success/5 border-success/20">
                        <MessageSquare className="h-4 w-4 text-success" />
                        <AlertTitle className="text-success text-sm">Sample Script</AlertTitle>
                        <AlertDescription className="text-sm italic">
                          "{principle.scriptExample}"
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {principle.examples && (
                      <ul className="space-y-2">
                        {principle.examples.map((example, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Practice */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-navy mb-4">Practice Scenarios</h2>
              <p className="text-muted-foreground">
                Review these sample interview dialogues to understand good vs. poor responses.
              </p>
            </div>

            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{currentScenario.category}</Badge>
                      <Badge className="bg-primary">{currentScenario.cipArea}</Badge>
                    </div>
                    <CardTitle className="text-lg">
                      Scenario {currentScenarioIndex + 1} of {dialogueScenarios.length}
                    </CardTitle>
                  </div>
                  <Progress value={progress} className="w-32" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Auditor Question */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-navy mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Auditor Question:
                  </p>
                  <p className="text-foreground font-medium">
                    "{currentScenario.auditorQuestion}"
                  </p>
                </div>

                {!showAnswer ? (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Think about how you would respond before viewing the examples.
                    </p>
                    <Button onClick={() => setShowAnswer(true)}>
                      <Play className="mr-2 h-4 w-4" />
                      Show Response Examples
                    </Button>
                  </div>
                ) : (
                  <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="good" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        Good Response
                      </TabsTrigger>
                      <TabsTrigger value="poor" className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4" />
                        Poor Response
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="good" className="mt-4">
                      <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-navy mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          SME Response:
                        </p>
                        <p className="text-muted-foreground italic">
                          "{currentScenario.goodResponse.text}"
                        </p>
                      </div>
                      <Alert className="bg-primary/5 border-primary/20">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary">Why This Works</AlertTitle>
                        <AlertDescription>
                          {currentScenario.goodResponse.explanation}
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="poor" className="mt-4">
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-navy mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-destructive" />
                          SME Response:
                        </p>
                        <p className="text-muted-foreground italic">
                          "{currentScenario.poorResponse.text}"
                        </p>
                      </div>
                      <Alert variant="destructive" className="bg-destructive/5">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Issues With This Response</AlertTitle>
                        <AlertDescription>
                          <ul className="mt-2 space-y-1">
                            {currentScenario.poorResponse.issues.map((issue, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-destructive">•</span>
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-6 pt-4 border-t">
                  <Button variant="outline" onClick={prevScenario}>
                    Previous
                  </Button>
                  <Button onClick={nextScenario}>
                    Next Scenario
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrance/Exit Meetings */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Entrance & Exit Meetings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Entrance Meeting */}
              <Card>
                <CardHeader className="bg-primary/10">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {entranceExitMeetings.entrance.title}
                  </CardTitle>
                  <CardDescription>{entranceExitMeetings.entrance.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Do
                    </h4>
                    <ul className="space-y-1">
                      {entranceExitMeetings.entrance.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-success">•</span>{tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" /> Don't
                    </h4>
                    <ul className="space-y-1">
                      {entranceExitMeetings.entrance.donts.map((dont, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive">•</span>{dont}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Exit Meeting */}
              <Card>
                <CardHeader className="bg-success/10">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-success" />
                    {entranceExitMeetings.exit.title}
                  </CardTitle>
                  <CardDescription>{entranceExitMeetings.exit.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Do
                    </h4>
                    <ul className="space-y-1">
                      {entranceExitMeetings.exit.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-success">•</span>{tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" /> Don't
                    </h4>
                    <ul className="space-y-1">
                      {entranceExitMeetings.exit.donts.map((dont, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive">•</span>{dont}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interview Checklist */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                  SME Interview Checklist
                </CardTitle>
                <CardDescription>Use this checklist before, during, and after audit interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {["Before", "During", "After"].map((category) => (
                    <div key={category}>
                      <h4 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wide">{category}</h4>
                      <ul className="space-y-2">
                        {interviewChecklist.filter(item => item.category === category).map((item) => (
                          <li key={item.id} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">☐</span>{item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-navy text-navy-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Practice?</h2>
            <p className="text-navy-foreground/80 mb-8 text-lg">
              Use our Audit Simulator to generate realistic audit requests and practice 
              formulating responses based on your role.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/audit-simulator">
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  Audit Request Simulator
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10">
                <Link to="/audit-journey">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Full Audit Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
