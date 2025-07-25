import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar, Flag, MoreHorizontal, User, Edit, Tag, CalendarDays, Clock } from "lucide-react";
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
    tags?: string[];
  };
  className?: string;
}

const TaskCard = ({ task, className }: TaskCardProps) => {
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
            "group hover:shadow-md transition-all duration-200 border-l-4 cursor-pointer h-24",
            statusColors[task.status],
            className
          )}
          onClick={() => navigate(`/edit-task/${task.id}`)}
        >
          <CardContent className="p-3 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-60">{getStatusIcon(task.status)}</span>
                  <h3 className={cn(
                    "font-medium text-sm truncate",
                    task.status === 'completed' && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    {task.project}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs px-1 py-0", priorityColors[task.priority])}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
              {task.assignee && (
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
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