import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, TrendingUp } from "lucide-react";
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
  };
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
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
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;