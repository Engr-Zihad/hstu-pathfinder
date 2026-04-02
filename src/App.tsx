import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import { lazy, Suspense } from "react";

const ChatPage = lazy(() => import("./pages/ChatPage"));
const CurriculumPage = lazy(() => import("./pages/CurriculumPage"));
const CGPAPage = lazy(() => import("./pages/CGPAPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const PlannerPage = lazy(() => import("./pages/PlannerPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const InternshipPage = lazy(() => import("./pages/InternshipPage"));
const HigherStudyPage = lazy(() => import("./pages/HigherStudyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/cgpa" element={<CGPAPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/internship" element={<InternshipPage />} />
              <Route path="/higher-study" element={<HigherStudyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
