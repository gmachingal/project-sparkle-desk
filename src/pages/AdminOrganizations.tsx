import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, CreditCard, Settings, Plus, Edit, Trash2 } from "lucide-react";

const AdminOrganizations = () => {
  const [organizations, setOrganizations] = useState([
    {
      id: "ORG-001",
      name: "TechCorp Solutions",
      plan: "Enterprise",
      licenses: 50,
      usedLicenses: 37,
      monthlyFee: 2500,
      status: "Active",
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

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <Button variant="hero" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Organization Management</h1>
              <p className="text-muted-foreground">Manage organizations, licenses, and features</p>
            </div>
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
                      <SelectItem value="basic">Basic - $50/user/month</SelectItem>
                      <SelectItem value="professional">Professional - $50/user/month</SelectItem>
                      <SelectItem value="enterprise">Enterprise - $50/user/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="licenses">Number of Licenses</Label>
                  <Input id="licenses" type="number" placeholder="Enter license count" />
                </div>
                <Button className="w-full">Create Organization</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="features">Feature Management</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Total Organizations</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Total Licenses</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.reduce((sum, org) => sum + org.licenses, 0)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <p className="text-2xl font-bold">{organizations.reduce((sum, org) => sum + org.usedLicenses, 0)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Monthly Revenue</span>
                  </div>
                  <p className="text-2xl font-bold">${organizations.reduce((sum, org) => sum + org.monthlyFee, 0).toLocaleString()}</p>
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
                <CardTitle>License Management</CardTitle>
                <CardDescription>Manage licenses and billing for organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {organizations.map((org) => (
                    <Card key={org.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                          {org.name}
                          <Badge variant="outline">${org.monthlyFee}/month</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOrganizations;