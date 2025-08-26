import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
  Coffee,
  BookOpen,
  GraduationCap,
  Timer,
  Star,
  PieChart,
  Download,
  Edit,
  Save,
  X,
  ChevronRight,
  PlayCircle,
  Pause,
  CheckSquare,
  User
} from "lucide-react";
const Collaboration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAssignTaskOpen, setIsAssignTaskOpen] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState<any>(null);
  const [selectedLearningTopic, setSelectedLearningTopic] = useState<any>(null);
  const [isTimeLoggingOpen, setIsTimeLoggingOpen] = useState(false);
  const [isAssignLearningOpen, setIsAssignLearningOpen] = useState(false);
  const [isLearningAssessmentOpen, setIsLearningAssessmentOpen] = useState(false);
  const [timeLogData, setTimeLogData] = useState({ hours: '', notes: '', date: new Date().toISOString().split('T')[0] });
  const { toast } = useToast();

  // Mock user data - employee view only
  const currentUser = {
    name: 'John Doe',
    id: '1',
    role: 'admin' // Change to 'member' for regular users
  };

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
    // Employee view - show only current user's data
    return teamMembers.filter(member => member.id === currentUser.id);
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
    // User-specific stats (employee view)
    total: 1,
    online: teamMembers.find(m => m.id === currentUser.id)?.status === "online" ? 1 : 0,
    avgWorkload: teamMembers.find(m => m.id === currentUser.id)?.workload || 0,
    totalProjects: teamMembers.find(m => m.id === currentUser.id)?.activeProjects.length || 0,
    completedTasks: teamMembers.find(m => m.id === currentUser.id)?.tasksCompleted || 0,
    inProgressTasks: teamMembers.find(m => m.id === currentUser.id)?.tasksInProgress || 0
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
              My Collaboration
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress, collaborate with team members, and manage your workload
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Admin Switch - Same pattern as Attendance */}
            {currentUser.role === 'admin' && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/10 hover:from-primary/10 hover:to-primary-glow/20 transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Employee</span>
                </div>
                <Switch 
                  checked={false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      window.location.href = '/admin-collaboration';
                    }
                  }}
                  className="data-[state=checked]:bg-admin scale-75"
                />
                <span className="text-sm text-muted-foreground">Admin</span>
              </div>
            )}
            
            <Button variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Team Chat
            </Button>
            
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
                  <div className="text-xs text-muted-foreground">Your Profile</div>
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
                  <div className="text-xs text-muted-foreground">Status</div>
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
                  <div className="text-xs text-muted-foreground">My Workload</div>
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
                  <div className="text-xs text-muted-foreground">My Projects</div>
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
                  <div className="text-xs text-muted-foreground">My Completed</div>
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
                  <div className="text-xs text-muted-foreground">My Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Overview
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              My Workload
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              My Team
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              My Learning
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              My Collaboration
            </TabsTrigger>
          </TabsList>

          {/* Team Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filters - Not needed for employee view */}
            
            {/* User View - My Profile Card */}
              <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
                <CardHeader>
                  <CardTitle className="text-2xl">My Profile & Progress</CardTitle>
                  <p className="text-muted-foreground">Track your personal performance and collaborate with your team</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {teamMembers.find(m => m.id === currentUser.id)?.name.split(' ').map(n => n[0]).join('') || 'AJ'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{teamMembers.find(m => m.id === currentUser.id)?.name || 'Alex Johnson'}</h3>
                        <p className="text-muted-foreground">{teamMembers.find(m => m.id === currentUser.id)?.role || 'Team Lead'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(teamMembers.find(m => m.id === currentUser.id)?.status || 'online'))} />
                          <span className="text-sm text-muted-foreground capitalize">{teamMembers.find(m => m.id === currentUser.id)?.status || 'online'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Workload</p>
                        <div className="flex items-center gap-2">
                          <Progress value={teamMembers.find(m => m.id === currentUser.id)?.workload || 85} className="flex-1" />
                          <span className={cn("font-semibold", getWorkloadColor(teamMembers.find(m => m.id === currentUser.id)?.workload || 85))}>
                            {teamMembers.find(m => m.id === currentUser.id)?.workload || 85}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">This Week</p>
                        <p className="font-medium">{teamMembers.find(m => m.id === currentUser.id)?.currentCapacity || '34h / 40h'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{teamMembers.find(m => m.id === currentUser.id)?.tasksCompleted || 42}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{teamMembers.find(m => m.id === currentUser.id)?.tasksInProgress || 3}</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            
            {/* Personal Collaboration Content */}
            <div className="space-y-6">
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
            )}

            {/* Personal Collaboration Content - User View */}
            {(currentUser.role !== 'admin' || !isAdminView) && (
              <div className="space-y-6">
                {/* My Active Collaborations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      My Active Collaborations
                    </CardTitle>
                    <p className="text-muted-foreground">Projects and tasks you're collaborating on</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          project: "Website Redesign",
                          collaborators: ["Sarah Chen", "David Kim"],
                          role: "Technical Lead",
                          progress: 75,
                          deadline: "2 days",
                          priority: "high"
                        },
                        {
                          project: "Mobile App Development", 
                          collaborators: ["Mike Rodriguez"],
                          role: "Frontend Developer",
                          progress: 45,
                          deadline: "1 week",
                          priority: "medium"
                        }
                      ].map((collab, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{collab.project}</h4>
                              <p className="text-sm text-muted-foreground">Role: {collab.role}</p>
                            </div>
                            <Badge variant={collab.priority === 'high' ? 'destructive' : 'default'}>
                              {collab.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Progress:</span>
                            <Progress value={collab.progress} className="flex-1" />
                            <span className="text-sm font-medium">{collab.progress}%</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Collaborating with:</span>
                              <div className="flex -space-x-1">
                                {collab.collaborators.map((name, i) => (
                                  <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                    <AvatarFallback className="text-xs">
                                      {name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">Due in {collab.deadline}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* My Learning Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      My Learning Progress
                    </CardTitle>
                    <p className="text-muted-foreground">Track your learning and development goals</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          topic: "Advanced React Patterns",
                          category: "Technical",
                          progress: 75,
                          hoursLogged: 12,
                          totalHours: 16,
                          nextMilestone: "Complete Hooks Module",
                          dueDate: "Next Friday"
                        },
                        {
                          topic: "Leadership Skills",
                          category: "Soft Skills", 
                          progress: 40,
                          hoursLogged: 8,
                          totalHours: 20,
                          nextMilestone: "Team Management Workshop",
                          dueDate: "End of Month"
                        }
                      ].map((learning, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{learning.topic}</h4>
                              <Badge variant="outline" className="text-xs mt-1">
                                {learning.category}
                              </Badge>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => setIsTimeLoggingOpen(true)}>
                              <Timer className="w-3 h-3 mr-1" />
                              Log Hours
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{learning.progress}%</span>
                            </div>
                            <Progress value={learning.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Hours:</span>
                              <span className="font-medium ml-2">{learning.hoursLogged}/{learning.totalHours}h</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Due:</span>
                              <span className="font-medium ml-2">{learning.dueDate}</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Next Milestone:</p>
                            <p className="font-medium">{learning.nextMilestone}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              <PlayCircle className="w-3 h-3 mr-1" />
                              Continue Learning
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              <CheckSquare className="w-3 h-3 mr-1" />
                              Take Assessment
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
          {/* Learning Module Tab */}
          <TabsContent value="learning" className="space-y-6">
            {/* Learning Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Active Topics</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">156h</div>
                      <div className="text-xs text-muted-foreground">Total Hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-xs text-muted-foreground">Avg Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Learning Progress */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Team Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Sarah Chen", avatar: "SC", topic: "React Advanced Patterns", progress: 85, hours: 12, status: "in-progress" },
                        { name: "Mike Johnson", avatar: "MJ", topic: "API Security Best Practices", progress: 100, hours: 8, status: "completed" },
                        { name: "Emily Davis", avatar: "ED", topic: "UI/UX Design Principles", progress: 60, hours: 6, status: "in-progress" },
                        { name: "Alex Kim", avatar: "AK", topic: "Testing Strategies", progress: 45, hours: 4, status: "in-progress" },
                        { name: "David Liu", avatar: "DL", topic: "DevOps Fundamentals", progress: 90, hours: 15, status: "in-progress" },
                        { name: "Lisa Zhang", avatar: "LZ", topic: "Data Analytics", progress: 100, hours: 10, status: "completed" }
                      ].map((member, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">{member.avatar}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{member.name}</h4>
                              <Badge 
                                variant={member.status === 'completed' ? 'default' : 'secondary'}
                                className={member.status === 'completed' ? 'bg-green-500' : ''}
                              >
                                {member.status === 'completed' ? 'Completed' : 'In Progress'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{member.topic}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{member.progress}%</span>
                                </div>
                                <Progress value={member.progress} className="h-2" />
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {member.hours}h
                              </div>
                            </div>
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2"
                                onClick={() => setSelectedLearner({
                                  ...member,
                                  learningPath: {
                                    currentModule: 3,
                                    totalModules: 8,
                                    completedLessons: 12,
                                    totalLessons: 24,
                                    nextDeadline: "2024-02-15",
                                    assessmentScore: 85
                                  }
                                })}
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <GraduationCap className="w-5 h-5" />
                                  Learning Progress - {selectedLearner?.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Detailed learning progress and activity tracking
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedLearner && (
                                <div className="space-y-6">
                                  {/* Progress Overview */}
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                          <BookOpen className="w-4 h-4 text-blue-500" />
                                          <div>
                                            <div className="text-lg font-bold">{selectedLearner.progress}%</div>
                                            <div className="text-xs text-muted-foreground">Overall Progress</div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                          <Timer className="w-4 h-4 text-green-500" />
                                          <div>
                                            <div className="text-lg font-bold">{selectedLearner.hours}h</div>
                                            <div className="text-xs text-muted-foreground">Hours Logged</div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                          <CheckSquare className="w-4 h-4 text-orange-500" />
                                          <div>
                                            <div className="text-lg font-bold">{selectedLearner.learningPath?.completedLessons}/{selectedLearner.learningPath?.totalLessons}</div>
                                            <div className="text-xs text-muted-foreground">Lessons</div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                          <Star className="w-4 h-4 text-yellow-500" />
                                          <div>
                                            <div className="text-lg font-bold">{selectedLearner.learningPath?.assessmentScore}%</div>
                                            <div className="text-xs text-muted-foreground">Assessment Score</div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Current Learning Topic Details */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        Current Learning Topic: {selectedLearner.topic}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Learning Path */}
                                        <div>
                                          <h4 className="font-medium mb-3">Learning Path Progress</h4>
                                          <div className="space-y-3">
                                            {[
                                              { module: "Module 1: Introduction", status: "completed", lessons: "4/4" },
                                              { module: "Module 2: Basic Concepts", status: "completed", lessons: "5/5" },
                                              { module: "Module 3: Advanced Topics", status: "in-progress", lessons: "3/6" },
                                              { module: "Module 4: Practical Applications", status: "locked", lessons: "0/5" },
                                              { module: "Module 5: Project Work", status: "locked", lessons: "0/4" }
                                            ].map((mod, idx) => (
                                              <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                                                <div className={cn(
                                                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                                  mod.status === 'completed' ? 'bg-green-500 text-white' :
                                                  mod.status === 'in-progress' ? 'bg-blue-500 text-white' :
                                                  'bg-gray-200 text-gray-500'
                                                )}>
                                                  {mod.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                  <p className="font-medium text-sm">{mod.module}</p>
                                                  <p className="text-xs text-muted-foreground">Lessons: {mod.lessons}</p>
                                                </div>
                                                <Badge variant={
                                                  mod.status === 'completed' ? 'default' :
                                                  mod.status === 'in-progress' ? 'secondary' : 'outline'
                                                }>
                                                  {mod.status}
                                                </Badge>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Time Log & Actions */}
                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="font-medium mb-3">Recent Learning Activity</h4>
                                            <div className="space-y-2">
                                              {[
                                                { date: "2024-01-15", activity: "Completed Advanced Patterns Quiz", hours: 1.5 },
                                                { date: "2024-01-14", activity: "Watched Tutorial: Context API", hours: 2 },
                                                { date: "2024-01-13", activity: "Practical Exercise: Hooks", hours: 3 },
                                                { date: "2024-01-12", activity: "Reading: Component Optimization", hours: 1 }
                                              ].map((activity, idx) => (
                                                <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                                                  <div className="text-xs text-muted-foreground w-20">{activity.date}</div>
                                                  <div className="flex-1 text-sm">{activity.activity}</div>
                                                  <div className="text-xs font-medium">{activity.hours}h</div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div className="space-y-3 pt-4 border-t">
                                            <Button 
                                              className="w-full gap-2" 
                                              onClick={() => {
                                                setIsTimeLoggingOpen(true);
                                                setSelectedLearner(selectedLearner);
                                              }}
                                            >
                                              <Timer className="w-4 h-4" />
                                              Log Learning Time
                                            </Button>
                                            <Button variant="outline" className="w-full gap-2">
                                              <PlayCircle className="w-4 h-4" />
                                              Continue Learning
                                            </Button>
                                            <Button 
                                              variant="outline" 
                                              className="w-full gap-2"
                                              onClick={() => setIsLearningAssessmentOpen(true)}
                                            >
                                              <CheckSquare className="w-4 h-4" />
                                              Take Assessment
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Topics Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Active Learning Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "React Advanced Patterns", enrolled: 8, completed: 3, hours: 45, difficulty: "Advanced", category: "Frontend" },
                        { title: "API Security Best Practices", enrolled: 6, completed: 4, hours: 28, difficulty: "Intermediate", category: "Security" },
                        { title: "UI/UX Design Principles", enrolled: 5, completed: 2, hours: 32, difficulty: "Beginner", category: "Design" },
                        { title: "Testing Strategies", enrolled: 7, completed: 1, hours: 38, difficulty: "Intermediate", category: "QA" },
                        { title: "DevOps Fundamentals", enrolled: 4, completed: 2, hours: 52, difficulty: "Advanced", category: "DevOps" },
                        { title: "Data Analytics", enrolled: 3, completed: 3, hours: 24, difficulty: "Intermediate", category: "Analytics" }
                      ].map((topic, index) => (
                        <div 
                          key={index} 
                          className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedLearningTopic(topic)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-medium text-sm">{topic.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {topic.category}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Enrolled: {topic.enrolled}</span>
                              <span>Completed: {topic.completed}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Hours: {topic.hours}h</span>
                              <Badge variant="secondary" className="text-xs">
                                {topic.difficulty}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <Progress value={(topic.completed / topic.enrolled) * 100} className="h-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Learning Analytics Sidebar */}
              <div className="space-y-6">
                {/* Team Learning Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <PieChart className="w-4 h-4" />
                      Learning Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completion Rate</span>
                        <span className="font-semibold">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Study Time/Week</span>
                        <span className="font-semibold">8.5h</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Learners</span>
                        <span className="font-semibold">12/18</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Award className="w-4 h-4" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Mike Johnson", points: 280, badge: "Champion" },
                        { name: "Lisa Zhang", points: 240, badge: "Expert" },
                        { name: "David Liu", points: 220, badge: "Expert" }
                      ].map((performer, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{performer.name}</p>
                            <p className="text-xs text-muted-foreground">{performer.points} points</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {performer.badge}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Settings className="w-4 h-4" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full gap-2" size="sm">
                      <Download className="w-4 h-4" />
                      Export Progress Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2" 
                      size="sm"
                      onClick={() => setIsAssignLearningOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                      Assign Learning Path
                    </Button>
                    <Button variant="outline" className="w-full gap-2" size="sm">
                      <MessageSquare className="w-4 h-4" />
                      Send Reminder
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
        
        {/* Learning Time Logging Dialog */}
        <Dialog open={isTimeLoggingOpen} onOpenChange={setIsTimeLoggingOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Log Learning Time
              </DialogTitle>
              <DialogDescription>
                Track time spent on learning activities
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="learning-topic">Learning Topic</Label>
                <Input 
                  id="learning-topic" 
                  value={selectedLearner?.topic || ''} 
                  disabled 
                  className="bg-muted"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="log-date">Date</Label>
                  <Input 
                    id="log-date" 
                    type="date" 
                    value={timeLogData.date}
                    onChange={(e) => setTimeLogData({...timeLogData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="log-hours">Hours</Label>
                  <Input 
                    id="log-hours" 
                    type="number" 
                    step="0.25" 
                    placeholder="2.5"
                    value={timeLogData.hours}
                    onChange={(e) => setTimeLogData({...timeLogData, hours: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="log-activity">Learning Activity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Reading Material</SelectItem>
                    <SelectItem value="video">Watching Videos</SelectItem>
                    <SelectItem value="practice">Hands-on Practice</SelectItem>
                    <SelectItem value="quiz">Taking Quiz/Assessment</SelectItem>
                    <SelectItem value="project">Project Work</SelectItem>
                    <SelectItem value="discussion">Discussion/Q&A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="log-notes">Notes</Label>
                <Textarea 
                  id="log-notes" 
                  placeholder="What did you learn or work on during this session?"
                  value={timeLogData.notes}
                  onChange={(e) => setTimeLogData({...timeLogData, notes: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsTimeLoggingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Time Logged Successfully",
                    description: `${timeLogData.hours} hours logged for ${selectedLearner?.topic}`,
                  });
                  setIsTimeLoggingOpen(false);
                  setTimeLogData({ hours: '', notes: '', date: new Date().toISOString().split('T')[0] });
                }}>
                  <Save className="w-4 h-4 mr-2" />
                  Log Time
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Learning Assessment Dialog */}
        <Dialog open={isLearningAssessmentOpen} onOpenChange={setIsLearningAssessmentOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Learning Assessment - React Advanced Patterns
              </DialogTitle>
              <DialogDescription>
                Module 3 Quiz: Test your understanding of advanced React concepts
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Assessment Progress */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>Question 3 of 10</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">15:32</div>
                  <div className="text-xs text-muted-foreground">Time Remaining</div>
                </div>
              </div>

              {/* Current Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Question 3 of 10</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium">
                    Which React pattern is best suited for sharing stateful logic between components without prop drilling?
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'a', text: 'Higher-Order Components (HOCs)', correct: false },
                      { id: 'b', text: 'Custom Hooks', correct: true },
                      { id: 'c', text: 'Context API with useContext', correct: false },
                      { id: 'd', text: 'Render Props Pattern', correct: false }
                    ].map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={option.id} 
                          name="question3"
                          className="h-4 w-4"
                        />
                        <Label htmlFor={option.id} className="text-sm cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Textarea 
                      placeholder="Optional: Explain your reasoning (bonus points for detailed explanations)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Previous Question
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline">Save & Exit</Button>
                  <Button className="gap-2">
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Assessment Info */}
              <Card className="bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Questions:</span> 10
                    </div>
                    <div>
                      <span className="font-medium">Time Limit:</span> 20 minutes
                    </div>
                    <div>
                      <span className="font-medium">Passing Score:</span> 70%
                    </div>
                    <div>
                      <span className="font-medium">Attempts:</span> 2/3
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Learning Topic Detail Dialog */}
        <Dialog open={!!selectedLearningTopic} onOpenChange={() => setSelectedLearningTopic(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                React Advanced Patterns - Course Overview
              </DialogTitle>
              <DialogDescription>
                Master advanced React concepts and architectural patterns
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="font-bold">12</div>
                        <div className="text-xs text-muted-foreground">Enrolled</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <div>
                        <div className="font-bold">24h</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <div>
                        <div className="font-bold">4.8</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <div>
                        <div className="font-bold">8</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Modules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Module 1: Advanced Component Patterns",
                            lessons: ["Higher-Order Components", "Render Props", "Compound Components", "Control Props"],
                            duration: "4h",
                            status: "available"
                          },
                          {
                            title: "Module 2: State Management Patterns",
                            lessons: ["useReducer vs useState", "Context Optimization", "State Machines", "Custom Hooks"],
                            duration: "5h",
                            status: "available"
                          },
                          {
                            title: "Module 3: Performance Optimization",
                            lessons: ["React.memo", "useMemo & useCallback", "Code Splitting", "Bundle Analysis"],
                            duration: "6h",
                            status: "in-progress"
                          },
                          {
                            title: "Module 4: Advanced Hooks",
                            lessons: ["useLayoutEffect", "useImperativeHandle", "Custom Hook Patterns"],
                            duration: "4h",
                            status: "locked"
                          },
                          {
                            title: "Module 5: Testing Patterns",
                            lessons: ["Component Testing", "Hook Testing", "Integration Tests"],
                            duration: "5h",
                            status: "locked"
                          }
                        ].map((module, idx) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{module.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant={
                                  module.status === 'available' ? 'default' :
                                  module.status === 'in-progress' ? 'secondary' : 'outline'
                                }>
                                  {module.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{module.duration}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {module.lessons.map((lesson, lessonIdx) => (
                                <div key={lessonIdx} className="flex items-center gap-2 text-sm">
                                  <PlayCircle className="w-3 h-3 text-muted-foreground" />
                                  <span>{lesson}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {/* Learning Resources */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: "Course Slides", type: "PDF", size: "2.4 MB" },
                        { name: "Code Examples", type: "ZIP", size: "1.8 MB" },
                        { name: "Reading List", type: "DOC", size: "156 KB" },
                        { name: "Cheat Sheet", type: "PDF", size: "890 KB" }
                      ].map((resource, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 border rounded">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Prerequisites */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>JavaScript ES6+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>React Fundamentals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Component Lifecycle</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-3 h-3 text-orange-500" />
                          <span>TypeScript (Recommended)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <Button className="w-full gap-2">
                        <PlayCircle className="w-4 h-4" />
                        Start Learning
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <BookOpen className="w-4 h-4" />
                        View Syllabus
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Users className="w-4 h-4" />
                        Join Discussion
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Assign Learning Path Dialog */}
        <Dialog open={isAssignLearningOpen} onOpenChange={setIsAssignLearningOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Assign Learning Path
              </DialogTitle>
              <DialogDescription>
                Create a customized learning path for team members
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Select Team Members */}
              <div>
                <Label className="text-base font-medium">Select Team Members</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { name: "Sarah Chen", role: "Frontend Dev", selected: true },
                    { name: "Mike Johnson", role: "Backend Dev", selected: false },
                    { name: "Emily Davis", role: "UI/UX Designer", selected: true },
                    { name: "Alex Kim", role: "QA Engineer", selected: false },
                    { name: "David Liu", role: "DevOps", selected: true },
                    { name: "Lisa Zhang", role: "Data Analyst", selected: false }
                  ].map((member, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 border rounded">
                      <input 
                        type="checkbox" 
                        id={`member-${idx}`}
                        defaultChecked={member.selected}
                        className="h-4 w-4"
                      />
                      <div>
                        <Label htmlFor={`member-${idx}`} className="text-sm font-medium cursor-pointer">
                          {member.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Learning Topics */}
              <div>
                <Label className="text-base font-medium">Select Learning Topics</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { title: "React Advanced Patterns", duration: "24h", difficulty: "Advanced", priority: true },
                    { title: "API Security Best Practices", duration: "16h", difficulty: "Intermediate", priority: false },
                    { title: "UI/UX Design Principles", duration: "20h", difficulty: "Beginner", priority: true },
                    { title: "Testing Strategies", duration: "18h", difficulty: "Intermediate", priority: false }
                  ].map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id={`topic-${idx}`}
                          defaultChecked={topic.priority}
                          className="h-4 w-4"
                        />
                        <div>
                          <Label htmlFor={`topic-${idx}`} className="font-medium cursor-pointer">
                            {topic.title}
                          </Label>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{topic.duration}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {topic.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="target-date">Target Completion</Label>
                  <Input id="target-date" type="date" />
                </div>
              </div>

              <div>
                <Label htmlFor="weekly-hours">Weekly Time Commitment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weekly hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-4">2-4 hours/week</SelectItem>
                    <SelectItem value="4-6">4-6 hours/week</SelectItem>
                    <SelectItem value="6-8">6-8 hours/week</SelectItem>
                    <SelectItem value="8-10">8-10 hours/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="learning-notes">Additional Notes</Label>
                <Textarea 
                  id="learning-notes" 
                  placeholder="Any specific goals or requirements for this learning path..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAssignLearningOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Learning Path Assigned",
                    description: "Learning path has been assigned to selected team members.",
                  });
                  setIsAssignLearningOpen(false);
                }}>
                  <Target className="w-4 h-4 mr-2" />
                  Assign Learning Path
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Collaboration;