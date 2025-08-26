import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import { CalendarIcon, User, Save, Plus, Target, Tag, X, Upload, FileText, Image, File, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [dueDate, setDueDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: searchParams.get('project') || "1",
    sprint: searchParams.get('sprint') || "",
    milestone: "",
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
    { 
      id: "1", 
      name: "Sprint 1 - Foundation", 
      projectId: "1", 
      status: "active" as const,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      progress: 65
    },
    { 
      id: "2", 
      name: "Sprint 2 - Core Features", 
      projectId: "1", 
      status: "planned" as const,
      startDate: new Date('2024-01-30'),
      endDate: new Date('2024-02-13'),
      progress: 0
    },
    { 
      id: "3", 
      name: "Sprint 1 - MVP", 
      projectId: "2", 
      status: "active" as const,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-10'),
      progress: 45
    }
  ];

  const milestones = [
    { 
      id: "1", 
      name: "UI Design", 
      projectId: "1", 
      status: "completed" as const, 
      dueDate: new Date('2024-01-15'),
      description: "Complete all UI/UX design components"
    },
    { 
      id: "2", 
      name: "Backend API", 
      projectId: "1", 
      status: "in-progress" as const, 
      dueDate: new Date('2024-02-28'),
      description: "Develop core backend API endpoints"
    },
    { 
      id: "3", 
      name: "Frontend Development", 
      projectId: "1", 
      status: "planned" as const, 
      dueDate: new Date('2024-03-15'),
      description: "Build frontend components and pages"
    },
    { 
      id: "4", 
      name: "MVP Release", 
      projectId: "2", 
      status: "planned" as const, 
      dueDate: new Date('2024-04-01'),
      description: "Release minimum viable product"
    }
  ];

  const teamMembers = [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com" },
    { id: "2", name: "Mike Johnson", email: "mike@company.com" },
    { id: "3", name: "Emily Davis", email: "emily@company.com" },
    { id: "4", name: "Alex Kim", email: "alex@company.com" }
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      case 'design':
        return <File className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-blue-500" />;
    }
  };

  const simulateFileUpload = () => {
    const mockFile = {
      id: Date.now().toString(),
      name: `Document_${uploadedDocuments.length + 1}.pdf`,
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: new Date()
    };
    setUploadedDocuments([...uploadedDocuments, mockFile]);
  };

  const removeDocument = (docId: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== docId));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
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
      <Header
        title="Create Task"
        subtitle="Add a new task to your project"
        backButton={true}
        actionButton={{
          label: "Create Task",
          icon: Save,
          onClick: handleSubmit,
          variant: "default"
        }}
      />
      
      <div className="container mx-auto px-4 py-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task Details */}
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
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

                  <div>
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <EnhancedCalendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? format(dueDate, "PPP") : "Pick due date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <EnhancedCalendar
                          mode="single"
                          selected={dueDate}
                          onSelect={setDueDate}
                          initialFocus
                          disabled={(date) => startDate ? date < startDate : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={addTag}
                          disabled={!newTag.trim()}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="bg-primary/10 text-primary border-primary/20 px-2 py-1"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-auto p-0 hover:bg-transparent"
                                onClick={() => removeTag(tag)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Estimated Hours</Label>
                    <Input
                      type="number"
                      placeholder="Enter estimated hours"
                      value={formData.estimatedHours}
                      onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment & Project */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment & Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
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

                <div>
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

                <div>
                  <Label>Sprint (Optional)</Label>
                  <Select value={formData.sprint} onValueChange={(value) => setFormData({ ...formData, sprint: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sprint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Sprint</SelectItem>
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

                <div>
                  <Label>Milestone (Optional)</Label>
                  <Select value={formData.milestone} onValueChange={(value) => setFormData({ ...formData, milestone: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Milestone</SelectItem>
                      {milestones
                        .filter(milestone => !formData.project || milestone.projectId === formData.project)
                        .map((milestone) => (
                        <SelectItem key={milestone.id} value={milestone.id}>
                          <div className="flex items-center gap-2">
                            <Target className="w-3 h-3" />
                            <Badge 
                              variant={milestone.status === 'completed' ? 'default' : milestone.status === 'in-progress' ? 'secondary' : 'outline'} 
                              className="text-xs"
                            >
                              {milestone.status.replace('-', ' ')}
                            </Badge>
                            {milestone.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
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
              </CardContent>
            </Card>

            {/* Sprint Details */}
            {formData.sprint && formData.sprint !== 'none' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Sprint Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const selectedSprint = sprints.find(s => s.id === formData.sprint);
                    if (!selectedSprint) return null;
                    
                    return (
                      <>
                        <div>
                          <div className="text-sm text-muted-foreground">Sprint Name</div>
                          <div className="font-medium">{selectedSprint.name}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Status</div>
                          <Badge 
                            variant={selectedSprint.status === 'active' ? 'default' : 'outline'}
                          >
                            {selectedSprint.status.charAt(0).toUpperCase() + selectedSprint.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Sprint Progress</span>
                            <span className="font-medium">{selectedSprint.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                selectedSprint.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${selectedSprint.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-muted-foreground">Start</div>
                            <div className="font-medium">{format(selectedSprint.startDate, 'MMM dd')}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">End</div>
                            <div className="font-medium">{format(selectedSprint.endDate, 'MMM dd')}</div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Placeholder card when no sprint selected */}
            {(!formData.sprint || formData.sprint === 'none') && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Sprint Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Target className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <div className="text-sm text-muted-foreground mb-4">
                      This task is not assigned to any sprint
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Select a sprint above to assign this task
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Document Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Task Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Upload Zone */}
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                  isDragging 
                    ? 'border-primary bg-primary/10 scale-105' 
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  simulateFileUpload();
                }}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Upload Task Documents</h3>
                <p className="text-muted-foreground mb-3 text-sm">
                  Drag and drop files here or click to browse
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={simulateFileUpload}
                  className="mb-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground">
                  Supports: PDF, DOC, XLS, IMG • Max 10MB per file
                </p>
              </div>

              {/* Uploaded Documents */}
              {uploadedDocuments.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">Uploaded Documents</h4>
                    <Badge variant="outline">{uploadedDocuments.length} files</Badge>
                  </div>
                  <div className="space-y-2">
                    {uploadedDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
                        <div className="flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(doc.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </form>
      </div>
    </div>
  );
};

export default CreateTask;