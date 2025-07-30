import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
  Briefcase,
  Home,
  Building,
  XCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Attendance statistics
  const attendanceStats = {
    totalEmployees: 156,
    presentToday: 142,
    wfhToday: 28,
    absentToday: 14,
    lateToday: 8,
    averageHours: 8.2,
    attendanceRate: 91.0
  };

  // Department attendance data
  const departmentAttendance = [
    { department: 'Engineering', present: 45, total: 52, percentage: 86.5 },
    { department: 'Design', present: 18, total: 20, percentage: 90.0 },
    { department: 'Marketing', present: 22, total: 25, percentage: 88.0 },
    { department: 'Sales', present: 28, total: 30, percentage: 93.3 },
    { department: 'HR', present: 15, total: 16, percentage: 93.8 },
    { department: 'Finance', present: 14, total: 13, percentage: 100.0 }
  ];

  // Recent attendance activities
  const recentActivities = [
    { time: "2 mins ago", action: "Sarah Chen checked in", type: "checkin" },
    { time: "5 mins ago", action: "Mike Johnson checked out", type: "checkout" },
    { time: "12 mins ago", action: "Emily Davis applied for leave", type: "leave" },
    { time: "18 mins ago", action: "Alex Kim marked absent", type: "absent" },
    { time: "25 mins ago", action: "Tom Wilson checked in late", type: "late" }
  ];

  // Extended employee attendance data
  const employeeAttendance = [
    { id: '1', name: 'John Doe', department: 'Engineering', checkIn: '09:15 AM', checkOut: '--', location: 'office', status: 'present', hours: 6.5, avatar: 'JD' },
    { id: '2', name: 'Jane Smith', department: 'Design', checkIn: '09:00 AM', checkOut: '05:30 PM', location: 'wfh', status: 'present', hours: 8.5, avatar: 'JS' },
    { id: '3', name: 'Mike Johnson', department: 'Engineering', checkIn: '10:30 AM', checkOut: '06:15 PM', location: 'office', status: 'late', hours: 7.75, avatar: 'MJ' },
    { id: '4', name: 'Sarah Wilson', department: 'Marketing', checkIn: '--', checkOut: '--', location: '--', status: 'absent', hours: 0, avatar: 'SW' },
    { id: '5', name: 'David Brown', department: 'Sales', checkIn: '08:45 AM', checkOut: '05:45 PM', location: 'office', status: 'present', hours: 9, avatar: 'DB' },
    { id: '6', name: 'Lisa Chen', department: 'HR', checkIn: '09:30 AM', checkOut: '04:30 PM', location: 'office', status: 'early_leave', hours: 7, avatar: 'LC' }
  ];

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];

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
      case 'early_leave':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Early Leave</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checkin':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'checkout':
        return <XCircle className="w-4 h-4 text-blue-500" />;
      case 'leave':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'absent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getFilteredEmployees = () => {
    let filtered = employeeAttendance;
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    return filtered;
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
            <BarChart3 className="w-4 h-4" />
          Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
            <Calendar className="w-4 h-4" />
            Attendance</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
            <Briefcase className="w-4 h-4" />
            Projects</TabsTrigger>
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
          {/* Header with filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Attendance Overview</h2>
              <p className="text-muted-foreground">Today - {format(new Date(), 'MMM dd, yyyy')}</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="hero" onClick={() => navigate('/admin-attendance')}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          {/* Attendance Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{attendanceStats.totalEmployees}</div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{attendanceStats.presentToday}</div>
                <div className="text-sm text-muted-foreground">Present Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Home className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{attendanceStats.wfhToday}</div>
                <div className="text-sm text-muted-foreground">Work From Home</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{attendanceStats.absentToday}</div>
                <div className="text-sm text-muted-foreground">Absent Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{attendanceStats.lateToday}</div>
                <div className="text-sm text-muted-foreground">Late Arrivals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{attendanceStats.attendanceRate}%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Department wise attendance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Department Attendance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departmentAttendance.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">{dept.present}/{dept.total} employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16">
                        <Progress value={dept.percentage} className="h-2" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{dept.percentage}%</span>
                        {dept.percentage >= 90 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : dept.percentage >= 80 ? (
                          <TrendingDown className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 border rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Employee Attendance List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Employee Attendance ({selectedDepartment === 'all' ? 'All Departments' : selectedDepartment})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getFilteredEmployees().map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {employee.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{employee.checkIn}</div>
                        <div className="text-xs text-muted-foreground">Check In</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{employee.checkOut}</div>
                        <div className="text-xs text-muted-foreground">Check Out</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {employee.location === 'wfh' ? (
                          <Home className="h-4 w-4 text-blue-500" />
                        ) : employee.location === 'office' ? (
                          <Building className="h-4 w-4 text-gray-500" />
                        ) : null}
                        <span className="text-sm">{
                          employee.location === 'wfh' ? 'WFH' : 
                          employee.location === 'office' ? 'Office' : '--'
                        }</span>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{employee.hours}h</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>
                  </div>
                ))}
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