import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { 
  CalendarIcon, 
  Clock, 
  Save, 
  Plus,
  Flag,
  ArrowLeft,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TimeLogging = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeEntries, setTimeEntries] = useState<Record<string, { hours: string; notes: string }>>({});

  // Mock tasks data - in real app this would come from API
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const allTasks = [
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create initial wireframes and high-fidelity designs for the new homepage",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: new Date(currentYear, currentMonth, 10),
      project: "Website Redesign",
      estimatedHours: 16,
      loggedHours: 8
    },
    {
      id: "2",
      title: "Review API documentation",
      description: "Go through the new API docs and provide feedback",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: new Date(currentYear, currentMonth, 15),
      project: "Mobile App",
      estimatedHours: 4,
      loggedHours: 2
    },
    {
      id: "3",
      title: "Update marketing copy",
      description: "Revise the product page copy based on user feedback",
      status: "completed" as const,
      priority: "low" as const,
      dueDate: new Date(currentYear, currentMonth, 8),
      project: "Marketing Campaign",
      estimatedHours: 6,
      loggedHours: 5
    },
    {
      id: "4",
      title: "Bug fixes for login flow",
      description: "Fix authentication issues reported by users",
      status: "todo" as const,
      priority: "high" as const,
      dueDate: new Date(currentYear, currentMonth, 20),
      project: "Website Redesign",
      estimatedHours: 12,
      loggedHours: 0
    },
    {
      id: "5",
      title: "Prepare presentation slides",
      description: "Create slides for the quarterly review meeting",
      status: "in-progress" as const,
      priority: "medium" as const,
      dueDate: new Date(currentYear, currentMonth, 25),
      project: "Internal",
      estimatedHours: 8,
      loggedHours: 3
    },
    {
      id: "6",
      title: "Code review for API",
      description: "Review pull requests for new API endpoints",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: new Date(currentYear, currentMonth, 18),
      project: "Mobile App",
      estimatedHours: 4,
      loggedHours: 1
    },
    {
      id: "7",
      title: "Testing mobile layout",
      description: "Test responsive design on various devices",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: new Date(currentYear, currentMonth, 22),
      project: "Website Redesign",
      estimatedHours: 24,
      loggedHours: 12
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTimeChange = (taskId: string, hours: string) => {
    setTimeEntries(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        hours
      }
    }));
  };

  const handleNotesChange = (taskId: string, notes: string) => {
    setTimeEntries(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        notes
      }
    }));
  };

  const handleSaveTimeEntry = (taskId: string) => {
    const entry = timeEntries[taskId];
    if (!entry?.hours || parseFloat(entry.hours) <= 0) {
      toast.error("Please enter valid hours");
      return;
    }

    const task = allTasks.find(t => t.id === taskId);
    toast.success(`Time logged for "${task?.title}": ${entry.hours} hours`);
    
    // Clear the entry after saving
    setTimeEntries(prev => ({
      ...prev,
      [taskId]: { hours: '', notes: '' }
    }));
  };

  const handleSaveAllEntries = () => {
    const validEntries = Object.entries(timeEntries).filter(([_, entry]) => 
      entry.hours && parseFloat(entry.hours) > 0
    );

    if (validEntries.length === 0) {
      toast.error("No valid time entries to save");
      return;
    }

    toast.success(`Saved ${validEntries.length} time entries for ${format(selectedDate, 'MMM dd, yyyy')}`);
    setTimeEntries({});
  };

  const getTotalHoursForDay = () => {
    return Object.values(timeEntries).reduce((total, entry) => {
      const hours = parseFloat(entry.hours) || 0;
      return total + hours;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Time Logging
              </h1>
              <p className="text-muted-foreground mt-1">
                Log time spent on tasks for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Hours Today</div>
              <div className="text-2xl font-bold text-primary">{getTotalHoursForDay()}h</div>
            </div>
            <Button onClick={handleSaveAllEntries} className="gap-2">
              <Save className="w-4 h-4" />
              Save All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Date Picker Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mb-4"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Active Tasks</span>
                      <span className="font-medium">{allTasks.filter(t => t.status !== 'completed').length}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Completed Tasks</span>
                      <span className="font-medium">{allTasks.filter(t => t.status === 'completed').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Tasks</span>
                      <span className="font-medium">{allTasks.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {allTasks.map((task) => {
                const entry = timeEntries[task.id] || { hours: '', notes: '' };
                const progressPercentage = task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0;
                
                return (
                  <Card key={task.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={getPriorityColor(task.priority)}>
                              <Flag className="w-3 h-3 mr-1" />
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
                          <Badge variant="secondary">{task.project}</Badge>
                        </div>
                      </div>

                      {/* Time Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress: {task.loggedHours}h / {task.estimatedHours}h</span>
                          <span>{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Time Entry Form */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-2">
                          <Label htmlFor={`hours-${task.id}`} className="text-sm font-medium">
                            Hours
                          </Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id={`hours-${task.id}`}
                              type="number"
                              step="0.25"
                              min="0"
                              max="24"
                              placeholder="0.00"
                              value={entry.hours}
                              onChange={(e) => handleTimeChange(task.id, e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-8">
                          <Label htmlFor={`notes-${task.id}`} className="text-sm font-medium">
                            Notes (Optional)
                          </Label>
                          <Textarea
                            id={`notes-${task.id}`}
                            placeholder="What did you work on?"
                            value={entry.notes}
                            onChange={(e) => handleNotesChange(task.id, e.target.value)}
                            className="resize-none"
                            rows={1}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Button 
                            onClick={() => handleSaveTimeEntry(task.id)}
                            disabled={!entry.hours || parseFloat(entry.hours) <= 0}
                            className="w-full gap-2"
                          >
                            <Timer className="w-4 h-4" />
                            Log Time
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLogging;