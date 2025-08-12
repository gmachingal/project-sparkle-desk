import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnhancedTaskCard from "@/components/EnhancedTaskCard";
import Header from "@/components/Header";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  Plus,
  Filter,
  Search,
  Calendar as CalendarIcon,
  SortAsc,
  List,
  Timer,
  User,
  CalendarDays,
  Calendar1,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from "@/lib/utils";

const MyTasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock tasks with calendar dates - using current month dates
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const tasks = [
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create initial wireframes and high-fidelity designs for the new homepage",
      status: "in-progress" as const,
      priority: "high" as const,
      startDate: new Date(currentYear, currentMonth, 5),
      dueDate: new Date(currentYear, currentMonth, 10),
      assignee: { name: "You", avatar: "" },
      milestone: { id: "1", name: "UI Design", status: "completed" as const },
      project: "Website Redesign",
      sprint: "Sprint 3",
      tags: ["design", "ui/ux", "homepage"]
    },
    {
      id: "2",
      title: "Review API documentation",
      description: "Go through the new API docs and provide feedback",
      status: "todo" as const,
      priority: "medium" as const,
      startDate: new Date(currentYear, currentMonth, 12),
      dueDate: new Date(currentYear, currentMonth, 15),
      assignee: { name: "You", avatar: "" },
      milestone: { id: "4", name: "MVP Release", status: "planned" as const },
      project: "Mobile App",
      sprint: "Sprint 4",
      tags: ["api", "documentation", "review"]
    },
    {
      id: "3",
      title: "Update marketing copy",
      description: "Revise the product page copy based on user feedback",
      status: "completed" as const,
      priority: "low" as const,
      startDate: new Date(currentYear, currentMonth, 6),
      dueDate: new Date(currentYear, currentMonth, 8),
      assignee: { name: "You", avatar: "" },
      project: "Marketing Campaign",
      sprint: "Sprint 2",
      tags: ["marketing", "copywriting", "content"]
    },
    {
      id: "4",
      title: "Bug fixes for login flow",
      description: "Fix authentication issues reported by users",
      status: "todo" as const,
      priority: "high" as const,
      startDate: new Date(currentYear, currentMonth, 18),
      dueDate: new Date(currentYear, currentMonth, 20),
      assignee: { name: "You", avatar: "" },
      milestone: { id: "2", name: "Backend API", status: "in-progress" as const },
      project: "Website Redesign",
      sprint: "Sprint 3",
      tags: ["bug-fix", "authentication", "urgent"]
    },
    {
      id: "5",
      title: "Prepare presentation slides",
      description: "Create slides for the quarterly review meeting",
      status: "in-progress" as const,
      priority: "medium" as const,
      startDate: new Date(currentYear, currentMonth, 23),
      dueDate: new Date(currentYear, currentMonth, 25),
      assignee: { name: "You", avatar: "" },
      project: "Internal",
      sprint: "Sprint 4",
      tags: ["presentation", "quarterly", "slides"]
    },
    {
      id: "6",
      title: "Code review for API",
      description: "Review pull requests for new API endpoints",
      status: "todo" as const,
      priority: "medium" as const,
      startDate: new Date(currentYear, currentMonth, 16),
      dueDate: new Date(currentYear, currentMonth, 18),
      assignee: { name: "You", avatar: "" },
      project: "Mobile App",
      sprint: "Sprint 4",
      tags: ["code-review", "api", "backend"]
    },
    {
      id: "7",
      title: "Testing mobile layout",
      description: "Test responsive design on various devices",
      status: "in-progress" as const,
      priority: "high" as const,
      startDate: new Date(currentYear, currentMonth, 20),
      dueDate: new Date(currentYear, currentMonth, 22),
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign",
      sprint: "Sprint 3",
      tags: ["testing", "mobile", "responsive"]
    },
    {
      id: "8",
      title: "Update documentation",
      description: "Update project documentation with latest changes",
      status: "todo" as const,
      priority: "low" as const,
      startDate: new Date(currentYear, currentMonth, 26),
      dueDate: new Date(currentYear, currentMonth, 28),
      assignee: { name: "You", avatar: "" },
      project: "Internal",
      sprint: "Sprint 4",
      tags: ["documentation", "maintenance", "update"]
    }
  ];

  // Helper functions for calendar
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by tab
    if (activeTab === "todo") {
      filtered = filtered.filter(task => task.status === "todo");
    } else if (activeTab === "in-progress") {
      filtered = filtered.filter(task => task.status === "in-progress");
    } else if (activeTab === "completed") {
      filtered = filtered.filter(task => task.status === "completed");
    } else if (activeTab === "overdue") {
      filtered = filtered.filter(task => task.dueDate < new Date() && task.status !== "completed");
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Filter by priority
    if (filterPriority !== "all") {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Filter by tag
    if (filterTag !== "all") {
      filtered = filtered.filter(task => task.tags && task.tags.includes(filterTag));
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(task => {
        return task.dueDate && isSameDay(task.dueDate, filterDate);
      });
    }

    return filtered;
  };

  const getTasksForDate = (date: Date) => {
    return getFilteredTasks().filter(task => 
      task.dueDate && isSameDay(task.dueDate, date)
    );
  };

  const getTasksForSelectedDate = () => {
    return getTasksForDate(selectedDate);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Convert task to format expected by TaskCard
  const formatTaskForCard = (task: typeof tasks[0]) => ({
    ...task,
    startDate: format(task.startDate, 'MMM dd'),
    dueDate: format(task.dueDate, 'MMM dd'),
    tags: task.tags || []
  });
  
  // Get all unique tags for filtering
  const allTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
    overdue: tasks.filter(t => t.dueDate < new Date() && t.status !== "completed").length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your assigned tasks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/time-logging")}>
              <Timer className="w-4 h-4" />
              Log Time
            </Button>
            <Button variant="hero" className="gap-2" onClick={() => navigate("/create-task")}>
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckSquare className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{taskStats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-5 h-5 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{taskStats.todo}</div>
              <div className="text-sm text-muted-foreground">To Do</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-5 h-5 mx-auto bg-yellow-500 rounded-full mb-2" />
              <div className="text-2xl font-bold">{taskStats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-5 h-5 mx-auto bg-green-500 rounded-full mb-2" />
              <div className="text-2xl font-bold">{taskStats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-5 h-5 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold">{taskStats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <Card className="hover:shadow-sm hover:translate-y-0">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn(
                    "w-full sm:w-[180px] justify-start text-left font-normal",
                    !filterDate && "text-muted-foreground"
                  )}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {filterDate ? format(filterDate, 'MMM dd, yyyy') : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filterDate}
                    onSelect={setFilterDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                  <div className="p-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setFilterDate(null)}
                    >
                      Clear Date Filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View Options */}
        {viewMode === 'calendar' && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">View:</span>
            <div className="flex bg-muted rounded-md p-1">
              <Button
                variant={calendarView === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCalendarView('day')}
                className="h-8 gap-2"
              >
                <Calendar1 className="h-4 w-4 mr-2" />
                Day
              </Button>
              <Button
                variant={calendarView === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCalendarView('week')}
                className="h-8 gap-2"
              >
                <CalendarRange className="h-4 w-4 mr-2" />
                Week
              </Button>
              <Button
                variant={calendarView === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCalendarView('month')}
                className="h-8 gap-2"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Month
              </Button>
            </div>
          </div>
        )}

        {/* Tasks Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <FileText className="h-4 w-4 mr-2" />
              All ({taskStats.total})</TabsTrigger>
            <TabsTrigger value="todo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <CalendarDays className="h-4 w-4 mr-2" />
              To Do ({taskStats.todo})</TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Clock className="h-4 w-4 mr-2" />
              In Progress ({taskStats.inProgress})</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <CheckSquare className="h-4 w-4 mr-2" />
              Completed ({taskStats.completed})</TabsTrigger>
            <TabsTrigger value="overdue" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Overdue ({taskStats.overdue})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {viewMode === 'list' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTasks().map((task) => (
                    <EnhancedTaskCard key={task.id} task={formatTaskForCard(task)} />
                  ))}
                </div>
                {getFilteredTasks().length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CheckSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery || filterPriority !== "all" 
                          ? "Try adjusting your filters to see more tasks"
                          : "You're all caught up! Create a new task to get started."
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Task Calendar - {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)} View
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {calendarView === 'month' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {format(selectedDate, 'MMMM yyyy')}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {format(selectedDate, 'MMM yyyy')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <EnhancedCalendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {/* Header */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                            {day}
                          </div>
                        ))}
                        
                        {/* Calendar Days */}
                        {eachDayOfInterval({ 
                          start: startOfMonth(selectedDate), 
                          end: endOfMonth(selectedDate) 
                        }).map(day => {
                          const tasksForDay = getTasksForDate(day);
                          const isToday = isSameDay(day, new Date());
                          const isSelected = isSameDay(day, selectedDate);
                          
                          return (
                            <div 
                              key={day.toISOString()} 
                              className={`p-2 border rounded-lg cursor-pointer hover:bg-muted min-h-24 ${
                                isSelected ? 'bg-primary/10 border-primary' : 
                                isToday ? 'bg-accent border-accent-foreground' : ''
                              }`}
                              onClick={() => setSelectedDate(day)}
                            >
                              <div className="font-medium text-sm mb-1">{format(day, 'd')}</div>
                              <div className="space-y-1 overflow-hidden">
                                {tasksForDay.slice(0, 2).map(task => (
                                  <HoverCard key={task.id}>
                                    <HoverCardTrigger asChild>
                                      <div 
                                        className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(task.priority)} truncate cursor-pointer`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/task/${task.id}`);
                                        }}
                                      >
                                        {task.title}
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                      <div className="space-y-3">
                                        <div>
                                          <h4 className="font-semibold">{task.title}</h4>
                                          <p className="text-sm text-muted-foreground">{task.description}</p>
                                        </div>
                                         <div className="space-y-2">
                                           <div className="flex items-center gap-2">
                                             <User className="h-4 w-4 text-muted-foreground" />
                                             <span className="text-sm">Resource: {task.assignee?.name}</span>
                                           </div>
                                           <div className="flex items-center gap-2">
                                             <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                             <span className="text-sm">Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                                           </div>
                                           {task.tags && task.tags.length > 0 && (
                                             <div className="flex flex-wrap gap-1">
                                               {task.tags.map((tag, index) => (
                                                 <Badge key={index} variant="outline" className="text-xs">
                                                   {tag}
                                                 </Badge>
                                               ))}
                                             </div>
                                           )}
                                           <div className="flex items-center gap-2">
                                             <Badge variant="outline">{task.project}</Badge>
                                             <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                           </div>
                                         </div>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                ))}
                                {tasksForDay.length > 2 && (
                                  <div className="text-xs text-muted-foreground">+{tasksForDay.length - 2} more</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {calendarView === 'week' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          Week of {format(startOfWeek(selectedDate), 'MMM dd')} - {format(endOfWeek(selectedDate), 'MMM dd, yyyy')}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Week of {format(startOfWeek(selectedDate), 'MMM dd')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <EnhancedCalendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Week Grid */}
                      <div className="grid grid-cols-7 gap-2">
                        {eachDayOfInterval({
                          start: startOfWeek(selectedDate),
                          end: endOfWeek(selectedDate)
                        }).map(day => {
                          const tasksForDay = getTasksForDate(day);
                          const isToday = isSameDay(day, new Date());
                          
                          return (
                            <div key={day.toISOString()} className="space-y-2">
                              <div className={`text-center p-2 rounded ${isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                                <div className="text-lg">{format(day, 'd')}</div>
                              </div>
                                <div className="space-y-1 min-h-32">
                                 {tasksForDay.map(task => (
                                   <HoverCard key={task.id}>
                                     <HoverCardTrigger asChild>
                                       <div
                                         className={`text-xs p-2 rounded border-l-2 ${getPriorityColor(task.priority)} cursor-pointer`}
                                         onClick={() => navigate(`/task/${task.id}`)}
                                       >
                                         <div className="font-medium truncate">{task.title}</div>
                                         <div className="flex items-center justify-between mt-1">
                                           <div className={`text-xs ${getStatusBgColor(task.status)} px-1 rounded`}>
                                             {task.status.replace('-', ' ')}
                                           </div>
                                           <div className="text-xs text-muted-foreground">
                                             {task.assignee?.name}
                                           </div>
                                         </div>
                                         <div className="text-xs text-muted-foreground mt-1">
                                           Due: {format(task.dueDate, 'MMM dd')}
                                         </div>
                                       </div>
                                     </HoverCardTrigger>
                                     <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                       <div className="space-y-3">
                                         <div>
                                           <h4 className="font-semibold">{task.title}</h4>
                                           <p className="text-sm text-muted-foreground">{task.description}</p>
                                         </div>
                                         <div className="space-y-2">
                                           <div className="flex items-center gap-2">
                                             <User className="h-4 w-4 text-muted-foreground" />
                                             <span className="text-sm">Resource: {task.assignee?.name}</span>
                                           </div>
                                           <div className="flex items-center gap-2">
                                             <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                             <span className="text-sm">Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                                           </div>
                                           {task.tags && task.tags.length > 0 && (
                                             <div className="flex flex-wrap gap-1">
                                               {task.tags.map((tag, index) => (
                                                 <Badge key={index} variant="outline" className="text-xs">
                                                   {tag}
                                                 </Badge>
                                               ))}
                                             </div>
                                           )}
                                           <div className="flex items-center gap-2">
                                             <Badge variant="outline">{task.project}</Badge>
                                             <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                           </div>
                                         </div>
                                       </div>
                                     </HoverCardContent>
                                   </HoverCard>
                                 ))}
                               </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {calendarView === 'day' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                {format(selectedDate, 'MMM dd, yyyy')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <EnhancedCalendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                          >
                            Today
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Day Tasks as Cards */}
                      <div className="space-y-4">
                        {getTasksForSelectedDate().length > 0 ? (
                          getTasksForSelectedDate().map(task => (
                            <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow"
                                  onClick={() => navigate(`/task/${task.id}`)}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium">{task.title}</h3>
                                      <Badge className={getPriorityColor(task.priority)}>
                                        {task.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary">{task.project}</Badge>
                                      <Badge className={getStatusBgColor(task.status)}>
                                        {task.status.replace('-', ' ')}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <Card>
                            <CardContent className="p-8 text-center">
                              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                              <h3 className="text-lg font-semibold mb-2">No tasks for this day</h3>
                              <p className="text-muted-foreground">
                                No tasks are scheduled for {format(selectedDate, 'MMMM dd, yyyy')}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTasks;