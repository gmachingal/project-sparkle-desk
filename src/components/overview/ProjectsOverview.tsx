import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, ChevronRight } from "lucide-react";

interface ProjectsOverviewProps {
  projects: string[];
}

const ProjectsOverview = ({ projects }: ProjectsOverviewProps) => {
  const getRandomProgress = () => Math.floor(Math.random() * 40) + 40;
  const getRandomTeamSize = () => Math.floor(Math.random() * 5) + 2;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-warning" />
            Active Projects
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-warning">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project, index) => {
            const progress = getRandomProgress();
            const teamSize = getRandomTeamSize();
            
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-warning to-warning-glow flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm group-hover:text-warning transition-colors truncate">
                    {project}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {teamSize} members
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {progress}% complete
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-16 h-1.5" />
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-warning transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsOverview;