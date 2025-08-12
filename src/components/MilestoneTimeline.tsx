import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Flag,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate?: Date;
  endDate?: Date;
  progress: number;
  estimatedDuration: string;
  assignee?: string;
}

interface MilestoneTimelineProps {
  milestones?: Milestone[];
  className?: string;
}

const statusConfig = {
  planned: { icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted/50', label: 'Planned' },
  'in-progress': { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
  delayed: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Delayed' }
};

const priorityConfig = {
  low: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Low' },
  medium: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Medium' },
  high: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'High' },
  critical: { color: 'text-red-600', bg: 'bg-red-100', label: 'Critical' }
};

// Mock milestone data for demonstration
const defaultMilestones: Milestone[] = [
  {
    id: '1',
    name: 'Project Kickoff',
    description: 'Initial project setup, team onboarding, and requirements gathering',
    status: 'completed',
    priority: 'high',
    progress: 100,
    estimatedDuration: '1 week',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-07'),
    assignee: 'John Doe'
  },
  {
    id: '2',
    name: 'Design Phase',
    description: 'UI/UX design, wireframes, prototypes, and design system creation',
    status: 'completed',
    priority: 'high',
    progress: 100,
    estimatedDuration: '3 weeks',
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-28'),
    assignee: 'Jane Smith'
  },
  {
    id: '3',
    name: 'Frontend Development',
    description: 'Core functionality development and basic features implementation',
    status: 'in-progress',
    priority: 'medium',
    progress: 65,
    estimatedDuration: '4 weeks',
    startDate: new Date('2024-01-29'),
    endDate: new Date('2024-02-25'),
    assignee: 'Mike Johnson'
  },
  {
    id: '4',
    name: 'Backend Development',
    description: 'API development, database setup, and server configuration',
    status: 'in-progress',
    priority: 'high',
    progress: 45,
    estimatedDuration: '4 weeks',
    startDate: new Date('2024-02-05'),
    endDate: new Date('2024-03-03'),
    assignee: 'Sarah Davis'
  },
  {
    id: '5',
    name: 'Testing & QA',
    description: 'Comprehensive testing, bug fixes, and quality assurance',
    status: 'planned',
    priority: 'high',
    progress: 0,
    estimatedDuration: '2 weeks',
    startDate: new Date('2024-03-04'),
    endDate: new Date('2024-03-17'),
    assignee: 'Alex Wilson'
  },
  {
    id: '6',
    name: 'MVP Release',
    description: 'Minimum viable product deployment and initial user feedback',
    status: 'planned',
    priority: 'critical',
    progress: 0,
    estimatedDuration: '1 week',
    startDate: new Date('2024-03-18'),
    endDate: new Date('2024-03-24'),
    assignee: 'Team Lead'
  }
];

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ 
  milestones = defaultMilestones, 
  className 
}) => {
  const calculateOverallProgress = () => {
    if (milestones.length === 0) return 0;
    return Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length);
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'in-progress').length;
  const upcomingMilestones = milestones.filter(m => m.status === 'planned').length;
  const delayedMilestones = milestones.filter(m => m.status === 'delayed').length;

  return (
    <Card className={cn("border-0 shadow-sm bg-gradient-to-br from-card to-card/80", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Project Milestone Timeline
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="text-muted-foreground">Overall Progress:</span>
              <Badge variant="secondary">{calculateOverallProgress()}%</Badge>
            </div>
            <Progress value={calculateOverallProgress()} className="w-24" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedMilestones}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressMilestones}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{upcomingMilestones}</div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{delayedMilestones}</div>
            <div className="text-xs text-muted-foreground">Delayed</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border"></div>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => {
              const StatusIcon = statusConfig[milestone.status].icon;
              const isLast = index === milestones.length - 1;
              
              return (
                <div key={milestone.id} className="relative flex items-start gap-6">
                  {/* Timeline node */}
                  <div className={cn(
                    "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 bg-background shadow-sm",
                    milestone.status === 'completed' ? 'border-green-500 bg-green-50' : 
                    milestone.status === 'in-progress' ? 'border-blue-500 bg-blue-50' : 
                    milestone.status === 'delayed' ? 'border-red-500 bg-red-50' : 'border-border bg-muted/50'
                  )}>
                    <StatusIcon className={cn("w-5 h-5", statusConfig[milestone.status].color)} />
                  </div>
                  
                  {/* Milestone card */}
                  <Card className={cn(
                    "flex-1 transition-all duration-300 hover:shadow-lg border-0 shadow-sm",
                    milestone.status === 'completed' ? 'bg-gradient-to-br from-green-50/80 to-green-100/40' :
                    milestone.status === 'in-progress' ? 'bg-gradient-to-br from-blue-50/80 to-blue-100/40' :
                    milestone.status === 'delayed' ? 'bg-gradient-to-br from-red-50/80 to-red-100/40' :
                    'bg-gradient-to-br from-card to-card/50'
                  )}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg text-foreground">{milestone.name}</h4>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs font-medium", statusConfig[milestone.status].color)}
                            >
                              {statusConfig[milestone.status].label}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs font-medium", priorityConfig[milestone.priority].color)}
                            >
                              <Flag className="w-3 h-3 mr-1" />
                              {priorityConfig[milestone.priority].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{milestone.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            {milestone.startDate && (
                              <div>
                                <span className="text-muted-foreground">Start Date:</span>
                                <div className="font-medium">{format(milestone.startDate, 'MMM dd, yyyy')}</div>
                              </div>
                            )}
                            {milestone.endDate && (
                              <div>
                                <span className="text-muted-foreground">End Date:</span>
                                <div className="font-medium">{format(milestone.endDate, 'MMM dd, yyyy')}</div>
                              </div>
                            )}
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <div className="font-medium">{milestone.estimatedDuration}</div>
                            </div>
                            {milestone.assignee && (
                              <div>
                                <span className="text-muted-foreground">Assignee:</span>
                                <div className="font-medium flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {milestone.assignee}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      {milestone.status !== 'planned' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Progress</span>
                            <span className="font-semibold text-primary">{milestone.progress}%</span>
                          </div>
                          <Progress 
                            value={milestone.progress} 
                            className="h-3 bg-background/50"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Connection line to next milestone */}
                  {!isLast && (
                    <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-transparent via-border to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneTimeline;