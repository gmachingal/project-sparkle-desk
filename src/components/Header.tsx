import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Plus, Settings, User, Clock, Users, Briefcase, FileText, Calendar, Home, LogOut, Building2, ChevronDown, Check, Cog, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import reposeLogo from "@/assets/repose-logo-bigger-font.png";

interface HeaderProps {
  userRole?: 'admin' | 'user';
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  actionButton?: {
    label: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'outline';
  };
}

const Header = ({ userRole, title, subtitle, backButton, actionButton }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Enhanced user's organizations with admin-style data structure
  const [currentOrganization, setCurrentOrganization] = useState("ORG-001");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Mock notifications data
  const mockNotifications = [
    {
      id: "1",
      title: "Sprint Review Meeting",
      message: "Sprint review scheduled for tomorrow at 2:00 PM",
      time: "2 min ago",
      type: "meeting",
      unread: true
    },
    {
      id: "2", 
      title: "Task Assignment",
      message: "You have been assigned to 'Implement user authentication'",
      time: "15 min ago",
      type: "task",
      unread: true
    },
    {
      id: "3",
      title: "Leave Request Approved",
      message: "Your leave request for Dec 25-26 has been approved",
      time: "1 hour ago", 
      type: "approval",
      unread: false
    },
    {
      id: "4",
      title: "Project Update",
      message: "TechCorp Mobile App project status updated to 'In Progress'",
      time: "3 hours ago",
      type: "update",
      unread: false
    },
    {
      id: "5",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight from 11 PM to 1 AM",
      time: "1 day ago",
      type: "system",
      unread: false
    }
  ];
  
  const unreadCount = mockNotifications.filter(n => n.unread).length;
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
    const currentPath = location.pathname;
    if (path === "/dashboard" && currentPath === "/") return true;
    if (currentPath === path) return true;
    
    // Check for admin versions of pages
    if (path === "/attendance" && (currentPath.includes("attendance") || currentPath.includes("admin-attendance"))) return true;
    if (path === "/leave-management" && (currentPath.includes("leave") || currentPath.includes("admin-leave"))) return true;
    if (path === "/collaboration" && (currentPath.includes("collaboration") || currentPath.includes("admin-collaboration"))) return true;
    
    return false;
  };

  const getNavigationUrl = (basePath: string) => {
    // If currently in admin mode, route to admin versions when they exist
    if (isAdminPage) {
      // Set admin preference in localStorage to maintain state
      localStorage.setItem('preferredRole', 'admin');
      
      switch (basePath) {
        case "/dashboard":
          // Dashboard stays the same but should maintain admin context via userRole
          return "/dashboard";
        case "/attendance":
          return "/admin-attendance";
        case "/leave-management":
          return "/admin-leave-management";
        case "/collaboration":
          return "/admin-collaboration";
        default:
          return basePath;
      }
    } else {
      // Clear admin preference when not in admin mode
      localStorage.removeItem('preferredRole');
    }
    return basePath;
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "meeting": return Calendar;
      case "task": return FileText;
      case "approval": return Check;
      case "update": return Briefcase;
      case "system": return Settings;
      default: return Bell;
    }
  };

  // Check if current route is an admin page
  const isAdminPage = location.pathname.includes('/admin') || 
                     location.pathname.includes('admin-') || 
                     location.pathname === '/organization' ||
                     ((location.pathname === '/' || location.pathname === '/dashboard') && userRole === 'admin');

  return (
    <header className={`backdrop-blur-sm sticky top-0 z-50 border-border/50 shadow-2xl shadow-black/30 drop-shadow-lg ${
      title 
        ? 'bg-gradient-to-l from-primary/40 via-primary-glow/60 to-primary/80'
        : isAdminPage 
          ? 'bg-gradient-to-r from-admin/35 via-admin-glow/45 to-admin/60' 
          : 'bg-gradient-to-r from-primary/35 via-primary-glow/45 to-primary/60'
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Logo or Back Button + Page Title */}
          {title ? (
            <div className="flex items-center gap-4">
              {backButton && (
                <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
              </div>
            </div>
          ) : (
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
              <img 
                src={reposeLogo} 
                alt="Repose" 
                className="w-10 h-10 object-contain shadow-lg border border-white/20 rounded-lg"
              />
            </div>
          )}
          
          {/* Primary Navigation - Hide when showing page title */}
          {!title && (
          <nav className="hidden lg:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(getNavigationUrl("/dashboard"))}
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
              onClick={() => navigate(getNavigationUrl("/collaboration"))} 
              className={`gap-2 ${isActivePage("/collaboration") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden xl:inline">Collaboration</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(getNavigationUrl("/attendance"))}
              className={`gap-2 ${isActivePage("/attendance") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden xl:inline">Attendance</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(getNavigationUrl("/leave-management"))} 
              className={`gap-2 ${isActivePage("/leave-management") ? (isAdminPage ? "bg-admin text-admin-foreground" : "bg-primary text-primary-foreground") : "hover:bg-background/90 hover:text-foreground hover:shadow-sm"}`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden xl:inline">Leave</span>
            </Button>
          </nav>
          )}

          {/* Mobile Navigation Menu - Hide when showing page title */}
          {!title && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Users className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => navigate(getNavigationUrl("/dashboard"))} className="gap-2">
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
              <DropdownMenuItem onClick={() => navigate(getNavigationUrl("/collaboration"))} className="gap-2">
                <Users className="w-4 h-4" />
                Collaboration
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(getNavigationUrl("/attendance"))} className="gap-2">
                <Clock className="w-4 h-4" />
                Attendance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(getNavigationUrl("/leave-management"))} className="gap-2">
                <Calendar className="w-4 h-4" />
                Leave Management
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Action Button */}
          {actionButton && (
            <Button 
              variant={actionButton.variant || "default"} 
              onClick={actionButton.onClick} 
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <actionButton.icon className="w-4 h-4" />
              {actionButton.label}
            </Button>
          )}
          {/* Organization Switcher, Search, Notifications & Profile - Hide when showing page title */}
          {!title && (
          <>
          {/* Compact Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`hidden lg:flex gap-2 px-2 h-9 border-muted-foreground/20 hover:border-muted-foreground/40 ${
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
            <div className={`relative transition-all duration-300 ease-out ${
              isSearchExpanded ? 'w-64' : 'w-10'
            }`}>
              {!isSearchExpanded ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSearchClick}
                      className="w-full h-9 p-0 border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-background/90 hover:shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <Search className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors duration-200" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search..."
                    className="pl-10 w-full bg-muted/50 border-muted-foreground/20 hover:border-muted-foreground/40"
                    onBlur={handleSearchBlur}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons Group */}
          <div className="flex items-center gap-2">
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-background/90 hover:shadow-sm">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-96 bg-background/95 backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {unreadCount} new
                      </Badge>
                    )}
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)] mt-6">
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => {
                      const IconComponent = getNotificationIcon(notification.type);
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${
                            notification.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted/20 border-border'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.unread ? 'bg-primary/10' : 'bg-muted'
                            }`}>
                              <IconComponent className={`w-4 h-4 ${
                                notification.unread ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className={`font-medium text-sm truncate ${
                                  notification.unread ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {notification.title}
                                </h4>
                                {notification.unread && (
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 p-4 text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            
            {/* Settings & Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-10 h-9 p-0 border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-background/90 hover:shadow-sm transition-all duration-200 hover:scale-105 active:scale-95">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      <User className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
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
          </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;