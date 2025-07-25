import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Flag, MoreHorizontal, User, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    assignee?: {
      name: string;
      avatar?: string;
    };
    project: string;
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
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{task.dueDate}</span>
                  </div>
                )}
                
                {task.assignee && (
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
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