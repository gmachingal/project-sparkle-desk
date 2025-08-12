import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ChevronLeft, ChevronRight, Send, Eye, CheckSquare, Clock, Target, Flag, User, CalendarDays, Tag, BarChart3, ChevronDown } from "lucide-react";
import { format, addDays, subDays, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DailyTaskReportProps {
  isAdmin?: boolean;
  selectedUser?: string;
  onUserChange?: (userId: string) => void;
}

const DailyTaskReport = ({ isAdmin = false, selectedUser, onUserChange }: DailyTaskReportProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState('all');
  const [pendingAssignee, setPendingAssignee] = useState<string | null>(null);
  const [showConfirmAssignment, setShowConfirmAssignment] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  // Mock data
  const projects = [
    { id: 'project-1', name: 'Website Redesign' },
    { id: 'project-2', name: 'Mobile App' },
    { id: 'project-3', name: 'Marketing Campaign' },
  ];

  const users = [
    { id: 'user-1', name: 'Alex Johnson' },
    { id: 'user-2', name: 'Sarah Chen' },
    { id: 'user-3', name: 'Mike Wilson' },
  ];

  const dailyTasks = [
    {
      id: "1",
      title: "Review authentication module",
      description: "Complete security review and testing of new auth system",
      status: "completed" as const,
      priority: "high" as const,
      timeSpent: "3.5h",
      project: "Website Redesign",
      sprint: "Sprint 3",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      completedAt: "10:30 AM",
      tags: ["security", "authentication", "backend"]
    },
    {
      id: "2", 
      title: "Update API documentation",
      description: "Document new endpoints and authentication flow",
      status: "in-progress" as const,
      priority: "medium" as const,
      timeSpent: "2h",
      project: "Website Redesign",
      sprint: "Sprint 3",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      startedAt: "2:00 PM",
      tags: ["documentation", "api", "endpoints"]
    },
    {
      id: "3",
      title: "Design user dashboard mockups",
      description: "Create wireframes and high-fidelity designs",
      status: "completed" as const,
      priority: "high" as const,
      timeSpent: "4h",
      project: "Mobile App",
      sprint: "Sprint 2",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      completedAt: "4:45 PM",
      tags: ["design", "ui/ux", "wireframes"]
    }
  ];

  const getFilteredTasks = () => {
    let filtered = dailyTasks;
    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.project === projects.find(p => p.id === selectedProject)?.name);
    }
    return filtered;
  };

  const getProjectStats = (projectName: string) => {
    const projectTasks = dailyTasks.filter(task => task.project === projectName);
    const completed = projectTasks.filter(task => task.status === 'completed').length;
    const totalTime = projectTasks.reduce((acc, task) => {
      const hours = parseFloat(task.timeSpent.replace('h', ''));
      return acc + hours;
    }, 0);
    
    return { total: projectTasks.length, completed, totalTime };
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subDays(selectedDate, 1) : addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const totalTime = filteredTasks.reduce((acc, task) => {
    const hours = parseFloat(task.timeSpent.replace('h', ''));
    return acc + hours;
  }, 0);

  // Group tasks by project
  const getTasksByProject = () => {
    const tasksByProject: { [projectName: string]: typeof filteredTasks } = {};
    
    filteredTasks.forEach(task => {
      if (!tasksByProject[task.project]) {
        tasksByProject[task.project] = [];
      }
      tasksByProject[task.project].push(task);
    });
    
    return tasksByProject;
  };

  const tasksByProject = getTasksByProject();

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      default:
        return '○';
    }
  };

  // Team members - mock data
  const teamMembers = [
    { id: '1', name: 'John Doe', active: true },
    { id: '2', name: 'Jane Smith', active: true },
    { id: '3', name: 'Mike Johnson', active: true },
    { id: '4', name: 'Sarah Wilson', active: true },
    { id: '5', name: 'David Brown', active: true }
  ];

  const confirmAssigneeChange = (taskId: string, newAssignee: string) => {
    setPendingAssignee(newAssignee);
    setCurrentTaskId(taskId);
    setShowConfirmAssignment(true);
  };

  const handleConfirmAssignment = () => {
    // Handle the assignment logic here
    console.log(`Assigning task ${currentTaskId} to ${pendingAssignee}`);
    setPendingAssignee(null);
    setCurrentTaskId(null);
    setShowConfirmAssignment(false);
  };

  const handleCancelAssignment = () => {
    setPendingAssignee(null);
    setCurrentTaskId(null);
    setShowConfirmAssignment(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Daily Task Report
          </CardTitle>
          <div className="flex items-center gap-3">
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[140px] justify-start">
                  <CalendarIcon className="w-4 h-4" />
                  {format(selectedDate, 'MMM dd, yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Project Filter */}
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!isAdmin && (
              <Button variant="outline" size="sm" className="gap-2">
                <Send className="w-4 h-4" />
              </Button>
            )}
            
            {/* Project Status Report Button */}
            {selectedProject !== 'all' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => navigate(`/project-status-report/${selectedProject}`)}
              >
                <BarChart3 className="w-4 h-4" />
                Project Report
              </Button>
            )}
          </div>
        </div>
        
        {/* User Selection (Admin only) */}
        {isAdmin && (
          <div className="pt-3">
            <Select value={selectedUser} onValueChange={onUserChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{filteredTasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTime.toFixed(1)}h</div>
            <div className="text-sm text-muted-foreground">Hours Logged</div>
          </div>
        </div>


        {/* Tasks Grouped by Project */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Tasks Worked On</h4>
          {filteredTasks.length > 0 ? (
            Object.entries(tasksByProject).map(([projectName, projectTasks]) => (
              <div key={projectName} className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h5 className="font-semibold text-sm text-foreground">{projectName}</h5>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {projectTasks.filter(t => t.status === 'completed').length}/{projectTasks.length} completed
                    </Badge>
                    <Badge variant="secondary" className="text-xs gap-1">
                      <Clock className="w-3 h-3" />
                      {projectTasks.reduce((acc, task) => acc + parseFloat(task.timeSpent.replace('h', '')), 0).toFixed(1)}h
                    </Badge>
                    {/* Project Report Button for each project */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 h-6 px-2 text-xs"
                      onClick={() => {
                        const projectId = projects.find(p => p.name === projectName)?.id;
                        if (projectId) {
                          navigate(`/project-status-report/${projectId}`);
                        }
                      }}
                    >
                      <BarChart3 className="w-3 h-3" />
                      Report
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projectTasks.map((task) => (
                    <HoverCard key={task.id}>
                      <HoverCardTrigger asChild>
                        <div 
                          className="border rounded-lg p-3 space-y-2 bg-muted/20 cursor-pointer hover:shadow-md transition-all duration-200"
                          onClick={() => navigate(`/task/${task.id}`)}
                        >
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm opacity-60">
                                  {getStatusIcon(task.status)}
                                </span>
                                <h6 className="font-medium text-sm leading-tight">{task.title}</h6>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                              <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className="text-xs px-2 py-0">
                                {task.status === 'completed' ? 'Done' : 'Progress'}
                              </Badge>
                              <Badge variant="outline" className="text-xs gap-1 px-2 py-0">
                                <Clock className="w-3 h-3" />
                                {task.timeSpent}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {task.status === 'completed' && task.completedAt && (
                                <p>✓ {task.completedAt}</p>
                              )}
                              {task.status === 'in-progress' && task.startedAt && (
                                <p>→ {task.startedAt}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72 p-3" side="top">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{task.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", priorityColors[task.priority])}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                          
                          {task.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Status</span>
                              <Badge variant="secondary" className="text-xs">{task.status.replace('-', ' ')}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Time</span>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span className="text-xs">{task.timeSpent}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Actions Section */}
                          <div className="pt-2 border-t space-y-2">
                            {/* Status Change */}
                            <div>
                              <h4 className="text-xs font-medium mb-1">Change Status</h4>
                              <div className="grid grid-cols-2 gap-1">
                                {[
                                  { status: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
                                  { status: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
                                  { status: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                                  { status: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-700 hover:bg-red-200' }
                                ].map((statusOption) => (
                                  <Button
                                    key={statusOption.status}
                                    variant="outline"
                                    size="sm"
                                    className={`text-xs h-6 ${statusOption.color} border-0 ${
                                      task.status === statusOption.status ? 'ring-1 ring-primary' : ''
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle status change logic here
                                    }}
                                  >
                                    {statusOption.label}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            {/* Quick Assign */}
                            <div>
                              <h4 className="text-xs font-medium mb-1">Quick Assign</h4>
                              {(!showConfirmAssignment || currentTaskId !== task.id) ? (
                                teamMembers.length > 2 ? (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="h-6 text-xs w-full justify-between">
                                        <span className="truncate">{task.assignee?.name || 'Select assignee'}</span>
                                        <ChevronDown className="w-3 h-3" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 p-2 z-[9999]" align="start">
                                      <div className="space-y-1">
                                        {teamMembers.filter(m => m.active).map((teamMember) => (
                                          <Button
                                            key={teamMember.id}
                                            variant="ghost"
                                            size="sm"
                                            className={`w-full justify-start h-8 text-xs ${
                                              task.assignee?.name === teamMember.name ? 'bg-primary/10' : ''
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmAssigneeChange(task.id, teamMember.name);
                                            }}
                                          >
                                            <div className="flex items-center gap-2">
                                              <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                                                {teamMember.name.split(' ').map(n => n[0]).join('')}
                                              </div>
                                              <span>{teamMember.name}</span>
                                            </div>
                                          </Button>
                                        ))}
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <div className="space-y-1">
                                    {teamMembers.filter(m => m.active).slice(0, 2).map((teamMember) => (
                                      <Button
                                        key={teamMember.id}
                                        variant="outline"
                                        size="sm"
                                        className={`w-full justify-start h-6 text-xs ${
                                          task.assignee?.name === teamMember.name ? 'ring-1 ring-primary bg-primary/5' : ''
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          confirmAssigneeChange(task.id, teamMember.name);
                                        }}
                                      >
                                        <div className="flex items-center gap-1">
                                          <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                                            {teamMember.name.split(' ').map(n => n[0]).join('')}
                                          </div>
                                          <span className="truncate">{teamMember.name}</span>
                                        </div>
                                      </Button>
                                    ))}
                                  </div>
                                )
                              ) : (
                                <div className="space-y-1">
                                  <p className="text-xs text-muted-foreground">
                                    Assign to {pendingAssignee}?
                                  </p>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="h-6 text-xs flex-1"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirmAssignment();
                                      }}
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-6 text-xs flex-1"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancelAssignment();
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <Button 
                              size="sm" 
                              className="w-full h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/task/${task.id}`);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Task
                            </Button>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No tasks found for the selected criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTaskReport;