import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Target, Clock, Users, MoreHorizontal, Play, Edit } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  totalPoints: number;
  completedPoints: number;
  taskCount: number;
  completedTasks: number;
  projectId: string;
  teamMembers?: Array<{
    id: string;
    name: string;
    avatar?: string;
    color: string;
  }>;
}

interface SprintCardProps {
  sprint: Sprint;
}

const SprintCard: React.FC<SprintCardProps> = ({ sprint }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const daysRemaining = differenceInDays(sprint.endDate, new Date());
  const isActive = sprint.status === 'active';
  const isOverdue = daysRemaining < 0 && sprint.status === 'active';

  const handleCardClick = () => {
    navigate(`/sprint-dashboard/${sprint.projectId}/${sprint.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-sprint/${sprint.projectId}/${sprint.id}`);
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        isActive ? 'ring-2 ring-primary/20 border-primary/30' : ''
      } ${isOverdue ? 'border-red-300 bg-red-50/30' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{sprint.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {sprint.goal}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(sprint.status)}>
              {sprint.status === 'active' ? 'Active' : 
               sprint.status === 'completed' ? 'Completed' :
               sprint.status === 'planning' ? 'Planning' : 'Cancelled'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{sprint.progress}%</span>
          </div>
          <Progress value={sprint.progress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Target className="h-3 w-3" />
              Story Points
            </div>
            <div className="text-lg font-semibold">
              {sprint.completedPoints}/{sprint.totalPoints}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              Tasks
            </div>
            <div className="text-lg font-semibold">
              {sprint.completedTasks}/{sprint.taskCount}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              Duration
            </div>
            <div className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {isOverdue ? 
                `${Math.abs(daysRemaining)} days overdue` :
                daysRemaining > 0 ? 
                  `${daysRemaining} days left` : 
                  'Ended'
              }
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {format(sprint.startDate, 'MMM dd')} - {format(sprint.endDate, 'MMM dd, yyyy')}
          </div>
        </div>

        {/* Team Members */}
        {sprint.teamMembers && sprint.teamMembers.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              Team
            </div>
            <div className="flex items-center gap-1">
              {sprint.teamMembers.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-6 w-6">
                  <AvatarFallback 
                    className="text-xs"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {sprint.teamMembers.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                  +{sprint.teamMembers.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 border-t">
          <Button 
            variant={isActive ? 'default' : 'outline'} 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            {isActive ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                View Sprint
              </>
            ) : (
              'View Details'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintCard;