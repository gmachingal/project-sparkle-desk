import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, ArrowLeft, Trash2, Clock, Plus, Target } from 'lucide-react';
import { format } from 'date-fns';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock task data - in real app, fetch by ID
  const [taskData, setTaskData] = useState({
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design including hero section, features, and call-to-action areas.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-02-15'),
    startDate: new Date('2024-02-10'),
    assigneeId: '2',
    projectId: '1',
    sprintId: '1',
    estimatedHours: 16,
    tags: ['design', 'homepage'],
    loggedHours: [
      { id: '1', date: '2024-01-15', hours: 3, description: 'Initial wireframe sketches' },
      { id: '2', date: '2024-01-16', hours: 2.5, description: 'Hero section design' }
    ]
  });

  const [newLogEntry, setNewLogEntry] = useState({
    hours: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const teamMembers = [
    { id: '1', name: 'John Doe', avatar: '', role: 'Project Manager' },
    { id: '2', name: 'Jane Smith', avatar: '', role: 'Designer' },
    { id: '3', name: 'Mike Johnson', avatar: '', role: 'Developer' },
    { id: '4', name: 'Sarah Wilson', avatar: '', role: 'QA Engineer' },
  ];

  const projects = [
    { id: '1', name: 'Website Redesign' },
    { id: '2', name: 'Mobile App Development' },
    { id: '3', name: 'Marketing Campaign' },
  ];

  const sprints = [
    { 
      id: '1', 
      name: 'Sprint 1 - Foundation', 
      projectId: '1', 
      status: 'active' as const,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      progress: 65
    },
    { 
      id: '2', 
      name: 'Sprint 2 - Core Features', 
      projectId: '1', 
      status: 'planned' as const,
      startDate: new Date('2024-01-30'),
      endDate: new Date('2024-02-13'),
      progress: 0
    },
    { 
      id: '3', 
      name: 'Sprint 1 - MVP', 
      projectId: '2', 
      status: 'active' as const,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-10'),
      progress: 45
    },
    { 
      id: '4', 
      name: 'Sprint 1 - Launch', 
      projectId: '3', 
      status: 'completed' as const,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-20'),
      progress: 100
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Task Updated",
      description: "Task has been successfully updated.",
    });
    navigate('/my-tasks');
  };

  const handleDelete = () => {
    toast({
      title: "Task Deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive"
    });
    navigate('/my-tasks');
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !taskData.tags.includes(tag)) {
      setTaskData({...taskData, tags: [...taskData.tags, tag]});
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTaskData({...taskData, tags: taskData.tags.filter(tag => tag !== tagToRemove)});
  };

  const handleLogHours = () => {
    if (newLogEntry.hours && newLogEntry.description) {
      const newLog = {
        id: Date.now().toString(),
        date: newLogEntry.date,
        hours: parseFloat(newLogEntry.hours),
        description: newLogEntry.description
      };
      
      setTaskData({
        ...taskData,
        loggedHours: [...taskData.loggedHours, newLog]
      });
      
      setNewLogEntry({
        hours: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd')
      });
      
      toast({
        title: "Hours Logged",
        description: `Logged ${newLogEntry.hours} hours successfully.`,
      });
    }
  };

  const getTotalLoggedHours = () => {
    return taskData.loggedHours.reduce((total, log) => total + log.hours, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="back" onClick={() => navigate('/my-tasks')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Tasks
            </Button>
            <h1 className="text-2xl font-bold">Edit Task</h1>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Task
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task Details */}
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Task Title</label>
                  <Input
                    value={taskData.title}
                    onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={taskData.description}
                    onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                    placeholder="Enter task description"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select value={taskData.status} onValueChange={(value) => setTaskData({...taskData, status: value})}>
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
                    <Select value={taskData.priority} onValueChange={(value) => setTaskData({...taskData, priority: value})}>
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

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {taskData.startDate ? format(taskData.startDate, "PPP") : "Pick start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={taskData.startDate}
                          onSelect={(date) => date && setTaskData({...taskData, startDate: date})}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {taskData.dueDate ? format(taskData.dueDate, "PPP") : "Pick due date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={taskData.dueDate}
                          onSelect={(date) => date && setTaskData({...taskData, dueDate: date})}
                          disabled={(date) => taskData.startDate ? date < taskData.startDate : false}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Estimated Hours</label>
                    <Input
                      type="number"
                      value={taskData.estimatedHours}
                      onChange={(e) => setTaskData({...taskData, estimatedHours: Number(e.target.value)})}
                      placeholder="Hours"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment & Project */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment & Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Assignee</label>
                  <Select value={taskData.assigneeId} onValueChange={(value) => setTaskData({...taskData, assigneeId: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {member.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Project</label>
                  <Select value={taskData.projectId} onValueChange={(value) => setTaskData({...taskData, projectId: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Sprint</label>
                  <Select value={taskData.sprintId || ''} onValueChange={(value) => setTaskData({...taskData, sprintId: value === 'none' ? null : value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sprint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Sprint</SelectItem>
                      {sprints
                        .filter(sprint => sprint.projectId === taskData.projectId)
                        .map(sprint => (
                          <SelectItem key={sprint.id} value={sprint.id}>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={sprint.status === 'active' ? 'default' : sprint.status === 'completed' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {sprint.status}
                              </Badge>
                              {sprint.name}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {taskData.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleTagRemove(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add tag and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTagAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Time Logging */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Logging
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div className="text-lg font-semibold">
                    {getTotalLoggedHours()}h / {taskData.estimatedHours}h
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((getTotalLoggedHours() / taskData.estimatedHours) * 100)}% complete
                  </div>
                </div>

                {/* Log new hours */}
                <div className="space-y-3">
                  <h4 className="font-medium">Log Hours</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="Hours"
                        value={newLogEntry.hours}
                        onChange={(e) => setNewLogEntry({...newLogEntry, hours: e.target.value})}
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        value={newLogEntry.date}
                        onChange={(e) => setNewLogEntry({...newLogEntry, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <Textarea
                    placeholder="What did you work on?"
                    value={newLogEntry.description}
                    onChange={(e) => setNewLogEntry({...newLogEntry, description: e.target.value})}
                    rows={2}
                  />
                  <Button 
                    type="button" 
                    onClick={handleLogHours}
                    disabled={!newLogEntry.hours || !newLogEntry.description}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Log Hours
                  </Button>
                </div>

                {/* Time log entries */}
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Entries</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {taskData.loggedHours.map(log => (
                      <div key={log.id} className="border rounded p-2 text-sm">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{log.hours}h</span>
                          <span className="text-muted-foreground text-xs">{log.date}</span>
                        </div>
                        <p className="text-muted-foreground mt-1">{log.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sprint Details Card - Full Width */}
          {taskData.sprintId && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Sprint Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const currentSprint = sprints.find(s => s.id === taskData.sprintId);
                  if (!currentSprint) return null;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Sprint Name</div>
                          <div className="font-medium">{currentSprint.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Status</div>
                          <Badge 
                            variant={currentSprint.status === 'active' ? 'default' : currentSprint.status === 'completed' ? 'secondary' : 'outline'}
                            className="mt-1"
                          >
                            {currentSprint.status.charAt(0).toUpperCase() + currentSprint.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Sprint Progress</span>
                            <span className="font-medium">{currentSprint.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                currentSprint.status === 'active' ? 'bg-blue-500' : 
                                currentSprint.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${currentSprint.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-muted-foreground">Start Date</div>
                            <div className="font-medium">{format(currentSprint.startDate, 'MMM dd, yyyy')}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">End Date</div>
                            <div className="font-medium">{format(currentSprint.endDate, 'MMM dd, yyyy')}</div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => navigate(`/sprint-dashboard/${taskData.projectId}/${currentSprint.id}`)}
                        >
                          <Target className="w-3 h-3 mr-2" />
                          View Sprint Dashboard
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4 mt-6">
            <Button type="submit" className="flex-1">Update Task</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/my-tasks')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;