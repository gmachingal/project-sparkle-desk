import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Briefcase,
  User,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [isEditDepartmentOpen, setIsEditDepartmentOpen] = useState(false);
  const [isDepartmentDetailsOpen, setIsDepartmentDetailsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    managerId: "",
    budget: "",
    location: "",
    color: "#8B5CF6"
  });

  const departmentColors = [
    "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5A3C", "#6366F1", "#EC4899"
  ];

  const [departments, setDepartments] = useState([
    {
      id: "1",
      name: "Engineering",
      description: "Software development and technical architecture",
      members: 25,
      manager: "Alex Johnson",
      managerId: "1",
      color: "#8B5CF6",
      budget: 500000,
      location: "Building A, Floor 3",
      activeProjects: 8,
      completedTasks: 142,
      avgPerformance: 88
    },
    {
      id: "2",
      name: "Design",
      description: "UI/UX design and creative direction",
      members: 12,
      manager: "Sarah Chen",
      managerId: "2",
      color: "#06B6D4",
      budget: 300000,
      location: "Building A, Floor 2",
      activeProjects: 5,
      completedTasks: 78,
      avgPerformance: 92
    },
    {
      id: "3",
      name: "Marketing",
      description: "Brand management and customer acquisition",
      members: 18,
      manager: "Emily Davis",
      managerId: "4",
      color: "#10B981",
      budget: 400000,
      location: "Building B, Floor 1",
      activeProjects: 6,
      completedTasks: 95,
      avgPerformance: 85
    },
    {
      id: "4",
      name: "Product",
      description: "Product strategy and roadmap management",
      members: 8,
      manager: "Lisa Wang",
      managerId: "6",
      color: "#F59E0B",
      budget: 350000,
      location: "Building A, Floor 4",
      activeProjects: 4,
      completedTasks: 56,
      avgPerformance: 90
    },
    {
      id: "5",
      name: "Sales",
      description: "Revenue generation and client relationships",
      members: 22,
      manager: "David Brown",
      managerId: "7",
      color: "#EF4444",
      budget: 450000,
      location: "Building B, Floor 2",
      activeProjects: 3,
      completedTasks: 124,
      avgPerformance: 87
    },
    {
      id: "6",
      name: "Human Resources",
      description: "Employee relations and organizational development",
      members: 6,
      manager: "Lisa Chen",
      managerId: "8",
      color: "#8B5A3C",
      budget: 250000,
      location: "Building A, Floor 1",
      activeProjects: 2,
      completedTasks: 45,
      avgPerformance: 89
    }
  ]);

  const teamMembers = [
    { id: "1", name: "Alex Johnson", email: "alex@company.com", department: "Engineering" },
    { id: "2", name: "Sarah Chen", email: "sarah@company.com", department: "Design" },
    { id: "3", name: "Mike Rodriguez", email: "mike@company.com", department: "Engineering" },
    { id: "4", name: "Emily Davis", email: "emily@company.com", department: "Marketing" },
    { id: "5", name: "David Kim", email: "david@company.com", department: "Engineering" },
    { id: "6", name: "Lisa Wang", email: "lisa@company.com", department: "Product" },
    { id: "7", name: "David Brown", email: "david.brown@company.com", department: "Sales" },
    { id: "8", name: "Lisa Chen", email: "lisa.chen@company.com", department: "Human Resources" }
  ];

  const getFilteredDepartments = () => {
    if (!searchQuery) return departments;
    return departments.filter(dept => 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddDepartment = () => {
    if (!formData.name || !formData.managerId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const manager = teamMembers.find(m => m.id === formData.managerId);
    const newDepartment = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      members: 0,
      manager: manager?.name || "",
      managerId: formData.managerId,
      color: formData.color,
      budget: parseInt(formData.budget) || 0,
      location: formData.location,
      activeProjects: 0,
      completedTasks: 0,
      avgPerformance: 0
    };

    setDepartments([...departments, newDepartment]);
    setFormData({ name: "", description: "", managerId: "", budget: "", location: "", color: "#8B5CF6" });
    setIsAddDepartmentOpen(false);
    toast({
      title: "Success",
      description: "Department created successfully"
    });
  };

  const handleEditDepartment = (department: any) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      managerId: department.managerId,
      budget: department.budget.toString(),
      location: department.location,
      color: department.color
    });
    setIsEditDepartmentOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (!selectedDepartment) return;

    const manager = teamMembers.find(m => m.id === formData.managerId);
    const updatedDepartments = departments.map(dept => 
      dept.id === selectedDepartment.id 
        ? {
            ...dept,
            name: formData.name,
            description: formData.description,
            manager: manager?.name || "",
            managerId: formData.managerId,
            budget: parseInt(formData.budget) || 0,
            location: formData.location,
            color: formData.color
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

  const getDepartmentStats = () => {
    const totalMembers = departments.reduce((sum, dept) => sum + dept.members, 0);
    const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
    const totalProjects = departments.reduce((sum, dept) => sum + dept.activeProjects, 0);
    const avgPerformance = departments.reduce((sum, dept) => sum + dept.avgPerformance, 0) / departments.length;

    return {
      totalDepartments: departments.length,
      totalMembers,
      totalBudget,
      totalProjects,
      avgPerformance: Math.round(avgPerformance)
    };
  };

  const stats = getDepartmentStats();

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Department Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage organizational departments and their structure
            </p>
          </div>
          <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Department Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter department name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Department description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Department Manager *</Label>
                  <Select value={formData.managerId} onValueChange={(value) => setFormData({ ...formData, managerId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Annual budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Office location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Department Color</Label>
                  <div className="flex gap-2 mt-2">
                    {departmentColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          formData.color === color ? "border-foreground scale-110" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddDepartment} className="flex-1">
                    Create Department
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalDepartments}</p>
                  <p className="text-sm text-muted-foreground">Departments</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalMembers}</p>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">${(stats.totalBudget / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalProjects}</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
                <Briefcase className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.avgPerformance}%</p>
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Tabs */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredDepartments().map((department) => (
                <Card key={department.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: department.color }} 
                        />
                        <CardTitle className="text-lg">{department.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleViewDepartmentDetails(department)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditDepartment(department)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteDepartment(department.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{department.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Manager:</span>
                        <span className="font-medium">{department.manager}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Members:</span>
                        <Badge variant="outline">{department.members}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget:</span>
                        <span className="font-medium">${(department.budget / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Projects:</span>
                        <Badge>{department.activeProjects}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Performance</span>
                        <span className="font-medium">{department.avgPerformance}%</span>
                      </div>
                      <Progress value={department.avgPerformance} className="h-2" />
                    </div>

                    {department.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {department.location}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getFilteredDepartments().map((department) => (
                <Card key={department.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleViewDepartmentDetails(department)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: department.color }} 
                    />
                    <h3 className="font-semibold">{department.name}</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Members:</span>
                      <span>{department.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span>{department.activeProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance:</span>
                      <span>{department.avgPerformance}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {getFilteredDepartments().map((department) => (
                    <div key={department.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: department.color }} 
                          />
                          <div>
                            <h3 className="font-semibold">{department.name}</h3>
                            <p className="text-sm text-muted-foreground">{department.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{department.members}</div>
                            <div className="text-muted-foreground">Members</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{department.activeProjects}</div>
                            <div className="text-muted-foreground">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{department.avgPerformance}%</div>
                            <div className="text-muted-foreground">Performance</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">${(department.budget / 1000).toFixed(0)}K</div>
                            <div className="text-muted-foreground">Budget</div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleViewDepartmentDetails(department)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditDepartment(department)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteDepartment(department.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Department Dialog */}
        <Dialog open={isEditDepartmentOpen} onOpenChange={setIsEditDepartmentOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Department Name *</Label>
                <Input
                  id="editName"
                  placeholder="Enter department name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  placeholder="Department description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Department Manager *</Label>
                <Select value={formData.managerId} onValueChange={(value) => setFormData({ ...formData, managerId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editBudget">Budget</Label>
                  <Input
                    id="editBudget"
                    type="number"
                    placeholder="Annual budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input
                    id="editLocation"
                    placeholder="Office location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Department Color</Label>
                <div className="flex gap-2 mt-2">
                  {departmentColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        formData.color === color ? "border-foreground scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData({ ...formData, color })}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateDepartment} className="flex-1">
                  Update Department
                </Button>
                <Button variant="outline" onClick={() => setIsEditDepartmentOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Department Details Dialog */}
        <Dialog open={isDepartmentDetailsOpen} onOpenChange={setIsDepartmentDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedDepartment && (
                  <>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: selectedDepartment.color }} 
                    />
                    {selectedDepartment.name} Department
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            {selectedDepartment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Manager</Label>
                    <p className="mt-1">{selectedDepartment.manager}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Members</Label>
                    <p className="mt-1">{selectedDepartment.members}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="mt-1">${selectedDepartment.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="mt-1">{selectedDepartment.location}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="mt-1 text-muted-foreground">{selectedDepartment.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{selectedDepartment.activeProjects}</div>
                      <div className="text-sm text-muted-foreground">Active Projects</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedDepartment.completedTasks}</div>
                      <div className="text-sm text-muted-foreground">Completed Tasks</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedDepartment.avgPerformance}%</div>
                      <div className="text-sm text-muted-foreground">Avg Performance</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Departments;