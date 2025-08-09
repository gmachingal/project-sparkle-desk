import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectCard from "@/components/ProjectCard";
import Header from "@/components/Header";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  FileText,
  Clock,
  CheckSquare,
  NotebookPen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const projects = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with new branding and modern design system",
      progress: 75,
      totalTasks: 24,
      completedTasks: 18,
      teamSize: 5,
      dueDate: "Dec 15",
      color: "#8B5CF6",
      status: "active",
      priority: "high",
      milestones: { total: 4, completed: 2 }
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native iOS and Android app development with React Native",
      progress: 45,
      totalTasks: 32,
      completedTasks: 14,
      teamSize: 8,
      dueDate: "Jan 30",
      color: "#06B6D4",
      status: "active",
      priority: "high",
      milestones: { total: 5, completed: 1 }
    },
    {
      id: "3",
      name: "Marketing Campaign Q1",
      description: "Digital marketing campaign launch for Q1 with social media integration",
      progress: 90,
      totalTasks: 16,
      completedTasks: 14,
      teamSize: 3,
      dueDate: "Nov 28",
      color: "#10B981",
      status: "active",
      priority: "medium",
      milestones: { total: 3, completed: 3 }
    },
    {
      id: "4",
      name: "Data Analytics Platform",
      description: "Build comprehensive analytics dashboard for business intelligence",
      progress: 25,
      totalTasks: 40,
      completedTasks: 10,
      teamSize: 6,
      dueDate: "Mar 15",
      color: "#F59E0B",
      status: "active",
      priority: "medium",
      milestones: { total: 6, completed: 0 }
    },
    {
      id: "5",
      name: "Legacy System Migration",
      description: "Migrate old systems to new cloud infrastructure",
      progress: 100,
      totalTasks: 28,
      completedTasks: 28,
      teamSize: 4,
      dueDate: "Oct 30",
      color: "#6B7280",
      status: "completed",
      priority: "low"
    },
    {
      id: "6",
      name: "Security Audit",
      description: "Comprehensive security review and penetration testing",
      progress: 15,
      totalTasks: 20,
      completedTasks: 3,
      teamSize: 2,
      dueDate: "Feb 28",
      color: "#EF4444",
      status: "planning",
      priority: "high"
    }
  ];

  const getFilteredProjects = () => {
    let filtered = projects;

    // Filter by tab
    if (activeTab === "active") {
      filtered = filtered.filter(project => project.status === "active");
    } else if (activeTab === "completed") {
      filtered = filtered.filter(project => project.status === "completed");
    } else if (activeTab === "planning") {
      filtered = filtered.filter(project => project.status === "planning");
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    return filtered;
  };

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === "active").length,
    completed: projects.filter(p => p.status === "completed").length,
    planning: projects.filter(p => p.status === "planning").length,
    totalTasks: projects.reduce((sum, p) => sum + p.totalTasks, 0),
    completedTasks: projects.reduce((sum, p) => sum + p.completedTasks, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your projects
            </p>
          </div>
          <Button variant="hero" className="gap-2" onClick={() => navigate("/new-project")}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{projectStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-5 h-5 mx-auto bg-green-500 rounded-full mb-2" />
              <div className="text-2xl font-bold">{projectStats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-5 h-5 mx-auto bg-blue-500 rounded-full mb-2" />
              <div className="text-2xl font-bold">{projectStats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold">{Math.round((projectStats.completedTasks / projectStats.totalTasks) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <Card className="hover:shadow-sm hover:translate-y-0">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="teamSize">Team Size</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <FileText className="h-4 w-4 mr-2" />
              All ({projectStats.total})</TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Clock className="h-4 w-4 mr-2" />
              Active ({projectStats.active})</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <CheckSquare className="h-4 w-4 mr-2" />
              Completed ({projectStats.completed})</TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <NotebookPen className="h-4 w-4 mr-2" />
              Planning ({projectStats.planning})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {getFilteredProjects().map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {getFilteredProjects().length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" 
                      ? "Try adjusting your filters to see more projects"
                      : "Get started by creating your first project"
                    }
                  </p>
                  <Button variant="hero" onClick={() => navigate("/new-project")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;