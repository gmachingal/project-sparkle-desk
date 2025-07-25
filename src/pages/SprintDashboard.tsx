import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SprintTaskManager from '@/components/SprintTaskManager';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar as CalendarIcon, List, Users, Filter, Plus, Edit, BarChart3, Target, Clock, TrendingUp, CheckCircle, MoreVertical, Settings, User, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addDays, differenceInDays } from 'date-fns';

const SprintDashboard = () => {
  const { projectId, sprintId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'board'>('calendar');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('week');

  // Mock project data
  const project = {
    id: projectId || '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved UX',
    status: 'active',
    progress: 65,
    color: '#3B82F6'
  };

  // Mock sprint data
  const sprint = {
    id: sprintId || '1',
    name: 'Sprint 1 - Foundation',
    goal: 'Set up project foundation and core infrastructure',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-29'),
    status: 'active',
    progress: 72,
    capacity: 120,
    totalPoints: 34,
    completedPoints: 25,
    remainingPoints: 9
  };

  // Mock team members
  const teamMembers = [
    { id: '1', name: 'John Doe', avatar: '', role: 'Project Manager', color: '#10B981' },
    { id: '2', name: 'Jane Smith', avatar: '', role: 'Designer', color: '#8B5CF6' },
    { id: '3', name: 'Mike Johnson', avatar: '', role: 'Developer', color: '#F59E0B' },
    { id: '4', name: 'Sarah Wilson', avatar: '', role: 'QA Engineer', color: '#EF4444' },
  ];

  // Mock sprint tasks - using current month dates
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const sprintTasks = [
    {
      id: '1',
      title: 'Setup Project Repository',
      description: 'Initialize Git repository and basic project structure',
      status: 'completed',
      priority: 'high',
      assigneeId: '3',
      storyPoints: 3,
      dueDate: new Date(currentYear, currentMonth, 5),
      startDate: new Date(currentYear, currentMonth, 2),
      estimatedHours: 8,
      loggedHours: 6
    },
    {
      id: '2',
      title: 'Design System Foundation',
      description: 'Create color palette, typography, and basic components',
      status: 'completed',
      priority: 'high',
      assigneeId: '2',
      storyPoints: 8,
      dueDate: new Date(currentYear, currentMonth, 8),
      startDate: new Date(currentYear, currentMonth, 4),
      estimatedHours: 16,
      loggedHours: 14
    },
    {
      id: '3',
      title: 'Database Schema Design',
      description: 'Design and implement new database structure',
      status: 'completed',
      priority: 'high',
      assigneeId: '3',
      storyPoints: 5,
      dueDate: new Date(currentYear, currentMonth, 12),
      startDate: new Date(currentYear, currentMonth, 8),
      estimatedHours: 12,
      loggedHours: 10
    },
    {
      id: '4',
      title: 'Authentication System',
      description: 'Implement user authentication and authorization',
      status: 'in-progress',
      priority: 'high',
      assigneeId: '3',
      storyPoints: 8,
      dueDate: new Date(currentYear, currentMonth, 18),
      startDate: new Date(currentYear, currentMonth, 14),
      estimatedHours: 20,
      loggedHours: 12
    },
    {
      id: '5',
      title: 'Homepage Wireframes',
      description: 'Create wireframes for homepage layout',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '2',
      storyPoints: 5,
      dueDate: new Date(currentYear, currentMonth, 20),
      startDate: new Date(currentYear, currentMonth, 16),
      estimatedHours: 10,
      loggedHours: 6
    },
    {
      id: '6',
      title: 'API Documentation Setup',
      description: 'Set up API documentation framework',
      status: 'todo',
      priority: 'medium',
      assigneeId: '1',
      storyPoints: 3,
      dueDate: new Date(currentYear, currentMonth, 25),
      startDate: new Date(currentYear, currentMonth, 22),
      estimatedHours: 6,
      loggedHours: 0
    },
    {
      id: '7',
      title: 'Testing Framework Setup',
      description: 'Configure unit and integration testing',
      status: 'todo',
      priority: 'medium',
      assigneeId: '4',
      storyPoints: 5,
      dueDate: new Date(currentYear, currentMonth, 28),
      startDate: new Date(currentYear, currentMonth, 25),
      estimatedHours: 8,
      loggedHours: 0
    }
  ];

  // Mock all sprints in the project
  const allSprints = [
    {
      id: '1',
      name: 'Sprint 1 - Foundation',
      status: 'active' as const,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      projectId: projectId || '1'
    },
    {
      id: '2', 
      name: 'Sprint 2 - Core Features',
      status: 'planned' as const,
      startDate: new Date('2024-01-30'),
      endDate: new Date('2024-02-13'),
      projectId: projectId || '1'
    },
    {
      id: '3',
      name: 'Sprint 3 - Polish & Testing',
      status: 'planned' as const,
      startDate: new Date('2024-02-14'),
      endDate: new Date('2024-02-28'),
      projectId: projectId || '1'
    }
  ];

  // Mock all project tasks (including backlog tasks)
  const allProjectTasks = [
    // Current sprint tasks (with sprintId) - fixing type compatibility
    ...sprintTasks.map(task => ({ 
      ...task, 
      sprintId: sprintId, 
      projectId: projectId || '1',
      status: task.status as 'todo' | 'in-progress' | 'completed',
      priority: task.priority as 'low' | 'medium' | 'high'
    })),
    // Backlog tasks (without sprintId)
    {
      id: '8',
      title: 'Performance Optimization',
      description: 'Optimize application performance and loading times',
      status: 'todo' as const,
      priority: 'medium' as const,
      assigneeId: '3',
      storyPoints: 5,
      dueDate: new Date('2024-02-05'),
      projectId: projectId || '1'
    },
    {
      id: '9',
      title: 'Mobile Responsive Design',
      description: 'Ensure all pages work well on mobile devices',
      status: 'todo' as const,
      priority: 'high' as const,
      assigneeId: '2',
      storyPoints: 8,
      dueDate: new Date('2024-02-10'),
      projectId: projectId || '1'
    },
    {
      id: '10',
      title: 'User Profile Management',
      description: 'Allow users to edit their profiles and preferences',
      status: 'todo' as const,
      priority: 'medium' as const,
      assigneeId: '3',
      storyPoints: 6,
      dueDate: new Date('2024-02-15'),
      projectId: projectId || '1'
    },
    {
      id: '11',
      title: 'Email Notifications',
      description: 'Set up email notification system for important events',
      status: 'todo' as const,
      priority: 'low' as const,
      assigneeId: '1',
      storyPoints: 4,
      dueDate: new Date('2024-02-20'),
      projectId: projectId || '1'
    },
    {
      id: '12',
      title: 'Advanced Search Functionality',
      description: 'Implement advanced search with filters and sorting',
      status: 'todo' as const,
      priority: 'medium' as const,
      assigneeId: '3',
      storyPoints: 7,
      dueDate: new Date('2024-02-25'),
      projectId: projectId || '1'
    }
  ];

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

  const handleCloseSprint = () => {
    toast({
      title: "Sprint Closed",
      description: `${sprint.name} has been successfully closed and marked as completed.`,
    });
    // In a real app, this would update the sprint status in the database and trigger sprint retrospective workflow
    // navigate(`/project-calendar/${projectId}`);
  };

  const getFilteredTasks = () => {
    return sprintTasks.filter(task => {
      const memberMatch = selectedMember === 'all' || task.assigneeId === selectedMember;
      const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
      return memberMatch && statusMatch;
    });
  };

  const getTasksForDate = (date: Date) => {
    return getFilteredTasks().filter(task => {
      // Show task if the date falls between start and due date, or matches either
      if (task.startDate && task.dueDate) {
        return date >= task.startDate && date <= task.dueDate;
      }
      // Show task if it matches start date (when no due date)
      if (task.startDate && !task.dueDate) {
        return isSameDay(task.startDate, date);
      }
      // Show task if it matches due date (when no start date)
      if (!task.startDate && task.dueDate) {
        return isSameDay(task.dueDate, date);
      }
      // For tasks with no dates, don't show in calendar
      return false;
    });
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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const daysRemaining = differenceInDays(sprint.endDate, new Date());
  const sprintDuration = differenceInDays(sprint.endDate, sprint.startDate);
  const daysPassed = sprintDuration - daysRemaining;
  const timeProgress = (daysPassed / sprintDuration) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button - Separate Section */}
        <div className="pb-4 mb-6 border-b border-border">
          <Button variant="ghost" onClick={() => navigate(`/project-calendar/${projectId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Button>
        </div>
        
        {/* Header Section */}
        <div className="mb-8">
          {/* Title and Actions */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {sprint.name}
                </h1>
                <Badge variant="outline" className="text-sm">
                  {format(sprint.startDate, 'MMM dd')} - {format(sprint.endDate, 'MMM dd')}
                </Badge>
                <Badge 
                  variant={sprint.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {sprint.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{sprint.goal}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {project.name} • {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Sprint ended'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate(`/create-task?project=${projectId}&sprint=${sprintId}`)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              
              {/* Close Sprint Button - Standing Out */}
              {sprint.status === 'active' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="bg-orange-600 hover:bg-orange-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Close Sprint
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Close Sprint</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to close "{sprint.name}"? This will mark the sprint as completed and you won't be able to add new tasks to it.
                        <br /><br />
                        <strong>Sprint Summary:</strong>
                        <br />• Completed: {sprint.completedPoints}/{sprint.totalPoints} story points ({Math.round((sprint.completedPoints / sprint.totalPoints) * 100)}%)
                        <br />• Tasks: {sprintTasks.filter(t => t.status === 'completed').length}/{sprintTasks.length} completed
                        <br />• Remaining tasks will be moved to backlog
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCloseSprint} className="bg-orange-600 hover:bg-orange-700">
                        Close Sprint
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Actions
                    <MoreVertical className="h-3 w-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
                  <DropdownMenuItem onClick={() => navigate(`/edit-sprint/${projectId}/${sprintId}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Sprint
                  </DropdownMenuItem>
                  
                  <SprintTaskManager
                    projectId={projectId || '1'}
                    currentSprintId={sprintId}
                    sprints={allSprints}
                    tasks={allProjectTasks}
                    onMoveTask={handleMoveTask}
                    onAddTaskToSprint={handleAddTaskToSprint}
                    asDropdownItem={true}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Sprint Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sprint.completedPoints}/{sprint.totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Story Points</div>
                  </div>
                </div>
                <Progress value={(sprint.completedPoints / sprint.totalPoints) * 100} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round(timeProgress)}%</div>
                    <div className="text-sm text-muted-foreground">Time Progress</div>
                  </div>
                </div>
                <Progress value={timeProgress} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sprint.progress}%</div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                  </div>
                </div>
                <Progress value={sprint.progress} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sprintTasks.filter(t => t.status === 'completed').length}</div>
                    <div className="text-sm text-muted-foreground">Tasks Done</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {sprintTasks.length} total tasks
                </div>
              </CardContent>
            </Card>
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
                variant={viewMode === 'board' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('board')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Board
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
                  className="h-8"
                >
                  Day
                </Button>
                <Button
                  variant={calendarView === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('week')}
                  className="h-8"
                >
                  Week
                </Button>
                <Button
                  variant={calendarView === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('month')}
                  className="h-8"
                >
                  Month
                </Button>
              </div>
            </div>
          )}
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list' | 'board')}>
          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Sprint Calendar - {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)} View
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
                              <Calendar
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
                         const isInSprint = day >= sprint.startDate && day <= sprint.endDate;
                         
                         return (
                           <div 
                             key={day.toISOString()} 
                             className={`p-2 border rounded-lg cursor-pointer hover:bg-muted min-h-24 ${
                               isSelected ? 'bg-primary/10 border-primary' : 
                               isToday ? 'bg-accent border-accent-foreground' : 
                               !isInSprint ? 'opacity-50 bg-muted/50' : ''
                             }`}
                             onClick={() => setSelectedDate(day)}
                           >
                             <div className="font-medium text-sm mb-1 flex items-center justify-between">
                               <span>{format(day, 'd')}</span>
                               {isToday && <Badge variant="outline" className="text-xs">Today</Badge>}
                             </div>
                              <div className="space-y-1 overflow-hidden">
                                {tasksForDay.slice(0, 2).map(task => {
                                  const assignee = getAssignee(task.assigneeId);
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
                                      <HoverCardContent className="w-80">
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
                                              <Badge variant="outline">{sprint.name}</Badge>
                                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                              <Badge variant="secondary">{task.storyPoints} SP</Badge>
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
                              <Calendar
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
                         const isInSprint = day >= sprint.startDate && day <= sprint.endDate;
                         
                         return (
                           <div 
                             key={day.toISOString()} 
                             className={`p-3 border rounded-lg cursor-pointer hover:bg-muted min-h-32 ${
                               isSelected ? 'bg-primary/10 border-primary' : 
                               isToday ? 'bg-accent border-accent-foreground' : 
                               !isInSprint ? 'opacity-50 bg-muted/50' : ''
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
                                      <HoverCardContent className="w-80">
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
                                              <Badge variant="outline">{sprint.name}</Badge>
                                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                              <Badge variant="secondary">{task.storyPoints} SP</Badge>
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
            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {format(selectedDate, 'MMM dd, yyyy')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
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
                            <ChevronLeft className="h-4 w-4" />
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
                                 <div className="flex items-start justify-between">
                                   <div className="flex-1">
                                     <h4 className="font-medium mb-1">{task.title}</h4>
                                     <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                     <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                       <span className={`px-2 py-1 rounded-full ${getStatusBadgeColor(task.status)}`}>
                                         {task.status.replace('-', ' ')}
                                       </span>
                                       <span>{task.storyPoints} SP</span>
                                       <span>{task.estimatedHours}h estimated</span>
                                       {isStartDate && <Badge variant="outline" className="text-green-600">Start Date</Badge>}
                                       {isDueDate && <Badge variant="outline" className="text-red-600">Due Date</Badge>}
                                     </div>
                                   </div>
                                   <div className="flex items-center gap-2 ml-4">
                                     <Avatar className="h-8 w-8">
                                       <AvatarImage src={assignee?.avatar} />
                                       <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                         {assignee?.name.split(' ').map(n => n[0]).join('')}
                                       </AvatarFallback>
                                     </Avatar>
                                     <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                       {task.priority}
                                     </Badge>
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

                {/* Month and Day views would be similar to Project Calendar */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Board View (Kanban) */}
          <TabsContent value="board" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Sprint Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* To Do Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">To Do</h3>
                      <Badge variant="secondary">{sprintTasks.filter(t => t.status === 'todo').length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {getFilteredTasks().filter(task => task.status === 'todo').map(task => {
                        const assignee = getAssignee(task.assigneeId);
                        return (
                          <Card 
                            key={task.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate(`/task/${task.id}`)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <Badge variant="outline" className="text-xs">{task.storyPoints}pt</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs" style={{ backgroundColor: assignee?.color }}>
                                      {assignee?.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{assignee?.name}</span>
                                </div>
                                <Badge 
                                  variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">In Progress</h3>
                      <Badge variant="secondary">{sprintTasks.filter(t => t.status === 'in-progress').length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {getFilteredTasks().filter(task => task.status === 'in-progress').map(task => {
                        const assignee = getAssignee(task.assigneeId);
                        return (
                          <Card 
                            key={task.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow border-blue-200"
                            onClick={() => navigate(`/task/${task.id}`)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <Badge variant="outline" className="text-xs">{task.storyPoints}pt</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                              <div className="mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{Math.round((task.loggedHours / task.estimatedHours) * 100)}%</span>
                                </div>
                                <Progress value={(task.loggedHours / task.estimatedHours) * 100} className="h-2" />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs" style={{ backgroundColor: assignee?.color }}>
                                      {assignee?.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{assignee?.name}</span>
                                </div>
                                <Badge 
                                  variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Done</h3>
                      <Badge variant="secondary">{sprintTasks.filter(t => t.status === 'completed').length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {getFilteredTasks().filter(task => task.status === 'completed').map(task => {
                        const assignee = getAssignee(task.assigneeId);
                        return (
                          <Card 
                            key={task.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow border-green-200"
                            onClick={() => navigate(`/task/${task.id}`)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm line-through opacity-75">{task.title}</h4>
                                <Badge variant="outline" className="text-xs">{task.storyPoints}pt</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2 opacity-75">{task.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs" style={{ backgroundColor: assignee?.color }}>
                                      {assignee?.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{assignee?.name}</span>
                                </div>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  Completed
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Sprint Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFilteredTasks().map(task => {
                    const assignee = getAssignee(task.assigneeId);
                    return (
                      <div 
                        key={task.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => navigate(`/task/${task.id}`)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through opacity-75' : ''}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback style={{ backgroundColor: assignee?.color }}>
                                {assignee?.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{assignee?.name}</span>
                          </div>
                          <Badge variant="outline" className="min-w-[60px] text-center">{task.storyPoints}pt</Badge>
                          <Badge className={`min-w-[80px] text-center ${getStatusBadgeColor(task.status)}`}>
                            {task.status === 'in-progress' ? 'In Progress' : task.status === 'todo' ? 'To Do' : 'Done'}
                          </Badge>
                          <div className="text-sm text-muted-foreground min-w-[80px] text-right">
                            Due {format(task.dueDate, 'MMM dd')}
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

export default SprintDashboard;