import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Users, Mail, Lock, User, Globe, Phone, MapPin, ArrowRight, ArrowLeft, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [flow, setFlow] = useState<"create" | "join" | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [orgSearchQuery, setOrgSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Organization Info (for creation)
    orgName: "",
    orgDescription: "",
    orgDomain: "",
    orgSize: "",
    industry: "",
    address: "",
    
    // Join Organization
    joinCode: "",
    selectedOrg: ""
  });

  const organizationSizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-1000", label: "201-1000 employees" },
    { value: "1000+", label: "1000+ employees" }
  ];

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "consulting", label: "Consulting" },
    { value: "other", label: "Other" }
  ];

  // Mock existing organizations for joining
  const existingOrganizations = [
    { id: "1", name: "TechCorp Inc", domain: "techcorp.com", members: 150, industry: "Technology" },
    { id: "2", name: "StartupHub", domain: "startuphub.io", members: 25, industry: "Technology" },
    { id: "3", name: "Global Solutions", domain: "globalsolutions.net", members: 500, industry: "Consulting" },
    { id: "4", name: "Innovation Labs", domain: "innovationlabs.org", members: 75, industry: "Technology" },
    { id: "5", name: "Healthcare Partners", domain: "healthcarepartners.com", members: 200, industry: "Healthcare" },
    { id: "6", name: "Finance Pro", domain: "financepro.com", members: 300, industry: "Finance" },
    { id: "7", name: "EduTech Solutions", domain: "edutech.edu", members: 120, industry: "Education" }
  ];

  // Filter organizations based on search query
  const filteredOrganizations = existingOrganizations.filter(org =>
    org.name.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
    org.domain.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
    org.industry.toLowerCase().includes(orgSearchQuery.toLowerCase())
  );

  // Wizard step configurations
  const createSteps = [
    { title: "Personal Info", description: "Tell us about yourself" },
    { title: "Organization Basic", description: "Basic organization details" },
    { title: "Organization Details", description: "Additional information" },
    { title: "Review", description: "Review and confirm" }
  ];

  const joinSteps = [
    { title: "Personal Info", description: "Tell us about yourself" },
    { title: "Select Organization", description: "Choose organization to join" },
    { title: "Review", description: "Review and confirm" }
  ];

  const steps = flow === "create" ? createSteps : joinSteps;
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  // Validation functions
  const validatePersonalInfo = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const validateOrganizationBasic = () => {
    if (!formData.orgName) {
      toast({
        title: "Organization Name Required",
        description: "Please provide an organization name.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateOrganizationSelection = () => {
    if (!formData.joinCode && !formData.selectedOrg) {
      toast({
        title: "Organization Required",
        description: "Please select an organization or enter a join code.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  // Navigation functions
  const nextStep = () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = validatePersonalInfo();
    } else if (flow === "create") {
      if (currentStep === 2) {
        isValid = validateOrganizationBasic();
      }
    } else if (flow === "join") {
      if (currentStep === 2) {
        isValid = validateOrganizationSelection();
      }
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToFlow = (selectedFlow: "create" | "join") => {
    setFlow(selectedFlow);
    setCurrentStep(1);
  };

  const backToFlowSelection = () => {
    setFlow(null);
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Successful!",
      description: flow === "create" 
        ? `Welcome! Your organization "${formData.orgName}" has been created.`
        : "Welcome! You've been added to the organization.",
      variant: "default"
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Flow selection screen
  if (!flow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Join <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">KubXlns</span></h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Create your organization or join an existing one to get started
              </p>
            </div>

            {/* Flow Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
                onClick={() => goToFlow("create")}
              >
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-primary/10 rounded-full w-20 h-20 mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-12 h-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Create Organization</h3>
                  <p className="text-muted-foreground mb-6">
                    Start fresh by creating a new organization and invite your team members to join.
                  </p>
                  <Button className="w-full group-hover:shadow-md">
                    Create Organization
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 group"
                onClick={() => goToFlow("join")}
              >
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-secondary/10 rounded-full w-20 h-20 mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                    <Users className="w-12 h-12 text-secondary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Join Organization</h3>
                  <p className="text-muted-foreground mb-6">
                    Join an existing organization using an invite code or by browsing available organizations.
                  </p>
                  <Button variant="secondary" className="w-full group-hover:shadow-md">
                    Join Organization
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Login Link */}
            <div className="text-center pt-8">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate("/login")}
                  className="p-0 h-auto text-primary"
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wizard screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {flow === "create" ? (
                  <Building2 className="w-8 h-8 text-primary" />
                ) : (
                  <Users className="w-8 h-8 text-secondary" />
                )}
              </div>
              <h1 className="text-3xl font-bold">
                {flow === "create" ? "Create Organization" : "Join Organization"}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {steps[currentStep - 1]?.description}
            </p>
          </div>

          {/* Progress Indicator */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={index} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 < currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : index + 1 === currentStep 
                        ? 'bg-primary/20 text-primary border-2 border-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1 < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-4 ${
                        index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="w-6 h-6" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Organization Basic Info (Create Flow) */}
              {flow === "create" && currentStep === 2 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="w-6 h-6" />
                      Organization Basic Information
                    </CardTitle>
                  </CardHeader>

                  <div>
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      placeholder="Your Company Name"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="orgDomain">Domain</Label>
                      <div className="relative mt-2">
                        <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="orgDomain"
                          placeholder="company.com"
                          className="pl-10"
                          value={formData.orgDomain}
                          onChange={(e) => setFormData({ ...formData, orgDomain: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="orgSize">Organization Size</Label>
                      <Select value={formData.orgSize} onValueChange={(value) => setFormData({ ...formData, orgSize: value })}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Organization Details (Create Flow) */}
              {flow === "create" && currentStep === 3 && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="w-6 h-6" />
                      Additional Organization Details
                    </CardTitle>
                  </CardHeader>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="123 Main St, City, State"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="orgDescription">Description</Label>
                    <Textarea
                      id="orgDescription"
                      placeholder="Tell us about your organization..."
                      rows={4}
                      value={formData.orgDescription}
                      onChange={(e) => setFormData({ ...formData, orgDescription: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Organization Selection (Join Flow) */}
              {flow === "join" && currentStep === 2 && (
                <div className="space-y-8">
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Users className="w-6 h-6" />
                      Select Organization
                    </CardTitle>
                  </CardHeader>

                  {/* Join Code Option */}
                  <div className="space-y-3">
                    <Label htmlFor="joinCode">Organization Join Code</Label>
                    <Input
                      id="joinCode"
                      placeholder="Enter 6-digit join code (e.g., ABC123)"
                      value={formData.joinCode}
                      onChange={(e) => setFormData({ ...formData, joinCode: e.target.value.toUpperCase() })}
                      maxLength={6}
                      className="font-mono text-center text-lg tracking-wider mt-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      If you have a join code from your organization admin, enter it above.
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                      OR
                    </div>
                  </div>

                  {/* Browse Organizations */}
                  <div className="space-y-4">
                    <Label>Browse Organizations</Label>
                    
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search organizations by name, domain, or industry..."
                        className="pl-10"
                        value={orgSearchQuery}
                        onChange={(e) => setOrgSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                      {!orgSearchQuery ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg font-medium mb-2">Search for Organizations</p>
                          <p className="text-sm">Enter organization name, domain, or industry to find organizations to join</p>
                        </div>
                      ) : filteredOrganizations.length > 0 ? (
                        filteredOrganizations.map((org) => (
                          <div
                            key={org.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              formData.selectedOrg === org.id ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            onClick={() => setFormData({ ...formData, selectedOrg: org.id })}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-medium">{org.name}</h4>
                                  {formData.selectedOrg === org.id && (
                                    <Badge variant="secondary" className="text-xs">Selected</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    {org.domain}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {org.members} members
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {org.industry}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">No organizations found matching "{orgSearchQuery}"</p>
                          <p className="text-xs mt-1">Try adjusting your search terms</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Review Step (Both Flows) */}
              {currentStep === totalSteps && (
                <div className="space-y-6">
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Check className="w-6 h-6" />
                      Review & Confirm
                    </CardTitle>
                  </CardHeader>

                  <div className="space-y-6">
                    {/* Personal Information Review */}
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Name:</span>
                            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          {formData.phone && (
                            <div>
                              <span className="text-sm text-muted-foreground">Phone:</span>
                              <p className="font-medium">{formData.phone}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Organization Information Review */}
                    {flow === "create" ? (
                      <Card className="bg-primary/5">
                        <CardHeader>
                          <CardTitle className="text-lg">Organization Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-muted-foreground">Organization Name:</span>
                              <p className="font-medium">{formData.orgName}</p>
                            </div>
                            {formData.orgDomain && (
                              <div>
                                <span className="text-sm text-muted-foreground">Domain:</span>
                                <p className="font-medium">{formData.orgDomain}</p>
                              </div>
                            )}
                            {formData.orgSize && (
                              <div>
                                <span className="text-sm text-muted-foreground">Size:</span>
                                <p className="font-medium">{organizationSizes.find(s => s.value === formData.orgSize)?.label}</p>
                              </div>
                            )}
                            {formData.industry && (
                              <div>
                                <span className="text-sm text-muted-foreground">Industry:</span>
                                <p className="font-medium">{industries.find(i => i.value === formData.industry)?.label}</p>
                              </div>
                            )}
                            {formData.address && (
                              <div className="md:col-span-2">
                                <span className="text-sm text-muted-foreground">Address:</span>
                                <p className="font-medium">{formData.address}</p>
                              </div>
                            )}
                            {formData.orgDescription && (
                              <div className="md:col-span-2">
                                <span className="text-sm text-muted-foreground">Description:</span>
                                <p className="font-medium">{formData.orgDescription}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-secondary/5">
                        <CardHeader>
                          <CardTitle className="text-lg">Organization Selection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {formData.joinCode ? (
                            <div>
                              <span className="text-sm text-muted-foreground">Join Code:</span>
                              <p className="font-medium font-mono text-lg">{formData.joinCode}</p>
                            </div>
                          ) : (
                            <div>
                              <span className="text-sm text-muted-foreground">Selected Organization:</span>
                              {formData.selectedOrg && (
                                <div className="mt-2">
                                  {(() => {
                                    const org = existingOrganizations.find(o => o.id === formData.selectedOrg);
                                    return org ? (
                                      <div className="p-3 bg-background rounded-lg border">
                                        <h4 className="font-medium">{org.name}</h4>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                          <span>{org.domain}</span>
                                          <span>{org.members} members</span>
                                          <Badge variant="outline" className="text-xs">{org.industry}</Badge>
                                        </div>
                                      </div>
                                    ) : null;
                                  })()}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={currentStep === 1 ? backToFlowSelection : prevStep}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {currentStep === 1 ? "Back to Selection" : "Previous"}
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 gap-2"
                    variant="hero"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 gap-2"
                    variant="hero"
                  >
                    {flow === "create" ? "Create Organization" : "Join Organization"}
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Login Link */}
              <div className="text-center pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="p-0 h-auto text-primary"
                  >
                    Sign in here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;