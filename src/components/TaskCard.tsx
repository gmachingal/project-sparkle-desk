import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-warning text-warning-foreground',
    high: 'bg-destructive text-destructive-foreground'
  };

  const statusColors = {
    'todo': 'border-l-muted',
    'in-progress': 'border-l-primary',
    'completed': 'border-l-success'
  };

  return (
    <Card 
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border-l-4 cursor-pointer",
        statusColors[task.status],
        className
      )}
      onClick={() => navigate(`/edit-task/${task.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className={cn(
                "font-medium text-sm leading-relaxed",
                task.status === 'completed' && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit-task/${task.id}`);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
            
            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
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
            )}
            
            
            {/* Date Information */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {task.startDate && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Start: {task.startDate}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Due: {task.dueDate}</span>
                </div>
              )}
            </div>
            
            {/* Sprint Information */}
            {task.sprint && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                  <CalendarDays className="w-2 h-2 mr-1" />
                  {task.sprint}
                </Badge>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {task.project}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", priorityColors[task.priority])}
                >
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Assigned to */}
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {task.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;