import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  progress: number;
}

interface TasksSummaryProps {
  tasks: Task[];
  getTaskStatusIcon: (status: string) => React.ReactNode;
}

const TasksSummary = ({ tasks, getTaskStatusIcon }: TasksSummaryProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 text-red-700 bg-red-50";
      case "medium":
        return "border-yellow-200 text-yellow-700 bg-yellow-50";
      default:
        return "border-blue-200 text-blue-700 bg-blue-50";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Tasks</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 cursor-pointer group"
            >
              <div className="flex-shrink-0">
                {getTaskStatusIcon(task.status)}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                  {task.name}
                </h5>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getPriorityColor(task.priority))}
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {task.progress}% complete
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={task.progress} className="w-16 h-1.5" />
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksSummary;