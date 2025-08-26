import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  BookOpen, 
  Users, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Clock,
  Upload,
  Target,
  Calendar
} from "lucide-react";

interface CreateLearningProgramProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateLearningProgram = ({ onClose, onSuccess }: CreateLearningProgramProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Form state
  const [programData, setProgramData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    duration: "",
    level: "",
    capacity: "",
    departments: [] as string[],
    roles: [] as string[],
    courses: [] as any[],
    settings: {
      deadline: "",
      gracePeriod: "",
      autoAssign: false,
      managerNotifications: false,
      escalation: false,
      enrollmentPeriod: "",
      learningPoints: "",
      skillBadges: false,
      peerCollaboration: false,
      performanceReview: false,
      certificationBody: "",
      examCode: "",
      certificationCost: "",
      validityPeriod: "",
      companyFunded: false,
      expertMentoring: false,
      careerProgression: false
    }
  });

  const steps = [
    {
      id: 1,
      title: "Program Details",
      description: "Basic information about your learning program",
      icon: BookOpen,
      fields: ["title", "description", "category", "duration", "level", "capacity"]
    },
    {
      id: 2,
      title: "Course Type",
      description: "Configure delivery and requirements",
      icon: Settings,
      fields: ["type"]
    },
    {
      id: 3,
      title: "Target Audience",
      description: "Select departments and roles",
      icon: Users,
      fields: ["departments", "roles"]
    },
    {
      id: 4,
      title: "Curriculum",
      description: "Add courses and assessments",
      icon: Target,
      fields: ["courses"]
    }
  ];

  const departments = [
    { id: "engineering", name: "Engineering", members: 45 },
    { id: "design", name: "Design", members: 12 },
    { id: "product", name: "Product", members: 18 },
    { id: "marketing", name: "Marketing", members: 22 },
    { id: "sales", name: "Sales", members: 35 },
    { id: "hr", name: "Human Resources", members: 8 }
  ];

  const jobRoles = [
    "Software Engineer", "Team Lead", "Designer", "Product Manager", 
    "Data Analyst", "DevOps Engineer", "QA Engineer", "Marketing Specialist"
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!programData.title.trim()) newErrors.title = "Program name is required";
        if (!programData.description.trim()) newErrors.description = "Description is required";
        if (!programData.category) newErrors.category = "Category is required";
        if (!programData.duration) newErrors.duration = "Duration is required";
        if (!programData.level) newErrors.level = "Difficulty level is required";
        if (!programData.capacity.trim()) newErrors.capacity = "Max participants is required";
        break;
      case 2:
        if (!programData.type) newErrors.type = "Course type is required";
        break;
      case 3:
        if (programData.departments.length === 0) newErrors.departments = "Select at least one department";
        if (programData.roles.length === 0) newErrors.roles = "Select at least one role";
        break;
      case 4:
        if (programData.courses.length === 0) newErrors.courses = "Add at least one course";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      toast({
        title: "Learning Program Created! 🎉",
        description: `"${programData.title}" has been created successfully and is ready for enrollment.`,
      });
      onSuccess();
      onClose();
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Program Name *</Label>
                <Input
                  id="title"
                  value={programData.title}
                  onChange={(e) => setProgramData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Frontend Development Bootcamp"
                  className={`mt-1 ${errors.title ? 'border-destructive' : ''}`}
                />
                {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                <Select value={programData.category} onValueChange={(value) => setProgramData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className={`mt-1 ${errors.category ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="leadership">Leadership Development</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="compliance">Compliance Training</SelectItem>
                    <SelectItem value="onboarding">Employee Onboarding</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Program Description *</Label>
              <Textarea
                id="description"
                value={programData.description}
                onChange={(e) => setProgramData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the learning objectives, target audience, and expected outcomes..."
                rows={3}
                className={`mt-1 ${errors.description ? 'border-destructive' : ''}`}
              />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration" className="text-sm font-medium">Duration *</Label>
                <Select value={programData.duration} onValueChange={(value) => setProgramData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger className={`mt-1 ${errors.duration ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {errors.duration && <p className="text-xs text-destructive mt-1">{errors.duration}</p>}
              </div>
              
              <div>
                <Label htmlFor="level" className="text-sm font-medium">Difficulty Level *</Label>
                <Select value={programData.level} onValueChange={(value) => setProgramData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger className={`mt-1 ${errors.level ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && <p className="text-xs text-destructive mt-1">{errors.level}</p>}
              </div>
              
              <div>
                <Label htmlFor="capacity" className="text-sm font-medium">Max Participants *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={programData.capacity}
                  onChange={(e) => setProgramData(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="e.g., 50"
                  className={`mt-1 ${errors.capacity ? 'border-destructive' : ''}`}
                />
                {errors.capacity && <p className="text-xs text-destructive mt-1">{errors.capacity}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Course Type *</Label>
              <div className="grid gap-4">
                {[
                  {
                    id: "mandatory",
                    name: "Mandatory Training",
                    description: "Required for compliance and safety",
                    icon: AlertCircle,
                    color: "destructive"
                  },
                  {
                    id: "optional",
                    name: "Professional Development", 
                    description: "Self-paced learning for career growth",
                    icon: Star,
                    color: "primary"
                  },
                  {
                    id: "certification",
                    name: "Certification Track",
                    description: "Industry certification pathway",
                    icon: Award,
                    color: "warning"
                  }
                ].map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      programData.type === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setProgramData(prev => ({ ...prev, type: type.id }))}
                  >
                    <div className="flex items-start gap-3">
                      <type.icon className={`w-5 h-5 mt-0.5 text-${type.color}`} />
                      <div className="space-y-1">
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {programData.type === type.id && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.type && <p className="text-xs text-destructive mt-2">{errors.type}</p>}
            </div>

            {/* Type-specific settings */}
            {programData.type === "mandatory" && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Mandatory Training Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Completion Deadline</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm">Grace Period (days)</Label>
                      <Input type="number" placeholder="7" className="mt-1" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-assign" />
                      <label htmlFor="auto-assign" className="text-sm">Auto-assign to new employees</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="manager-notifications" />
                      <label htmlFor="manager-notifications" className="text-sm">Manager notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="escalation" />
                      <label htmlFor="escalation" className="text-sm">HR escalation after deadline</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Departments *</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`dept-${dept.id}`}
                        checked={programData.departments.includes(dept.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProgramData(prev => ({
                              ...prev,
                              departments: [...prev.departments, dept.id]
                            }));
                          } else {
                            setProgramData(prev => ({
                              ...prev,
                              departments: prev.departments.filter(d => d !== dept.id)
                            }));
                          }
                        }}
                      />
                      <label htmlFor={`dept-${dept.id}`} className="text-sm cursor-pointer flex-1">
                        {dept.name}
                        <span className="text-muted-foreground ml-1">({dept.members} members)</span>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.departments && <p className="text-xs text-destructive mt-1">{errors.departments}</p>}
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-3 block">Job Roles *</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                  {jobRoles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-${role}`}
                        checked={programData.roles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProgramData(prev => ({
                              ...prev,
                              roles: [...prev.roles, role]
                            }));
                          } else {
                            setProgramData(prev => ({
                              ...prev,
                              roles: prev.roles.filter(r => r !== role)
                            }));
                          }
                        }}
                      />
                      <label htmlFor={`role-${role}`} className="text-sm cursor-pointer">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.roles && <p className="text-xs text-destructive mt-1">{errors.roles}</p>}
              </div>
            </div>

            {/* Selection Summary */}
            {(programData.departments.length > 0 || programData.roles.length > 0) && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <h4 className="font-medium text-sm mb-2">Selection Summary</h4>
                  <div className="flex flex-wrap gap-2">
                    {programData.departments.map(deptId => {
                      const dept = departments.find(d => d.id === deptId);
                      return dept ? (
                        <Badge key={deptId} variant="secondary" className="text-xs">
                          {dept.name}
                        </Badge>
                      ) : null;
                    })}
                    {programData.roles.map(role => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Program Curriculum *</Label>
              
              {programData.courses.length === 0 ? (
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h4 className="font-medium mb-2">Add Courses to Program</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select existing courses or create new ones to build your program curriculum
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => {
                          // Mock adding a course
                          setProgramData(prev => ({
                            ...prev,
                            courses: [
                              ...prev.courses,
                              {
                                id: `course-${prev.courses.length + 1}`,
                                title: "Sample Course",
                                type: "video",
                                duration: "2 hours"
                              }
                            ]
                          }));
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Browse Library
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        Create Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {programData.courses.map((course, index) => (
                    <Card key={course.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{course.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {course.type} • {course.duration}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setProgramData(prev => ({
                                ...prev,
                                courses: prev.courses.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => {
                      // Mock adding another course
                      setProgramData(prev => ({
                        ...prev,
                        courses: [
                          ...prev.courses,
                          {
                            id: `course-${prev.courses.length + 1}`,
                            title: `Course ${prev.courses.length + 1}`,
                            type: "interactive",
                            duration: "3 hours"
                          }
                        ]
                      }));
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Course
                  </Button>
                </div>
              )}
              {errors.courses && <p className="text-xs text-destructive mt-2">{errors.courses}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Create Learning Program</h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        {/* Step Navigation */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${
                step.id === currentStep
                  ? "text-primary"
                  : step.id < currentStep
                  ? "text-success"
                  : "text-muted-foreground"
              }`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  step.id === currentStep
                    ? "border-primary bg-primary/10"
                    : step.id < currentStep
                    ? "border-success bg-success/10"
                    : "border-muted-foreground/30"
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    React.createElement(step.icon, { className: "w-4 h-4" })
                  )}
                </div>
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-2 ${
                  step.id < currentStep ? "bg-success" : "bg-muted-foreground/30"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t bg-muted/30 -mx-6 px-6 py-4 mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Cancel
          </Button>
          
          {currentStep === steps.length ? (
            <Button onClick={handleSubmit} className="gap-2 bg-primary hover:bg-primary/90">
              <CheckCircle className="w-4 h-4" />
              Create Program
            </Button>
          ) : (
            <Button onClick={nextStep} className="gap-2 bg-primary hover:bg-primary/90">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLearningProgram;