import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Target, Users, Clock, Save, Plus, CalendarIcon, Zap, Settings, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CreateSprint = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    capacity: '',
    description: '',
    teamMembers: [] as string[],
    sprintType: 'standard',
    velocity: ''
  });

  // Mock project data
  const project = {
    id: projectId || searchParams.get('project') || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    color: '#8B5CF6'
  };

  // Mock team members
  const teamMembers = [
    { id: "1", name: "Sarah Chen", role: "Frontend Dev", email: "sarah@company.com", capacity: "8h/day" },
    { id: "2", name: "Mike Johnson", role: "Backend Dev", email: "mike@company.com", capacity: "6h/day" },
    { id: "3", name: "Emily Davis", role: "UI/UX Designer", email: "emily@company.com", capacity: "7h/day" },
    { id: "4", name: "Alex Kim", role: "QA Engineer", email: "alex@company.com", capacity: "8h/day" },
    { id: "5", name: "David Liu", role: "DevOps", email: "david@company.com", capacity: "5h/day" }
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

  const generateSprintName = () => {
    const sprintNumber = Math.floor(Math.random() * 10) + 1;
    const themes = ['Foundation', 'Core Features', 'Enhancement', 'Polish', 'Integration', 'Testing', 'Performance', 'Security'];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    return `Sprint ${sprintNumber} - ${theme}`;
  };

  const calculateCapacity = () => {
    if (!startDate || !endDate || formData.teamMembers.length === 0) return '';
    
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const workingDays = Math.max(0, days - Math.floor(days / 7) * 2);
    
    const selectedMembers = teamMembers.filter(member => formData.teamMembers.includes(member.id));
    const totalDailyCapacity = selectedMembers.reduce((total, member) => {
      const hours = parseInt(member.capacity.split('h')[0]);
      return total + hours;
    }, 0);
    
    return (workingDays * totalDailyCapacity).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.goal || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including dates.",
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
      title: "Sprint Created!",
      description: `"${formData.name}" has been created successfully.`,
      variant: "default"
    });

    setTimeout(() => {
      navigate(`/sprint-dashboard/${project.id}/new-sprint-id`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Create Sprint"
        subtitle={`for ${project.name}`}
        backButton={true}
        actionButton={{
          label: "Create Sprint",
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
                  <Target className="w-5 h-5" />
                  Sprint Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Sprint Name *</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter sprint name..."
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('name', generateSprintName())}
                    >
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </div>
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
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="Total hours"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('capacity', calculateCapacity())}
                      disabled={!startDate || !endDate || formData.teamMembers.length === 0}
                    >
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Auto-calculate based on team and dates
                  </p>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on team's historical performance
                  </p>
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
                        <div className="text-xs text-muted-foreground">{member.capacity}</div>
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

          {/* Sprint Summary */}
          {startDate && endDate && (
            <Card className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Sprint Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-muted-foreground">
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Team Size</div>
                      <div className="text-muted-foreground">
                        {formData.teamMembers.length} member{formData.teamMembers.length !== 1 ? 's' : ''}
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
                    <Target className="h-4 w-4 text-muted-foreground" />
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
        </form>
      </div>
    </div>
  );
};

export default CreateSprint;