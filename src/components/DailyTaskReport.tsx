import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, ChevronLeft, ChevronRight, Send, Eye, CheckSquare, Clock, Target, Flag, User, CalendarDays, Tag, BarChart3, ChevronDown, Edit, MessageSquare } from "lucide-react";
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
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedTaskForActions, setSelectedTaskForActions] = useState<any>(null);
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null);
  const [pendingAssigneeChange, setPendingAssigneeChange] = useState<string | null>(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showAssigneeConfirm, setShowAssigneeConfirm] = useState(false);
  const [comment, setComment] = useState('');

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
    },
    {
      id: "4",
      title: "Deploy staging environment",
      description: "Server deployment blocked due to infrastructure maintenance",
      status: "blocked" as const,
      priority: "high" as const,
      timeSpent: "1h",
      project: "Website Redesign",
      sprint: "Sprint 3",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      blockedSince: "9:00 AM",
      tags: ["deployment", "infrastructure", "staging"]
    },
    {
      id: "5",
      title: "Payment gateway integration",
      description: "API integration blocked pending vendor approval",
      status: "blocked" as const,
      priority: "medium" as const,
      timeSpent: "0.5h",
      project: "Mobile App",
      sprint: "Sprint 2",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      blockedSince: "11:30 AM",
      tags: ["payment", "api", "integration"]
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
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      case 'blocked':
        return '🚫';
      default:
        return '○';
    }
  };

  // Team members - mock data
  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Frontend Developer', active: true },
    { id: '2', name: 'Jane Smith', role: 'Backend Developer', active: true },
    { id: '3', name: 'Mike Johnson', role: 'UI/UX Designer', active: false },
    { id: '4', name: 'Sarah Wilson', role: 'QA Engineer', active: true },
    { id: '5', name: 'David Brown', role: 'DevOps Engineer', active: true }
  ];

  // Confirmation handlers
  const handleStatusChangeRequest = (newStatus: string) => {
    setPendingStatusChange(newStatus);
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = () => {
    // Handle status change logic here
    console.log(`Changing task ${selectedTaskForActions?.id} status to ${pendingStatusChange}`);
    setPendingStatusChange(null);
    setShowStatusConfirm(false);
    setShowQuickActions(false);
  };

  const cancelStatusChange = () => {
    setPendingStatusChange(null);
    setShowStatusConfirm(false);
  };

  const handleAssigneeChangeRequest = (newAssignee: string) => {
    setPendingAssigneeChange(newAssignee);
    setShowAssigneeConfirm(true);
  };

  const confirmAssigneeChange = () => {
    // Handle assignment logic here
    console.log(`Assigning task ${selectedTaskForActions?.id} to ${pendingAssigneeChange}`);
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
    setShowQuickActions(false);
  };

  const cancelAssigneeChange = () => {
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
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
                           className={cn(
                             "border rounded-lg p-3 space-y-2 cursor-pointer hover:shadow-md transition-all duration-200",
                             task.status === 'blocked' 
                               ? "bg-blocked-bg/60 border-blocked-border shadow-md" 
                               : "bg-muted/20"
                           )}
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
                               <Badge 
                                 variant={task.status === 'completed' ? 'default' : task.status === 'blocked' ? 'destructive' : 'secondary'} 
                                 className="text-xs px-2 py-0"
                               >
                                 {task.status === 'completed' ? 'Done' : task.status === 'blocked' ? 'Blocked' : 'Progress'}
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
                               {task.status === 'blocked' && task.blockedSince && (
                                 <p className="text-destructive">🚫 Blocked since {task.blockedSince}</p>
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
                          
                          {/* Quick Change Button */}
                          <div className="pt-2 border-t">
                            <Sheet open={showQuickActions} onOpenChange={setShowQuickActions}>
                              <SheetTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full h-6 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTaskForActions(task);
                                    setShowQuickActions(true);
                                  }}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Quick Change
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                  <SheetTitle className="flex items-center gap-2">
                                    <Edit className="w-5 h-5" />
                                    Quick Task Actions
                                  </SheetTitle>
                                </SheetHeader>
                                
                                <div className="mt-6 space-y-6">
                                  {/* Task Info */}
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold">{selectedTaskForActions?.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {selectedTaskForActions?.timeSpent}
                                          </span>
                                          <Badge 
                                            variant="outline" 
                                            className={cn("text-xs", priorityColors[selectedTaskForActions?.priority])}
                                          >
                                            {selectedTaskForActions?.priority} Priority
                                          </Badge>
                                        </div>
                                        {selectedTaskForActions?.description && (
                                          <p className="text-sm text-muted-foreground">{selectedTaskForActions.description}</p>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Quick Status Change */}
                                  <Card>
                                    <CardContent className="p-4">
                                      {!showStatusConfirm ? (
                                        <>
                                          <h3 className="font-semibold mb-3">Change Status</h3>
                                          <div className="grid grid-cols-2 gap-2">
                                             {[
                                               { status: 'todo', label: 'To Do', color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
                                               { status: 'in-progress', label: 'In Progress', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
                                               { status: 'completed', label: 'Completed', color: 'bg-success/10 text-success hover:bg-success/20' },
                                               { status: 'blocked', label: 'Blocked', color: 'bg-blocked/10 text-blocked hover:bg-blocked/20' }
                                             ].map((statusOption) => (
                                              <Button
                                                key={statusOption.status}
                                                variant="outline"
                                                className={`${statusOption.color} border-0 ${
                                                  selectedTaskForActions?.status === statusOption.status ? 'ring-2 ring-primary' : ''
                                                }`}
                                                onClick={() => handleStatusChangeRequest(statusOption.status)}
                                              >
                                                {statusOption.label}
                                              </Button>
                                            ))}
                                          </div>
                                        </>
                                      ) : (
                                        <div className="space-y-3">
                                          <h3 className="font-semibold">Confirm Status Change</h3>
                                          <p className="text-sm text-muted-foreground">
                                            Change task status from "{selectedTaskForActions?.status.replace('-', ' ')}" to "{pendingStatusChange?.replace('-', ' ')}"?
                                          </p>
                                          <div className="flex gap-2">
                                            <Button onClick={confirmStatusChange} className="flex-1">
                                              Confirm
                                            </Button>
                                            <Button variant="outline" onClick={cancelStatusChange} className="flex-1">
                                              Cancel
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Quick Assign */}
                                  <Card>
                                    <CardContent className="p-4">
                                      {!showAssigneeConfirm ? (
                                        <>
                                          <h3 className="font-semibold mb-3">Assign To</h3>
                                          <div className="space-y-2">
                                            {teamMembers.map((teamMember) => (
                                              <Button
                                                key={teamMember.id}
                                                variant="outline"
                                                className={`w-full justify-start h-auto p-3 ${
                                                  !teamMember.active ? 'opacity-50' : ''
                                                } ${
                                                  selectedTaskForActions?.assignee?.name === teamMember.name ? 'ring-2 ring-primary bg-primary/5' : ''
                                                }`}
                                                disabled={!teamMember.active}
                                                onClick={() => handleAssigneeChangeRequest(teamMember.name)}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                                                    teamMember.active ? 'bg-primary' : 'bg-gray-400'
                                                  }`}>
                                                    {teamMember.name.split(' ').map(n => n[0]).join('')}
                                                  </div>
                                                  <div className="text-left">
                                                    <div className="font-medium">{teamMember.name}</div>
                                                    <div className="text-xs text-muted-foreground">{teamMember.role}</div>
                                                  </div>
                                                </div>
                                              </Button>
                                            ))}
                                          </div>
                                        </>
                                      ) : (
                                        <div className="space-y-3">
                                          <h3 className="font-semibold">Confirm Assignment</h3>
                                          <p className="text-sm text-muted-foreground">
                                            Assign task to {pendingAssigneeChange}?
                                          </p>
                                          <div className="flex gap-2">
                                            <Button onClick={confirmAssigneeChange} className="flex-1">
                                              Confirm
                                            </Button>
                                            <Button variant="outline" onClick={cancelAssigneeChange} className="flex-1">
                                              Cancel
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Add Comment */}
                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Add Comment
                                      </h3>
                                      <div className="space-y-3">
                                        <Textarea
                                          placeholder="Add a comment about this task..."
                                          value={comment}
                                          onChange={(e) => setComment(e.target.value)}
                                          rows={3}
                                          className="resize-none"
                                        />
                                        <div className="flex gap-2">
                                          <Button 
                                            size="sm" 
                                            className="flex-1"
                                            disabled={!comment.trim()}
                                            onClick={() => {
                                              // Handle comment submission here
                                              console.log('Comment added:', comment);
                                              setComment('');
                                            }}
                                          >
                                            Add Comment
                                          </Button>
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => setComment('')}
                                          >
                                            Clear
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </SheetContent>
                            </Sheet>
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