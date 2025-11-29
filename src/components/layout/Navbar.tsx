import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRoleBadge } from "@/components/UserRoleBadge";
import { EnhancedGlobalSearch } from "@/components/EnhancedGlobalSearch";
import { Menu, X, GraduationCap, Sparkles, ChevronDown, BookOpen, Wrench, FolderOpen, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: { label: string; href: string; description?: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "My Training",
    icon: BookOpen,
    items: [
      { label: "My Training Plan", href: "/get-started", description: "Your personalized learning path" },
      { label: "All Modules", href: "/modules", description: "12 comprehensive training modules" },
      { label: "Role-Based Paths", href: "/role-training", description: "Training by role" },
      { label: "Soft Skills", href: "/soft-skills", description: "Audit interview techniques" },
    ],
  },
  {
    label: "Practice",
    icon: Wrench,
    items: [
      { label: "Evidence Lab", href: "/evidence-lab", description: "Sample artifacts & evidence" },
      { label: "Audit Simulator", href: "/audit-simulator", description: "Practice audit requests" },
      { label: "Readiness Plan Builder", href: "/readiness-plan", description: "Create your audit plan" },
      { label: "RSAW Tutorial", href: "/rsaw-tutorial", description: "Audit worksheet guide" },
    ],
  },
  {
    label: "Resources",
    icon: FolderOpen,
    items: [
      { label: "Case Studies", href: "/case-studies", description: "Real-world scenarios" },
      { label: "Scope & TCA Matrix", href: "/scope-matrix", description: "Asset classification guide" },
      { label: "Templates & Downloads", href: "/resources", description: "Checklists, matrices, forms" },
      { label: "Manager Guide", href: "/manager-guide", description: "Team training delivery" },
      { label: "Final Exam", href: "/final-exam", description: "Test your knowledge" },
      { label: "Certificate", href: "/certificate", description: "Get your completion certificate" },
      { label: "Achievements", href: "/achievements", description: "View earned badges" },
      { label: "Progress Backup", href: "/progress-backup", description: "Export/import your data" },
    ],
  },
  {
    label: "About",
    icon: Info,
    items: [
      { label: "About CIP Academy", href: "/about", description: "Mission & contact" },
    ],
  },
];

// Flatten all items for mobile menu
const allNavItems = navGroups.flatMap(group => group.items);

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveInGroup = (group: NavGroup) => {
    return group.items.some(item => location.pathname === item.href);
  };

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
            {/* Get Started - Highlighted */}
            <Link
              to="/get-started"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1",
                location.pathname === "/get-started"
                  ? "text-primary bg-primary/10"
                  : "text-primary hover:bg-primary/5"
              )}
            >
              <Sparkles className="h-3 w-3" />
              Get Started
            </Link>

            {/* Grouped Navigation */}
            {navGroups.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1",
                      isActiveInGroup(group)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <group.icon className="h-4 w-4" />
                    {group.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wide">
                    {group.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex flex-col items-start gap-0.5 py-2",
                          location.pathname === item.href && "bg-primary/5"
                        )}
                      >
                        <span className={cn(
                          "font-medium",
                          location.pathname === item.href && "text-primary"
                        )}>
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          <div className="ml-2 pl-2 border-l border-border flex items-center gap-2">
            <EnhancedGlobalSearch />
            <UserRoleBadge />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <EnhancedGlobalSearch />
          <UserRoleBadge />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white max-h-[70vh] overflow-y-auto">
          <nav className="container py-4 flex flex-col gap-1">
            {/* Get Started - Highlighted */}
            <Link
              to="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                location.pathname === "/get-started"
                  ? "text-primary bg-primary/10"
                  : "text-primary"
              )}
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </Link>

            {/* Grouped Items */}
            {navGroups.map((group) => (
              <div key={group.label} className="mt-4">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <group.icon className="h-3 w-3" />
                  {group.label}
                </div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm rounded-lg transition-colors flex flex-col ml-2",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}