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
  Calendar, 
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
  Coffee
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { SimpleBarChart, SimpleAreaChart, SimplePieChart, SimpleComposedChart, generateMockData } from '@/components/SimpleCharts';
import { format } from 'date-fns';

const AdminAttendance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [musterView, setMusterView] = useState('day'); // 'day' or 'month'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isWfhPolicyOpen, setIsWfhPolicyOpen] = useState(false);
  const [isLocationMasterOpen, setIsLocationMasterOpen] = useState(false);
  const [isGeoTaggingOpen, setIsGeoTaggingOpen] = useState(false);
  const [isWfhNotificationOpen, setIsWfhNotificationOpen] = useState(false);
  const [wfhPolicyForm, setWfhPolicyForm] = useState({
    department: 'all',
    maxWfhDays: '2',
    requireApproval: true,
    advanceNotice: '1'
  });
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    radius: '100'
  });
  const [geoTagSettings, setGeoTagSettings] = useState({
    enabled: true,
    accuracy: 'high',
    allowedRadius: '50'
  });
  const [wfhNotificationSettings, setWfhNotificationSettings] = useState({
    notifyDate: format(new Date(), 'yyyy-MM-dd'),
    notifyDepartment: 'all',
    message: '',
    urgency: 'medium'
  });

  // Mock data
  const attendanceStats = {
    totalEmployees: 156,
    presentToday: 142,
    wfhToday: 28,
    absentToday: 14,
    lateToday: 8,
    averageHours: 8.2
  };

  // Extended employee data for muster roll
  const musterRollData = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'John Doe',
      department: 'Engineering',
      designation: 'Senior Developer',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      regularHours: 8,
      overtimeHours: 1.25,
      totalHours: 9.25,
      breaks: 1,
      lateBy: 15, // minutes
      earlyLeaving: 0,
      basicSalary: 75000,
      hourlyRate: 450,
      overtimeRate: 675,
      avatar: ''
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Jane Smith',
      department: 'Design',
      designation: 'UI/UX Designer',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      regularHours: 8,
      overtimeHours: 0.5,
      totalHours: 8.5,
      breaks: 0.5,
      lateBy: 0,
      earlyLeaving: 0,
      basicSalary: 65000,
      hourlyRate: 390,
      overtimeRate: 585,
      avatar: ''
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Mike Johnson',
      department: 'Engineering',
      designation: 'Full Stack Developer',
      checkIn: '10:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      regularHours: 7.75,
      overtimeHours: 0,
      totalHours: 7.75,
      breaks: 0.5,
      lateBy: 90, // minutes
      earlyLeaving: 0,
      basicSalary: 70000,
      hourlyRate: 420,
      overtimeRate: 630,
      avatar: ''
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'Sarah Wilson',
      department: 'Marketing',
      designation: 'Marketing Manager',
      checkIn: '--',
      checkOut: '--',
      location: '--',
      status: 'absent',
      regularHours: 0,
      overtimeHours: 0,
      totalHours: 0,
      breaks: 0,
      lateBy: 0,
      earlyLeaving: 0,
      basicSalary: 80000,
      hourlyRate: 480,
      overtimeRate: 720,
      avatar: ''
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'David Brown',
      department: 'Sales',
      designation: 'Sales Executive',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM',
      location: 'office',
      status: 'present',
      regularHours: 8,
      overtimeHours: 1,
      totalHours: 9,
      breaks: 1,
      lateBy: 0,
      earlyLeaving: 0,
      basicSalary: 60000,
      hourlyRate: 360,
      overtimeRate: 540,
      avatar: ''
    },
    {
      id: '6',
      employeeId: 'EMP006',
      name: 'Lisa Chen',
      department: 'HR',
      designation: 'HR Specialist',
      checkIn: '09:30 AM',
      checkOut: '04:30 PM',
      location: 'office',
      status: 'early_leave',
      regularHours: 7,
      overtimeHours: 0,
      totalHours: 7,
      breaks: 0.5,
      lateBy: 30,
      earlyLeaving: 60, // minutes
      basicSalary: 55000,
      hourlyRate: 330,
      overtimeRate: 495,
      avatar: ''
    }
  ];

  const employeeAttendance = [
    {
      id: '1',
      name: 'John Doe',
      department: 'Engineering',
      checkIn: '09:15 AM',
      checkOut: '--',
      location: 'office',
      status: 'present',
      hours: 6.5,
      avatar: ''
    },
    {
      id: '2',
      name: 'Jane Smith',
      department: 'Design',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      avatar: ''
    },
    {
      id: '3',
      name: 'Mike Johnson',
      department: 'Engineering',
      checkIn: '10:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      hours: 7.75,
      avatar: ''
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      department: 'Marketing',
      checkIn: '--',
      checkOut: '--',
      location: '--',
      status: 'absent',
      hours: 0,
      avatar: ''
    }
  ];

  const pendingRequests = [
    {
      id: '1',
      employeeName: 'Alex Brown',
      department: 'Engineering',
      requestDate: '2024-01-20',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      location: 'office',
      reason: 'Forgot to check in due to urgent meeting',
      submittedOn: '2024-01-22'
    },
    {
      id: '2',
      employeeName: 'Lisa Davis',
      department: 'Design',
      requestDate: '2024-01-19',
      checkIn: '10:00 AM',
      checkOut: '07:30 PM',
      location: 'wfh',
      reason: 'System was down, could not check in on time',
      submittedOn: '2024-01-21'
    }
  ];

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
  
  const workLocations = [
    { id: '1', name: 'Main Office', address: '123 Business St, City', latitude: 40.7128, longitude: -74.0060, radius: 100 },
    { id: '2', name: 'Branch Office', address: '456 Corporate Ave, City', latitude: 40.7589, longitude: -73.9851, radius: 150 },
    { id: '3', name: 'Client Site A', address: '789 Client Rd, City', latitude: 40.7505, longitude: -73.9934, radius: 75 }
  ];

  // Analytics data
  const attendanceTrendData = [
    { month: 'Jan', present: 92, absent: 8, wfh: 15 },
    { month: 'Feb', present: 89, absent: 11, wfh: 18 },
    { month: 'Mar', present: 94, absent: 6, wfh: 22 },
    { month: 'Apr', present: 91, absent: 9, wfh: 25 },
    { month: 'May', present: 88, absent: 12, wfh: 20 },
    { month: 'Jun', present: 95, absent: 5, wfh: 28 }
  ];

  const departmentAttendanceData = [
    { department: 'Engineering', present: 45, absent: 3, wfh: 12, total: 60 },
    { department: 'Design', present: 18, absent: 1, wfh: 6, total: 25 },
    { department: 'Marketing', present: 22, absent: 2, wfh: 4, total: 28 },
    { department: 'Sales', present: 28, absent: 4, wfh: 3, total: 35 },
    { department: 'HR', present: 7, absent: 1, wfh: 0, total: 8 }
  ];

  const attendanceStatusData = [
    { name: 'Present', value: 142, color: '#10b981' },
    { name: 'WFH', value: 28, color: '#3b82f6' },
    { name: 'Absent', value: 14, color: '#ef4444' },
    { name: 'Late', value: 8, color: '#f59e0b' }
  ];

  const weeklyProductivityData = [
    { day: 'Mon', avgHours: 8.2, productivity: 85 },
    { day: 'Tue', avgHours: 8.5, productivity: 88 },
    { day: 'Wed', avgHours: 8.1, productivity: 82 },
    { day: 'Thu', avgHours: 8.3, productivity: 87 },
    { day: 'Fri', avgHours: 7.8, productivity: 80 },
    { day: 'Sat', avgHours: 4.2, productivity: 75 },
    { day: 'Sun', avgHours: 2.1, productivity: 70 }
  ];

  const attendanceInsights = {
    totalWorkingDays: 22,
    avgAttendanceRate: 91.5,
    avgWfhRate: 18.2,
    peakAttendanceDay: 'Tuesday',
    lowestAttendanceDay: 'Friday',
    totalOvertimeHours: 156,
    avgOvertimePerEmployee: 2.3,
    punctualityRate: 87.5,
    earlyLeaveRate: 5.2
  };

  const getFilteredEmployees = () => {
    let filtered = employeeAttendance;
    
    if (searchQuery) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    return filtered;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { variant: 'default' as const, label: 'Present' },
      late: { variant: 'secondary' as const, label: 'Late' },
      absent: { variant: 'destructive' as const, label: 'Absent' },
      early_leave: { variant: 'outline' as const, label: 'Early Leave' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    toast({
      title: `Request ${action}d`,
      description: `Attendance update request has been ${action}d successfully`,
      variant: action === 'approve' ? 'default' : 'destructive'
    });
  };

  const handleUpdateWfhPolicy = () => {
    toast({
      title: "WFH Policy Updated",
      description: "Work from home policy has been updated successfully",
    });
    setIsWfhPolicyOpen(false);
  };

  const exportAttendance = () => {
    toast({
      title: "Export Started",
      description: "Attendance report is being generated and will be downloaded shortly",
    });
  };

  const calculateDayWages = (employee: any) => {
    const regularWages = employee.regularHours * employee.hourlyRate;
    const overtimeWages = employee.overtimeHours * employee.overtimeRate;
    return regularWages + overtimeWages;
  };

  const getMusterRollSummary = () => {
    const totalPresent = musterRollData.filter(emp => emp.status === 'present' || emp.status === 'late' || emp.status === 'early_leave').length;
    const totalAbsent = musterRollData.filter(emp => emp.status === 'absent').length;
    const totalRegularHours = musterRollData.reduce((sum, emp) => sum + emp.regularHours, 0);
    const totalOvertimeHours = musterRollData.reduce((sum, emp) => sum + emp.overtimeHours, 0);
    const totalWages = musterRollData.reduce((sum, emp) => sum + calculateDayWages(emp), 0);
    
    return {
      totalPresent,
      totalAbsent,
      totalRegularHours,
      totalOvertimeHours,
      totalWages
    };
  };

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.address) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Location Added",
      description: `${newLocation.name} has been added successfully`,
    });
    setNewLocation({ name: '', address: '', latitude: '', longitude: '', radius: '100' });
    setIsLocationMasterOpen(false);
  };

  const handleUpdateGeoTagging = () => {
    toast({
      title: "Geo-tagging Settings Updated",
      description: "Location tracking settings have been updated successfully",
    });
    setIsGeoTaggingOpen(false);
  };

  const handleSendWfhNotification = () => {
    if (!wfhNotificationSettings.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a notification message",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "WFH Notification Sent",
      description: `Notification sent to ${wfhNotificationSettings.notifyDepartment === 'all' ? 'all departments' : wfhNotificationSettings.notifyDepartment} for ${format(new Date(wfhNotificationSettings.notifyDate), 'MMM dd, yyyy')}`,
    });
    setWfhNotificationSettings({ ...wfhNotificationSettings, message: '' });
    setIsWfhNotificationOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Attendance Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage team attendance
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200" 
              onClick={() => window.location.href = '/attendance'}
            >
              <Users className="w-4 h-4 mr-2" />
              Employee View
            </Button>
            <Button variant="outline" onClick={exportAttendance}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Cog className="h-4 w-4 mr-2" />
                  Admin Settings
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Attendance Management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLocationMasterOpen(true)}>
                  <Building className="h-4 w-4 mr-2" />
                  Work Location Master
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsGeoTaggingOpen(true)}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Geo Tagging Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>WFH Management</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setIsWfhPolicyOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  WFH Policy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsWfhNotificationOpen(true)}>
                  <Bell className="h-4 w-4 mr-2" />
                  WFH Notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Dialogs */}
        {/* Work Location Master Dialog */}
        <Dialog open={isLocationMasterOpen} onOpenChange={setIsLocationMasterOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Work Location Master</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Add New Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Location Name *</Label>
                      <Input
                        placeholder="e.g., Main Office"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Address *</Label>
                      <Input
                        placeholder="Full address"
                        value={newLocation.address}
                        onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Latitude</Label>
                      <Input
                        placeholder="40.7128"
                        value={newLocation.latitude}
                        onChange={(e) => setNewLocation({...newLocation, latitude: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Longitude</Label>
                      <Input
                        placeholder="-74.0060"
                        value={newLocation.longitude}
                        onChange={(e) => setNewLocation({...newLocation, longitude: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Radius (meters)</Label>
                      <Input
                        placeholder="100"
                        value={newLocation.radius}
                        onChange={(e) => setNewLocation({...newLocation, radius: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddLocation} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Existing Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workLocations.map((location) => (
                      <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-muted-foreground">{location.address}</div>
                            <div className="text-xs text-muted-foreground">
                              Radius: {location.radius}m • Lat: {location.latitude}, Lng: {location.longitude}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Geo Tagging Dialog */}
        <Dialog open={isGeoTaggingOpen} onOpenChange={setIsGeoTaggingOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Geo-tagging Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Location Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track employee location for check-ins</p>
                </div>
                <input
                  type="checkbox"
                  checked={geoTagSettings.enabled}
                  onChange={(e) => setGeoTagSettings({...geoTagSettings, enabled: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div>
                <Label>Location Accuracy</Label>
                <Select value={geoTagSettings.accuracy} onValueChange={(value) => setGeoTagSettings({...geoTagSettings, accuracy: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Accuracy</SelectItem>
                    <SelectItem value="medium">Medium Accuracy</SelectItem>
                    <SelectItem value="low">Low Accuracy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Allowed Radius (meters)</Label>
                <Input
                  placeholder="50"
                  value={geoTagSettings.allowedRadius}
                  onChange={(e) => setGeoTagSettings({...geoTagSettings, allowedRadius: e.target.value})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum distance from work location for valid check-in
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleUpdateGeoTagging} className="flex-1">
                  Update Settings
                </Button>
                <Button variant="outline" onClick={() => setIsGeoTaggingOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* WFH Policy Dialog */}
        <Dialog open={isWfhPolicyOpen} onOpenChange={setIsWfhPolicyOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Work From Home Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Department</Label>
                <Select value={wfhPolicyForm.department} onValueChange={(value) => setWfhPolicyForm({...wfhPolicyForm, department: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Max WFH Days per Week</Label>
                <Select value={wfhPolicyForm.maxWfhDays} onValueChange={(value) => setWfhPolicyForm({...wfhPolicyForm, maxWfhDays: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="4">4 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Advance Notice Required (Days)</Label>
                <Select value={wfhPolicyForm.advanceNotice} onValueChange={(value) => setWfhPolicyForm({...wfhPolicyForm, advanceNotice: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Same Day</SelectItem>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateWfhPolicy} className="flex-1">
                  Update Policy
                </Button>
                <Button variant="outline" onClick={() => setIsWfhPolicyOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* WFH Notification Dialog */}
        <Dialog open={isWfhNotificationOpen} onOpenChange={setIsWfhNotificationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send WFH Notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Notification Date</Label>
                <Input
                  type="date"
                  value={wfhNotificationSettings.notifyDate}
                  onChange={(e) => setWfhNotificationSettings({...wfhNotificationSettings, notifyDate: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Target Department</Label>
                <Select value={wfhNotificationSettings.notifyDepartment} onValueChange={(value) => setWfhNotificationSettings({...wfhNotificationSettings, notifyDepartment: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Urgency Level</Label>
                <Select value={wfhNotificationSettings.urgency} onValueChange={(value) => setWfhNotificationSettings({...wfhNotificationSettings, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Notification Message *</Label>
                <textarea
                  placeholder="Enter your WFH notification message..."
                  value={wfhNotificationSettings.message}
                  onChange={(e) => setWfhNotificationSettings({...wfhNotificationSettings, message: e.target.value})}
                  className="w-full min-h-[100px] p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This message will be sent to employees about WFH arrangements for the selected date.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSendWfhNotification} className="flex-1">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button variant="outline" onClick={() => setIsWfhNotificationOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{attendanceStats.totalEmployees}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{attendanceStats.presentToday}</div>
              <div className="text-sm text-muted-foreground">Present</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Home className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{attendanceStats.wfhToday}</div>
              <div className="text-sm text-muted-foreground">WFH</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{attendanceStats.absentToday}</div>
              <div className="text-sm text-muted-foreground">Absent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{attendanceStats.lateToday}</div>
              <div className="text-sm text-muted-foreground">Late</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{attendanceStats.averageHours}h</div>
              <div className="text-sm text-muted-foreground">Avg Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Today's Attendance</TabsTrigger>
            <TabsTrigger value="muster" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Muster Roll</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Pending Requests ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="locations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Work Locations</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Filters */}
            <Card className="hover:shadow-sm hover:translate-y-0">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-[160px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employee List */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Attendance - {format(new Date(selectedDate), 'MMM dd, yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFilteredEmployees().map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.department}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">{employee.checkIn}</div>
                          <div className="text-xs text-muted-foreground">Check In</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{employee.checkOut}</div>
                          <div className="text-xs text-muted-foreground">Check Out</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {employee.location === 'wfh' ? (
                            <Home className="h-4 w-4 text-blue-500" />
                          ) : employee.location === 'office' ? (
                            <Building className="h-4 w-4 text-gray-500" />
                          ) : null}
                          <span className="text-sm">{employee.location === 'wfh' ? 'WFH' : employee.location === 'office' ? 'Office' : '--'}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{employee.hours}h</div>
                          <div className="text-xs text-muted-foreground">Hours</div>
                        </div>
                        {getStatusBadge(employee.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="muster" className="space-y-4">
            {/* Muster Roll View Toggle */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Muster Roll</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={musterView === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMusterView('day')}
                    >
                      Day View
                    </Button>
                    <Button
                      variant={musterView === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMusterView('month')}
                    >
                      Month View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Muster Roll Summary */}
            {(() => {
              const summary = getMusterRollSummary();
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">{summary.totalPresent}</div>
                      <div className="text-sm text-muted-foreground">Present</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <XCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                      <div className="text-2xl font-bold">{summary.totalAbsent}</div>
                      <div className="text-sm text-muted-foreground">Absent</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold">{summary.totalRegularHours.toFixed(1)}h</div>
                      <div className="text-sm text-muted-foreground">Regular Hours</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                      <div className="text-2xl font-bold">{summary.totalOvertimeHours.toFixed(1)}h</div>
                      <div className="text-sm text-muted-foreground">Overtime</div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}

            {/* Filters for Muster Roll */}
            <Card className="hover:shadow-sm hover:translate-y-0">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {musterView === 'day' ? (
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full sm:w-[160px]"
                    />
                  ) : (
                    <Input
                      type="month"
                      value={selectedDate.slice(0, 7)}
                      onChange={(e) => setSelectedDate(e.target.value + '-01')}
                      className="w-full sm:w-[160px]"
                    />
                  )}
                  <Button onClick={exportAttendance} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Muster Roll Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {musterView === 'day' 
                    ? `Daily Muster Roll - ${format(new Date(selectedDate), 'MMM dd, yyyy')}`
                    : `Monthly Muster Roll - ${format(new Date(selectedDate), 'MMMM yyyy')}`
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Emp ID</th>
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Department</th>
                        <th className="text-left p-3 font-medium">Designation</th>
                        {musterView === 'day' ? (
                          <>
                            <th className="text-center p-3 font-medium">Check In</th>
                            <th className="text-center p-3 font-medium">Check Out</th>
                            <th className="text-center p-3 font-medium">Regular Hrs</th>
                            <th className="text-center p-3 font-medium">OT Hrs</th>
                            <th className="text-center p-3 font-medium">Total Hrs</th>
                            <th className="text-center p-3 font-medium">Late By</th>
                            <th className="text-center p-3 font-medium">Location</th>
                            <th className="text-center p-3 font-medium">Status</th>
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
                      {musterRollData.map((employee) => {
                        return (
                          <tr key={employee.id} className="border-b hover:bg-muted/50">
                            <td className="p-3 font-mono text-sm">{employee.employeeId}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={employee.avatar} />
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{employee.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">{employee.department}</td>
                            <td className="p-3 text-sm">{employee.designation}</td>
                            {musterView === 'day' ? (
                              <>
                                <td className="p-3 text-center text-sm font-mono">
                                  {employee.checkIn}
                                </td>
                                <td className="p-3 text-center text-sm font-mono">
                                  {employee.checkOut}
                                </td>
                                <td className="p-3 text-center font-mono">
                                  {employee.regularHours > 0 ? employee.regularHours.toFixed(1) : '--'}
                                </td>
                                <td className="p-3 text-center font-mono">
                                  {employee.overtimeHours > 0 ? (
                                    <span className="text-orange-600 font-medium">
                                      {employee.overtimeHours.toFixed(1)}
                                    </span>
                                  ) : '--'}
                                </td>
                                <td className="p-3 text-center font-mono font-medium">
                                  {employee.totalHours > 0 ? employee.totalHours.toFixed(1) : '--'}
                                </td>
                                <td className="p-3 text-center">
                                  {employee.lateBy > 0 ? (
                                    <span className="text-red-600 font-medium text-sm">
                                      {employee.lateBy}m
                                    </span>
                                  ) : (
                                    <span className="text-green-600 text-sm">On Time</span>
                                  )}
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    {employee.location === 'wfh' ? (
                                      <>
                                        <Home className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">WFH</span>
                                      </>
                                    ) : employee.location === 'office' ? (
                                      <>
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">Office</span>
                                      </>
                                    ) : (
                                      <span className="text-sm">--</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  {getStatusBadge(employee.status)}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="p-3 text-center font-medium text-green-600">
                                  {Math.floor(Math.random() * 25) + 20}
                                </td>
                                <td className="p-3 text-center font-medium text-red-600">
                                  {Math.floor(Math.random() * 5) + 1}
                                </td>
                                <td className="p-3 text-center font-medium text-yellow-600">
                                  {Math.floor(Math.random() * 8) + 2}
                                </td>
                                <td className="p-3 text-center font-medium text-blue-600">
                                  {Math.floor(Math.random() * 10) + 5}
                                </td>
                                <td className="p-3 text-center font-mono font-medium">
                                  {(Math.random() * 50 + 150).toFixed(1)}h
                                </td>
                                <td className="p-3 text-center font-mono">
                                  {(Math.random() * 2 + 7).toFixed(1)}h
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 bg-muted/30">
                        <td colSpan={musterView === 'day' ? 4 : 4} className="p-3 font-bold">TOTAL</td>
                        {musterView === 'day' ? (
                          <>
                            <td colSpan={2} className="p-3"></td>
                            <td className="p-3 text-center font-bold">
                              {musterRollData.reduce((sum, emp) => sum + emp.regularHours, 0).toFixed(1)}
                            </td>
                            <td className="p-3 text-center font-bold text-orange-600">
                              {musterRollData.reduce((sum, emp) => sum + emp.overtimeHours, 0).toFixed(1)}
                            </td>
                            <td className="p-3 text-center font-bold">
                              {musterRollData.reduce((sum, emp) => sum + emp.totalHours, 0).toFixed(1)}
                            </td>
                            <td colSpan={3} className="p-3"></td>
                          </>
                        ) : (
                          <>
                            <td className="p-3 text-center font-bold text-green-600">
                              {musterRollData.reduce((sum, emp) => sum + Math.floor(Math.random() * 25) + 20, 0)}
                            </td>
                            <td className="p-3 text-center font-bold text-red-600">
                              {musterRollData.reduce((sum, emp) => sum + Math.floor(Math.random() * 5) + 1, 0)}
                            </td>
                            <td className="p-3 text-center font-bold text-yellow-600">
                              {musterRollData.reduce((sum, emp) => sum + Math.floor(Math.random() * 8) + 2, 0)}
                            </td>
                            <td className="p-3 text-center font-bold text-blue-600">
                              {musterRollData.reduce((sum, emp) => sum + Math.floor(Math.random() * 10) + 5, 0)}
                            </td>
                            <td className="p-3 text-center font-bold">
                              {(musterRollData.length * (Math.random() * 50 + 150)).toFixed(1)}h
                            </td>
                            <td className="p-3 text-center font-bold">
                              {(musterRollData.length * (Math.random() * 2 + 7)).toFixed(1)}h
                            </td>
                          </>
                        )}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Attendance Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{request.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">{request.department}</p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Date</div>
                          <div className="text-sm font-medium">{format(new Date(request.requestDate), 'MMM dd, yyyy')}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Check In</div>
                          <div className="text-sm font-medium">{request.checkIn}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Check Out</div>
                          <div className="text-sm font-medium">{request.checkOut}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Location</div>
                          <div className="text-sm font-medium capitalize">{request.location}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Reason</div>
                        <p className="text-sm">{request.reason}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleRequestAction(request.id, 'approve')}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRequestAction(request.id, 'reject')}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Work Locations
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setIsGeoTaggingOpen(true)}
                      variant="outline"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Geo Settings
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setIsLocationMasterOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.address}</div>
                          <div className="text-xs text-muted-foreground">
                            Coverage: {location.radius}m radius • Coordinates: {location.latitude}, {location.longitude}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Active
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Attendance Rate"
                value={`${attendanceInsights.avgAttendanceRate}%`}
                description="This month"
                icon={UserCheck}
                trend={{ value: 2.5, positive: true }}
              />
              <StatsCard
                title="WFH Rate"
                value={`${attendanceInsights.avgWfhRate}%`}
                description="This month"
                icon={Home}
                trend={{ value: 1.8, positive: true }}
              />
              <StatsCard
                title="Punctuality Rate"
                value={`${attendanceInsights.punctualityRate}%`}
                description="On-time arrivals"
                icon={Clock}
                trend={{ value: -1.2, positive: false }}
              />
              <StatsCard
                title="Avg Overtime"
                value={`${attendanceInsights.avgOvertimePerEmployee}h`}
                description="Per employee/month"
                icon={TrendingUp}
                trend={{ value: 0.5, positive: false }}
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Trend Chart */}
              <Card>
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

              {/* Attendance Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Today's Attendance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart data={generateMockData.taskStatus} height={280} />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {attendanceStatusData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department-wise Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Department-wise Attendance
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

              {/* Weekly Productivity Trends */}
              <Card>
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

            {/* Insights and Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Insights */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Strong Attendance Performance</h4>
                        <p className="text-sm text-green-700 mt-1">
                          {attendanceInsights.peakAttendanceDay} shows the highest attendance rate. Team engagement is strong.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">WFH Adoption Increasing</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Work from home requests have increased by 18% this month, indicating good work-life balance.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Attention Needed</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          {attendanceInsights.lowestAttendanceDay} shows lower attendance. Consider team meetings or flexible hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Quick Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Working Days</span>
                    <span className="font-medium">{attendanceInsights.totalWorkingDays}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Overtime</span>
                    <span className="font-medium">{attendanceInsights.totalOvertimeHours}h</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Early Leave Rate</span>
                    <span className="font-medium">{attendanceInsights.earlyLeaveRate}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Top Department</span>
                    <Badge variant="outline">Engineering</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Peak Day</span>
                    <Badge variant="default">{attendanceInsights.peakAttendanceDay}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export and Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Export Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={exportAttendance}>
                    <Download className="h-4 w-4 mr-2" />
                    Monthly Report
                  </Button>
                  <Button variant="outline" onClick={exportAttendance}>
                    <Download className="h-4 w-4 mr-2" />
                    Department Analysis
                  </Button>
                  <Button variant="outline" onClick={exportAttendance}>
                    <Download className="h-4 w-4 mr-2" />
                    Overtime Report
                  </Button>
                  <Button variant="outline" onClick={exportAttendance}>
                    <Download className="h-4 w-4 mr-2" />
                    Productivity Metrics
                  </Button>
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