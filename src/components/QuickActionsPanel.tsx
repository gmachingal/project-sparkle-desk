import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  Activity,
  User,
  Clock,
  Flag,
  MessageSquare,
  X,
  CheckCircle,
  CircleDot,
  CirclePlay,
  Ban,
  Target,
  Send,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  assignee?: {
    name: string;
    avatar?: string;
  } | string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedHours?: number;
  loggedHours?: number;
  hours?: number;
  sprint?: string;
  project?: string;
}

interface QuickActionsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onStatusChange?: (taskId: string, newStatus: string) => void;
  onAssigneeChange?: (taskId: string, newAssignee: string) => void;
  onSprintChange?: (taskId: string, newSprint: string) => void;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  isOpen,
  onOpenChange,
  task,
  onStatusChange,
  onAssigneeChange,
  onSprintChange
}) => {
  const [pendingStatusChange, setPendingStatusChange] = useState<string | null>(null);
  const [pendingAssigneeChange, setPendingAssigneeChange] = useState<string | null>(null);
  const [pendingSprintChange, setPendingSprintChange] = useState<string | null>(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showAssigneeConfirm, setShowAssigneeConfirm] = useState(false);
  const [showSprintConfirm, setShowSprintConfirm] = useState(false);
  const [comment, setComment] = useState('');

  // Early return if no task is provided
  if (!task) {
    return null;
  }

  const taskTitle = task.title || task.name || 'Untitled Task';

  const getAssigneeName = () => {
    if (typeof task.assignee === 'string') return task.assignee;
    return task.assignee?.name || 'Unassigned';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-success/10 text-success border-success/20';
    }
  };

  // Mock data
  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Frontend Developer', active: true },
    { id: '2', name: 'Jane Smith', role: 'Backend Developer', active: true },
    { id: '3', name: 'Mike Johnson', role: 'UI/UX Designer', active: false },
    { id: '4', name: 'Sarah Wilson', role: 'QA Engineer', active: true },
    { id: '5', name: 'David Brown', role: 'DevOps Engineer', active: true }
  ];

  const sprints = [
    { id: 'backlog', name: 'Backlog', status: 'planned' },
    { id: 'current-sprint', name: 'Current Sprint', status: 'active' },
    { id: 'next-sprint', name: 'Next Sprint', status: 'planned' }
  ];

  // Status handlers
  const handleStatusChangeRequest = (newStatus: string) => {
    setPendingStatusChange(newStatus);
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatusChange && onStatusChange) {
      onStatusChange(task.id, pendingStatusChange);
    }
    setPendingStatusChange(null);
    setShowStatusConfirm(false);
    onOpenChange(false);
  };

  const cancelStatusChange = () => {
    setPendingStatusChange(null);
    setShowStatusConfirm(false);
  };

  // Assignee handlers
  const handleAssigneeChangeRequest = (newAssignee: string) => {
    setPendingAssigneeChange(newAssignee);
    setShowAssigneeConfirm(true);
  };

  const confirmAssigneeChange = () => {
    if (pendingAssigneeChange && onAssigneeChange) {
      onAssigneeChange(task.id, pendingAssigneeChange);
    }
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
    onOpenChange(false);
  };

  const cancelAssigneeChange = () => {
    setPendingAssigneeChange(null);
    setShowAssigneeConfirm(false);
  };

  // Sprint handlers
  const handleSprintChangeRequest = (newSprint: string) => {
    setPendingSprintChange(newSprint);
    setShowSprintConfirm(true);
  };

  const confirmSprintChange = () => {
    if (pendingSprintChange && onSprintChange) {
      onSprintChange(task.id, pendingSprintChange);
    }
    setPendingSprintChange(null);
    setShowSprintConfirm(false);
    onOpenChange(false);
  };

  const cancelSprintChange = () => {
    setPendingSprintChange(null);
    setShowSprintConfirm(false);
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log(`Comment for task ${task.id}: ${comment}`);
      setComment('');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-full sm:w-[800px] lg:w-[900px] overflow-y-auto bg-background border-l shadow-2xl z-50" 
        side="right"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <SheetHeader className="border-b pb-6 mb-6">
          <SheetTitle className="flex items-center gap-3 text-foreground text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            Quick Task Actions
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-8 bg-background">
          {/* Task Info Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20 shadow-sm">
            <CardContent className="p-8 bg-card">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-2xl text-foreground mb-3">{taskTitle}</h4>
                    {task.description && (
                      <p className="text-base text-muted-foreground leading-relaxed">{task.description}</p>
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-sm px-3 py-1 ml-6 flex-shrink-0", getPriorityColor(task.priority))}
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    {task.priority} Priority
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-3 text-base">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-semibold ml-2">{task.loggedHours || task.hours || 0}h / {task.estimatedHours || 0}h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-base">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Assigned:</span>
                      <span className="font-semibold ml-2">{getAssigneeName()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Section - Single Column Layout */}
          <div className="space-y-8">
            
            {/* Status Management */}
            <Card className="bg-card shadow-sm">
              <CardHeader className="pb-4 bg-card">
                <CardTitle className="text-xl flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  Change Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 bg-card">
                {!showStatusConfirm ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { status: 'todo', label: 'To Do', icon: CircleDot, color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
                        { status: 'in-progress', label: 'In Progress', icon: CirclePlay, color: 'bg-primary/10 text-primary hover:bg-primary/20' },
                        { status: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success hover:bg-success/20' },
                        { status: 'blocked', label: 'Blocked', icon: Ban, color: 'bg-blocked/10 text-blocked hover:bg-blocked/20' }
                      ].map(({ status, label, icon: Icon, color }) => (
                        <Button
                          key={status}
                          variant="outline"
                          className={cn("justify-start gap-3 h-14 text-base w-full", color)}
                          onClick={() => handleStatusChangeRequest(status)}
                          disabled={task.status === status}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{label}</span>
                          {task.status === status && <span className="text-sm opacity-60 flex-shrink-0">(Current)</span>}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-base font-medium">Confirm Status Change</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Change status from <span className="font-medium">{task.status.replace('-', ' ')}</span> to{' '}
                        <span className="font-medium">{pendingStatusChange?.replace('-', ' ')}</span>?
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" onClick={confirmStatusChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="lg" variant="outline" onClick={cancelStatusChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assignment Management */}
            <Card className="bg-card shadow-sm">
              <CardHeader className="pb-4 bg-card">
                <CardTitle className="text-xl flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  Reassign Task
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 bg-card">
                {!showAssigneeConfirm ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {teamMembers.map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          className="justify-start gap-4 h-16 text-base w-full p-4"
                          onClick={() => handleAssigneeChangeRequest(member.name)}
                          disabled={getAssigneeName() === member.name}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0 font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-semibold text-base truncate">{member.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{member.role}</div>
                          </div>
                          {!member.active && (
                            <Badge variant="outline" className="text-sm flex-shrink-0">Offline</Badge>
                          )}
                          {getAssigneeName() === member.name && (
                            <span className="text-sm text-muted-foreground flex-shrink-0 font-medium">(Current)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-base font-medium">Confirm Assignment</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Assign task from <span className="font-medium">{getAssigneeName()}</span> to{' '}
                        <span className="font-medium">{pendingAssigneeChange}</span>?
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" onClick={confirmAssigneeChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="lg" variant="outline" onClick={cancelAssigneeChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sprint Assignment */}
            <Card className="bg-card shadow-sm">
              <CardHeader className="pb-4 bg-card">
                <CardTitle className="text-xl flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Assign to Sprint
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 bg-card">
                {!showSprintConfirm ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {sprints.map((sprint) => (
                        <Button
                          key={sprint.id}
                          variant="outline"
                          className="justify-start gap-4 h-16 text-base w-full p-4"
                          onClick={() => handleSprintChangeRequest(sprint.name)}
                          disabled={task.sprint === sprint.name}
                        >
                          <Target className="w-6 h-6 flex-shrink-0 text-primary" />
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-semibold text-base truncate">{sprint.name}</div>
                          </div>
                          <Badge 
                            variant={sprint.status === 'active' ? 'default' : 'secondary'} 
                            className="text-sm flex-shrink-0 px-3 py-1"
                          >
                            {sprint.status}
                          </Badge>
                          {task.sprint === sprint.name && (
                            <span className="text-sm text-muted-foreground flex-shrink-0 ml-3 font-medium">(Current)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-base font-medium">Confirm Sprint Assignment</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Move task from <span className="font-medium">{task.sprint || 'Unassigned'}</span> to{' '}
                        <span className="font-medium">{pendingSprintChange}</span>?
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" onClick={confirmSprintChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="lg" variant="outline" onClick={cancelSprintChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Due Date */}
            <Card className="bg-card shadow-sm">
              <CardHeader className="pb-4 bg-card">
                <CardTitle className="text-xl flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  Update Due Date
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 bg-card">
                <div className="space-y-4">
                  <p className="text-base text-muted-foreground">Due date management coming soon</p>
                  <Button variant="outline" className="w-full h-14 text-base" disabled>
                    <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="truncate">Set Due Date</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comments Section */}
          <Card className="bg-card shadow-sm">
            <CardHeader className="pb-4 bg-card">
              <CardTitle className="text-xl flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                Add Comment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 bg-card">
              <div className="space-y-4">
                <Textarea
                  placeholder="Add a comment about this task change..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px] resize-none w-full text-base"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {comment.length}/500 characters
                  </span>
                  <Button 
                    size="lg" 
                    onClick={handleSendComment}
                    disabled={!comment.trim()}
                    className="gap-3 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    Send Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickActionsPanel;