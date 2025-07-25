import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  MapPin, 
  Home,
  Building, 
  CheckCircle, 
  XCircle,
  Edit,
  Plus,
  Users,
  Calendar as CalendarIcon,
  User
} from 'lucide-react';
import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const Attendance = () => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [workLocation, setWorkLocation] = useState<'office' | 'wfh'>('office');
  const [isBackdateDialogOpen, setIsBackdateDialogOpen] = useState(false);
  const [backdateForm, setBackdateForm] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
    location: 'office',
    reason: ''
  });

  const currentUser = {
    name: 'John Doe',
    id: 'user123',
    role: 'admin' // Change to 'member' for regular users
  };

  // Mock attendance data with more comprehensive records
  const attendanceRecords = [
    {
      id: '1',
      date: '2025-01-24',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.25,
      overtime: 0.25
    },
    {
      id: '2',
      date: '2025-01-23',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '3',
      date: '2025-01-22',
      checkIn: '10:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      hours: 7.75,
      overtime: 0
    },
    {
      id: '4',
      date: '2025-01-21',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Sick leave'
    },
    {
      id: '5',
      date: '2025-01-20',
      checkIn: '09:05 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.42,
      overtime: 0.42
    },
    {
      id: '6',
      date: '2025-01-17',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Annual Leave'
    },
    {
      id: '7',
      date: '2025-01-16',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '8',
      date: '2025-01-15',
      checkIn: '09:30 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '9',
      date: '2025-01-14',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '10',
      date: '2025-01-13',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Personal Leave'
    }
  ];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'dashboard' | 'calendar'>('dashboard');

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Checked In Successfully",
      description: `Checked in at ${format(new Date(), 'hh:mm a')} - ${workLocation === 'wfh' ? 'Work from Home' : 'Office'}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "Checked Out Successfully",
      description: `Checked out at ${format(new Date(), 'hh:mm a')}`,
    });
  };

  const handleBackdateRequest = () => {
    if (!backdateForm.date || !backdateForm.checkIn || !backdateForm.reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Backdate Request Submitted",
      description: "Your attendance update request has been sent for approval",
    });
    
    setIsBackdateDialogOpen(false);
    setBackdateForm({
      date: '',
      checkIn: '',
      checkOut: '',
      location: 'office',
      reason: ''
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { variant: 'default' as const, label: 'Present' },
      late: { variant: 'secondary' as const, label: 'Late' },
      absent: { variant: 'destructive' as const, label: 'Absent' },
      leave: { variant: 'outline' as const, label: 'On Leave' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // Helper function to get attendance for a specific date
  const getAttendanceForDate = (date: Date) => {
    return attendanceRecords.find(record => 
      isSameDay(new Date(record.date), date)
    );
  };

  // Helper function to get status color for calendar
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500 hover:bg-green-600';
      case 'late':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'absent':
        return 'bg-red-500 hover:bg-red-600';
      case 'leave':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  // Custom day component for calendar
  const renderCalendarDay = (date: Date) => {
    const attendance = getAttendanceForDate(date);
    const isCurrentMonth = isSameMonth(date, selectedDate);
    
    if (!attendance || !isCurrentMonth) {
      return null;
    }

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className={`absolute inset-1 rounded-full ${getStatusColor(attendance.status)} opacity-80 cursor-pointer transition-all duration-200`}
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4" side="top">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">
                {format(date, 'EEEE, MMM dd')}
              </h4>
              {getStatusBadge(attendance.status)}
            </div>
            
            {attendance.status === 'present' || attendance.status === 'late' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">Check In</div>
                      <div className="text-sm text-muted-foreground">{attendance.checkIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <div>
                      <div className="text-sm font-medium">Check Out</div>
                      <div className="text-sm text-muted-foreground">{attendance.checkOut || 'Not yet'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {attendance.location === 'wfh' ? (
                    <Home className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Building className="h-4 w-4 text-gray-600" />
                  )}
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {attendance.location === 'wfh' ? 'Work from Home' : 'Office'}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Hours: </span>
                    <span className="font-medium">{attendance.hours}h</span>
                  </div>
                  {attendance.overtime > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Overtime: </span>
                      <span className="font-medium text-amber-600">+{attendance.overtime}h</span>
                    </div>
                  )}
                </div>
              </div>
            ) : attendance.status === 'leave' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Leave Type</div>
                    <div className="text-sm text-muted-foreground">{attendance.leaveType}</div>
                  </div>
                </div>
              </div>
            ) : attendance.status === 'absent' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-sm font-medium">Reason</div>
                    <div className="text-sm text-muted-foreground">{attendance.reason || 'Not specified'}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  const todaysHours = 8.5;
  const weeklyHours = 42.25;
  const monthlyHours = 168.75;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              My Attendance
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your work hours and manage attendance
            </p>
          </div>
          {currentUser.role === 'admin' && (
            <Button variant="outline" onClick={() => window.location.href = '/admin-attendance'}>
              <Users className="h-4 w-4 mr-2" />
              Admin View
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Hours Summary - Now Top Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Hours Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    {todaysHours}h
                  </div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-xl font-semibold">{weeklyHours}h</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-xl font-semibold">{monthlyHours}h</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Days Present</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Hours/Day</span>
                    <span className="font-medium">8.2h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Late Days</span>
                    <span className="font-medium text-amber-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Calendar View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                {/* Check In/Out Card - Enhanced */}
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Clock className="h-6 w-6 text-primary" />
                      Today's Attendance
                      <Badge variant="outline" className="ml-auto">
                        {format(new Date(), 'EEEE, MMM dd')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <Clock className="h-10 w-10 mx-auto mb-3 text-green-600" />
                        <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                          {isCheckedIn ? format(new Date(), 'hh:mm a') : '--:--'}
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">Check In</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <Clock className="h-10 w-10 mx-auto mb-3 text-red-600" />
                        <div className="text-2xl font-bold text-red-700 dark:text-red-400">--:--</div>
                        <div className="text-sm text-red-600 dark:text-red-400 font-medium">Check Out</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Work Location</Label>
                        <Select value={workLocation} onValueChange={(value: 'office' | 'wfh') => setWorkLocation(value)}>
                          <SelectTrigger className="h-12 mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office">
                              <div className="flex items-center gap-3 p-1">
                                <Building className="h-5 w-5 text-gray-600" />
                                <div>
                                  <div className="font-medium">Office</div>
                                  <div className="text-xs text-muted-foreground">Work from office</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="wfh">
                              <div className="flex items-center gap-3 p-1">
                                <Home className="h-5 w-5 text-blue-600" />
                                <div>
                                  <div className="font-medium">Work from Home</div>
                                  <div className="text-xs text-muted-foreground">Remote work</div>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-3">
                        {!isCheckedIn ? (
                          <Button onClick={handleCheckIn} className="flex-1 h-12 text-base">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Check In
                          </Button>
                        ) : (
                          <Button onClick={handleCheckOut} variant="outline" className="flex-1 h-12 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            <XCircle className="h-5 w-5 mr-2" />
                            Check Out
                          </Button>
                        )}
                        
                        <Dialog open={isBackdateDialogOpen} onOpenChange={setIsBackdateDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="h-12">
                              <Edit className="h-5 w-5 mr-2" />
                              Request Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Request Attendance Update</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="backdate-date">Date *</Label>
                                <Input
                                  id="backdate-date"
                                  type="date"
                                  value={backdateForm.date}
                                  onChange={(e) => setBackdateForm({...backdateForm, date: e.target.value})}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="backdate-checkin">Check In *</Label>
                                  <Input
                                    id="backdate-checkin"
                                    type="time"
                                    value={backdateForm.checkIn}
                                    onChange={(e) => setBackdateForm({...backdateForm, checkIn: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="backdate-checkout">Check Out</Label>
                                  <Input
                                    id="backdate-checkout"
                                    type="time"
                                    value={backdateForm.checkOut}
                                    onChange={(e) => setBackdateForm({...backdateForm, checkOut: e.target.value})}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Location</Label>
                                <Select value={backdateForm.location} onValueChange={(value) => setBackdateForm({...backdateForm, location: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="office">Office</SelectItem>
                                    <SelectItem value="wfh">Work from Home</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="backdate-reason">Reason *</Label>
                                <Textarea
                                  id="backdate-reason"
                                  placeholder="Please explain why you need to update this attendance record..."
                                  value={backdateForm.reason}
                                  onChange={(e) => setBackdateForm({...backdateForm, reason: e.target.value})}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={handleBackdateRequest} className="flex-1">
                                  Submit Request
                                </Button>
                                <Button variant="outline" onClick={() => setIsBackdateDialogOpen(false)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance History - Enhanced */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Attendance</span>
                      <Badge variant="secondary">{attendanceRecords.length} records</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {attendanceRecords.map((record) => (
                        <div key={record.id} className="group flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-all duration-200 hover:shadow-md">
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[60px]">
                              <div className="font-bold text-lg">{format(new Date(record.date), 'dd')}</div>
                              <div className="text-xs text-muted-foreground uppercase font-medium">{format(new Date(record.date), 'MMM')}</div>
                              <div className="text-xs text-muted-foreground">{format(new Date(record.date), 'EEE')}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-muted">
                                {record.status === 'leave' ? (
                                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                                ) : record.status === 'absent' ? (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                ) : record.location === 'wfh' ? (
                                  <Home className="h-5 w-5 text-blue-600" />
                                ) : (
                                  <Building className="h-5 w-5 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {record.status === 'leave' ? record.leaveType : 
                                   record.status === 'absent' ? 'Absent' :
                                   record.location === 'wfh' ? 'Work from Home' : 'Office'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {record.status === 'present' || record.status === 'late' ? (
                                    <>
                                      {record.hours}h worked
                                      {record.overtime > 0 && (
                                        <span className="text-amber-600 ml-1">+{record.overtime}h OT</span>
                                      )}
                                    </>
                                  ) : record.status === 'absent' ? (
                                    record.reason
                                  ) : record.status === 'leave' ? (
                                    'On Leave'
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            {(record.status === 'present' || record.status === 'late') && (
                              <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                  <div className="text-sm font-bold">{record.checkIn}</div>
                                  <div className="text-xs text-muted-foreground">In</div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold">{record.checkOut}</div>
                                  <div className="text-xs text-muted-foreground">Out</div>
                                </div>
                              </div>
                            )}
                            {getStatusBadge(record.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6">
                {/* Calendar View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                      Attendance Calendar
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Late</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Absent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>On Leave</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <EnhancedCalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                        components={{
                          DayContent: ({ date }) => (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <span className="relative z-10">{date.getDate()}</span>
                              {renderCalendarDay(date)}
                            </div>
                          )
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Date Summary */}
                {(() => {
                  const selectedAttendance = getAttendanceForDate(selectedDate);
                  if (!selectedAttendance) return null;
                  
                  return (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Selected Date Details</span>
                          <Badge variant="outline">
                            {format(selectedDate, 'EEEE, MMM dd, yyyy')}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Status</span>
                              {getStatusBadge(selectedAttendance.status)}
                            </div>
                            
                            {selectedAttendance.status === 'present' || selectedAttendance.status === 'late' ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Location</span>
                                  <div className="flex items-center gap-2">
                                    {selectedAttendance.location === 'wfh' ? (
                                      <Home className="h-4 w-4 text-blue-600" />
                                    ) : (
                                      <Building className="h-4 w-4 text-gray-600" />
                                    )}
                                    <span className="text-sm">
                                      {selectedAttendance.location === 'wfh' ? 'Work from Home' : 'Office'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Hours Worked</span>
                                  <span className="text-sm font-semibold">{selectedAttendance.hours}h</span>
                                </div>
                                {selectedAttendance.overtime > 0 && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Overtime</span>
                                    <span className="text-sm font-semibold text-amber-600">+{selectedAttendance.overtime}h</span>
                                  </div>
                                )}
                              </>
                            ) : selectedAttendance.status === 'leave' ? (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Leave Type</span>
                                <span className="text-sm">{selectedAttendance.leaveType}</span>
                              </div>
                            ) : selectedAttendance.status === 'absent' ? (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Reason</span>
                                <span className="text-sm">{selectedAttendance.reason}</span>
                              </div>
                            ) : null}
                          </div>
                          
                          {selectedAttendance.status === 'present' || selectedAttendance.status === 'late' ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                  <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
                                  <div className="text-lg font-bold text-green-700 dark:text-green-400">
                                    {selectedAttendance.checkIn}
                                  </div>
                                  <div className="text-xs text-green-600 dark:text-green-400">Check In</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                  <Clock className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                  <div className="text-lg font-bold text-red-700 dark:text-red-400">
                                    {selectedAttendance.checkOut || '--:--'}
                                  </div>
                                  <div className="text-xs text-red-600 dark:text-red-400">Check Out</div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;