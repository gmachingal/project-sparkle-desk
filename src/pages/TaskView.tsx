import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { 
  ArrowLeft, 
  Edit, 
  Calendar,
  Flag,
  User,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Play,
  Calendar as CalendarDays,
  Users,
  ArrowRight,
  History,
  FileText,
  Image,
  File,
  Download,
  Eye,
  Settings,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";

const TaskView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Local state for quick actions
  const [taskStatus, setTaskStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  // Mock data for team members
  const teamMembers = [
    { id: "1", name: "John Smith", avatar: "", role: "Frontend Developer" },
    { id: "2", name: "Sarah Johnson", avatar: "", role: "UI/UX Designer" },
    { id: "3", name: "Mike Chen", avatar: "", role: "Backend Developer" },
    { id: "4", name: "Emily Davis", avatar: "", role: "Product Manager" },
    { id: "5", name: "Alex Wilson", avatar: "", role: "QA Engineer" },
  ];

  // Mock task data - in real app this would come from API
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const mockTasks = [
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create initial wireframes and high-fidelity designs for the new homepage. This includes user research, competitor analysis, and creating multiple design variations for A/B testing.",
      status: "in-progress" as const,
      priority: "high" as const,
      startDate: new Date(currentYear, currentMonth, 5),
      dueDate: new Date(currentYear, currentMonth, 10),
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
      projectId: "1",
      sprint: {
        id: "1",
        name: "Sprint 1 - Foundation",
        status: "active" as const,
        startDate: new Date(currentYear, currentMonth, 1),
        endDate: new Date(currentYear, currentMonth, 14),
        progress: 65
      },
      milestone: {
        id: "1",
        name: "UI Design",
        status: "completed" as const
      },
      createdDate: new Date(currentYear, currentMonth, 1),
      estimatedHours: 16,
      actualHours: 8,
      tags: ["design", "ui/ux", "wireframes"],
      documents: [
        {
          id: '1',
          name: 'Homepage_Wireframes_v2.sketch',
          type: 'design',
          size: '4.2 MB',
          uploadedAt: new Date(currentYear, currentMonth, 2),
          uploadedBy: 'Sarah Johnson'
        },
        {
          id: '2',
          name: 'Brand_Guidelines.pdf',
          type: 'pdf',
          size: '1.8 MB',
          uploadedAt: new Date(currentYear, currentMonth, 4),
          uploadedBy: 'Design Team'
        },
        {
          id: '3',
          name: 'User_Feedback_Screenshots.zip',
          type: 'file',
          size: '8.7 MB',
          uploadedAt: new Date(currentYear, currentMonth, 7),
          uploadedBy: 'You'
        }
      ],
      assigneeHistory: [
        {
          id: "1",
          assignee: { name: "John Smith", avatar: "" },
          status: "todo",
          assignedDate: new Date(currentYear, currentMonth, 1),
          completedDate: new Date(currentYear, currentMonth, 3),
          notes: "Initial requirements gathering and research"
        },
        {
          id: "2", 
          assignee: { name: "Sarah Johnson", avatar: "" },
          status: "in-progress",
          assignedDate: new Date(currentYear, currentMonth, 3),
          completedDate: new Date(currentYear, currentMonth, 6),
          notes: "Created wireframes and low-fidelity prototypes"
        },
        {
          id: "3",
          assignee: { name: "You", avatar: "" },
          status: "in-progress",
          assignedDate: new Date(currentYear, currentMonth, 6),
          completedDate: null,
          notes: "Working on high-fidelity designs and A/B test variations"
        }
      ]
    },
    {
      id: "2",
      title: "Review API documentation",
      description: "Go through the new API docs and provide feedback on clarity and completeness.",
      status: "todo" as const,
      priority: "medium" as const,
      startDate: new Date(currentYear, currentMonth, 12),
      dueDate: new Date(currentYear, currentMonth, 15),
      assignee: { name: "You", avatar: "" },
      project: "Mobile App",
      projectId: "2",
      sprint: {
        id: "2",
        name: "Sprint 2 - Core Features",
        status: "planned" as const,
        startDate: new Date(currentYear, currentMonth, 15),
        endDate: new Date(currentYear, currentMonth, 28),
        progress: 0
      },
      milestone: {
        id: "4",
        name: "MVP Release",
        status: "planned" as const
      },
      createdDate: new Date(currentYear, currentMonth, 2),
      estimatedHours: 4,
      actualHours: 0,
      tags: ["api", "documentation", "review"],
      documents: [],
      assigneeHistory: [
        {
          id: "1",
          assignee: { name: "You", avatar: "" },
          status: "todo",
          assignedDate: new Date(currentYear, currentMonth, 2),
          completedDate: null,
          notes: "Assigned for API documentation review"
        }
      ]
    },
    {
      id: "3",
      title: "Update marketing copy",
      description: "Revise the product page copy based on user feedback from the latest survey.",
      status: "completed" as const,
      priority: "low" as const,
      startDate: new Date(currentYear, currentMonth, 6),
      dueDate: new Date(currentYear, currentMonth, 8),
      assignee: { name: "You", avatar: "" },
      project: "Marketing Campaign",
      projectId: "3",
      sprint: {
        id: "3",
        name: "Sprint 1 - Content Strategy",
        status: "completed" as const,
        startDate: new Date(currentYear, currentMonth - 1, 20),
        endDate: new Date(currentYear, currentMonth, 10),
        progress: 100
      },
      createdDate: new Date(currentYear, currentMonth - 1, 25),
      estimatedHours: 6,
      actualHours: 5,
      tags: ["copywriting", "marketing", "user feedback"],
      documents: [
        {
          id: '1',
          name: 'Original_Copy_Draft.docx',
          type: 'document',
          size: '245 KB',
          uploadedAt: new Date(currentYear, currentMonth - 1, 26),
          uploadedBy: 'Marketing Lead'
        },
        {
          id: '2',
          name: 'User_Survey_Results.pdf',
          type: 'pdf',
          size: '1.1 MB',
          uploadedAt: new Date(currentYear, currentMonth, 1),
          uploadedBy: 'Research Team'
        }
      ],
      assigneeHistory: [
        {
          id: "1",
          assignee: { name: "Marketing Lead", avatar: "" },
          status: "todo",
          assignedDate: new Date(currentYear, currentMonth - 1, 25),
          completedDate: new Date(currentYear, currentMonth, 2),
          notes: "Initial copy draft and user feedback analysis"
        },
        {
          id: "2",
          assignee: { name: "Content Writer", avatar: "" },
          status: "in-progress", 
          assignedDate: new Date(currentYear, currentMonth, 2),
          completedDate: new Date(currentYear, currentMonth, 6),
          notes: "Revised copy based on feedback and A/B testing"
        },
        {
          id: "3",
          assignee: { name: "You", avatar: "" },
          status: "completed",
          assignedDate: new Date(currentYear, currentMonth, 6),
          completedDate: new Date(currentYear, currentMonth, 8),
          notes: "Final review and approval of marketing copy"
        }
      ]
    },
    {
      id: "4",
      title: "Bug fixes for login flow",
      description: "Fix authentication issues reported by users, including password reset and social login problems.",
      status: "todo" as const,
      priority: "high" as const,
      startDate: new Date(currentYear, currentMonth, 18),
      dueDate: new Date(currentYear, currentMonth, 20),
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
      projectId: "1",
      sprint: {
        id: "1",
        name: "Sprint 1 - Foundation",
        status: "active" as const,
        startDate: new Date(currentYear, currentMonth, 1),
        endDate: new Date(currentYear, currentMonth, 14),
        progress: 65
      },
      milestone: {
        id: "2",
        name: "Backend API",
        status: "in-progress" as const
      },
      createdDate: new Date(currentYear, currentMonth, 5),
      estimatedHours: 12,
      actualHours: 0,
      tags: ["bug fix", "authentication", "security"]
    },
    {
      id: "5",
      title: "Prepare presentation slides",
      description: "Create slides for the quarterly review meeting, including project updates and metrics.",
      status: "in-progress" as const,
      priority: "medium" as const,
      startDate: new Date(currentYear, currentMonth, 22),
      dueDate: new Date(currentYear, currentMonth, 25),
      assignee: { name: "You", avatar: "" },
      project: "Internal",
      projectId: "4",
      sprint: null, // No sprint assigned
      createdDate: new Date(currentYear, currentMonth, 15),
      estimatedHours: 8,
      actualHours: 3,
      tags: ["presentation", "quarterly review", "metrics"]
    }
  ];

  const task = mockTasks.find(t => t.id === id);

  // Initialize local state with task data
  useState(() => {
    if (task) {
      setTaskStatus(task.status);
      setAssignedUser(task.assignee.name);
    }
  });

  // Quick action handlers
  const handleStatusChange = (newStatus: string) => {
    setTaskStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Task status changed to ${newStatus.replace('-', ' ')}`,
    });
  };

  const handleAssigneeChange = (newAssignee: string) => {
    setAssignedUser(newAssignee);
    toast({
      title: "Assignee Updated", 
      description: `Task assigned to ${newAssignee}`,
    });
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Task Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The task you're looking for doesn't exist or has been deleted.
              </p>
              <Button onClick={() => navigate("/my-tasks")}>
                Back to My Tasks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      case 'design':
        return <File className="w-5 h-5 text-purple-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'todo': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const progressPercentage = task.estimatedHours > 0 ? Math.round((task.actualHours / task.estimatedHours) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation & Quick Actions Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/my-tasks')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Tasks
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Status Change */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Change Status</h4>
                    <Select value={taskStatus} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Assign to Team Member</h4>
                    <Select value={assignedUser} onValueChange={handleAssigneeChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.name}>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button onClick={() => navigate(`/edit-task/${task.id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          </div>
        </div>

        {/* Enhanced Task Header Card */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Main Task Info */}
          <Card className="xl:col-span-3">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-4 leading-tight">{task.title}</CardTitle>
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <Badge className={getStatusColor(taskStatus)} variant="secondary">
                      {getStatusIcon(taskStatus)}
                      <span className="ml-1 capitalize">{taskStatus.replace('-', ' ')}</span>
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority} priority
                    </Badge>
                  </div>
                  
                  {/* Project & Milestone Info */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      <span className="font-medium">{task.project}</span>
                    </div>
                    {task.milestone && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>{task.milestone.name}</span>
                        <Badge 
                          variant={task.milestone.status === 'completed' ? 'default' : task.milestone.status === 'in-progress' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {task.milestone.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {task.description}
                </p>
              </div>
              
              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Task Stats & Assignee Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Task Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Assignee */}
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {assignedUser.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium">{assignedUser}</div>
                <div className="text-sm text-muted-foreground">Current Assignee</div>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Spent</span>
                  <span className="font-medium">{task.actualHours}h / {task.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Due Date</span>
                  <span className="font-medium text-sm">{format(task.dueDate, 'MMM dd')}</span>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="space-y-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/time-logging')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Log Time
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignee History Section */}
        {task.assigneeHistory && task.assigneeHistory.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-4 h-4" />
                Task Progress & Assignee History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {task.assigneeHistory.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    {/* Timeline connector */}
                    {index < task.assigneeHistory.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-border"></div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Status indicator */}
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        entry.status === 'completed' ? 'bg-green-100 border-green-300' :
                        entry.status === 'in-progress' ? 'bg-blue-100 border-blue-300' :
                        'bg-gray-100 border-gray-300'
                      }`}>
                        {entry.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : entry.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-muted/30 rounded-lg p-4 border">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={entry.assignee.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                  {entry.assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-sm">{entry.assignee.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant={
                                    entry.status === 'completed' ? 'default' :
                                    entry.status === 'in-progress' ? 'secondary' : 'outline'
                                  } className="text-xs">
                                    {entry.status === 'in-progress' ? 'In Progress' : 
                                     entry.status === 'completed' ? 'Completed' : 'To Do'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <div>Assigned: {format(entry.assignedDate, 'MMM dd, yyyy')}</div>
                              {entry.completedDate && (
                                <div>Completed: {format(entry.completedDate, 'MMM dd, yyyy')}</div>
                              )}
                              {entry.completedDate && (
                                <div className="text-xs text-primary font-medium">
                                  Duration: {Math.ceil((entry.completedDate.getTime() - entry.assignedDate.getTime()) / (1000 * 60 * 60 * 24))} days
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {entry.notes && (
                            <div className="text-sm text-muted-foreground bg-background rounded p-3 border-l-2 border-primary">
                              <div className="font-medium text-foreground mb-1">Work Summary:</div>
                              {entry.notes}
                            </div>
                          )}
                        </div>

                        {/* Arrow between stages */}
                        {index < task.assigneeHistory.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task Documents Section */}
        {task.documents && task.documents.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Task Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {task.documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{doc.uploadedBy}</span>
                            <span>•</span>
                            <span>{format(doc.uploadedAt, 'MMM dd, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="ghost" size="sm" className="flex-1 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Progress & Time Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Progress & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Time Progress</span>
                  <span className="font-medium">{task.actualHours}h / {task.estimatedHours}h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="text-center text-sm font-medium">
                  {progressPercentage}% completed
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Hours</span>
                  <span className="font-medium">{task.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Actual Hours</span>
                  <span className="font-medium">{task.actualHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-medium">
                    {Math.max(0, task.estimatedHours - task.actualHours)}h
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => navigate('/time-logging')}
                >
                  <Clock className="w-3 h-3 mr-2" />
                  Log Time
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dates & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Play className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="font-medium">{format(task.startDate, 'MMM dd, yyyy')}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Due Date</div>
                  <div className="font-medium">{format(task.dueDate, 'MMM dd, yyyy')}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="font-medium">{format(task.createdDate, 'MMM dd, yyyy')}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Details */}
          {task.milestone && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Milestone Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Milestone Name</div>
                  <div className="font-medium">{task.milestone.name}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge 
                    variant={task.milestone.status === 'completed' ? 'default' : task.milestone.status === 'in-progress' ? 'secondary' : 'outline'}
                  >
                    {task.milestone.status.charAt(0).toUpperCase() + task.milestone.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sprint Details */}
          {task.sprint && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Sprint Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Sprint Name</div>
                  <div className="font-medium">{task.sprint.name}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge 
                    variant={task.sprint.status === 'active' ? 'default' : task.sprint.status === 'completed' ? 'secondary' : 'outline'}
                  >
                    {task.sprint.status.charAt(0).toUpperCase() + task.sprint.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sprint Progress</span>
                    <span className="font-medium">{task.sprint.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        task.sprint.status === 'active' ? 'bg-blue-500' : 
                        task.sprint.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${task.sprint.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Start</div>
                    <div className="font-medium">{format(task.sprint.startDate, 'MMM dd')}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">End</div>
                    <div className="font-medium">{format(task.sprint.endDate, 'MMM dd')}</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate(`/sprint-dashboard/${task.projectId}/${task.sprint.id}`)}
                >
                  <Target className="w-3 h-3 mr-2" />
                  View Sprint Dashboard
                </Button>
              </CardContent>
            </Card>
          )}

          {!task.sprint && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Sprint Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Target className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <div className="text-sm text-muted-foreground mb-4">
                    This task is not assigned to any sprint
                  </div>
                  <Button variant="outline" size="sm">
                    Assign to Sprint
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Log History Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time Log History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium text-sm">Initial wireframe sketches</p>
                      <p className="text-xs text-muted-foreground">Nov 15, 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary">3.0 hrs</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium text-sm">Hero section design refinement</p>
                      <p className="text-xs text-muted-foreground">Nov 16, 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary">2.5 hrs</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div>
                      <p className="font-medium text-sm">User testing feedback integration</p>
                      <p className="text-xs text-muted-foreground">Nov 17, 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary">2.5 hrs</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskView;