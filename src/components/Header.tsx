import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Plus, Settings, User, Clock, Users, Briefcase, FileText, Calendar, Home, LogOut, Building2, ChevronDown, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import reposeLogo from "@/assets/repose-logo-bigger-font.png";

interface HeaderProps {
  userRole?: 'admin' | 'user';
}

const Header = ({ userRole }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // User's organizations - in real app, this would come from user context/API
  const [currentOrganization, setCurrentOrganization] = useState("ORG-001");
  const userOrganizations = [
    { 
      id: "ORG-001", 
      name: "TechCorp Solutions", 
      role: "Admin", 
      domain: "techcorp.com",
      isActive: true 
    },
    { 
      id: "ORG-002", 
      name: "StartupXYZ", 
      role: "Member", 
      domain: "startupxyz.com",
      isActive: true 
    },
    { 
      id: "ORG-003", 
      name: "Innovation Labs", 
      role: "Manager", 
      domain: "innovationlabs.org",
      isActive: true 
    }
  ];
  
  const isActivePage = (path: string) => {
    return location.pathname === path || (path === "/dashboard" && location.pathname === "/");
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate("/");
  };

  const switchOrganization = (orgId: string) => {
    const org = userOrganizations.find(o => o.id === orgId);
    setCurrentOrganization(orgId);
    toast({
      title: "Organization Switched",
      description: `Now working in ${org?.name}`,
    });
    // TODO: In real app, update user context and refresh data
  };

  const getCurrentOrg = () => userOrganizations.find(org => org.id === currentOrganization);

  // Check if current route is an admin page
  const isAdminPage = location.pathname.includes('/admin') || 
                     location.pathname.includes('admin-') || 
                     location.pathname === '/organization' ||
                     ((location.pathname === '/' || location.pathname === '/dashboard') && userRole === 'admin');

  return (
    <header className={`border-b backdrop-blur-sm sticky top-0 z-50 border-border/50 shadow-2xl shadow-black/30 drop-shadow-lg ${
      isAdminPage 
        ? 'bg-gradient-to-r from-orange-500/50 via-orange-400/40 to-orange-500/50' 
        : 'bg-gradient-to-r from-primary/50 via-primary-glow/40 to-primary/50'
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img 
              src={reposeLogo} 
              alt="Repose" 
              className="w-10 h-10 object-contain shadow-lg border border-white/20 rounded-lg"
            />
          </div>
          
          {/* Primary Navigation - Show more items on larger screens */}
          <nav className="hidden lg:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")} 
              className={`gap-2 ${isActivePage("/dashboard") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden xl:inline">Home</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/my-tasks")} 
              className={`gap-2 ${isActivePage("/my-tasks") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden xl:inline">Tasks</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/projects")} 
              className={`gap-2 ${isActivePage("/projects") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden xl:inline">Projects</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/teams")} 
              className={`gap-2 ${isActivePage("/teams") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden xl:inline">Teams</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/attendance")} 
              className={`gap-2 ${isActivePage("/attendance") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden xl:inline">Attendance</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/leave-management")} 
              className={`gap-2 ${isActivePage("/leave-management") ? "bg-primary text-primary-foreground" : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden xl:inline">Leave</span>
            </Button>
          </nav>

          {/* Mobile Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Users className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="gap-2">
                <Home className="w-4 h-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-tasks")} className="gap-2">
                <FileText className="w-4 h-4" />
                My Tasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/projects")} className="gap-2">
                <Briefcase className="w-4 h-4" />
                Projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/teams")} className="gap-2">
                <Users className="w-4 h-4" />
                Teams
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/attendance")} className="gap-2">
                <Clock className="w-4 h-4" />
                Attendance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/leave-management")} className="gap-2">
                <Calendar className="w-4 h-4" />
                Leave Management
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          {/* Compact Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 px-3">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium max-w-32 truncate">{getCurrentOrg()?.name}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Switch Organization
                </div>
                {userOrganizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => switchOrganization(org.id)}
                    className="flex items-center justify-between p-3 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{org.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{org.domain}</span>
                          <Badge variant="outline" className="text-xs h-4">
                            {org.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {currentOrganization === org.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate("/organization")}
                className="gap-2 mx-2 mb-2"
              >
                <Settings className="w-4 h-4" />
                Organization Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Compact Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-muted/50"
            />
          </div>
          
          {/* Action Buttons Group */}
          <div className="flex items-center gap-1">
            <Button variant="hero" size="sm" className="gap-2" onClick={() => navigate("/create-task")}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            
            {/* Settings & Profile Menu */}
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
      </div>
    </header>
  );
};
export default Header;