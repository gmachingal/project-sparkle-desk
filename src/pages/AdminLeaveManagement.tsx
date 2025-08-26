import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, CheckCircle, XCircle, Clock, FileText, Plus, Edit, CalendarIcon, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const AdminLeaveManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [actionReason, setActionReason] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isBulkAllocateDialogOpen, setIsBulkAllocateDialogOpen] = useState(false);
  const [bulkAllocateType, setBulkAllocateType] = useState("");
  const [bulkAllocateDays, setBulkAllocateDays] = useState("");

  // Generate years from 2020 to current year + 2
  const availableYears = Array.from({ length: new Date().getFullYear() - 2019 + 3 }, (_, i) => 2020 + i);

  // Mock data
  const leaveStats = {
    totalRequests: 45,
    pendingApproval: 8,
    approved: 32,
    rejected: 5,
  };

  const pendingRequests = [
    {
      id: 1,
      employee: { name: "John Doe", avatar: "", department: "Engineering" },
      type: "PL",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
      days: 6,
      reason: "Family vacation - Going to visit family in hometown for annual gathering",
      appliedOn: "2024-03-05",
      status: "Pending",
    },
    {
      id: 2,
      employee: { name: "Sarah Wilson", avatar: "", department: "Marketing" },
      type: "SL",
      startDate: "2024-03-08",
      endDate: "2024-03-09",
      days: 2,
      reason: "Medical checkup and recovery",
      appliedOn: "2024-03-07",
      status: "Pending",
    },
    {
      id: 3,
      employee: { name: "Mike Johnson", avatar: "", department: "Sales" },
      type: "CL",
      startDate: "2024-03-12",
      endDate: "2024-03-12",
      days: 1,
      reason: "Personal work - Banking and documentation",
      appliedOn: "2024-03-10",
      status: "Pending",
    },
  ];

  const allRequests = [
    ...pendingRequests,
    {
      id: 4,
      employee: { name: "Emily Davis", avatar: "", department: "HR" },
      type: "CL",
      startDate: "2024-02-20",
      endDate: "2024-02-21",
      days: 2,
      reason: "Personal work",
      appliedOn: "2024-02-18",
      status: "Approved",
    },
    {
      id: 5,
      employee: { name: "David Brown", avatar: "", department: "Engineering" },
      type: "SL",
      startDate: "2024-02-15",
      endDate: "2024-02-15",
      days: 1,
      reason: "Fever and cold",
      appliedOn: "2024-02-15",
      status: "Approved",
    },
  ];

  const handleAction = (request: any, action: "approve" | "reject") => {
    console.log(`${action} request for ${request.employee.name}`);
    toast({
      title: `Leave Request ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `${request.employee.name}'s leave request has been ${action === "approve" ? "approved" : "rejected"}.`,
    });
    setIsDetailDialogOpen(false);
    setActionReason("");
  };

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

  const handleBulkAllocate = () => {
    if (!bulkAllocateType || !bulkAllocateDays) {
      toast({
        title: "Error",
        description: "Please select leave type and enter number of days.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Leave Allocated Successfully",
      description: `${bulkAllocateDays} days of ${bulkAllocateType} leave allocated to all employees for ${selectedYear}.`,
    });
    
    setIsBulkAllocateDialogOpen(false);
    setBulkAllocateType("");
    setBulkAllocateDays("");
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "CL":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "SL":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "PL":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const openRequestDetail = (request: any) => {
    setSelectedRequest(request);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-admin to-admin-glow bg-clip-text text-transparent">Admin Leave Management</h1>
            <p className="text-muted-foreground mt-2">Manage employee leave requests and approvals</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-admin/10 text-admin border-admin/30 hover:bg-admin/20 hover:text-admin"
              onClick={() => window.location.href = '/leave-management'}
            >
              <Users className="w-4 h-4 mr-2" />
              Employee View
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-admin/10 rounded-lg">
                  <FileText className="h-6 w-6 text-admin" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{leaveStats.totalRequests}</p>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{leaveStats.pendingApproval}</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{leaveStats.approved}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{leaveStats.rejected}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-admin/10 to-admin-glow/10 border border-admin/20">
            <TabsTrigger value="pending" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium hover:bg-admin/10 text-admin/70 hover:text-admin">Pending Requests</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium hover:bg-admin/10 text-admin/70 hover:text-admin">All Requests</TabsTrigger>
            <TabsTrigger value="balance" className="data-[state=active]:bg-admin data-[state=active]:text-admin-foreground data-[state=active]:border-admin font-medium hover:bg-admin/10 text-admin/70 hover:text-admin">Leave Balance Management</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Enhanced Filters and Actions Bar */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="PL">Paid Leave</SelectItem>
                          <SelectItem value="SL">Sick Leave</SelectItem>
                          <SelectItem value="CL">Casual Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <Select defaultValue="today">
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">This Week</SelectItem>
                          <SelectItem value="week">This Month</SelectItem>
                          <SelectItem value="month">All Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {pendingRequests.length} Pending
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
                      <FileText className="w-4 h-4" />
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
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{pendingRequests.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Paid Leave</p>
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{pendingRequests.filter(r => r.type === 'PL').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                      <Plus className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sick Leave</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{pendingRequests.filter(r => r.type === 'SL').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Casual Leave</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{pendingRequests.filter(r => r.type === 'CL').length}</p>
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
                      request.type === 'SL' ? 'bg-red-500' : 
                      request.type === 'PL' ? 'bg-purple-500' : 
                      'bg-blue-500'
                    }`}></div>
                    
                    <div className="p-3 flex flex-col h-full">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Avatar className="w-8 h-8 border-2 border-background shadow-sm flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold text-xs">
                              {request.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">{request.employee.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{request.employee.department}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${getLeaveTypeColor(request.type)} text-xs px-1.5 py-0.5 h-5 flex-shrink-0`}
                        >
                          {request.type}
                        </Badge>
                      </div>
                      
                      {/* Leave Details */}
                      <div className="mb-2 p-2 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Duration
                          </div>
                          <div className="text-xs font-semibold truncate">
                            {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                            {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-xs font-semibold text-primary mt-1">{request.days} day{request.days > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                      
                      {/* Reason Section - Flexible */}
                      <div className="mb-3 p-2 bg-muted/20 rounded-lg border-l-2 border-primary flex-1 min-h-0">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Reason
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-3 overflow-hidden">{request.reason}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1.5 mt-auto">
                        <Button 
                          className="flex-1 h-7 text-xs"
                          size="sm"
                          onClick={() => handleAction(request, 'approve')}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 h-7 text-xs"
                          size="sm"
                          onClick={() => handleAction(request, 'reject')}
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
                  <p className="text-muted-foreground">No pending leave requests at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  All Leave Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRequests.map((request) => (
                      <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.employee.avatar} />
                              <AvatarFallback>
                                {request.employee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.employee.name}</p>
                              <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLeaveTypeColor(request.type)}>
                            {request.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {request.startDate} to {request.endDate}
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>{request.appliedOn}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Leave Balance Overview
                    </CardTitle>
                    
                    {/* Year Selector */}
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">Year:</Label>
                      <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                        <SelectTrigger className="w-[100px]">
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
                    </div>
                  </div>

                  {/* Bulk Allocate Button */}
                  <Dialog open={isBulkAllocateDialogOpen} onOpenChange={setIsBulkAllocateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-gradient-to-r from-admin to-admin-glow hover:from-admin hover:to-admin-accent">
                        <UserPlus className="h-4 w-4" />
                        Bulk Allocate Leave
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulk Allocate Leave for {selectedYear}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                          <p className="text-sm text-muted-foreground">
                            This will allocate the specified leave days to all employees for the year {selectedYear}.
                          </p>
                        </div>
                        
                        <div>
                          <Label>Leave Type</Label>
                          <Select value={bulkAllocateType} onValueChange={setBulkAllocateType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CL">Casual Leave (CL)</SelectItem>
                              <SelectItem value="SL">Sick Leave (SL)</SelectItem>
                              <SelectItem value="PL">Paid Leave (PL)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Days to Allocate</Label>
                          <Input 
                            type="number" 
                            placeholder="Enter number of days" 
                            value={bulkAllocateDays}
                            onChange={(e) => setBulkAllocateDays(e.target.value)}
                            min="1"
                            max="30"
                          />
                        </div>
                        
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setIsBulkAllocateDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleBulkAllocate} className="bg-gradient-to-r from-admin to-admin-glow">
                            Allocate to All Employees
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Team Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <div className="text-sm text-muted-foreground">Team Available</div>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">12</div>
                        <div className="text-sm text-muted-foreground">On Leave Today</div>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/50">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-muted-foreground">Upcoming Leaves</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Employee Leave Balance Table */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Employee Leave Balance - {selectedYear}</CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
                              <Plus className="h-4 w-4" />
                              Add Individual Balance
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Leave Balance for {selectedYear}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Employee</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select employee" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="john">John Doe</SelectItem>
                                    <SelectItem value="sarah">Sarah Wilson</SelectItem>
                                    <SelectItem value="mike">Mike Johnson</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Leave Type</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select leave type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="CL">Casual Leave</SelectItem>
                                    <SelectItem value="SL">Sick Leave</SelectItem>
                                    <SelectItem value="PL">Paid Leave</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Days to Add</Label>
                                <Input type="number" placeholder="Enter number of days" />
                              </div>
                              <div>
                                <Label>Reason</Label>
                                <Textarea placeholder="Reason for adding leave balance" />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline">Cancel</Button>
                                <Button>Add Balance</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>CL ({selectedYear})</TableHead>
                            <TableHead>SL ({selectedYear})</TableHead>
                            <TableHead>PL ({selectedYear})</TableHead>
                            <TableHead>Total Used</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { name: "John Doe", cl: "7/12", sl: "10/12", pl: "13/21", used: 25 },
                            { name: "Sarah Wilson", cl: "5/12", sl: "2/12", pl: "8/21", used: 15 },
                            { name: "Mike Johnson", cl: "3/12", sl: "6/12", pl: "15/21", used: 24 },
                            { name: "Emily Davis", cl: "8/12", sl: "4/12", pl: "10/21", used: 22 },
                          ].map((emp, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {emp.name.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{emp.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{emp.cl}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{emp.sl}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{emp.pl}</Badge>
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">{emp.used} days</span>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="hover:bg-admin/10 border-admin/30 text-admin hover:text-admin">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Request Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedRequest.employee.avatar} />
                    <AvatarFallback>
                      {selectedRequest.employee.name.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedRequest.employee.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.employee.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Leave Type:</span>
                    <Badge className={`ml-2 ${getLeaveTypeColor(selectedRequest.type)}`}>
                      {selectedRequest.type}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="ml-2 font-medium">{selectedRequest.days} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="ml-2 font-medium">{selectedRequest.startDate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="ml-2 font-medium">{selectedRequest.endDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm">Reason:</span>
                  <p className="mt-1 p-3 bg-muted rounded-md text-sm">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.status === "Pending" && (
                  <>
                    <div>
                      <label className="text-sm text-muted-foreground">Admin Comments (Optional):</label>
                      <Textarea
                        placeholder="Add any comments..."
                        value={actionReason}
                        onChange={(e) => setActionReason(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleAction(selectedRequest, "reject")}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleAction(selectedRequest, "approve")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;