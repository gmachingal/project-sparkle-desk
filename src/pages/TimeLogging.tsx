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
  ArrowLeft,
  Timer,
  ChevronLeft,
  ChevronRight,
  Filter
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
      loggedHours: 3
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
      loggedHours: 1
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
      <Header />

      {/* Back Button Above Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button variant="back" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Time Logging
            </h1>
            <p className="text-muted-foreground mt-1">
              Log time spent on tasks for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
            </p>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="log" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
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

              {/* Tasks List with Pagination - Grid Layout */}
              <div className="lg:col-span-3">
                {(() => {
                  const totalPages = Math.ceil(allTasks.length / recordsPerPage);
                  const startIndex = (currentPage - 1) * recordsPerPage;
                  const endIndex = startIndex + recordsPerPage;
                  const currentTasks = allTasks.slice(startIndex, endIndex);
                  
                  return (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {currentTasks.map((task) => {
                          const entry = timeEntries[task.id] || { hours: '', notes: '' };
                          const progressPercentage = task.estimatedHours > 0 ? Math.round((task.loggedHours / task.estimatedHours) * 100) : 0;
                          
                          return (
                            <Card key={task.id} className="compact h-fit">
                              <CardContent className="p-3">
                                <div className="space-y-3">
                                  {/* Header - Compact */}
                                  <div>
                                    <div className="flex items-start gap-2 mb-1">
                                      <h3 className="font-medium text-sm flex-1 line-clamp-1">{task.title}</h3>
                                      <Badge className={`${getStatusColor(task.status)} text-xs px-1.5 py-0.5`} variant="secondary">
                                        {task.status.replace('-', ' ')}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge className={`${getPriorityColor(task.priority)} text-xs px-1.5 py-0.5`} variant="outline">
                                        <Flag className="w-2.5 h-2.5 mr-1" />
                                        {task.priority}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">{task.project}</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{task.description}</p>
                                  </div>

                                  {/* Progress Bar - Compact */}
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-muted-foreground">{task.loggedHours}h / {task.estimatedHours}h</span>
                                      <span className="font-medium">{progressPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-1">
                                      <div 
                                        className="bg-primary h-1 rounded-full transition-all duration-300" 
                                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                      />
                                    </div>
                                  </div>

                                  {/* Time Entry Form - Compact */}
                                  <div className="space-y-2">
                                    <div className="grid grid-cols-3 gap-2">
                                      <div>
                                        <Label htmlFor={`hours-${task.id}`} className="text-xs">Hours</Label>
                                        <div className="relative">
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
                                            className="pl-8 h-7 text-xs"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-2">
                                        <Label htmlFor={`notes-${task.id}`} className="text-xs">Notes</Label>
                                        <Textarea
                                          id={`notes-${task.id}`}
                                          placeholder="What did you work on?"
                                          value={entry.notes}
                                          onChange={(e) => handleNotesChange(task.id, e.target.value)}
                                          className="resize-none h-7 text-xs"
                                          rows={1}
                                        />
                                      </div>
                                    </div>
                                    
                                    <Button 
                                      onClick={() => handleSaveTimeEntry(task.id)}
                                      disabled={!entry.hours || parseFloat(entry.hours) <= 0}
                                      className="w-full gap-1 h-7 text-xs"
                                      size="sm"
                                    >
                                      <Timer className="w-3 h-3" />
                                      Log Time
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                      
                      {/* Pagination for Log Time */}
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