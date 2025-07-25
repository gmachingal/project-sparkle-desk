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
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

const AdminAttendance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isWfhPolicyOpen, setIsWfhPolicyOpen] = useState(false);
  const [wfhPolicyForm, setWfhPolicyForm] = useState({
    department: 'all',
    maxWfhDays: '2',
    requireApproval: true,
    advanceNotice: '1'
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
      absent: { variant: 'destructive' as const, label: 'Absent' }
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
            <Button variant="outline" onClick={exportAttendance}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isWfhPolicyOpen} onOpenChange={setIsWfhPolicyOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  WFH Policy
                </Button>
              </DialogTrigger>
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
          </div>
        </div>

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Today's Attendance</TabsTrigger>
            <TabsTrigger value="requests">Pending Requests ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Filters */}
            <Card>
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

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and reports will be available in the next update.
                  </p>
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