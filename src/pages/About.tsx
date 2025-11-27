import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  Target, 
  Mail,
  CheckCircle2,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function About() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We will respond within 1-2 business days.",
    });
    
    setFormData({ name: "", email: "", organization: "", role: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              About CIP Readiness Academy
            </h1>
            <p className="text-lg text-muted-foreground">
              Helping power utilities build sustainable NERC CIP compliance programs 
              through education, practical guidance, and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-navy mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To demystify NERC CIP compliance and empower utilities to maintain 
                  continuous audit readiness with confidence.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-navy mb-2">Who We Serve</h3>
                <p className="text-sm text-muted-foreground">
                  Compliance teams, engineers, leadership, and everyone involved in 
                  protecting critical bulk electric system infrastructure.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-navy mb-2">Our Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Practical, plain-English education combined with real-world 
                  templates and tools that actually get used.
                </p>
              </div>
            </div>

            <div className="prose-academy max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed">
                CIP Readiness Academy was founded on a simple observation: too many utilities 
                approach NERC CIP compliance as a periodic fire drill rather than a sustainable 
                program. When audits approach, teams scramble to gather evidence, update 
                documentation, and hope they have not missed anything critical.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                There is a better way. By understanding what auditors actually look for, building 
                evidence collection into daily operations, and training every role on their 
                specific responsibilities, utilities can maintain continuous compliance that 
                makes audits a formality rather than a crisis.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our educational content is designed by compliance professionals who have been 
                through dozens of NERC audits—on both sides of the table. We know what works, 
                what auditors care about, and what trips organizations up. That experience 
                shapes everything we teach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Bio */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">Meet Our Lead Consultant</h2>
            
            <div className="bg-card rounded-xl border border-border/50 p-8 md:flex gap-8 items-start">
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold shrink-0 mx-auto md:mx-0 mb-6 md:mb-0">
                JD
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy mb-1">James Davidson</h3>
                <p className="text-primary font-medium mb-4">Principal Consultant & Founder</p>
                <p className="text-muted-foreground mb-4">
                  James brings over 15 years of experience in power sector cybersecurity and 
                  NERC CIP compliance. He has led compliance programs at two major investor-owned 
                  utilities and served as a subject matter expert for regional entity audit teams.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Former NERC CIP Compliance Manager at a Top-20 IOU
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Regional Entity Audit Team Experience
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    CISSP, CISA, and NERC CIP Certified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Published Author on Grid Security Topics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions about our training programs or need customized support for your organization?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border/50 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-navy mb-1.5">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-navy mb-1.5">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select your role</option>
                    <option value="compliance-manager">Compliance Manager</option>
                    <option value="it-ot-engineer">IT/OT Engineer</option>
                    <option value="physical-security">Physical Security</option>
                    <option value="hr-training">HR/Training</option>
                    <option value="leadership">Leadership/Executive</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your compliance needs or questions..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Request a Readiness Workshop
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
