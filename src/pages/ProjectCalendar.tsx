import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import SprintCard from '@/components/SprintCard';
import SprintTaskManager from '@/components/SprintTaskManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar as CalendarIcon,CalendarRange, List, Users, Filter, Plus, Target,Calendar1, BarChart3, User, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';

const ProjectCalendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'sprints'>('calendar');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  // Mock project data
  const project = {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    status: 'active',
    progress: 65,
    startDate: new Date('2024-01-15'),
    dueDate: new Date('2024-03-15'),
    color: '#3B82F6'
  };

  // Mock team members
  const teamMembers = [
    { id: '1', name: 'John Doe', avatar: '', role: 'Project Manager', color: '#10B981' },
    { id: '2', name: 'Jane Smith', avatar: '', role: 'Designer', color: '#8B5CF6' },
    { id: '3', name: 'Mike Johnson', avatar: '', role: 'Developer', color: '#F59E0B' },
    { id: '4', name: 'Sarah Wilson', avatar: '', role: 'QA Engineer', color: '#EF4444' },
  ];

  // Mock tasks with calendar dates - using current month dates
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const tasks = [
    {
      id: '1',
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for homepage',
      status: 'in-progress',
      priority: 'high',
      assigneeId: '2',
      dueDate: new Date(currentYear, currentMonth, 10),
      startDate: new Date(currentYear, currentMonth, 5),
      estimatedHours: 16
    },
    {
      id: '2',
      title: 'Implement Navigation Menu',
      description: 'Build responsive navigation component',
      status: 'todo',
      priority: 'medium',
      assigneeId: '3',
      dueDate: new Date(currentYear, currentMonth, 15),
      startDate: new Date(currentYear, currentMonth, 12),
      estimatedHours: 8
    },
    {
      id: '3',
      title: 'User Testing Session',
      description: 'Conduct usability testing with 10 users',
      status: 'todo',
      priority: 'high',
      assigneeId: '4',
      dueDate: new Date(currentYear, currentMonth, 20),
      startDate: new Date(currentYear, currentMonth, 18),
      estimatedHours: 12
    },
    {
      id: '4',
      title: 'Database Schema Design',
      description: 'Design and implement new database structure',
      status: 'completed',
      priority: 'high',
      assigneeId: '3',
      dueDate: new Date(currentYear, currentMonth, 8),
      startDate: new Date(currentYear, currentMonth, 1),
      estimatedHours: 20
    },
    {
      id: '5',
      title: 'API Documentation',
      description: 'Write comprehensive API documentation',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '1',
      dueDate: new Date(currentYear, currentMonth, 25),
      startDate: new Date(currentYear, currentMonth, 20),
      estimatedHours: 10
    },
    {
      id: '6',
      title: 'Mobile Responsive Design',
      description: 'Optimize website for mobile devices',
      status: 'todo',
      priority: 'high',
      assigneeId: '2',
      dueDate: new Date(currentYear, currentMonth, 28),
      startDate: new Date(currentYear, currentMonth, 22),
      estimatedHours: 24
    },
    {
      id: '7',
      title: 'Performance Optimization',
      description: 'Improve page load times and overall performance',
      status: 'todo',
      priority: 'medium',
      assigneeId: '3',
      dueDate: new Date(currentYear, currentMonth + 1, 5),
      startDate: new Date(currentYear, currentMonth + 1, 1),
      estimatedHours: 16
    },
    {
      id: '8',
      title: 'SEO Implementation',
      description: 'Implement SEO best practices',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '1',
      dueDate: new Date(currentYear, currentMonth, 14),
      startDate: new Date(currentYear, currentMonth, 10),
      estimatedHours: 12
    },
    {
      id: '9',
      title: 'Content Management System',
      description: 'Set up CMS for content management',
      status: 'todo',
      priority: 'low',
      assigneeId: '4',
      dueDate: new Date(currentYear, currentMonth, 26),
      startDate: new Date(currentYear, currentMonth, 24),
      estimatedHours: 20
    },
    {
      id: '10',
      title: 'Security Audit',
      description: 'Conduct security review and testing',
      status: 'todo',
      priority: 'high',
      assigneeId: '4',
      dueDate: new Date(currentYear, currentMonth + 1, 10),
      startDate: new Date(currentYear, currentMonth + 1, 8),
      estimatedHours: 8
    },
    {
      id: '11',
      title: 'Browser Compatibility Testing',
      description: 'Test across different browsers',
      status: 'completed',
      priority: 'medium',
      assigneeId: '4',
      dueDate: new Date(currentYear, currentMonth, 12),
      startDate: new Date(currentYear, currentMonth, 9),
      estimatedHours: 6
    },
    {
      id: '12',
      title: 'Launch Preparation',
      description: 'Final preparations for website launch',
      status: 'todo',
      priority: 'urgent',
      assigneeId: '1',
      dueDate: new Date(currentYear, currentMonth + 1, 15),
      startDate: new Date(currentYear, currentMonth + 1, 12),
      estimatedHours: 10
    },
    {
      id: '13',
      title: 'Third-party API Integration',
      description: 'Integration blocked due to API key approval delays',
      status: 'blocked',
      priority: 'high',
      assigneeId: '3',
      dueDate: new Date(currentYear, currentMonth, 30),
      startDate: new Date(currentYear, currentMonth, 25),
      estimatedHours: 14
    },
    {
      id: '14',
      title: 'Payment Gateway Setup',
      description: 'Setup blocked pending merchant account verification',
      status: 'blocked',
      priority: 'medium',
      assigneeId: '1',
      dueDate: new Date(currentYear, currentMonth + 1, 8),
      startDate: new Date(currentYear, currentMonth + 1, 5),
      estimatedHours: 12
    }
  ];

  // Mock sprint data
  const sprints = [
    {
      id: '1',
      name: 'Sprint 1 - Foundation',
      goal: 'Set up project foundation and core infrastructure',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      status: 'active' as const,
      progress: 72,
      totalPoints: 34,
      completedPoints: 25,
      taskCount: 7,
      completedTasks: 3,
      projectId: project.id,
      teamMembers: teamMembers
    },
    {
      id: '2', 
      name: 'Sprint 2 - Core Features',
      goal: 'Implement main website features and functionality',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-15'),
      status: 'planning' as const,
      progress: 0,
      totalPoints: 28,
      completedPoints: 0,
      taskCount: 5,
      completedTasks: 0,
      projectId: project.id,
      teamMembers: teamMembers
    }
  ];

  // Convert tasks to the format expected by SprintTaskManager
  const allProjectTasks = tasks.map(task => ({
    ...task,
    status: task.status as 'todo' | 'in-progress' | 'completed',
    priority: task.priority === 'urgent' ? 'high' as const : task.priority as 'low' | 'medium' | 'high',
    projectId: project.id,
    sprintId: undefined // These are backlog tasks by default
  }));

  // Mock sprint data with proper typing
  const allSprints = sprints.map(sprint => ({
    id: sprint.id,
    name: sprint.name,
    status: sprint.status === 'planning' ? 'planned' as const : sprint.status as 'active' | 'completed' | 'planned',
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    projectId: sprint.projectId
  }));

  // Handlers for the SprintTaskManager
  const handleMoveTask = (taskId: string, fromSprintId: string | null, toSprintId: string | null) => {
    toast({
      title: "Task Moved",
      description: `Task has been moved ${toSprintId ? 'to sprint' : 'to backlog'} successfully`,
    });
    // In a real app, this would update the task's sprintId in the database
  };

  const handleAddTaskToSprint = (taskId: string, sprintId: string) => {
    toast({
      title: "Task Added to Sprint", 
      description: "Task has been added to the sprint successfully",
    });
    // In a real app, this would update the task's sprintId in the database
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const memberMatch = selectedMember === 'all' || task.assigneeId === selectedMember;
      const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
      return memberMatch && statusMatch;
    });
  };

  const getTasksForDate = (date: Date) => {
    return getFilteredTasks().filter(task => 
      (task.startDate && isSameDay(task.startDate, date)) ||
      (task.dueDate && isSameDay(task.dueDate, date))
    );
  };

  const getTasksForSelectedDate = () => {
    return getTasksForDate(selectedDate);
  };

  const getAssignee = (assigneeId: string) => {
    return teamMembers.find(member => member.id === assigneeId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50 text-red-700';
      case 'high': return 'border-orange-500 bg-orange-50 text-orange-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calendarStartMonth = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: calendarStartMonth, end: monthEnd });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b backdrop-blur-sm bg-gradient-to-r from-primary/50 via-primary-glow/40 to-primary/50 shadow-2xl shadow-black/30 drop-shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/projects")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Project Calendar</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Team Members</SelectItem>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant={viewMode === 'sprints' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('sprints')}
              >
                <Target className="h-4 w-4 mr-2" />
                Sprints
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Calendar View Options */}
          {viewMode === 'calendar' && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">View:</span>
              <div className="flex bg-muted rounded-md p-1">
                <Button
                  variant={calendarView === 'day' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('day')}
                  className="h-8 gap-2"
                >
                  <Calendar1 className="h-4 w-4 mr-2" />
                  Day
                </Button>
                <Button
                  variant={calendarView === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('week')}
                  className="h-8 gap-2"
                >
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Week
                </Button>
                <Button
                  variant={calendarView === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('month')}
                  className="h-8 gap-2"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Month
                </Button>
              </div>
            </div>
          )}
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list' | 'sprints')}>
          <TabsContent value="sprints" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Project Sprints</h2>
              <div className="flex gap-2">
                <SprintTaskManager
                  projectId={project.id}
                  currentSprintId={undefined}
                  sprints={allSprints}
                  tasks={allProjectTasks}
                  onMoveTask={handleMoveTask}
                  onAddTaskToSprint={handleAddTaskToSprint}
                />
                <Button onClick={() => navigate(`/create-sprint/${project.id}`)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sprint
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sprints.map(sprint => (
                <SprintCard key={sprint.id} sprint={sprint} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Project Calendar - {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)} View
                </CardTitle>
              </CardHeader>
              <CardContent>
                {calendarView === 'month' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{format(selectedDate, 'MMMM yyyy')}</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {format(selectedDate, 'MMM yyyy')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <EnhancedCalendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => date && setSelectedDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDate(new Date())}
                        >
                          Today
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Header */}
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar Days */}
                      {eachDayOfInterval({ 
                        start: startOfMonth(selectedDate), 
                        end: endOfMonth(selectedDate) 
                      }).map(day => {
                        const tasksForDay = getTasksForDate(day);
                        const isToday = isSameDay(day, new Date());
                        const isSelected = isSameDay(day, selectedDate);
                        
                        return (
                          <div 
                            key={day.toISOString()} 
                            className={`p-2 border rounded-lg cursor-pointer hover:bg-muted min-h-24 ${
                              isSelected ? 'bg-primary/10 border-primary' : 
                              isToday ? 'bg-accent border-accent-foreground' : ''
                            }`}
                            onClick={() => setSelectedDate(day)}
                          >
                            <div className="font-medium text-sm mb-1">{format(day, 'd')}</div>
                            <div className="space-y-1 overflow-hidden">
                              {tasksForDay.slice(0, 2).map(task => {
                                const assignee = getAssignee(task.assigneeId);
                                const sprint = sprints.find(s => s.id === '1'); // For demo purposes, assume tasks belong to first sprint
                                return (
                                  <HoverCard key={task.id}>
                                    <HoverCardTrigger asChild>
                                      <div 
                                        className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(task.priority)} truncate cursor-pointer`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/task/${task.id}`);
                                        }}
                                      >
                                        {task.title}
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                      <div className="space-y-3">
                                        <div>
                                          <h4 className="font-semibold">{task.title}</h4>
                                          <p className="text-sm text-muted-foreground">{task.description}</p>
                                        </div>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">Resource: {assignee?.name}</span>
                                          </div>
                                          {task.startDate && (
                                            <div className="flex items-center gap-2">
                                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm">Start: {format(task.startDate, 'MMM dd, yyyy')}</span>
                                            </div>
                                          )}
                                          {task.dueDate && (
                                            <div className="flex items-center gap-2">
                                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm">Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline">{project.name}</Badge>
                                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                            {sprint && <Badge variant="secondary">{sprint.name}</Badge>}
                                          </div>
                                        </div>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                );
                              })}
                              {tasksForDay.length > 2 && (
                                <div className="text-xs text-muted-foreground">+{tasksForDay.length - 2} more</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {calendarView === 'week' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Week of {format(startOfWeek(selectedDate), 'MMM dd')} - {format(endOfWeek(selectedDate), 'MMM dd, yyyy')}
                      </h3>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Week of {format(startOfWeek(selectedDate), 'MMM dd')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <EnhancedCalendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                    </div>
                    
                    {/* Week Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {eachDayOfInterval({ 
                        start: startOfWeek(selectedDate), 
                        end: endOfWeek(selectedDate) 
                      }).map(day => {
                        const tasksForDay = getTasksForDate(day);
                        const isToday = isSameDay(day, new Date());
                        const isSelected = isSameDay(day, selectedDate);
                        
                        return (
                          <div 
                            key={day.toISOString()} 
                            className={`p-3 border rounded-lg cursor-pointer hover:bg-muted min-h-32 ${
                              isSelected ? 'bg-primary/10 border-primary' : 
                              isToday ? 'bg-accent border-accent-foreground' : ''
                            }`}
                            onClick={() => setSelectedDate(day)}
                          >
                            <div className="font-medium text-sm mb-2 flex items-center justify-between">
                              <span>{format(day, 'EEE dd')}</span>
                              {isToday && <Badge variant="outline" className="text-xs">Today</Badge>}
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              {tasksForDay.map(task => {
                                const assignee = getAssignee(task.assigneeId);
                                const sprint = sprints.find(s => s.id === '1'); // For demo purposes, assume tasks belong to first sprint
                                return (
                                  <HoverCard key={task.id}>
                                    <HoverCardTrigger asChild>
                                      <div 
                                        className={`text-xs p-2 rounded border-l-2 ${getPriorityColor(task.priority)} cursor-pointer hover:opacity-80`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/task/${task.id}`);
                                        }}
                                      >
                                        <div className="font-medium truncate">{task.title}</div>
                                        <div className="flex items-center gap-1 mt-1">
                                          <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                                          <span className="text-xs opacity-70">{assignee?.name}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          {task.startDate && `Start: ${format(task.startDate, 'MMM dd')}`}
                                          {task.startDate && task.dueDate && ' • '}
                                          {task.dueDate && `Due: ${format(task.dueDate, 'MMM dd')}`}
                                        </div>
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                      <div className="space-y-3">
                                        <div>
                                          <h4 className="font-semibold">{task.title}</h4>
                                          <p className="text-sm text-muted-foreground">{task.description}</p>
                                        </div>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">Resource: {assignee?.name}</span>
                                          </div>
                                          {task.startDate && (
                                            <div className="flex items-center gap-2">
                                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm">Start: {format(task.startDate, 'MMM dd, yyyy')}</span>
                                            </div>
                                          )}
                                          {task.dueDate && (
                                            <div className="flex items-center gap-2">
                                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-sm">Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline">{project.name}</Badge>
                                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                            {sprint && <Badge variant="secondary">{sprint.name}</Badge>}
                                          </div>
                                        </div>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {calendarView === 'day' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                      </h3>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {format(selectedDate, 'MMM dd, yyyy')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <EnhancedCalendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                      {getTasksForDate(selectedDate).length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">No tasks scheduled for this day</p>
                        </div>
                      ) : (
                        getTasksForDate(selectedDate).map(task => {
                          const assignee = getAssignee(task.assigneeId);
                          const isStartDate = task.startDate && isSameDay(task.startDate, selectedDate);
                          const isDueDate = task.dueDate && isSameDay(task.dueDate, selectedDate);
                          
                          return (
                            <Card 
                              key={task.id}
                              className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(task.priority)}`}
                              onClick={() => navigate(`/task/${task.id}`)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg mb-1">{task.title}</h4>
                                    <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                                    
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={assignee?.avatar} />
                                          <AvatarFallback style={{ backgroundColor: assignee?.color + '20', color: assignee?.color }}>
                                            {assignee?.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{assignee?.name}</span>
                                      </div>
                                      
                                      <Badge className={`${getStatusBgColor(task.status)}`}>
                                        {task.status}
                                      </Badge>
                                      
                                      <Badge variant="outline">{task.priority}</Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <div className="flex gap-4">
                                    {task.startDate && (
                                      <span>Start: {format(task.startDate, 'MMM dd')}</span>
                                    )}
                                    {task.dueDate && (
                                      <span>Due: {format(task.dueDate, 'MMM dd')}</span>
                                    )}
                                    <span>{task.estimatedHours}h estimated</span>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    {isStartDate && (
                                      <Badge variant="outline" className="text-green-600 border-green-600">
                                        Starting Today
                                      </Badge>
                                    )}
                                    {isDueDate && (
                                      <Badge variant="outline" className="text-red-600 border-red-600">
                                        Due Today
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

            <TabsContent value="list" className="space-y-6">
              {/* Team Members Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {teamMembers.map(member => {
                  const memberTasks = getFilteredTasks().filter(task => task.assigneeId === member.id);
                  const completedTasks = memberTasks.filter(task => task.status === 'completed').length;
                  
                  return (
                    <Card key={member.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback style={{ backgroundColor: member.color + '20', color: member.color }}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Total Tasks:</span>
                            <Badge variant="secondary">{memberTasks.length}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Completed:</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {completedTasks}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Tasks List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    All Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getFilteredTasks().map(task => {
                      const assignee = getAssignee(task.assigneeId);
                      
                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} bg-card hover:bg-muted/50 cursor-pointer transition-colors`}
                          onClick={() => navigate(`/task/${task.id}`)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                            <Badge
                              className={`${getStatusBgColor(task.status)}`}
                            >
                              {task.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={assignee?.avatar} />
                                <AvatarFallback style={{ backgroundColor: assignee?.color + '20', color: assignee?.color }}>
                                  {assignee?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{assignee?.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {task.startDate && (
                                <span>Start: {format(task.startDate, 'MMM dd')}</span>
                              )}
                              {task.dueDate && (
                                <span>Due: {format(task.dueDate, 'MMM dd')}</span>
                              )}
                              <Badge variant="outline">{task.priority}</Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  );
};

export default ProjectCalendar;