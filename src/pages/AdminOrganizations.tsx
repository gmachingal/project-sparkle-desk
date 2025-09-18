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
import { Textarea } from "@/components/ui/textarea";
import { Building2, Users, CreditCard, Settings, Plus, Edit, Trash2, ArrowLeft, Globe, Crown, RefreshCw, Copy, Check, Clock, UserPlus, UserCheck, UserX, Key, DollarSign, Calendar, AlertTriangle, TrendingUp, Shield, Target, ShieldCheck, User, MoreHorizontal, BookOpen, GraduationCap, Star, Award, Search, Upload, Video, Zap, Code, MoreVertical, Eye, FileText } from "lucide-react";
import BrowseLearning from "@/components/learning/BrowseLearning";
import ViewAllCertificates from "@/components/learning/ViewAllCertificates";
import CreateLearningProgram from "@/components/CreateLearningProgram";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminOrganizations = () => {
  const navigate = useNavigate();
  const [selectedOrganization, setSelectedOrganization] = useState("ORG-001");
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);
  const [selectedOrgForBilling, setSelectedOrgForBilling] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isEditDepartmentOpen, setIsEditDepartmentOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  
  // Learning Management Dialog States
  const [isBrowseLibraryOpen, setIsBrowseLibraryOpen] = useState(false);
  const [isViewCertificatesOpen, setIsViewCertificatesOpen] = useState(false);
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isCertificateDetailOpen, setIsCertificateDetailOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  
  // Form states
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    organization: "",
    skills: "",
    permissions: [] as string[]
  });

  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    description: "",
    managerId: "",
    budget: "",
    location: ""
  });
  
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
      billingCycle: "monthly",
      nextBillingDate: "2024-02-15",
      paymentMethod: "**** 4532",
      billingEmail: "billing@techcorp.com",
      address: "123 Tech Street, San Francisco, CA 94105",
      taxId: "TAX-123456789",
      discount: 10,
      customPricing: false,
      contractEndDate: "2024-12-31",
      autoRenewal: true,
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
      billingCycle: "monthly",
      nextBillingDate: "2024-02-20",
      paymentMethod: "**** 8765",
      billingEmail: "admin@startupxyz.com",
      address: "456 Startup Ave, Austin, TX 78701",
      taxId: "TAX-987654321",
      discount: 0,
      customPricing: false,
      contractEndDate: "2024-06-30",
      autoRenewal: true,
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
      billingCycle: "monthly",
      nextBillingDate: "2024-02-10",
      paymentMethod: "**** 1234",
      billingEmail: "finance@enterprise-corp.com",
      address: "789 Enterprise Blvd, New York, NY 10001",
      taxId: "TAX-456789123",
      discount: 0,
      customPricing: true,
      contractEndDate: "2024-03-31",
      autoRenewal: false,
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

  // Billing form state
  const [billingFormData, setBillingFormData] = useState({
    plan: "",
    licenses: 0,
    billingCycle: "monthly",
    billingEmail: "",
    address: "",
    taxId: "",
    discount: 0,
    customPricing: false,
    autoRenewal: true,
    paymentMethod: ""
  });
  
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

  // Role and permission definitions
  const systemRoles = [
    { value: "admin", label: "Admin", icon: Crown, color: "text-yellow-500" },
    { value: "manager", label: "Manager", icon: ShieldCheck, color: "text-blue-500" },
    { value: "user", label: "User", icon: UserCheck, color: "text-green-500" },
    { value: "viewer", label: "Viewer", icon: Shield, color: "text-gray-500" }
  ];

  const rolePermissions = {
    admin: ["admin", "create_projects", "manage_team", "view_analytics", "delete_projects"],
    manager: ["create_projects", "manage_team", "view_analytics"],
    user: ["create_projects"],
    viewer: ["view_analytics"]
  };

  // Sample departments data
  const [departments, setDepartments] = useState([
    {
      id: "1",
      name: "Engineering",
      description: "Software development and technical architecture",
      orgId: "ORG-001",
      members: 12,
      lead: "Alex Johnson",
      leadId: "1",
      budget: 500000,
      location: "Building A, Floor 3"
    },
    {
      id: "2", 
      name: "Design",
      description: "UI/UX design and creative direction",
      orgId: "ORG-001",
      members: 5,
      lead: "Sarah Chen",
      leadId: "2",
      budget: 300000,
      location: "Building A, Floor 2"
    },
    {
      id: "3",
      name: "Marketing",
      description: "Brand management and customer acquisition", 
      orgId: "ORG-002",
      members: 8,
      lead: "Emily Davis",
      leadId: "4",
      budget: 400000,
      location: "Building B, Floor 1"
    }
  ]);

  // Users data
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@techcorp.com",
      role: "admin",
      department: "Engineering",
      orgId: "ORG-001",
      status: "active",
      joinDate: "2023-01-15"
    },
    {
      id: "2", 
      name: "Sarah Chen",
      email: "sarah@techcorp.com",
      role: "manager",
      department: "Design",
      orgId: "ORG-001",
      status: "active",
      joinDate: "2023-03-10"
    }
  ]);

  // Handler functions
  const handleAddUser = () => {
    if (!userFormData.name || !userFormData.email || !userFormData.role || !userFormData.department || !userFormData.organization) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: userFormData.name,
      email: userFormData.email,
      role: userFormData.role,
      department: userFormData.department,
      orgId: userFormData.organization,
      status: "active",
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };

    setUsers([...users, newUser]);
    setUserFormData({
      name: "",
      email: "",
      role: "",
      department: "",
      organization: "",
      skills: "",
      permissions: []
    });
    setIsAddUserOpen(false);
    toast({
      title: "Success",
      description: "User added successfully"
    });
  };

  const handleAddDepartment = () => {
    if (!departmentFormData.name || !departmentFormData.managerId) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const manager = users.find(u => u.id === departmentFormData.managerId);
    const newDepartment = {
      id: Date.now().toString(),
      name: departmentFormData.name,
      description: departmentFormData.description,
      orgId: selectedOrganization,
      members: 0,
      lead: manager?.name || "",
      leadId: departmentFormData.managerId,
      budget: parseInt(departmentFormData.budget) || 0,
      location: departmentFormData.location
    };

    setDepartments([...departments, newDepartment]);
    setDepartmentFormData({ name: "", description: "", managerId: "", budget: "", location: "" });
    setIsAddDepartmentOpen(false);
    toast({
      title: "Success",
      description: "Department created successfully"
    });
  };

  const getOrgDepartments = (orgId: string) => {
    return departments.filter(dept => dept.orgId === orgId);
  };

  const getOrgUsers = (orgId: string) => {
    return users.filter(user => user.orgId === orgId);
  };

  const openBillingDialog = (org: any) => {
    setSelectedOrgForBilling(org);
    setBillingFormData({
      plan: org.plan,
      licenses: org.licenses,
      billingCycle: org.billingCycle || "monthly",
      billingEmail: org.billingEmail || "",
      address: org.address || "",
      taxId: org.taxId || "",
      discount: org.discount || 0,
      customPricing: org.customPricing || false,
      autoRenewal: org.autoRenewal || true,
      paymentMethod: org.paymentMethod || ""
    });
    setIsBillingDialogOpen(true);
  };

  const updateBillingInfo = () => {
    if (!selectedOrgForBilling) return;

    const planPricing = {
      "Basic": 25,
      "Professional": 50,
      "Enterprise": 75
    };

    const basePrice = billingFormData.licenses * (planPricing[billingFormData.plan as keyof typeof planPricing] || 50);
    const discountAmount = (basePrice * billingFormData.discount) / 100;
    const finalPrice = billingFormData.billingCycle === "annual" 
      ? (basePrice - discountAmount) * 10 // 2 months free for annual
      : basePrice - discountAmount;

    setOrganizations(orgs =>
      orgs.map(org =>
        org.id === selectedOrgForBilling.id
          ? {
              ...org,
              plan: billingFormData.plan,
              licenses: billingFormData.licenses,
              monthlyFee: finalPrice,
              billingCycle: billingFormData.billingCycle,
              billingEmail: billingFormData.billingEmail,
              address: billingFormData.address,
              taxId: billingFormData.taxId,
              discount: billingFormData.discount,
              customPricing: billingFormData.customPricing,
              autoRenewal: billingFormData.autoRenewal,
              paymentMethod: billingFormData.paymentMethod
            }
          : org
      )
    );

    setIsBillingDialogOpen(false);
    setSelectedOrgForBilling(null);
    toast({
      title: "Billing Updated",
      description: "Organization billing information has been updated successfully.",
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
      createdBy: "admin@kubxlns.com",
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
      <div className="sticky top-0 z-50 border-b backdrop-blur-sm bg-gradient-to-r from-admin/80 via-admin-glow/85 to-admin/90 shadow-2xl shadow-black/30 drop-shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Organization Management</h1>
              <p className="font-bold text-white/90">Manage organizations, licenses, and features</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
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
                <Button className="flex items-center gap-2 bg-gradient-to-r from-admin to-admin-glow">
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
                  <Button className="w-full bg-gradient-to-r from-admin to-admin-glow">Create Organization</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 pt-8 space-y-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="rounded-t-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Overview</TabsTrigger>
            <TabsTrigger value="organizations" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Organizations</TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Feature Management</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Plans & Billing</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">User Management</TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Departments</TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Learning Management</TabsTrigger>
            <TabsTrigger value="join-codes" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Join Codes</TabsTrigger>
            <TabsTrigger value="registrations" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin text-admin/70 hover:text-admin">Registration Requests</TabsTrigger>
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
                            <Button variant="outline" size="sm" className="border-admin/30 hover:bg-admin/10 hover:text-admin">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-admin/30 hover:bg-admin/10 hover:text-admin">
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
                              <SelectContent className="bg-background z-50">
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
                          <Button 
                            onClick={() => openBillingDialog(org)}
                            className="gap-2"
                          >
                            <Settings className="w-4 h-4" />
                            Manage Billing
                          </Button>
                        </div>
                        
                        {/* Billing Information Display */}
                        <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-muted-foreground">Billing Cycle</Label>
                              <p className="font-medium capitalize">{org.billingCycle || 'Monthly'}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Next Billing</Label>
                              <p className="font-medium">{org.nextBillingDate || 'N/A'}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Payment Method</Label>
                              <p className="font-medium">{org.paymentMethod || 'Not set'}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Billing Email</Label>
                              <p className="font-medium">{org.billingEmail || 'Not set'}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Auto Renewal</Label>
                              <p className="font-medium">{org.autoRenewal ? 'Enabled' : 'Disabled'}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Discount</Label>
                              <p className="font-medium">{org.discount || 0}%</p>
                            </div>
                          </div>
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
                    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 bg-gradient-to-r from-admin to-admin-glow">
                          <UserPlus className="h-4 w-4" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>Add a new user and assign them to the organization</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="userName">Full Name *</Label>
                              <Input
                                id="userName"
                                value={userFormData.name}
                                onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="userEmail">Email *</Label>
                              <Input
                                id="userEmail"
                                type="email"
                                value={userFormData.email}
                                onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                                placeholder="Enter email address"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="userRole">System Role *</Label>
                              <Select value={userFormData.role} onValueChange={(value) => {
                                setUserFormData({
                                  ...userFormData, 
                                  role: value,
                                  permissions: rolePermissions[value as keyof typeof rolePermissions] || []
                                });
                              }}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {systemRoles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                      <SelectItem key={role.value} value={role.value}>
                                        <div className="flex items-center gap-2">
                                          <Icon className={`w-4 h-4 ${role.color}`} />
                                          {role.label}
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="userDept">Department *</Label>
                              <Select value={userFormData.department} onValueChange={(value) => setUserFormData({...userFormData, department: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOrgDepartments(selectedOrganization).map((dept) => (
                                    <SelectItem key={dept.id} value={dept.name}>
                                      {dept.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="userOrg">Organization *</Label>
                            <Select value={userFormData.organization || selectedOrganization} onValueChange={(value) => setUserFormData({...userFormData, organization: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization" />
                              </SelectTrigger>
                              <SelectContent>
                                {organizations.map((org) => (
                                  <SelectItem key={org.id} value={org.id}>
                                    <div className="flex items-center gap-2">
                                      <Building2 className="w-4 h-4" />
                                      {org.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="userSkills">Skills (comma-separated)</Label>
                            <Input
                              id="userSkills"
                              value={userFormData.skills}
                              onChange={(e) => setUserFormData({...userFormData, skills: e.target.value})}
                              placeholder="React, TypeScript, Node.js"
                            />
                          </div>

                          <div>
                            <Label>Permissions</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {Object.entries(rolePermissions).map(([role, perms]) => (
                                <div key={role} className="text-sm">
                                  <strong className="capitalize">{role}:</strong> {perms.join(", ")}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="border-admin/30 hover:bg-admin/10 hover:text-admin">
                              Cancel
                            </Button>
                            <Button onClick={handleAddUser} className="bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                              Add User
                            </Button>
                          </div>
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
                                <Button variant="outline" size="sm" className="hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
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
                                  <Button className="w-full bg-gradient-to-r from-admin to-admin-glow">Update User</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" className="hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
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

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Department Management
                </CardTitle>
                <CardDescription>Manage departments within organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Departments</h3>
                    <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                          <Plus className="h-4 w-4" />
                          Add Department
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Department</DialogTitle>
                          <DialogDescription>Create a new department for the organization</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="deptName">Department Name *</Label>
                            <Input
                              id="deptName"
                              value={departmentFormData.name}
                              onChange={(e) => setDepartmentFormData({...departmentFormData, name: e.target.value})}
                              placeholder="Enter department name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="deptDesc">Description</Label>
                            <Textarea
                              id="deptDesc"
                              value={departmentFormData.description}
                              onChange={(e) => setDepartmentFormData({...departmentFormData, description: e.target.value})}
                              placeholder="Department description"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="deptManager">Department Manager *</Label>
                              <Select value={departmentFormData.managerId} onValueChange={(value) => setDepartmentFormData({...departmentFormData, managerId: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select manager" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOrgUsers(selectedOrganization).filter(user => user.role !== 'viewer').map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                      <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {user.name}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="deptBudget">Budget</Label>
                              <Input
                                id="deptBudget"
                                type="number"
                                value={departmentFormData.budget}
                                onChange={(e) => setDepartmentFormData({...departmentFormData, budget: e.target.value})}
                                placeholder="Annual budget"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="deptLocation">Location</Label>
                            <Input
                              id="deptLocation"
                              value={departmentFormData.location}
                              onChange={(e) => setDepartmentFormData({...departmentFormData, location: e.target.value})}
                              placeholder="Office location"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)} className="border-admin/30 hover:bg-admin/10 hover:text-admin">
                              Cancel
                            </Button>
                            <Button onClick={handleAddDepartment} className="bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                              Create Department
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getOrgDepartments(selectedOrganization).map((dept) => (
                      <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{dept.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{dept.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="hover:bg-admin/10 hover:text-admin">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{dept.lead}</span>
                            <Badge variant="outline" className="text-xs">Manager</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{dept.members} members</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span>${dept.budget.toLocaleString()} budget</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span>{dept.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {getOrgDepartments(selectedOrganization).length === 0 && (
                    <div className="text-center py-8">
                      <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No departments found</h3>
                      <p className="text-muted-foreground mb-4">Create your first department to get started</p>
                      <Button onClick={() => setIsAddDepartmentOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Department
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learning">
            <div className="space-y-6">
              {/* Enhanced Learning Management Header - Match AdminCollaboration */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-admin to-admin-glow bg-clip-text text-transparent">
                    Learning Management System
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Create and manage learning programs, track progress, and issue certificates
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Dialog open={isBrowseLibraryOpen} onOpenChange={setIsBrowseLibraryOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin"
                      >
                        <BookOpen className="w-4 h-4" />
                        Browse Library
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-admin" />
                          Organization Learning Library
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Library Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <Card className="border-admin/20 bg-gradient-to-br from-admin/5 to-admin-glow/10">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-admin/20 flex items-center justify-center">
                                  <BookOpen className="w-5 h-5 text-admin" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Total Courses</div>
                                  <div className="text-xl font-bold text-admin">247</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                                  <TrendingUp className="w-5 h-5 text-success" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Active Learners</div>
                                  <div className="text-xl font-bold text-success">1,842</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-warning" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Learning Hours</div>
                                  <div className="text-xl font-bold text-warning">12,456</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                                  <Target className="w-5 h-5 text-info" />
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                                  <div className="text-xl font-bold text-info">87%</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-4">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              placeholder="Search courses, skills, categories..."
                              className="pl-10"
                            />
                          </div>
                          
                          <Select defaultValue="all">
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="technical">Technical Skills</SelectItem>
                              <SelectItem value="leadership">Leadership</SelectItem>
                              <SelectItem value="soft-skills">Soft Skills</SelectItem>
                              <SelectItem value="compliance">Compliance</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow">
                            <Upload className="w-4 h-4" />
                            Add Content
                          </Button>
                        </div>

                        {/* Course Categories */}
                        <Tabs defaultValue="technical" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="technical">Technical Skills</TabsTrigger>
                            <TabsTrigger value="leadership">Leadership</TabsTrigger>
                            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
                            <TabsTrigger value="compliance">Compliance</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="technical" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {[
                                {
                                  id: "react-advanced",
                                  title: "Advanced React Development",
                                  description: "Master complex React patterns, hooks, and performance optimization",
                                  instructor: "Sarah Johnson",
                                  duration: "16 hours",
                                  enrolled: 89,
                                  rating: 4.8,
                                  level: "Advanced",
                                  type: "video",
                                  lastUpdated: "2 days ago"
                                },
                                {
                                  id: "typescript-pro",
                                  title: "TypeScript for Professionals",
                                  description: "Advanced TypeScript features and enterprise patterns",
                                  instructor: "Mike Chen",
                                  duration: "12 hours",
                                  enrolled: 124,
                                  rating: 4.9,
                                  level: "Intermediate",
                                  type: "interactive",
                                  lastUpdated: "1 week ago"
                                },
                                {
                                  id: "nodejs-scaling",
                                  title: "Scaling Node.js Applications",
                                  description: "Build and scale high-performance Node.js applications",
                                  instructor: "Alex Rodriguez",
                                  duration: "20 hours",
                                  enrolled: 67,
                                  rating: 4.7,
                                  level: "Advanced",
                                  type: "hands-on",
                                  lastUpdated: "3 days ago"
                                }
                              ].map((course) => (
                                <Card key={course.id} className="hover:shadow-lg transition-all duration-200">
                                  <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-2">
                                        {course.type === "video" && <Video className="w-4 h-4 text-blue-500" />}
                                        {course.type === "interactive" && <Zap className="w-4 h-4 text-purple-500" />}
                                        {course.type === "hands-on" && <Code className="w-4 h-4 text-green-500" />}
                                        <Badge variant="outline" className="text-xs">
                                          {course.level}
                                        </Badge>
                                      </div>
                                      <Button variant="ghost" size="sm" className="hover:bg-admin/10 hover:text-admin">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    
                                    <h4 className="font-semibold text-sm mb-2">{course.title}</h4>
                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                      {course.description}
                                    </p>
                                    
                                    <div className="space-y-2 text-xs text-muted-foreground">
                                      <div className="flex items-center justify-between">
                                        <span>By {course.instructor}</span>
                                        <span>⭐ {course.rating}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>{course.duration}</span>
                                        <span>{course.enrolled} enrolled</span>
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        Updated {course.lastUpdated}
                                      </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-3">
                                      <Button size="sm" variant="outline" className="flex-1 text-xs border-admin/30 hover:bg-admin/10 hover:text-admin">
                                        <Eye className="w-3 h-3 mr-1" />
                                        Preview
                                      </Button>
                                      <Button size="sm" variant="outline" className="flex-1 text-xs border-admin/30 hover:bg-admin/10 hover:text-admin">
                                        <Edit className="w-3 h-3 mr-1" />
                                        Edit
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="leadership">
                            <div className="text-center py-8">
                              <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">Leadership courses coming soon...</p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="soft-skills">
                            <div className="text-center py-8">
                              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">Soft skills courses coming soon...</p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="compliance">
                            <div className="text-center py-8">
                              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">Compliance courses coming soon...</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isViewCertificatesOpen} onOpenChange={setIsViewCertificatesOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin"
                      >
                        <Award className="w-4 h-4" />
                        View Certificates
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden p-0">
                      <DialogHeader className="p-6 pb-2">
                        <DialogTitle>Organization Certificates</DialogTitle>
                      </DialogHeader>
                      <div className="px-6 pb-6 overflow-y-auto max-h-[85vh]">
                        <ViewAllCertificates 
                          onCertificateClick={(certificate) => {
                            console.log("Certificate clicked from ViewAllCertificates:", certificate.title);
                            setSelectedCertificate(certificate);
                            setIsCertificateDetailOpen(true);
                            setIsViewCertificatesOpen(false); // Close the main dialog
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isCreateProgramOpen} onOpenChange={setIsCreateProgramOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                        <Plus className="w-4 h-4" />
                        Create Program
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden p-0">
                      <div className="p-6 overflow-y-auto max-h-[95vh]">
                        <CreateLearningProgram 
                          onClose={() => setIsCreateProgramOpen(false)}
                          onSuccess={() => {
                            setIsCreateProgramOpen(false);
                            toast({
                              title: "Success",
                              description: "Learning program created successfully"
                            });
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Learning Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-admin/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-admin" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Active Programs</div>
                        <div className="text-2xl font-bold text-admin">24</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Enrollments</div>
                        <div className="text-2xl font-bold text-success">1,247</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Certificates</div>
                        <div className="text-2xl font-bold text-warning">456</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-info" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                        <div className="text-2xl font-bold text-info">4.8</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Learning Topics Management */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          Learning Topics
                        </CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
                              <Plus className="w-4 h-4" />
                              Add Topic
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Create Learning Topic</DialogTitle>
                              <DialogDescription>Add a new learning topic for your organization</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="topic-title">Topic Title</Label>
                                <Input id="topic-title" placeholder="e.g., React Advanced Patterns" />
                              </div>
                              <div>
                                <Label htmlFor="topic-description">Description</Label>
                                <Textarea id="topic-description" placeholder="Describe what learners will gain from this topic..." />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="difficulty">Difficulty Level</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="beginner">Beginner</SelectItem>
                                      <SelectItem value="intermediate">Intermediate</SelectItem>
                                      <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="category">Category</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="frontend">Frontend</SelectItem>
                                      <SelectItem value="backend">Backend</SelectItem>
                                      <SelectItem value="devops">DevOps</SelectItem>
                                      <SelectItem value="design">Design</SelectItem>
                                      <SelectItem value="qa">QA/Testing</SelectItem>
                                      <SelectItem value="security">Security</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="estimated-hours">Estimated Hours</Label>
                                  <Input id="estimated-hours" type="number" placeholder="8" />
                                </div>
                                <div>
                                  <Label htmlFor="max-participants">Max Participants</Label>
                                  <Input id="max-participants" type="number" placeholder="20" />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" className="border-admin/30 hover:bg-admin/10 hover:text-admin">Cancel</Button>
                                <Button className="bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">Create Topic</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 1, title: "React Advanced Patterns", description: "Learn advanced React patterns and best practices", category: "Frontend", difficulty: "Advanced", enrolled: 12, completed: 8, hours: 24, rating: 4.8, status: "active" },
                          { id: 2, title: "API Security Best Practices", description: "Comprehensive guide to securing REST APIs", category: "Security", difficulty: "Intermediate", enrolled: 8, completed: 6, hours: 16, rating: 4.6, status: "active" },
                          { id: 3, title: "UI/UX Design Principles", description: "Fundamentals of user interface and experience design", category: "Design", difficulty: "Beginner", enrolled: 15, completed: 12, hours: 20, rating: 4.7, status: "active" },
                          { id: 4, title: "Testing Strategies", description: "Unit, integration, and e2e testing methodologies", category: "QA", difficulty: "Intermediate", enrolled: 10, completed: 7, hours: 18, rating: 4.5, status: "active" },
                          { id: 5, title: "DevOps Fundamentals", description: "CI/CD, containerization, and deployment strategies", category: "DevOps", difficulty: "Advanced", enrolled: 6, completed: 4, hours: 32, rating: 4.9, status: "draft" }
                        ].map((topic) => (
                          <div key={topic.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold">{topic.title}</h4>
                                  <Badge variant={topic.status === 'active' ? 'default' : 'secondary'}>
                                    {topic.status}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {topic.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {topic.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                                
                                <div className="grid grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-muted-foreground" />
                                    <span>{topic.enrolled} enrolled</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Award className="w-3 h-3 text-muted-foreground" />
                                    <span>{topic.completed} completed</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span>{topic.hours}h estimated</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-muted-foreground" />
                                    <span>{topic.rating} rating</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="border-admin/30 hover:bg-admin/10 hover:text-admin">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm" className="border-admin/30 hover:bg-admin/10 hover:text-admin">
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Progress value={(topic.completed / topic.enrolled) * 100} className="flex-1 mr-4 h-2" />
                              <span className="text-xs text-muted-foreground">
                                {Math.round((topic.completed / topic.enrolled) * 100)}% completion
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Learning Analytics & Management */}
                <div className="space-y-6">
                  {/* Learning Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="w-4 h-4" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "Frontend", topics: 6, color: "bg-blue-500" },
                          { name: "Backend", topics: 4, color: "bg-green-500" },
                          { name: "DevOps", topics: 3, color: "bg-purple-500" },
                          { name: "Design", topics: 5, color: "bg-pink-500" },
                          { name: "QA/Testing", topics: 3, color: "bg-orange-500" },
                          { name: "Security", topics: 3, color: "bg-red-500" }
                        ].map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${category.color}`} />
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {category.topics} topics
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="w-4 h-4" />
                        Learning Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Completion Rate</span>
                          <span className="font-semibold">73%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg. Study Time</span>
                          <span className="font-semibold">12.5h</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Active Learners</span>
                          <span className="font-semibold">89/156</span>
                        </div>
                        <Progress value={57} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Settings className="w-4 h-4" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90" size="sm">
                        <Plus className="w-4 h-4" />
                        Bulk Import Topics
                      </Button>
                      <Button variant="outline" className="w-full gap-2 border-admin/30 hover:bg-admin/10 hover:text-admin" size="sm">
                        <Copy className="w-4 h-4" />
                        Export Learning Data
                      </Button>
                      <Button variant="outline" className="w-full gap-2 border-admin/30 hover:bg-admin/10 hover:text-admin" size="sm">
                        <Settings className="w-4 h-4" />
                        Learning Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
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
                        <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90">
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
                            className="w-full bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90" 
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
                                    className="border-admin/30 hover:bg-admin/10 hover:text-admin"
                                  >
                                    <Clock className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" className="border-admin/30 hover:bg-admin/10 hover:text-admin">
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
                                  className="gap-1 border-admin/30 hover:bg-admin/10 hover:text-admin"
                                >
                                  <UserCheck className="w-3 h-3" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => rejectRegistration(request.id)}
                                  className="gap-1 border-admin/30 hover:bg-admin/10 hover:text-admin"
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

        {/* Comprehensive Billing Management Dialog */}
        <Dialog open={isBillingDialogOpen} onOpenChange={setIsBillingDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Manage Billing & Plan - {selectedOrgForBilling?.name}
              </DialogTitle>
              <DialogDescription>
                Update subscription plan, billing information, and payment settings
              </DialogDescription>
            </DialogHeader>

            {selectedOrgForBilling && (
              <div className="space-y-6">
                {/* Plan & Pricing Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Subscription Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billing-plan">Plan Type</Label>
                        <Select value={billingFormData.plan} onValueChange={(value) => setBillingFormData({...billingFormData, plan: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="Basic">
                              <div className="flex flex-col">
                                <span className="font-medium">Basic Plan</span>
                                <span className="text-xs text-muted-foreground">$25/user/month</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Professional">
                              <div className="flex flex-col">
                                <span className="font-medium">Professional Plan</span>
                                <span className="text-xs text-muted-foreground">$50/user/month</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Enterprise">
                              <div className="flex flex-col">
                                <span className="font-medium">Enterprise Plan</span>
                                <span className="text-xs text-muted-foreground">$75/user/month</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="billing-cycle">Billing Cycle</Label>
                        <Select value={billingFormData.billingCycle} onValueChange={(value) => setBillingFormData({...billingFormData, billingCycle: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="annual">
                              <div className="flex flex-col">
                                <span>Annual</span>
                                <span className="text-xs text-green-600">Save 2 months</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billing-licenses">Number of Licenses</Label>
                        <Input
                          id="billing-licenses"
                          type="number"
                          value={billingFormData.licenses}
                          onChange={(e) => setBillingFormData({...billingFormData, licenses: parseInt(e.target.value) || 0})}
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="billing-discount">Discount (%)</Label>
                        <Input
                          id="billing-discount"
                          type="number"
                          value={billingFormData.discount}
                          onChange={(e) => setBillingFormData({...billingFormData, discount: parseInt(e.target.value) || 0})}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    {/* Pricing Preview */}
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <Label className="text-sm font-medium">Pricing Preview</Label>
                      <div className="mt-2 space-y-1">
                        {(() => {
                          const planPricing = { "Basic": 25, "Professional": 50, "Enterprise": 75 };
                          const basePrice = billingFormData.licenses * (planPricing[billingFormData.plan as keyof typeof planPricing] || 50);
                          const discountAmount = (basePrice * billingFormData.discount) / 100;
                          const finalPrice = billingFormData.billingCycle === "annual" 
                            ? (basePrice - discountAmount) * 10 
                            : basePrice - discountAmount;
                          
                          return (
                            <>
                              <div className="flex justify-between text-sm">
                                <span>Base Price ({billingFormData.licenses} licenses):</span>
                                <span>${basePrice}/month</span>
                              </div>
                              {billingFormData.discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                  <span>Discount ({billingFormData.discount}%):</span>
                                  <span>-${discountAmount}/month</span>
                                </div>
                              )}
                              {billingFormData.billingCycle === "annual" && (
                                <div className="flex justify-between text-sm text-green-600">
                                  <span>Annual Savings (2 months free):</span>
                                  <span>-${(basePrice - discountAmount) * 2}/year</span>
                                </div>
                              )}
                              <div className="flex justify-between font-semibold border-t pt-1">
                                <span>Total:</span>
                                <span>${finalPrice}{billingFormData.billingCycle === "annual" ? "/year" : "/month"}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Information Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Billing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="billing-email">Billing Email</Label>
                      <Input
                        id="billing-email"
                        type="email"
                        value={billingFormData.billingEmail}
                        onChange={(e) => setBillingFormData({...billingFormData, billingEmail: e.target.value})}
                        placeholder="billing@company.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <Textarea
                        id="billing-address"
                        value={billingFormData.address}
                        onChange={(e) => setBillingFormData({...billingFormData, address: e.target.value})}
                        placeholder="123 Business St, City, State, ZIP"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billing-tax-id">Tax ID / VAT Number</Label>
                        <Input
                          id="billing-tax-id"
                          value={billingFormData.taxId}
                          onChange={(e) => setBillingFormData({...billingFormData, taxId: e.target.value})}
                          placeholder="TAX-123456789"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="billing-payment">Payment Method</Label>
                        <Select value={billingFormData.paymentMethod} onValueChange={(value) => setBillingFormData({...billingFormData, paymentMethod: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="**** 4532">**** 4532 (Visa)</SelectItem>
                            <SelectItem value="**** 8765">**** 8765 (MasterCard)</SelectItem>
                            <SelectItem value="**** 1234">**** 1234 (American Express)</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                            <SelectItem value="new-card">Add New Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Settings Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Billing Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Renewal</Label>
                        <p className="text-sm text-muted-foreground">Automatically renew subscription</p>
                      </div>
                      <Switch
                        checked={billingFormData.autoRenewal}
                        onCheckedChange={(checked) => setBillingFormData({...billingFormData, autoRenewal: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Custom Pricing</Label>
                        <p className="text-sm text-muted-foreground">Enable custom pricing for this organization</p>
                      </div>
                      <Switch
                        checked={billingFormData.customPricing}
                        onCheckedChange={(checked) => setBillingFormData({...billingFormData, customPricing: checked})}
                      />
                    </div>

                    {/* Contract Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/20">
                      <div>
                        <Label className="text-sm text-muted-foreground">Contract End Date</Label>
                        <p className="font-medium">{selectedOrgForBilling.contractEndDate || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Next Billing Date</Label>
                        <p className="font-medium">{selectedOrgForBilling.nextBillingDate || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsBillingDialogOpen(false)}
                    className="border-admin/30 hover:bg-admin/10 hover:text-admin"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={updateBillingInfo}
                    className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin/90 hover:to-admin-glow/90"
                  >
                    <Check className="w-4 h-4" />
                    Update Billing
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Certificate Detail Dialog */}
        <Dialog open={isCertificateDetailOpen} onOpenChange={setIsCertificateDetailOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                {selectedCertificate?.course || selectedCertificate?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedCertificate && (
              <div className="space-y-4">
                {/* Employee Information - Admin Only */}
                <div className="p-3 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{selectedCertificate.employee}</p>
                      <p className="text-xs text-muted-foreground">{selectedCertificate.employeeRole || 'Employee'}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {selectedCertificate.department}
                    </Badge>
                  </div>
                </div>

                {/* Certificate Display */}
                <div className="text-center p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-primary-glow/10">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-2">{selectedCertificate.course || selectedCertificate.title}</h3>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">ID:</span>
                      <p className="font-mono font-medium text-xs">{selectedCertificate.certificateId || selectedCertificate.credentialId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Score:</span>
                      <p className="font-medium">{selectedCertificate.score}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issued:</span>
                      <p className="font-medium text-xs">{new Date(selectedCertificate.completedDate || selectedCertificate.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Learning Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Learning Details</h4>
                  <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">{selectedCertificate.instructor || 'Internal Training'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant="outline" className="text-xs">{selectedCertificate.level || 'Intermediate'}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{selectedCertificate.category || selectedCertificate.department}</span>
                    </div>
                    {selectedCertificate.description && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Description:</span>
                        <p className="mt-1 text-xs leading-relaxed">{selectedCertificate.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills Acquired */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Skills Acquired</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCertificate.skills || ['Professional Skills', 'Course Completion', 'Knowledge Assessment']).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Verification Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Verification</h4>
                  <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                        {selectedCertificate.status || 'Active'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Verification URL:</span>
                      <span className="font-mono text-xs text-primary">certificates.company.com/verify/{selectedCertificate.certificateId || selectedCertificate.credentialId}</span>
                    </div>
                    {selectedCertificate.expiryDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expires:</span>
                        <span className="font-medium">{new Date(selectedCertificate.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Additional Information</h4>
                  <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Course Duration:</span>
                      <span className="font-medium">{selectedCertificate.duration || '4-6 weeks'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-medium">{selectedCertificate.format || 'Online Learning'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CPD Points:</span>
                      <span className="font-medium">{selectedCertificate.cpdPoints || '10 pts'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gap-2" 
                    size="sm" 
                    onClick={() => {
                      toast({
                        title: "Download Started",
                        description: `Downloading certificate: ${selectedCertificate.course || selectedCertificate.title}`,
                      });
                    }}
                  >
                    <Award className="w-3 h-3" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2" 
                    size="sm" 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://certificates.company.com/verify/${selectedCertificate.certificateId || selectedCertificate.credentialId}`);
                      toast({
                        title: "Link Copied",
                        description: "Certificate verification link copied to clipboard",
                      });
                    }}
                  >
                    <Award className="w-3 h-3" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminOrganizations;