import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Calendar,
  Users,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Sprint {
  id: string;
  name: string;
  goal: string;
  status: 'active' | 'planned' | 'completed';
  progress: number;
  startDate: Date;
  endDate: Date;
  storyPoints: {
    total: number;
    completed: number;
  };
  tasks: {
    total: number;
    completed: number;
  };
  teamMembers: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

const SprintOverview = () => {
  const navigate = useNavigate();

  // Mock current sprints data - in real app this would come from API
  const currentSprints: Sprint[] = [
    {
      id: "1",
      name: "Sprint 1 - Foundation",
      goal: "Set up project foundation and core authentication",
      status: "active",
      progress: 75,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      storyPoints: { total: 34, completed: 26 },
      tasks: { total: 12, completed: 9 },
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "2", name: "Mike Johnson" },
        { id: "3", name: "Emily Davis" }
      ]
    },
    {
      id: "2", 
      name: "Sprint 1 - MVP",
      goal: "Complete MVP features and basic functionality",
      status: "active",
      progress: 45,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-10'),
      storyPoints: { total: 21, completed: 9 },
      tasks: { total: 8, completed: 3 },
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "4", name: "Alex Kim" }
      ]
    }
  ];

  const getStatusColor = (status: Sprint['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5" />
          Current Sprints
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/sprints')}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSprints.map((sprint) => {
            const daysRemaining = getDaysRemaining(sprint.endDate);
            
            return (
              <div 
                key={sprint.id} 
                className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/sprint-dashboard?sprint=${sprint.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{sprint.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(sprint.status)}`}
                      >
                        {sprint.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{sprint.goal}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{sprint.progress}%</span>
                  </div>
                  <Progress value={sprint.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Story Points:</span>
                    <span className="font-medium">{sprint.storyPoints.completed}/{sprint.storyPoints.total}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <div className="flex -space-x-1">
                      {sprint.teamMembers.slice(0, 3).map((member, index) => (
                        <Avatar key={member.id} className="w-5 h-5 border border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {sprint.teamMembers.length > 3 && (
                        <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+{sprint.teamMembers.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintOverview;