import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { 
  Users, 
  Search,
  Mail,
  Calendar,
  Briefcase,
  Target,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  Play,
  BarChart3,
  UserCheck,
  MessageSquare,
  Activity,
  Award,
  Filter,
  ArrowRight,
  Settings,
  Plus,
  CalendarDays,
  Share2,
  FileText,
  Zap,
  Coffee
} from "lucide-react";

const Teams = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const { toast } = useToast();

  // Mock team data - now focused on collaboration and workload
  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@company.com",
      role: "Team Lead",
      department: "Engineering",
      avatar: "",
      status: "online",
      joinDate: "Jan 2023",
      activeProjects: ["Website Redesign", "Mobile App"],
      skills: ["React", "TypeScript", "Node.js"],
      workload: 85, // Percentage
      currentCapacity: "34h / 40h this week",
      tasksCompleted: 42,
      tasksInProgress: 3,
      collaboration: 92, // Collaboration score
      lastActivity: "2 hours ago",
      timezone: "PST",
      availableUntil: "6:00 PM",
      recentTasks: [
        { id: "1", name: "Project Architecture Review", status: "in-progress", priority: "high", progress: 75 },
        { id: "2", name: "Team Onboarding", status: "completed", priority: "medium", progress: 100 },
        { id: "3", name: "Code Review Process", status: "todo", priority: "medium", progress: 0 }
      ]
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "UI/UX Designer",
      department: "Design",
      avatar: "",
      status: "online",
      joinDate: "Mar 2023",
      activeProjects: ["Website Redesign", "Marketing Campaign"],
      skills: ["Figma", "Sketch", "Prototyping"],
      workload: 70,
      currentCapacity: "28h / 40h this week",
      tasksCompleted: 38,
      tasksInProgress: 2,
      collaboration: 88,
      lastActivity: "30 minutes ago",
      timezone: "EST",
      availableUntil: "5:30 PM",
      recentTasks: [
        { id: "4", name: "Homepage Wireframes", status: "completed", priority: "high", progress: 100 },
        { id: "5", name: "Design System Update", status: "in-progress", priority: "medium", progress: 60 },
        { id: "6", name: "User Testing Analysis", status: "todo", priority: "low", progress: 0 }
      ]
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@company.com",
      role: "Backend Developer",
      department: "Engineering",
      avatar: "",
      status: "away",
      joinDate: "Feb 2023",
      activeProjects: ["Mobile App", "Data Analytics"],
      skills: ["Python", "PostgreSQL", "AWS"],
      workload: 95,
      currentCapacity: "38h / 40h this week",
      tasksCompleted: 35,
      tasksInProgress: 4,
      collaboration: 76,
      lastActivity: "1 hour ago",
      timezone: "CST",
      availableUntil: "7:00 PM",
      recentTasks: [
        { id: "7", name: "API Development", status: "in-progress", priority: "high", progress: 80 },
        { id: "8", name: "Database Optimization", status: "completed", priority: "medium", progress: 100 },
        { id: "9", name: "Security Audit", status: "todo", priority: "high", progress: 0 }
      ]
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "Marketing Manager",
      department: "Marketing",
      avatar: "",
      status: "in-meeting",
      joinDate: "Dec 2022",
      activeProjects: ["Marketing Campaign"],
      skills: ["Content Strategy", "SEO", "Analytics"],
      workload: 60,
      currentCapacity: "24h / 40h this week",
      tasksCompleted: 28,
      tasksInProgress: 2,
      collaboration: 94,
      lastActivity: "Just now",
      timezone: "PST",
      availableUntil: "4:30 PM",
      recentTasks: [
        { id: "10", name: "Campaign Strategy", status: "completed", priority: "high", progress: 100 },
        { id: "11", name: "Content Calendar", status: "in-progress", priority: "medium", progress: 45 },
        { id: "12", name: "Analytics Dashboard", status: "todo", priority: "low", progress: 0 }
      ]
    },
    {
      id: "5",
      name: "David Kim",
      email: "david@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      avatar: "",
      status: "online",
      joinDate: "Apr 2023",
      activeProjects: ["Website Redesign", "Mobile App"],
      skills: ["React", "CSS", "JavaScript"],
      workload: 75,
      currentCapacity: "30h / 40h this week",
      tasksCompleted: 31,
      tasksInProgress: 3,
      collaboration: 82,
      lastActivity: "15 minutes ago",
      timezone: "PST",
      availableUntil: "6:00 PM",
      recentTasks: [
        { id: "13", name: "Component Library", status: "in-progress", priority: "medium", progress: 70 },
        { id: "14", name: "Responsive Design", status: "todo", priority: "medium", progress: 0 },
        { id: "15", name: "Performance Optimization", status: "todo", priority: "low", progress: 0 }
      ]
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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Play className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const teamStats = {
    total: teamMembers.length,
    online: teamMembers.filter(m => m.status === "online").length,
    avgWorkload: Math.round(teamMembers.reduce((acc, m) => acc + m.workload, 0) / teamMembers.length),
    totalProjects: [...new Set(teamMembers.flatMap(m => m.activeProjects))].length,
    completedTasks: teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0),
    inProgressTasks: teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)
  };

  const handleAssignTask = (memberId: string) => {
    setSelectedMember(teamMembers.find(m => m.id === memberId));
    setIsAssignTaskOpen(true);
  };

  const quickAssignTask = () => {
    if (!selectedMember) return;
    
    toast({
      title: "Task Assigned",
      description: `New task assigned to ${selectedMember.name}`,
    });
    setIsAssignTaskOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Team Collaboration
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage workloads, track progress, and collaborate effectively
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Team Chat
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Team Communication</DialogTitle>
                </DialogHeader>
                <div className="p-4 text-center text-muted-foreground">
                  Team chat feature coming soon...
                </div>
              </DialogContent>
            </Dialog>
            
            <Button className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Meeting
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Overview
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Workload
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Collaboration
            </TabsTrigger>
          </TabsList>

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
                  <SelectValue />
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

                    {/* Current Projects */}
                    <div>
                      <p className="text-sm font-medium mb-2">Active Projects</p>
                      <div className="flex flex-wrap gap-1">
                        {member.activeProjects.slice(0, 2).map((project, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                        {member.activeProjects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.activeProjects.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{member.tasksCompleted} done</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3 text-blue-500" />
                        <span>{member.tasksInProgress} active</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs"
                        onClick={() => handleAssignTask(member.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Assign Task
                      </Button>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-96">
                          <SheetHeader>
                            <SheetTitle>{member.name}</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {member.department}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm">Availability</span>
                                <span className="text-sm font-medium">Until {member.availableUntil}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Timezone</span>
                                <span className="text-sm font-medium">{member.timezone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Last Activity</span>
                                <span className="text-sm font-medium">{member.lastActivity}</span>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {member.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Recent Tasks</h4>
                              <div className="space-y-2">
                                {member.recentTasks.map((task) => (
                                  <div key={task.id} className="flex items-center gap-2 p-2 border rounded">
                                    {getTaskStatusIcon(task.status)}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm truncate">{task.name}</p>
                                      <Progress value={task.progress} className="h-1 mt-1" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workload Management Tab */}
          <TabsContent value="workload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{member.name}</span>
                          <span className={cn("text-sm font-medium", getWorkloadColor(member.workload))}>
                            {member.workload}%
                          </span>
                        </div>
                        <Progress value={member.workload} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {member.currentCapacity} • {member.tasksInProgress} active tasks
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={member.workload > 85 ? "outline" : "default"}
                        onClick={() => handleAssignTask(member.id)}
                        disabled={member.workload > 95}
                      >
                        {member.workload > 85 ? "Overloaded" : "Assign Task"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Team Workload</span>
                        <span className={getWorkloadColor(dept.avgWorkload)}>
                          {dept.avgWorkload}%
                        </span>
                      </div>
                      <Progress value={dept.avgWorkload} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Team Members ({dept.members.length})</p>
                      <div className="flex -space-x-2">
                        {dept.members.slice(0, 4).map((member) => (
                          <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {dept.members.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{dept.members.length - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Active Projects</p>
                      <div className="space-y-1">
                        {dept.activeProjects.map((project, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs mr-1">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Department Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers
                      .sort((a, b) => b.collaboration - a.collaboration)
                      .slice(0, 5)
                      .map((member, idx) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {member.collaboration}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">AJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Alex completed <strong>Project Architecture Review</strong></p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Sarah shared wireframes with the team</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">MR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">Mike deployed API updates to staging</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Task Assignment Dialog */}
        <Dialog open={isAssignTaskOpen} onOpenChange={setIsAssignTaskOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Task to {selectedMember?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Task Title</label>
                <Input placeholder="Enter task title..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div className="flex gap-2">
                <Button onClick={quickAssignTask} className="flex-1">
                  Assign Task
                </Button>
                <Button variant="outline" onClick={() => setIsAssignTaskOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Teams;