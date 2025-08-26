import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  stats: {
    tasksCompleted: number;
    tasksInProgress: number;
    workload: number;
    collaboration: number;
    currentCapacity: string;
    lastActivity: string;
  };
  getWorkloadColor: (workload: number) => string;
}

const StatsOverview = ({ stats, getWorkloadColor }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Tasks Completed */}
      <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success-glow/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{stats.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <Card className="border-info/20 bg-gradient-to-br from-info/5 to-info-glow/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/20">
              <Clock className="w-5 h-5 text-info" />
            </div>
            <div>
              <div className="text-2xl font-bold text-info">{stats.tasksInProgress}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workload */}
      <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning-glow/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Target className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <div className={cn("text-2xl font-bold", getWorkloadColor(stats.workload))}>
                {stats.workload}%
              </div>
              <div className="text-xs text-muted-foreground">Workload</div>
              <Progress value={stats.workload} className="h-1 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collaboration */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-400/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-purple-500">{stats.collaboration}%</div>
              <div className="text-xs text-muted-foreground">Team Score</div>
              <Progress value={stats.collaboration} className="h-1 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;