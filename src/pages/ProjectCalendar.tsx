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
import { ArrowLeft, Calendar as CalendarIcon, List, Users, Filter } from 'lucide-react';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const ProjectCalendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

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

  // Mock tasks with calendar dates
  const tasks = [
    {
      id: '1',
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for homepage',
      status: 'in-progress',
      priority: 'high',
      assigneeId: '2',
      dueDate: new Date('2024-02-10'),
      startDate: new Date('2024-02-05'),
      estimatedHours: 16
    },
    {
      id: '2',
      title: 'Implement Navigation Menu',
      description: 'Build responsive navigation component',
      status: 'todo',
      priority: 'medium',
      assigneeId: '3',
      dueDate: new Date('2024-02-15'),
      startDate: new Date('2024-02-12'),
      estimatedHours: 8
    },
    {
      id: '3',
      title: 'User Testing Session',
      description: 'Conduct usability testing with 10 users',
      status: 'todo',
      priority: 'high',
      assigneeId: '4',
      dueDate: new Date('2024-02-20'),
      startDate: new Date('2024-02-18'),
      estimatedHours: 12
    },
    {
      id: '4',
      title: 'Database Schema Design',
      description: 'Design and implement new database structure',
      status: 'completed',
      priority: 'high',
      assigneeId: '3',
      dueDate: new Date('2024-02-08'),
      startDate: new Date('2024-02-01'),
      estimatedHours: 20
    },
    {
      id: '5',
      title: 'API Documentation',
      description: 'Write comprehensive API documentation',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '1',
      dueDate: new Date('2024-02-25'),
      startDate: new Date('2024-02-20'),
      estimatedHours: 10
    }
  ];

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
      case 'urgent': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const currentMonth = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: currentMonth, end: monthEnd });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
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
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list')}>
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Project Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                    components={{
                      Day: ({ date, ...props }: any) => {
                        const tasksForDay = getTasksForDate(date);
                        const hasStartingTasks = tasksForDay.some(task => task.startDate && isSameDay(task.startDate, date));
                        const hasDueTasks = tasksForDay.some(task => task.dueDate && isSameDay(task.dueDate, date));
                        
                        return (
                          <div className="relative">
                            <button {...props}>
                              {format(date, 'd')}
                              {(hasStartingTasks || hasDueTasks) && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                  <div className="flex gap-0.5">
                                    {hasStartingTasks && <div className="w-1 h-1 rounded-full bg-green-500"></div>}
                                    {hasDueTasks && <div className="w-1 h-1 rounded-full bg-red-500"></div>}
                                  </div>
                                </div>
                              )}
                            </button>
                          </div>
                        );
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Selected Date Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Tasks for {format(selectedDate, 'MMM dd, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getTasksForSelectedDate().length === 0 ? (
                      <p className="text-muted-foreground text-sm">No tasks for this date</p>
                    ) : (
                      getTasksForSelectedDate().map(task => {
                        const assignee = getAssignee(task.assigneeId);
                        const isStartDate = task.startDate && isSameDay(task.startDate, selectedDate);
                        const isDueDate = task.dueDate && isSameDay(task.dueDate, selectedDate);
                        
                        return (
                          <div
                            key={task.id}
                            className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} bg-card hover:bg-muted/50 cursor-pointer transition-colors`}
                            onClick={() => navigate(`/edit-task/${task.id}`)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">{task.title}</h4>
                              <Badge
                                variant="secondary"
                                className={`${getStatusColor(task.status)} text-white text-xs`}
                              >
                                {task.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={assignee?.avatar} />
                                <AvatarFallback className="text-xs">
                                  {assignee?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{assignee?.name}</span>
                            </div>
                            
                            <div className="flex gap-2 text-xs">
                              {isStartDate && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Start
                                </Badge>
                              )}
                              {isDueDate && (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                  Due
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                        onClick={() => navigate(`/edit-task/${task.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(task.status)} text-white`}
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