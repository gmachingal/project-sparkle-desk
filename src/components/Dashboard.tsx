import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "./StatsCard";
import ProjectCard from "./ProjectCard";
import EnhancedTaskCard from "./EnhancedTaskCard";
import { 
  CheckSquare, 
  Clock, 
  Users, 
  Briefcase, 
  Plus,
  Filter,
  MoreHorizontal,
  Timer
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    {
      title: "Total Tasks",
      value: "27",
      description: "4 completed today",
      icon: CheckSquare,
      trend: { value: 12, positive: true }
    },
    {
      title: "Active Projects",
      value: "8",
      description: "2 due this week",
      icon: Briefcase,
      trend: { value: 5, positive: true }
    },
    {
      title: "Team Members",
      value: "12",
      description: "All active",
      icon: Users
    },
    {
      title: "Blocked Tasks",
      value: "2",
      description: "Need attention",
      icon: Clock,
      trend: { value: 1, positive: false }
    }
  ];

  const projects = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with new branding",
      progress: 75,
      totalTasks: 24,
      completedTasks: 18,
      teamSize: 5,
      dueDate: "Dec 15",
      color: "#8B5CF6",
      milestones: { total: 4, completed: 2 }
    },
    {
      id: "2",
      name: "Mobile App",
      description: "Native iOS and Android app development",
      progress: 45,
      totalTasks: 32,
      completedTasks: 14,
      teamSize: 8,
      dueDate: "Jan 30",
      color: "#06B6D4",
      milestones: { total: 5, completed: 1 }
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q1 digital marketing campaign launch",
      progress: 90,
      totalTasks: 16,
      completedTasks: 14,
      teamSize: 3,
      dueDate: "Nov 28",
      color: "#10B981",
      milestones: { total: 3, completed: 3 }
    }
  ];

  const tasks = [
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create initial wireframes and high-fidelity designs for the new homepage",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: "Nov 25",
      assignee: { name: "Sarah Chen", avatar: "" },
      project: "Website Redesign",
      milestone: { id: "1", name: "UI Design", status: "completed" as const }
    },
    {
      id: "2",
      title: "Set up database schema",
      description: "Configure PostgreSQL database with all required tables",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: "Nov 27",
      assignee: { name: "Mike Johnson", avatar: "" },
      project: "Mobile App",
      milestone: { id: "4", name: "MVP Release", status: "planned" as const }
    },
    {
      id: "3",
      title: "Write blog post",
      description: "Create content for the product launch announcement",
      status: "completed" as const,
      priority: "low" as const,
      dueDate: "Nov 20",
      assignee: { name: "Emily Davis", avatar: "" },
      project: "Marketing Campaign"
    },
    {
      id: "4",
      title: "User testing sessions",
      description: "Conduct 5 user testing sessions for the new interface",
      status: "todo" as const,
      priority: "high" as const,
      dueDate: "Dec 1",
      assignee: { name: "Alex Kim", avatar: "" },
      project: "Website Redesign",
      milestone: { id: "3", name: "Frontend Development", status: "in-progress" as const }
    },
    {
      id: "5",
      title: "Database migration blocked",
      description: "Migration scripts blocked due to production dependencies",
      status: "blocked" as const,
      priority: "high" as const,
      dueDate: "Dec 5",
      assignee: { name: "David Park", avatar: "" },
      project: "Website Redesign",
      milestone: { id: "2", name: "Backend Development", status: "in-progress" as const }
    }
  ];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Welcome back, Alex!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/time-logging")}>
            <Timer className="w-4 h-4" />
            Log Time
          </Button>
          <Button variant="default" className="gap-2" onClick={() => navigate("/new-project")}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] rounded-t-lg h-12">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.slice(0, 2).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Tasks</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/my-tasks')}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.slice(0, 3).map((task) => (
                  <EnhancedTaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Projects</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="default" size="sm" onClick={() => navigate("/new-project")}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Tasks</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="hero" size="sm" onClick={() => navigate("/create-task")}>
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <EnhancedTaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;