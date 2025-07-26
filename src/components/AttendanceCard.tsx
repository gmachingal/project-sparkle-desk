import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AttendanceCardProps {
  todayStatus: 'checked-in' | 'checked-out' | 'absent';
  checkInTime?: string;
  checkOutTime?: string;
  totalHours?: string;
  weeklyHours: string;
  monthlyHours: string;
}

const AttendanceCard = ({ 
  todayStatus, 
  checkInTime, 
  checkOutTime, 
  totalHours, 
  weeklyHours, 
  monthlyHours 
}: AttendanceCardProps) => {
  const navigate = useNavigate();

  const getStatusIcon = () => {
    switch (todayStatus) {
      case 'checked-in':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'checked-out':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (todayStatus) {
      case 'checked-in':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'checked-out':
        return <Badge variant="secondary">Completed</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {todayStatus === 'checked-in' ? 'Working' : 
               todayStatus === 'checked-out' ? totalHours : 'Absent'}
            </span>
            {getStatusBadge()}
          </div>
          
          {todayStatus !== 'absent' && (
            <div className="space-y-2 text-sm">
              {checkInTime && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check In:</span>
                  <span className="font-medium">{checkInTime}</span>
                </div>
              )}
              {checkOutTime && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check Out:</span>
                  <span className="font-medium">{checkOutTime}</span>
                </div>
              )}
            </div>
          )}

          {/* Add extra spacing to match Leave Balance card height */}
          <div className="py-2"></div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">This Week:</span>
              <span className="font-medium">{weeklyHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">This Month:</span>
              <span className="font-medium">{monthlyHours}</span>
            </div>
          </div>

          {/* Add extra spacing before button to match Leave Balance */}
          <div className="pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate('/attendance')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;