import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowRightLeft, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Ban
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  storyPoints?: number;
  dueDate?: Date;
  sprintId?: string;
  projectId: string;
}

interface Sprint {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'planned';
  startDate: Date;
  endDate: Date;
  projectId: string;
}

interface SprintTaskManagerProps {
  projectId: string;
  currentSprintId?: string;
  sprints: Sprint[];
  tasks: Task[];
  onMoveTask: (taskId: string, fromSprintId: string | null, toSprintId: string | null) => void;
  onAddTaskToSprint: (taskId: string, sprintId: string) => void;
  asDropdownItem?: boolean;
}

const SprintTaskManager: React.FC<SprintTaskManagerProps> = ({
  projectId,
  currentSprintId,
  sprints,
  tasks,
  onMoveTask,
  onAddTaskToSprint,
  asDropdownItem = false
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSprint, setSelectedSprint] = useState('all');
  const [targetSprint, setTargetSprint] = useState('');

  // Filter tasks by project
  const projectTasks = tasks.filter(task => task.projectId === projectId);
  
  // Get tasks not in any sprint (backlog tasks)
  const backlogTasks = projectTasks.filter(task => !task.sprintId);
  
  // Get tasks in current sprint
  const currentSprintTasks = currentSprintId 
    ? projectTasks.filter(task => task.sprintId === currentSprintId)
    : [];

  // Get all tasks in sprints for moving between sprints
  const sprintTasks = projectTasks.filter(task => task.sprintId);

  const getFilteredBacklogTasks = () => {
    return backlogTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredSprintTasks = () => {
    return sprintTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesSprint = selectedSprint === 'all' || selectedSprint === '' || task.sprintId === selectedSprint;
      return matchesSearch && matchesStatus && matchesSprint;
    });
  };

  const handleAddToSprint = (taskId: string) => {
    if (!targetSprint) {
      toast({
        title: "Error",
        description: "Please select a target sprint",
        variant: "destructive"
      });
      return;
    }

    onAddTaskToSprint(taskId, targetSprint);
    toast({
      title: "Task Added",
      description: "Task has been added to sprint successfully",
    });
  };

  const handleMoveTask = (taskId: string, fromSprintId: string) => {
    if (!targetSprint) {
      toast({
        title: "Error", 
        description: "Please select a target sprint",
        variant: "destructive"
      });
      return;
    }

    const targetSprintName = sprints.find(s => s.id === targetSprint)?.name || 'Unknown Sprint';
    const fromSprintName = sprints.find(s => s.id === fromSprintId)?.name || 'Unknown Sprint';

    onMoveTask(taskId, fromSprintId, targetSprint === 'backlog' ? null : targetSprint);
    toast({
      title: "Task Moved",
      description: `Task moved from ${fromSprintName} to ${targetSprint === 'backlog' ? 'Backlog' : targetSprintName}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'blocked': return <Ban className="h-4 w-4 text-red-600" />;
      case 'todo': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const renderTaskCard = (task: Task, showMoveButton = false, showAddButton = false) => (
    <Card key={task.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(task.status)}
              <h4 className="font-medium">{task.title}</h4>
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {task.storyPoints && (
                <span>SP: {task.storyPoints}</span>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {task.dueDate.toLocaleDateString()}
                </div>
              )}
              {task.sprintId && (
                <span>Sprint: {sprints.find(s => s.id === task.sprintId)?.name}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {showAddButton && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAddToSprint(task.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
            {showMoveButton && task.sprintId && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleMoveTask(task.id, task.sprintId!)}
              >
                <ArrowRightLeft className="h-4 w-4 mr-1" />
                Move
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {asDropdownItem ? (
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setIsOpen(true); }}>
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Manage Sprint Tasks
          </DropdownMenuItem>
        ) : (
          <Button variant="ghost">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Manage Sprint Tasks
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Sprint Task Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Search Tasks</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Status Filter</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Source Sprint (for moving)</Label>
                  <Select value={selectedSprint} onValueChange={setSelectedSprint}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sprint..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sprints</SelectItem>
                      {sprints.map(sprint => (
                        <SelectItem key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target Sprint</Label>
                  <Select value={targetSprint} onValueChange={setTargetSprint}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog (No Sprint)</SelectItem>
                      {sprints.map(sprint => (
                        <SelectItem key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different views */}
          <Tabs defaultValue="backlog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[300px] rounded-t-lg h-12">
              <TabsTrigger value="backlog">Add to Sprint ({backlogTasks.length})</TabsTrigger>
              <TabsTrigger value="move">Move Between Sprints ({sprintTasks.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="backlog" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Backlog Tasks - Add to Sprint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getFilteredBacklogTasks().length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {getFilteredBacklogTasks().map(task => 
                        renderTaskCard(task, false, true)
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Backlog Tasks Found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? 'Try adjusting your search or filters.' : 'All tasks are already in sprints.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="move" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    Sprint Tasks - Move Between Sprints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getFilteredSprintTasks().length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {getFilteredSprintTasks().map(task => 
                        renderTaskCard(task, true, false)
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Sprint Tasks Found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery ? 'Try adjusting your search or filters.' : 'No tasks are currently in sprints.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SprintTaskManager;