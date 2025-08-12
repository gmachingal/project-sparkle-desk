import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, ArrowLeft, Trash2, X, Plus, Target, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import MilestoneManager from '@/components/MilestoneManager';

interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate?: Date;
  endDate?: Date;
  progress: number;
  estimatedDuration: string;
  dependencies?: string[];
  assignee?: string;
}

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock project data - in real app, fetch by ID
  const [projectData, setProjectData] = useState({
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    status: 'active',
    priority: 'high',
    progress: 65,
    dueDate: new Date('2024-03-15'),
    budget: 50000,
    color: '#3B82F6',
    organization: '1'
  });

  const [selectedMembers, setSelectedMembers] = useState(['1', '2', '3']);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { 
      id: '1', 
      name: 'Design Phase', 
      description: 'UI/UX design, wireframes, prototypes, and design system creation', 
      status: 'in-progress',
      priority: 'high',
      startDate: new Date('2024-01-15'), 
      endDate: new Date('2024-02-15'),
      progress: 75,
      estimatedDuration: '2-3 weeks'
    },
    { 
      id: '2', 
      name: 'Development Sprint 1', 
      description: 'Core functionality development and basic features implementation', 
      status: 'planned',
      priority: 'medium',
      startDate: new Date('2024-02-16'), 
      endDate: new Date('2024-03-01'),
      progress: 0,
      estimatedDuration: '3-4 weeks'
    }
  ]);

  const teamMembers = [
    { id: '1', name: 'John Doe', avatar: '', role: 'Project Manager' },
    { id: '2', name: 'Jane Smith', avatar: '', role: 'Designer' },
    { id: '3', name: 'Mike Johnson', avatar: '', role: 'Developer' },
    { id: '4', name: 'Sarah Wilson', avatar: '', role: 'QA Engineer' },
  ];

  const statusOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const organizations = [
    { id: '1', name: 'TechCorp Inc', domain: 'techcorp.com' },
    { id: '2', name: 'StartupHub', domain: 'startuphub.io' },
    { id: '3', name: 'Global Solutions', domain: 'globalsolutions.net' },
    { id: '4', name: 'Innovation Labs', domain: 'innovationlabs.org' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Updated",
      description: "Project has been successfully updated.",
    });
    navigate('/projects');
  };

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleDelete = () => {
    toast({
      title: "Project Deleted",
      description: "Project has been successfully deleted.",
      variant: "destructive"
    });
    navigate('/projects');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold">Edit Project</h1>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    value={projectData.name}
                    onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Organization
                  </label>
                  <Select value={projectData.organization} onValueChange={(value) => setProjectData({...projectData, organization: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select value={projectData.status} onValueChange={(value) => setProjectData({...projectData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={projectData.priority} onValueChange={(value) => setProjectData({...projectData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {projectData.dueDate ? format(projectData.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={projectData.dueDate}
                          onSelect={(date) => date && setProjectData({...projectData, dueDate: date})}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Budget ($)</label>
                    <Input
                      type="number"
                      value={projectData.budget}
                      onChange={(e) => setProjectData({...projectData, budget: Number(e.target.value)})}
                      placeholder="Enter budget"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map(member => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMembers.includes(member.id)
                          ? 'bg-primary/5 border-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => toggleMember(member.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {selectedMembers.includes(member.id) && (
                        <Badge variant="secondary">Assigned</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Milestones Section */}
          <MilestoneManager
            milestones={milestones}
            onMilestonesChange={setMilestones}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => navigate("/projects")}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Update Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;