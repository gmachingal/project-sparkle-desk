import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Mail, Lock, User, Globe, Phone, MapPin, ArrowRight, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [orgSearchQuery, setOrgSearchQuery] = useState("");
  const [organizationSizes, setOrganizationSizes] = useState<Array<{id: string, name: string}>>([]);
  const [industries, setIndustries] = useState<Array<{id: string, name: string}>>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch master data on component mount
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        // Fetch organization sizes
        const { data: sizesData, error: sizesError } = await supabase
          .from('organization_sizes')
          .select('id, name')
          .eq('is_active', true)
          .order('display_order');

        if (sizesError) throw sizesError;

        // Fetch industries
        const { data: industriesData, error: industriesError } = await supabase
          .from('industries')
          .select('id, name')
          .eq('is_active', true)
          .order('display_order');

        if (industriesError) throw industriesError;

        setOrganizationSizes(sizesData || []);
        setIndustries(industriesData || []);
      } catch (error) {
        console.error('Error fetching master data:', error);
        toast({
          title: "Error",
          description: "Failed to load form options. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, [toast]);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) {
        toast({
          title: "Registration Failed",
          description: authError.message,
          variant: "destructive"
        });
        return;
      }

      if (!authData.user) {
        toast({
          title: "Registration Failed",
          description: "Failed to create user account.",
          variant: "destructive"
        });
        return;
      }

      let organizationId: string | null = null;

      if (activeTab === "create") {
        // Create new organization
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: formData.orgName,
            description: formData.orgDescription,
            domain: formData.orgDomain,
            address: formData.address,
            organization_size_id: formData.orgSize || null,
            industry_id: formData.industry || null,
            join_code: Math.random().toString(36).substring(2, 8).toUpperCase()
          })
          .select()
          .single();

        if (orgError) {
          toast({
            title: "Organization Creation Failed",
            description: orgError.message,
            variant: "destructive"
          });
          return;
        }

        organizationId = orgData.id;

        // Assign admin role to the organization creator
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: 'admin',
            organization_id: organizationId
          });

        if (roleError) {
          console.error('Error assigning admin role:', roleError);
        }
      } else {
        // Join existing organization
        if (formData.joinCode) {
          // Find organization by join code
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('id')
            .eq('join_code', formData.joinCode)
            .single();

          if (orgError || !orgData) {
            toast({
              title: "Invalid Join Code",
              description: "The join code you entered is not valid.",
              variant: "destructive"
            });
            return;
          }

          organizationId = orgData.id;
        } else if (formData.selectedOrg) {
          organizationId = formData.selectedOrg;
        }

        if (organizationId) {
          // Assign member role to joining user
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: authData.user.id,
              role: 'member',
              organization_id: organizationId
            });

          if (roleError) {
            console.error('Error assigning member role:', roleError);
          }
        }
      }

      // Update user profile with organization and phone
      if (organizationId) {
        // First check if profile exists, if not create it
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', authData.user.id)
          .single();

        if (!existingProfile) {
          // Create profile if it doesn't exist
          const { error: createProfileError } = await supabase
            .from('profiles')
            .insert({
              user_id: authData.user.id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone: formData.phone,
              organization_id: organizationId
            });

          if (createProfileError) {
            console.error('Error creating profile:', createProfileError);
          }
        } else {
          // Update existing profile
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              phone: formData.phone,
              organization_id: organizationId
            })
            .eq('user_id', authData.user.id);

          if (profileError) {
            console.error('Error updating profile:', profileError);
          }
        }
      }

      toast({
        title: "Registration Successful!",
        description: activeTab === "create" 
          ? `Welcome! Your organization "${formData.orgName}" has been created.`
          : "Welcome! You've been added to the organization.",
        variant: "default"
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                            <Select 
                              value={formData.orgSize} 
                              onValueChange={(value) => setFormData({ ...formData, orgSize: value })}
                              disabled={loading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={loading ? "Loading..." : "Select size"} />
                              </SelectTrigger>
                              <SelectContent>
                                {organizationSizes.map((size) => (
                                  <SelectItem key={size.id} value={size.id}>
                                    {size.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Select 
                              value={formData.industry} 
                              onValueChange={(value) => setFormData({ ...formData, industry: value })}
                              disabled={loading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={loading ? "Loading..." : "Select industry"} />
                              </SelectTrigger>
                              <SelectContent>
                                {industries.map((industry) => (
                                  <SelectItem key={industry.id} value={industry.id}>
                                    {industry.name}
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
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            {orgSearchQuery && (
                              <span>
                                {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''} found
                              </span>
                            )}
                            {orgSearchQuery && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setOrgSearchQuery("")}
                                className="h-6 px-2 text-xs"
                              >
                                Clear search
                              </Button>
                            )}
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