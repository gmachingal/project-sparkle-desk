import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch";
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
  User,
  ChevronLeft,
  Settings,
  ChevronRight
} from 'lucide-react';
import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
      date: '2025-01-25',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.25,
      overtime: 0.25
    },
    {
      id: '2',
      date: '2025-01-24',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '3',
      date: '2025-01-23',
      checkIn: '10:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      hours: 7.75,
      overtime: 0
    },
    {
      id: '4',
      date: '2025-01-22',
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
      date: '2025-01-21',
      checkIn: '09:05 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.42,
      overtime: 0.42
    },
    {
      id: '6',
      date: '2025-01-20',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '7',
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
      id: '8',
      date: '2025-01-16',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '9',
      date: '2025-01-15',
      checkIn: '09:30 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '10',
      date: '2025-01-14',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '11',
      date: '2025-01-13',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Personal Leave'
    },
    {
      id: '12',
      date: '2025-01-10',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '13',
      date: '2025-01-09',
      checkIn: '09:45 AM',
      checkOut: '05:45 PM',
      location: 'wfh',
      status: 'late',
      hours: 8.0,
      overtime: 0
    },
    {
      id: '14',
      date: '2025-01-08',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '15',
      date: '2025-01-07',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '16',
      date: '2025-01-06',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Maternity Leave'
    },
    {
      id: '17',
      date: '2025-01-03',
      checkIn: '09:10 AM',
      checkOut: '06:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 9.08,
      overtime: 1.08
    },
    {
      id: '18',
      date: '2025-01-02',
      checkIn: '10:00 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'late',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '19',
      date: '2025-01-01',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Public Holiday'
    },
    {
      id: '20',
      date: '2024-12-31',
      checkIn: '09:00 AM',
      checkOut: '03:00 PM',
      location: 'office',
      status: 'present',
      hours: 6.0,
      overtime: 0
    },
    {
      id: '21',
      date: '2024-12-30',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Family emergency'
    },
    {
      id: '22',
      date: '2024-12-27',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '23',
      date: '2024-12-26',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Boxing Day'
    },
    {
      id: '24',
      date: '2024-12-25',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Christmas Day'
    },
    {
      id: '25',
      date: '2024-12-24',
      checkIn: '09:00 AM',
      checkOut: '02:00 PM',
      location: 'office',
      status: 'present',
      hours: 5.0,
      overtime: 0
    },
    // June 2025 data
    {
      id: '26',
      date: '2025-06-30',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '27',
      date: '2025-06-29',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Annual Leave'
    },
    {
      id: '28',
      date: '2025-06-28',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Annual Leave'
    },
    {
      id: '29',
      date: '2025-06-27',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '30',
      date: '2025-06-26',
      checkIn: '09:30 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'late',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '31',
      date: '2025-06-25',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '32',
      date: '2025-06-24',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '33',
      date: '2025-06-23',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 9.25,
      overtime: 1.25
    },
    {
      id: '34',
      date: '2025-06-20',
      checkIn: '10:00 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.0,
      overtime: 0
    },
    {
      id: '35',
      date: '2025-06-19',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '36',
      date: '2025-06-18',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Doctor appointment'
    },
    {
      id: '37',
      date: '2025-06-17',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '38',
      date: '2025-06-16',
      checkIn: '09:20 AM',
      checkOut: '06:00 PM',
      location: 'wfh',
      status: 'late',
      hours: 8.67,
      overtime: 0.67
    },
    {
      id: '39',
      date: '2025-06-13',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '40',
      date: '2025-06-12',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Personal Leave'
    },
    {
      id: '41',
      date: '2025-06-11',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '42',
      date: '2025-06-10',
      checkIn: '09:10 AM',
      checkOut: '06:20 PM',
      location: 'office',
      status: 'present',
      hours: 9.17,
      overtime: 1.17
    },
    {
      id: '43',
      date: '2025-06-09',
      checkIn: '09:45 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'late',
      hours: 7.75,
      overtime: 0
    },
    {
      id: '44',
      date: '2025-06-06',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '45',
      date: '2025-06-05',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '46',
      date: '2025-06-04',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Sick leave'
    },
    {
      id: '47',
      date: '2025-06-03',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '48',
      date: '2025-06-02',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    // July 2025 data
    {
      id: '49',
      date: '2025-07-31',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 9.25,
      overtime: 1.25
    },
    {
      id: '50',
      date: '2025-07-30',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '51',
      date: '2025-07-29',
      checkIn: '09:30 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '52',
      date: '2025-07-28',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '53',
      date: '2025-07-25',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '54',
      date: '2025-07-24',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Annual Leave'
    },
    {
      id: '55',
      date: '2025-07-23',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Annual Leave'
    },
    {
      id: '56',
      date: '2025-07-22',
      checkIn: '09:10 AM',
      checkOut: '06:15 PM',
      location: 'office',
      status: 'present',
      hours: 9.08,
      overtime: 1.08
    },
    {
      id: '57',
      date: '2025-07-21',
      checkIn: '09:45 AM',
      checkOut: '05:45 PM',
      location: 'wfh',
      status: 'late',
      hours: 8.0,
      overtime: 0
    },
    {
      id: '58',
      date: '2025-07-18',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '59',
      date: '2025-07-17',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Family emergency'
    },
    {
      id: '60',
      date: '2025-07-16',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '61',
      date: '2025-07-15',
      checkIn: '09:20 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.67,
      overtime: 0.67
    },
    {
      id: '62',
      date: '2025-07-14',
      checkIn: '09:00 AM',
      checkOut: '05:45 PM',
      location: 'office',
      status: 'present',
      hours: 8.75,
      overtime: 0.75
    },
    {
      id: '63',
      date: '2025-07-11',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '64',
      date: '2025-07-10',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Personal Leave'
    },
    {
      id: '65',
      date: '2025-07-09',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      location: 'office',
      status: 'present',
      hours: 9.25,
      overtime: 1.25
    },
    {
      id: '66',
      date: '2025-07-08',
      checkIn: '10:00 AM',
      checkOut: '06:00 PM',
      location: 'office',
      status: 'late',
      hours: 8.0,
      overtime: 0
    },
    {
      id: '67',
      date: '2025-07-07',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '68',
      date: '2025-07-04',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'leave',
      hours: 0,
      overtime: 0,
      leaveType: 'Independence Day'
    },
    {
      id: '69',
      date: '2025-07-03',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      location: 'office',
      status: 'present',
      hours: 8.5,
      overtime: 0.5
    },
    {
      id: '70',
      date: '2025-07-02',
      checkIn: null,
      checkOut: null,
      location: null,
      status: 'absent',
      hours: 0,
      overtime: 0,
      reason: 'Medical appointment'
    },
    {
      id: '71',
      date: '2025-07-01',
      checkIn: '09:10 AM',
      checkOut: '06:00 PM',
      location: 'wfh',
      status: 'present',
      hours: 8.83,
      overtime: 0.83
    }
  ];

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

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

  const todaysHours = 8.5;
  const weeklyHours = 42.25;
  const monthlyHours = 168.75;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Section - Streamlined */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                My Attendance
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your work hours and manage attendance
              </p>
            </div>
            {currentUser.role === 'admin' && (
              <div className="flex items-center gap-3 p-3 rounded-lg border border-red-300 bg-red-50">
                <Settings className="w-4 h-4 text-red-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-red-700">Employee View</span>
                  <span className="text-xs text-muted-foreground">Switch to admin view</span>
                </div>
                <Switch 
                  checked={false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      window.location.href = '/admin-attendance';
                    }
                  }}
                  className="data-[state=checked]:bg-red-600"
                />
              </div>
            )}
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{todaysHours}h</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-xl font-semibold">{weeklyHours}h</div>
                <div className="text-xs text-muted-foreground">This Week</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-xl font-semibold">{monthlyHours}h</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-xl font-semibold">8.2h</div>
                <div className="text-xs text-muted-foreground">Avg/Day</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Log Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Attendance - Compact */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Today's Attendance
                    </span>
                    <Badge variant="outline">
                      {format(new Date(), 'MMM dd')}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Check In/Out Times - Horizontal Layout */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-lg font-bold text-green-700 dark:text-green-400">
                        {isCheckedIn ? format(new Date(), 'hh:mm a') : '--:--'}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">Check In</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-lg font-bold text-red-700 dark:text-red-400">--:--</div>
                      <div className="text-sm text-red-600 dark:text-red-400">Check Out</div>
                    </div>
                  </div>

                  {/* Work Location Selection */}
                  <div>
                    <Label className="text-sm font-medium">Work Location</Label>
                    <Select value={workLocation} onValueChange={(value: 'office' | 'wfh') => setWorkLocation(value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-600" />
                            <span>Office</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="wfh">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-blue-600" />
                            <span>Work from Home</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {!isCheckedIn ? (
                      <Button onClick={handleCheckIn} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Check In
                      </Button>
                    ) : (
                      <Button onClick={handleCheckOut} variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <XCircle className="h-4 w-4 mr-2" />
                        Check Out
                      </Button>
                    )}
                    
                    <Dialog open={isBackdateDialogOpen} onOpenChange={setIsBackdateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Update
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
                </CardContent>
              </Card>

              {/* Summary Stats Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Days Present</span>
                      <span className="font-medium">22</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Late Days</span>
                      <span className="font-medium text-amber-600">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">WFH Days</span>
                      <span className="font-medium text-blue-600">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Leave Days</span>
                      <span className="font-medium text-green-600">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Details with Filters and Pagination */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Attendance Details</span>
                  <Badge variant="secondary">{
                    attendanceRecords.filter(record => {
                      const statusMatch = filterStatus === 'all' || record.status === filterStatus;
                      const locationMatch = filterLocation === 'all' || record.location === filterLocation;
                      return statusMatch && locationMatch;
                    }).length
                  } records</Badge>
                </CardTitle>
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="wfh">Work from Home</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterLocation('all');
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(() => {
                    const filteredRecords = attendanceRecords.filter(record => {
                      const statusMatch = filterStatus === 'all' || record.status === filterStatus;
                      const locationMatch = filterLocation === 'all' || record.location === filterLocation;
                      return statusMatch && locationMatch;
                    });
                    
                    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
                    const startIndex = (currentPage - 1) * recordsPerPage;
                    const endIndex = startIndex + recordsPerPage;
                    const currentRecords = filteredRecords.slice(startIndex, endIndex);
                    
                    return (
                      <>
                        {currentRecords.map((record) => (
                          <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="text-center min-w-[60px]">
                                <div className="font-bold">{format(new Date(record.date), 'dd')}</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(record.date), 'MMM')}</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(record.date), 'EEE')}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {record.status === 'leave' ? (
                                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                                ) : record.status === 'absent' ? (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                ) : record.location === 'wfh' ? (
                                  <Home className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Building className="h-4 w-4 text-gray-600" />
                                )}
                                <div>
                                  <div className="font-medium text-sm">
                                    {record.status === 'leave' ? record.leaveType : 
                                     record.status === 'absent' ? 'Absent' :
                                     record.location === 'wfh' ? 'Work from Home' : 'Office'}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {record.status === 'present' || record.status === 'late' ? (
                                      `${record.hours}h worked`
                                    ) : record.status === 'absent' ? (
                                      record.reason
                                    ) : record.status === 'leave' ? (
                                      'On Leave'
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {(record.status === 'present' || record.status === 'late') && (
                                <div className="text-right text-xs">
                                  <div className="font-medium">{record.checkIn} - {record.checkOut}</div>
                                  {record.overtime > 0 && (
                                    <div className="text-amber-600">+{record.overtime}h OT</div>
                                  )}
                                </div>
                              )}
                              {getStatusBadge(record.status)}
                            </div>
                          </div>
                        ))}
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              Showing {startIndex + 1}-{Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length} records
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                              </Button>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                  <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className="w-8 h-8"
                                  >
                                    {page}
                                  </Button>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{format(selectedDate, 'MMMM yyyy')}</h3>
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
                      const attendance = getAttendanceForDate(day);
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
                            {attendance && (
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div 
                                    className={`text-xs p-1 rounded border-l-4 truncate cursor-pointer ${
                                      attendance.status === 'present' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' :
                                      attendance.status === 'late' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400' :
                                      attendance.status === 'absent' ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400' :
                                      attendance.status === 'leave' ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400' :
                                      'border-gray-500 bg-gray-50 text-gray-700'
                                    }`}
                                  >
                                    {attendance.status === 'present' ? 'Present' :
                                     attendance.status === 'late' ? 'Late' :
                                     attendance.status === 'absent' ? 'Absent' :
                                     attendance.status === 'leave' ? attendance.leaveType || 'On Leave' :
                                     attendance.status}
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-semibold text-lg">
                                        {format(day, 'EEEE, MMM dd')}
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
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
  );
};

export default Attendance;