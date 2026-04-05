import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/contexts/SidebarContext";
import AppLayout from "@/components/layout/AppLayout";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/ui/PageLoader";

const ChatPage = lazy(() => import("./pages/ChatPage"));
const CurriculumPage = lazy(() => import("./pages/CurriculumPage"));
const CGPAPage = lazy(() => import("./pages/CGPAPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const PlannerPage = lazy(() => import("./pages/PlannerPage"));
const InternshipPage = lazy(() => import("./pages/InternshipPage"));
const HigherStudyPage = lazy(() => import("./pages/HigherStudyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const TrackPage = lazy(() => import("./pages/TrackPage"));
const PlatformPage = lazy(() => import("./pages/PlatformPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <SidebarProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#0f1623',
          color: '#f0f4f8',
          border: '1px solid rgba(255,255,255,0.1)',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        },
      }}
    />
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/cgpa" element={<CGPAPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/track/:trackId" element={<TrackPage />} />
            <Route path="/platform/:platformId" element={<PlatformPage />} />
            <Route path="/internship" element={<InternshipPage />} />
            <Route path="/higherstudy" element={<HigherStudyPage />} />
            <Route path="/higher-study" element={<Navigate to="/higherstudy" replace />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/resources" element={<Navigate to="/search" replace />} />
            <Route path="/practice" element={<Navigate to="/track/cp" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  </SidebarProvider>
);

export default App;
