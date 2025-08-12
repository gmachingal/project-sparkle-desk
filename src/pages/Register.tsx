import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Mail, Lock, User, Globe, Phone, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
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
    { id: "4", name: "Innovation Labs", domain: "innovationlabs.org", members: 75, industry: "Technology" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === "create" && !formData.orgName) {
      toast({
        title: "Organization Required",
        description: "Please provide organization details.",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === "join" && !formData.joinCode && !formData.selectedOrg) {
      toast({
        title: "Organization Required",
        description: "Please select an organization or enter a join code.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Registration Successful!",
      description: activeTab === "create" 
        ? `Welcome! Your organization "${formData.orgName}" has been created.`
        : "Welcome! You've been added to the organization.",
      variant: "default"
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Join Repose</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Create your organization or join an existing one to get started
            </p>
          </div>

          {/* Registration Tabs */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create" className="gap-2">
                    <Building2 className="w-4 h-4" />
                    Create Organization
                  </TabsTrigger>
                  <TabsTrigger value="join" className="gap-2">
                    <Users className="w-4 h-4" />
                    Join Organization
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information - Common for both tabs */}
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@company.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tab Content */}
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="create" className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Building2 className="w-5 h-5" />
                          Organization Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="orgName">Organization Name *</Label>
                            <Input
                              id="orgName"
                              placeholder="Your Company Name"
                              value={formData.orgName}
                              onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="orgDomain">Domain</Label>
                            <div className="relative">
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
                              <SelectTrigger>
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

                          <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                              <SelectTrigger>
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

                          <div>
                            <Label htmlFor="address">Address</Label>
                            <div className="relative">
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
                        </div>

                        <div>
                          <Label htmlFor="orgDescription">Description</Label>
                          <Textarea
                            id="orgDescription"
                            placeholder="Tell us about your organization..."
                            rows={3}
                            value={formData.orgDescription}
                            onChange={(e) => setFormData({ ...formData, orgDescription: e.target.value })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="join" className="space-y-6">
                    <Card className="bg-secondary/5 border-secondary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="w-5 h-5" />
                          Join Organization
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Join Code Option */}
                        <div className="space-y-3">
                          <Label htmlFor="joinCode">Organization Join Code</Label>
                          <Input
                            id="joinCode"
                            placeholder="Enter 6-digit join code (e.g., ABC123)"
                            value={formData.joinCode}
                            onChange={(e) => setFormData({ ...formData, joinCode: e.target.value.toUpperCase() })}
                            maxLength={6}
                            className="font-mono text-center text-lg tracking-wider"
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
                        <div className="space-y-3">
                          <Label>Browse Organizations</Label>
                          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                            {existingOrganizations.map((org) => (
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
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Select an organization to request to join. Your request will be sent to the organization admin.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Button>
                  <Button type="submit" className="flex-1 gap-2" variant="hero">
                    {activeTab === "create" ? "Create Organization" : "Join Organization"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4 border-t">
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
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;