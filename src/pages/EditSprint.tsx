import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Target, Calendar, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

const EditSprint = () => {
  const navigate = useNavigate();
  const { projectId, sprintId } = useParams();
  const { toast } = useToast();

  // Mock sprint data
  const [formData, setFormData] = useState({
    name: 'Sprint 1 - Foundation',
    goal: 'Set up project foundation and core infrastructure',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    capacity: '120',
    description: 'This sprint focuses on establishing the technical foundation of the project including repository setup, design system basics, and core infrastructure.',
    status: 'active'
  });

  // Mock project data
  const project = {
    id: projectId || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX'
  };

  const sprint = {
    id: sprintId || '1',
    totalPoints: 34,
    completedPoints: 25,
    remainingPoints: 9,
    progress: 72,
    tasksTotal: 7,
    tasksCompleted: 3,
    tasksInProgress: 2,
    tasksTodo: 2
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
      title: "Sprint Updated",
      description: `${formData.name} has been updated successfully`,
    });

    // Navigate back to sprint dashboard
    navigate(`/sprint-dashboard/${projectId}/${sprintId}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this sprint? This action cannot be undone.')) {
      toast({
        title: "Sprint Deleted",
        description: `${formData.name} has been deleted`,
      });
      navigate(`/project-calendar/${projectId}`);
    }
  };

  const daysRemaining = differenceInDays(new Date(formData.endDate), new Date());
  const sprintDuration = differenceInDays(new Date(formData.endDate), new Date(formData.startDate));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="back" onClick={() => navigate(`/sprint-dashboard/${projectId}/${sprintId}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sprint
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Edit Sprint
                </h1>
                <p className="text-muted-foreground mt-1">
                  Modify sprint details for {project.name}
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Sprint
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sprint Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Sprint Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sprint Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Sprint Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter sprint name"
                      />
                    </div>

                    {/* Sprint Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="Total hours available for this sprint"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Additional details about this sprint"
                        rows={4}
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate(`/sprint-dashboard/${projectId}/${sprintId}`)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sprint Overview Sidebar */}
            <div className="space-y-6">
              {/* Sprint Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Sprint Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{sprint.completedPoints}</div>
                      <div className="text-xs text-muted-foreground">Points Done</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{sprint.remainingPoints}</div>
                      <div className="text-xs text-muted-foreground">Points Left</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Story Points Progress</span>
                      <span>{Math.round((sprint.completedPoints / sprint.totalPoints) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sprint Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Start Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(formData.startDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">End Date</span>
                      <span className="text-sm font-medium">
                        {format(new Date(formData.endDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="text-sm font-medium">{sprintDuration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Days Remaining</span>
                      <Badge variant={daysRemaining > 5 ? 'default' : daysRemaining > 0 ? 'secondary' : 'destructive'}>
                        {daysRemaining > 0 ? `${daysRemaining} days` : 'Ended'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Task Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Tasks</span>
                      <span className="text-sm font-medium">{sprint.tasksTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {sprint.tasksCompleted}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">In Progress</span>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {sprint.tasksInProgress}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">To Do</span>
                      <Badge variant="secondary">
                        {sprint.tasksTodo}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Capacity Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Capacity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formData.capacity}h</div>
                    <div className="text-sm text-muted-foreground">Total Capacity</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSprint;