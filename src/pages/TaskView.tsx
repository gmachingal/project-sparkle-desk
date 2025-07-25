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
  AlertCircle
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
      dueDate: new Date(currentYear, currentMonth, 10),
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
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
      dueDate: new Date(currentYear, currentMonth, 15),
      assignee: { name: "You", avatar: "" },
      project: "Mobile App",
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
      dueDate: new Date(currentYear, currentMonth, 8),
      assignee: { name: "You", avatar: "" },
      project: "Marketing Campaign",
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
      dueDate: new Date(currentYear, currentMonth, 20),
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
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
      dueDate: new Date(currentYear, currentMonth, 25),
      assignee: { name: "You", avatar: "" },
      project: "Internal",
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/my-tasks')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Tasks
            </Button>
            <Button onClick={() => navigate(`/edit-task/${task.id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-2xl">{task.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {getStatusIcon(task.status)}
                        <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {task.tags && task.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
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

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Time Progress</span>
                    <span>{task.actualHours}h / {task.estimatedHours}h</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {progressPercentage}% completed
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Project</div>
                    <div className="font-medium">{task.project}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Assignee</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{task.assignee.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Due Date</div>
                    <div className="font-medium">{format(task.dueDate, 'MMM dd, yyyy')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Created</div>
                    <div className="font-medium">{format(task.createdDate, 'MMM dd, yyyy')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated</span>
                  <span className="font-medium">{task.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Actual</span>
                  <span className="font-medium">{task.actualHours}h</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-medium">
                    {Math.max(0, task.estimatedHours - task.actualHours)}h
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;