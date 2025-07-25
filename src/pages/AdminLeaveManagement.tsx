import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import Header from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Leave Management</h1>
          <p className="text-muted-foreground mt-2">Manage employee leave requests and approvals</p>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
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