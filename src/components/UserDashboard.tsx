import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatsCard from "./StatsCard";
import AttendanceCard from "./AttendanceCard";
import LeaveCard from "./LeaveCard";
import TaskCard from "./TaskCard";
import { 
  CheckSquare, 
  Clock, 
  Target, 
  TrendingUp,
  Plus,
  Timer,
  Calendar,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock user data
  const userStats = [
    {
      title: "My Tasks",
      value: "12",
      description: "3 due today",
      icon: CheckSquare,
      trend: { value: 8, positive: true }
    },
    {
      title: "Completed Today",
      value: "4",
      description: "Great progress!",
      icon: Target,
      trend: { value: 2, positive: true }
    },
    {
      title: "Hours Logged",
      value: "7.5",
      description: "Today",
      icon: Clock
    },
    {
      title: "Performance",
      value: "94%",
      description: "This month",
      icon: TrendingUp,
      trend: { value: 5, positive: true }
    }
  ];

  const recentTasks = [
    {
      id: "1",
      title: "Review code changes",
      description: "Review pull request for authentication module",
      status: "in-progress" as const,
      priority: "high" as const,
      dueDate: "Today",
      assignee: { name: "You", avatar: "" },
      project: "Website Redesign"
    },
    {
      id: "2",
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      status: "todo" as const,
      priority: "medium" as const,
      dueDate: "Tomorrow",
      assignee: { name: "You", avatar: "" },
      project: "Mobile App"
    },
    {
      id: "3",
      title: "Client meeting prep",
      description: "Prepare presentation for client review",
      status: "todo" as const,
      priority: "high" as const,
      dueDate: "Dec 1",
      assignee: { name: "You", avatar: "" },
      project: "Marketing Campaign"
    }
  ];

  const attendanceData = {
    todayStatus: 'checked-in' as const,
    checkInTime: '9:15 AM',
    totalHours: '8h 30m',
    weeklyHours: '38h 45m',
    monthlyHours: '167h 30m'
  };

  const leaveData = {
    availableLeave: 18,
    usedLeave: 7,
    totalLeave: 25,
    pendingRequests: 1,
    upcomingLeave: {
      startDate: 'Dec 23',
      endDate: 'Dec 27',
      type: 'Annual Leave'
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Good morning, Alex!
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to make today productive? Here's your snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/time-logging")}>
            <Timer className="w-4 h-4" />
            Log Time
          </Button>
          <Button variant="hero" className="gap-2" onClick={() => navigate("/create-task")}>
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Attendance & Leave */}
        <div className="space-y-6">
          <AttendanceCard {...attendanceData} />
          <LeaveCard {...leaveData} />
        </div>

        {/* Middle Column - Task Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Today's Focus</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/my-tasks')}>
                View All Tasks
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/attendance')}
                >
                  <Clock className="w-6 h-6" />
                  <span className="text-xs">Attendance</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/leave-management')}
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-xs">Leave</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/time-logging')}
                >
                  <Timer className="w-6 h-6" />
                  <span className="text-xs">Time Log</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/projects')}
                >
                  <FileText className="w-6 h-6" />
                  <span className="text-xs">Projects</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;