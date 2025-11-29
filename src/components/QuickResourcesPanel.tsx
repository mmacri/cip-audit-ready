import { Link } from "react-router-dom";
import { 
  FolderSearch, 
  FileText, 
  Download, 
  ClipboardCheck,
  ChevronRight,
  Wrench,
  BookOpen,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface QuickResource {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  category: 'tools' | 'practice' | 'reference';
}

const quickResources: QuickResource[] = [
  {
    title: 'Scope & TCA Matrix',
    description: 'Asset classification guidance',
    icon: FolderSearch,
    path: '/scope-matrix',
    category: 'tools',
  },
  {
    title: 'Evidence Lab',
    description: 'Sample artifacts & organization',
    icon: FileText,
    path: '/evidence-lab',
    category: 'practice',
  },
  {
    title: 'Audit Simulator',
    description: 'Practice audit requests',
    icon: ClipboardCheck,
    path: '/audit-simulator',
    category: 'practice',
  },
  {
    title: 'RSAW Tutorial',
    description: 'Worksheet completion guide',
    icon: BookOpen,
    path: '/rsaw-tutorial',
    category: 'reference',
  },
  {
    title: 'Templates',
    description: 'Downloadable checklists',
    icon: Download,
    path: '/resources',
    category: 'tools',
  },
  {
    title: 'Audit Journey',
    description: '90-day preparation timeline',
    icon: Shield,
    path: '/audit-journey',
    category: 'reference',
  },
];

interface QuickResourcesPanelProps {
  className?: string;
  variant?: 'dropdown' | 'inline';
}

export function QuickResourcesPanel({ className, variant = 'dropdown' }: QuickResourcesPanelProps) {
  const toolResources = quickResources.filter(r => r.category === 'tools');
  const practiceResources = quickResources.filter(r => r.category === 'practice');
  const referenceResources = quickResources.filter(r => r.category === 'reference');

  if (variant === 'inline') {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", className)}>
        {quickResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Link
              key={resource.path}
              to={resource.path}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center group"
            >
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {resource.title}
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", className)}>
          <Wrench className="h-4 w-4" />
          <span className="hidden sm:inline">Quick Tools</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Wrench className="h-4 w-4" /> Tools & Checklists
        </DropdownMenuLabel>
        {toolResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <DropdownMenuItem key={resource.path} asChild>
              <Link to={resource.path} className="flex items-center gap-3 cursor-pointer">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">{resource.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4" /> Practice
        </DropdownMenuLabel>
        {practiceResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <DropdownMenuItem key={resource.path} asChild>
              <Link to={resource.path} className="flex items-center gap-3 cursor-pointer">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">{resource.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> Reference
        </DropdownMenuLabel>
        {referenceResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <DropdownMenuItem key={resource.path} asChild>
              <Link to={resource.path} className="flex items-center gap-3 cursor-pointer">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">{resource.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
