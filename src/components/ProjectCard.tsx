import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Users, Calendar, Eye } from "lucide-react";
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
  };
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-project/${project.id}`);
            }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{project.teamSize}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{project.dueDate}</span>
            </div>
          </div>
          <Badge variant="secondary">
            {project.completedTasks}/{project.totalTasks} tasks
          </Badge>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/edit-project/${project.id}`)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/project-calendar/${project.id}`)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;