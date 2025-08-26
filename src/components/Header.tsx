import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Plus, Settings, User, Clock, Users, Briefcase, FileText, Calendar, Home, LogOut, Building2, ChevronDown, Check, Cog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  
  // Enhanced user's organizations with admin-style data structure
  const [currentOrganization, setCurrentOrganization] = useState("ORG-001");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userOrganizations = [
    { 
      id: "ORG-001", 
      name: "TechCorp Solutions", 
      role: "Admin", 
      domain: "techcorp.com",
      plan: "Enterprise",
      licenses: 50,
      usedLicenses: 37,
      status: "Active",
      monthlyFee: 2500,
      isActive: true 
    },
    { 
      id: "ORG-002", 
      name: "StartupXYZ", 
      role: "Member", 
      domain: "startupxyz.com",
      plan: "Professional", 
      licenses: 25,
      usedLicenses: 18,
      status: "Active",
      monthlyFee: 1250,
      isActive: true 
    },
    { 
      id: "ORG-003", 
      name: "Innovation Labs", 
      role: "Manager", 
      domain: "innovationlabs.org",
      plan: "Basic",
      licenses: 10,
      usedLicenses: 8,
      status: "Suspended",
      monthlyFee: 500,
      isActive: false 
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

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const handleSearchBlur = () => {
    if (!searchInputRef.current?.value) {
      setIsSearchExpanded(false);
    }
  };

  const getCurrentOrg = () => userOrganizations.find(org => org.id === currentOrganization);

  // Check if current route is an admin page
  const isAdminPage = location.pathname.includes('/admin') || 
                     location.pathname.includes('admin-') || 
                     location.pathname === '/organization' ||
                     ((location.pathname === '/' || location.pathname === '/dashboard') && userRole === 'admin');

  return (
    <header className={`backdrop-blur-sm sticky top-0 z-50 border-border/50 shadow-2xl shadow-black/30 drop-shadow-lg ${
      isAdminPage 
        ? 'bg-gradient-to-r from-admin/35 via-admin-glow/45 to-admin/60' 
        : 'bg-gradient-to-r from-primary/35 via-primary-glow/45 to-primary/60'
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
              className={`gap-2 ${isActivePage("/dashboard") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden xl:inline">Home</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/my-tasks")} 
              className={`gap-2 ${isActivePage("/my-tasks") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden xl:inline">Tasks</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/projects")} 
              className={`gap-2 ${isActivePage("/projects") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden xl:inline">Projects</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/teams")} 
              className={`gap-2 ${isActivePage("/teams") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden xl:inline">Teams</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/attendance")} 
              className={`gap-2 ${isActivePage("/attendance") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden xl:inline">Attendance</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/leave-management")} 
              className={`gap-2 ${isActivePage("/leave-management") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
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

        <div className="flex items-center gap-2">
          {/* Compact Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`hidden lg:flex gap-2 px-2 h-8 border-muted-foreground/20 hover:border-muted-foreground/40 ${
                  isAdminPage 
                    ? 'hover:bg-admin/10 text-admin/80 hover:text-admin border-admin/20 hover:border-admin/40' 
                    : 'hover:bg-primary/10'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium max-w-32 truncate">{getCurrentOrg()?.name}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-96 bg-background/95 backdrop-blur-sm border border-border/60">
              <div className="p-3">
                <div className="text-xs font-medium text-muted-foreground mb-3 px-1">
                  Switch Organization
                </div>
                {userOrganizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => switchOrganization(org.id)}
                    className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg ${isAdminPage ? 'bg-admin/10' : 'bg-primary/10'} flex items-center justify-center flex-shrink-0`}>
                        <Building2 className={`w-5 h-5 ${isAdminPage ? 'text-admin' : 'text-primary'}`} />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">{org.name}</span>
                          <Badge 
                            variant={org.status === "Active" ? "default" : "destructive"} 
                            className="text-xs h-4 flex-shrink-0"
                          >
                            {org.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="truncate">{org.domain}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs h-4">
                            {org.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="font-medium text-primary">{org.plan}</span>
                          <span>•</span>
                          <span>{org.usedLicenses}/{org.licenses} users</span>
                          <span>•</span>
                          <span className="font-medium">${org.monthlyFee}/mo</span>
                        </div>
                      </div>
                    </div>
                    {currentOrganization === org.id && (
                      <Check className={`w-4 h-4 flex-shrink-0 ${isAdminPage ? 'text-admin' : 'text-primary'}`} />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <DropdownMenuItem 
                  onClick={() => navigate("/admin/organizations")}
                  className="gap-2 mx-1 mb-1 rounded-lg p-3"
                >
                  <Settings className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Organization Management</span>
                    <span className="text-xs text-muted-foreground">Manage all organizations</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate("/organization")}
                  className="gap-2 mx-1 rounded-lg p-3"
                >
                  <Cog className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Organization Settings</span>
                    <span className="text-xs text-muted-foreground">Configure current organization</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Expandable Search */}
          <div className="relative hidden md:block">
            {!isSearchExpanded ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSearchClick}
                    className="w-10 h-9 p-0 hover:bg-background/90 hover:shadow-sm"
                  >
                    <Search className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search..."
                  className="pl-10 w-64 bg-muted/50 transition-all duration-200"
                  onBlur={handleSearchBlur}
                />
              </>
            )}
          </div>
          
          {/* Action Buttons Group */}
          <div className="flex items-center gap-2">
            <Button 
              variant="hero" 
              size="sm" 
              className={`gap-2 ${isAdminPage ? 'bg-gradient-to-r from-admin to-admin-glow' : ''}`} 
              onClick={() => navigate("/create-task")}
            >
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
                  Organizations
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