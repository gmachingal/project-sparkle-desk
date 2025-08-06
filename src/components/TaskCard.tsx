import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar, Flag, MoreHorizontal, User, Edit, Tag, CalendarDays, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    startDate?: string;
    dueDate?: string;
    assignee?: {
      name: string;
      avatar?: string;
    };
    project: string;
    sprint?: string;
    milestone?: {
      id: string;
      name: string;
      status: 'planned' | 'in-progress' | 'completed';
    };
    tags?: string[];
  };
  className?: string;
  size?: 'default' | 'compact';
}

const TaskCard = ({ task, className, size = 'default' }: TaskCardProps) => {
  const navigate = useNavigate();
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusColors = {
    'todo': 'border-l-gray-400',
    'in-progress': 'border-l-blue-500',
    'completed': 'border-l-green-500'
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

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card 
          className={cn(
            "group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 cursor-pointer",
            size === 'compact' ? 'h-16' : 'h-24',
            statusColors[task.status],
            className
          )}
          onClick={() => navigate(`/edit-task/${task.id}`)}
        >
          <CardContent className={cn(
            "h-full flex flex-col justify-between",
            size === 'compact' ? 'p-2' : 'p-3'
          )}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "opacity-60",
                    size === 'compact' ? 'text-xs' : 'text-sm'
                  )}>
                    {getStatusIcon(task.status)}
                  </span>
                  <h3 className={cn(
                    "font-medium truncate",
                    size === 'compact' ? 'text-xs' : 'text-sm',
                    task.status === 'completed' && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </h3>
                </div>
                {size === 'default' && (
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {task.project}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs px-1 py-0", priorityColors[task.priority])}
                    >
                      {task.priority}
                    </Badge>
                    {task.milestone && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-1 py-0 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        <Target className="w-2 h-2 mr-1" />
                        {task.milestone.name}
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
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className={cn(
                    "bg-primary text-primary-foreground",
                    size === 'compact' ? 'text-[10px]' : 'text-xs'
                  )}>
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            {size === 'default' && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="truncate">{task.dueDate}</span>
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
                  <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                    {task.project}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn("text-[10px] px-1 py-0 h-4", priorityColors[task.priority])}
                  >
                    {task.priority}
                  </Badge>
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-2 h-2" />
                    <span className="text-[10px] text-muted-foreground truncate">{task.dueDate}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{task.title}</h4>
            <Badge 
              variant="outline" 
              className={cn("text-xs", priorityColors[task.priority])}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="secondary">{task.status.replace('-', ' ')}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Project</span>
              <span className="text-sm">{task.project}</span>
            </div>
            {task.sprint && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sprint</span>
                <span className="text-sm">{task.sprint}</span>
              </div>
            )}
            {task.milestone && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Milestone</span>
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{task.milestone.name}</span>
                  <Badge 
                    variant={task.milestone.status === 'completed' ? 'default' : task.milestone.status === 'in-progress' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {task.milestone.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Assignee</span>
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="text-xs">
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee.name}</span>
                </div>
              </div>
            )}
          </div>
          
          {(task.startDate || task.dueDate) && (
            <div className="space-y-2 pt-2 border-t">
              {task.startDate && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Start: {task.startDate}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Due: {task.dueDate}</span>
                </div>
              )}
            </div>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div className="pt-2 border-t">
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20"
                  >
                    <Tag className="w-2 h-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-2 border-t">
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => navigate(`/edit-task/${task.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Task
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TaskCard;