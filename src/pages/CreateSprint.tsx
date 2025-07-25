import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Target, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

const CreateSprint = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    capacity: '',
    description: ''
  });

  // Mock project data
  const project = {
    id: projectId || searchParams.get('project') || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.goal || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (endDate <= startDate) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sprint Created",
      description: `${formData.name} has been created successfully`,
    });

    // Navigate to the sprint dashboard
    navigate(`/sprint-dashboard/${project.id}/new-sprint-id`);
  };

  const generateSprintName = () => {
    const sprintNumber = Math.floor(Math.random() * 10) + 1;
    const themes = ['Foundation', 'Core Features', 'Enhancement', 'Polish', 'Integration', 'Testing', 'Performance', 'Security'];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    return `Sprint ${sprintNumber} - ${theme}`;
  };

  const calculateCapacity = () => {
    if (!formData.startDate || !formData.endDate) return '';
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const workingDays = Math.max(0, days - Math.floor(days / 7) * 2); // Rough estimation excluding weekends
    const teamSize = 4; // Assuming average team size
    const hoursPerDay = 6; // Assuming 6 productive hours per day
    
    return (workingDays * teamSize * hoursPerDay).toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="back" onClick={() => navigate(`/project-calendar/${project.id}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Create New Sprint
              </h1>
              <p className="text-muted-foreground mt-1">
                Create a new sprint for {project.name}
              </p>
            </div>
          </div>

          {/* Sprint Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Sprint Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sprint Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Sprint Name *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter sprint name"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleInputChange('name', generateSprintName())}
                    >
                      Generate
                    </Button>
                  </div>
                </div>

                {/* Sprint Goal */}
                <div className="space-y-2">
                  <Label htmlFor="goal">Sprint Goal *</Label>
                  <Textarea
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    placeholder="What is the main goal of this sprint?"
                    rows={3}
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      min={formData.startDate}
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity">Sprint Capacity (hours)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="Total hours available for this sprint"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleInputChange('capacity', calculateCapacity())}
                      disabled={!formData.startDate || !formData.endDate}
                    >
                      Calculate
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This helps with sprint planning and velocity tracking
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Additional details about this sprint (optional)"
                    rows={4}
                  />
                </div>

                {/* Sprint Summary */}
                {formData.startDate && formData.endDate && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Sprint Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div className="text-muted-foreground">
                              {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Capacity</div>
                            <div className="text-muted-foreground">
                              {formData.capacity || 'Not set'} hours
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Project</div>
                            <div className="text-muted-foreground truncate">
                              {project.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Form Actions */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Create Sprint
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(`/project-calendar/${project.id}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateSprint;