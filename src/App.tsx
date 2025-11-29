import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import LearningPath from "./pages/LearningPath";
import Modules from "./pages/Modules";
import RoleTraining from "./pages/RoleTraining";
import RoleTrainingDetail from "./pages/RoleTrainingDetail";
import EvidenceLab from "./pages/EvidenceLab";
import SelfAssessment from "./pages/SelfAssessment";
import Resources from "./pages/Resources";
import AboutContact from "./pages/AboutContact";
import CaseStudies from "./pages/CaseStudies";
import AuditSimulator from "./pages/AuditSimulator";
import ReadinessPlan from "./pages/ReadinessPlan";
import FinalExam from "./pages/FinalExam";
import Certificate from "./pages/Certificate";
import RoleCertificate from "./pages/RoleCertificate";
import Achievements from "./pages/Achievements";
import ProgressBackup from "./pages/ProgressBackup";
import ManagerGuide from "./pages/ManagerGuide";
import SoftSkillsTraining from "./pages/SoftSkillsTraining";
import ScopeMatrix from "./pages/ScopeMatrix";
import RSAWTutorial from "./pages/RSAWTutorial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/role-training" element={<RoleTraining />} />
          <Route path="/role-training/:roleId" element={<RoleTrainingDetail />} />
          <Route path="/role-training/:roleId/certificate" element={<RoleCertificate />} />
          <Route path="/evidence-lab" element={<EvidenceLab />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/audit-simulator" element={<AuditSimulator />} />
          <Route path="/readiness-plan" element={<ReadinessPlan />} />
          <Route path="/final-exam" element={<FinalExam />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/progress-backup" element={<ProgressBackup />} />
          <Route path="/manager-guide" element={<ManagerGuide />} />
          <Route path="/soft-skills" element={<SoftSkillsTraining />} />
          <Route path="/scope-matrix" element={<ScopeMatrix />} />
          <Route path="/rsaw-tutorial" element={<RSAWTutorial />} />
          
          {/* Redirects for consolidated pages */}
          <Route path="/nerc-cip-101" element={<Navigate to="/modules#module-1" replace />} />
          <Route path="/audit-journey" element={<Navigate to="/modules#module-10" replace />} />
          <Route path="/learning-path" element={<Navigate to="/get-started" replace />} />
          <Route path="/self-assessment" element={<Navigate to="/get-started" replace />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;