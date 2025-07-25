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
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';

const ProjectCalendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
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
    },
    {
      id: '6',
      title: 'Mobile Responsive Design',
      description: 'Optimize website for mobile devices',
      status: 'todo',
      priority: 'high',
      assigneeId: '2',
      dueDate: new Date('2024-02-28'),
      startDate: new Date('2024-02-22'),
      estimatedHours: 24
    },
    {
      id: '7',
      title: 'Performance Optimization',
      description: 'Improve page load times and overall performance',
      status: 'todo',
      priority: 'medium',
      assigneeId: '3',
      dueDate: new Date('2024-03-05'),
      startDate: new Date('2024-03-01'),
      estimatedHours: 16
    },
    {
      id: '8',
      title: 'SEO Implementation',
      description: 'Implement SEO best practices',
      status: 'in-progress',
      priority: 'medium',
      assigneeId: '1',
      dueDate: new Date('2024-02-14'),
      startDate: new Date('2024-02-10'),
      estimatedHours: 12
    },
    {
      id: '9',
      title: 'Content Management System',
      description: 'Set up CMS for content management',
      status: 'todo',
      priority: 'low',
      assigneeId: '4',
      dueDate: new Date('2024-02-26'),
      startDate: new Date('2024-02-24'),
      estimatedHours: 20
    },
    {
      id: '10',
      title: 'Security Audit',
      description: 'Conduct security review and testing',
      status: 'todo',
      priority: 'high',
      assigneeId: '4',
      dueDate: new Date('2024-03-10'),
      startDate: new Date('2024-03-08'),
      estimatedHours: 8
    },
    {
      id: '11',
      title: 'Browser Compatibility Testing',
      description: 'Test across different browsers',
      status: 'completed',
      priority: 'medium',
      assigneeId: '4',
      dueDate: new Date('2024-02-12'),
      startDate: new Date('2024-02-09'),
      estimatedHours: 6
    },
    {
      id: '12',
      title: 'Launch Preparation',
      description: 'Final preparations for website launch',
      status: 'todo',
      priority: 'urgent',
      assigneeId: '1',
      dueDate: new Date('2024-03-15'),
      startDate: new Date('2024-03-12'),
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

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list')}>
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
                      <h3 className="font-medium">
                        {format(selectedDate, 'MMMM yyyy')}
                      </h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                        >
                          Previous
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                        >
                          Next
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
                                return (
                                  <div 
                                    key={task.id} 
                                    className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(task.priority)} truncate cursor-pointer`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/edit-task/${task.id}`);
                                    }}
                                    title={`${task.title} - ${assignee?.name}`}
                                  >
                                    {task.title}
                                  </div>
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
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                          >
                            Previous
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {eachDayOfInterval({ start: startOfWeek(selectedDate), end: endOfWeek(selectedDate) }).map(day => {
                          const tasksForDay = getTasksForDate(day);
                          return (
                            <div 
                              key={day.toISOString()} 
                              className={`p-2 border rounded-lg cursor-pointer hover:bg-muted min-h-40 ${isSameDay(day, selectedDate) ? 'bg-primary/10 border-primary' : ''}`}
                              onClick={() => setSelectedDate(day)}
                            >
                              <div className="text-center mb-2">
                                <div className="text-xs text-muted-foreground">{format(day, 'EEE')}</div>
                                <div className="font-medium">{format(day, 'd')}</div>
                              </div>
                              <div className="space-y-1">
                                {tasksForDay.slice(0, 4).map(task => {
                                  const assignee = getAssignee(task.assigneeId);
                                  return (
                                    <div 
                                      key={task.id} 
                                      className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(task.priority)} truncate cursor-pointer`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/edit-task/${task.id}`);
                                      }}
                                      title={`${task.title} - ${assignee?.name} (${task.status})`}
                                    >
                                      <div className="font-medium">{task.title}</div>
                                      <div className="text-muted-foreground">{assignee?.name}</div>
                                    </div>
                                  );
                                })}
                                {tasksForDay.length > 4 && (
                                  <div className="text-xs text-muted-foreground">+{tasksForDay.length - 4} more</div>
                                )}
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
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                          >
                            Previous Day
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                          >
                            Next Day
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg">
                        <div className="grid grid-cols-12 gap-0 min-h-[600px]">
                          {/* Time column */}
                          <div className="col-span-2 border-r">
                            {Array.from({ length: 24 }, (_, i) => (
                              <div key={i} className="h-12 border-b p-2 text-xs text-muted-foreground">
                                {format(new Date().setHours(i, 0, 0, 0), 'HH:mm')}
                              </div>
                            ))}
                          </div>
                          {/* Tasks column */}
                          <div className="col-span-10 relative">
                            {getTasksForDate(selectedDate).map((task, index) => {
                              const assignee = getAssignee(task.assigneeId);
                              return (
                                <div 
                                  key={task.id}
                                  className={`absolute left-2 right-2 p-2 rounded border-l-4 ${getPriorityColor(task.priority)} bg-card hover:bg-muted/50 cursor-pointer z-10`}
                                  style={{ 
                                    top: `${(index * 60) + 48}px`,
                                    height: '48px'
                                  }}
                                  onClick={() => navigate(`/edit-task/${task.id}`)}
                                >
                                  <div className="flex items-center justify-between h-full">
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm truncate">{task.title}</div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span>{assignee?.name}</span>
                                        <Badge className={`${getStatusBgColor(task.status)} text-xs`}>
                                          {task.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {/* Hour lines */}
                            {Array.from({ length: 24 }, (_, i) => (
                              <div key={i} className="h-12 border-b"></div>
                            ))}
                          </div>
                        </div>
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
                          onClick={() => navigate(`/edit-task/${task.id}`)}
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