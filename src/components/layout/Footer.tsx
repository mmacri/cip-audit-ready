import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">CIP Readiness</span>
                <span className="text-xs text-navy-foreground/70 -mt-1">Academy</span>
              </div>
            </div>
            <p className="text-sm text-navy-foreground/70 leading-relaxed">
              Helping power utilities achieve and maintain NERC CIP compliance through education, training, and practical guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nerc-cip-101" className="text-navy-foreground/70 hover:text-white transition-colors">
                  NERC CIP 101
                </Link>
              </li>
              <li>
                <Link to="/audit-journey" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Audit Journey
                </Link>
              </li>
              <li>
                <Link to="/role-training" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Role-Based Training
                </Link>
              </li>
              <li>
                <Link to="/self-assessment" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Self-Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/evidence-lab" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Evidence Lab
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Templates & Downloads
                </Link>
              </li>
              <li>
                <Link to="/resources#glossary" className="text-navy-foreground/70 hover:text-white transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-navy-foreground/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-navy-foreground/70">
                <Mail className="h-4 w-4" />
                contact@cipreadiness.academy
              </li>
              <li className="flex items-center gap-2 text-navy-foreground/70">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-navy-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Energy District<br />Houston, TX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-navy-foreground/60">
            © {new Date().getFullYear()} CIP Readiness Academy. All rights reserved.
          </p>
          <p className="text-sm text-navy-foreground/60">
            Educational content for NERC CIP compliance preparation.
          </p>
        </div>
      </div>
    </footer>
  );
}
