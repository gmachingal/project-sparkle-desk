import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Target, 
  Calendar,
  Users,
  BarChart3,
  ArrowRight,
  FolderOpen,
  ChevronDown,
  Flag,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Milestone {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'planned';
  dueDate: Date;
  progress: number;
  description: string;
}

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
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  sprints: Sprint[];
  milestones: Milestone[];
  teamMembers: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

const ProjectsWithSprints = () => {
  const navigate = useNavigate();
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({
    "1": true, // First project open by default
  });

  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      status: "active",
      progress: 65,
      sprints: [
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
          ]
        }
      ],
      milestones: [
        {
          id: "1",
          name: "Design System Complete",
          status: "completed",
          dueDate: new Date('2024-01-20'),
          progress: 100,
          description: "Complete design system and component library"
        },
        {
          id: "2",
          name: "Backend API",
          status: "in-progress",
          dueDate: new Date('2024-02-15'),
          progress: 60,
          description: "API development and database setup"
        },
        {
          id: "3",
          name: "User Testing",
          status: "planned",
          dueDate: new Date('2024-03-01'),
          progress: 0,
          description: "Conduct user testing and gather feedback"
        }
      ],
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "2", name: "Mike Johnson" },
        { id: "3", name: "Emily Davis" },
        { id: "4", name: "Alex Kim" }
      ]
    },
    {
      id: "2",
      name: "Mobile App",
      description: "Cross-platform mobile application development",
      status: "active",
      progress: 30,
      sprints: [
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
          ]
        }
      ],
      milestones: [
        {
          id: "4",
          name: "Prototype Complete",
          status: "in-progress",
          dueDate: new Date('2024-02-28'),
          progress: 40,
          description: "Working prototype with core features"
        },
        {
          id: "5",
          name: "Beta Release",
          status: "planned",
          dueDate: new Date('2024-04-15'),
          progress: 0,
          description: "Beta version for testing"
        }
      ],
      teamMembers: [
        { id: "1", name: "Sarah Chen" },
        { id: "4", name: "Alex Kim" },
        { id: "5", name: "Lisa Wong" }
      ]
    }
  ];

  const getProjectStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSprintStatusColor = (status: Sprint['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMilestoneStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const toggleProject = (projectId: string) => {
    setOpenProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Projects Overview
        </h2>
        <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
          View All Projects
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <Collapsible 
              open={openProjects[project.id]} 
              onOpenChange={() => toggleProject(project.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ChevronDown className={`w-4 h-4 transition-transform ${openProjects[project.id] ? 'rotate-0' : '-rotate-90'}`} />
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {project.name}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getProjectStatusColor(project.status)}`}
                          >
                            {project.status}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{project.teamMembers.length}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2 mt-2" />
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* Milestones Section */}
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Flag className="w-4 h-4" />
                      Milestones
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-sm">{milestone.name}</h5>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getMilestoneStatusColor(milestone.status)}`}
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{milestone.description}</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-1" />
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            Due {formatDate(milestone.dueDate)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sprints Section */}
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4" />
                      Active Sprints
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.sprints.map((sprint) => {
                        const daysRemaining = getDaysRemaining(sprint.endDate);
                        
                        return (
                          <div 
                            key={sprint.id} 
                            className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/sprint-dashboard/1/${sprint.id}`)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-medium text-sm">{sprint.name}</h5>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getSprintStatusColor(sprint.status)}`}
                                  >
                                    {sprint.status}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">{sprint.goal}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{sprint.progress}%</span>
                              </div>
                              <Progress value={sprint.progress} className="h-2" />
                            </div>

                            <div className="grid grid-cols-1 gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Story Points:</span>
                                <span className="font-medium">{sprint.storyPoints.completed}/{sprint.storyPoints.total}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Users className="w-3 h-3 text-muted-foreground" />
                                <div className="flex -space-x-1">
                                  {sprint.teamMembers.slice(0, 3).map((member, index) => (
                                    <Avatar key={member.id} className="w-5 h-5 border border-background">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                        {member.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                  {sprint.teamMembers.length > 3 && (
                                    <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center">
                                      <span className="text-xs text-muted-foreground">+{sprint.teamMembers.length - 3}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWithSprints;