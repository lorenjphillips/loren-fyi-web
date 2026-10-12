
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Research from "./pages/Research";
import Blog from "./pages/Blog";
import Tech from "./pages/Tech";
import ProjectDetail from "./pages/ProjectDetail";
import ResearchDetail from "./pages/ResearchDetail";
import TechPost from "./pages/TechPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/research/:slug" element={<ResearchDetail />} />
          {/* Archie was retitled; keep its old project URL working. */}
          <Route
            path="/projects/archie-ai-powered-dating-confidante-matchmaker"
            element={<Navigate to="/projects/archie-the-ai-matchmaker-behind-50-first-dates" replace />}
          />
          {/* AI Warden launched under /research before moving to projects. */}
          <Route
            path="/research/ai-warden-the-stanford-prison-experiment-in-minecraft-run-by"
            element={<Navigate to="/projects/ai-warden-the-stanford-prison-experiment-in-minecraft-run-by" replace />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/tech/:slug" element={<TechPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
