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
import { Building2, Users, CreditCard, Settings, Plus, Edit, Trash2, ArrowLeft, Globe, Crown, RefreshCw } from "lucide-react";
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOrganizations;