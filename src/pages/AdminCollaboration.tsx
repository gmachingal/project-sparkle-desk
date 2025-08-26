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
  AlertCircle,
  BookOpen,
  Award,
  Download,
  Upload,
  Trash2,
  Edit,
  Clock,
  TrendingUp,
  Target,
  Users as UsersIcon,
  FileText,
  Video,
  Headphones,
  Image,
  Code,
  Zap,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const AdminCollaboration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  
  // Dialog states for new features
  const [isBrowseLibraryOpen, setIsBrowseLibraryOpen] = useState(false);
  const [isViewCertificatesOpen, setIsViewCertificatesOpen] = useState(false);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isViewMemberOpen, setIsViewMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  // Enhanced Program creation states with assessments
  const [programTitle, setProgramTitle] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [programCategory, setProgramCategory] = useState("");
  const [programDuration, setProgramDuration] = useState("");
  const [programLevel, setProgramLevel] = useState("");
  const [programCapacity, setProgramCapacity] = useState("");
  const [programAssessments, setProgramAssessments] = useState<any[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState({
    title: "",
    passingScore: 70,
    timeLimit: 30,
    questions: [{ question: "", options: ["", "", "", ""], correct: 0, explanation: "" }]
  });
  
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
            
            <Dialog open={isBrowseLibraryOpen} onOpenChange={setIsBrowseLibraryOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin"
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Library
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={isViewCertificatesOpen} onOpenChange={setIsViewCertificatesOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin"
                >
                  <Award className="w-4 h-4" />
                  View Certificates
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={isCreateProgramOpen} onOpenChange={setIsCreateProgramOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                  <Plus className="w-4 h-4" />
                  Create Program
                </Button>
              </DialogTrigger>
            </Dialog>
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

            {/* Team Members Grid - Compact Version */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getFilteredMembers().map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Header - Compact */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                          getStatusColor(member.status)
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      </div>
                    </div>

                    {/* Quick Stats - Compact */}
                    <div className="space-y-2 mb-3">
                      {/* Workload */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Workload</span>
                          <span className={getWorkloadColor(member.workload)}>
                            {member.workload}%
                          </span>
                        </div>
                        <Progress value={member.workload} className="h-1.5" />
                      </div>

                      {/* Task Stats - Horizontal */}
                      <div className="flex justify-between text-xs">
                        <div className="text-center">
                          <div className="font-bold text-green-600">{member.tasksCompleted}</div>
                          <div className="text-green-500">Done</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{member.tasksInProgress}</div>
                          <div className="text-blue-500">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-purple-600">{member.collaboration}%</div>
                          <div className="text-purple-500">Collab</div>
                        </div>
                      </div>

                      {/* Department Badge */}
                      <Badge variant="outline" className="text-xs w-fit">
                        {member.department}
                      </Badge>
                    </div>

                    {/* Actions - Compact */}
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 h-8 text-xs"
                        onClick={() => {
                          setSelectedMember(member);
                          setIsViewMemberOpen(true);
                        }}
                      >
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

                    <div className="grid grid-cols-1 gap-2">
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow"
                        onClick={() => toast({
                          title: "Create Learning Program",
                          description: "Setting up new organization-wide learning program"
                        })}
                      >
                        <Plus className="w-4 h-4" />
                        Create Learning Program
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-admin/30 hover:bg-admin/10"
                        onClick={() => toast({
                          title: "Learning Library",
                          description: "Browsing organization learning resources and content"
                        })}
                      >
                        <BookOpen className="w-4 h-4" />
                        Browse Learning Library
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-admin/30 hover:bg-admin/10"
                        onClick={() => toast({
                          title: "All Certificates",
                          description: "Viewing organization-wide certificates and achievements"
                        })}
                      >
                        <Award className="w-4 h-4" />
                        View All Certificates
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2 border-admin/30 hover:bg-admin/10"
                        onClick={() => toast({
                          title: "View & Manage",
                          description: "Managing organization learning programs and progress"
                        })}
                      >
                        <Eye className="w-4 h-4" />
                        View & Manage
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

        {/* Browse Learning Library Dialog */}
        <Dialog open={isBrowseLibraryOpen} onOpenChange={setIsBrowseLibraryOpen}>
          <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-admin" />
                Organization Learning Library
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Library Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-admin/20 bg-gradient-to-br from-admin/5 to-admin-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-admin/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-admin" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Courses</div>
                        <div className="text-xl font-bold text-admin">247</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Active Learners</div>
                        <div className="text-xl font-bold text-success">1,842</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Learning Hours</div>
                        <div className="text-xl font-bold text-warning">12,456</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                        <div className="text-xl font-bold text-info">87%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses, skills, categories..."
                    className="pl-10"
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow">
                  <Upload className="w-4 h-4" />
                  Add Content
                </Button>
              </div>

              {/* Course Categories */}
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="technical">Technical Skills</TabsTrigger>
                  <TabsTrigger value="leadership">Leadership</TabsTrigger>
                  <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="technical" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        id: "react-advanced",
                        title: "Advanced React Development",
                        description: "Master complex React patterns, hooks, and performance optimization",
                        instructor: "Sarah Johnson",
                        duration: "16 hours",
                        enrolled: 89,
                        rating: 4.8,
                        level: "Advanced",
                        type: "video",
                        lastUpdated: "2 days ago"
                      },
                      {
                        id: "typescript-pro",
                        title: "TypeScript for Professionals",
                        description: "Advanced TypeScript features and enterprise patterns",
                        instructor: "Mike Chen",
                        duration: "12 hours",
                        enrolled: 124,
                        rating: 4.9,
                        level: "Intermediate",
                        type: "interactive",
                        lastUpdated: "1 week ago"
                      },
                      {
                        id: "nodejs-scaling",
                        title: "Scaling Node.js Applications",
                        description: "Build and scale high-performance Node.js applications",
                        instructor: "Alex Rodriguez",
                        duration: "20 hours",
                        enrolled: 67,
                        rating: 4.7,
                        level: "Advanced",
                        type: "hands-on",
                        lastUpdated: "3 days ago"
                      }
                    ].map((course) => (
                      <Card key={course.id} className="hover:shadow-lg transition-all duration-200">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {course.type === "video" && <Video className="w-4 h-4 text-blue-500" />}
                              {course.type === "interactive" && <Zap className="w-4 h-4 text-purple-500" />}
                              {course.type === "hands-on" && <Code className="w-4 h-4 text-green-500" />}
                              <Badge variant="outline" className="text-xs">
                                {course.level}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <h4 className="font-semibold text-sm mb-2">{course.title}</h4>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>By {course.instructor}</span>
                              <span>⭐ {course.rating}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>{course.duration}</span>
                              <span>{course.enrolled} enrolled</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Updated {course.lastUpdated}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="leadership">
                  <div className="text-center py-8">
                    <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Leadership courses coming soon...</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="soft-skills">
                  <div className="text-center py-8">
                    <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Soft skills courses coming soon...</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Compliance courses coming soon...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Certificates Dialog */}
        <Dialog open={isViewCertificatesOpen} onOpenChange={setIsViewCertificatesOpen}>
          <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-admin" />
                Organization Certificates & Achievements
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Certificate Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-admin/20 bg-gradient-to-br from-admin/5 to-admin-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-admin/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-admin" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Certificates</div>
                        <div className="text-xl font-bold text-admin">1,247</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                        <div className="text-xl font-bold text-success">89</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Top Achievers</div>
                        <div className="text-xl font-bold text-warning">23</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <Download className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Downloads</div>
                        <div className="text-xl font-bold text-info">456</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Actions */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search certificates, employees, skills..."
                    className="pl-10"
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export All
                </Button>
              </div>

              {/* Recent Certificates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "cert-001",
                      employee: "Sarah Johnson",
                      course: "Advanced React Development",
                      department: "Engineering",
                      completedDate: "2024-08-24",
                      score: 96,
                      level: "Advanced",
                      avatar: "",
                      certificateId: "RCT-ADV-2024-001"
                    },
                    {
                      id: "cert-002",
                      employee: "Mike Chen",
                      course: "TypeScript for Professionals",
                      department: "Engineering",
                      completedDate: "2024-08-23",
                      score: 94,
                      level: "Intermediate",
                      avatar: "",
                      certificateId: "TS-PRO-2024-002"
                    },
                    {
                      id: "cert-003",
                      employee: "Emily Davis",
                      course: "Leadership Fundamentals",
                      department: "Marketing",
                      completedDate: "2024-08-22",
                      score: 92,
                      level: "Beginner",
                      avatar: "",
                      certificateId: "LDR-FND-2024-003"
                    },
                    {
                      id: "cert-004",
                      employee: "Alex Rodriguez",
                      course: "Node.js Scaling",
                      department: "Engineering",
                      completedDate: "2024-08-21",
                      score: 98,
                      level: "Advanced",
                      avatar: "",
                      certificateId: "NJS-SCL-2024-004"
                    },
                    {
                      id: "cert-005",
                      employee: "Lisa Thompson",
                      course: "UI/UX Design Principles",
                      department: "Design",
                      completedDate: "2024-08-20",
                      score: 95,
                      level: "Intermediate",
                      avatar: "",
                      certificateId: "UXD-PRI-2024-005"
                    },
                    {
                      id: "cert-006",
                      employee: "David Wilson",
                      course: "Project Management",
                      department: "Engineering",
                      completedDate: "2024-08-19",
                      score: 91,
                      level: "Intermediate",
                      avatar: "",
                      certificateId: "PMG-INT-2024-006"
                    }
                  ].map((cert) => (
                    <Card 
                      key={cert.id} 
                      className="group hover:shadow-lg transition-all duration-200 cursor-pointer relative"
                      onClick={() => {
                        toast({
                          title: "Certificate Details",
                          description: `Viewing ${cert.employee}'s ${cert.course} certificate...`,
                        });
                      }}
                    >
                      {/* Hover Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "Download Certificate",
                              description: `Downloading ${cert.employee}'s certificate...`,
                            });
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={cert.avatar} />
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {cert.employee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-sm">{cert.employee}</h4>
                              <Badge variant="outline" className="text-xs">
                                {cert.department}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600">{cert.score}%</div>
                            <Badge variant="secondary" className="text-xs">
                              {cert.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">{cert.course}</h5>
                          <div className="text-xs text-muted-foreground">
                            Certificate ID: {cert.certificateId}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completed: {new Date(cert.completedDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {/* Click to view hint */}
                        <div className="text-xs text-muted-foreground text-center py-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          Click to view certificate details
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Learning Program Dialog */}
        <Dialog open={isCreateProgramOpen} onOpenChange={setIsCreateProgramOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-admin" />
                Create Learning Program
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Program Basic Info */}
              <Card className="border-admin/20">
                <CardHeader>
                  <CardTitle className="text-lg">Program Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="program-name" className="text-sm font-medium">Program Name</Label>
                      <Input
                        id="program-name"
                        value={programTitle}
                        onChange={(e) => setProgramTitle(e.target.value)}
                        placeholder="e.g., Frontend Development Bootcamp"
                        className="mt-1 bg-background"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="program-category" className="text-sm font-medium">Category</Label>
                      <Select value={programCategory} onValueChange={setProgramCategory}>
                        <SelectTrigger className="mt-1 bg-background">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          <SelectItem value="technical">Technical Skills</SelectItem>
                          <SelectItem value="leadership">Leadership Development</SelectItem>
                          <SelectItem value="soft-skills">Soft Skills</SelectItem>
                          <SelectItem value="compliance">Compliance Training</SelectItem>
                          <SelectItem value="onboarding">Employee Onboarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="program-description" className="text-sm font-medium">Program Description</Label>
                    <Textarea
                      id="program-description"
                      value={programDescription}
                      onChange={(e) => setProgramDescription(e.target.value)}
                      placeholder="Describe the learning objectives, target audience, and expected outcomes..."
                      rows={3}
                      className="mt-1 bg-background"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
                      <Select value={programDuration} onValueChange={setProgramDuration}>
                        <SelectTrigger className="mt-1 bg-background">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty Level</Label>
                      <Select value={programLevel} onValueChange={setProgramLevel}>
                        <SelectTrigger className="mt-1 bg-background">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="capacity" className="text-sm font-medium">Max Participants</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={programCapacity}
                        onChange={(e) => setProgramCapacity(e.target.value)}
                        placeholder="e.g., 50"
                        className="mt-1 bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Target Audience</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Departments</Label>
                    <div className="space-y-2 mt-2">
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex items-center space-x-2">
                          <Checkbox id={`dept-${dept.id}`} />
                          <label htmlFor={`dept-${dept.id}`} className="text-sm">
                            {dept.name} ({dept.members.length} members)
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Job Roles</Label>
                    <div className="space-y-2 mt-2">
                      {["Software Engineer", "Team Lead", "Designer", "Product Manager", "Data Analyst"].map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox id={`role-${role}`} />
                          <label htmlFor={`role-${role}`} className="text-sm">
                            {role}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Program Curriculum</Label>
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h4 className="font-medium mb-2">Add Courses to Program</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select existing courses or create new ones to build your program curriculum
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Browse Library
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Upload className="w-4 h-4" />
                          Create Course
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Assessment Builder */}
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    Program Assessments
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Create assessments to evaluate learner progress and knowledge retention
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Assessment Builder */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="assessment-title">Assessment Title</Label>
                          <Input
                            id="assessment-title"
                            value={currentAssessment.title}
                            onChange={(e) => setCurrentAssessment(prev => ({
                              ...prev,
                              title: e.target.value
                            }))}
                            placeholder="e.g., React Fundamentals Quiz"
                            className="bg-background"
                          />
                        </div>
                        <div>
                          <Label htmlFor="passing-score">Passing Score (%)</Label>
                          <Input
                            id="passing-score"
                            type="number"
                            min="0"
                            max="100"
                            value={currentAssessment.passingScore}
                            onChange={(e) => setCurrentAssessment(prev => ({
                              ...prev,
                              passingScore: parseInt(e.target.value) || 70
                            }))}
                            className="bg-background"
                          />
                        </div>
                        <div>
                          <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                          <Input
                            id="time-limit"
                            type="number"
                            min="5"
                            max="180"
                            value={currentAssessment.timeLimit}
                            onChange={(e) => setCurrentAssessment(prev => ({
                              ...prev,
                              timeLimit: parseInt(e.target.value) || 30
                            }))}
                            className="bg-background"
                          />
                        </div>
                      </div>
                      
                      {/* Questions Builder */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">Questions</Label>
                          <Badge variant="outline">{currentAssessment.questions.length} questions</Badge>
                        </div>
                        
                        {currentAssessment.questions.map((question, questionIndex) => (
                          <Card key={questionIndex} className="border-border/50">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline">Question {questionIndex + 1}</Badge>
                                  {currentAssessment.questions.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const newQuestions = currentAssessment.questions.filter((_, i) => i !== questionIndex);
                                        setCurrentAssessment(prev => ({
                                          ...prev,
                                          questions: newQuestions
                                        }));
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                                
                                <div>
                                  <Label>Question Text</Label>
                                  <Textarea
                                    value={question.question}
                                    onChange={(e) => {
                                      const newQuestions = [...currentAssessment.questions];
                                      newQuestions[questionIndex].question = e.target.value;
                                      setCurrentAssessment(prev => ({
                                        ...prev,
                                        questions: newQuestions
                                      }));
                                    }}
                                    placeholder="Enter your question..."
                                    className="bg-background"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Answer Options</Label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex} className="flex items-center gap-2">
                                        <Input
                                          value={option}
                                          onChange={(e) => {
                                            const newQuestions = [...currentAssessment.questions];
                                            newQuestions[questionIndex].options[optionIndex] = e.target.value;
                                            setCurrentAssessment(prev => ({
                                              ...prev,
                                              questions: newQuestions
                                            }));
                                          }}
                                          placeholder={`Option ${optionIndex + 1}`}
                                          className="bg-background"
                                        />
                                        <Checkbox
                                          checked={question.correct === optionIndex}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              const newQuestions = [...currentAssessment.questions];
                                              newQuestions[questionIndex].correct = optionIndex;
                                              setCurrentAssessment(prev => ({
                                                ...prev,
                                                questions: newQuestions
                                              }));
                                            }
                                          }}
                                        />
                                        <Label className="text-xs whitespace-nowrap">Correct</Label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <Label>Explanation (Optional)</Label>
                                  <Textarea
                                    value={question.explanation || ""}
                                    onChange={(e) => {
                                      const newQuestions = [...currentAssessment.questions];
                                      newQuestions[questionIndex].explanation = e.target.value;
                                      setCurrentAssessment(prev => ({
                                        ...prev,
                                        questions: newQuestions
                                      }));
                                    }}
                                    placeholder="Explain why this is the correct answer..."
                                    className="bg-background"
                                    rows={2}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentAssessment(prev => ({
                              ...prev,
                              questions: [
                                ...prev.questions,
                                { question: "", options: ["", "", "", ""], correct: 0, explanation: "" }
                              ]
                            }));
                          }}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            if (currentAssessment.title && currentAssessment.questions[0].question) {
                              setProgramAssessments(prev => [...prev, { 
                                ...currentAssessment, 
                                id: Date.now(),
                                createdAt: new Date().toISOString()
                              }]);
                              setCurrentAssessment({
                                title: "",
                                passingScore: 70,
                                timeLimit: 30,
                                questions: [{ question: "", options: ["", "", "", ""], correct: 0, explanation: "" }]
                              });
                              toast({
                                title: "Assessment Added",
                                description: "Assessment has been added to the program",
                              });
                            }
                          }}
                          disabled={!currentAssessment.title || !currentAssessment.questions[0].question}
                          className="bg-gradient-to-r from-admin to-admin-glow"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Assessment
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Added Assessments List */}
                  {programAssessments.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Program Assessments</Label>
                        <Badge variant="secondary">{programAssessments.length} assessment{programAssessments.length !== 1 ? 's' : ''}</Badge>
                      </div>
                      
                      {programAssessments.map((assessment, index) => (
                        <Card key={assessment.id} className="border-success/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{assessment.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {assessment.questions.length} questions
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                  <div>
                                    <span className="font-medium">Passing Score:</span> {assessment.passingScore}%
                                  </div>
                                  <div>
                                    <span className="font-medium">Time Limit:</span> {assessment.timeLimit} min
                                  </div>
                                  <div>
                                    <span className="font-medium">Questions:</span> {assessment.questions.length}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setProgramAssessments(prev => prev.filter(a => a.id !== assessment.id));
                                    toast({
                                      title: "Assessment Removed",
                                      description: "Assessment has been removed from the program",
                                    });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Program Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Program Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-enroll" />
                    <label htmlFor="auto-enroll" className="text-sm">
                      Auto-enroll new employees matching criteria
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-reminders" />
                    <label htmlFor="send-reminders" className="text-sm">
                      Send completion reminders
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="certificate" />
                    <label htmlFor="certificate" className="text-sm">
                      Generate completion certificates
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="manager-notifications" />
                    <label htmlFor="manager-notifications" className="text-sm">
                      Notify managers of progress
                    </label>
                  </div>
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 bg-gradient-to-r from-admin to-admin-glow"
                  onClick={() => {
                    if (programTitle && programDescription && programAssessments.length > 0) {
                      toast({
                        title: "Learning Program Created! 🎉",
                        description: `"${programTitle}" has been created with ${programAssessments.length} assessments and is ready for enrollment.`
                      });
                      // Reset form
                      setProgramTitle("");
                      setProgramDescription("");
                      setProgramCategory("");
                      setProgramDuration("");
                      setProgramLevel("");
                      setProgramCapacity("");
                      setProgramAssessments([]);
                      setCurrentAssessment({
                        title: "",
                        passingScore: 70,
                        timeLimit: 30,
                        questions: [{ question: "", options: ["", "", "", ""], correct: 0, explanation: "" }]
                      });
                      setIsCreateProgramOpen(false);
                    } else {
                      toast({
                        title: "Missing Information",
                        description: "Please complete program details and add at least one assessment.",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Program ({programAssessments.length} assessment{programAssessments.length !== 1 ? 's' : ''})
                </Button>
                <Button variant="outline" onClick={() => setIsCreateProgramOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Member Detail View Dialog */}
        <Dialog open={isViewMemberOpen} onOpenChange={setIsViewMemberOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-admin" />
                Team Member Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedMember && (
              <div className="space-y-6">
                {/* Member Profile Header */}
                <Card className="border-admin/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Avatar & Basic Info */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={selectedMember.avatar} />
                            <AvatarFallback className="bg-gradient-to-r from-admin to-admin-glow text-white text-2xl">
                              {selectedMember.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center",
                            getStatusColor(selectedMember.status)
                          )}>
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        </div>
                        <Badge 
                          variant={selectedMember.status === 'online' ? 'default' : 'secondary'} 
                          className="mt-2 capitalize"
                        >
                          {selectedMember.status.replace('-', ' ')}
                        </Badge>
                      </div>

                      {/* Personal Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                          <p className="text-lg text-muted-foreground">{selectedMember.role}</p>
                          <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Department</Label>
                            <div className="font-medium">{selectedMember.department}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Last Activity</Label>
                            <div className="font-medium">{selectedMember.lastActivity}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Join Date</Label>
                            <div className="font-medium">Jan 2023</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Employee ID</Label>
                            <div className="font-medium">EMP-{selectedMember.id.padStart(4, '0')}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow">
                          <MessageSquare className="w-4 h-4" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Calendar className="w-4 h-4" />
                          Schedule Meeting
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Settings className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-700">{selectedMember.tasksCompleted}</div>
                          <div className="text-sm text-green-600">Tasks Completed</div>
                          <div className="text-xs text-muted-foreground">This month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-700">{selectedMember.tasksInProgress}</div>
                          <div className="text-sm text-blue-600">Active Tasks</div>
                          <div className="text-xs text-muted-foreground">In progress</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-700">{selectedMember.collaboration}%</div>
                          <div className="text-sm text-purple-600">Collaboration</div>
                          <div className="text-xs text-muted-foreground">Team engagement</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Workload & Capacity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-admin" />
                        Workload & Capacity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Current Workload</span>
                          <span className={cn("text-sm font-bold", getWorkloadColor(selectedMember.workload))}>
                            {selectedMember.workload}%
                          </span>
                        </div>
                        <Progress value={selectedMember.workload} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-1">{selectedMember.currentCapacity}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Capacity Breakdown</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Regular Tasks</span>
                            <span>28h</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Meetings</span>
                            <span>6h</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Available</span>
                            <span>6h</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills & Expertise */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="w-5 h-5 text-admin" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedMember.skills.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                            <span className="font-medium text-sm">{skill}</span>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "w-3 h-3",
                                      i < (Math.floor(Math.random() * 2) + 3) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    )} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {Math.floor(Math.random() * 3) + 2}y
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Projects */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-admin" />
                        Active Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedMember.activeProjects.map((project, index) => (
                          <div key={index} className="p-3 rounded-lg border border-border/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{project}</h4>
                              <Badge variant="outline" className="text-xs">Active</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={Math.floor(Math.random() * 40) + 40} className="flex-1 h-2" />
                              <span className="text-xs text-muted-foreground">
                                {Math.floor(Math.random() * 40) + 40}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="w-5 h-5 text-admin" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                          <div>
                            <div className="text-sm font-medium">Completed task review</div>
                            <div className="text-xs text-muted-foreground">2 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                          <div>
                            <div className="text-sm font-medium">Updated project status</div>
                            <div className="text-xs text-muted-foreground">4 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                          <div>
                            <div className="text-sm font-medium">Attended team meeting</div>
                            <div className="text-xs text-muted-foreground">1 day ago</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Footer */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                  </Button>
                  <Button variant="outline" onClick={() => setIsViewMemberOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminCollaboration;