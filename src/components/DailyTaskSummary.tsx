import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Clock, 
  User, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    email: string;
  };
  project: string;
  dueTime?: string;
  estimatedHours?: number;
}

interface DailyTaskSummaryProps {
  isAdmin?: boolean;
}

const DailyTaskSummary = ({ isAdmin = false }: DailyTaskSummaryProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Mock task data - would come from API
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Code Review - Authentication Module",
      description: "Review pull request for new authentication system",
      status: "in-progress",
      priority: "high",
      assignee: { name: "Alex Johnson", email: "alex@company.com" },
      project: "Website Redesign",
      dueTime: "2:00 PM",
      estimatedHours: 2
    },
    {
      id: "2",
      title: "Database Migration Scripts",
      description: "Write migration scripts for user table updates",
      status: "todo",
      priority: "medium",
      assignee: { name: "Sarah Wilson", email: "sarah@company.com" },
      project: "Backend Optimization",
      dueTime: "11:00 AM",
      estimatedHours: 3
    },
    {
      id: "3",
      title: "Client Presentation Prep",
      description: "Prepare slides for quarterly review meeting",
      status: "completed",
      priority: "high",
      assignee: { name: "Mike Chen", email: "mike@company.com" },
      project: "Marketing Campaign",
      dueTime: "9:00 AM",
      estimatedHours: 1.5
    },
    {
      id: "4",
      title: "API Documentation Update",
      description: "Update documentation for new endpoints",
      status: "overdue",
      priority: "medium",
      assignee: { name: "Lisa Davis", email: "lisa@company.com" },
      project: "Mobile App",
      dueTime: "Yesterday",
      estimatedHours: 1
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  const groupTasksByProject = (tasks: Task[]) => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.project]) {
        acc[task.project] = [];
      }
      acc[task.project].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
  };

  const groupedTasks = groupTasksByProject(mockTasks);

  const handleTaskClick = (taskId: string) => {
    navigate(`/edit-task/${taskId}`);
  };

  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === "completed").length;
  const overdueTasks = mockTasks.filter(t => t.status === "overdue").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Daily Task Summary {isAdmin && "- All Employees"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date || new Date());
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="flex items-center gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm">
            <span className="font-medium">Total: </span>
            <span className="text-primary">{totalTasks}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Completed: </span>
            <span className="text-green-600">{completedTasks}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Overdue: </span>
            <span className="text-red-600">{overdueTasks}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Progress: </span>
            <span className="text-blue-600">{Math.round((completedTasks / totalTasks) * 100)}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.entries(groupedTasks).map(([project, tasks]) => (
          <div key={project} className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-medium text-lg">{project}</h3>
              <Badge variant="outline" className="ml-auto">
                {tasks.length} tasks
              </Badge>
            </div>
            
            <div className="grid gap-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium text-sm line-clamp-1">{task.title}</h4>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        
                        {isAdmin && (
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-muted-foreground" />
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {task.assignee.name}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 text-xs">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getPriorityColor(task.priority))}
                        >
                          {task.priority}
                        </Badge>
                        
                        <Badge 
                          variant="outline"
                          className={cn("text-xs", getStatusBadgeColor(task.status))}
                        >
                          {task.status}
                        </Badge>
                        
                        {task.dueTime && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{task.dueTime}</span>
                          </div>
                        )}
                        
                        {task.estimatedHours && (
                          <span className="text-muted-foreground">
                            {task.estimatedHours}h est.
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
        
        {totalTasks === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No tasks scheduled for {format(selectedDate, "MMMM d, yyyy")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyTaskSummary;