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
import { useToast } from "@/components/ui/use-toast";
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
  MoreHorizontal,
  Shield,
  ShieldCheck,
  User,
  Edit,
  Trash2
} from "lucide-react";

const Teams = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [currentUserRole, setCurrentUserRole] = useState("admin"); // Mock current user role
  const { toast } = useToast();

  // Form states for adding/editing members
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    permissions: [] as string[],
    skills: ""
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
      systemRole: "admin"
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
      systemRole: "manager"
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
      systemRole: "member"
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
      systemRole: "manager"
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
      systemRole: "member"
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
      systemRole: "manager"
    }
  ]);

  const departments = [
    {
      name: "Engineering",
      members: teamMembers.filter(m => m.department === "Engineering").length,
      lead: "Alex Johnson",
      color: "#8B5CF6"
    },
    {
      name: "Design",
      members: teamMembers.filter(m => m.department === "Design").length,
      lead: "Sarah Chen",
      color: "#06B6D4"
    },
    {
      name: "Marketing",
      members: teamMembers.filter(m => m.department === "Marketing").length,
      lead: "Emily Davis",
      color: "#10B981"
    },
    {
      name: "Product",
      members: teamMembers.filter(m => m.department === "Product").length,
      lead: "Lisa Wang",
      color: "#F59E0B"
    }
  ];

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
    if (!formData.name || !formData.email || !formData.role || !formData.department) {
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
      systemRole: formData.role.toLowerCase()
    };

    setTeamMembers([...teamMembers, newMember]);
    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
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
      permissions: member.permissions,
      skills: member.skills.join(', ')
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
        <Card>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredMembers().map((member) => (
                <Card key={member.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-background`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{member.name}</h3>
                            {(() => {
                              const RoleIcon = getRoleIcon(member.systemRole);
                              return <RoleIcon className={`w-4 h-4 ${getRoleColor(member.systemRole)}`} />;
                            })()}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <Badge variant="outline" className="text-xs mt-1 capitalize">
                            {member.systemRole}
                          </Badge>
                        </div>
                      </div>
                      {currentUserRole === "admin" && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditMember(member)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(member.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Joined {member.joinDate}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Active Projects</p>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((project) => (
                          <Badge key={project} variant="secondary" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {member.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <Card key={dept.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: dept.color }}
                        />
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">{dept.members} members</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Department Lead</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {dept.lead.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{dept.lead}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Team Members</p>
                      <div className="flex flex-wrap gap-2">
                        {teamMembers
                          .filter(member => member.department === dept.name)
                          .map((member) => (
                            <div key={member.id} className="flex items-center gap-2 p-2 rounded-lg border">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-muted text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.name}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <Button variant="outline" onClick={() => setIsEditMemberOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateMember}>
                  Update Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Teams;