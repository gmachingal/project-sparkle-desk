import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceCard from "./AttendanceCard";
import StatsCard from "./StatsCard";
import LeaveCard from "./LeaveCard";
import EnhancedTaskCard from "./EnhancedTaskCard";
import QuickActionsDropdown from "./QuickActionsDropdown";
import SprintOverview from "./SprintOverview";
import DailyTaskReport from "./DailyTaskReport";
import ProjectsWithSprints from "./ProjectsWithSprints";
import { 
  CheckSquare, 
  Clock, 
  Target, 
  TrendingUp,
  Plus,
  Timer,
  Settings,
  BarChart3,
  Calendar,
  FolderOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userStats = [
    {
      title: "My Tasks",
      value: "13",
      description: "3 due today",
      icon: CheckSquare,
      trend: { value: 8, positive: true }
    },
    {
      title: "Completed Today",
      value: "4",
      description: "Great progress!",
      icon: Target,
      trend: { value: 2, positive: true }
    },
    {
      title: "Hours Logged",
      value: "7.5",
      description: "Today",
      icon: Clock
    },
    {
      title: "Performance",
      value: "94%",
      description: "This month",
      icon: TrendingUp,
      trend: { value: 5, positive: true }
    }
  ];

  const recentTasks = [
    {
      id: "1",
      title: "Review code changes",
      description: "Review pull request for authentication module",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: "Today",
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
      milestone: { id: "2", name: "Backend API", status: "in-progress" as const }
    },
    {
      id: "2",
      title: "Server deployment blocked",
      description: "Deployment blocked pending security review approval",
      status: "blocked" as const,
      priority: "high" as const,
      dueDate: "Today",
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
      milestone: { id: "3", name: "Deployment", status: "in-progress" as const }
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: "Tomorrow",
      assignee: { name: "You", avatar: "" },
      project: "Mobile App"
    },
    {
      id: "4",
      title: "Client meeting prep",
      description: "Prepare presentation for client review",
      status: "todo" as const,
      priority: "high" as const,
      dueDate: "Dec 1",
      assignee: { name: "You", avatar: "" },
      project: "Marketing Campaign"
    }
  ];

  const attendanceData = {
    todayStatus: 'checked-in' as const,
    checkInTime: '9:15 AM',
    totalHours: '8h 30m',
    weeklyHours: '38h 45m',
    monthlyHours: '167h 30m'
  };

  const leaveData = {
    availableLeave: 18,
    usedLeave: 7,
    totalLeave: 25,
    pendingRequests: 1,
    upcomingLeave: {
      startDate: 'Dec 23',
      endDate: 'Dec 27',
      type: 'Annual Leave'
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Good morning, Alex!
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to make today productive? Here's your snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Colorful Admin/Employee Toggle */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/10 hover:from-primary/10 hover:to-primary-glow/20 transition-all duration-200">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Employee</span>
            </div>
            <Switch 
              checked={false}
              onCheckedChange={(checked) => {
                if (checked) {
                  localStorage.setItem('preferredRole', 'admin');
                  window.location.reload();
                }
              }}
              className="data-[state=checked]:bg-admin scale-75"
            />
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
          <QuickActionsDropdown />
          <Button variant="outline" className="gap-2" onClick={() => navigate("/time-logging")}>
            <Timer className="w-4 h-4" />
            Log Time
          </Button>
          <Button variant="hero" className="gap-2" onClick={() => navigate("/create-task")}>
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Overview - Always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <CheckSquare className="w-4 h-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2">
            <Calendar className="w-4 h-4" />
            Time & Leave
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/create-task")}>
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">New Task</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/time-logging")}>
                  <Timer className="w-5 h-5" />
                  <span className="text-sm">Log Time</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/projects")}>
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-sm">Projects</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/my-tasks")}>
                  <CheckSquare className="w-5 h-5" />
                  <span className="text-sm">My Tasks</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Today's Focus</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/my-tasks')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTasks.slice(0, 2).map((task) => (
                  <EnhancedTaskCard key={task.id} task={task} size="compact" />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">My Tasks</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/my-tasks')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTasks.map((task) => (
                  <EnhancedTaskCard key={task.id} task={task} size="compact" />
                ))}
              </CardContent>
            </Card>
            
            <DailyTaskReport />
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceCard {...attendanceData} />
            <LeaveCard {...leaveData} />
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ProjectsWithSprints />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;