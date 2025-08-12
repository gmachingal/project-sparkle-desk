import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Edit,
  Calendar,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import QuickActionsPanel from './QuickActionsPanel';

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
  const [showQuickActions, setShowQuickActions] = useState(false);

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
                        setShowQuickActions(true);
                      }}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Quick Change
                    </Button>
                  </SheetTrigger>
                </Sheet>
                
                <QuickActionsPanel
                  isOpen={showQuickActions}
                  onOpenChange={setShowQuickActions}
                  task={task}
                  onStatusChange={onStatusChange}
                  onAssigneeChange={onAssigneeChange}
                />
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
                      setShowQuickActions(true);
                    }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Quick Change
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <QuickActionsPanel
                isOpen={showQuickActions}
                onOpenChange={setShowQuickActions}
                task={task}
                onStatusChange={onStatusChange}
                onAssigneeChange={onAssigneeChange}
              />
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