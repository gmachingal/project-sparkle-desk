import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, CreditCard, Settings, Plus, Edit, Trash2, ArrowLeft, Globe, Crown, RefreshCw, Copy, Check, Clock, UserPlus, UserCheck, UserX, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminOrganizations = () => {
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState("ORG-001");
  const [organizations, setOrganizations] = useState([
    {
      id: "ORG-001",
      name: "TechCorp Solutions",
      plan: "Enterprise",
      licenses: 50,
      usedLicenses: 37,
      monthlyFee: 2500,
      status: "Active",
      domain: "techcorp.com",
      features: {
        projectManagement: true,
        timeTracking: true,
        analytics: true,
        apiAccess: false,
        integrations: true,
        support: true
      }
    },
    {
      id: "ORG-002", 
      name: "StartupXYZ",
      plan: "Professional",
      licenses: 25,
      usedLicenses: 18,
      monthlyFee: 1250,
      status: "Active",
      domain: "startupxyz.com",
      features: {
        projectManagement: true,
        timeTracking: true,
        analytics: false,
        apiAccess: false,
        integrations: false,
        support: false
      }
    },
    {
      id: "ORG-003",
      name: "Enterprise Corp",
      plan: "Basic",
      licenses: 10,
      usedLicenses: 8,
      monthlyFee: 500,
      status: "Suspended",
      domain: "enterprise-corp.com",
      features: {
        projectManagement: true,
        timeTracking: false,
        analytics: false,
        apiAccess: false,
        integrations: false,
        support: false
      }
    }
  ]);
  
  const [joinCodes, setJoinCodes] = useState([
    { id: "1", orgId: "ORG-001", code: "TECH24", createdBy: "admin@techcorp.com", createdAt: "2024-01-15", expiresAt: "2024-02-15", usageCount: 5, maxUsage: 10, isActive: true },
    { id: "2", orgId: "ORG-002", code: "START9", createdBy: "admin@startupxyz.com", createdAt: "2024-01-10", expiresAt: "2024-02-10", usageCount: 3, maxUsage: 5, isActive: true },
    { id: "3", orgId: "ORG-001", code: "TEAM22", createdBy: "admin@techcorp.com", createdAt: "2024-01-01", expiresAt: "2024-01-31", usageCount: 10, maxUsage: 10, isActive: false }
  ]);

  const [pendingRegistrations, setPendingRegistrations] = useState([
    {
      id: "REQ-001",
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@gmail.com",
      phone: "+1 (555) 123-4567",
      orgId: "ORG-001",
      orgName: "TechCorp Solutions",
      requestedAt: "2024-01-20T10:30:00Z",
      joinMethod: "browse", // "browse" or "code"
      joinCode: null,
      status: "pending"
    },
    {
      id: "REQ-002", 
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@outlook.com",
      phone: "+1 (555) 987-6543",
      orgId: "ORG-002",
      orgName: "StartupXYZ",
      requestedAt: "2024-01-19T14:15:00Z",
      joinMethod: "code",
      joinCode: "START9",
      status: "pending"
    },
    {
      id: "REQ-003",
      firstName: "Bob",
      lastName: "Wilson", 
      email: "bob.wilson@yahoo.com",
      phone: "+1 (555) 456-7890",
      orgId: "ORG-001",
      orgName: "TechCorp Solutions",
      requestedAt: "2024-01-18T09:45:00Z",
      joinMethod: "browse",
      joinCode: null,
      status: "pending"
    }
  ]);

  const [copiedCode, setCopiedCode] = useState("");

  const toggleFeature = (orgId: string, feature: string) => {
    setOrganizations(orgs => 
      orgs.map(org => 
        org.id === orgId 
          ? { ...org, features: { ...org.features, [feature]: !org.features[feature] }}
          : org
      )
    );
  };

  const updateLicenses = (orgId: string, newLicenseCount: number) => {
    setOrganizations(orgs =>
      orgs.map(org =>
        org.id === orgId 
          ? { ...org, licenses: newLicenseCount, monthlyFee: newLicenseCount * 50 }
          : org
      )
    );
  };

  const updateOrganizationPlan = (orgId: string, newPlan: string) => {
    const planPricing = {
      "Basic": 25,
      "Professional": 50,
      "Enterprise": 75
    };
    
    setOrganizations(orgs =>
      orgs.map(org =>
        org.id === orgId 
          ? { 
              ...org, 
              plan: newPlan, 
              monthlyFee: org.licenses * (planPricing[newPlan as keyof typeof planPricing] || 50)
            }
          : org
      )
    );
    toast({
      title: "Plan Updated",
      description: `Organization plan changed to ${newPlan}`,
    });
  };

  const switchToOrganization = (orgId: string) => {
    setSelectedOrganization(orgId);
    toast({
      title: "Organization Switched",
      description: `Now managing ${organizations.find(org => org.id === orgId)?.name}`,
    });
  };

  const generateJoinCode = (orgId: string) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newJoinCode = {
      id: Date.now().toString(),
      orgId,
      code,
      createdBy: "admin@repose.com",
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
      usageCount: 0,
      maxUsage: 10,
      isActive: true
    };
    
    setJoinCodes(prev => [...prev, newJoinCode]);
    toast({
      title: "Join Code Generated",
      description: `New join code "${code}" created for organization.`,
    });
  };

  const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
    toast({
      title: "Copied!",
      description: "Join code copied to clipboard.",
    });
  };

  const deactivateJoinCode = (codeId: string) => {
    setJoinCodes(prev => 
      prev.map(code => 
        code.id === codeId ? { ...code, isActive: false } : code
      )
    );
    toast({
      title: "Join Code Deactivated",
      description: "The join code has been deactivated.",
    });
  };

  const approveRegistration = (requestId: string) => {
    setPendingRegistrations(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "approved" } : req
      )
    );
    toast({
      title: "Registration Approved",
      description: "User has been approved and can now access the organization.",
    });
  };

  const rejectRegistration = (requestId: string) => {
    setPendingRegistrations(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "rejected" } : req
      )
    );
    toast({
      title: "Registration Rejected",
      description: "User registration has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Organization Management</h1>
              <p className="text-muted-foreground">Manage organizations, licenses, and features</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="org-switcher" className="text-sm font-medium">Current Organization:</Label>
              <Select value={selectedOrganization} onValueChange={switchToOrganization}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {org.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Organization
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Organization</DialogTitle>
                  <DialogDescription>Add a new organization to the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" placeholder="Enter organization name" />
                  </div>
                  <div>
                    <Label htmlFor="plan">Plan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - $25/user/month</SelectItem>
                        <SelectItem value="professional">Professional - $50/user/month</SelectItem>
                        <SelectItem value="enterprise">Enterprise - $75/user/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="licenses">Number of Licenses</Label>
                    <Input id="licenses" type="number" placeholder="Enter license count" />
                  </div>
                  <div>
                    <Label htmlFor="domain">Domain Name</Label>
                    <Input id="domain" placeholder="Enter domain (e.g., company.com)" />
                  </div>
                  <Button className="w-full">Create Organization</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="features">Feature Management</TabsTrigger>
            <TabsTrigger value="billing">Plans & Billing</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="join-codes">Join Codes</TabsTrigger>
            <TabsTrigger value="registrations">Registration Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Total Organizations</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.length}</p>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Total Licenses</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.reduce((sum, org) => sum + org.licenses, 0)}</p>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.reduce((sum, org) => sum + org.usedLicenses, 0)}</p>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Monthly Revenue</span>
                  </div>
                  <p className="text-2xl font-bold">${organizations.reduce((sum, org) => sum + org.monthlyFee, 0).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">+22% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organization Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Organization Growth</CardTitle>
                  <CardDescription>Monthly organization registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">January</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-12 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">3</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">February</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">4</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">March</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-10 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">April</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-20 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* License Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle>License Utilization</CardTitle>
                  <CardDescription>Usage across all organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {organizations.map((org) => {
                      const utilizationPercent = (org.usedLicenses / org.licenses) * 100;
                      return (
                        <div key={org.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{org.name}</span>
                            <span className="text-muted-foreground">
                              {org.usedLicenses}/{org.licenses} ({utilizationPercent.toFixed(0)}%)
                            </span>
                          </div>
                          <Progress value={utilizationPercent} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Plan</CardTitle>
                  <CardDescription>Monthly revenue distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Enterprise", "Professional", "Basic"].map((plan, index) => {
                      const orgsInPlan = organizations.filter(org => org.plan === plan);
                      const revenue = orgsInPlan.reduce((sum, org) => sum + org.monthlyFee, 0);
                      const totalRevenue = organizations.reduce((sum, org) => sum + org.monthlyFee, 0);
                      const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
                      
                      return (
                        <div key={plan} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-blue-500' : 'bg-green-500'
                            }`} />
                            <span className="text-sm font-medium">{plan}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${revenue.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New organization created</p>
                        <p className="text-xs text-muted-foreground">TechCorp Solutions joined</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">License upgrade</p>
                        <p className="text-xs text-muted-foreground">StartupXYZ upgraded to Professional</p>
                      </div>
                      <span className="text-xs text-muted-foreground">4h ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Feature enabled</p>
                        <p className="text-xs text-muted-foreground">API Access activated for Enterprise Corp</p>
                      </div>
                      <span className="text-xs text-muted-foreground">6h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="organizations">
            <Card>
              <CardHeader>
                <CardTitle>Organizations</CardTitle>
                <CardDescription>Manage all organizations and their settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Licenses</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Monthly Fee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organizations.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{org.name}</p>
                            <p className="text-sm text-muted-foreground">{org.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{org.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            {org.domain || "Not set"}
                          </div>
                        </TableCell>
                        <TableCell>{org.licenses}</TableCell>
                        <TableCell>{org.usedLicenses}/{org.licenses}</TableCell>
                        <TableCell>
                          <Badge variant={org.status === "Active" ? "default" : "destructive"}>
                            {org.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${org.monthlyFee}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Management</CardTitle>
                <CardDescription>Control which features are available for each organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {organizations.map((org) => (
                    <Card key={org.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{org.name}</CardTitle>
                        <CardDescription>{org.plan} Plan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-pm`}>Project Management</Label>
                            <Switch
                              id={`${org.id}-pm`}
                              checked={org.features.projectManagement}
                              onCheckedChange={() => toggleFeature(org.id, "projectManagement")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-tt`}>Time Tracking</Label>
                            <Switch
                              id={`${org.id}-tt`}
                              checked={org.features.timeTracking}
                              onCheckedChange={() => toggleFeature(org.id, "timeTracking")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-analytics`}>Advanced Analytics</Label>
                            <Switch
                              id={`${org.id}-analytics`}
                              checked={org.features.analytics}
                              onCheckedChange={() => toggleFeature(org.id, "analytics")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-api`}>API Access</Label>
                            <Switch
                              id={`${org.id}-api`}
                              checked={org.features.apiAccess}
                              onCheckedChange={() => toggleFeature(org.id, "apiAccess")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-integrations`}>Custom Integrations</Label>
                            <Switch
                              id={`${org.id}-integrations`}
                              checked={org.features.integrations}
                              onCheckedChange={() => toggleFeature(org.id, "integrations")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${org.id}-support`}>Priority Support</Label>
                            <Switch
                              id={`${org.id}-support`}
                              checked={org.features.support}
                              onCheckedChange={() => toggleFeature(org.id, "support")}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Plans & Billing Management</CardTitle>
                <CardDescription>Manage subscription plans, licenses, and billing for organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {organizations.map((org) => (
                    <Card key={org.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {org.name}
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Crown className="h-3 w-3" />
                              {org.plan}
                            </Badge>
                          </div>
                          <Badge variant="outline">${org.monthlyFee}/month</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <div>
                            <Label htmlFor={`${org.id}-plan`}>Subscription Plan</Label>
                            <Select 
                              value={org.plan} 
                              onValueChange={(value) => updateOrganizationPlan(org.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Basic">Basic - $25/user/month</SelectItem>
                                <SelectItem value="Professional">Professional - $50/user/month</SelectItem>
                                <SelectItem value="Enterprise">Enterprise - $75/user/month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor={`${org.id}-licenses`}>License Count</Label>
                            <Input
                              id={`${org.id}-licenses`}
                              type="number"
                              value={org.licenses}
                              onChange={(e) => updateLicenses(org.id, parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div>
                            <Label>Current Usage</Label>
                            <p className="text-sm text-muted-foreground">
                              {org.usedLicenses} of {org.licenses} licenses used
                            </p>
                          </div>
                          <Button variant="outline">Update Billing</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Create and edit users with organization assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Organization Users</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New User</DialogTitle>
                          <DialogDescription>Add a new user and assign them to an organization</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="userName">Full Name</Label>
                              <Input id="userName" placeholder="Enter full name" />
                            </div>
                            <div>
                              <Label htmlFor="userEmail">Email</Label>
                              <Input id="userEmail" type="email" placeholder="Enter email" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="userOrg">Organization</Label>
                              <Select>
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
                            <div>
                              <Label htmlFor="userRole">Role</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="manager">Manager</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button className="w-full">Create User</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">john@techcorp.com</p>
                          </div>
                        </TableCell>
                        <TableCell>TechCorp Solutions</TableCell>
                        <TableCell><Badge variant="outline">Admin</Badge></TableCell>
                        <TableCell><Badge variant="default">Active</Badge></TableCell>
                        <TableCell>2 hours ago</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit User</DialogTitle>
                                  <DialogDescription>Update user information and organization assignment</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="editUserName">Full Name</Label>
                                      <Input id="editUserName" defaultValue="John Doe" />
                                    </div>
                                    <div>
                                      <Label htmlFor="editUserEmail">Email</Label>
                                      <Input id="editUserEmail" type="email" defaultValue="john@techcorp.com" />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="editUserOrg">Organization</Label>
                                      <Select defaultValue="ORG-001">
                                        <SelectTrigger>
                                          <SelectValue />
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
                                    <div>
                                      <Label htmlFor="editUserRole">Role</Label>
                                      <Select defaultValue="admin">
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="admin">Admin</SelectItem>
                                          <SelectItem value="manager">Manager</SelectItem>
                                          <SelectItem value="user">User</SelectItem>
                                          <SelectItem value="viewer">Viewer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <Button className="w-full">Update User</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="join-codes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Join Code Management
                </CardTitle>
                <CardDescription>Generate and manage organization join codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Active Join Codes</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="w-4 h-4" />
                          Generate Join Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Generate Join Code</DialogTitle>
                          <DialogDescription>Create a new join code for an organization</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="joinCodeOrg">Organization</Label>
                            <Select>
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
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="maxUsage">Max Usage</Label>
                              <Input id="maxUsage" type="number" defaultValue="10" min="1" max="100" />
                            </div>
                            <div>
                              <Label htmlFor="expiryDays">Expires in (days)</Label>
                              <Input id="expiryDays" type="number" defaultValue="30" min="1" max="365" />
                            </div>
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => generateJoinCode(selectedOrganization)}
                          >
                            Generate Code
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {joinCodes.map((code) => {
                        const org = organizations.find(o => o.id === code.orgId);
                        const isExpired = new Date(code.expiresAt) < new Date();
                        const isFullyUsed = code.usageCount >= code.maxUsage;
                        
                        return (
                          <TableRow key={code.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-medium">{code.code}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyJoinCode(code.code)}
                                  className="h-6 w-6 p-0"
                                >
                                  {copiedCode === code.code ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{org?.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{code.createdBy}</TableCell>
                            <TableCell className="text-sm">{code.createdAt}</TableCell>
                            <TableCell className="text-sm">{code.expiresAt}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{code.usageCount}/{code.maxUsage}</span>
                                <Progress 
                                  value={(code.usageCount / code.maxUsage) * 100} 
                                  className="w-16 h-1" 
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                !code.isActive ? "destructive" :
                                isExpired ? "secondary" :
                                isFullyUsed ? "outline" : "default"
                              }>
                                {!code.isActive ? "Deactivated" :
                                 isExpired ? "Expired" :
                                 isFullyUsed ? "Full" : "Active"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {code.isActive && !isExpired && !isFullyUsed && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => deactivateJoinCode(code.id)}
                                  >
                                    <Clock className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Registration Requests
                </CardTitle>
                <CardDescription>Review and approve pending registration requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-orange-200 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {pendingRegistrations.filter(req => req.status === "pending").length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Approved</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {pendingRegistrations.filter(req => req.status === "approved").length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <UserX className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium">Rejected</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">
                          {pendingRegistrations.filter(req => req.status === "rejected").length}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Join Method</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRegistrations.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.firstName} {request.lastName}</p>
                              <p className="text-sm text-muted-foreground">{request.email}</p>
                              {request.phone && (
                                <p className="text-xs text-muted-foreground">{request.phone}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              {request.orgName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {request.joinMethod === "code" ? (
                                <>
                                  <Key className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">Code: {request.joinCode}</span>
                                </>
                              ) : (
                                <>
                                  <Globe className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">Browse</span>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              request.status === "pending" ? "outline" :
                              request.status === "approved" ? "default" : "destructive"
                            }>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {request.status === "pending" && (
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => approveRegistration(request.id)}
                                  className="gap-1"
                                >
                                  <UserCheck className="w-3 h-3" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => rejectRegistration(request.id)}
                                  className="gap-1"
                                >
                                  <UserX className="w-3 h-3" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOrganizations;