import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Users,
  Edit,
  Calendar,
  Target,
  Flag,
  Tag,
  CalendarDays
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
  const [pendingAssignee, setPendingAssignee] = useState<string | null>(null);
  const [showConfirmAssignment, setShowConfirmAssignment] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const statusColors = {
    'todo': 'border-l-gray-400',
    'in-progress': 'border-l-blue-500',
    'completed': 'border-l-green-500',
    'blocked': 'border-l-red-500'
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

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  const handleAssigneeChange = (newAssignee: string) => {
    if (onAssigneeChange) {
      onAssigneeChange(task.id, newAssignee);
    }
  };

  const confirmAssigneeChange = (newAssignee: string) => {
    setPendingAssignee(newAssignee);
    setShowConfirmAssignment(true);
  };

  const handleConfirmAssignment = () => {
    if (pendingAssignee && onAssigneeChange) {
      onAssigneeChange(task.id, pendingAssignee);
    }
    setPendingAssignee(null);
    setShowConfirmAssignment(false);
  };

  const handleCancelAssignment = () => {
    setPendingAssignee(null);
    setShowConfirmAssignment(false);
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
            
            {/* Quick Actions Section */}
            {enableQuickActions && (
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
                          handleStatusChange(statusOption.status);
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
                  {!showConfirmAssignment ? (
                    teamMembers.length > 2 ? (
                      <Select value={getAssigneeName()} onValueChange={confirmAssigneeChange}>
                        <SelectTrigger className="h-6 text-xs">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent className="z-[9999] bg-popover">
                          {teamMembers.filter(m => m.active).map((teamMember) => (
                            <SelectItem key={teamMember.id} value={teamMember.name} className="text-xs cursor-pointer">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                                  {teamMember.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span>{teamMember.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="space-y-1">
                        {teamMembers.filter(m => m.active).slice(0, 2).map((teamMember) => (
                          <Button
                            key={teamMember.id}
                            variant="outline"
                            size="sm"
                            className={`w-full justify-start h-6 text-xs ${
                              getAssigneeName() === teamMember.name ? 'ring-1 ring-primary bg-primary/5' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmAssigneeChange(teamMember.name);
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
          
          {/* Quick Actions Section */}
          {enableQuickActions && (
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
                        handleStatusChange(statusOption.status);
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
                {!showConfirmAssignment ? (
                  teamMembers.length > 2 ? (
                    <Select value={getAssigneeName()} onValueChange={confirmAssigneeChange}>
                      <SelectTrigger className="h-6 text-xs">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999] bg-popover">
                        {teamMembers.filter(m => m.active).map((teamMember) => (
                          <SelectItem key={teamMember.id} value={teamMember.name} className="text-xs cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                                {teamMember.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span>{teamMember.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-1">
                      {teamMembers.filter(m => m.active).slice(0, 2).map((teamMember) => (
                        <Button
                          key={teamMember.id}
                          variant="outline"
                          size="sm"
                          className={`w-full justify-start h-6 text-xs ${
                            getAssigneeName() === teamMember.name ? 'ring-1 ring-primary bg-primary/5' : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmAssigneeChange(teamMember.name);
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