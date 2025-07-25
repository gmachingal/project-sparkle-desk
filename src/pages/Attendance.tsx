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
  Users
} from 'lucide-react';
import { format } from 'date-fns';

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

  // Mock attendance data
  const attendanceRecords = [
    {
      id: '1',
      date: '2024-01-22',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.25,
      overtime: 0.25
    },
    {
      id: '2',
      date: '2024-01-21',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '3',
      date: '2024-01-20',
      checkIn: '10:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      hours: 7.75,
      overtime: 0
    }
  ];

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
      wfh: { variant: 'outline' as const, label: 'WFH' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
                            {record.location === 'wfh' ? (
                              <Home className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Building className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{record.location === 'wfh' ? 'Work from Home' : 'Office'}</div>
                            <div className="text-xs text-muted-foreground">
                              {record.hours}h worked
                              {record.overtime > 0 && (
                                <span className="text-amber-600 ml-1">+{record.overtime}h OT</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
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
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;