import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NercCip101 from "./pages/NercCip101";
import AuditJourney from "./pages/AuditJourney";
import RoleTraining from "./pages/RoleTraining";
import EvidenceLab from "./pages/EvidenceLab";
import SelfAssessment from "./pages/SelfAssessment";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/cip-audit-ready">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nerc-cip-101" element={<NercCip101 />} />
          <Route path="/audit-journey" element={<AuditJourney />} />
          <Route path="/role-training" element={<RoleTraining />} />
          <Route path="/evidence-lab" element={<EvidenceLab />} />
          <Route path="/self-assessment" element={<SelfAssessment />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
