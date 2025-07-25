import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Calendar as CalendarDays
} from "lucide-react";
import { format } from "date-fns";

const TaskView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      createdDate: new Date(currentYear, currentMonth, 1),
      estimatedHours: 16,
      actualHours: 8,
      tags: ["design", "ui/ux", "wireframes"]
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
      createdDate: new Date(currentYear, currentMonth, 2),
      estimatedHours: 4,
      actualHours: 0,
      tags: ["api", "documentation", "review"]
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
      tags: ["copywriting", "marketing", "user feedback"]
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
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/my-tasks')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Tasks
            </Button>
          </div>
          <Button onClick={() => navigate(`/edit-task/${task.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Task
          </Button>
        </div>

        {/* Task Header Card */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{task.title}</CardTitle>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={getStatusColor(task.status)}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                  </Badge>
                  <Badge className={getPriorityColor(task.priority)}>
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority} priority
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    {task.project}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{task.assignee.name}</div>
                  <div className="text-muted-foreground">Assignee</div>
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
                <Button variant="outline" size="sm" className="w-full mt-4">
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
      </div>
    </div>
  );
};

export default TaskView;