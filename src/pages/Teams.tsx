import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { 
  Users, 
  Plus,
  Search,
  Crown,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Settings,
  UserPlus,
  Building2,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  User,
  Edit,
  Trash2,
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Teams = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isEditDepartmentOpen, setIsEditDepartmentOpen] = useState(false);
  const [isDepartmentDetailsOpen, setIsDepartmentDetailsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedMemberForTasks, setSelectedMemberForTasks] = useState<any>(null);
  const [currentUserRole, setCurrentUserRole] = useState("admin"); // Mock current user role
  const { toast } = useToast();

  // Form states for adding/editing members
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    organization: "",
    permissions: [] as string[],
    skills: ""
  });

  // Mock organizations data
  const organizations = [
    { id: "ORG-001", name: "TechCorp Solutions" },
    { id: "ORG-002", name: "StartupXYZ" },
    { id: "ORG-003", name: "Enterprise Corp" }
  ];

  // Department form state
  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    description: "",
    managerId: "",
    budget: "",
    location: ""
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@company.com",
      role: "Team Lead",
      department: "Engineering",
      avatar: "",
      status: "online",
      joinDate: "Jan 2023",
      projects: ["Website Redesign", "Mobile App"],
      skills: ["React", "TypeScript", "Node.js"],
      isLead: true,
      permissions: ["admin", "create_projects", "manage_team", "view_analytics"],
      systemRole: "admin",
      tasks: [
        { id: "1", name: "Project Architecture Review", status: "in-progress", priority: "high", loggedHours: 8, estimatedHours: 12 },
        { id: "2", name: "Team Onboarding", status: "completed", priority: "medium", loggedHours: 6, estimatedHours: 6 },
        { id: "3", name: "Code Review Process Setup", status: "todo", priority: "medium", loggedHours: 0, estimatedHours: 4 }
      ]
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "UI/UX Designer",
      department: "Design",
      avatar: "",
      status: "online",
      joinDate: "Mar 2023",
      projects: ["Website Redesign", "Marketing Campaign"],
      skills: ["Figma", "Sketch", "Prototyping"],
      permissions: ["create_projects", "view_analytics"],
      systemRole: "manager",
      tasks: [
        { id: "4", name: "Homepage Wireframes", status: "completed", priority: "high", loggedHours: 18, estimatedHours: 16 },
        { id: "5", name: "Design System Update", status: "in-progress", priority: "medium", loggedHours: 12, estimatedHours: 20 },
        { id: "6", name: "User Testing Analysis", status: "todo", priority: "low", loggedHours: 0, estimatedHours: 8 }
      ]
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@company.com",
      role: "Backend Developer",
      department: "Engineering",
      avatar: "",
      status: "away",
      joinDate: "Feb 2023",
      projects: ["Mobile App", "Data Analytics"],
      skills: ["Python", "PostgreSQL", "AWS"],
      permissions: ["create_projects"],
      systemRole: "member",
      tasks: [
        { id: "7", name: "API Development", status: "in-progress", priority: "high", loggedHours: 20, estimatedHours: 28 },
        { id: "8", name: "Database Optimization", status: "completed", priority: "medium", loggedHours: 14, estimatedHours: 12 },
        { id: "9", name: "Security Audit", status: "todo", priority: "high", loggedHours: 0, estimatedHours: 16 }
      ]
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "Marketing Manager",
      department: "Marketing",
      avatar: "",
      status: "offline",
      joinDate: "Dec 2022",
      projects: ["Marketing Campaign"],
      skills: ["Content Strategy", "SEO", "Analytics"],
      permissions: ["create_projects", "view_analytics"],
      systemRole: "manager",
      tasks: [
        { id: "10", name: "Campaign Strategy", status: "completed", priority: "high", loggedHours: 15, estimatedHours: 16 },
        { id: "11", name: "Content Calendar", status: "in-progress", priority: "medium", loggedHours: 8, estimatedHours: 12 },
        { id: "12", name: "Analytics Dashboard", status: "todo", priority: "low", loggedHours: 0, estimatedHours: 10 }
      ]
    },
    {
      id: "5",
      name: "David Kim",
      email: "david@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      avatar: "",
      status: "online",
      joinDate: "Apr 2023",
      projects: ["Website Redesign", "Mobile App"],
      skills: ["React", "CSS", "JavaScript"],
      permissions: [],
      systemRole: "member",
      tasks: [
        { id: "13", name: "Component Library", status: "in-progress", priority: "medium", loggedHours: 14, estimatedHours: 20 },
        { id: "14", name: "Responsive Design", status: "todo", priority: "medium", loggedHours: 0, estimatedHours: 16 },
        { id: "15", name: "Performance Optimization", status: "todo", priority: "low", loggedHours: 0, estimatedHours: 8 }
      ]
    },
    {
      id: "6",
      name: "Lisa Wang",
      email: "lisa@company.com",
      role: "Product Manager",
      department: "Product",
      avatar: "",
      status: "online",
      joinDate: "Nov 2022",
      projects: ["Mobile App", "Data Analytics"],
      skills: ["Product Strategy", "User Research", "Agile"],
      permissions: ["create_projects", "manage_team", "view_analytics"],
      systemRole: "manager",
      tasks: [
        { id: "16", name: "Product Roadmap", status: "completed", priority: "high", loggedHours: 12, estimatedHours: 12 },
        { id: "17", name: "User Stories Definition", status: "in-progress", priority: "high", loggedHours: 8, estimatedHours: 16 },
        { id: "18", name: "Stakeholder Meetings", status: "in-progress", priority: "medium", loggedHours: 6, estimatedHours: 10 }
      ]
    }
  ]);

  const [departments, setDepartments] = useState([
    {
      id: "1",
      name: "Engineering",
      description: "Software development and technical architecture",
      members: teamMembers.filter(m => m.department === "Engineering").length,
      lead: "Alex Johnson",
      leadId: "1",
      color: "#8B5CF6",
      budget: 500000,
      location: "Building A, Floor 3"
    },
    {
      id: "2",
      name: "Design",
      description: "UI/UX design and creative direction",
      members: teamMembers.filter(m => m.department === "Design").length,
      lead: "Sarah Chen",
      leadId: "2",
      color: "#06B6D4",
      budget: 300000,
      location: "Building A, Floor 2"
    },
    {
      id: "3",
      name: "Marketing",
      description: "Brand management and customer acquisition",
      members: teamMembers.filter(m => m.department === "Marketing").length,
      lead: "Emily Davis",
      leadId: "4",
      color: "#10B981",
      budget: 400000,
      location: "Building B, Floor 1"
    },
    {
      id: "4",
      name: "Product",
      description: "Product strategy and roadmap",
      members: teamMembers.filter(m => m.department === "Product").length,
      lead: "Lisa Wang",
      leadId: "6",
      color: "#F59E0B",
      budget: 350000,
      location: "Building A, Floor 4"
    }
  ]);

  const getFilteredMembers = () => {
    if (!searchQuery) return teamMembers;
    return teamMembers.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const rolePermissions = {
    admin: ["admin", "create_projects", "manage_team", "view_analytics", "delete_projects"],
    manager: ["create_projects", "manage_team", "view_analytics"],
    member: ["create_projects"],
    viewer: ["view_analytics"]
  };

  const systemRoles = [
    { value: "admin", label: "Admin", icon: Crown, color: "text-yellow-500" },
    { value: "manager", label: "Manager", icon: ShieldCheck, color: "text-blue-500" },
    { value: "member", label: "Member", icon: User, color: "text-green-500" },
    { value: "viewer", label: "Viewer", icon: Shield, color: "text-gray-500" }
  ];

  const handleAddMember = () => {
    if (!formData.name || !formData.email || !formData.role || !formData.department || !formData.organization) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      avatar: "",
      status: "offline",
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      projects: [],
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      permissions: formData.permissions,
      systemRole: formData.role.toLowerCase(),
      tasks: []
    };

    setTeamMembers([...teamMembers, newMember]);
    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
      organization: "",
      permissions: [],
      skills: ""
    });
    setIsAddMemberOpen(false);
    toast({
      title: "Success",
      description: "Team member added successfully"
    });
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.systemRole,
      department: member.department,
      organization: member.organization || "ORG-001", // Default to first org if not set
      permissions: member.permissions || [],
      skills: member.skills.join(", ")
    });
    setIsEditMemberOpen(true);
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;

    const updatedMembers = teamMembers.map(member => 
      member.id === selectedMember.id 
        ? {
            ...member,
            name: formData.name,
            email: formData.email,
            role: formData.role === "admin" ? "Team Lead" : formData.role,
            department: formData.department,
            permissions: formData.permissions,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
            systemRole: formData.role,
            isLead: formData.role === "admin"
          }
        : member
    );

    setTeamMembers(updatedMembers);
    setIsEditMemberOpen(false);
    setSelectedMember(null);
    toast({
      title: "Success",
      description: "Team member updated successfully"
    });
  };

  const handleDeleteMember = (memberId: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    toast({
      title: "Success",
      description: "Team member removed successfully"
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

    const manager = teamMembers.find(m => m.id === departmentFormData.managerId);
    const newDepartment = {
      id: Date.now().toString(),
      name: departmentFormData.name,
      description: departmentFormData.description,
      members: 0,
      lead: manager?.name || "",
      leadId: departmentFormData.managerId,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
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

  const handleEditDepartment = (department: any) => {
    setSelectedDepartment(department);
    setDepartmentFormData({
      name: department.name,
      description: department.description,
      managerId: department.leadId,
      budget: department.budget.toString(),
      location: department.location
    });
    setIsEditDepartmentOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (!selectedDepartment) return;

    const manager = teamMembers.find(m => m.id === departmentFormData.managerId);
    const updatedDepartments = departments.map(dept => 
      dept.id === selectedDepartment.id 
        ? {
            ...dept,
            name: departmentFormData.name,
            description: departmentFormData.description,
            lead: manager?.name || "",
            leadId: departmentFormData.managerId,
            budget: parseInt(departmentFormData.budget) || 0,
            location: departmentFormData.location
          }
        : dept
    );

    setDepartments(updatedDepartments);
    setIsEditDepartmentOpen(false);
    setSelectedDepartment(null);
    toast({
      title: "Success",
      description: "Department updated successfully"
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(departments.filter(dept => dept.id !== departmentId));
    toast({
      title: "Success",
      description: "Department deleted successfully"
    });
  };

  const handleViewDepartmentDetails = (department: any) => {
    setSelectedDepartment(department);
    setIsDepartmentDetailsOpen(true);
  };

  const getDepartmentMembers = (departmentName: string) => {
    return teamMembers.filter(member => member.department === departmentName);
  };

  const getDepartmentProjects = (departmentName: string) => {
    const deptMembers = getDepartmentMembers(departmentName);
    const projects = [...new Set(deptMembers.flatMap(member => member.projects))];
    return projects;
  };

  const getRoleIcon = (systemRole: string) => {
    const role = systemRoles.find(r => r.value === systemRole);
    return role ? role.icon : User;
  };

  const getRoleColor = (systemRole: string) => {
    const role = systemRoles.find(r => r.value === systemRole);
    return role ? role.color : "text-gray-500";
  };

  const teamStats = {
    total: teamMembers.length,
    online: teamMembers.filter(m => m.status === "online").length,
    departments: departments.length,
    activeProjects: [...new Set(teamMembers.flatMap(m => m.projects))].length
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Play className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Teams
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and departments
            </p>
          </div>
          {currentUserRole === "admin" && (
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">System Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => {
                        setFormData({
                          ...formData, 
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
                      <Label htmlFor="department">Department *</Label>
                      <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.name} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Select value={formData.organization} onValueChange={(value) => setFormData({...formData, organization: value})}>
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
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
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
                    <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember}>
                      Add Member
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{teamStats.total}</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-5 h-5 mx-auto bg-green-500 rounded-full mb-2" />
              <div className="text-2xl font-bold">{teamStats.online}</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{teamStats.departments}</div>
              <div className="text-sm text-muted-foreground">Departments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{teamStats.activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="hover:shadow-sm hover:translate-y-0">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teams Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="members" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Users className="h-4 w-4 mr-2" />
              Team Members</TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Briefcase className="h-4 w-4 mr-2" />
              Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getFilteredMembers().map((member) => (
                <Card key={member.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm flex items-center gap-1 truncate">
                            {member.name}
                            {member.isLead && <Crown className="w-3 h-3 text-yellow-500 flex-shrink-0" />}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                        {currentUserRole === "admin" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditMember(member)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <div className="flex items-center gap-2 text-xs">
                      <Briefcase className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <Badge variant="outline" className="text-xs">
                        {member.department}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Joined {member.joinDate}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{member.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        {(() => {
                          const RoleIcon = getRoleIcon(member.systemRole);
                          return <RoleIcon className={`w-3 h-3 ${getRoleColor(member.systemRole)}`} />;
                        })()}
                        <Badge variant="outline" className={`text-xs ${getRoleColor(member.systemRole)}`}>
                          {member.systemRole}
                        </Badge>
                      </div>
                      
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs"
                            onClick={() => setSelectedMemberForTasks(member)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Tasks
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.role}</div>
                              </div>
                            </SheetTitle>
                          </SheetHeader>
                          
                          <div className="mt-6 space-y-6">
                            {/* Task Stats */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-muted/30 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                  {member.tasks?.filter(t => t.status === 'completed').length || 0}
                                </div>
                                <div className="text-xs text-muted-foreground">Completed</div>
                              </div>
                              <div className="text-center p-3 bg-muted/30 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">
                                  {member.tasks?.filter(t => t.status === 'in-progress').length || 0}
                                </div>
                                <div className="text-xs text-muted-foreground">In Progress</div>
                              </div>
                              <div className="text-center p-3 bg-muted/30 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">
                                  {member.tasks?.reduce((sum, t) => sum + t.loggedHours, 0) || 0}h
                                </div>
                                <div className="text-xs text-muted-foreground">Total Hours</div>
                              </div>
                            </div>
                            
                            {/* Task List */}
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Current Tasks ({member.tasks?.length || 0})
                              </h4>
                              
                              <div className="space-y-2 max-h-96 overflow-y-auto">
                                {member.tasks && member.tasks.length > 0 ? (
                                  member.tasks.map((task) => (
                                    <Card key={task.id} className="p-3 hover:shadow-sm transition-shadow">
                                      <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                          {getTaskStatusIcon(task.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm truncate">{task.name}</span>
                                            <Badge 
                                              variant="outline" 
                                              className={cn("text-xs px-1.5 py-0.5", getTaskPriorityColor(task.priority))}
                                            >
                                              {task.priority}
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                            <span className="flex items-center gap-1">
                                              <Clock className="w-3 h-3" />
                                              {task.loggedHours}h / {task.estimatedHours}h
                                            </span>
                                            <span className="flex items-center gap-1">
                                              <TrendingUp className="w-3 h-3" />
                                              {task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0}%
                                            </span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-1.5">
                                            <div 
                                              className={cn(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                task.status === 'completed' ? 'bg-green-500' :
                                                task.status === 'in-progress' ? 'bg-blue-500' :
                                                task.status === 'blocked' ? 'bg-red-500' : 'bg-gray-300'
                                              )}
                                              style={{ 
                                                width: task.estimatedHours > 0 
                                                  ? `${Math.min((task.loggedHours / task.estimatedHours) * 100, 100)}%`
                                                  : '0%'
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))
                                ) : (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No tasks assigned</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Projects */}
                            <div>
                              <h4 className="font-medium mb-2">Active Projects</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.projects.map((project, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {project}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Departments</h3>
                <p className="text-sm text-muted-foreground">Manage organizational departments</p>
              </div>
              {currentUserRole === "admin" && (
                <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Department
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Department</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dept-name">Department Name</Label>
                        <Input 
                          id="dept-name" 
                          placeholder="Enter department name"
                          value={departmentFormData.name}
                          onChange={(e) => setDepartmentFormData({...departmentFormData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dept-description">Description</Label>
                        <Textarea 
                          id="dept-description" 
                          placeholder="Enter description"
                          value={departmentFormData.description}
                          onChange={(e) => setDepartmentFormData({...departmentFormData, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dept-manager">Manager</Label>
                        <Select value={departmentFormData.managerId} onValueChange={(value) => setDepartmentFormData({...departmentFormData, managerId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.filter(m => m.systemRole === "admin" || m.systemRole === "manager").map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dept-budget">Budget</Label>
                        <Input 
                          id="dept-budget" 
                          type="number" 
                          placeholder="Enter budget"
                          value={departmentFormData.budget}
                          onChange={(e) => setDepartmentFormData({...departmentFormData, budget: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dept-location">Location</Label>
                        <Input 
                          id="dept-location" 
                          placeholder="Enter location"
                          value={departmentFormData.location}
                          onChange={(e) => setDepartmentFormData({...departmentFormData, location: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-4">
                        <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddDepartment}>Create Department</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card key={dept.name} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: dept.color }}
                        />
                        {dept.name}
                      </CardTitle>
                      {currentUserRole === "admin" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditDepartment(dept)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteDepartment(dept.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {dept.lead.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{dept.lead}</p>
                        <p className="text-xs text-muted-foreground">Department Lead</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Members
                        </span>
                        <Badge variant="secondary">{dept.members}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget</span>
                        <span className="font-medium">${dept.budget?.toLocaleString() || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Location</span>
                        <span className="text-muted-foreground">{dept.location || 'Not set'}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full gap-2" 
                        onClick={() => handleViewDepartmentDetails(dept)}
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {departments.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No departments found</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by creating your first department
                </p>
                {currentUserRole === "admin" && (
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Department
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Member Dialog */}
        <Dialog open={isEditMemberOpen} onOpenChange={setIsEditMemberOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-role">System Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => {
                    setFormData({
                      ...formData, 
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
                  <Label htmlFor="edit-department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.name} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-organization">Organization *</Label>
                <Select value={formData.organization} onValueChange={(value) => setFormData({...formData, organization: value})}>
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
                <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
                <Input
                  id="edit-skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div>
                <Label>Current Permissions</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsEditMemberOpen(false);
                  setSelectedMember(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateMember}>
                  Update Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Department Dialog */}
        <Dialog open={isEditDepartmentOpen} onOpenChange={setIsEditDepartmentOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-dept-name">Department Name</Label>
                <Input 
                  id="edit-dept-name" 
                  placeholder="Enter department name"
                  value={departmentFormData.name}
                  onChange={(e) => setDepartmentFormData({...departmentFormData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-dept-description">Description</Label>
                <Textarea 
                  id="edit-dept-description" 
                  placeholder="Enter description"
                  value={departmentFormData.description}
                  onChange={(e) => setDepartmentFormData({...departmentFormData, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-dept-manager">Manager</Label>
                <Select value={departmentFormData.managerId} onValueChange={(value) => setDepartmentFormData({...departmentFormData, managerId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.filter(m => m.systemRole === "admin" || m.systemRole === "manager").map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-dept-budget">Budget</Label>
                <Input 
                  id="edit-dept-budget" 
                  type="number" 
                  placeholder="Enter budget"
                  value={departmentFormData.budget}
                  onChange={(e) => setDepartmentFormData({...departmentFormData, budget: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-dept-location">Location</Label>
                <Input 
                  id="edit-dept-location" 
                  placeholder="Enter location"
                  value={departmentFormData.location}
                  onChange={(e) => setDepartmentFormData({...departmentFormData, location: e.target.value})}
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => {
                  setIsEditDepartmentOpen(false);
                  setSelectedDepartment(null);
                }}>Cancel</Button>
                <Button onClick={handleUpdateDepartment}>Update Department</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Department Details Dialog */}
        <Dialog open={isDepartmentDetailsOpen} onOpenChange={setIsDepartmentDetailsOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedDepartment?.color }}
                />
                {selectedDepartment?.name} Department Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedDepartment && (
              <div className="space-y-6">
                {/* Department Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                        Total Members
                      </div>
                      <div className="text-2xl font-bold">{getDepartmentMembers(selectedDepartment.name).length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Target className="w-4 h-4" />
                        Active Projects
                      </div>
                      <div className="text-2xl font-bold">{getDepartmentProjects(selectedDepartment.name).length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <DollarSign className="w-4 h-4" />
                        Budget
                      </div>
                      <div className="text-2xl font-bold">${selectedDepartment.budget?.toLocaleString() || 'N/A'}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Department Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Department Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedDepartment.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Department Lead</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">
                              {selectedDepartment.lead.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{selectedDepartment.lead}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedDepartment.location || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getDepartmentMembers(selectedDepartment.name).map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{member.name}</p>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                              </div>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {member.systemRole}
                            </Badge>
                            {member.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{member.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {getDepartmentMembers(selectedDepartment.name).length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No team members assigned to this department
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getDepartmentProjects(selectedDepartment.name).map((project, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{project}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">In Progress</span>
                          </div>
                        </div>
                      ))}
                      
                      {getDepartmentProjects(selectedDepartment.name).length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No active projects assigned to this department
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsDepartmentDetailsOpen(false)}>
                    Close
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

export default Teams;