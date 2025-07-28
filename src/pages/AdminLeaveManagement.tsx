import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, CheckCircle, XCircle, Clock, FileText, Plus, Edit } from "lucide-react";
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

const AdminLeaveManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [actionReason, setActionReason] = useState("");

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
            <h1 className="text-3xl font-bold text-foreground">Admin Leave Management</h1>
            <p className="text-muted-foreground mt-2">Manage employee leave requests and approvals</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
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
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="balance">Leave Balance Management</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  Pending Leave Requests
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
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openRequestDetail(request)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Leave Balance Overview
                </CardTitle>
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
                        <CardTitle>Employee Leave Balance</CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="gap-2">
                              <Plus className="h-4 w-4" />
                              Add Leave Balance
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Leave Balance</DialogTitle>
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
                            <TableHead>CL</TableHead>
                            <TableHead>SL</TableHead>
                            <TableHead>PL</TableHead>
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
                                <Button variant="outline" size="sm">
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