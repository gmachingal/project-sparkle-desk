import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import { 
  Target, 
  Calendar,
  Users,
  BarChart3,
  ArrowLeft,
  Search,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Sprint {
  id: string;
  name: string;
  goal: string;
  status: 'active' | 'planned' | 'completed';
  progress: number;
  startDate: Date;
  endDate: Date;
  storyPoints: {
    total: number;
    completed: number;
  };
  tasks: {
    total: number;
    completed: number;
  };
  teamMembers: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  project: string;
}

const MySprintsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterProject, setFilterProject] = useState<string>("all");

  // Mock sprints data grouped by project
  const allSprints: Sprint[] = [
    {
      id: "1",
      name: "Sprint 1 - Foundation",
      goal: "Set up project foundation and core authentication",
      status: "active",
      progress: 75,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
      storyPoints: { total: 34, completed: 26 },
      tasks: { total: 12, completed: 9 },
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "2", name: "Mike Johnson" },
        { id: "3", name: "Emily Davis" }
      ],
      project: "Website Redesign"
    },
    {
      id: "2", 
      name: "Sprint 1 - MVP",
      goal: "Complete MVP features and basic functionality",
      status: "active",
      progress: 45,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-10'),
      storyPoints: { total: 21, completed: 9 },
      tasks: { total: 8, completed: 3 },
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "4", name: "Alex Kim" }
      ],
      project: "Mobile App"
    },
    {
      id: "3",
      name: "Sprint 2 - UI Enhancement",
      goal: "Improve user interface and user experience",
      status: "planned",
      progress: 0,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-15'),
      storyPoints: { total: 28, completed: 0 },
      tasks: { total: 10, completed: 0 },
      teamMembers: [
        { id: "2", name: "Mike Johnson" },
        { id: "3", name: "Emily Davis" },
        { id: "5", name: "Jordan Lee" }
      ],
      project: "Website Redesign"
    },
    {
      id: "4",
      name: "Sprint 2 - Performance",
      goal: "Optimize app performance and reduce load times",
      status: "planned",
      progress: 10,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-03-01'),
      storyPoints: { total: 18, completed: 2 },
      tasks: { total: 6, completed: 1 },
      teamMembers: [
        { id: "4", name: "Alex Kim" },
        { id: "6", name: "Sam Wilson" }
      ],
      project: "Mobile App"
    },
    {
      id: "5",
      name: "Sprint 1 - Campaign Launch",
      goal: "Launch initial marketing campaign and track metrics",
      status: "completed",
      progress: 100,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      storyPoints: { total: 25, completed: 25 },
      tasks: { total: 8, completed: 8 },
      teamMembers: [
        { id: "7", name: "Taylor Smith" },
        { id: "8", name: "Casey Brown" }
      ],
      project: "Marketing Campaign"
    }
  ];

  const getStatusColor = (status: Sprint['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter sprints based on search term, status, and project
  const filteredSprints = allSprints.filter(sprint => {
    const matchesSearch = sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sprint.goal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || sprint.status === filterStatus;
    const matchesProject = filterProject === "all" || sprint.project === filterProject;
    
    return matchesSearch && matchesStatus && matchesProject;
  });

  // Group sprints by project
  const sprintsByProject = filteredSprints.reduce((acc, sprint) => {
    if (!acc[sprint.project]) {
      acc[sprint.project] = [];
    }
    acc[sprint.project].push(sprint);
    return acc;
  }, {} as Record<string, Sprint[]>);

  // Get unique projects for filter
  const projects = Array.from(new Set(allSprints.map(sprint => sprint.project)));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button Above Header */}
      <div className="border-b backdrop-blur-sm bg-gradient-to-r from-primary/50 via-primary-glow/40 to-primary/50 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 py-3">
          <Button variant="back" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
      
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              My Sprints
            </h1>
            <p className="text-muted-foreground mt-1">
              All sprints you're participating in, organized by project
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search sprints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sprints grouped by project */}
        <div className="space-y-8">
          {Object.entries(sprintsByProject).map(([projectName, sprints]) => (
            <div key={projectName}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                {projectName}
                <Badge variant="outline" className="ml-2">
                  {sprints.length} sprint{sprints.length > 1 ? 's' : ''}
                </Badge>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sprints.map((sprint) => {
                  const daysRemaining = getDaysRemaining(sprint.endDate);
                  
                  return (
                    <Card 
                      key={sprint.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/sprint-dashboard/1/${sprint.id}`)}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">{sprint.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(sprint.status)}`}
                              >
                                {sprint.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{sprint.goal}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{sprint.progress}%</span>
                          </div>
                          <Progress value={sprint.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Points:</span>
                            <span className="font-medium">{sprint.storyPoints.completed}/{sprint.storyPoints.total}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div className="flex -space-x-1">
                              {sprint.teamMembers.slice(0, 3).map((member) => (
                                <Avatar key={member.id} className="w-6 h-6 border border-background">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                    {member.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {sprint.teamMembers.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-muted border border-background flex items-center justify-center">
                                  <span className="text-xs text-muted-foreground">+{sprint.teamMembers.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(sprint.startDate)} - {formatDate(sprint.endDate)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(sprintsByProject).length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No sprints found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find sprints.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MySprintsList;