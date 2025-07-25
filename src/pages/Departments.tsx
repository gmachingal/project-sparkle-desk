import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, MoreVertical, Users, Edit, Trash2 } from 'lucide-react';

const Departments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const [departments, setDepartments] = useState([
    {
      id: '1',
      name: 'Engineering',
      description: 'Software development and technical architecture',
      manager: { name: 'John Doe', avatar: '', id: '1' },
      memberCount: 12,
      budget: 500000,
      location: 'Building A, Floor 3',
      status: 'active'
    },
    {
      id: '2',
      name: 'Design',
      description: 'UI/UX design and creative direction',
      manager: { name: 'Jane Smith', avatar: '', id: '2' },
      memberCount: 8,
      budget: 300000,
      location: 'Building A, Floor 2',
      status: 'active'
    },
    {
      id: '3',
      name: 'Marketing',
      description: 'Brand management and customer acquisition',
      manager: { name: 'Mike Johnson', avatar: '', id: '3' },
      memberCount: 15,
      budget: 400000,
      location: 'Building B, Floor 1',
      status: 'active'
    },
    {
      id: '4',
      name: 'Human Resources',
      description: 'Talent acquisition and employee relations',
      manager: { name: 'Sarah Wilson', avatar: '', id: '4' },
      memberCount: 6,
      budget: 200000,
      location: 'Building A, Floor 1',
      status: 'active'
    }
  ]);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    managerId: '',
    budget: '',
    location: ''
  });

  const managers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Wilson' },
    { id: '5', name: 'David Brown' }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const manager = managers.find(m => m.id === newDepartment.managerId);
    const department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      description: newDepartment.description,
      manager: { name: manager?.name || '', avatar: '', id: newDepartment.managerId },
      memberCount: 0,
      budget: parseInt(newDepartment.budget),
      location: newDepartment.location,
      status: 'active'
    };
    
    setDepartments([...departments, department]);
    setNewDepartment({ name: '', description: '', managerId: '', budget: '', location: '' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Department Created",
      description: `${department.name} has been successfully created.`,
    });
  };

  const handleEditDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const manager = managers.find(m => m.id === newDepartment.managerId);
    const updatedDepartments = departments.map(dept =>
      dept.id === selectedDepartment?.id
        ? {
            ...dept,
            name: newDepartment.name,
            description: newDepartment.description,
            manager: { name: manager?.name || '', avatar: '', id: newDepartment.managerId },
            budget: parseInt(newDepartment.budget),
            location: newDepartment.location
          }
        : dept
    );
    
    setDepartments(updatedDepartments);
    setNewDepartment({ name: '', description: '', managerId: '', budget: '', location: '' });
    setIsEditDialogOpen(false);
    setSelectedDepartment(null);
    
    toast({
      title: "Department Updated",
      description: `Department has been successfully updated.`,
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    const updatedDepartments = departments.filter(dept => dept.id !== departmentId);
    setDepartments(updatedDepartments);
    
    toast({
      title: "Department Deleted",
      description: "Department has been successfully deleted.",
      variant: "destructive"
    });
  };

  const openEditDialog = (department: any) => {
    setSelectedDepartment(department);
    setNewDepartment({
      name: department.name,
      description: department.description,
      managerId: department.manager.id,
      budget: department.budget.toString(),
      location: department.location
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Departments</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Department
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Department</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateDepartment} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Department Name</label>
                    <Input
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      placeholder="Enter department name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Manager</label>
                    <select
                      value={newDepartment.managerId}
                      onChange={(e) => setNewDepartment({...newDepartment, managerId: e.target.value})}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Manager</option>
                      {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>{manager.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Budget</label>
                    <Input
                      type="number"
                      value={newDepartment.budget}
                      onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                      placeholder="Enter budget"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newDepartment.location}
                      onChange={(e) => setNewDepartment({...newDepartment, location: e.target.value})}
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Create Department</Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map(department => (
            <Card key={department.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(department)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteDepartment(department.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground">{department.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={department.manager.avatar} />
                    <AvatarFallback>
                      {department.manager.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{department.manager.name}</p>
                    <p className="text-xs text-muted-foreground">Department Manager</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Members
                    </span>
                    <Badge variant="secondary">{department.memberCount}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Budget</span>
                    <span className="font-medium">${department.budget.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Location</span>
                    <span className="text-muted-foreground">{department.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Status</span>
                    <Badge variant={department.status === 'active' ? 'default' : 'secondary'}>
                      {department.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No departments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Get started by creating your first department'}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Department
            </Button>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditDepartment} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Department Name</label>
                <Input
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Manager</label>
                <select
                  value={newDepartment.managerId}
                  onChange={(e) => setNewDepartment({...newDepartment, managerId: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Manager</option>
                  {managers.map(manager => (
                    <option key={manager.id} value={manager.id}>{manager.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Budget</label>
                <Input
                  type="number"
                  value={newDepartment.budget}
                  onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                  placeholder="Enter budget"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={newDepartment.location}
                  onChange={(e) => setNewDepartment({...newDepartment, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Update Department</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Departments;