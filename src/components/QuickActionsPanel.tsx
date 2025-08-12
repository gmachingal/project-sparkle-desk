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
  task: Task;
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
      <SheetContent className="w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Quick Task Actions
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Task Info Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">{taskTitle}</h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{task.description}</p>
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs ml-4 flex-shrink-0", getPriorityColor(task.priority))}
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    {task.priority} Priority
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium">{task.loggedHours || task.hours || 0}h / {task.estimatedHours || 0}h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned:</span>
                    <span className="font-medium">{getAssigneeName()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Status Management */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Change Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {!showStatusConfirm ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { status: 'todo', label: 'To Do', icon: CircleDot, color: 'bg-muted text-muted-foreground hover:bg-muted/80' },
                        { status: 'in-progress', label: 'In Progress', icon: CirclePlay, color: 'bg-primary/10 text-primary hover:bg-primary/20' },
                        { status: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success hover:bg-success/20' },
                        { status: 'blocked', label: 'Blocked', icon: Ban, color: 'bg-blocked/10 text-blocked hover:bg-blocked/20' }
                      ].map(({ status, label, icon: Icon, color }) => (
                        <Button
                          key={status}
                          variant="outline"
                          className={cn("justify-start gap-2 h-9", color)}
                          onClick={() => handleStatusChangeRequest(status)}
                          disabled={task.status === status}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                          {task.status === status && <span className="ml-auto text-xs opacity-60">(Current)</span>}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-sm font-medium">Confirm Status Change</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Change status from <span className="font-medium">{task.status.replace('-', ' ')}</span> to{' '}
                        <span className="font-medium">{pendingStatusChange?.replace('-', ' ')}</span>?
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={confirmStatusChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelStatusChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assignment Management */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Reassign Task
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {!showAssigneeConfirm ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      {teamMembers.map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          className="justify-start gap-2 h-9"
                          onClick={() => handleAssigneeChangeRequest(member.name)}
                          disabled={getAssigneeName() === member.name}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                          {!member.active && (
                            <Badge variant="outline" className="text-xs">Offline</Badge>
                          )}
                          {getAssigneeName() === member.name && (
                            <span className="text-xs text-muted-foreground">(Current)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-sm font-medium">Confirm Assignment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assign task from <span className="font-medium">{getAssigneeName()}</span> to{' '}
                        <span className="font-medium">{pendingAssigneeChange}</span>?
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={confirmAssigneeChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelAssigneeChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sprint Assignment */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Assign to Sprint
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {!showSprintConfirm ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      {sprints.map((sprint) => (
                        <Button
                          key={sprint.id}
                          variant="outline"
                          className="justify-start gap-2 h-9"
                          onClick={() => handleSprintChangeRequest(sprint.name)}
                          disabled={task.sprint === sprint.name}
                        >
                          <Target className="w-4 h-4" />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{sprint.name}</div>
                          </div>
                          <Badge 
                            variant={sprint.status === 'active' ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {sprint.status}
                          </Badge>
                          {task.sprint === sprint.name && (
                            <span className="text-xs text-muted-foreground">(Current)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-accent/50 rounded-lg border border-accent">
                      <p className="text-sm font-medium">Confirm Sprint Assignment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Move task from <span className="font-medium">{task.sprint || 'Unassigned'}</span> to{' '}
                        <span className="font-medium">{pendingSprintChange}</span>?
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={confirmSprintChange} className="flex-1">
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelSprintChange} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Due Date */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Update Due Date
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Due date management coming soon</p>
                  <Button variant="outline" className="w-full" disabled>
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Due Date
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comments Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Add Comment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment about this task change..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {comment.length}/500 characters
                  </span>
                  <Button 
                    size="sm" 
                    onClick={handleSendComment}
                    disabled={!comment.trim()}
                    className="gap-2"
                  >
                    <Send className="w-3 h-3" />
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