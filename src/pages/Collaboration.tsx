import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import ProfileCard from "@/components/overview/ProfileCard";
import StatsOverview from "@/components/overview/StatsOverview";
import TasksSummary from "@/components/overview/TasksSummary";
import ProjectsOverview from "@/components/overview/ProjectsOverview";
import TakeAssessment from "@/components/learning/TakeAssessment";
import ContinueLearning from "@/components/learning/ContinueLearning";
import BrowseLearning from "@/components/learning/BrowseLearning";
import ViewAllCertificates from "@/components/learning/ViewAllCertificates";
import { 
  Users, 
  Calendar as CalendarIcon,
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
  AlertCircle,
  Plus,
  BookOpen,
  Award,
  Send,
  Video,
  Phone,
  FileText,
  User,
  Smile,
  Paperclip,
  Mic,
  MoreHorizontal,
  Search,
  MapPin,
  Eye,
  TrendingUp,
  Target,
  Download,
  ChevronRight,
  Pause,
  RotateCcw,
  Filter,
  Badge as BadgeIcon,
  Trophy,
  Medal
} from "lucide-react";
import { format } from "date-fns";

const Collaboration = () => {
  console.log("Collaboration component loaded");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Dialog states
  const [isLogHoursOpen, setIsLogHoursOpen] = useState(false);
  const [isTeamChatOpen, setIsTeamChatOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [isStartLearningOpen, setIsStartLearningOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isContinueLearningOpen, setIsContinueLearningOpen] = useState(false);
  const [isViewCertificatesOpen, setIsViewCertificatesOpen] = useState(false);
  const [isCertificateDetailOpen, setIsCertificateDetailOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [activeLearningTab, setActiveLearningTab] = useState("continue");
  
  // Form states
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loggedHours, setLoggedHours] = useState("");
  const [logDescription, setLogDescription] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date>();
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingAttendees, setMeetingAttendees] = useState<string[]>([]);
  const [selectedChatUsers, setSelectedChatUsers] = useState<string[]>([]);
  const [activeChatRoom, setActiveChatRoom] = useState("team-general");
  const [selectedLearningCourse, setSelectedLearningCourse] = useState("");
  const [assessmentCourse, setAssessmentCourse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState("60");
  const [meetingType, setMeetingType] = useState("video");
  const [meetingRoom, setMeetingRoom] = useState("");
  
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

  // Mock data for various features
  const teamMembers = [
    { id: "1", name: "Alice Johnson", status: "online", role: "Team Lead", avatar: "", email: "alice@company.com" },
    { id: "2", name: "Bob Smith", status: "away", role: "Designer", avatar: "", email: "bob@company.com" },
    { id: "3", name: "Carol Davis", status: "in-meeting", role: "Developer", avatar: "", email: "carol@company.com" },
    { id: "4", name: "David Wilson", status: "offline", role: "Analyst", avatar: "", email: "david@company.com" },
    { id: "5", name: "Emily Chen", status: "online", role: "Product Manager", avatar: "", email: "emily@company.com" },
    { id: "6", name: "Frank Rodriguez", status: "online", role: "QA Engineer", avatar: "", email: "frank@company.com" }
  ];

  const chatRooms = [
    { 
      id: "team-general", 
      name: "General Team Chat", 
      participants: teamMembers.slice(0, 4),
      lastMessage: "Backend APIs are almost ready",
      lastMessageTime: "2 min ago",
      unreadCount: 3,
      isOnline: true
    },
    { 
      id: "project-alpha", 
      name: "Project Alpha", 
      participants: [teamMembers[0], teamMembers[1], teamMembers[2]],
      lastMessage: "Making good progress on the designs!",
      lastMessageTime: "15 min ago",
      unreadCount: 1,
      isOnline: true
    },
    { 
      id: "dev-team", 
      name: "Development Team", 
      participants: [teamMembers[0], teamMembers[2], teamMembers[5]],
      lastMessage: "Code review needed for PR #123",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isOnline: false
    }
  ];

  const meetingRooms = [
    { id: "conference-a", name: "Conference Room A", capacity: 10, available: true },
    { id: "conference-b", name: "Conference Room B", capacity: 8, available: false },
    { id: "meeting-room-1", name: "Meeting Room 1", capacity: 6, available: true },
    { id: "phone-booth-1", name: "Phone Booth 1", capacity: 2, available: true }
  ];

  const chatMessages = {
    "team-general": [
      { 
        id: "1", 
        user: "Alice Johnson", 
        message: "Hey team, how's the project going?", 
        time: "10:30 AM", 
        timestamp: new Date(), 
        avatar: "", 
        isOwn: false,
        reactions: [{ emoji: "👍", count: 2, users: ["Bob Smith", "Carol Davis"] }]
      },
      { 
        id: "2", 
        user: "Bob Smith", 
        message: "Making good progress on the designs! The new mockups are looking great.", 
        time: "10:32 AM", 
        timestamp: new Date(), 
        avatar: "", 
        isOwn: false,
        reactions: []
      },
      { 
        id: "3", 
        user: "You", 
        message: "That's awesome! Can't wait to see them.", 
        time: "10:33 AM", 
        timestamp: new Date(), 
        avatar: "", 
        isOwn: true,
        reactions: [{ emoji: "🎉", count: 1, users: ["Alice Johnson"] }]
      },
      { 
        id: "4", 
        user: "Carol Davis", 
        message: "Backend APIs are almost ready. Should be deployed by EOD.", 
        time: "10:35 AM", 
        timestamp: new Date(), 
        avatar: "", 
        isOwn: false,
        reactions: []
      }
    ],
    "project-alpha": [
      { id: "1", user: "Alice Johnson", message: "Project Alpha kickoff meeting scheduled", time: "9:00 AM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] },
      { id: "2", user: "Bob Smith", message: "I'll have the mockups ready by EOD", time: "9:15 AM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] },
      { id: "3", user: "Carol Davis", message: "Database schema is finalized", time: "9:30 AM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] }
    ],
    "dev-team": [
      { id: "1", user: "Alice Johnson", message: "Code review needed for PR #123", time: "2:00 PM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] },
      { id: "2", user: "Carol Davis", message: "I'll review it after my current task", time: "2:05 PM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] },
      { id: "3", user: "Frank Rodriguez", message: "Testing scenarios look good", time: "2:10 PM", timestamp: new Date(), avatar: "", isOwn: false, reactions: [] }
    ]
  };

  const assessmentQuestions = [
    {
      question: "What is the primary benefit of React Hooks?",
      options: ["Better performance", "Simplified state management", "Smaller bundle size", "All of the above"],
      correct: 1
    },
    {
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1
    },
    {
      question: "What does the dependency array in useEffect control?",
      options: ["Component rendering", "Hook execution", "State updates", "Event handling"],
      correct: 1
    }
  ];

  // Handler functions
  const handleLogHours = () => {
    if (!loggedHours || !selectedCourse) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Hours Logged Successfully",
      description: `${loggedHours} hours logged for ${selectedCourse}`,
    });

    setLoggedHours("");
    setLogDescription("");
    setSelectedCourse(null);
    setIsLogHoursOpen(false);
  };

  const handleToggleAttendee = (memberId: string) => {
    setMeetingAttendees(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCreateGroupChat = () => {
    if (selectedChatUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one person to chat with",
        variant: "destructive"
      });
      return;
    }

    const chatName = selectedChatUsers.length === 1 
      ? `Direct message with ${teamMembers.find(m => m.id === selectedChatUsers[0])?.name}`
      : `Group chat (${selectedChatUsers.length + 1} members)`;

    toast({
      title: "Chat Created",
      description: chatName,
    });

    setSelectedChatUsers([]);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the team",
    });
    setChatMessage("");
  };

  const handleScheduleMeeting = () => {
    if (!meetingTitle || !meetingDate || !meetingTime || meetingAttendees.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one attendee",
        variant: "destructive"
      });
      return;
    }

    const attendeeNames = meetingAttendees
      .map(id => teamMembers.find(member => member.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const roomName = meetingType === "in-person" && meetingRoom 
      ? meetingRooms.find(room => room.id === meetingRoom)?.name 
      : "";

    toast({
      title: "Meeting Scheduled Successfully! 🎉",
      description: `"${meetingTitle}" on ${format(meetingDate, "PPP")} at ${meetingTime} (${meetingDuration}min) with ${attendeeNames}${roomName ? ` in ${roomName}` : ""}`,
    });

    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingDate(undefined);
    setMeetingTime("");
    setMeetingDuration("60");
    setMeetingType("video");
    setMeetingRoom("");
    setMeetingAttendees([]);
    setIsScheduleMeetingOpen(false);
  };

  const handleStartLearning = () => {
    if (!selectedLearningCourse) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Learning Started",
      description: `Starting ${selectedLearningCourse}`,
    });

    setSelectedLearningCourse("");
    setIsStartLearningOpen(false);
  };

  const handleStartAssessment = (courseName: string) => {
    setAssessmentCourse(courseName);
    setCurrentQuestion(0);
    setAssessmentAnswers([]);
    setIsAssessmentOpen(true);
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    const newAnswers = [...assessmentAnswers];
    newAnswers[currentQuestion] = answerIndex.toString();
    setAssessmentAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate score
      const correctAnswers = assessmentAnswers.filter((answer, index) => 
        parseInt(answer) === assessmentQuestions[index].correct
      ).length;
      const score = Math.round((correctAnswers / assessmentQuestions.length) * 100);

      toast({
        title: "Assessment Completed",
        description: `Your score: ${score}% (${correctAnswers}/${assessmentQuestions.length})`,
      });

      setIsAssessmentOpen(false);
      setCurrentQuestion(0);
      setAssessmentAnswers([]);
    }
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
            {/* Admin Switch - Available to all users */}
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
            
            <Button variant="outline" className="gap-2">
              <Dialog open={isTeamChatOpen} onOpenChange={setIsTeamChatOpen}>
                <DialogTrigger asChild>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    Team Chat
                  </span>
                </DialogTrigger>
              </Dialog>
            </Button>
            
            <Button className="gap-2">
              <Dialog open={isScheduleMeetingOpen} onOpenChange={setIsScheduleMeetingOpen}>
                <DialogTrigger asChild>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <CalendarIcon className="w-4 h-4" />
                    Schedule Meeting
                  </span>
                </DialogTrigger>
              </Dialog>
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

          {/* Crisp My Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile Section */}
            <ProfileCard 
              profile={myProfile} 
              getStatusColor={getStatusColor} 
            />

            {/* Stats Overview */}
            <StatsOverview 
              stats={{
                tasksCompleted: myProfile.tasksCompleted,
                tasksInProgress: myProfile.tasksInProgress,
                workload: myProfile.workload,
                collaboration: myProfile.collaboration,
                currentCapacity: myProfile.currentCapacity,
                lastActivity: myProfile.lastActivity
              }}
              getWorkloadColor={getWorkloadColor}
            />

            {/* Tasks and Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TasksSummary 
                tasks={myProfile.recentTasks} 
                getTaskStatusIcon={getTaskStatusIcon} 
              />
              <ProjectsOverview projects={myProfile.activeProjects} />
            </div>

            {/* Quick Actions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    <span className="text-sm">Log Hours</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <MessageSquare className="w-5 h-5 text-info" />
                    <span className="text-sm">Team Chat</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <CalendarIcon className="w-5 h-5 text-warning" />
                    <span className="text-sm">Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <BarChart3 className="w-5 h-5 text-success" />
                    <span className="text-sm">Analytics</span>
                  </Button>
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
          {/* Enhanced My Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            {/* Learning Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Courses in Progress</div>
                      <div className="text-xl font-bold text-primary">3</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Certificates Earned</div>
                      <div className="text-xl font-bold text-success">12</div>
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
                      <div className="text-xl font-bold text-warning">48</div>
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

            {/* Main Learning Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Continue Learning */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10 hover:from-primary/10 hover:to-primary-glow/20 transition-all duration-300 cursor-pointer group">
                <Dialog open={isContinueLearningOpen} onOpenChange={setIsContinueLearningOpen}>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <CardHeader className="text-center pb-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <RotateCcw className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">Continue Learning</CardTitle>
                        <p className="text-sm text-muted-foreground">Resume your active courses</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-sm font-medium mb-1">Last Activity</div>
                          <div className="text-xs text-muted-foreground">Advanced React Development - 2 hours ago</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">3</div>
                          <div className="text-xs text-muted-foreground">Active Courses</div>
                        </div>
                        <Button className="w-full group-hover:shadow-md transition-shadow">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </CardContent>
                    </div>
                  </DialogTrigger>
                </Dialog>
              </Card>

              {/* Start Learning */}
              <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10 hover:from-success/10 hover:to-success-glow/20 transition-all duration-300 cursor-pointer group">
                <Dialog open={isStartLearningOpen} onOpenChange={setIsStartLearningOpen}>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <CardHeader className="text-center pb-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-8 h-8 text-success" />
                        </div>
                        <CardTitle className="text-xl">Start Learning</CardTitle>
                        <p className="text-sm text-muted-foreground">Explore new courses and skills</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-sm font-medium mb-1">Available</div>
                          <div className="text-xs text-muted-foreground">247 courses in learning library</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-success">New</div>
                          <div className="text-xs text-muted-foreground">Learning Paths</div>
                        </div>
                        <Button className="w-full group-hover:shadow-md transition-shadow" variant="outline">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Browse Courses
                        </Button>
                      </CardContent>
                    </div>
                  </DialogTrigger>
                </Dialog>
              </Card>


              {/* View Certificates */}
              <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10 hover:from-warning/10 hover:to-warning-glow/20 transition-all duration-300 cursor-pointer group">
                <Dialog open={isViewCertificatesOpen} onOpenChange={setIsViewCertificatesOpen}>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <CardHeader className="text-center pb-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-warning/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Award className="w-8 h-8 text-warning" />
                        </div>
                        <CardTitle className="text-xl">View Certificates</CardTitle>
                        <p className="text-sm text-muted-foreground">Your achievements and credentials</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-sm font-medium mb-1">Latest Certificate</div>
                          <div className="text-xs text-muted-foreground">Advanced React Development - Aug 20</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-warning">12</div>
                          <div className="text-xs text-muted-foreground">Total Earned</div>
                        </div>
                        <Button className="w-full group-hover:shadow-md transition-shadow" variant="outline">
                          <Trophy className="w-4 h-4 mr-2" />
                          View All
                        </Button>
                      </CardContent>
                    </div>
                  </DialogTrigger>
                </Dialog>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Learning & Development
                  <Dialog open={isLogHoursOpen} onOpenChange={setIsLogHoursOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Clock className="w-4 h-4" />
                        Log Hours
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Learning Hours</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="course-select">Select Course</Label>
                          <select
                            id="course-select"
                            className="w-full p-2 border rounded-md bg-background"
                            value={selectedCourse || ""}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                          >
                            <option value="">Choose a course...</option>
                            <option value="Advanced React Patterns">Advanced React Patterns</option>
                            <option value="Leadership Fundamentals">Leadership Fundamentals</option>
                            <option value="TypeScript Mastery">TypeScript Mastery</option>
                            <option value="Project Management">Project Management</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="hours">Hours Spent</Label>
                          <Input
                            id="hours"
                            type="number"
                            step="0.5"
                            min="0.5"
                            max="12"
                            placeholder="e.g., 2.5"
                            value={loggedHours}
                            onChange={(e) => setLoggedHours(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Input
                            id="description"
                            placeholder="What did you learn or practice?"
                            value={logDescription}
                            onChange={(e) => setLogDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={handleLogHours} className="flex-1">
                            Log Hours
                          </Button>
                          <Button variant="outline" onClick={() => setIsLogHoursOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <p className="text-muted-foreground">Track your learning progress and skill development</p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeLearningTab} onValueChange={setActiveLearningTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="continue" className="gap-2">
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </TabsTrigger>
                    <TabsTrigger value="browse" className="gap-2">
                      <BookOpen className="w-4 h-4" />
                      Browse Learning
                    </TabsTrigger>
                    <TabsTrigger value="assessment" className="gap-2">
                      <Award className="w-4 h-4" />
                      Take Assessment
                    </TabsTrigger>
                    <TabsTrigger value="certificates" className="gap-2">
                      <Trophy className="w-4 h-4" />
                      View All Certificates
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="continue" className="mt-6">
                    <ContinueLearning />
                  </TabsContent>
                  
                  <TabsContent value="browse" className="mt-6">
                    <BrowseLearning />
                  </TabsContent>
                  
                  <TabsContent value="assessment" className="mt-6">
                    <TakeAssessment />
                  </TabsContent>
                  
                  <TabsContent value="certificates" className="mt-6">
                    <ViewAllCertificates />
                  </TabsContent>
                </Tabs>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">My Team Members</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Alice Johnson", role: "Team Lead", status: "online", avatar: "", lastSeen: "Just now" },
                        { name: "Bob Smith", role: "Designer", status: "away", avatar: "", lastSeen: "30 min ago" },
                        { name: "Carol Davis", role: "Developer", status: "in-meeting", avatar: "", lastSeen: "1 hour ago" },
                        { name: "David Wilson", role: "Analyst", status: "offline", avatar: "", lastSeen: "2 hours ago" }
                      ].map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className={cn(
                                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                                getStatusColor(member.status)
                              )} />
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {member.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">{member.lastSeen}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Shared Projects</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Website Redesign", members: 4, progress: 75, deadline: "Next Friday" },
                        { name: "Mobile App", members: 3, progress: 45, deadline: "Next Month" },
                        { name: "Data Analytics", members: 2, progress: 90, deadline: "This Week" }
                      ].map((project, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{project.name}</h5>
                            <Badge variant="outline">{project.members} members</Badge>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="mb-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Deadline: {project.deadline}</span>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
                      <Button variant="ghost" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Request to Join Project
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Communication & Tools</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Dialog open={isTeamChatOpen} onOpenChange={setIsTeamChatOpen}>
                        <DialogTrigger asChild>
                          <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <MessageSquare className="w-6 h-6" />
                            Team Chat
                            <span className="text-xs text-muted-foreground">3 unread messages</span>
                          </div>
                        </DialogTrigger>
                      </Dialog>
                    </Button>
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Dialog open={isScheduleMeetingOpen} onOpenChange={setIsScheduleMeetingOpen}>
                        <DialogTrigger asChild>
                          <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <CalendarIcon className="w-6 h-6" />
                            Schedule Meeting
                            <span className="text-xs text-muted-foreground">Next available: 2 PM</span>
                          </div>
                        </DialogTrigger>
                      </Dialog>
                    </Button>
                    <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                      <Share2 className="w-6 h-6" />
                      Share Files
                      <span className="text-xs text-muted-foreground">5 recent files</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Team Chat Dialog */}
        <Dialog open={isTeamChatOpen} onOpenChange={setIsTeamChatOpen}>
          <DialogContent className="max-w-6xl max-h-[85vh] p-0">
            <div className="flex h-[600px]">
              {/* Enhanced Chat Rooms Sidebar */}
              <div className="w-80 border-r bg-muted/30">
                {/* Sidebar Header */}
                <div className="p-4 border-b bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Messages</h3>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10 h-9"
                    />
                  </div>
                </div>

                {/* Chat Rooms List */}
                <div className="p-2 space-y-1 overflow-y-auto max-h-96">
                  {chatRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveChatRoom(room.id)}
                      className={`w-full p-3 text-left rounded-lg transition-all hover:bg-background/60 ${
                        activeChatRoom === room.id ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="flex -space-x-1">
                            {room.participants.slice(0, 2).map((participant, index) => (
                              <Avatar key={participant.id} className="w-8 h-8 border-2 border-background">
                                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                  {participant.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          {room.isOnline && (
                            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{room.name}</h4>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">{room.lastMessageTime}</span>
                              {room.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {room.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {room.lastMessage}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {room.participants.length} members
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Start New Chat Section */}
                <div className="p-4 border-t bg-background">
                  <h4 className="font-medium mb-3 text-sm">Start New Chat</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {teamMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`chat-${member.id}`}
                          checked={selectedChatUsers.includes(member.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedChatUsers(prev => [...prev, member.id]);
                            } else {
                              setSelectedChatUsers(prev => prev.filter(id => id !== member.id));
                            }
                          }}
                        />
                        <label
                          htmlFor={`chat-${member.id}`}
                          className="text-sm leading-none cursor-pointer flex items-center gap-2 flex-1"
                        >
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{member.name}</span>
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(member.status))} />
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedChatUsers.length > 0 && (
                    <Button onClick={handleCreateGroupChat} size="sm" className="w-full mt-3">
                      <Plus className="w-3 h-3 mr-1" />
                      Create Chat ({selectedChatUsers.length})
                    </Button>
                  )}
                </div>
              </div>

              {/* Enhanced Chat Messages Area */}
              <div className="flex-1 flex flex-col bg-background">
                {/* Chat Header */}
                <div className="p-4 border-b bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1">
                        {chatRooms.find(room => room.id === activeChatRoom)?.participants.slice(0, 3).map((participant) => (
                          <Avatar key={participant.id} className="w-8 h-8 border-2 border-background">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-green-500 to-blue-500 text-white">
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {chatRooms.find(room => room.id === activeChatRoom)?.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{chatRooms.find(room => room.id === activeChatRoom)?.participants.length} members</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {chatRooms.find(room => room.id === activeChatRoom)?.participants.filter(p => p.status === 'online').length} online
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(chatMessages[activeChatRoom as keyof typeof chatMessages] || []).map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                      {!msg.isOwn && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {msg.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-1' : ''}`}>
                        {!msg.isOwn && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{msg.user}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                        )}
                        <div className={`p-3 rounded-2xl ${
                          msg.isOwn 
                            ? 'bg-primary text-primary-foreground rounded-br-md' 
                            : 'bg-muted rounded-bl-md'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            {msg.reactions.map((reaction, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs rounded-full bg-background/50 hover:bg-background"
                              >
                                {reaction.emoji} {reaction.count}
                              </Button>
                            ))}
                          </div>
                        )}
                        {msg.isOwn && (
                          <div className="text-xs text-muted-foreground mt-1 text-right">
                            {msg.time}
                          </div>
                        )}
                      </div>
                      {msg.isOwn && (
                        <Avatar className="w-8 h-8 mt-1 order-2">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-green-500 text-white">
                            You
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm">Someone is typing...</span>
                    </div>
                  )}
                </div>

                {/* Enhanced Message Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="sm" className="mb-2">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-20 py-3 rounded-2xl border-2 focus:border-primary"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Smile className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      size="sm" 
                      className="h-12 w-12 rounded-full"
                      disabled={!chatMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <Video className="w-3 h-3" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <Phone className="w-3 h-3" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <FileText className="w-3 h-3" />
                      File
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <User className="w-3 h-3" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Schedule Meeting Dialog */}
        <Dialog open={isScheduleMeetingOpen} onOpenChange={setIsScheduleMeetingOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Schedule Meeting</DialogTitle>
              <p className="text-muted-foreground">Create and schedule a new team meeting</p>
            </DialogHeader>
            <div className="space-y-6">
              {/* Meeting Basic Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="meeting-title" className="text-sm font-medium">Meeting Title *</Label>
                  <Input
                    id="meeting-title"
                    placeholder="Enter meeting title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="meeting-description" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="meeting-description"
                    placeholder="Meeting agenda or description"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>

              {/* Meeting Type Selection */}
              <div>
                <Label className="text-sm font-medium">Meeting Type *</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <button
                    onClick={() => setMeetingType("video")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      meetingType === "video" ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <Video className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Video Call</div>
                    <div className="text-xs text-muted-foreground">Online meeting</div>
                  </button>
                  <button
                    onClick={() => setMeetingType("audio")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      meetingType === "audio" ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <Phone className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Audio Call</div>
                    <div className="text-xs text-muted-foreground">Voice only</div>
                  </button>
                  <button
                    onClick={() => setMeetingType("in-person")}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      meetingType === "in-person" ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">In Person</div>
                    <div className="text-xs text-muted-foreground">Physical location</div>
                  </button>
                </div>
              </div>

              {/* Date, Time, and Duration */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-1"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {meetingDate ? format(meetingDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={meetingDate}
                        onSelect={setMeetingDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="meeting-time" className="text-sm font-medium">Time *</Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Duration</Label>
                  <Select value={meetingDuration} onValueChange={setMeetingDuration}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Meeting Room Selection (for in-person meetings) */}
              {meetingType === "in-person" && (
                <div>
                  <Label className="text-sm font-medium">Meeting Room</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {meetingRooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setMeetingRoom(room.id)}
                        disabled={!room.available}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          meetingRoom === room.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                        } ${!room.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm">{room.name}</div>
                          <div className={`w-2 h-2 rounded-full ${room.available ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Capacity: {room.capacity} people
                        </div>
                        {!room.available && (
                          <div className="text-xs text-red-500">Unavailable</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Enhanced Attendees Selection */}
              <div>
                <Label className="text-sm font-medium">Attendees *</Label>
                <div className="mt-2">
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                        <Checkbox
                          id={`attendee-${member.id}`}
                          checked={meetingAttendees.includes(member.id)}
                          onCheckedChange={() => handleToggleAttendee(member.id)}
                        />
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-orange-500 to-red-500 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{member.role}</span>
                            <div className="flex items-center gap-1">
                              <div className={cn("w-2 h-2 rounded-full", getStatusColor(member.status))} />
                              <span className="capitalize">{member.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.status === 'online' ? '✅ Available' : 
                           member.status === 'in-meeting' ? '🔴 In Meeting' : 
                           member.status === 'away' ? '🟡 Away' : '⚫ Offline'}
                        </div>
                      </div>
                    ))}
                  </div>
                  {meetingAttendees.length > 0 && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-sm font-medium mb-2 text-primary">
                        Selected Attendees ({meetingAttendees.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {meetingAttendees.map((id) => {
                          const member = teamMembers.find(m => m.id === id);
                          return member ? (
                            <div key={id} className="flex items-center gap-1 bg-background rounded-full px-2 py-1">
                              <Avatar className="w-4 h-4">
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{member.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleScheduleMeeting} className="flex-1 h-11">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" onClick={() => setIsScheduleMeetingOpen(false)} className="flex-1 h-11">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Start Learning Dialog */}
        <Dialog open={isStartLearningOpen} onOpenChange={setIsStartLearningOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Learning Hub
              </DialogTitle>
            </DialogHeader>
            
            {/* Learning Dashboard */}
            <div className="space-y-6">
              {/* Learning Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Courses Completed</div>
                        <div className="text-xl font-bold text-success">12</div>
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
                        <div className="text-xl font-bold text-warning">48</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Skill Level</div>
                        <div className="text-xl font-bold text-info">Expert</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Available Courses */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "react-patterns",
                      title: "Advanced React Patterns",
                      description: "Master the advanced React patterns including hooks, context, and performance optimization",
                      level: "Advanced",
                      duration: "12 hours",
                      progress: 75,
                      icon: "⚛️",
                      color: "primary",
                      enrolled: true
                    },
                    {
                      id: "leadership",
                      title: "Leadership Fundamentals",
                      description: "Develop essential leadership skills for managing teams and projects effectively",
                      level: "Beginner",
                      duration: "8 hours",
                      progress: 30,
                      icon: "👑",
                      color: "warning",
                      enrolled: true
                    },
                    {
                      id: "typescript",
                      title: "TypeScript Mastery",
                      description: "Complete guide to TypeScript with advanced types and real-world applications",
                      level: "Intermediate",
                      duration: "16 hours",
                      progress: 100,
                      icon: "🔷",
                      color: "info",
                      enrolled: true
                    },
                    {
                      id: "project-mgmt",
                      title: "Agile Project Management",
                      description: "Learn Scrum, Kanban, and modern project management methodologies",
                      level: "Intermediate",
                      duration: "10 hours",
                      progress: 0,
                      icon: "📊",
                      color: "accent",
                      enrolled: false
                    },
                    {
                      id: "design-systems",
                      title: "Design Systems",
                      description: "Build scalable and consistent design systems for modern applications",
                      level: "Advanced",
                      duration: "14 hours",
                      progress: 0,
                      icon: "🎨",
                      color: "success",
                      enrolled: false
                    },
                    {
                      id: "devops-basics",
                      title: "DevOps Fundamentals",
                      description: "CI/CD, containerization, and deployment strategies for modern applications",
                      level: "Advanced",
                      duration: "18 hours",
                      progress: 0,
                      icon: "⚙️",
                      color: "primary",
                      enrolled: false
                    }
                  ].map((course) => (
                    <Card
                      key={course.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                        selectedLearningCourse === course.id 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-muted hover:border-primary/40"
                      )}
                      onClick={() => setSelectedLearningCourse(course.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{course.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{course.title}</h4>
                              {course.enrolled && (
                                <Badge variant="secondary" className="text-xs">
                                  Enrolled
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {course.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {course.level}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                            </div>
                            
                            {course.enrolled && (
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleStartLearning} 
                  className="flex-1" 
                  disabled={!selectedLearningCourse}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {selectedLearningCourse ? "Start Course" : "Select a Course"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleStartAssessment("Quick Assessment")}
                  className="min-w-fit"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Take Assessment
                </Button>
                <Button variant="outline" onClick={() => setIsStartLearningOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Assessment Dialog */}
        <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Skill Assessment: {assessmentCourse}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Assessment Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary-glow/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{currentQuestion + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {assessmentQuestions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-background">
                      {Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}% Complete
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>5:00</span>
                    </div>
                  </div>
                </div>
                <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} className="h-2" />
              </div>
              
              {/* Question Card */}
              <Card className="border-muted">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6 leading-relaxed">
                    {assessmentQuestions[currentQuestion]?.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {assessmentQuestions[currentQuestion]?.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={assessmentAnswers[currentQuestion] === index.toString() ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4 transition-all duration-200 hover:scale-[1.01]"
                        onClick={() => handleAnswerQuestion(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                            assessmentAnswers[currentQuestion] === index.toString()
                              ? "border-primary-foreground bg-primary-foreground text-primary"
                              : "border-muted-foreground"
                          )}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1">{option}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Assessment Info */}
              <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    Take your time to read each question carefully. You can change your answer before moving to the next question.
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={handleNextQuestion} 
                  className="flex-1"
                  disabled={!assessmentAnswers[currentQuestion]}
                >
                  {currentQuestion === assessmentQuestions.length - 1 ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Complete Assessment
                    </>
                  ) : (
                    <>
                      Next Question
                      <span className="ml-2">→</span>
                    </>
                  )}
                </Button>
                
                {currentQuestion > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                  >
                    ← Back
                  </Button>
                )}
                
                <Button variant="outline" onClick={() => setIsAssessmentOpen(false)}>
                  Exit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Continue Learning Dialog */}
        <Dialog open={isContinueLearningOpen} onOpenChange={setIsContinueLearningOpen}>
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                Continue Your Learning Journey
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Learning Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                        <div className="text-xl font-bold text-primary">3</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                        <div className="text-xl font-bold text-success">78%</div>
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
                        <div className="text-sm text-muted-foreground">Hours Logged</div>
                        <div className="text-xl font-bold text-warning">24</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Weekly Goal</div>
                        <div className="text-xl font-bold text-info">8h</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Courses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Courses in Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "react-advanced",
                      title: "Advanced React Development",
                      instructor: "Sarah Johnson",
                      progress: 75,
                      timeSpent: "12h 30m",
                      timeRemaining: "4h 15m",
                      nextLesson: "Context API and State Management",
                      lastAccessed: "2 hours ago",
                      difficulty: "Advanced",
                      completedLessons: 9,
                      totalLessons: 12
                    },
                    {
                      id: "typescript-pro",
                      title: "TypeScript for Professionals",
                      instructor: "Mike Chen",
                      progress: 60,
                      timeSpent: "8h 45m",
                      timeRemaining: "6h 20m",
                      nextLesson: "Advanced Types and Generics",
                      lastAccessed: "1 day ago",
                      difficulty: "Intermediate",
                      completedLessons: 6,
                      totalLessons: 10
                    },
                    {
                      id: "nodejs-scaling",
                      title: "Scaling Node.js Applications",
                      instructor: "Alex Rodriguez",
                      progress: 90,
                      timeSpent: "18h 15m",
                      timeRemaining: "2h 45m",
                      nextLesson: "Performance Monitoring",
                      lastAccessed: "3 hours ago",
                      difficulty: "Advanced",
                      completedLessons: 18,
                      totalLessons: 20
                    }
                  ].map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{course.title}</h4>
                            <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {course.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                              <span>{course.timeRemaining} remaining</span>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="text-xs text-muted-foreground mb-1">Next Lesson</div>
                            <div className="font-medium text-sm">{course.nextLesson}</div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Time spent: {course.timeSpent}</span>
                            <span>Last accessed: {course.lastAccessed}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">
                            <Play className="w-3 h-3 mr-1" />
                            Continue
                          </Button>
                          <Button size="sm" variant="outline">
                            <Pause className="w-3 h-3 mr-1" />
                            Pause
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Learning Activity</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {[
                        {
                          action: "Completed lesson",
                          course: "Advanced React Development",
                          lesson: "useState and useEffect Hooks",
                          time: "2 hours ago",
                          type: "completion"
                        },
                        {
                          action: "Started new course",
                          course: "TypeScript for Professionals",
                          lesson: "Introduction to TypeScript",
                          time: "1 day ago",
                          type: "start"
                        },
                        {
                          action: "Earned certificate",
                          course: "JavaScript Fundamentals",
                          lesson: "Final Assessment",
                          time: "3 days ago",
                          type: "certificate"
                        },
                        {
                          action: "Logged learning hours",
                          course: "Node.js Scaling",
                          lesson: "2.5 hours of practice",
                          time: "1 week ago",
                          type: "hours"
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'completion' ? 'bg-success/20' :
                            activity.type === 'start' ? 'bg-primary/20' :
                            activity.type === 'certificate' ? 'bg-warning/20' :
                            'bg-info/20'
                          }`}>
                            {activity.type === 'completion' && <CheckCircle className="w-4 h-4 text-success" />}
                            {activity.type === 'start' && <Play className="w-4 h-4 text-primary" />}
                            {activity.type === 'certificate' && <Award className="w-4 h-4 text-warning" />}
                            {activity.type === 'hours' && <Clock className="w-4 h-4 text-info" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{activity.action}</div>
                            <div className="text-xs text-muted-foreground">
                              {activity.course} - {activity.lesson}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Resume Last Course
                </Button>
                <Button variant="outline" onClick={() => setIsStartLearningOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Browse More Courses
                </Button>
                <Button variant="outline" onClick={() => setIsContinueLearningOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View All Certificates Dialog */}
        <Dialog open={isViewCertificatesOpen} onOpenChange={setIsViewCertificatesOpen}>
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                My Certificates & Achievements
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Achievement Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Certificates</div>
                        <div className="text-xl font-bold text-primary">12</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                        <div className="text-xl font-bold text-success">3</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Medal className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                        <div className="text-xl font-bold text-warning">94%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Skill Rank</div>
                        <div className="text-xl font-bold text-info">Expert</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search certificates..."
                    className="pl-10"
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export All
                </Button>
              </div>

              {/* Certificates Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">My Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "cert-001",
                      title: "Advanced React Development",
                      issuer: "TechSkills Academy",
                      completedDate: "2024-08-20",
                      score: 96,
                      level: "Advanced",
                      category: "Technical Skills",
                      certificateId: "RCT-ADV-2024-001",
                      skills: ["React", "Hooks", "Context API", "Performance"],
                      validUntil: "2026-08-20"
                    },
                    {
                      id: "cert-002",
                      title: "TypeScript for Professionals",
                      issuer: "CodeMaster Institute",
                      completedDate: "2024-08-15",
                      score: 94,
                      level: "Intermediate",
                      category: "Technical Skills",
                      certificateId: "TS-PRO-2024-002",
                      skills: ["TypeScript", "Advanced Types", "Generics"],
                      validUntil: "2026-08-15"
                    },
                    {
                      id: "cert-003",
                      title: "Leadership Fundamentals",
                      issuer: "Leadership Academy",
                      completedDate: "2024-08-10",
                      score: 92,
                      level: "Beginner",
                      category: "Leadership",
                      certificateId: "LDR-FND-2024-003",
                      skills: ["Team Management", "Communication", "Decision Making"],
                      validUntil: "2027-08-10"
                    },
                    {
                      id: "cert-004",
                      title: "Node.js Application Scaling",
                      issuer: "Backend Masters",
                      completedDate: "2024-08-05",
                      score: 98,
                      level: "Advanced",
                      category: "Technical Skills",
                      certificateId: "NJS-SCL-2024-004",
                      skills: ["Node.js", "Microservices", "Performance", "Scaling"],
                      validUntil: "2026-08-05"
                    },
                    {
                      id: "cert-005",
                      title: "JavaScript Fundamentals",
                      issuer: "Web Dev Institute",
                      completedDate: "2024-07-28",
                      score: 95,
                      level: "Beginner",
                      category: "Technical Skills",
                      certificateId: "JS-FND-2024-005",
                      skills: ["JavaScript", "ES6+", "DOM", "Async Programming"],
                      validUntil: "2026-07-28"
                    },
                    {
                      id: "cert-006",
                      title: "Project Management Essentials",
                      issuer: "PM Academy",
                      completedDate: "2024-07-20",
                      score: 91,
                      level: "Intermediate",
                      category: "Leadership",
                      certificateId: "PMG-ESS-2024-006",
                      skills: ["Agile", "Scrum", "Planning", "Risk Management"],
                      validUntil: "2027-07-20"
                    }
                  ].map((cert) => (
                    <Card 
                      key={cert.id} 
                      className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary cursor-pointer relative"
                      onClick={() => {
                        setSelectedCertificate(cert);
                        setIsCertificateDetailOpen(true);
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
                              title: "Download Started",
                              description: `Downloading ${cert.title} certificate...`,
                            });
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 bg-background/80 hover:bg-background"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "Share Certificate",
                              description: `Sharing ${cert.title} certificate...`,
                            });
                          }}
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Award className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{cert.title}</div>
                              <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{cert.score}%</div>
                            <Badge variant="secondary" className="text-xs">
                              {cert.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-xs text-muted-foreground">
                            Certificate ID: {cert.certificateId}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completed: {new Date(cert.completedDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Valid until: {new Date(cert.validUntil).toLocaleDateString()}
                          </div>
                          
                          <div className="pt-2">
                            <div className="text-xs text-muted-foreground mb-1">Skills Earned:</div>
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
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

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setIsViewCertificatesOpen(false);
                    setIsStartLearningOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Earn More Certificates
                </Button>
                <Button variant="outline" onClick={() => setIsViewCertificatesOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Certificate Detail Dialog */}
        <Dialog open={isCertificateDetailOpen} onOpenChange={setIsCertificateDetailOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certificate Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedCertificate && (
              <div className="space-y-6">
                {/* Certificate Header */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Certificate Badge */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center mb-3">
                          <Award className="w-10 h-10 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {selectedCertificate.level}
                        </Badge>
                      </div>

                      {/* Certificate Info */}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h2>
                        <p className="text-lg text-muted-foreground mb-4">{selectedCertificate.issuer}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Score</Label>
                            <div className="text-xl font-bold text-green-600">{selectedCertificate.score}%</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Completed</Label>
                            <div className="font-medium">{new Date(selectedCertificate.completedDate).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Valid Until</Label>
                            <div className="font-medium">{new Date(selectedCertificate.validUntil).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Certificate ID</Label>
                            <div className="font-medium text-xs">{selectedCertificate.certificateId}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certificate Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Skills Earned */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning" />
                        Skills Earned
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCertificate.skills.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span className="font-medium">{skill}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Path */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-info" />
                        Learning Journey
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                          <div>
                            <div className="font-medium text-sm">Course Completed</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(selectedCertificate.completedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                          <div>
                            <div className="font-medium text-sm">Final Assessment</div>
                            <div className="text-xs text-muted-foreground">
                              Scored {selectedCertificate.score}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                          <div>
                            <div className="font-medium text-sm">Certificate Issued</div>
                            <div className="text-xs text-muted-foreground">
                              {selectedCertificate.issuer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certificate Verification */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        Verification
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Blockchain</span>
                          <span className="text-xs text-muted-foreground">Secured</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Digital Signature</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">Verification Hash</div>
                          <div className="text-xs font-mono break-all">
                            {selectedCertificate.certificateId}-{selectedCertificate.score}-verified
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Category</Label>
                          <div className="text-sm text-muted-foreground">{selectedCertificate.category}</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Renewal</Label>
                          <div className="text-sm text-muted-foreground">
                            {selectedCertificate.category === 'Technical Skills' ? 'Required every 2 years' : 'Lifetime validity'}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Credit Hours</Label>
                          <div className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20) + 10} hours
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Footer */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-primary-glow">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share on LinkedIn
                  </Button>
                  <Button variant="outline" onClick={() => setIsCertificateDetailOpen(false)}>
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

export default Collaboration;