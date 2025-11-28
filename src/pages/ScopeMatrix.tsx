import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Server,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Usb,
  Laptop,
  Shield,
  FileText,
  RefreshCw
} from "lucide-react";

interface MatrixQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const matrixQuestions: MatrixQuestion[] = [
  {
    id: "bes-function",
    question: "Does this asset perform or support a function essential to the reliable operation of the Bulk Electric System?",
    options: [
      { value: "yes", label: "Yes - directly affects BES operations" },
      { value: "no", label: "No - supports only corporate/business functions" },
      { value: "unsure", label: "Unsure - need further analysis" }
    ]
  },
  {
    id: "15-minute",
    question: "If this asset were unavailable, degraded, or misused, could it adversely impact BES reliability within 15 minutes?",
    options: [
      { value: "yes", label: "Yes - impact would occur within 15 minutes" },
      { value: "no", label: "No - impact would take longer or not affect reliability" },
      { value: "unsure", label: "Unsure - need engineering analysis" }
    ]
  },
  {
    id: "routable",
    question: "Does this asset use a routable protocol (IP-based networking)?",
    options: [
      { value: "yes", label: "Yes - uses TCP/IP or similar routable protocols" },
      { value: "no", label: "No - uses only serial or non-routable protocols" },
      { value: "both", label: "Both - has routable and non-routable interfaces" }
    ]
  },
  {
    id: "facility-type",
    question: "What type of facility contains this asset?",
    options: [
      { value: "control-center-1500", label: "Control Center controlling ≥1,500 MW" },
      { value: "control-center-under", label: "Control Center controlling <1,500 MW" },
      { value: "generation", label: "Generation facility" },
      { value: "transmission", label: "Transmission station/substation" },
      { value: "other", label: "Other BES facility" }
    ]
  },
  {
    id: "mw-threshold",
    question: "What MW threshold does the associated facility meet? (for generation)",
    options: [
      { value: "1500-plus", label: "≥1,500 MW (single unit or aggregate)" },
      { value: "1000-plus", label: "≥1,000 MW but <1,500 MW" },
      { value: "under-1000", label: "<1,000 MW" },
      { value: "na", label: "Not applicable (not generation)" }
    ]
  }
];

const tcaGuidance = [
  {
    title: "What is a Transient Cyber Asset (TCA)?",
    content: "A Transient Cyber Asset is a Cyber Asset that is: (1) capable of transmitting or transferring executable code, (2) not included in a BES Cyber System, and (3) not a Protected Cyber Asset. Common examples include USB drives, maintenance laptops, and portable diagnostic equipment."
  },
  {
    title: "Why TCAs Matter",
    content: "TCAs are consistently among the top violation areas in NERC CIP audits. They can bypass electronic perimeter controls by physically carrying malware or unauthorized software into protected environments. Poor TCA handling has led to significant findings."
  },
  {
    title: "USB Drive Controls",
    content: "Before connecting any USB device to a BES Cyber System: (1) Scan for malicious code using updated antivirus, (2) Document the scan results, (3) Maintain chain of custody records, (4) Ensure the device is authorized for use in the protected environment."
  },
  {
    title: "Maintenance Laptop Requirements",
    content: "Laptops used for maintenance on BES Cyber Systems must: (1) Have documented security patching, (2) Have malicious code prevention with current signatures, (3) Be scanned before and after connection to BES Cyber Systems, (4) Have controlled software installation."
  },
  {
    title: "Vendor Equipment",
    content: "When vendors bring equipment: (1) Require pre-authorization and documentation, (2) Scan all media before connection, (3) Monitor vendor activity, (4) Document what was connected and when, (5) Consider maintaining entity-owned equipment for vendor use."
  },
  {
    title: "Documentation Requirements",
    content: "Maintain records showing: (1) TCA identification and authorization, (2) Scan dates and results, (3) What systems the TCA connected to, (4) Who performed the connection, (5) Date/time of connection and disconnection."
  }
];

export default function ScopeMatrix() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowResult(false);
  };

  const resetAssessment = () => {
    setAnswers({});
    setShowResult(false);
  };

  const calculateResult = () => {
    const { "bes-function": besFunc, "15-minute": fifteenMin, "facility-type": facilityType, "mw-threshold": mwThreshold } = answers;

    // Not a BES Cyber Asset
    if (besFunc === "no" || fifteenMin === "no") {
      return {
        classification: "Not a BES Cyber Asset",
        impact: null,
        color: "bg-muted",
        description: "Based on your answers, this asset does not meet the criteria for a BES Cyber Asset. It either doesn't support BES functions or couldn't impact reliability within 15 minutes.",
        requirements: ["No CIP requirements apply to this asset", "Document your rationale for exclusion", "Re-evaluate if the asset's function changes"]
      };
    }

    // Unsure - needs more analysis
    if (besFunc === "unsure" || fifteenMin === "unsure") {
      return {
        classification: "Further Analysis Required",
        impact: null,
        color: "bg-amber",
        description: "The determination requires additional engineering analysis. Work with your asset owners and compliance team to complete the 15-minute impact assessment.",
        requirements: ["Conduct detailed engineering analysis", "Document assumptions and methodology", "Involve operations SMEs in the assessment"]
      };
    }

    // High Impact determination
    if (facilityType === "control-center-1500" || mwThreshold === "1500-plus") {
      return {
        classification: "BES Cyber Asset",
        impact: "High",
        color: "bg-destructive",
        description: "This appears to be a High Impact BES Cyber Asset based on the facility type or MW threshold. High Impact systems have the most stringent CIP requirements.",
        requirements: [
          "All CIP-003 through CIP-011 requirements apply",
          "CIP-012 applies for control center communications",
          "CIP-013 supply chain requirements apply",
          "Most restrictive access controls required",
          "Real-time monitoring and logging required"
        ]
      };
    }

    // Medium Impact determination
    if (facilityType === "control-center-under" || facilityType === "generation" || mwThreshold === "1000-plus") {
      return {
        classification: "BES Cyber Asset",
        impact: "Medium",
        color: "bg-amber",
        description: "This appears to be a Medium Impact BES Cyber Asset. Medium Impact systems have substantial CIP requirements, though some flexibility compared to High Impact.",
        requirements: [
          "CIP-003 through CIP-011 requirements apply (some with variations)",
          "CIP-013 supply chain requirements apply",
          "Electronic Security Perimeter required",
          "Physical Security Perimeter required",
          "Personnel risk assessments required"
        ]
      };
    }

    // Low Impact determination
    return {
      classification: "BES Cyber Asset",
      impact: "Low",
      color: "bg-success",
      description: "This appears to be a Low Impact BES Cyber Asset. While CIP requirements are less extensive than High/Medium, you still have compliance obligations.",
      requirements: [
        "CIP-003 cyber security plans apply",
        "CIP-003-9 expanded requirements apply (passwords, patching, TCAs)",
        "Physical security program required",
        "Electronic access controls required",
        "Incident response capability required"
      ]
    };
  };

  const result = showResult ? calculateResult() : null;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-primary/20 text-navy-foreground py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Asset Scoping Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Scope & Applicability Matrix
            </h1>
            <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              Determine if an asset is a BES Cyber Asset and what impact rating applies. 
              Plus, guidance on the commonly-violated Transient Cyber Asset requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Matrix */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      BES Cyber Asset Determination
                    </CardTitle>
                    <CardDescription>
                      Answer these questions to help determine asset classification
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetAssessment}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {matrixQuestions.map((q, index) => (
                  <div key={q.id}>
                    <div className="mb-4">
                      <p className="font-medium text-navy mb-1">
                        {index + 1}. {q.question}
                      </p>
                    </div>
                    <RadioGroup
                      value={answers[q.id] || ""}
                      onValueChange={(value) => handleAnswerChange(q.id, value)}
                      className="space-y-2"
                    >
                      {q.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                          <Label htmlFor={`${q.id}-${option.value}`} className="text-sm cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {index < matrixQuestions.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowResult(true)}
                    disabled={Object.keys(answers).length < 4}
                  >
                    Determine Classification
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {result && (
                  <Alert className={`${result.color} bg-opacity-10 border-opacity-30`}>
                    <Shield className="h-4 w-4" />
                    <AlertTitle className="flex items-center gap-2">
                      {result.classification}
                      {result.impact && (
                        <Badge variant={result.impact === "High" ? "destructive" : result.impact === "Medium" ? "default" : "secondary"}>
                          {result.impact} Impact
                        </Badge>
                      )}
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <p className="mb-3">{result.description}</p>
                      <p className="font-medium mb-2">Key Requirements:</p>
                      <ul className="space-y-1">
                        {result.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Alert className="mt-6 border-amber bg-amber/5">
              <AlertTriangle className="h-4 w-4 text-amber" />
              <AlertTitle className="text-amber">Important Disclaimer</AlertTitle>
              <AlertDescription>
                This tool provides guidance only. Official BES Cyber Asset determination must be 
                performed using your organization's documented methodology and reviewed by qualified 
                personnel. Consult your compliance team and the CIP-002 Implementation Guidance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* TCA Guidance */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Top Violation Area
              </Badge>
              <h2 className="text-3xl font-bold text-navy mb-4">
                Transient Cyber Asset (TCA) Handling
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                TCAs—especially USB drives and maintenance laptops—are consistently among the 
                most common NERC CIP violation areas. Get this right.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {tcaGuidance.map((item) => (
                <Card key={item.title}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {item.title.includes("USB") ? (
                        <Usb className="h-5 w-5 text-primary" />
                      ) : item.title.includes("Laptop") ? (
                        <Laptop className="h-5 w-5 text-primary" />
                      ) : item.title.includes("Vendor") ? (
                        <Shield className="h-5 w-5 text-primary" />
                      ) : item.title.includes("Documentation") ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <HelpCircle className="h-5 w-5 text-primary" />
                      )}
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  TCA Best Practices Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Maintain an inventory of authorized TCAs
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Label TCAs with unique identifiers
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Scan all removable media before use
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Document scan dates and results
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Control software on maintenance laptops
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Train personnel on TCA procedures
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Review vendor equipment before connection
                    </li>
                    <li className="text-sm flex items-start gap-2">
                      <span className="text-primary">□</span>
                      Maintain chain of custody records
                    </li>
                  </ul>
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
            <h2 className="text-3xl font-bold mb-6">Deep Dive on Asset Scoping</h2>
            <p className="text-navy-foreground/80 mb-8 text-lg">
              Module 2 covers CIP-002 asset identification in detail, including the complete 
              categorization methodology and common scoping mistakes.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/modules">
                <ArrowRight className="mr-2 h-5 w-5" />
                Go to Module 2: Asset Identification
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
