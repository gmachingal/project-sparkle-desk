import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Circle,
  Flag,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Play,
  Pause,
  ChevronDown,
  ChevronRight,
  Eye,
  Edit
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
  tasks?: Array<{
    id: string;
    name: string;
    status: 'todo' | 'in-progress' | 'completed' | 'blocked';
    assignee: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    estimatedHours: number;
    loggedHours: number;
  }>;
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
    assignee: 'John Doe',
    tasks: [
      { id: '1', name: 'Team Onboarding Session', status: 'completed', assignee: 'John Doe', priority: 'high', estimatedHours: 8, loggedHours: 8 },
      { id: '2', name: 'Requirements Documentation', status: 'completed', assignee: 'Sarah Smith', priority: 'high', estimatedHours: 12, loggedHours: 11 },
      { id: '3', name: 'Project Setup & Tools', status: 'completed', assignee: 'Mike Johnson', priority: 'medium', estimatedHours: 6, loggedHours: 7 }
    ]
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
    assignee: 'Jane Smith',
    tasks: [
      { id: '4', name: 'User Research & Analysis', status: 'completed', assignee: 'Jane Smith', priority: 'high', estimatedHours: 16, loggedHours: 18 },
      { id: '5', name: 'Wireframe Creation', status: 'completed', assignee: 'Emily Davis', priority: 'high', estimatedHours: 20, loggedHours: 19 },
      { id: '6', name: 'Design System Setup', status: 'completed', assignee: 'Jane Smith', priority: 'medium', estimatedHours: 14, loggedHours: 15 },
      { id: '7', name: 'Prototype Development', status: 'completed', assignee: 'Alex Wilson', priority: 'medium', estimatedHours: 12, loggedHours: 13 }
    ]
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
    assignee: 'Mike Johnson',
    tasks: [
      { id: '8', name: 'Component Library Setup', status: 'completed', assignee: 'Mike Johnson', priority: 'high', estimatedHours: 16, loggedHours: 14 },
      { id: '9', name: 'Homepage Implementation', status: 'in-progress', assignee: 'Sarah Chen', priority: 'high', estimatedHours: 24, loggedHours: 18 },
      { id: '10', name: 'Responsive Layout', status: 'in-progress', assignee: 'Mike Johnson', priority: 'medium', estimatedHours: 18, loggedHours: 12 },
      { id: '11', name: 'User Dashboard', status: 'todo', assignee: 'David Liu', priority: 'medium', estimatedHours: 20, loggedHours: 0 },
      { id: '12', name: 'Performance Optimization', status: 'todo', assignee: 'Sarah Chen', priority: 'low', estimatedHours: 10, loggedHours: 0 }
    ]
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
    assignee: 'Sarah Davis',
    tasks: [
      { id: '13', name: 'Database Schema Design', status: 'completed', assignee: 'Sarah Davis', priority: 'critical', estimatedHours: 12, loggedHours: 11 },
      { id: '14', name: 'API Endpoints Development', status: 'in-progress', assignee: 'Tom Wilson', priority: 'high', estimatedHours: 28, loggedHours: 20 },
      { id: '15', name: 'Authentication System', status: 'in-progress', assignee: 'Sarah Davis', priority: 'high', estimatedHours: 16, loggedHours: 8 },
      { id: '16', name: 'Data Migration Scripts', status: 'todo', assignee: 'Tom Wilson', priority: 'medium', estimatedHours: 14, loggedHours: 0 }
    ]
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
    assignee: 'Alex Wilson',
    tasks: [
      { id: '17', name: 'Test Case Development', status: 'todo', assignee: 'Alex Wilson', priority: 'high', estimatedHours: 20, loggedHours: 0 },
      { id: '18', name: 'Automated Testing Setup', status: 'todo', assignee: 'QA Team', priority: 'medium', estimatedHours: 16, loggedHours: 0 },
      { id: '19', name: 'Integration Testing', status: 'todo', assignee: 'Alex Wilson', priority: 'high', estimatedHours: 18, loggedHours: 0 },
      { id: '20', name: 'Performance Testing', status: 'todo', assignee: 'QA Team', priority: 'medium', estimatedHours: 12, loggedHours: 0 }
    ]
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
    assignee: 'Team Lead',
    tasks: [
      { id: '21', name: 'Production Deployment', status: 'todo', assignee: 'DevOps Team', priority: 'critical', estimatedHours: 8, loggedHours: 0 },
      { id: '22', name: 'User Acceptance Testing', status: 'todo', assignee: 'Product Team', priority: 'high', estimatedHours: 16, loggedHours: 0 },
      { id: '23', name: 'Documentation Finalization', status: 'todo', assignee: 'Team Lead', priority: 'medium', estimatedHours: 10, loggedHours: 0 }
    ]
  }
];

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ 
  milestones = defaultMilestones, 
  className 
}) => {
  const [selectedMilestoneForTasks, setSelectedMilestoneForTasks] = useState<any>(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<any>(null);
  const calculateOverallProgress = () => {
    if (milestones.length === 0) return 0;
    return Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length);
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'in-progress').length;
  const upcomingMilestones = milestones.filter(m => m.status === 'planned').length;
  const delayedMilestones = milestones.filter(m => m.status === 'delayed').length;

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Play className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <Pause className="w-3 h-3 text-red-500" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

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
                      
                       {/* Tasks Section */}
                       {milestone.tasks && milestone.tasks.length > 0 && (
                         <div className="mt-4 pt-4 border-t border-border/30">
                           <div className="flex items-center justify-between w-full">
                             <h5 className="font-medium text-sm flex items-center gap-2">
                               <FileText className="w-4 h-4" />
                               Tasks ({milestone.tasks.length})
                             </h5>
                             <div className="flex items-center gap-2">
                               <div className="text-xs text-muted-foreground">
                                 {milestone.tasks.filter(t => t.status === 'completed').length} / {milestone.tasks.length} completed
                               </div>
                               <Sheet>
                                 <SheetTrigger asChild>
                                   <Button 
                                     variant="outline" 
                                     size="sm" 
                                     onClick={() => setSelectedMilestoneForTasks(milestone)}
                                   >
                                     <Eye className="w-4 h-4 mr-2" />
                                     View Tasks
                                   </Button>
                                 </SheetTrigger>
                                 <SheetContent className="w-[400px] sm:w-[540px]">
                                   <SheetHeader>
                                     <SheetTitle className="flex items-center gap-3">
                                       <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                                         <Target className="w-5 h-5" />
                                       </div>
                                       <div>
                                         <div className="font-semibold">{milestone.name}</div>
                                         <div className="text-sm text-muted-foreground">{milestone.tasks?.length} Tasks</div>
                                       </div>
                                     </SheetTitle>
                                   </SheetHeader>
                                   
                                   <div className="mt-6 space-y-6">
                                     {/* Task Stats */}
                                     <div className="grid grid-cols-4 gap-4">
                                       <div className="text-center p-3 bg-muted/30 rounded-lg">
                                         <div className="text-2xl font-bold text-green-600">{milestone.tasks?.filter(t => t.status === 'completed').length || 0}</div>
                                         <div className="text-xs text-muted-foreground">Completed</div>
                                       </div>
                                       <div className="text-center p-3 bg-muted/30 rounded-lg">
                                         <div className="text-2xl font-bold text-blue-600">{milestone.tasks?.filter(t => t.status === 'in-progress').length || 0}</div>
                                         <div className="text-xs text-muted-foreground">In Progress</div>
                                       </div>
                                       <div className="text-center p-3 bg-muted/30 rounded-lg">
                                         <div className="text-2xl font-bold text-gray-600">{milestone.tasks?.filter(t => t.status === 'todo').length || 0}</div>
                                         <div className="text-xs text-muted-foreground">Todo</div>
                                       </div>
                                       <div className="text-center p-3 bg-muted/30 rounded-lg">
                                         <div className="text-2xl font-bold text-orange-600">{milestone.tasks?.reduce((sum, t) => sum + t.loggedHours, 0) || 0}h</div>
                                         <div className="text-xs text-muted-foreground">Total Hours</div>
                                       </div>
                                     </div>
                                     
                                     {/* Tasks List */}
                                     <div className="space-y-3">
                                       <h4 className="font-medium flex items-center gap-2">
                                         <FileText className="w-4 h-4" />
                                         All Tasks ({milestone.tasks?.length || 0})
                                       </h4>
                                       
                                       <div className="space-y-2 max-h-96 overflow-y-auto">
                                         {milestone.tasks?.map((task) => (
                                           <Card key={task.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                                             <div className="flex items-start gap-3">
                                               <div className="flex-shrink-0 mt-0.5">
                                                 {getTaskStatusIcon(task.status)}
                                               </div>
                                               <div className="flex-1 min-w-0">
                                                 <div className="flex items-center gap-2 mb-1">
                                                   <span className="font-medium text-sm truncate">{task.name}</span>
                                                   <Badge 
                                                     variant="outline" 
                                                     className={cn("text-xs px-1.5 py-0.5", getTaskPriorityColor(task.priority))}
                                                   >
                                                     {task.priority}
                                                   </Badge>
                                                 </div>
                                                 <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                                   <span className="flex items-center gap-1">
                                                     <Users className="w-3 h-3" />
                                                     {task.assignee}
                                                   </span>
                                                   <span className="flex items-center gap-1">
                                                     <Clock className="w-3 h-3" />
                                                     {task.loggedHours}h / {task.estimatedHours}h
                                                   </span>
                                                 </div>
                                                 <div className="space-y-1">
                                                   <div className="flex items-center justify-between text-xs">
                                                     <span className="text-muted-foreground">Progress</span>
                                                     <span className="font-medium">
                                                       {task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0}%
                                                     </span>
                                                   </div>
                                                   <Progress 
                                                     value={task.estimatedHours > 0 ? (task.loggedHours / task.estimatedHours) * 100 : 0} 
                                                     className="h-1.5"
                                                   />
                                                 </div>
                                               </div>
                                               <Sheet>
                                                 <SheetTrigger asChild>
                                                   <Button 
                                                     variant="ghost" 
                                                     size="sm" 
                                                     className="h-6 px-2 text-xs"
                                                     onClick={() => setSelectedTaskDetails(task)}
                                                   >
                                                     <Eye className="w-3 h-3 mr-1" />
                                                     Details
                                                   </Button>
                                                 </SheetTrigger>
                                                 <SheetContent className="w-[400px] sm:w-[540px]">
                                                   <SheetHeader>
                                                     <SheetTitle className="flex items-center gap-2">
                                                       {getTaskStatusIcon(task.status)}
                                                       Task Details
                                                     </SheetTitle>
                                                   </SheetHeader>
                                                   
                                                   <div className="mt-6 space-y-6">
                                                     <Card>
                                                       <CardContent className="p-4">
                                                         <div className="space-y-3">
                                                           <div>
                                                             <label className="text-sm font-medium text-muted-foreground">Task Name</label>
                                                             <div className="font-semibold text-lg">{task.name}</div>
                                                           </div>
                                                           <div className="grid grid-cols-2 gap-4">
                                                             <div>
                                                               <label className="text-sm font-medium text-muted-foreground">Status</label>
                                                               <div className="flex items-center gap-2">
                                                                 {getTaskStatusIcon(task.status)}
                                                                 <span className="capitalize">{task.status.replace('-', ' ')}</span>
                                                               </div>
                                                             </div>
                                                             <div>
                                                               <label className="text-sm font-medium text-muted-foreground">Priority</label>
                                                               <div>
                                                                 <Badge 
                                                                   variant="outline" 
                                                                   className={cn("text-xs", getTaskPriorityColor(task.priority))}
                                                                 >
                                                                   {task.priority}
                                                                 </Badge>
                                                               </div>
                                                             </div>
                                                           </div>
                                                           <div className="grid grid-cols-2 gap-4">
                                                             <div>
                                                               <label className="text-sm font-medium text-muted-foreground">Assignee</label>
                                                               <div className="font-medium">{task.assignee}</div>
                                                             </div>
                                                             <div>
                                                               <label className="text-sm font-medium text-muted-foreground">Milestone</label>
                                                               <div className="font-medium">{milestone.name}</div>
                                                             </div>
                                                           </div>
                                                         </div>
                                                       </CardContent>
                                                     </Card>

                                                     {/* Time Tracking */}
                                                     <Card>
                                                       <CardHeader>
                                                         <CardTitle className="text-sm">Time Tracking</CardTitle>
                                                       </CardHeader>
                                                       <CardContent>
                                                         <div className="space-y-4">
                                                           <div className="grid grid-cols-2 gap-4 text-center">
                                                             <div className="p-3 bg-muted/30 rounded-lg">
                                                               <div className="text-lg font-bold text-primary">{task.loggedHours}h</div>
                                                               <div className="text-xs text-muted-foreground">Logged</div>
                                                             </div>
                                                             <div className="p-3 bg-muted/30 rounded-lg">
                                                               <div className="text-lg font-bold text-blue-600">{task.estimatedHours}h</div>
                                                               <div className="text-xs text-muted-foreground">Estimated</div>
                                                             </div>
                                                           </div>
                                                           <div className="space-y-2">
                                                             <div className="flex items-center justify-between text-sm">
                                                               <span className="text-muted-foreground">Progress</span>
                                                               <span className="font-medium">
                                                                 {task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0}%
                                                               </span>
                                                             </div>
                                                             <Progress 
                                                               value={task.estimatedHours > 0 ? (task.loggedHours / task.estimatedHours) * 100 : 0} 
                                                               className="h-2"
                                                             />
                                                           </div>
                                                         </div>
                                                       </CardContent>
                                                     </Card>

                                                     {/* Action Buttons */}
                                                     <div className="flex gap-2">
                                                       <Button className="flex-1">
                                                         <Edit className="w-4 h-4 mr-2" />
                                                         Edit Task
                                                       </Button>
                                                       <Button variant="outline" className="flex-1">
                                                         <Clock className="w-4 h-4 mr-2" />
                                                         Log Time
                                                       </Button>
                                                     </div>
                                                   </div>
                                                 </SheetContent>
                                               </Sheet>
                                             </div>
                                           </Card>
                                         ))}
                                       </div>
                                     </div>
                                   </div>
                                 </SheetContent>
                               </Sheet>
                             </div>
                           </div>
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