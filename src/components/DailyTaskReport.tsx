import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Send, Eye, CheckSquare, Clock, Target } from "lucide-react";
import { format, addDays, subDays, parseISO } from "date-fns";
import TaskCard from "./TaskCard";

interface DailyTaskReportProps {
  isAdmin?: boolean;
  selectedUser?: string;
  onUserChange?: (userId: string) => void;
}

const DailyTaskReport = ({ isAdmin = false, selectedUser, onUserChange }: DailyTaskReportProps) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedProject, setSelectedProject] = useState('all');

  // Mock data
  const projects = [
    { id: 'project-1', name: 'Website Redesign' },
    { id: 'project-2', name: 'Mobile App' },
    { id: 'project-3', name: 'Marketing Campaign' },
  ];

  const users = [
    { id: 'user-1', name: 'Alex Johnson' },
    { id: 'user-2', name: 'Sarah Chen' },
    { id: 'user-3', name: 'Mike Wilson' },
  ];

  const dailyTasks = [
    {
      id: "1",
      title: "Review authentication module",
      description: "Complete security review and testing of new auth system",
      status: "completed" as const,
      priority: "high" as const,
      timeSpent: "3.5h",
      project: "Website Redesign",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      completedAt: "10:30 AM"
    },
    {
      id: "2", 
      title: "Update API documentation",
      description: "Document new endpoints and authentication flow",
      status: "in-progress" as const,
      priority: "medium" as const,
      timeSpent: "2h",
      project: "Website Redesign",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      startedAt: "2:00 PM"
    },
    {
      id: "3",
      title: "Design user dashboard mockups",
      description: "Create wireframes and high-fidelity designs",
      status: "completed" as const,
      priority: "high" as const,
      timeSpent: "4h",
      project: "Mobile App",
      assignee: { name: "Alex Johnson", avatar: "AJ" },
      completedAt: "4:45 PM"
    }
  ];

  const getFilteredTasks = () => {
    let filtered = dailyTasks;
    if (selectedProject !== 'all') {
      filtered = filtered.filter(task => task.project === projects.find(p => p.id === selectedProject)?.name);
    }
    return filtered;
  };

  const getProjectStats = (projectName: string) => {
    const projectTasks = dailyTasks.filter(task => task.project === projectName);
    const completed = projectTasks.filter(task => task.status === 'completed').length;
    const totalTime = projectTasks.reduce((acc, task) => {
      const hours = parseFloat(task.timeSpent.replace('h', ''));
      return acc + hours;
    }, 0);
    
    return { total: projectTasks.length, completed, totalTime };
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = parseISO(selectedDate);
    const newDate = direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1);
    setSelectedDate(format(newDate, 'yyyy-MM-dd'));
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = filteredTasks.filter(task => task.status === 'completed').length;
  const totalTime = filteredTasks.reduce((acc, task) => {
    const hours = parseFloat(task.timeSpent.replace('h', ''));
    return acc + hours;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Daily Task Report
          </CardTitle>
          {!isAdmin && (
            <Button variant="outline" size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              Send Report
            </Button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Date Navigation */}
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="px-3 py-1 text-sm font-medium min-w-[120px] text-center">
              {format(parseISO(selectedDate), 'MMM dd, yyyy')}
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* User Selection (Admin only) */}
          {isAdmin && (
            <Select value={selectedUser} onValueChange={onUserChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Project Filter */}
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{filteredTasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTime.toFixed(1)}h</div>
            <div className="text-sm text-muted-foreground">Hours Logged</div>
          </div>
        </div>

        {/* Project Breakdown */}
        {selectedProject === 'all' && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Project Breakdown</h4>
            {projects.map(project => {
              const stats = getProjectStats(project.name);
              if (stats.total === 0) return null;
              
              return (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.completed}/{stats.total} tasks • {stats.totalTime.toFixed(1)}h
                    </p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Target className="w-3 h-3" />
                    {Math.round((stats.completed / stats.total) * 100)}%
                  </Badge>
                </div>
              );
            })}
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Tasks Worked On</h4>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{task.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {task.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock className="w-3 h-3" />
                        {task.timeSpent}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.project}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {task.status === 'completed' && task.completedAt && (
                      <p>Completed at {task.completedAt}</p>
                    )}
                    {task.status === 'in-progress' && task.startedAt && (
                      <p>Started at {task.startedAt}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No tasks found for the selected criteria</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTaskReport;