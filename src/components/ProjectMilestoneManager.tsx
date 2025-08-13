import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Edit,
  Eye,
  Save,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "not-started" | "in-progress" | "completed" | "blocked";
  progress: number;
  assignedTasks: Task[];
  priority: "low" | "medium" | "high";
}

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface ProjectMilestoneManagerProps {
  projectId: string;
  projectName: string;
  trigger?: React.ReactNode;
}

const ProjectMilestoneManager = ({ projectId, projectName, trigger }: ProjectMilestoneManagerProps) => {
  const { toast } = useToast();
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  // Mock milestone data - in real app this would come from API
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "m1",
      name: "Project Planning & Setup",
      description: "Initial project setup, requirements gathering, and team formation",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      status: "completed",
      progress: 100,
      priority: "high",
      assignedTasks: [
        {
          id: "t1",
          title: "Define project requirements",
          status: "completed",
          assignee: "Alice Johnson",
          priority: "high",
          dueDate: "2024-01-05"
        },
        {
          id: "t2",
          title: "Setup development environment",
          status: "completed",
          assignee: "Bob Smith",
          priority: "medium",
          dueDate: "2024-01-10"
        }
      ]
    },
    {
      id: "m2",
      name: "Core Development Phase",
      description: "Main development work including frontend and backend implementation",
      startDate: "2024-01-16",
      endDate: "2024-03-01",
      status: "in-progress",
      progress: 65,
      priority: "high",
      assignedTasks: [
        {
          id: "t3",
          title: "Implement user authentication",
          status: "completed",
          assignee: "Carol Wilson",
          priority: "high",
          dueDate: "2024-02-01"
        },
        {
          id: "t4",
          title: "Build dashboard components",
          status: "in-progress",
          assignee: "David Brown",
          priority: "medium",
          dueDate: "2024-02-15"
        },
        {
          id: "t5",
          title: "API integration",
          status: "todo",
          assignee: "Eva Davis",
          priority: "high",
          dueDate: "2024-02-28"
        }
      ]
    },
    {
      id: "m3",
      name: "Testing & Quality Assurance",
      description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing",
      startDate: "2024-03-02",
      endDate: "2024-03-20",
      status: "not-started",
      progress: 0,
      priority: "medium",
      assignedTasks: [
        {
          id: "t6",
          title: "Write unit tests",
          status: "todo",
          assignee: "Frank Miller",
          priority: "medium",
          dueDate: "2024-03-10"
        },
        {
          id: "t7",
          title: "Perform user acceptance testing",
          status: "todo",
          assignee: "Grace Taylor",
          priority: "high",
          dueDate: "2024-03-18"
        }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "in-progress": return "text-blue-600 bg-blue-100";
      case "blocked": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "blocked": return <AlertCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      default: return "text-green-600 bg-green-100";
    }
  };

  const handleUpdateMilestone = (milestoneId: string, field: string, value: string) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === milestoneId 
          ? { ...milestone, [field]: value }
          : milestone
      )
    );
    
    toast({
      title: "Milestone Updated",
      description: `Milestone ${field} has been updated successfully.`,
    });
  };

  const TaskStatusBadge = ({ status }: { status: string }) => (
    <Badge variant="outline" className={cn("text-xs", {
      "border-green-200 text-green-700 bg-green-50": status === "completed",
      "border-blue-200 text-blue-700 bg-blue-50": status === "in-progress",
      "border-gray-200 text-gray-700 bg-gray-50": status === "todo"
    })}>
      {status.replace("-", " ")}
    </Badge>
  );

  const MilestoneCard = ({ milestone }: { milestone: Milestone }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(milestone.status)}
              <CardTitle className="text-lg">{milestone.name}</CardTitle>
              <Badge className={cn("text-xs", getStatusColor(milestone.status))}>
                {milestone.status.replace("-", " ")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
          </div>
          <div className="flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setEditingMilestone(milestone.id)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Milestone</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="milestone-name">Milestone Name</Label>
                    <Input
                      id="milestone-name"
                      defaultValue={milestone.name}
                      onBlur={(e) => handleUpdateMilestone(milestone.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        defaultValue={milestone.startDate}
                        onBlur={(e) => handleUpdateMilestone(milestone.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        defaultValue={milestone.endDate}
                        onBlur={(e) => handleUpdateMilestone(milestone.id, "endDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={milestone.status}
                      onValueChange={(value) => handleUpdateMilestone(milestone.id, "status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMilestone(milestone.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[600px] max-w-full">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {milestone.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                      <p className="text-sm font-medium">{new Date(milestone.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                      <p className="text-sm font-medium">{new Date(milestone.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">Progress</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span className="font-medium">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Tasks in this Milestone ({milestone.assignedTasks.length})
                    </Label>
                    <div className="space-y-3">
                      {milestone.assignedTasks.map((task) => (
                        <Card key={task.id} className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{task.assignee}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <TaskStatusBadge status={task.status} />
                              <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{milestone.progress}%</span>
          </div>
          <Progress value={milestone.progress} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}</span>
              </div>
              <Badge className={cn("text-xs", getPriorityColor(milestone.priority))}>
                {milestone.priority} priority
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileText className="w-3 h-3" />
              <span>{milestone.assignedTasks.length} tasks</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Target className="w-4 h-4" />
            Milestones
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Milestones - {projectName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Manage project milestones, track progress, and monitor task completion
              </p>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Milestone
              </Button>
            </div>
            
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectMilestoneManager;