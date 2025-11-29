import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/hooks/useProgress";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Shield,
  Zap,
  Users,
  FileText,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";

interface ModuleCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  modules: number[];
  color: string;
}

const moduleCategories: ModuleCategory[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Core concepts and governance',
    icon: BookOpen,
    modules: [1, 2, 3],
    color: 'bg-primary',
  },
  {
    id: 'people-access',
    title: 'People & Access',
    description: 'Training, perimeters, physical security',
    icon: Users,
    modules: [4, 5],
    color: 'bg-teal',
  },
  {
    id: 'technical',
    title: 'Technical Controls',
    description: 'System security, patching, configuration',
    icon: Shield,
    modules: [6, 8],
    color: 'bg-sky',
  },
  {
    id: 'incidents',
    title: 'Incidents & Recovery',
    description: 'Response plans and business continuity',
    icon: AlertTriangle,
    modules: [7],
    color: 'bg-warning',
  },
  {
    id: 'protection',
    title: 'Information & Supply Chain',
    description: 'BCSI protection and vendor management',
    icon: FileText,
    modules: [9],
    color: 'bg-accent',
  },
  {
    id: 'advanced',
    title: 'Advanced & Audit',
    description: 'CIP-012, CIP-014, audit preparation',
    icon: Zap,
    modules: [10, 11, 12],
    color: 'bg-navy',
  },
];

const moduleBasicInfo: Record<number, { title: string; basic: boolean }> = {
  1: { title: 'Foundations of NERC and CIP', basic: true },
  2: { title: 'Asset Identification (CIP-002)', basic: true },
  3: { title: 'Governance (CIP-003)', basic: true },
  4: { title: 'Personnel & Training (CIP-004)', basic: true },
  5: { title: 'Perimeters (CIP-005/CIP-006)', basic: true },
  6: { title: 'System Security (CIP-007)', basic: true },
  7: { title: 'Incident Response (CIP-008/CIP-009)', basic: true },
  8: { title: 'Configuration Management (CIP-010)', basic: false },
  9: { title: 'Information Protection (CIP-011/CIP-013)', basic: false },
  10: { title: 'Audit Preparation', basic: false },
  11: { title: 'Control Center Communications (CIP-012)', basic: false },
  12: { title: 'Physical Security of Transmission (CIP-014)', basic: false },
};

interface ModuleNavigationProps {
  currentModule?: number;
  onModuleSelect?: (moduleId: number) => void;
  showBreadcrumbs?: boolean;
  className?: string;
}

export function ModuleNavigation({ 
  currentModule, 
  onModuleSelect,
  showBreadcrumbs = true,
  className 
}: ModuleNavigationProps) {
  const [viewMode, setViewMode] = useState<'basic' | 'advanced'>('basic');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isModuleComplete, isLoaded } = useProgress();
  const { preferences } = useUserPreferences();

  const visibleModules = viewMode === 'basic' 
    ? Object.entries(moduleBasicInfo).filter(([_, info]) => info.basic).map(([id]) => Number(id))
    : Object.keys(moduleBasicInfo).map(Number);

  const currentCategoryIndex = currentModule 
    ? moduleCategories.findIndex(cat => cat.modules.includes(currentModule))
    : -1;

  const getNextModule = () => {
    if (!currentModule) return 1;
    const allModules = visibleModules.sort((a, b) => a - b);
    const currentIndex = allModules.indexOf(currentModule);
    return currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;
  };

  const getPrevModule = () => {
    if (!currentModule || currentModule === 1) return null;
    const allModules = visibleModules.sort((a, b) => a - b);
    const currentIndex = allModules.indexOf(currentModule);
    return currentIndex > 0 ? allModules[currentIndex - 1] : null;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && currentModule && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/modules" className="hover:text-foreground transition-colors">
            Modules
          </Link>
          <ChevronRight className="h-4 w-4" />
          {currentCategoryIndex >= 0 && (
            <>
              <span className="hover:text-foreground transition-colors">
                {moduleCategories[currentCategoryIndex].title}
              </span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground font-medium">
            Module {currentModule}
          </span>
        </nav>
      )}

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'basic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('basic')}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Basic View
          </Button>
          <Button
            variant={viewMode === 'advanced' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('advanced')}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            Full View
          </Button>
        </div>
        
        <span className="text-sm text-muted-foreground">
          {viewMode === 'basic' ? '7 core modules' : 'All 12 modules'}
        </span>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          {moduleCategories.map((cat) => {
            const hasVisibleModules = cat.modules.some(m => visibleModules.includes(m));
            if (!hasVisibleModules) return null;
            
            const Icon = cat.icon;
            return (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="text-xs gap-1"
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{cat.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {visibleModules.map((moduleId) => {
              const isComplete = isLoaded && isModuleComplete(moduleId);
              const isCurrent = currentModule === moduleId;
              
              return (
                <button
                  key={moduleId}
                  onClick={() => onModuleSelect?.(moduleId)}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all",
                    isCurrent 
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30" 
                      : isComplete 
                        ? "border-success/50 bg-success/5 hover:bg-success/10"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold",
                    isComplete ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {isComplete ? <CheckCircle2 className="h-4 w-4" /> : moduleId}
                  </div>
                  <span className="text-xs font-medium line-clamp-2">
                    {moduleBasicInfo[moduleId]?.title.split('(')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </TabsContent>

        {moduleCategories.map((cat) => {
          const categoryModules = cat.modules.filter(m => visibleModules.includes(m));
          if (categoryModules.length === 0) return null;

          return (
            <TabsContent key={cat.id} value={cat.id} className="mt-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <cat.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-navy">{cat.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categoryModules.map((moduleId) => {
                  const isComplete = isLoaded && isModuleComplete(moduleId);
                  const isCurrent = currentModule === moduleId;
                  
                  return (
                    <button
                      key={moduleId}
                      onClick={() => onModuleSelect?.(moduleId)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                        isCurrent 
                          ? "border-primary bg-primary/10" 
                          : isComplete 
                            ? "border-success/50 bg-success/5 hover:bg-success/10"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0",
                        isComplete ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {isComplete ? <CheckCircle2 className="h-5 w-5" /> : moduleId}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">
                          Module {moduleId}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {moduleBasicInfo[moduleId]?.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Prev/Next Navigation */}
      {currentModule && (
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            disabled={!getPrevModule()}
            onClick={() => getPrevModule() && onModuleSelect?.(getPrevModule()!)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Module {currentModule} of {visibleModules.length}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            disabled={!getNextModule()}
            onClick={() => getNextModule() && onModuleSelect?.(getNextModule()!)}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
