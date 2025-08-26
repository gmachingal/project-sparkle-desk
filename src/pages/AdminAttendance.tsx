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

  // Attendance-specific mock data for charts
  const attendanceChartData = {
    monthlyTrends: [
      { month: 'Jan', present: 142, absent: 14, late: 8, wfh: 28 },
      { month: 'Feb', present: 138, absent: 18, late: 12, wfh: 32 },
      { month: 'Mar', present: 145, absent: 11, late: 6, wfh: 25 },
      { month: 'Apr', present: 140, absent: 16, late: 9, wfh: 30 },
      { month: 'May', present: 144, absent: 12, late: 7, wfh: 26 },
      { month: 'Jun', present: 147, absent: 9, late: 5, wfh: 24 }
    ],
    dailyDistribution: [
      { name: 'Present', value: 142, color: '#10b981' },
      { name: 'Work From Home', value: 28, color: '#3b82f6' },
      { name: 'Absent', value: 14, color: '#ef4444' },
      { name: 'Late', value: 8, color: '#f59e0b' }
    ],
    departmentAttendance: [
      { department: 'Engineering', present: 42, absent: 3, late: 2, total: 47 },
      { department: 'Design', present: 18, absent: 2, late: 1, total: 21 },
      { department: 'Marketing', present: 22, absent: 3, late: 2, total: 27 },
      { department: 'Sales', present: 25, absent: 2, late: 1, total: 28 },
      { department: 'HR', present: 15, absent: 1, late: 1, total: 17 },
      { department: 'Finance', present: 20, absent: 3, late: 1, total: 24 }
    ],
    weeklyHours: [
      { week: 'Week 1', avgHours: 8.2, overtime: 1.5, attendance: 92 },
      { week: 'Week 2', avgHours: 8.1, overtime: 1.2, attendance: 89 },
      { week: 'Week 3', avgHours: 8.3, overtime: 1.8, attendance: 94 },
      { week: 'Week 4', avgHours: 8.0, overtime: 1.1, attendance: 87 }
    ]
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-admin to-admin-glow bg-clip-text text-transparent">
              Attendance Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage team attendance with advanced analytics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 hover:bg-primary/10" onClick={() => window.location.href = '/attendance'}>
              <UserCheck className="w-4 h-4" />
              Employee View
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-primary/10">
              <Bell className="w-4 h-4" />
              Notifications
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-primary/10">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow">
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
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Today's</span> Attendance
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="muster" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Muster</span> Roll
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="requests" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground font-medium transition-all duration-200 hover:bg-muted/50"
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
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Work</span> Locations
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground font-medium transition-all duration-200 hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Reports &</span> Analytics
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Today's Date Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Today's Attendance</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {format(new Date(), 'EEEE, MMMM dd, yyyy')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Last updated: {format(new Date(), 'HH:mm')}
                </Badge>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-admin to-admin-glow">
                  <Coffee className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Real-time Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Present</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">134</p>
                        <p className="text-xs text-muted-foreground">/ {attendanceStats.totalEmployees}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Late Arrivals</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">8</p>
                        <p className="text-xs text-green-500">-2 vs yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Work From Home</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">28</p>
                        <p className="text-xs text-blue-500">+5 vs yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Absent</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">14</p>
                        <p className="text-xs text-red-500">+3 vs yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Filters */}
            <Card className="border-0 shadow-sm">
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
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px] bg-background/50">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="wfh">Remote</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Employee Grid with Sorting */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Employee Status</h3>
                <Badge variant="secondary" className="text-xs">
                  {musterRollData.filter(emp => 
                    selectedDepartment === 'all' || emp.department.toLowerCase() === selectedDepartment.toLowerCase()
                  ).filter(emp =>
                    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length} employees
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="name">
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
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
                     className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm bg-gradient-to-br from-card to-card/50 cursor-pointer"
                   >
                     <CardContent className="p-3">
                       <div className="flex items-start justify-between mb-2">
                         <div className="flex items-center gap-2">
                           <div className="relative">
                             <Avatar className="w-8 h-8 border-2 border-background shadow-sm">
                               <AvatarImage src="" />
                               <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-xs">
                                 {employee.name.split(' ').map(n => n[0]).join('')}
                               </AvatarFallback>
                             </Avatar>
                             {/* Online Status Indicator */}
                             <div className={`absolute -bottom-0 -right-0 w-2 h-2 rounded-full border border-background ${
                               employee.status === 'present' ? 'bg-green-500' :
                               employee.status === 'wfh' ? 'bg-blue-500' :
                               employee.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                             }`}></div>
                           </div>
                           <div className="min-w-0 flex-1">
                             <h4 className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">{employee.name}</h4>
                             <p className="text-xs text-muted-foreground truncate">{employee.employeeId}</p>
                             <p className="text-xs text-muted-foreground truncate">{employee.department}</p>
                           </div>
                         </div>
                         <Badge 
                           variant="outline"
                           className={
                             "text-xs px-1.5 py-0.5 h-5 " +
                             (employee.status === 'present' ? "bg-green-100 text-green-700 border-green-200" :
                             employee.status === 'wfh' ? "bg-blue-100 text-blue-700 border-blue-200" :
                             employee.status === 'absent' ? "bg-red-100 text-red-700 border-red-200" :
                             "bg-yellow-100 text-yellow-700 border-yellow-200")
                           }
                         >
                           {employee.status === 'wfh' ? 'WFH' : 
                            employee.status === 'present' ? 'Present' :
                            employee.status === 'absent' ? 'Absent' : 'Late'}
                         </Badge>
                       </div>
                       
                       
                       <div className="space-y-1.5">
                         <div className="flex items-center justify-between text-xs">
                           <span className="text-muted-foreground flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             In
                           </span>
                           <span className={`font-medium text-xs ${
                             employee.checkIn ? 'text-green-600' : 'text-muted-foreground'
                           }`}>
                             {employee.checkIn || '--'}
                           </span>
                         </div>
                         <div className="flex items-center justify-between text-xs">
                           <span className="text-muted-foreground flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             Out
                           </span>
                           <span className={`font-medium text-xs ${
                             employee.checkOut ? 'text-blue-600' : 'text-muted-foreground'
                           }`}>
                             {employee.checkOut || '--'}
                           </span>
                         </div>
                         {employee.status !== 'absent' && (
                           <div className="flex items-center justify-between text-xs">
                             <span className="text-muted-foreground flex items-center gap-1">
                               <Target className="w-3 h-3" />
                               Hours
                             </span>
                             <span className="font-medium text-primary text-xs">{employee.totalHours.toFixed(1)}h</span>
                           </div>
                         )}
                       </div>
                       
                       {employee.status !== 'absent' && (
                         <div className="mt-2 pt-2 border-t border-border/50">
                           <div className="flex items-center justify-between text-xs mb-1">
                             <span className="text-muted-foreground">Progress</span>
                             <span className="font-medium text-xs">{Math.round((employee.totalHours / 8) * 100)}%</span>
                           </div>
                           <div className="w-full bg-muted rounded-full h-1">
                             <div 
                               className="bg-gradient-to-r from-primary to-primary-glow h-1 rounded-full transition-all duration-300"
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
                     data={attendanceChartData.monthlyTrends}
                     dataKeys={[
                       { key: 'present', color: '#10b981' },
                       { key: 'wfh', color: '#3b82f6' },
                       { key: 'late', color: '#f59e0b' },
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
                   <SimplePieChart data={attendanceChartData.dailyDistribution} height={280} />
                 </CardContent>
               </Card>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Building className="h-5 w-5" />
                     Department-wise Attendance
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <SimpleBarChart 
                     data={attendanceChartData.departmentAttendance}
                     dataKeys={[
                       { key: 'present', color: '#10b981', name: 'Present' },
                       { key: 'late', color: '#f59e0b', name: 'Late' },
                       { key: 'absent', color: '#ef4444', name: 'Absent' }
                     ]}
                     height={350}
                   />
                 </CardContent>
               </Card>

               <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Activity className="h-5 w-5" />
                     Weekly Hours & Attendance Rate
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <SimpleComposedChart 
                     data={attendanceChartData.weeklyHours}
                     height={350}
                   />
                 </CardContent>
               </Card>

               {/* Additional Attendance Metrics */}
               <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80 lg:col-span-2">
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Clock className="h-5 w-5" />
                     Attendance Summary & Insights
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-4">
                       <h4 className="font-semibold text-sm">Overall Statistics</h4>
                       <div className="space-y-2">
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Average Attendance Rate</span>
                           <span className="font-medium">91.2%</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Peak Attendance Day</span>
                           <span className="font-medium">Wednesday</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Most Common Late Time</span>
                           <span className="font-medium">9:15 AM</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="space-y-4">
                       <h4 className="font-semibold text-sm">Department Leaders</h4>
                       <div className="space-y-2">
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Best Attendance</span>
                           <span className="font-medium">Engineering (97%)</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Most Punctual</span>
                           <span className="font-medium">HR (2.1% late)</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Highest WFH Usage</span>
                           <span className="font-medium">Design (35%)</span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="space-y-4">
                       <h4 className="font-semibold text-sm">Trends</h4>
                       <div className="space-y-2">
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">This Month vs Last</span>
                           <span className="font-medium text-green-600">+2.3%</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">WFH Trend</span>
                           <span className="font-medium text-blue-600">Stable</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-sm text-muted-foreground">Late Arrivals</span>
                           <span className="font-medium text-yellow-600">-12%</span>
                         </div>
                       </div>
                     </div>
                   </div>
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

            {/* Enhanced Request Cards - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
              {pendingRequests.map((request, index) => (
                <Card 
                  key={request.id} 
                  className="border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/50 overflow-hidden h-[280px] flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Priority Strip */}
                    <div className={`h-1 w-full ${
                      index === 0 ? 'bg-red-500' : 
                      index === 1 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}></div>
                    
                    <div className="p-3 flex flex-col h-full">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Avatar className="w-8 h-8 border-2 border-background shadow-sm flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-xs">
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">{request.employeeName}</h4>
                            <p className="text-xs text-muted-foreground truncate">{request.department}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {format(new Date(request.requestDate), 'MMM dd')}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-1.5 py-0.5 h-5 flex-shrink-0 ${
                            index === 0 ? 'bg-red-50 text-red-700 border-red-200' : 
                            index === 1 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {request.type || 'Attendance'}
                        </Badge>
                      </div>
                      
                      {/* Request Details */}
                      <div className="mb-2 p-2 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" />
                            Time
                          </div>
                          <div className="text-xs font-semibold truncate">
                            {request.checkIn} - {request.checkOut}
                          </div>
                        </div>
                      </div>
                      
                      {/* Reason Section - Flexible */}
                      <div className="mb-3 p-2 bg-muted/20 rounded-lg border-l-2 border-primary flex-1 min-h-0">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Reason
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-3 overflow-hidden">{request.reason}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1.5 mt-auto">
                        <Button 
                          className="flex-1 h-7 text-xs"
                          size="sm"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 h-7 text-xs"
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