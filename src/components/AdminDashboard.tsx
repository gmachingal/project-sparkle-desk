import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import StatsCard from "./StatsCard";
import ProjectCard from "./ProjectCard";
import { 
  Users, 
  Clock, 
  CheckSquare, 
  AlertTriangle,
  Plus,
  Filter,
  Calendar,
  Settings,
  BarChart3,
  UserCheck,
  Square-Kanban
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock admin data
  const adminStats = [
    {
      title: "Total Employees",
      value: "48",
      description: "5 new this month",
      icon: Users,
      trend: { value: 12, positive: true }
    },
    {
      title: "Present Today",
      value: "42",
      description: "87.5% attendance",
      icon: UserCheck,
      trend: { value: 3, positive: true }
    },
    {
      title: "Pending Leaves",
      value: "8",
      description: "Needs approval",
      icon: Calendar,
      trend: { value: 2, positive: false }
    },
    {
      title: "Active Projects",
      value: "12",
      description: "3 due this week",
      icon: CheckSquare,
      trend: { value: 8, positive: true }
    }
  ];

  const recentAttendance = [
    { name: "Sarah Chen", status: "present", checkIn: "9:00 AM", avatar: "SC" },
    { name: "Mike Johnson", status: "late", checkIn: "9:45 AM", avatar: "MJ" },
    { name: "Emily Davis", status: "present", checkIn: "8:30 AM", avatar: "ED" },
    { name: "Alex Kim", status: "absent", checkIn: "-", avatar: "AK" },
    { name: "Tom Wilson", status: "present", checkIn: "9:15 AM", avatar: "TW" }
  ];

  const pendingLeaves = [
    { name: "John Smith", type: "Annual Leave", dates: "Dec 15-18", days: 4, avatar: "JS" },
    { name: "Lisa Brown", type: "Sick Leave", dates: "Nov 28", days: 1, avatar: "LB" },
    { name: "David Lee", type: "Personal", dates: "Dec 1-2", days: 2, avatar: "DL" }
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
      color: "#8B5CF6"
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
      color: "#06B6D4"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="bg-green-100 text-green-800">Present</Badge>;
      case 'late':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Late</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor team performance and manage organizational activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2 bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200" 
            onClick={() => {
              localStorage.setItem('preferredRole', 'user');
              window.location.reload();
            }}
          >
            <Users className="w-4 h-4" />
            Employee View
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => navigate("/admin-attendance")}>
            <BarChart3 className="w-4 h-4" />
            Reports
          </Button>
          <Button variant="hero" className="gap-2" onClick={() => navigate("/new-project")}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-muted">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">             
            <Square-Kanban className="w-4 h-4" />
          Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Attendance</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Today's Attendance</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin-attendance')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAttendance.map((employee, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{employee.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.checkIn}</p>
                      </div>
                    </div>
                    {getStatusBadge(employee.status)}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Leave Requests */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Pending Leave Requests</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin-leave-management')}>
                  <AlertTriangle className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingLeaves.map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{leave.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{leave.name}</p>
                        <p className="text-xs text-muted-foreground">{leave.type} • {leave.dates}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{leave.days} day{leave.days > 1 ? 's' : ''}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/admin-attendance')}
                >
                  <Clock className="w-6 h-6" />
                  <span className="text-xs">Attendance</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/admin-leave-management')}
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-xs">Leave Mgmt</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/teams')}
                >
                  <Users className="w-6 h-6" />
                  <span className="text-xs">Teams</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="w-6 h-6" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Attendance Overview</h2>
            <Button variant="hero" onClick={() => navigate('/admin-attendance')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Detailed Reports
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Full attendance management available in detailed view</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <Button variant="hero" onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;