import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plane, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LeaveCardProps {
  availableLeave: number;
  usedLeave: number;
  totalLeave: number;
  pendingRequests: number;
  upcomingLeave?: {
    startDate: string;
    endDate: string;
    type: string;
  };
}

const LeaveCard = ({ 
  availableLeave, 
  usedLeave, 
  totalLeave, 
  pendingRequests, 
  upcomingLeave 
}: LeaveCardProps) => {
  const navigate = useNavigate();
  const leavePercentage = (usedLeave / totalLeave) * 100;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
        <Plane className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{availableLeave}</span>
            <Badge variant="secondary">{totalLeave} total</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Used: {usedLeave} days</span>
              <span className="text-muted-foreground">{leavePercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${leavePercentage}%` }}
              />
            </div>
          </div>

          {pendingRequests > 0 && (
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-md">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-700">
                {pendingRequests} pending request{pendingRequests > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {upcomingLeave && (
            <div className="border-t pt-3">
              <div className="text-sm font-medium mb-1">Upcoming Leave</div>
              <div className="text-sm text-muted-foreground">
                {upcomingLeave.type}: {upcomingLeave.startDate} - {upcomingLeave.endDate}
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/leave-management')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/leave-management')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveCard;