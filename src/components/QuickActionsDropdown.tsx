import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Calendar,
  Timer,
  FileText,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActionsDropdown = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Quick Actions
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate('/attendance')}>
          <Clock className="w-4 h-4 mr-2" />
          Attendance
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/leave-management')}>
          <Calendar className="w-4 h-4 mr-2" />
          Leave Management
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/time-logging')}>
          <Timer className="w-4 h-4 mr-2" />
          Time Logging
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/projects')}>
          <FileText className="w-4 h-4 mr-2" />
          Projects
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActionsDropdown;