import { useState } from "react";
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
  Bell
} from "lucide-react";

const AdminCollaboration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const { toast } = useToast();

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

          {/* Other tabs content would go here */}
          <TabsContent value="workload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Workload management content for admin view...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Department management content for admin view...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Learning management content for admin view...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Team collaboration analytics for admin view...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCollaboration;
