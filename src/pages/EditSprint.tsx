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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Target, Calendar, Clock, Users, Edit, Trash2, Save, CalendarIcon, BarChart3, AlertTriangle, Settings, Sparkles, Zap } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

const EditSprint = () => {
  const navigate = useNavigate();
  const { projectId, sprintId } = useParams();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>(new Date('2024-01-15'));
  const [endDate, setEndDate] = useState<Date>(new Date('2024-01-29'));

  // Mock sprint data
  const [formData, setFormData] = useState({
    name: 'Sprint 1 - Foundation',
    goal: 'Set up project foundation and core infrastructure',
    capacity: '120',
    description: 'This sprint focuses on establishing the technical foundation of the project including repository setup, design system basics, and core infrastructure.',
    status: 'active',
    sprintType: 'standard',
    velocity: '34',
    teamMembers: ['1', '2', '3']
  });

  // Mock project data
  const project = {
    id: projectId || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    color: '#8B5CF6'
  };

  // Mock sprint stats
  const sprint = {
    id: sprintId || '1',
    totalPoints: 34,
    completedPoints: 25,
    remainingPoints: 9,
    progress: 72,
    tasksTotal: 7,
    tasksCompleted: 3,
    tasksInProgress: 2,
    tasksTodo: 2,
    burndownTrend: 'on-track' // 'ahead', 'on-track', 'behind'
  };

  // Mock team members
  const teamMembers = [
    { id: "1", name: "Sarah Chen", role: "Frontend Dev", email: "sarah@company.com", capacity: "8h/day", utilization: 85 },
    { id: "2", name: "Mike Johnson", role: "Backend Dev", email: "mike@company.com", capacity: "6h/day", utilization: 90 },
    { id: "3", name: "Emily Davis", role: "UI/UX Designer", email: "emily@company.com", capacity: "7h/day", utilization: 75 },
    { id: "4", name: "Alex Kim", role: "QA Engineer", email: "alex@company.com", capacity: "8h/day", utilization: 60 },
    { id: "5", name: "David Liu", role: "DevOps", email: "david@company.com", capacity: "5h/day", utilization: 95 }
  ];

  const sprintTypes = [
    { id: 'standard', name: 'Standard Sprint', description: 'Regular development sprint', icon: Target },
    { id: 'planning', name: 'Planning Sprint', description: 'Focus on planning and requirements', icon: Calendar },
    { id: 'innovation', name: 'Innovation Sprint', description: 'Experimental features and POCs', icon: Sparkles },
    { id: 'release', name: 'Release Sprint', description: 'Bug fixes and release preparation', icon: Zap }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleTeamMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter(id => id !== memberId)
        : [...prev.teamMembers, memberId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.goal || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (endDate <= startDate) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sprint Updated!",
      description: `"${formData.name}" has been updated successfully.`,
      variant: "default"
    });

    setTimeout(() => {
      navigate(`/sprint-dashboard/${projectId}/${sprintId}`);
    }, 1500);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this sprint? This action cannot be undone.')) {
      toast({
        title: "Sprint Deleted",
        description: `${formData.name} has been deleted`,
        variant: "destructive"
      });
      navigate(`/project-calendar/${projectId}`);
    }
  };

  const daysRemaining = differenceInDays(endDate, new Date());
  const sprintDuration = differenceInDays(endDate, startDate);
  const assignedMembers = teamMembers.filter(member => formData.teamMembers.includes(member.id));

  const getBurndownColor = () => {
    switch (sprint.burndownTrend) {
      case 'ahead': return 'text-green-600';
      case 'behind': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Edit Sprint"
        subtitle={`for ${project.name}`}
        backButton={true}
        actionButton={{
          label: "Save Changes", 
          icon: Save,
          onClick: () => handleSubmit({ preventDefault: () => {} } as React.FormEvent),
          variant: "default"
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sprint Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Sprint Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Sprint Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter sprint name..."
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          Planning
                        </div>
                      </SelectItem>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Completed
                        </div>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          Cancelled
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goal">Sprint Goal *</Label>
                  <Textarea
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    placeholder="What is the main objective of this sprint?"
                    rows={3}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Additional details about this sprint..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <EnhancedCalendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <EnhancedCalendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => startDate ? date < startDate : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sprint Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Sprint Type</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {sprintTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={cn(
                            "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                            formData.sprintType === type.id ? "border-primary bg-primary/5" : "border-border"
                          )}
                          onClick={() => handleInputChange('sprintType', type.id)}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-4 h-4 text-primary" />
                            <div>
                              <div className="font-medium text-sm">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="capacity">Sprint Capacity (hours)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Total hours"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="velocity">Estimated Velocity</Label>
                  <Input
                    id="velocity"
                    type="number"
                    value={formData.velocity}
                    onChange={(e) => handleInputChange('velocity', e.target.value)}
                    placeholder="Story points per sprint"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Team Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className={cn(
                        "flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm",
                        formData.teamMembers.includes(member.id) ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => toggleTeamMember(member.id)}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          {member.capacity}
                          <span className={cn(
                            "text-xs",
                            member.utilization > 90 ? "text-red-600" : 
                            member.utilization > 80 ? "text-yellow-600" : "text-green-600"
                          )}>
                            {member.utilization}% util
                          </span>
                        </div>
                      </div>
                      {formData.teamMembers.includes(member.id) && (
                        <Badge variant="secondary" className="text-xs">
                          Assigned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground pt-2 border-t">
                  {formData.teamMembers.length} member{formData.teamMembers.length !== 1 ? 's' : ''} assigned
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sprint Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-4 h-4" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Story Points</span>
                    <span className="text-sm font-medium">{sprint.completedPoints}/{sprint.totalPoints}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(sprint.completedPoints / sprint.totalPoints) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((sprint.completedPoints / sprint.totalPoints) * 100)}% complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{sprintDuration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <Badge variant={daysRemaining > 5 ? 'default' : daysRemaining > 0 ? 'secondary' : 'destructive'}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Ended'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Trend</span>
                    <span className={cn("text-sm font-medium", getBurndownColor())}>
                      {sprint.burndownTrend === 'ahead' && '↗ Ahead'}
                      {sprint.burndownTrend === 'on-track' && '→ On Track'}
                      {sprint.burndownTrend === 'behind' && '↘ Behind'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-4 h-4" />
                  Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-sm font-medium">{sprint.tasksTotal}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{sprint.tasksCompleted}</div>
                      <div className="text-xs text-muted-foreground">Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{sprint.tasksInProgress}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-600">{sprint.tasksTodo}</div>
                      <div className="text-xs text-muted-foreground">Todo</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="w-4 h-4" />
                  Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formData.capacity}h</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Team</span>
                      <span className="font-medium">{assignedMembers.length} members</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Velocity</span>
                      <span className="font-medium">{formData.velocity} pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSprint;