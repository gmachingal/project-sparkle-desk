import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateTask from "./pages/CreateTask";
import NewProject from "./pages/NewProject";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MyTasks from "./pages/MyTasks";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import EditProject from "./pages/EditProject";
import EditTask from "./pages/EditTask";
import Departments from "./pages/Departments";
import ProjectCalendar from "./pages/ProjectCalendar";
import Attendance from "./pages/Attendance";
import AdminAttendance from "./pages/AdminAttendance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/project-calendar/:id" element={<ProjectCalendar />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin-attendance" element={<AdminAttendance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
