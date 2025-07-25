import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, User, ArrowLeft, Save, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: searchParams.get('project') || "",
    sprint: searchParams.get('sprint') || "",
    priority: "",
    assignee: "",
    status: "todo",
    storyPoints: "",
    estimatedHours: ""
  });

  const projects = [
    { id: "1", name: "Website Redesign", color: "#8B5CF6" },
    { id: "2", name: "Mobile App", color: "#06B6D4" },
    { id: "3", name: "Marketing Campaign", color: "#10B981" }
  ];

  const sprints = [
    { id: "1", name: "Sprint 1 - Foundation", projectId: "1", status: "active" },
    { id: "2", name: "Sprint 2 - Core Features", projectId: "1", status: "planning" },
    { id: "3", name: "Sprint 1 - MVP", projectId: "2", status: "active" }
  ];

  const teamMembers = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com" },
    { id: "2", name: "Mike Johnson", email: "mike@company.com" },
    { id: "3", name: "Emily Davis", email: "emily@company.com" },
    { id: "4", name: "Alex Kim", email: "alex@company.com" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.project) {
      toast({
        title: "Missing Information",
        description: "Please fill in the task title and select a project.",
        variant: "destructive"
      });
      return;
    }

    // Simulate task creation
    toast({
      title: "Task Created!",
      description: `"${formData.title}" has been created successfully.`,
      variant: "default"
    });

    // Reset form and navigate back
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Create New Task</h1>
          </div>
          <Button variant="hero" onClick={handleSubmit} className="gap-2">
            <Save className="w-4 h-4" />
            Create Task
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Task Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter task title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the task..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Project *</Label>
                      <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                                {project.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sprint Selection */}
                    <div className="space-y-2">
                      <Label>Sprint (Optional)</Label>
                      <Select value={formData.sprint} onValueChange={(value) => setFormData({ ...formData, sprint: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sprint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No Sprint</SelectItem>
                          {sprints
                            .filter(sprint => !formData.project || sprint.projectId === formData.project)
                            .map((sprint) => (
                            <SelectItem key={sprint.id} value={sprint.id}>
                              <div className="flex items-center gap-2">
                                <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                  {sprint.status}
                                </Badge>
                                {sprint.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            <Badge variant="outline" className="bg-muted text-muted-foreground">Low</Badge>
                          </SelectItem>
                          <SelectItem value="medium">
                            <Badge variant="outline" className="bg-warning text-warning-foreground">Medium</Badge>
                          </SelectItem>
                          <SelectItem value="high">
                            <Badge variant="outline" className="bg-destructive text-destructive-foreground">High</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Story Points</Label>
                      <Select value={formData.storyPoints} onValueChange={(value) => setFormData({ ...formData, storyPoints: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select story points" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Point</SelectItem>
                          <SelectItem value="2">2 Points</SelectItem>
                          <SelectItem value="3">3 Points</SelectItem>
                          <SelectItem value="5">5 Points</SelectItem>
                          <SelectItem value="8">8 Points</SelectItem>
                          <SelectItem value="13">13 Points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Estimated Hours</Label>
                      <Input
                        type="number"
                        placeholder="Enter estimated hours"
                        value={formData.estimatedHours}
                        onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Assignee</Label>
                      <Select value={formData.assignee} onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src="" />
                                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                    {member.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">{member.email}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button variant="outline" type="button" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                  <Button variant="hero" type="submit" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Task
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;