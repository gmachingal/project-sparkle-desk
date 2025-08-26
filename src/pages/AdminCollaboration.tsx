import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { 
  Users, 
  Search,
  Calendar,
  Briefcase,
  CheckCircle,
  Play,
  BarChart3,
  UserCheck,
  MessageSquare,
  Activity,
  Filter,
  Settings,
  Plus,
  Share2,
  GraduationCap,
  Timer,
  Star,
  Eye,
  Bell,
  CalendarIcon,
  AlertCircle
} from "lucide-react";

const AdminCollaboration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const { toast } = useToast();

  // Check for admin state on component mount
  useEffect(() => {
    const preferredRole = localStorage.getItem('preferredRole');
    if (preferredRole !== 'admin') {
      localStorage.setItem('preferredRole', 'admin');
    }
  }, []);

  // Mock team data - organization-wide view
  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@company.com",
      role: "Team Lead",
      department: "Engineering",
      avatar: "",
      status: "online",
      workload: 85,
      currentCapacity: "34h / 40h this week",
      tasksCompleted: 42,
      tasksInProgress: 3,
      collaboration: 92,
      lastActivity: "2 hours ago",
      skills: ["React", "TypeScript", "Node.js"],
      activeProjects: ["Website Redesign", "Mobile App"]
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "UI/UX Designer",
      department: "Design",
      avatar: "",
      status: "online",
      workload: 70,
      currentCapacity: "28h / 40h this week",
      tasksCompleted: 38,
      tasksInProgress: 2,
      collaboration: 88,
      lastActivity: "30 minutes ago",
      skills: ["Figma", "Sketch", "Prototyping"],
      activeProjects: ["Website Redesign", "Marketing Campaign"]
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@company.com",
      role: "Backend Developer",
      department: "Engineering",
      avatar: "",
      status: "away",
      workload: 95,
      currentCapacity: "38h / 40h this week",
      tasksCompleted: 35,
      tasksInProgress: 4,
      collaboration: 76,
      lastActivity: "1 hour ago",
      skills: ["Python", "PostgreSQL", "AWS"],
      activeProjects: ["Mobile App", "Data Analytics"]
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "Marketing Manager",
      department: "Marketing",
      avatar: "",
      status: "in-meeting",
      workload: 60,
      currentCapacity: "24h / 40h this week",
      tasksCompleted: 28,
      tasksInProgress: 2,
      collaboration: 94,
      lastActivity: "Just now",
      skills: ["Content Strategy", "SEO", "Analytics"],
      activeProjects: ["Marketing Campaign"]
    }
  ];

  const departments = [
    {
      id: "1",
      name: "Engineering",
      members: teamMembers.filter(m => m.department === "Engineering"),
      avgWorkload: 85,
      activeProjects: ["Website Redesign", "Mobile App", "Data Analytics"],
      color: "#8B5CF6"
    },
    {
      id: "2",
      name: "Design",
      members: teamMembers.filter(m => m.department === "Design"),
      avgWorkload: 70,
      activeProjects: ["Website Redesign", "Marketing Campaign"],
      color: "#06B6D4"
    },
    {
      id: "3",
      name: "Marketing",
      members: teamMembers.filter(m => m.department === "Marketing"),
      avgWorkload: 60,
      activeProjects: ["Marketing Campaign"],
      color: "#10B981"
    }
  ];

  const getFilteredMembers = () => {
    let filtered = teamMembers;
    
    if (searchQuery) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (filterDepartment !== "all") {
      filtered = filtered.filter(member => member.department === filterDepartment);
    }
    
    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "in-meeting": return "bg-blue-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return "text-red-500";
    if (workload >= 80) return "text-yellow-500";
    return "text-green-500";
  };

  const teamStats = {
    total: teamMembers.length,
    online: teamMembers.filter(m => m.status === "online").length,
    avgWorkload: Math.round(teamMembers.reduce((acc, m) => acc + m.workload, 0) / teamMembers.length),
    totalProjects: [...new Set(teamMembers.flatMap(m => m.activeProjects))].length,
    completedTasks: teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0),
    inProgressTasks: teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Admin Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-admin to-admin-glow bg-clip-text text-transparent">
              Organization Collaboration
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage organization-wide collaboration, workloads, and team performance
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Admin/Employee Toggle */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-admin/30 bg-gradient-to-r from-admin/10 to-admin-glow/15 hover:from-admin/20 hover:to-admin-glow/25 transition-all duration-200 shadow-sm">
              <span className="text-sm text-muted-foreground">Employee</span>
              <Switch 
                checked={true}
                onCheckedChange={(checked) => {
                  if (!checked) {
                    localStorage.setItem('preferredRole', 'user');
                    window.location.href = '/collaboration';
                  }
                }}
                className="data-[state=checked]:bg-admin scale-75"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-admin">Admin</span>
                <UserCheck className="w-4 h-4 text-admin" />
              </div>
            </div>
            
            <Button variant="outline" className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
              <Bell className="w-4 h-4" />
              Notifications
            </Button>
            
            <Button variant="outline" className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Team Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{teamStats.total}</div>
                  <div className="text-xs text-muted-foreground">Team Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{teamStats.online}</div>
                  <div className="text-xs text-muted-foreground">Online Now</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className={`w-4 h-4 ${getWorkloadColor(teamStats.avgWorkload)}`} />
                <div>
                  <div className="text-2xl font-bold">{teamStats.avgWorkload}%</div>
                  <div className="text-xs text-muted-foreground">Avg Workload</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{teamStats.totalProjects}</div>
                  <div className="text-xs text-muted-foreground">Active Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{teamStats.completedTasks}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{teamStats.inProgressTasks}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="relative">
            <TabsList className="grid w-full grid-cols-5 h-12 rounded-t-lg">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium transition-all duration-200 text-admin/70 hover:text-admin"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Team Overview
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="workload" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium transition-all duration-200 hover:bg-admin/10 text-admin/70 hover:text-admin"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Team Workload
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="departments" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium transition-all duration-200 hover:bg-admin/10 text-admin/70 hover:text-admin"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Departments
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="learning" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium transition-all duration-200 hover:bg-admin/10 text-admin/70 hover:text-admin"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Learning Management
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="collaboration" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium transition-all duration-200 hover:bg-admin/10 text-admin/70 hover:text-admin"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Team Collaboration
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Team Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <span>All Departments</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredMembers().map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                          getStatusColor(member.status)
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{member.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {member.department}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Workload */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workload</span>
                        <span className={getWorkloadColor(member.workload)}>
                          {member.workload}%
                        </span>
                      </div>
                      <Progress value={member.workload} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {member.currentCapacity}
                      </p>
                    </div>

                    {/* Task Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-700">{member.tasksCompleted}</div>
                        <div className="text-xs text-green-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-700">{member.tasksInProgress}</div>
                        <div className="text-xs text-blue-600">In Progress</div>
                      </div>
                    </div>

                    {/* Collaboration Score */}
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-purple-700">Collaboration Score</span>
                        <span className="font-bold text-purple-800">{member.collaboration}%</span>
                      </div>
                      <Progress value={member.collaboration} className="h-2" />
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">Skills:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Workload Tab */}
          <TabsContent value="workload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Workload Management</CardTitle>
                <p className="text-muted-foreground">Monitor and manage team workload distribution</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Workload Distribution</h4>
                    <div className="space-y-3">
                      {getFilteredMembers().map((member) => (
                        <div key={member.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.department}</div>
                              </div>
                            </div>
                            <Badge 
                              variant={member.workload >= 90 ? "destructive" : member.workload >= 80 ? "secondary" : "default"}
                              className="text-xs"
                            >
                              {member.workload}% loaded
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Capacity</span>
                              <span>{member.currentCapacity}</span>
                            </div>
                            <Progress value={member.workload} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{member.tasksInProgress} active tasks</span>
                              <span>{member.activeProjects.length} projects</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Workload Analytics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-700">2</div>
                        <div className="text-sm text-red-600">Overloaded Members</div>
                        <div className="text-xs text-muted-foreground mt-1">≥90% capacity</div>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-700">3</div>
                        <div className="text-sm text-yellow-600">High Load Members</div>
                        <div className="text-xs text-muted-foreground mt-1">80-89% capacity</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">7</div>
                        <div className="text-sm text-green-600">Optimal Load</div>
                        <div className="text-xs text-muted-foreground mt-1">60-79% capacity</div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">1</div>
                        <div className="text-sm text-blue-600">Under-utilized</div>
                        <div className="text-xs text-muted-foreground mt-1">&lt;60% capacity</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Workload Recommendations</h5>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-amber-800">High Workload Alert</div>
                              <div className="text-xs text-amber-700">Mike Rodriguez is at 95% capacity. Consider redistributing tasks.</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-blue-800">Resource Available</div>
                              <div className="text-xs text-blue-700">Emily Davis has available capacity for new projects.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow">
                        <Timer className="w-4 h-4" />
                        Balance Workloads
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Management</CardTitle>
                <p className="text-muted-foreground">Manage departments and cross-functional collaboration</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="border-l-4" style={{ borderLeftColor: dept.color }}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{dept.name}</CardTitle>
                          <Badge variant="outline">{dept.members.length} members</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Average Workload</span>
                            <span className={getWorkloadColor(dept.avgWorkload)}>
                              {dept.avgWorkload}%
                            </span>
                          </div>
                          <Progress value={dept.avgWorkload} className="h-2" />
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Team Members</h5>
                          <div className="space-y-2">
                            {dept.members.slice(0, 3).map((member) => (
                              <div key={member.id} className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm flex-1">{member.name}</span>
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  getStatusColor(member.status)
                                )} />
                              </div>
                            ))}
                            {dept.members.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{dept.members.length - 3} more members
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Active Projects</h5>
                          <div className="space-y-1">
                            {dept.activeProjects.slice(0, 2).map((project, index) => (
                              <div key={index} className="text-xs bg-muted rounded px-2 py-1">
                                {project}
                              </div>
                            ))}
                            {dept.activeProjects.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{dept.activeProjects.length - 2} more projects
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="w-3 h-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Cross-Department Collaboration</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Active Collaborations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { 
                              name: "Website Redesign", 
                              departments: ["Engineering", "Design"], 
                              members: 6, 
                              progress: 75 
                            },
                            { 
                              name: "Marketing Campaign", 
                              departments: ["Marketing", "Design"], 
                              members: 4, 
                              progress: 45 
                            },
                            { 
                              name: "Data Analytics", 
                              departments: ["Engineering", "Marketing"], 
                              members: 3, 
                              progress: 90 
                            }
                          ].map((collab, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium">{collab.name}</h5>
                                <Badge variant="outline">{collab.members} members</Badge>
                              </div>
                              <div className="flex gap-1 mb-2">
                                {collab.departments.map((dept, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {dept}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{collab.progress}%</span>
                              </div>
                              <Progress value={collab.progress} className="h-1" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Collaboration Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-700">12</div>
                            <div className="text-sm text-blue-600">Active Projects</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">89%</div>
                            <div className="text-sm text-green-600">Success Rate</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-700">24</div>
                            <div className="text-sm text-purple-600">Cross-Dept Teams</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-700">4.2</div>
                            <div className="text-sm text-orange-600">Avg Team Size</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow">
                            <Plus className="w-4 h-4" />
                            Create Cross-Department Project
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Management Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Learning Management</CardTitle>
                <p className="text-muted-foreground">Manage organization-wide learning and development programs</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Learning Programs</h4>
                    <div className="space-y-3">
                      {[
                        { 
                          name: "Leadership Development", 
                          participants: 24, 
                          completion: 78, 
                          status: "active",
                          duration: "8 weeks"
                        },
                        { 
                          name: "Technical Skills Bootcamp", 
                          participants: 42, 
                          completion: 65, 
                          status: "active",
                          duration: "12 weeks"
                        },
                        { 
                          name: "Communication Excellence", 
                          participants: 18, 
                          completion: 92, 
                          status: "completed",
                          duration: "4 weeks"
                        },
                        { 
                          name: "Digital Transformation", 
                          participants: 35, 
                          completion: 45, 
                          status: "active",
                          duration: "16 weeks"
                        }
                      ].map((program, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium">{program.name}</h5>
                              <Badge variant={program.status === 'completed' ? 'default' : 'secondary'}>
                                {program.status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Participants</span>
                                <span>{program.participants} enrolled</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Completion Rate</span>
                                <span>{program.completion}%</span>
                              </div>
                              <Progress value={program.completion} className="h-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Duration: {program.duration}</span>
                                <Button size="sm" variant="ghost" className="h-6 px-2">
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Learning Analytics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">156</div>
                        <div className="text-sm text-blue-600">Total Learners</div>
                        <div className="text-xs text-muted-foreground mt-1">All employees enrolled</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">89%</div>
                        <div className="text-sm text-green-600">Completion Rate</div>
                        <div className="text-xs text-muted-foreground mt-1">Above industry avg</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">245h</div>
                        <div className="text-sm text-purple-600">Learning Hours</div>
                        <div className="text-xs text-muted-foreground mt-1">This month</div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-700">12</div>
                        <div className="text-sm text-orange-600">Active Programs</div>
                        <div className="text-xs text-muted-foreground mt-1">Various skill levels</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Department Learning Progress</h5>
                      <div className="space-y-3">
                        {departments.map((dept) => (
                          <div key={dept.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{dept.name}</span>
                              <Badge variant="outline">{dept.members.length} learners</Badge>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{Math.floor(Math.random() * 30) + 70}%</span>
                            </div>
                            <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow">
                        <Plus className="w-4 h-4" />
                        Create Learning Program
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Star className="w-4 h-4" />
                        View Learning Library
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Collaboration Management</CardTitle>
                <p className="text-muted-foreground">Manage organization-wide collaboration tools and initiatives</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Collaboration Tools</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { 
                          name: "Team Chat", 
                          users: 142, 
                          usage: 89, 
                          status: "active",
                          icon: MessageSquare,
                          description: "Internal messaging platform"
                        },
                        { 
                          name: "Video Meetings", 
                          users: 98, 
                          usage: 76, 
                          status: "active",
                          icon: CalendarIcon,
                          description: "Virtual meeting rooms"
                        },
                        { 
                          name: "File Sharing", 
                          users: 156, 
                          usage: 94, 
                          status: "active",
                          icon: Share2,
                          description: "Document collaboration"
                        },
                        { 
                          name: "Project Boards", 
                          users: 87, 
                          usage: 68, 
                          status: "active",
                          icon: Briefcase,
                          description: "Task management boards"
                        }
                      ].map((tool, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <tool.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium">{tool.name}</h5>
                                <p className="text-xs text-muted-foreground">{tool.description}</p>
                              </div>
                              <Badge variant={tool.status === 'active' ? 'default' : 'secondary'}>
                                {tool.status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Active Users</span>
                                <span>{tool.users} / 156</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Usage Rate</span>
                                <span>{tool.usage}%</span>
                              </div>
                              <Progress value={tool.usage} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Collaboration Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">324</div>
                        <div className="text-sm text-blue-600">Active Conversations</div>
                        <div className="text-xs text-muted-foreground mt-1">Across all channels</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">89%</div>
                        <div className="text-sm text-green-600">Response Rate</div>
                        <div className="text-xs text-muted-foreground mt-1">Within 2 hours</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">67</div>
                        <div className="text-sm text-purple-600">Meetings This Week</div>
                        <div className="text-xs text-muted-foreground mt-1">8.2 avg duration</div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-700">1.2k</div>
                        <div className="text-sm text-orange-600">Files Shared</div>
                        <div className="text-xs text-muted-foreground mt-1">This month</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Recent Activity</h5>
                      <div className="space-y-2">
                        {[
                          { action: "New project created", user: "Alice Johnson", time: "2 min ago", type: "project" },
                          { action: "Team meeting scheduled", user: "Bob Smith", time: "15 min ago", type: "meeting" },
                          { action: "Document shared", user: "Carol Davis", time: "1 hour ago", type: "file" },
                          { action: "Task completed", user: "David Wilson", time: "2 hours ago", type: "task" }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              activity.type === 'project' ? 'bg-blue-500' :
                              activity.type === 'meeting' ? 'bg-green-500' :
                              activity.type === 'file' ? 'bg-purple-500' : 'bg-orange-500'
                            )} />
                            <div className="flex-1">
                              <div className="text-sm">{activity.action}</div>
                              <div className="text-xs text-muted-foreground">by {activity.user}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow">
                        <Settings className="w-4 h-4" />
                        Configure Tools
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Activity className="w-4 h-4" />
                        View Analytics Dashboard
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Plus className="w-6 h-6" />
                      Create Team
                      <span className="text-xs text-muted-foreground">Set up new collaboration</span>
                    </Button>
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <CalendarIcon className="w-6 h-6" />
                      Schedule Meeting
                      <span className="text-xs text-muted-foreground">Organize team sync</span>
                    </Button>
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Share2 className="w-6 h-6" />
                      Share Resources
                      <span className="text-xs text-muted-foreground">Distribute documents</span>
                    </Button>
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Eye className="w-6 h-6" />
                      Monitor Activity
                      <span className="text-xs text-muted-foreground">Track engagement</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCollaboration;