import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MoreHorizontal, Users, Calendar, Eye, Target, TrendingUp, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    progress: number;
    totalTasks: number;
    completedTasks: number;
    teamSize: number;
    dueDate: string;
    color: string;
    milestones?: {
      total: number;
      completed: number;
    };
  };
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={cn(
          "group hover:shadow-md transition-all duration-200 cursor-pointer h-28",
          className
        )}>
          <CardContent className="p-4 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{project.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="truncate">{project.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={cn("text-lg font-bold", getProgressColor(project.progress))}>
                  {project.progress}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={project.progress} className="h-1" />
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {project.completedTasks}/{project.totalTasks} tasks
                </Badge>
                {project.milestones ? (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="w-3 h-3" />
                    <span>{project.milestones.completed}/{project.milestones.total}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <h4 className="font-semibold text-lg">{project.name}</h4>
            </div>
            <Badge variant="outline" className={cn("text-sm", getProgressColor(project.progress))}>
              {project.progress}%
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Team Size</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{project.teamSize}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{project.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Tasks</span>
                  <span className="font-medium">{project.totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-green-600">{project.completedTasks}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t space-y-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit-project/${project.id}`)}
                className="flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/project-calendar/${project.id}`)}
                className="flex-1"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Calendar
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/project-status-report/${project.id}`)}
                className="flex-1"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Status Report
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate(`/project-calendar/${project.id}?view=sprints`)}
                className="flex-1"
              >
                <Target className="h-3 w-3 mr-1" />
                Sprint View
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProjectCard;