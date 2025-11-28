import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRoleBadge } from "@/components/UserRoleBadge";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Menu, X, GraduationCap, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "CIP 101", href: "/nerc-cip-101" },
  { label: "Modules", href: "/modules" },
  { label: "Role Training", href: "/role-training" },
  { label: "Audit Journey", href: "/audit-journey" },
];

const moreNavItems = [
  { label: "Learning Path", href: "/learning-path" },
  { label: "Evidence Lab", href: "/evidence-lab" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Audit Simulator", href: "/audit-simulator" },
  { label: "Soft Skills Training", href: "/soft-skills" },
  { label: "Scope Matrix & TCA", href: "/scope-matrix" },
  { label: "Readiness Plan", href: "/readiness-plan" },
  { label: "Self-Assessment", href: "/self-assessment" },
  { label: "Achievements", href: "/achievements" },
  { label: "Progress Backup", href: "/progress-backup" },
  { label: "Manager Guide", href: "/manager-guide" },
  { label: "Resources", href: "/resources" },
  { label: "Final Exam", href: "/final-exam" },
  { label: "Certificate", href: "/certificate" },
  { label: "About & Contact", href: "/about" },
];

const allNavItems = [...mainNavItems, ...moreNavItems];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-navy">CIP Readiness</span>
            <span className="text-xs text-muted-foreground -mt-1">Academy</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1",
                  moreNavItems.some(item => location.pathname === item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                  More <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {moreNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        location.pathname === item.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          <div className="ml-2 pl-2 border-l border-border flex items-center gap-2">
            <GlobalSearch />
            <UserRoleBadge />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <UserRoleBadge />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container py-4 flex flex-col gap-1">
            {allNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
