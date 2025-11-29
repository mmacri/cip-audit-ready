import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ClipboardCheck, 
  Target, 
  Lightbulb,
  ArrowRight,
  FolderSearch,
  BookOpen,
  Shield,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CrossLink {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  type: 'evidence' | 'task' | 'simulator' | 'resource' | 'module';
}

// Module-specific cross-navigation links
const moduleCrossLinks: Record<number, CrossLink[]> = {
  1: [
    { title: 'NERC CIP 101', description: 'Deeper dive into CIP fundamentals', path: '/nerc-cip-101', icon: BookOpen, type: 'resource' },
    { title: 'Self-Assessment', description: 'Evaluate your current knowledge', path: '/self-assessment', icon: ClipboardCheck, type: 'task' },
  ],
  2: [
    { title: 'Scope & TCA Matrix', description: 'Asset classification tool', path: '/scope-matrix', icon: FolderSearch, type: 'resource' },
    { title: 'CIP-002 Audit Requests', description: 'Practice scope-related requests', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
    { title: 'Evidence: Asset Inventory', description: 'Sample BES Cyber System documentation', path: '/evidence-lab', icon: FileText, type: 'evidence' },
  ],
  3: [
    { title: 'Policy Templates', description: 'Downloadable policy frameworks', path: '/resources', icon: Download, type: 'resource' },
    { title: 'Low-Impact TCA Checklist', description: 'Transient asset management', path: '/scope-matrix', icon: FolderSearch, type: 'resource' },
    { title: 'CIP-003 Audit Requests', description: 'Governance audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  4: [
    { title: 'Training Matrix Template', description: 'Track role-based training', path: '/resources', icon: Download, type: 'resource' },
    { title: 'Evidence: Training Records', description: 'Sample training documentation', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'HR Role Training Path', description: 'HR-specific learning track', path: '/role-training/hr-training', icon: Target, type: 'task' },
    { title: 'Access Revocation Scenario', description: 'Practice 24-hour revocation', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  5: [
    { title: 'ESP/PSP Diagram', description: 'Visual perimeter reference', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'Physical Security Training', description: 'Role-specific path', path: '/role-training/physical-security', icon: Target, type: 'task' },
    { title: 'CIP-005/006 Audit Requests', description: 'Perimeter audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  6: [
    { title: 'Patch Tracker Template', description: 'CIP-007 R2 compliance tracking', path: '/resources', icon: Download, type: 'resource' },
    { title: 'Evidence: Patch Reports', description: 'Sample patch documentation', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'IT/OT Training Path', description: 'Technical role learning track', path: '/role-training/it-ot', icon: Target, type: 'task' },
    { title: 'CIP-007 Audit Requests', description: 'System security audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  7: [
    { title: 'Incident Response Checklist', description: 'Step-by-step IR guide', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'ES-ISAC Reporting Guide', description: 'Notification requirements', path: '/resources', icon: BookOpen, type: 'resource' },
    { title: 'CIP-008/009 Audit Requests', description: 'Incident/recovery audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
    { title: 'Tabletop Exercise Template', description: 'Run your own IR drill', path: '/resources', icon: Download, type: 'resource' },
  ],
  8: [
    { title: 'Baseline Configuration Template', description: 'Document system baselines', path: '/resources', icon: Download, type: 'resource' },
    { title: 'Change Control Checklist', description: 'Sample change management', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'CIP-010 Audit Requests', description: 'Configuration audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  9: [
    { title: 'BCSI Handling Procedures', description: 'Information protection guide', path: '/evidence-lab', icon: FileText, type: 'evidence' },
    { title: 'Vendor Risk Assessment', description: 'Supply chain evaluation tool', path: '/resources', icon: Download, type: 'resource' },
    { title: 'CIP-011/013 Audit Requests', description: 'Info protection audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  10: [
    { title: 'Audit Journey Timeline', description: '90-day preparation guide', path: '/audit-journey', icon: Shield, type: 'resource' },
    { title: 'RSAW Tutorial', description: 'Complete RSAWs effectively', path: '/rsaw-tutorial', icon: BookOpen, type: 'resource' },
    { title: 'Readiness Plan Builder', description: 'Create your compliance plan', path: '/readiness-plan', icon: Target, type: 'task' },
    { title: 'Full Audit Simulator', description: 'Practice all standards', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  11: [
    { title: 'CIP-012 Requirements', description: 'Control center communications', path: '/nerc-cip-101', icon: BookOpen, type: 'resource' },
    { title: 'IT/OT Training Path', description: 'Technical implementation track', path: '/role-training/it-ot', icon: Target, type: 'task' },
    { title: 'CIP-012 Audit Requests', description: 'Communications audit practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
  12: [
    { title: 'CIP-014 vs CIP-006', description: 'Physical security distinctions', path: '/nerc-cip-101', icon: BookOpen, type: 'resource' },
    { title: 'Physical Security Training', description: 'Role-specific learning path', path: '/role-training/physical-security', icon: Target, type: 'task' },
    { title: 'Third-Party Review Guide', description: 'CIP-014 assessment requirements', path: '/resources', icon: Download, type: 'resource' },
    { title: 'CIP-014 Audit Requests', description: 'Transmission security practice', path: '/audit-simulator', icon: ClipboardCheck, type: 'simulator' },
  ],
};

const typeColors: Record<string, string> = {
  evidence: 'bg-teal/10 text-teal border-teal/30',
  task: 'bg-primary/10 text-primary border-primary/30',
  simulator: 'bg-warning/10 text-warning border-warning/30',
  resource: 'bg-accent/10 text-accent border-accent/30',
  module: 'bg-navy/10 text-navy border-navy/30',
};

const typeLabels: Record<string, string> = {
  evidence: 'Evidence',
  task: 'Task',
  simulator: 'Practice',
  resource: 'Resource',
  module: 'Related',
};

interface ModuleCrossLinksProps {
  moduleId: number;
  className?: string;
  compact?: boolean;
}

export function ModuleCrossLinks({ moduleId, className, compact = false }: ModuleCrossLinksProps) {
  const links = moduleCrossLinks[moduleId] || [];
  
  if (links.length === 0) return null;

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {links.slice(0, 4).map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path + link.title}
              to={link.path}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all hover:shadow-sm",
                typeColors[link.type]
              )}
            >
              <Icon className="h-3 w-3" />
              {link.title}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("bg-muted/30 rounded-xl p-4 border border-border/50", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-navy">Related Resources & Practice</h4>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path + link.title}
              to={link.path}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                typeColors[link.type].replace('text-', 'bg-').replace('/10', '/20')
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm text-navy group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                  <Badge variant="outline" className={cn("text-[10px] px-1.5", typeColors[link.type])}>
                    {typeLabels[link.type]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
