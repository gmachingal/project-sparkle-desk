import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { 
  Users, 
  Calendar,
  Briefcase,
  CheckCircle,
  Play,
  BarChart3,
  MessageSquare,
  Activity,
  Settings,
  Share2,
  GraduationCap,
  Timer,
  Star,
  Clock,
  AlertCircle
} from "lucide-react";

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Check for admin state on component mount
  useEffect(() => {
    const preferredRole = localStorage.getItem('preferredRole');
    if (preferredRole === 'admin') {
      window.location.href = '/admin-collaboration';
    }
  }, []);

  // Mock user data - employee view only
  const currentUser = {
    name: 'John Doe',
    id: '1',
    role: 'admin' // Change to 'member' for regular users
  };

  // Mock personal data
  const myProfile = {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "",
    status: "online",
    joinDate: "Jan 2023",
    activeProjects: ["Website Redesign", "Mobile App"],
    skills: ["React", "TypeScript", "Node.js"],
    workload: 85,
    currentCapacity: "34h / 40h this week",
    tasksCompleted: 42,
    tasksInProgress: 3,
    collaboration: 92,
    lastActivity: "Just now",
    timezone: "PST",
    availableUntil: "6:00 PM",
    recentTasks: [
      { id: "1", name: "Project Architecture Review", status: "in-progress", priority: "high", progress: 75 },
      { id: "2", name: "Team Onboarding", status: "completed", priority: "medium", progress: 100 },
      { id: "3", name: "Code Review Process", status: "todo", priority: "medium", progress: 0 }
    ]
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

  const myStats = {
    projects: myProfile.activeProjects.length,
    completedTasks: myProfile.tasksCompleted,
    inProgressTasks: myProfile.tasksInProgress,
    workload: myProfile.workload,
    collaborationScore: myProfile.collaboration
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
                      localStorage.setItem('preferredRole', 'admin');
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

        {/* My Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{myStats.projects}</div>
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
                  <div className="text-2xl font-bold">{myStats.completedTasks}</div>
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
                  <div className="text-2xl font-bold">{myStats.inProgressTasks}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className={`w-4 h-4 ${getWorkloadColor(myStats.workload)}`} />
                <div>
                  <div className="text-2xl font-bold">{myStats.workload}%</div>
                  <div className="text-xs text-muted-foreground">Workload</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{myStats.collaborationScore}%</div>
                  <div className="text-xs text-muted-foreground">Collaboration</div>
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
              My Overview
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              My Workload
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              My Learning
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Team Collaboration
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
              <CardHeader>
                <CardTitle className="text-2xl">My Profile & Progress</CardTitle>
                <p className="text-muted-foreground">Track your personal performance and collaborate with your team</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={myProfile.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {myProfile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                        getStatusColor(myProfile.status)
                      )} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{myProfile.name}</h3>
                      <p className="text-muted-foreground">{myProfile.role}</p>
                      <Badge variant="outline" className="mt-1">
                        {myProfile.department}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Workload</span>
                        <span className={getWorkloadColor(myProfile.workload)}>
                          {myProfile.workload}%
                        </span>
                      </div>
                      <Progress value={myProfile.workload} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {myProfile.currentCapacity}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Collaboration Score</span>
                        <span className="font-medium text-purple-600">
                          {myProfile.collaboration}%
                        </span>
                      </div>
                      <Progress value={myProfile.collaboration} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{myProfile.tasksCompleted}</div>
                      <div className="text-sm text-green-600">Tasks Completed</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{myProfile.tasksInProgress}</div>
                      <div className="text-sm text-blue-600">Tasks in Progress</div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">My Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {myProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Recent Tasks</h4>
                  <div className="space-y-3">
                    {myProfile.recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTaskStatusIcon(task.status)}
                          <div>
                            <h5 className="font-medium">{task.name}</h5>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {task.priority}
                              </Badge>
                              <span>Progress: {task.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <Progress value={task.progress} className="w-20 h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workload Tab */}
          <TabsContent value="workload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Workload Management</CardTitle>
                <p className="text-muted-foreground">Track and manage your current workload and capacity</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Weekly Capacity</h4>
                      <div className="text-2xl font-bold">{myProfile.currentCapacity}</div>
                      <Progress value={myProfile.workload} className="mt-2" />
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Active Projects</h4>
                      <div className="space-y-2">
                        {myProfile.activeProjects.map((project, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{project}</span>
                            <Badge variant="outline">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Task Distribution</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Completed</span>
                          <span className="font-medium text-green-600">{myProfile.tasksCompleted}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">In Progress</span>
                          <span className="font-medium text-blue-600">{myProfile.tasksInProgress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total</span>
                          <span className="font-medium">{myProfile.tasksCompleted + myProfile.tasksInProgress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Learning & Development</CardTitle>
                <p className="text-muted-foreground">Track your learning progress and skill development</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Learning management content for employee view...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
                <p className="text-muted-foreground">Collaborate with your team members and track shared projects</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Team collaboration features for employee view...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Collaboration;