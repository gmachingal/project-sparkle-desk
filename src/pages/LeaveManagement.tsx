import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Plus, FileText,FileStack,CalendarHeart, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from "date-fns";
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { EnhancedCalendar } from '@/components/ui/enhanced-calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from "react-router-dom";

const leaveFormSchema = z.object({
  leaveType: z.string().min(1, "Leave type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

const LeaveManagement = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const form = useForm<z.infer<typeof leaveFormSchema>>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const onSubmit = (values: z.infer<typeof leaveFormSchema>) => {
    console.log(values);
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
    setIsDialogOpen(false);
    form.reset();
  };

  // Generate years (current year and ±3 years)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({length: 7}, (_, i) => currentYear - 3 + i);

  // Mock data - Calendar year based
  const leaveBalance = {
    CL: { used: 5, total: 12, remaining: 7 },
    SL: { used: 2, total: 12, remaining: 10 },
    PL: { used: 8, total: 21, remaining: 13 },
  };

  // Filter leave history by selected calendar year
  const allLeaveHistory = [
    {
      id: 1,
      type: "CL",
      startDate: `${selectedYear}-06-15`,
      endDate: `${selectedYear}-06-16`,
      days: 2,
      reason: "Personal work",
      status: "Approved",
      appliedOn: `${selectedYear}-06-10`,
    },
    {
      id: 2,
      type: "SL",
      startDate: `${selectedYear}-06-20`,
      endDate: `${selectedYear}-06-20`,
      days: 1,
      reason: "Fever",
      status: "Approved",
      appliedOn: `${selectedYear}-06-20`,
    },
    {
      id: 3,
      type: "PL",
      startDate: `${selectedYear}-07-10`,
      endDate: `${selectedYear}-07-15`,
      days: 6,
      reason: "Family vacation",
      status: "Pending",
      appliedOn: `${selectedYear}-07-05`,
    },    
  ];

  const leaveHistory = allLeaveHistory;

  // Extended leave data with calendar information - Calendar year based
  const calendarLeaveData = [
    {
      id: 1,
      type: "CL",
      startDate: `${selectedYear}-07-15`,
      endDate: `${selectedYear}-07-16`, 
      days: 2,
      reason: "Personal work",
      status: "Approved",
      appliedOn: `${selectedYear}-07-10`,
    },
    {
      id: 2,
      type: "SL", 
      startDate: `${selectedYear}-06-22`,
      endDate: `${selectedYear}-06-22`,
      days: 1,
      reason: "Fever",
      status: "Approved", 
      appliedOn: `${selectedYear}-06-20`,
    },
    {
      id: 3,
      type: "PL",
      startDate: `${selectedYear}-06-12`,
      endDate: `${selectedYear}-06-14`,
      days: 3,
      reason: "Family vacation",
      status: "Pending",
      appliedOn: `${selectedYear}-06-05`,
    },
    {
      id: 4,
      type: "CL", 
      startDate: `${selectedYear}-07-26`,
      endDate: `${selectedYear}-07-26`,
      days: 1,
      reason: "Medical appointment",
      status: "Rejected",
      appliedOn: `${selectedYear}-07-20`,
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getLeaveForDate = (date: Date) => {
    return calendarLeaveData.find(leave => {
      const startDate = parseISO(leave.startDate);
      const endDate = parseISO(leave.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Approved: { variant: 'default' as const, label: 'Approved', color: 'text-green-600' },
      Pending: { variant: 'secondary' as const, label: 'Pending', color: 'text-yellow-600' },
      Rejected: { variant: 'destructive' as const, label: 'Rejected', color: 'text-red-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
    return <Badge variant={config.variant} className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Management</h1>
            <p className="text-muted-foreground mt-2">Manage your leave applications and track balance for calendar year {selectedYear}</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Compact Admin/Employee Toggle */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Employee</span>
              </div>
              <Switch 
                checked={false}
                onCheckedChange={(checked) => {
                  if (checked) {
                    navigate('/admin-leave-management');
                  }
                }}
                className="data-[state=checked]:bg-admin scale-75"
              />
              <span className="text-sm text-muted-foreground">Admin</span>
            </div>
            <Button 
              variant="outline"
              className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
              onClick={() => navigate('/holiday-master')}
            >
              <CalendarHeart className="h-4 w-4 mr-2" />
              Holiday Master
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="leaveType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CL">Casual Leave (CL)</SelectItem>
                            <SelectItem value="SL">Sick Leave (SL)</SelectItem>
                            <SelectItem value="PL">Paid Leave (PL)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter reason for leave"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2 justify-end pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="balance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="balance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <FileText className="h-4 w-4 mr-2" />
              Leave Balance</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <FileStack className="h-4 w-4 mr-2" />
              Leave History</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(leaveBalance).map(([type, balance]) => (
                <Card key={type} className="border border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      {type === "CL" ? "Casual Leave" : type === "SL" ? "Sick Leave" : "Paid Leave"}
                      <Badge variant="outline" className="ml-auto">
                        {type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Used</span>
                        <span className="font-medium">{balance.used}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-medium">{balance.total}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-primary">Remaining</span>
                        <span className="text-primary">{balance.remaining}</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(balance.used / balance.total) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Leave History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveHistory.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <Badge variant="outline">{leave.type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {leave.startDate} to {leave.endDate}
                        </TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {leave.reason}
                        </TableCell>
                        <TableCell>{leave.appliedOn}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {/* Calendar View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Leave Calendar
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Rejected</span>
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
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(selectedDate, 'MMM yyyy')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <EnhancedCalendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            initialFocus
                            className="pointer-events-auto"
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
                      const leave = getLeaveForDate(day);
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
                            {leave && (
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div 
                                    className={`text-xs p-1 rounded border-l-4 truncate cursor-pointer ${
                                      leave.status === 'Approved' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' :
                                      leave.status === 'Pending' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400' :
                                      leave.status === 'Rejected' ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400' :
                                      'border-gray-500 bg-gray-50 text-gray-700'
                                    }`}
                                  >
                                    {leave.type} - {leave.status}
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 bg-background border shadow-lg z-50">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-semibold text-lg">
                                        {format(day, 'EEEE, MMM dd')}
                                      </h4>
                                      {getStatusBadge(leave.status)}
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Leave Type</span>
                                        <span className="text-sm">
                                          {leave.type === 'CL' ? 'Casual Leave' : 
                                           leave.type === 'SL' ? 'Sick Leave' : 
                                           leave.type === 'PL' ? 'Paid Leave' : leave.type}
                                        </span>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Duration</span>
                                        <span className="text-sm">
                                          {leave.startDate === leave.endDate ? 
                                            format(parseISO(leave.startDate), 'MMM dd') :
                                            `${format(parseISO(leave.startDate), 'MMM dd')} - ${format(parseISO(leave.endDate), 'MMM dd')}`
                                          }
                                        </span>
                                      </div>
                                      
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Days</span>
                                        <span className="text-sm font-semibold">{leave.days} day{leave.days > 1 ? 's' : ''}</span>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <span className="text-sm font-medium">Reason</span>
                                        <p className="text-sm text-muted-foreground">{leave.reason}</p>
                                      </div>
                                    </div>
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
              const selectedLeave = getLeaveForDate(selectedDate);
              if (!selectedLeave) return null;
              
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
                          {getStatusBadge(selectedLeave.status)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Leave Type</span>
                          <span className="text-sm">
                            {selectedLeave.type === 'CL' ? 'Casual Leave' : 
                             selectedLeave.type === 'SL' ? 'Sick Leave' : 
                             selectedLeave.type === 'PL' ? 'Paid Leave' : selectedLeave.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Days</span>
                          <span className="text-sm font-semibold">{selectedLeave.days} day{selectedLeave.days > 1 ? 's' : ''}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Reason</span>
                          <p className="text-sm text-muted-foreground">{selectedLeave.reason}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                            {selectedLeave.startDate === selectedLeave.endDate ? 
                              format(parseISO(selectedLeave.startDate), 'MMM dd') :
                              `${format(parseISO(selectedLeave.startDate), 'MMM dd')} - ${format(parseISO(selectedLeave.endDate), 'MMM dd')}`
                            }
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">Leave Period</div>
                        </div>
                      </div>
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

export default LeaveManagement;