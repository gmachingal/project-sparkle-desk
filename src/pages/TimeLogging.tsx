import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { 
  CalendarIcon, 
  Clock, 
  Save, 
  Plus,
  Flag,
  Timer,
  ChevronLeft,
  ChevronRight,
  Filter,
  Activity,
  Target,
  Briefcase,
  User,
  Calendar as CalendarLucide
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TimeLogging = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeEntries, setTimeEntries] = useState<Record<string, { hours: string; notes: string }>>({});
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [filterProject, setFilterProject] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

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
      loggedHours: 8,
      assignee: "John Doe"
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
      loggedHours: 2,
      assignee: "Jane Smith"
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
      loggedHours: 5,
      assignee: "Sarah Wilson"
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
      loggedHours: 0,
      assignee: "Mike Johnson"
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
      loggedHours: 3,
      assignee: "Emily Davis"
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
      loggedHours: 1,
      assignee: "Alex Kim"
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
      loggedHours: 12,
      assignee: "David Liu"
    },
    {
      id: "8",
      title: "CI/CD pipeline setup",
      description: "Pipeline setup blocked due to server access restrictions",
      status: "blocked" as const,
      priority: "high" as const,
      dueDate: new Date(currentYear, currentMonth, 28),
      project: "Infrastructure",
      estimatedHours: 16,
      loggedHours: 3,
      assignee: "Robert Chen"
    },
    {
      id: "9",
      title: "Payment integration testing",
      description: "Testing blocked pending merchant account verification",
      status: "blocked" as const,
      priority: "medium" as const,
      dueDate: new Date(currentYear, currentMonth + 1, 5),
      project: "Mobile App",
      estimatedHours: 8,
      loggedHours: 1,
      assignee: "Lisa Zhang"
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

  const handleSaveAll = () => {
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

  // Mock time log history data with current month entries
  const currentMonthEntries = [
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), task: 'Design homepage mockups', project: 'Website Redesign', hours: 4.5, notes: 'Created wireframes and mockups' },
    { id: '2', date: format(new Date(), 'yyyy-MM-dd'), task: 'Code review for API', project: 'Mobile App', hours: 2, notes: 'Reviewed pull requests' },
    { id: '3', date: format(new Date(2024, 0, 22), 'yyyy-MM-dd'), task: 'Testing mobile layout', project: 'Website Redesign', hours: 6, notes: 'Tested on various devices' },
    { id: '4', date: format(new Date(2024, 0, 22), 'yyyy-MM-dd'), task: 'Update marketing copy', project: 'Marketing Campaign', hours: 3, notes: 'Revised product page copy' },
    { id: '5', date: format(new Date(2024, 0, 21), 'yyyy-MM-dd'), task: 'Prepare presentation slides', project: 'Internal', hours: 2.5, notes: 'Created quarterly review slides' },
    { id: '6', date: format(new Date(2024, 0, 21), 'yyyy-MM-dd'), task: 'Bug fixes for login flow', project: 'Website Redesign', hours: 5, notes: 'Fixed authentication issues' },
    { id: '7', date: format(new Date(2024, 0, 20), 'yyyy-MM-dd'), task: 'Design homepage mockups', project: 'Website Redesign', hours: 3.5, notes: 'Finalized design concepts' },
    { id: '8', date: format(new Date(2024, 0, 20), 'yyyy-MM-dd'), task: 'Review API documentation', project: 'Mobile App', hours: 2, notes: 'Provided feedback on docs' },
    { id: '9', date: format(new Date(2024, 0, 19), 'yyyy-MM-dd'), task: 'Testing mobile layout', project: 'Website Redesign', hours: 4, notes: 'Cross-browser testing' },
    { id: '10', date: format(new Date(2024, 0, 19), 'yyyy-MM-dd'), task: 'Prepare presentation slides', project: 'Internal', hours: 1.5, notes: 'Added charts and graphs' },
    { id: '11', date: format(new Date(2024, 0, 18), 'yyyy-MM-dd'), task: 'Code review for API', project: 'Mobile App', hours: 3, notes: 'Security review' },
    { id: '12', date: format(new Date(2024, 0, 18), 'yyyy-MM-dd'), task: 'Update marketing copy', project: 'Marketing Campaign', hours: 2, notes: 'A/B testing copy variations' },
    { id: '13', date: format(new Date(2024, 0, 17), 'yyyy-MM-dd'), task: 'Design homepage mockups', project: 'Website Redesign', hours: 6, notes: 'User feedback integration' },
    { id: '14', date: format(new Date(2024, 0, 17), 'yyyy-MM-dd'), task: 'Bug fixes for login flow', project: 'Website Redesign', hours: 2.5, notes: 'OAuth integration fixes' },
    { id: '15', date: format(new Date(2024, 0, 16), 'yyyy-MM-dd'), task: 'Testing mobile layout', project: 'Website Redesign', hours: 5, notes: 'Responsive design testing' },
    { id: '16', date: format(new Date(2024, 0, 16), 'yyyy-MM-dd'), task: 'Review API documentation', project: 'Mobile App', hours: 1.5, notes: 'API versioning review' },
    { id: '17', date: format(new Date(2024, 0, 15), 'yyyy-MM-dd'), task: 'Prepare presentation slides', project: 'Internal', hours: 4, notes: 'Quarterly metrics compilation' },
    { id: '18', date: format(new Date(2024, 0, 15), 'yyyy-MM-dd'), task: 'Code review for API', project: 'Mobile App', hours: 2, notes: 'Performance optimization review' },
  ];
  
  const timeLogHistory = [
    ...currentMonthEntries,
    { id: '19', date: '2024-01-19', task: 'Bug fixes for login flow', project: 'Website Redesign', hours: 5, notes: 'Fixed authentication issues' },
    { id: '20', date: '2024-01-18', task: 'Design homepage mockups', project: 'Website Redesign', hours: 3.5, notes: 'Finalized design concepts' },
    { id: '21', date: '2024-01-17', task: 'Review API documentation', project: 'Mobile App', hours: 2, notes: 'Provided feedback on docs' },
    { id: '22', date: '2024-01-16', task: 'Testing mobile layout', project: 'Website Redesign', hours: 4, notes: 'Cross-browser testing' },
    { id: '23', date: '2024-01-15', task: 'Prepare presentation slides', project: 'Internal', hours: 1.5, notes: 'Added charts and graphs' },
    { id: '24', date: '2024-01-14', task: 'Code review for API', project: 'Mobile App', hours: 3, notes: 'Security review' },
    { id: '25', date: '2024-01-13', task: 'Update marketing copy', project: 'Marketing Campaign', hours: 2, notes: 'A/B testing copy variations' },
    { id: '26', date: '2024-01-12', task: 'Design homepage mockups', project: 'Website Redesign', hours: 6, notes: 'User feedback integration' },
    { id: '27', date: '2024-01-11', task: 'Bug fixes for login flow', project: 'Website Redesign', hours: 2.5, notes: 'OAuth integration fixes' },
    { id: '28', date: '2024-01-10', task: 'Testing mobile layout', project: 'Website Redesign', hours: 5, notes: 'Responsive design testing' },
  ];

  // Get time logs for a specific date
  const getTimeLogsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return timeLogHistory.filter(log => log.date === dateStr);
  };

  // Get total hours for a specific date
  const getTotalHoursForDate = (date: Date) => {
    return getTimeLogsForDate(date).reduce((total, log) => total + log.hours, 0);
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const start = startOfMonth(calendarDate);
    const end = endOfMonth(calendarDate);
    return eachDayOfInterval({ start, end });
  };

  // Navigate calendar months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Time Logging"
        subtitle="Track time spent on tasks and projects"
        backButton={true}
        actionButton={{
          label: "Save All",
          icon: Save,
          onClick: handleSaveAll,
          variant: "default"
        }}
      />
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Task Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Log time spent on tasks for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Hours Today</div>
            <div className="text-2xl font-bold text-primary">{getTotalHoursForDay()}h</div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="log" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-t-lg">
            <TabsTrigger value="log" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Log Time
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="space-y-6">
            <div className="flex gap-6">
              {/* Side Panel */}
              <div className="w-80 flex-shrink-0">
                <div className="space-y-4 sticky top-24">
                  {/* Date Selection Card */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        Date Selection
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal h-9",
                              "border-2 border-dashed border-muted-foreground/25 hover:border-primary/50"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-sm">{format(selectedDate, "EEEE, MMM dd")}</span>
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
                    </CardContent>
                  </Card>

                  {/* Daily Summary Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Timer className="w-4 h-4 text-primary" />
                        Daily Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-3 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-lg border border-primary/10">
                        <div className="text-xl font-bold text-primary">{getTotalHoursForDay()}h</div>
                        <div className="text-xs text-muted-foreground">Total Hours Today</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded">
                          <div className="text-sm font-semibold text-green-600">{allTasks.filter(t => t.status === 'completed').length}</div>
                          <div className="text-xs text-muted-foreground">Done</div>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                          <div className="text-sm font-semibold text-blue-600">{allTasks.filter(t => t.status === 'in-progress').length}</div>
                          <div className="text-xs text-muted-foreground">Active</div>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                          <div className="text-sm font-semibold text-orange-600">{allTasks.filter(t => t.status === 'todo').length}</div>
                          <div className="text-xs text-muted-foreground">Todo</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Filters Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Filter className="w-4 h-4 text-primary" />
                        Quick Filters
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                          <Flag className="w-3 h-3 mr-2 text-red-500" />
                          High Priority ({allTasks.filter(t => t.priority === 'high').length})
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                          <Clock className="w-3 h-3 mr-2 text-blue-500" />
                          Due Today ({allTasks.filter(t => t.dueDate.toDateString() === new Date().toDateString()).length})
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                          <Activity className="w-3 h-3 mr-2 text-green-500" />
                          In Progress ({allTasks.filter(t => t.status === 'in-progress').length})
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                          <Target className="w-3 h-3 mr-2 text-purple-500" />
                          All Tasks ({allTasks.length})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Recent Logs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {timeLogHistory.slice(0, 5).map((log, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="truncate flex-1">{log.task}</span>
                            <span className="text-primary font-medium">{log.hours}h</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {(() => {
                  const totalPages = Math.ceil(allTasks.length / recordsPerPage);
                  const startIndex = (currentPage - 1) * recordsPerPage;
                  const endIndex = startIndex + recordsPerPage;
                  const currentTasks = allTasks.slice(startIndex, endIndex);
                  
                  return (
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">Time Logging Cards</h3>
                          <p className="text-sm text-muted-foreground">
                            {currentTasks.length} task{currentTasks.length !== 1 ? 's' : ''} • Page {currentPage} of {totalPages}
                          </p>
                        </div>
                        {totalPages > 1 && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm px-3">
                              {currentPage} / {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Grid Layout - Multiple Cards per Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {currentTasks.map((task) => {
                          const entry = timeEntries[task.id] || { hours: '', notes: '' };
                          const progressPercentage = task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0;
                          
                          return (
                            <Card key={task.id} className="group hover:shadow-sm transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary h-fit">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  {/* Task Header */}
                                  <div>
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-sm leading-tight flex-1 pr-2 line-clamp-2">{task.title}</h4>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        <Badge className={`${getPriorityColor(task.priority)} text-xs px-1.5 py-0.5`} variant="outline">
                                          <Flag className="w-2.5 h-2.5 mr-1" />
                                          {task.priority}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                      <span className="flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" />
                                        {task.project}
                                      </span>
                                      <Badge className={`${getStatusColor(task.status)} text-xs px-1.5 py-0.5`} variant="secondary">
                                        {task.status.replace('-', ' ')}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                                  </div>

                                  {/* Progress Bar */}
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span className="font-medium">{task.loggedHours}h / {task.estimatedHours}h</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-1.5">
                                      <div 
                                        className={cn(
                                          "h-1.5 rounded-full transition-all duration-300",
                                          progressPercentage >= 100 ? "bg-green-500" : progressPercentage >= 75 ? "bg-yellow-500" : "bg-primary"
                                        )}
                                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                      />
                                    </div>
                                    <div className="text-xs text-right text-muted-foreground">{progressPercentage}%</div>
                                  </div>

                                  {/* Time Logging Form */}
                                  <div className="bg-muted/20 rounded-md p-3 space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                      <Timer className="w-3 h-3 text-primary" />
                                      Log Time
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Label htmlFor={`hours-${task.id}`} className="text-xs font-medium">Hours</Label>
                                          <div className="relative mt-1">
                                            <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                                            <Input
                                              id={`hours-${task.id}`}
                                              type="number"
                                              step="0.25"
                                              min="0"
                                              max="24"
                                              placeholder="0.00"
                                              value={entry.hours}
                                              onChange={(e) => handleTimeChange(task.id, e.target.value)}
                                              className="pl-7 h-8 text-xs"
                                            />
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <Label htmlFor={`notes-${task.id}`} className="text-xs font-medium">Notes</Label>
                                          <Textarea
                                            id={`notes-${task.id}`}
                                            placeholder="Work notes..."
                                            value={entry.notes}
                                            onChange={(e) => handleNotesChange(task.id, e.target.value)}
                                            className="resize-none h-8 text-xs mt-1"
                                            rows={1}
                                          />
                                        </div>
                                      </div>
                                      
                                      <Button 
                                        onClick={() => handleSaveTimeEntry(task.id)}
                                        disabled={!entry.hours || parseFloat(entry.hours) <= 0}
                                        className="w-full gap-1.5 h-8 text-xs"
                                        size="sm"
                                      >
                                        <Timer className="w-3 h-3" />
                                        Log {entry.hours || '0'}h
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Time Log Calendar
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[120px] text-center">
                        {format(calendarDate, 'MMMM yyyy')}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getCalendarDays().map((day) => {
                      const totalHours = getTotalHoursForDate(day);
                      const hasEntries = totalHours > 0;
                      const isSelected = isSameDay(day, selectedDate);
                      const dayIsToday = isToday(day);
                      
                      return (
                        <div
                          key={day.toString()}
                          className={cn(
                            "p-2 text-center text-sm cursor-pointer rounded-lg transition-colors min-h-[60px] flex flex-col justify-between",
                            dayIsToday && "bg-primary/10 border-primary border",
                            isSelected && "bg-primary text-primary-foreground",
                            hasEntries && !isSelected && "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800",
                            !hasEntries && !isSelected && !dayIsToday && "hover:bg-muted",
                          )}
                          onClick={() => setSelectedDate(day)}
                        >
                          <span className="font-medium">{format(day, 'd')}</span>
                          {hasEntries && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              {totalHours}h
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Date Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {format(selectedDate, 'MMM dd, yyyy')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const dayLogs = getTimeLogsForDate(selectedDate);
                    const totalHours = getTotalHoursForDate(selectedDate);
                    
                    if (dayLogs.length === 0) {
                      return (
                        <div className="text-center text-muted-foreground py-8">
                          <Timer className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No time logged for this day</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-4">
                        <div className="text-center pb-4 border-b">
                          <div className="text-2xl font-bold text-primary">{totalHours}h</div>
                          <div className="text-sm text-muted-foreground">Total logged</div>
                        </div>
                        <div className="space-y-3">
                          {dayLogs.map((log) => (
                            <div key={log.id} className="p-3 bg-muted/50 rounded-lg">
                              <div className="font-medium text-sm mb-1">{log.task}</div>
                              <div className="text-xs text-muted-foreground mb-2">{log.project}</div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium">{log.hours}h</span>
                              </div>
                              {log.notes && (
                                <div className="text-xs text-muted-foreground mt-2 italic">
                                  "{log.notes}"
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Time History */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Time Log History</span>
                  <Badge variant="secondary">{
                    timeLogHistory.filter(log => {
                      const projectMatch = filterProject === 'all' || log.project === filterProject;
                      return projectMatch;
                    }).length
                  } entries</Badge>
                </CardTitle>
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <Select value={filterProject} onValueChange={setFilterProject}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="Marketing Campaign">Marketing Campaign</SelectItem>
                      <SelectItem value="Internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilterProject('all');
                      setCurrentPage(1);
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(() => {
                    const filteredLogs = timeLogHistory.filter(log => {
                      const projectMatch = filterProject === 'all' || log.project === filterProject;
                      return projectMatch;
                    });
                    
                    const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);
                    const startIndex = (currentPage - 1) * recordsPerPage;
                    const endIndex = startIndex + recordsPerPage;
                    const currentLogs = filteredLogs.slice(startIndex, endIndex);
                    
                    return (
                      <>
                        {currentLogs.map((log) => (
                          <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="text-center min-w-[60px]">
                                <div className="font-bold">{format(new Date(log.date), 'dd')}</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(log.date), 'MMM')}</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(log.date), 'EEE')}</div>
                              </div>
                              <div>
                                <div className="font-medium">{log.task}</div>
                                <div className="text-sm text-muted-foreground">{log.project}</div>
                                {log.notes && (
                                  <div className="text-xs text-muted-foreground mt-1 italic">
                                    "{log.notes}"
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{log.hours}h</div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex justify-center gap-2 mt-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="flex items-center px-3 text-sm">
                              Page {currentPage} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeLogging;