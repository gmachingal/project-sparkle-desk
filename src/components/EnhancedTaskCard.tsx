import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Users,
  Edit,
  Calendar,
  ChevronDown,
  Target,
  Flag,
  Tag,
  CalendarDays,
  MessageSquare,
  Activity,
  User,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title?: string;
  name?: string; // For backward compatibility
  description?: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  assignee?: {
    name: string;
    avatar?: string;
  } | string; // Support both object and string format
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedHours?: number;
  loggedHours?: number;
  hours?: number; // For backward compatibility
  dueDate?: string;
  startDate?: string;
  project?: string;
  milestone?: {
    id: string;
    name: string;
    status: string;
  } | string; // Support both object and string format
  sprint?: string;
  tags?: string[];
}

interface EnhancedTaskCardProps {
  task: Task;
  onStatusChange?: (taskId: string, newStatus: string) => void;
  onAssigneeChange?: (taskId: string, newAssignee: string) => void;
  showProject?: boolean;
  showMilestone?: boolean;
  showProgress?: boolean;
  size?: 'default' | 'compact';
  className?: string;
  enableQuickActions?: boolean;
}

const EnhancedTaskCard: React.FC<EnhancedTaskCardProps> = ({
  task,
  onStatusChange,
  onAssigneeChange,
  showProject = true,
  showMilestone = true,
  showProgress = true,
  size = 'default',
  className,
  enableQuickActions = true
}) => {
  const navigate = useNavigate();
  const [selectedTaskForActions, setSelectedTaskForActions] = useState<Task | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null);
  const [pendingAssigneeChange, setPendingAssigneeChange] = useState<string | null>(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showAssigneeConfirm, setShowAssigneeConfirm] = useState(false);
  const [comment, setComment] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="w-3 h-3 text-blocked" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-success/10 text-success border-success/20';
    }
  };

  const statusColors = {
    'todo': 'border-l-muted-foreground',
    'in-progress': 'border-l-primary',
    'completed': 'border-l-success',
    'blocked': 'border-l-blocked bg-blocked-bg/60 shadow-md'
  };

  const getProgressPercentage = () => {
    const logged = task.loggedHours || task.hours || 0;
    const estimated = task.estimatedHours || 1;
    return estimated > 0 ? Math.round((logged / estimated) * 100) : 0;
  };

  const getAssigneeName = () => {
    if (typeof task.assignee === 'string') return task.assignee;
    return task.assignee?.name || 'Unassigned';
  };

  const getAssigneeAvatar = () => {
    if (typeof task.assignee === 'object') return task.assignee.avatar;
    return undefined;
  };

  const getMilestoneName = () => {
    if (typeof task.milestone === 'string') return task.milestone;
    return task.milestone?.name;
  };

  const handleStatusChangeRequest = (newStatus: string) => {
    setPendingStatusChange(newStatus);
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatusChange && onStatusChange) {
      onStatusChange(task.id, pendingStatusChange);
    }
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
    if (pendingAssigneeChange && onAssigneeChange) {
      onAssigneeChange(task.id, pendingAssigneeChange);
    }
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
    setShowQuickActions(false);
  };

  const cancelAssigneeChange = () => {
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
  };

  // Mock team members - in a real app, this would come from props or context
  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Frontend Developer', active: true },
    { id: '2', name: 'Jane Smith', role: 'Backend Developer', active: true },
    { id: '3', name: 'Mike Johnson', role: 'UI/UX Designer', active: false },
    { id: '4', name: 'Sarah Wilson', role: 'QA Engineer', active: true },
    { id: '5', name: 'David Brown', role: 'DevOps Engineer', active: true }
  ];

  const taskTitle = task.title || task.name || 'Untitled Task';

  const TaskCardContent = () => (
    <Card 
      className={cn(
        "group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 cursor-pointer",
        size === 'compact' ? 'h-16' : 'min-h-[120px]',
        statusColors[task.status],
        className
      )}
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <CardContent className={cn(
        "h-full flex flex-col justify-between relative",
        size === 'compact' ? 'p-2' : 'p-3'
      )}>

        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getStatusIcon(task.status)}
              <h3 className={cn(
                "font-medium truncate",
                size === 'compact' ? 'text-xs' : 'text-sm',
                task.status === 'completed' && "line-through text-muted-foreground"
              )}>
                {taskTitle}
              </h3>
            </div>
            
            {size === 'default' && (
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {showProject && task.project && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    {task.project}
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className={cn("text-xs px-1 py-0", getPriorityColor(task.priority))}
                >
                  {task.priority}
                </Badge>
                {showMilestone && getMilestoneName() && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-1 py-0 bg-blue-50 text-blue-700 border-blue-200"
                  >
                    <Target className="w-2 h-2 mr-1" />
                    {getMilestoneName()}
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {task.assignee && (
            <Avatar className={cn(
              "flex-shrink-0",
              size === 'compact' ? 'w-4 h-4' : 'w-6 h-6'
            )}>
              <AvatarImage src={getAssigneeAvatar()} />
              <AvatarFallback className={cn(
                "bg-primary text-primary-foreground",
                size === 'compact' ? 'text-[10px]' : 'text-xs'
              )}>
                {getAssigneeName().charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Progress Section */}
        {showProgress && size === 'default' && (task.estimatedHours || task.hours) && (
          <div className="space-y-1 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{getProgressPercentage()}%</span>
            </div>
            <Progress 
              value={getProgressPercentage()} 
              className="h-1.5"
            />
          </div>
        )}
        
        {size === 'default' && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span className="truncate">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex gap-1">
              {task.tags && task.tags.length > 0 && (
                <span className="text-xs opacity-60">+{task.tags.length}</span>
              )}
            </div>
          </div>
        )}

        {size === 'compact' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {showProject && task.project && (
                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                  {task.project}
                </Badge>
              )}
              <Badge 
                variant="outline" 
                className={cn("text-[10px] px-1 py-0 h-4", getPriorityColor(task.priority))}
              >
                {task.priority}
              </Badge>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-2 h-2" />
                <span className="text-[10px] text-muted-foreground truncate">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (size === 'compact') {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <TaskCardContent />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-72 p-3" side="top">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{taskTitle}</h4>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getPriorityColor(task.priority))}
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
              {task.assignee && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Assignee</span>
                  <div className="flex items-center gap-1">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={getAssigneeAvatar()} />
                      <AvatarFallback className="text-xs">
                        {getAssigneeName().charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{getAssigneeName()}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Change Button */}
            {enableQuickActions && (
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
                  <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Edit className="w-5 h-5" />
                        Quick Task Actions
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-6 space-y-6">
                      {/* Task Info Card */}
                      <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg text-foreground">{taskTitle}</h4>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{task.description}</p>
                                )}
                              </div>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs ml-4 flex-shrink-0", getPriorityColor(task.priority))}
                              >
                                <Flag className="w-3 h-3 mr-1" />
                                {task.priority} Priority
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/10">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Progress:</span>
                                <span className="font-medium">{task.loggedHours || task.hours || 0}h / {task.estimatedHours || 0}h</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Assigned:</span>
                                <span className="font-medium">{getAssigneeName()}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Actions Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Status Management */}
                        <Card className="h-fit">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Change Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {!showStatusConfirm ? (
                              <div className="space-y-3">
                                <div className="grid grid-cols-1 gap-2">
                                  {[
                                    { status: 'todo', label: 'To Do', icon: '○', color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
                                    { status: 'in-progress', label: 'In Progress', icon: '⟳', color: 'bg-primary/10 text-primary hover:bg-primary/20' },
                                    { status: 'completed', label: 'Completed', icon: '✓', color: 'bg-success/10 text-success hover:bg-success/20' },
                                    { status: 'blocked', label: 'Blocked', icon: '🚫', color: 'bg-blocked/10 text-blocked hover:bg-blocked/20' }
                                  ].map((statusOption) => (
                                    <Button
                                      key={statusOption.status}
                                      variant="outline"
                                      className={`${statusOption.color} border-0 h-12 justify-start text-left ${
                                        task.status === statusOption.status ? 'ring-2 ring-primary shadow-md' : ''
                                      }`}
                                      onClick={() => handleStatusChangeRequest(statusOption.status)}
                                    >
                                      <span className="text-lg mr-3">{statusOption.icon}</span>
                                      <div>
                                        <div className="font-medium">{statusOption.label}</div>
                                        {task.status === statusOption.status && (
                                          <div className="text-xs opacity-70">Current Status</div>
                                        )}
                                      </div>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="p-4 bg-muted/50 rounded-lg">
                                  <h4 className="font-medium mb-2">Confirm Status Change</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Change task status from "<span className="font-medium">{task.status.replace('-', ' ')}</span>" to "<span className="font-medium">{pendingStatusChange?.replace('-', ' ')}</span>"?
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <Button onClick={confirmStatusChange} className="flex-1">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm
                                  </Button>
                                  <Button variant="outline" onClick={cancelStatusChange} className="flex-1">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Team Assignment */}
                        <Card className="h-fit">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Assign To Team
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {!showAssigneeConfirm ? (
                              <div className="space-y-2 max-h-72 overflow-y-auto">
                                {teamMembers.map((teamMember) => (
                                  <Button
                                    key={teamMember.id}
                                    variant="outline"
                                    className={`w-full justify-start h-auto p-3 border-0 bg-muted/30 hover:bg-muted/60 ${
                                      !teamMember.active ? 'opacity-50' : ''
                                    } ${
                                      getAssigneeName() === teamMember.name ? 'ring-2 ring-primary bg-primary/10 shadow-md' : ''
                                    }`}
                                    disabled={!teamMember.active}
                                    onClick={() => handleAssigneeChangeRequest(teamMember.name)}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                                        teamMember.active ? 'bg-primary' : 'bg-gray-400'
                                      }`}>
                                        {teamMember.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div className="text-left flex-1">
                                        <div className="font-medium">{teamMember.name}</div>
                                        <div className="text-xs text-muted-foreground">{teamMember.role}</div>
                                        {!teamMember.active && (
                                          <div className="text-xs text-destructive">Inactive</div>
                                        )}
                                      </div>
                                      {getAssigneeName() === teamMember.name && (
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                      )}
                                    </div>
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="p-4 bg-muted/50 rounded-lg">
                                  <h4 className="font-medium mb-2">Confirm Assignment</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Assign task to <span className="font-medium">{pendingAssigneeChange}</span>?
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <Button onClick={confirmAssigneeChange} className="flex-1">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Confirm
                                  </Button>
                                  <Button variant="outline" onClick={cancelAssigneeChange} className="flex-1">
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                  </Button>
                                 </div>
                               </div>
                             )}
                           </CardContent>
                         </Card>
                       </div>

                       {/* Comments Section - Full Width */}
                       <Card>
                         <CardHeader className="pb-3">
                           <CardTitle className="text-base flex items-center gap-2">
                             <MessageSquare className="w-4 h-4" />
                             Add Comment
                           </CardTitle>
                         </CardHeader>
                         <CardContent className="pt-0">
                           <div className="space-y-4">
                             <Textarea
                               placeholder="Add a comment about this task..."
                               value={comment}
                               onChange={(e) => setComment(e.target.value)}
                               rows={4}
                               className="resize-none bg-muted/30 border-muted"
                             />
                             <div className="flex gap-3">
                               <Button 
                                 className="flex-1"
                                 disabled={!comment.trim()}
                                 onClick={() => {
                                   // Handle comment submission here
                                   console.log('Comment added:', comment);
                                   setComment('');
                                 }}
                               >
                                 <MessageSquare className="w-4 h-4 mr-2" />
                                 Add Comment
                               </Button>
                               <Button 
                                 variant="outline"
                                 onClick={() => setComment('')}
                                 disabled={!comment.trim()}
                               >
                                 <X className="w-4 h-4 mr-2" />
                                 Clear
                               </Button>
                             </div>
                           </div>
                         </CardContent>
                       </Card>

                       {/* Sprint Assignment Section - Full Width */}
                       <Card>
                         <CardHeader className="pb-3">
                           <CardTitle className="text-base flex items-center gap-2">
                             <Target className="w-4 h-4" />
                             Assign to Sprint
                           </CardTitle>
                         </CardHeader>
                         <CardContent className="pt-0">
                           <div className="space-y-3">
                             <div className="grid grid-cols-1 gap-2">
                               <Button
                                 variant="outline"
                                 className="h-12 justify-start text-left border-0 bg-muted/30 hover:bg-muted/60"
                                 onClick={() => {
                                   // Handle move to backlog
                                   console.log('Move to backlog');
                                 }}
                               >
                                 <div className="flex items-center gap-3 w-full">
                                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-white font-semibold text-sm">
                                     📝
                                   </div>
                                   <div className="text-left flex-1">
                                     <div className="font-medium">Backlog</div>
                                     <div className="text-xs text-muted-foreground">No sprint assigned</div>
                                   </div>
                                 </div>
                               </Button>
                               <Button
                                 variant="outline"
                                 className="h-12 justify-start text-left border-0 bg-muted/30 hover:bg-muted/60"
                                 onClick={() => {
                                   // Handle current sprint assignment
                                   console.log('Assign to current sprint');
                                 }}
                               >
                                 <div className="flex items-center gap-3 w-full">
                                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-semibold text-sm">
                                     🎯
                                   </div>
                                   <div className="text-left flex-1">
                                     <div className="font-medium">Sprint 1 - Foundation</div>
                                     <div className="text-xs text-muted-foreground">Active sprint</div>
                                   </div>
                                   <Badge variant="default" className="text-xs">Current</Badge>
                                 </div>
                               </Button>
                               <Button
                                 variant="outline"
                                 className="h-12 justify-start text-left border-0 bg-muted/30 hover:bg-muted/60"
                                 onClick={() => {
                                   // Handle next sprint assignment
                                   console.log('Assign to next sprint');
                                 }}
                               >
                                 <div className="flex items-center gap-3 w-full">
                                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold text-sm">
                                     ⏭️
                                   </div>
                                   <div className="text-left flex-1">
                                     <div className="font-medium">Sprint 2 - Core Features</div>
                                     <div className="text-xs text-muted-foreground">Planned sprint</div>
                                   </div>
                                 </div>
                               </Button>
                             </div>
                           </div>
                         </CardContent>
                       </Card>
                     </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            <div className="pt-2 border-t">
              <Button 
                size="sm" 
                className="w-full h-6 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/task/${task.id}`);
                }}
              >
                <Edit className="w-3 h-3 mr-1" />
                View Task
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TaskCardContent />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-3" side="top">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{taskTitle}</h4>
            <Badge 
              variant="outline" 
              className={cn("text-xs", getPriorityColor(task.priority))}
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
            {task.assignee && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Assignee</span>
                <div className="flex items-center gap-1">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={getAssigneeAvatar()} />
                    <AvatarFallback className="text-xs">
                      {getAssigneeName().charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{getAssigneeName()}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Change Button */}
          {enableQuickActions && (
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
                          <h4 className="font-semibold">{taskTitle}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.loggedHours || task.hours || 0}h / {task.estimatedHours || 0}h
                            </span>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getPriorityColor(task.priority))}
                            >
                              {task.priority} Priority
                            </Badge>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">{task.description}</p>
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
                                    task.status === statusOption.status ? 'ring-2 ring-primary' : ''
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
                              Change task status from "{task.status.replace('-', ' ')}" to "{pendingStatusChange?.replace('-', ' ')}"?
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
                                    getAssigneeName() === teamMember.name ? 'ring-2 ring-primary bg-primary/5' : ''
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
          )}

          <div className="pt-2 border-t">
            <Button 
              size="sm" 
              className="w-full h-6 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/task/${task.id}`);
              }}
            >
              <Edit className="w-3 h-3 mr-1" />
              View Task
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EnhancedTaskCard;