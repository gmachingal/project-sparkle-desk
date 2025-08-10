import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Plus, Settings, User, Clock, Users, Briefcase, FileText, Calendar, Home, LogOut, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import reposeLogo from "@/assets/repose-logo-bigger-font.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActivePage = (path: string) => {
    return location.pathname === path || (path === "/dashboard" && location.pathname === "/");
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate("/");
  };

  return (
    <header className="border-b bg-gradient-to-r from-primary/10 via-primary/7 to-primary/10 backdrop-blur-sm sticky top-0 z-50 border-border/50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img 
              src={reposeLogo} 
              alt="Repose" 
              className="w-12 h-12 object-contain shadow-lg border border-white/20 rounded-lg"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")} 
              className={`gap-2 ${isActivePage("/dashboard") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/my-tasks")} 
              className={`gap-2 ${isActivePage("/my-tasks") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <FileText className="w-4 h-4" />
              My Tasks
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/projects")} 
              className={`gap-2 ${isActivePage("/projects") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Briefcase className="w-4 h-4" />
              Projects
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/teams")} 
              className={`gap-2 ${isActivePage("/teams") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Users className="w-4 h-4" />
              Teams
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/attendance")} 
              className={`gap-2 ${isActivePage("/attendance") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Clock className="w-4 h-4" />
              Attendance
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/leave-management")} 
              className={`gap-2 ${isActivePage("/leave-management") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Calendar className="w-4 h-4" />
              Leave
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/organization")} 
              className={`gap-2 ${isActivePage("/organization") ? "bg-primary text-primary-foreground" : "hover:bg-primary/20 hover:text-primary"}`}
            >
              <Building2 className="w-4 h-4" />
              Organization
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks, projects, and more..."
              className="pl-10 w-80 bg-muted/50"
            />
          </div>
          
          <Button variant="hero" size="sm" className="gap-2" onClick={() => navigate("/create-task")}>
            <Plus className="w-4 h-4" />
            Create
          </Button>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
            <Settings className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/settings")} className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/admin/organizations")} className="gap-2">
                <Building2 className="w-4 h-4" />
                Admin Organizations
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="gap-2 text-red-600">
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
export default Header;