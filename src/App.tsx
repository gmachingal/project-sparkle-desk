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
import TaskView from "./pages/TaskView";
import TimeLogging from "./pages/TimeLogging";
import ProjectCalendar from "./pages/ProjectCalendar";
import SprintDashboard from "./pages/SprintDashboard";
import CreateSprint from "./pages/CreateSprint";
import EditSprint from "./pages/EditSprint";
import Attendance from "./pages/Attendance";
import AdminAttendance from "./pages/AdminAttendance";
import LeaveManagement from "./pages/LeaveManagement";
import AdminLeaveManagement from "./pages/AdminLeaveManagement";
import MySprintsList from "./pages/MySprintsList";
import HolidayMaster from "./pages/HolidayMaster";
import ProjectStatusReport from "./pages/ProjectStatusReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Organization from "./pages/Organization";
import AdminOrganizations from "./pages/AdminOrganizations";
import DocumentMockup from "./pages/DocumentMockup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/task/:id" element={<TaskView />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/time-logging" element={<TimeLogging />} />
          <Route path="/project-calendar/:id" element={<ProjectCalendar />} />
          <Route path="/sprint-dashboard/:projectId/:sprintId" element={<SprintDashboard />} />
          <Route path="/create-sprint/:projectId" element={<CreateSprint />} />
          <Route path="/edit-sprint/:projectId/:sprintId" element={<EditSprint />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin-attendance" element={<AdminAttendance />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/admin-leave-management" element={<AdminLeaveManagement />} />
          <Route path="/sprints" element={<MySprintsList />} />
          <Route path="/holiday-master" element={<HolidayMaster />} />
          <Route path="/project-status-report/:id" element={<ProjectStatusReport />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/admin/organizations" element={<AdminOrganizations />} />
          <Route path="/document-mockup" element={<DocumentMockup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
