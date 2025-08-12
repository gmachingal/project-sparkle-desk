import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Clock, 
  Building, 
  Home, 
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Settings,
  AlertTriangle,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Bell,
  ChevronDown,
  Cog,
  FileText,
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  Target,
  Coffee,
  Eye,
  Star,
  Zap,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  CalendarIcon
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { SimpleBarChart, SimpleAreaChart, SimplePieChart, SimpleComposedChart, generateMockData } from '@/components/SimpleCharts';
import { format, addDays, subDays, addMonths, subMonths } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AdminAttendance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [musterView, setMusterView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Mock data
  const attendanceStats = {
    totalEmployees: 156,
    presentToday: 142,
    wfhToday: 28,
    absentToday: 14,
    lateToday: 8,
    averageHours: 8.2
  };

  // Date navigation functions
  const navigatePrevious = () => {
    if (musterView === 'day') {
      setCurrentDate(prev => subDays(prev, 1));
    } else {
      setCurrentDate(prev => subMonths(prev, 1));
    }
  };

  const navigateNext = () => {
    if (musterView === 'day') {
      setCurrentDate(prev => addDays(prev, 1));
    } else {
      setCurrentDate(prev => addMonths(prev, 1));
    }
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const getDateDisplayText = () => {
    if (musterView === 'day') {
      return format(currentDate, 'EEEE, MMMM dd, yyyy');
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };

  const getNavigationLabel = () => {
    return musterView === 'day' ? 'Day' : 'Month';
  };

  const musterRollData = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Alice Johnson',
      department: 'Engineering',
      status: 'present',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      regularHours: 8.5,
      overtimeHours: 0.75,
      totalHours: 9.25,
      location: 'office'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Bob Smith',
      department: 'Design',
      status: 'wfh',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      regularHours: 8.0,
      overtimeHours: 0.75,
      totalHours: 8.75,
      location: 'remote'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Carol Davis',
      department: 'Marketing',
      status: 'late',
      checkIn: '09:45 AM',
      checkOut: null,
      regularHours: 0,
      overtimeHours: 0,
      totalHours: 0,
      location: 'office'
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'David Wilson',
      department: 'Sales',
      status: 'absent',
      checkIn: null,
      checkOut: null,
      regularHours: 0,
      overtimeHours: 0,
      totalHours: 0,
      location: null
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      employeeName: 'John Doe',
      department: 'Engineering',
      requestDate: '2024-01-15',
      checkIn: '10:30 AM',
      checkOut: '7:15 PM',
      location: 'office',
      reason: 'Traffic jam due to heavy rain',
      type: 'Late Entry'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
              Attendance Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage team attendance with advanced analytics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 hover:bg-primary/10">
              <Bell className="w-4 h-4" />
              Notifications
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-primary/10">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <StatsCard
            title="Total Employees"
            value={attendanceStats.totalEmployees}
            icon={Users}
            className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80"
            trend={{ value: 5.2, positive: true }}
          />
          <StatsCard
            title="Present Today"
            value={attendanceStats.presentToday}
            description={`${((attendanceStats.presentToday / attendanceStats.totalEmployees) * 100).toFixed(1)}% attendance`}
            icon={CheckCircle}
            className="border-green-200/50 bg-gradient-to-br from-green-50/80 to-green-100/40 hover:shadow-lg transition-all duration-300"
            trend={{ value: 2.1, positive: true }}
          />
          <StatsCard
            title="Work from Home"
            value={attendanceStats.wfhToday}
            description={`${((attendanceStats.wfhToday / attendanceStats.totalEmployees) * 100).toFixed(1)}% remote`}
            icon={Home}
            className="border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-blue-100/40 hover:shadow-lg transition-all duration-300"
            trend={{ value: 8.5, positive: true }}
          />
          <StatsCard
            title="Absent Today"
            value={attendanceStats.absentToday}
            description={`${((attendanceStats.absentToday / attendanceStats.totalEmployees) * 100).toFixed(1)}% absent`}
            icon={XCircle}
            className="border-red-200/50 bg-gradient-to-br from-red-50/80 to-red-100/40 hover:shadow-lg transition-all duration-300"
            trend={{ value: 1.2, positive: false }}
          />
          <StatsCard
            title="Late Arrivals"
            value={attendanceStats.lateToday}
            description="In last hour"
            icon={AlertTriangle}
            className="border-yellow-200/50 bg-gradient-to-br from-yellow-50/80 to-yellow-100/40 hover:shadow-lg transition-all duration-300"
            trend={{ value: 0.8, positive: false }}
          />
          <StatsCard
            title="Avg Daily Hours"
            value={`${attendanceStats.averageHours}h`}
            description="This week"
            icon={Clock}
            className="border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-purple-100/40 hover:shadow-lg transition-all duration-300"
            trend={{ value: 3.2, positive: true }}
          />
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="relative">
            <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-card to-card/80 border shadow-sm h-12">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Today's</span> Attendance
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="muster" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Muster</span> Roll
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="requests" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Requests</span>
                  {pendingRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-1 text-xs px-1.5 py-0.5">
                      {pendingRequests.length}
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="locations" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Work</span> Locations
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Reports &</span> Analytics
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Enhanced Filters */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-card to-card/80">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                  <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search employees by name, ID, or department..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[160px] bg-background/50">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-[140px] bg-background/50"
                    />
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                      <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary-glow">
                        <Coffee className="w-4 h-4" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground">On Time:</span>
                    <span className="font-medium">134</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-muted-foreground">Late:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-muted-foreground">Remote:</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm text-muted-foreground">Absent:</span>
                    <span className="font-medium">14</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {musterRollData
                .filter(employee => 
                  selectedDepartment === 'all' || employee.department.toLowerCase() === selectedDepartment.toLowerCase()
                )
                .filter(employee =>
                  employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  employee.department.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((employee) => (
                  <Card 
                    key={employee.id} 
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm bg-gradient-to-br from-card to-card/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-sm text-foreground">{employee.name}</h4>
                            <p className="text-xs text-muted-foreground">{employee.employeeId}</p>
                            <p className="text-xs text-muted-foreground">{employee.department}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            employee.status === 'present' ? "bg-green-100 text-green-700 border-green-200" :
                            employee.status === 'wfh' ? "bg-blue-100 text-blue-700 border-blue-200" :
                            employee.status === 'absent' ? "bg-red-100 text-red-700 border-red-200" :
                            "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        >
                          {employee.status === 'wfh' ? 'Remote' : 
                           employee.status === 'present' ? 'Present' :
                           employee.status === 'absent' ? 'Absent' : 'Late'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Check In
                          </span>
                          <span className="font-medium">{employee.checkIn || 'Not yet'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Check Out
                          </span>
                          <span className="font-medium">{employee.checkOut || 'Not yet'}</span>
                        </div>
                        {employee.status !== 'absent' && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Hours
                            </span>
                            <span className="font-medium text-primary">{employee.totalHours.toFixed(1)}h</span>
                          </div>
                        )}
                        {employee.status === 'wfh' && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Location
                            </span>
                            <span className="font-medium">Remote</span>
                          </div>
                        )}
                      </div>
                      
                      {employee.status !== 'absent' && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Daily Progress</span>
                            <span className="font-medium">{Math.round((employee.totalHours / 8) * 100)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-primary to-primary-glow h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((employee.totalHours / 8) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Enhanced Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Attendance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={generateMockData.attendanceTrend}
                    dataKeys={[
                      { key: 'present', color: '#10b981' },
                      { key: 'wfh', color: '#3b82f6' },
                      { key: 'absent', color: '#ef4444' }
                    ]}
                    height={350}
                    xAxisKey="month"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Today's Attendance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart data={generateMockData.taskStatus} height={280} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Department-wise Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart 
                    data={generateMockData.departmentPerformance}
                    dataKeys={[
                      { key: 'completed', color: '#10b981', name: 'Completed' },
                      { key: 'pending', color: '#3b82f6', name: 'Pending' },
                      { key: 'blocked', color: '#ef4444', name: 'Blocked' }
                    ]}
                    height={350}
                  />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Weekly Hours & Productivity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleComposedChart data={generateMockData.weeklyProductivity} height={350} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            {/* Enhanced Filters and Actions Bar */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Requests</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="leave">Leave Requests</SelectItem>
                          <SelectItem value="late">Late Entry</SelectItem>
                          <SelectItem value="adjustment">Time Adjustment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <Select defaultValue="today">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {pendingRequests.length} Pending
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{pendingRequests.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Approved Today</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rejected Today</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">2.5h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Request Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingRequests.map((request, index) => (
                <Card 
                  key={request.id} 
                  className="border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/50 overflow-hidden h-fit"
                >
                  <CardContent className="p-0">
                    {/* Priority Strip */}
                    <div className={`h-1 w-full ${
                      index === 0 ? 'bg-red-500' : 
                      index === 1 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}></div>
                    
                    <div className="p-4">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-sm">
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-base">{request.employeeName}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {request.department}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(request.requestDate), 'MMM dd • HH:mm')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${index === 0 ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' : 
                                index === 1 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                'bg-blue-50 text-blue-700 border-blue-200'}
                            `}
                          >
                            {index === 0 ? 'Urgent' : index === 1 ? 'Pending' : 'Regular'}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {request.type || 'Attendance'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Request Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3 p-3 bg-muted/30 rounded-lg">
                         <div className="text-center">
                           <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                             <CalendarIcon className="w-3 h-3" />
                            {format(new Date(request.requestDate), 'MMM dd')}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.checkIn} - {request.checkOut}
                          </div>
                        </div>
                      </div>
                      
                      {/* Reason Section */}
                      <div className="mb-4 p-3 bg-muted/20 rounded-lg border-l-4 border-primary">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Reason
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-2">{request.reason}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1"
                          size="sm"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          size="sm"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State (when no requests) */}
            {pendingRequests.length === 0 && (
              <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 p-4 bg-muted/50 rounded-full">
                    <CheckCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">No pending attendance requests at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="muster" className="space-y-4">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Muster Roll
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={musterView} onValueChange={(value) => {
                      setMusterView(value);
                      setCurrentDate(new Date()); // Reset to today when changing view
                    }}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Daily View</SelectItem>
                        <SelectItem value="month">Monthly View</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
                
                {/* Date Navigation Controls */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={navigatePrevious}
                        className="gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous {getNavigationLabel()}
                      </Button>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="gap-2 min-w-[200px]">
                            <CalendarIcon className="w-4 h-4" />
                            {getDateDisplayText()}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={currentDate}
                            onSelect={(date) => date && setCurrentDate(date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={navigateNext}
                        className="gap-1"
                      >
                        Next {getNavigationLabel()}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={navigateToday}
                      className="gap-1 bg-primary/5 hover:bg-primary/10 border-primary/20"
                    >
                      <Target className="w-4 h-4" />
                      Today
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Employee</th>
                        <th className="text-left p-3 font-medium">ID</th>
                        <th className="text-left p-3 font-medium">Department</th>
                        <th className="text-center p-3 font-medium">Status</th>
                        {musterView === 'day' ? (
                          <>
                            <th className="text-center p-3 font-medium">Check In</th>
                            <th className="text-center p-3 font-medium">Check Out</th>
                            <th className="text-center p-3 font-medium">Regular Hours</th>
                            <th className="text-center p-3 font-medium">Overtime</th>
                            <th className="text-center p-3 font-medium">Total Hours</th>
                          </>
                        ) : (
                          <>
                            <th className="text-center p-3 font-medium">Present Days</th>
                            <th className="text-center p-3 font-medium">Absent Days</th>
                            <th className="text-center p-3 font-medium">Late Days</th>
                            <th className="text-center p-3 font-medium">WFH Days</th>
                            <th className="text-center p-3 font-medium">Total Hours</th>
                            <th className="text-center p-3 font-medium">Avg Hours/Day</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {musterRollData.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{employee.name}</span>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-xs">{employee.employeeId}</td>
                          <td className="p-3">{employee.department}</td>
                          <td className="p-3 text-center">
                            <Badge 
                              variant="outline"
                              className={
                                employee.status === 'present' ? "bg-green-100 text-green-700 border-green-200" :
                                employee.status === 'wfh' ? "bg-blue-100 text-blue-700 border-blue-200" :
                                employee.status === 'absent' ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-yellow-100 text-yellow-700 border-yellow-200"
                              }
                            >
                              {employee.status === 'wfh' ? 'Remote' : 
                               employee.status === 'present' ? 'Present' :
                               employee.status === 'absent' ? 'Absent' : 'Late'}
                            </Badge>
                          </td>
                          {musterView === 'day' ? (
                            <>
                              <td className="p-3 text-center font-mono">{employee.checkIn || '-'}</td>
                              <td className="p-3 text-center font-mono">{employee.checkOut || '-'}</td>
                              <td className="p-3 text-center font-mono font-medium">{employee.regularHours.toFixed(1)}h</td>
                              <td className="p-3 text-center font-mono font-medium text-orange-600">
                                {employee.overtimeHours.toFixed(1)}h
                              </td>
                              <td className="p-3 text-center font-mono font-medium text-primary">
                                {employee.totalHours.toFixed(1)}h
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-3 text-center font-medium text-green-600">22</td>
                              <td className="p-3 text-center font-medium text-red-600">3</td>
                              <td className="p-3 text-center font-medium text-yellow-600">5</td>
                              <td className="p-3 text-center font-medium text-blue-600">8</td>
                              <td className="p-3 text-center font-mono font-medium">176.5h</td>
                              <td className="p-3 text-center font-mono">8.0h</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Work Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Main Office</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">123 Business District, City</p>
                      <div className="text-xs text-muted-foreground">
                        Radius: 100m • 128 employees
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Branch Office</h4>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">456 Tech Park, Suburb</p>
                      <div className="text-xs text-muted-foreground">
                        Radius: 150m • 28 employees
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAttendance;