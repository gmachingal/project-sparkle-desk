import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Plus, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Asana
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm">Home</Button>
            <Button variant="ghost" size="sm">My Tasks</Button>
            <Button variant="ghost" size="sm">Projects</Button>
            <Button variant="ghost" size="sm">Teams</Button>
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
          
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;