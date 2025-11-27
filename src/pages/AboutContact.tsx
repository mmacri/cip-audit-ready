import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Mail, Send, CheckCircle2 } from "lucide-react";

export default function AboutContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">About & Contact</h1>
            <p className="text-lg text-muted-foreground">
              Learn about CIP Readiness Academy and get in touch with questions.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6">About CIP Readiness Academy</h2>
            <div className="prose-academy space-y-4">
              <p className="text-muted-foreground">
                CIP Readiness Academy is a comprehensive training resource designed specifically for power utilities 
                preparing for NERC CIP compliance audits. Our mission is to make CIP compliance accessible, 
                understandable, and achievable for organizations of all sizes.
              </p>
              <p className="text-muted-foreground">
                The training content is developed by compliance professionals with hands-on experience in the 
                electric utility sector. We understand the challenges of maintaining continuous compliance while 
                managing day-to-day operations, and we've designed this program to provide practical, actionable guidance.
              </p>
              <p className="text-muted-foreground">
                Whether you're new to NERC CIP or looking to strengthen your existing compliance program, 
                CIP Readiness Academy provides the structured learning path, practical exercises, and 
                assessment tools you need to build audit confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-navy">Contact Us</h2>
            </div>
            
            {submitted ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy mb-2">Message Received</h3>
                <p className="text-muted-foreground">
                  Thank you for your interest. This is a demo form—no backend submission is configured yet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about the training content or need assistance? Fill out the form below.
                  <br /><span className="text-amber">(Note: This is a demo form; no backend submission is configured.)</span>
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" placeholder="Your organization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance Manager</SelectItem>
                        <SelectItem value="it-ot">IT/OT Engineer</SelectItem>
                        <SelectItem value="security">Physical Security</SelectItem>
                        <SelectItem value="hr">HR/Training</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help?" rows={4} required />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
