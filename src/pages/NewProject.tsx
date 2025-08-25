import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowLeft, Save, Plus, Users, Target, Palette, X, Building2, Upload, FileText, Image, File, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import MilestoneManager from "@/components/MilestoneManager";

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dueDate, setDueDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    privacy: "team",
    color: "#8B5CF6",
    organization: ""
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const projectTemplates = [
    { id: "blank", name: "Blank Project", description: "Start from scratch" },
    { id: "marketing", name: "Marketing Campaign", description: "Plan and execute marketing campaigns" },
    { id: "software", name: "Software Development", description: "Manage development sprints and releases" },
    { id: "event", name: "Event Planning", description: "Organize events from start to finish" },
    { id: "design", name: "Design Project", description: "Creative projects and design workflows" }
  ];

  const teamMembers = [
    { id: "1", name: "Sarah Chen", role: "Designer", email: "sarah@company.com" },
    { id: "2", name: "Mike Johnson", role: "Developer", email: "mike@company.com" },
    { id: "3", name: "Emily Davis", role: "Marketing", email: "emily@company.com" },
    { id: "4", name: "Alex Kim", role: "PM", email: "alex@company.com" },
    { id: "5", name: "David Liu", role: "Developer", email: "david@company.com" },
    { id: "6", name: "Lisa Wang", role: "Designer", email: "lisa@company.com" }
  ];

  const projectColors = [
    "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5A3C", "#6366F1", "#EC4899"
  ];

  const organizations = [
    { id: "1", name: "TechCorp Inc", domain: "techcorp.com" },
    { id: "2", name: "StartupHub", domain: "startuphub.io" },
    { id: "3", name: "Global Solutions", domain: "globalsolutions.net" },
    { id: "4", name: "Innovation Labs", domain: "innovationlabs.org" }
  ];

  const existingMilestones = [
    { id: "1", name: "Project Kickoff", description: "Initial project setup and team alignment", estimatedDuration: "1 week" },
    { id: "2", name: "Requirements Gathering", description: "Collect and document all project requirements", estimatedDuration: "2 weeks" },
    { id: "3", name: "Design Phase", description: "Create wireframes, mockups, and design system", estimatedDuration: "3 weeks" },
    { id: "4", name: "Development Phase", description: "Implementation of core features and functionality", estimatedDuration: "6 weeks" },
    { id: "5", name: "Testing & QA", description: "Comprehensive testing and quality assurance", estimatedDuration: "2 weeks" },
    { id: "6", name: "Beta Testing", description: "User acceptance testing and feedback collection", estimatedDuration: "1 week" },
    { id: "7", name: "Launch Preparation", description: "Final preparations and deployment setup", estimatedDuration: "1 week" },
    { id: "8", name: "Go Live", description: "Official project launch and monitoring", estimatedDuration: "1 day" },
    { id: "9", name: "Post-Launch Review", description: "Project retrospective and documentation", estimatedDuration: "1 week" }
  ];

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
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
      name: `Project_Document_${uploadedDocuments.length + 1}.pdf`,
      type: 'pdf',
      size: '1.8 MB',
      uploadedAt: new Date()
    };
    setUploadedDocuments([...uploadedDocuments, mockFile]);
  };

  const removeDocument = (docId: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== docId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.template) {
      toast({
        title: "Missing Information",
        description: "Please fill in the project name and select a template.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Project Created!",
      description: `"${formData.name}" has been created successfully.`,
      variant: "default"
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="backdrop-blur-sm bg-gradient-to-l sticky top-0 z-50 from-primary/40 via-primary-glow/60 to-primary/80  shadow-2xl shadow-black/30 drop-shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/projects")} className="gap-2 text-white">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">Create New Project</h1>
          </div>
          <Button variant="default" onClick={handleSubmit} className="gap-2">
            <Save className="w-4 h-4" />
            Create Project
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Basics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter project name..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
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
                            {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Organization
                      </Label>
                      <Select value={formData.organization} onValueChange={(value) => setFormData({ ...formData, organization: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizations.map((org) => (
                            <SelectItem key={org.id} value={org.id}>
                              {org.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Privacy</Label>
                      <Select value={formData.privacy} onValueChange={(value) => setFormData({ ...formData, privacy: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public to organization</SelectItem>
                          <SelectItem value="team">Team members only</SelectItem>
                          <SelectItem value="private">Private to me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Project Color
                      </Label>
                      <div className="flex gap-2 flex-wrap">
                        {projectColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={cn(
                              "w-8 h-8 rounded-full border-2 transition-all",
                              formData.color === color ? "border-foreground scale-110" : "border-transparent"
                            )}
                            style={{ backgroundColor: color }}
                            onClick={() => setFormData({ ...formData, color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Template */}
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                        formData.template === template.id ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => setFormData({ ...formData, template: template.id })}
                    >
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Add Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={cn(
                          "flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                          selectedMembers.includes(member.id) ? "border-primary bg-primary/5" : "border-border"
                        )}
                        onClick={() => toggleMember(member.id)}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                        {selectedMembers.includes(member.id) && (
                          <Badge variant="secondary" className="text-xs">Selected</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Milestones Section */}
            <MilestoneManager
              milestones={milestones}
              onMilestonesChange={setMilestones}
            />

            {/* Project Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Project Documents
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
                  <h3 className="font-semibold mb-2">Upload Project Documents</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    Add initial project documents, requirements, or reference materials
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
                    Supports: PDF, DOC, XLS, IMG • Max 25MB per file
                  </p>
                </div>

                {/* Uploaded Documents */}
                {uploadedDocuments.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Uploaded Documents</h4>
                      <Badge variant="outline">{uploadedDocuments.length} files</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {uploadedDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border">
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

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button variant="default" type="submit" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;