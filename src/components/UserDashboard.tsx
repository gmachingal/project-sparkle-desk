import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  FolderOpen,
  Bell,
  Users,
  AlertTriangle,
  Star,
  Activity
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

  // Mock data for Overview tab
  const recentActivity = [
    { id: 1, type: 'task_completed', message: 'Completed "Review code changes"', time: '2 hours ago', icon: CheckSquare },
    { id: 2, type: 'comment', message: 'Sarah commented on "Website Redesign"', time: '4 hours ago', icon: Users },
    { id: 3, type: 'deadline', message: 'Task due tomorrow: "Update documentation"', time: '1 day ago', icon: AlertTriangle },
    { id: 4, type: 'milestone', message: 'Milestone "Backend API" reached 60%', time: '2 days ago', icon: Target }
  ];

  const upcomingDeadlines = [
    { id: 1, task: 'Review code changes', project: 'Website Redesign', due: 'Today', priority: 'high' },
    { id: 2, task: 'Update documentation', project: 'Mobile App', due: 'Tomorrow', priority: 'medium' },
    { id: 3, task: 'Client meeting prep', project: 'Marketing Campaign', due: 'Dec 1', priority: 'high' },
  ];

  const recentProjects = [
    { id: 1, name: 'Website Redesign', progress: 75, status: 'active', members: 4 },
    { id: 2, name: 'Mobile App', progress: 45, status: 'active', members: 3 },
    { id: 3, name: 'Marketing Campaign', progress: 30, status: 'planning', members: 2 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return CheckSquare;
      case 'comment': return Users;
      case 'deadline': return AlertTriangle;
      case 'milestone': return Target;
      default: return Activity;
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
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Completion Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Task Completion Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <div className="space-y-2">
                    {[
                      { day: 'Mon', completed: 4, total: 6 },
                      { day: 'Tue', completed: 3, total: 5 },
                      { day: 'Wed', completed: 6, total: 7 },
                      { day: 'Thu', completed: 5, total: 6 },
                      { day: 'Fri', completed: 4, total: 4 },
                      { day: 'Sat', completed: 2, total: 3 },
                      { day: 'Sun', completed: 1, total: 2 }
                    ].map((day, index) => (
                      <div key={day.day} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-8">{day.day}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <Progress value={(day.completed / day.total) * 100} className="flex-1 h-3" />
                          <span className="text-xs text-muted-foreground w-12">{day.completed}/{day.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Distribution (This Week)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Development', hours: 24, color: 'bg-primary', percentage: 60 },
                    { category: 'Meetings', hours: 8, color: 'bg-blue-500', percentage: 20 },
                    { category: 'Documentation', hours: 6, color: 'bg-green-500', percentage: 15 },
                    { category: 'Testing', hours: 2, color: 'bg-yellow-500', percentage: 5 }
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${item.color}`}></div>
                          <span>{item.category}</span>
                        </div>
                        <span className="font-medium">{item.hours}h</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Focus */}
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

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <IconComponent className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{deadline.task}</p>
                      <p className="text-xs text-muted-foreground">{deadline.project}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{deadline.due}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  Recent Projects
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-3 rounded-lg border space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{project.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{project.members} members</span>
                    </div>
                  </div>
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