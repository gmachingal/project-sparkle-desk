import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon, 
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Check In/Out Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-semibold">
                      {isCheckedIn ? format(new Date(), 'hh:mm a') : '--:--'}
                    </div>
                    <div className="text-sm text-muted-foreground">Check In</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <div className="text-lg font-semibold">--:--</div>
                    <div className="text-sm text-muted-foreground">Check Out</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Work Location</Label>
                    <Select value={workLocation} onValueChange={(value: 'office' | 'wfh') => setWorkLocation(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Office
                          </div>
                        </SelectItem>
                        <SelectItem value="wfh">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Work from Home
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    {!isCheckedIn ? (
                      <Button onClick={handleCheckIn} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Check In
                      </Button>
                    ) : (
                      <Button onClick={handleCheckOut} variant="outline" className="flex-1">
                        <XCircle className="h-4 w-4 mr-2" />
                        Check Out
                      </Button>
                    )}
                    
                    <Dialog open={isBackdateDialogOpen} onOpenChange={setIsBackdateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Request Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
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

            {/* Attendance History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="font-medium">{format(new Date(record.date), 'MMM dd')}</div>
                          <div className="text-xs text-muted-foreground">{format(new Date(record.date), 'EEE')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {record.location === 'wfh' ? (
                            <Home className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Building className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm">{record.location === 'wfh' ? 'WFH' : 'Office'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{record.checkIn}</div>
                          <div className="text-xs text-muted-foreground">Check In</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{record.checkOut}</div>
                          <div className="text-xs text-muted-foreground">Check Out</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{record.hours}h</div>
                          <div className="text-xs text-muted-foreground">Total</div>
                        </div>
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hours Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Hours Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{todaysHours}h</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-semibold">{weeklyHours}h</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-semibold">{monthlyHours}h</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;