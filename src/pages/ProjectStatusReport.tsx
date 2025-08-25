import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart,
  Download,
  FileText,
  Image,
  File,
  Eye,
  Play,
  AlertCircle as AlertCircleIcon,
  Circle
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { SimpleBarChart, SimpleAreaChart, SimplePieChart, generateMockData } from '@/components/SimpleCharts';
import MilestoneTimeline from '@/components/MilestoneTimeline';

const ProjectStatusReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMemberForTasks, setSelectedMemberForTasks] = useState<any>(null);
  const [selectedMilestoneForTasks, setSelectedMilestoneForTasks] = useState<any>(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<any>(null);

  // Mock project data - in a real app, this would be fetched based on project id
  const project = {
    id: id || '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the user experience and backend systems',
    progress: 78,
    totalTasks: 45,
    completedTasks: 35,
    teamSize: 8,
    dueDate: '2024-03-15',
    status: 'On Track',
    health: 'Good',
    documents: [
      {
        id: '1',
        name: 'Project_Charter_v2.pdf',
        type: 'pdf',
        size: '3.2 MB',
        uploadedAt: new Date('2024-01-15'),
        uploadedBy: 'Project Manager',
        category: 'Planning'
      },
      {
        id: '2',
        name: 'Technical_Architecture.pdf',
        type: 'pdf',
        size: '5.8 MB',
        uploadedAt: new Date('2024-01-20'),
        uploadedBy: 'Tech Lead',
        category: 'Technical'
      },
      {
        id: '3',
        name: 'User_Research_Findings.docx',
        type: 'document',
        size: '2.1 MB',
        uploadedAt: new Date('2024-01-25'),
        uploadedBy: 'UX Researcher',
        category: 'Research'
      },
      {
        id: '4',
        name: 'Design_System_Guide.figma',
        type: 'design',
        size: '12.4 MB',
        uploadedAt: new Date('2024-02-01'),
        uploadedBy: 'Design Team',
        category: 'Design'
      },
      {
        id: '5',
        name: 'API_Documentation.pdf',
        type: 'pdf',
        size: '4.6 MB',
        uploadedAt: new Date('2024-02-05'),
        uploadedBy: 'Backend Team',
        category: 'Technical'
      }
    ]
  };

  // Analytics data
  const progressData = [
    { month: 'Jan', planned: 20, actual: 15 },
    { month: 'Feb', planned: 35, actual: 30 },
    { month: 'Mar', planned: 50, actual: 45 },
    { month: 'Apr', planned: 65, actual: 70 },
    { month: 'May', planned: 78, actual: 78 },
    { month: 'Jun', planned: 90, actual: 85 }
  ];

  const taskStatusData = [
    { name: 'Completed', value: 35, color: '#10b981' },
    { name: 'In Progress', value: 8, color: '#3b82f6' },
    { name: 'Pending', value: 2, color: '#f59e0b' },
    { name: 'Blocked', value: 3, color: '#ef4444' }
  ];

  const teamPerformanceData = [
    { member: 'John Doe', tasksCompleted: 12, efficiency: 95 },
    { member: 'Jane Smith', tasksCompleted: 10, efficiency: 88 },
    { member: 'Mike Johnson', tasksCompleted: 8, efficiency: 92 },
    { member: 'Sarah Wilson', tasksCompleted: 5, efficiency: 85 },
    { member: 'David Brown', tasksCompleted: 7, efficiency: 90 }
  ];

  const milestoneData = [
    { milestone: 'UI Design', progress: 100, status: 'Completed', dueDate: '2024-01-15' },
    { milestone: 'Backend API', progress: 85, status: 'In Progress', dueDate: '2024-02-28' },
    { milestone: 'Frontend Development', progress: 70, status: 'In Progress', dueDate: '2024-03-15' },
    { milestone: 'Testing & QA', progress: 25, status: 'Planned', dueDate: '2024-04-01' },
    { milestone: 'Deployment', progress: 0, status: 'Planned', dueDate: '2024-04-15' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      case 'design':
        return <File className="w-6 h-6 text-purple-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-blue-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Completed': 'default',
      'In Progress': 'secondary',
      'Planned': 'outline',
      'Blocked': 'destructive'
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const exportReport = () => {
    // Mock export functionality
    console.log('Exporting project status report...');
  };

  // Helper functions for task status and priority
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'in-progress':
        return <Play className="w-3 h-3 text-blue-500" />;
      case 'blocked':
        return <AlertCircleIcon className="w-3 h-3 text-red-500" />;
      default:
        return <Circle className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="border-b backdrop-blur-sm bg-gradient-to-l sticky top-0 z-50 from-primary to-primary/50 via-primary-glow/20  shadow-2xl shadow-black/30 drop-shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold from-primary">Project Status Report</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {project.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive Performance Analysis
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Overall Progress"
            value={`${project.progress}%`}
            description="Project completion"
            icon={Target}
            trend={{ value: 5.2, positive: true }}
          />
          <StatsCard
            title="Team Efficiency"
            value="91%"
            description="Average performance"
            icon={Users}
            trend={{ value: 3.5, positive: true }}
          />
          <StatsCard
            title="Days Remaining"
            value="28"
            description="Until deadline"
            icon={Clock}
            trend={{ value: 0, positive: true }}
          />
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <BarChart3 className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="sprints" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <Target className="h-4 w-4 mr-2" />
              Sprints
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Milestones
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium gap-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            {/* Enhanced Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Project Health</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{project.health}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="w-full bg-blue-200 rounded-full h-2 dark:bg-blue-800">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-blue-600 dark:text-blue-400">95%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Completion Rate</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">{Math.round((project.completedTasks / project.totalTasks) * 100)}%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                    {project.completedTasks} of {project.totalTasks} tasks completed
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Team Members</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{project.teamSize}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-purple-600 dark:text-purple-400">
                    Active contributors
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Days Remaining</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">28</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-orange-600 dark:text-orange-400">
                    Until deadline
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Project Status */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Project Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-lg font-bold text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-glow h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{project.completedTasks}</div>
                      <div className="text-xs text-muted-foreground">Done</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{project.totalTasks - project.completedTasks}</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium">Status</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium">Health</span>
                      </div>
                      <span className="text-xs font-semibold text-blue-600">{project.health}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Task Distribution */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                      <PieChart className="h-4 w-4 text-accent-foreground" />
                    </div>
                    Task Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Completed', value: 35, total: 45, color: 'bg-success', textColor: 'text-success' },
                      { name: 'In Progress', value: 8, total: 45, color: 'bg-primary', textColor: 'text-primary' },
                      { name: 'Pending', value: 2, total: 45, color: 'bg-warning', textColor: 'text-warning' },
                      { name: 'Blocked', value: 3, total: 45, color: 'bg-destructive', textColor: 'text-destructive' }
                    ].map((item, index) => (
                      <Card key={index} className="group hover:shadow-md transition-all duration-200 border border-border/50 bg-card/50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-4 h-4 rounded-full flex-shrink-0", item.color)}></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium truncate">{item.name}</span>
                                <span className={cn("text-lg font-bold", item.textColor)}>{item.value}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {Math.round((item.value / item.total) * 100)}% of total tasks
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compact Progress Timeline */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    Sprint Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={generateMockData.sprintVelocity.slice(-4)}
                    dataKeys={[
                      { key: 'planned', color: '#94a3b8' },
                      { key: 'completed', color: '#3b82f6' }
                    ]}
                    height={160}
                    xAxisKey="sprint"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Project Documents */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Project Documents
                  <Badge variant="outline" className="ml-2">{project.documents.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.documents.slice(0, 6).map((doc) => (
                    <Card key={doc.id} className="group hover:shadow-md hover:scale-[1.02] transition-all duration-300 border border-border/50 bg-muted/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200">
                              {doc.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">{doc.size}</p>
                            <Badge variant="outline" className="text-xs mt-2">{doc.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button variant="ghost" size="sm" className="flex-1 text-xs h-8 hover:bg-primary/10">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-xs h-8 hover:bg-primary/10">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-8 animate-fade-in">
            {/* Compact Progress Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-green-600 dark:text-green-400">Sprint Velocity</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">47</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">+8.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Burndown Rate</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">92%</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">On track</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Quality Score</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">88%</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-purple-500" />
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">+2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compact Sprint Velocity Chart */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Sprint Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={[
                      { sprint: 'Sprint 1', planned: 45, completed: 42, remaining: 320 },
                      { sprint: 'Sprint 2', planned: 50, completed: 48, remaining: 272 },
                      { sprint: 'Sprint 3', planned: 48, completed: 45, remaining: 227 },
                      { sprint: 'Sprint 4', planned: 52, completed: 55, remaining: 172 },
                      { sprint: 'Sprint 5', planned: 46, completed: 46, remaining: 126 }
                    ]}
                    dataKeys={[
                      { key: 'planned', color: '#94a3b8' },
                      { key: 'completed', color: '#10b981' }
                    ]}
                    height={180}
                  />
                </CardContent>
              </Card>

              {/* Compact Daily Progress */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-accent-foreground" />
                    </div>
                    Daily Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart 
                    data={[
                      { day: 'Mon', completed: 8, created: 6 },
                      { day: 'Tue', completed: 12, created: 8 },
                      { day: 'Wed', completed: 6, created: 10 },
                      { day: 'Thu', completed: 14, created: 7 },
                      { day: 'Fri', completed: 10, created: 5 },
                      { day: 'Sat', completed: 4, created: 2 },
                      { day: 'Sun', completed: 2, created: 1 }
                    ]}
                    dataKeys={[
                      { key: 'completed', color: '#10b981', name: 'Completed' },
                      { key: 'created', color: '#3b82f6', name: 'Created' }
                    ]}
                    height={180}
                  />
                </CardContent>
              </Card>

              {/* Compact Health Metrics */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center">
                      <Activity className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Schedule
                        </span>
                        <span className="text-sm font-bold text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Quality
                        </span>
                        <span className="text-sm font-bold text-blue-600">88%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Satisfaction
                        </span>
                        <span className="text-sm font-bold text-purple-600">94%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded-md">
                      <div className="text-lg font-bold text-green-600">15</div>
                      <div className="text-xs text-green-600 font-medium">On Time</div>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
                      <div className="text-lg font-bold text-yellow-600">3</div>
                      <div className="text-xs text-yellow-600 font-medium">At Risk</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded-md">
                      <div className="text-lg font-bold text-red-600">0</div>
                      <div className="text-xs text-red-600 font-medium">Delayed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            {/* Milestone Timeline */}
            <MilestoneTimeline />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-muted-foreground">Total Members</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">156h</div>
                  <div className="text-sm text-muted-foreground">Total Logged Hours</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">42</div>
                  <div className="text-sm text-muted-foreground">Active Tasks</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">89%</div>
                  <div className="text-sm text-muted-foreground">Avg Efficiency</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Team Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                // Extended team member data with complete task history
                {
                  id: '1',
                  name: 'Sarah Johnson',
                  role: 'Frontend Developer',
                  avatar: '',
                  totalHours: 32,
                  weeklyHours: 12,
                  efficiency: 92,
                  tasksAssigned: 8,
                  tasksCompleted: 5,
                  tasksInProgress: 2,
                  tasksPlanned: 1,
                  currentTasks: [
                    { id: '1', name: 'Homepage UI Components', status: 'in-progress', hours: 8.5, priority: 'high', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-12-01', milestone: 'Frontend Development' },
                    { id: '2', name: 'Responsive Design', status: 'blocked', hours: 3.5, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-05', milestone: 'Frontend Development' },
                    { id: '3', name: 'Component Testing', status: 'completed', hours: 6, priority: 'low', estimatedHours: 6, project: 'Website Redesign', dueDate: '2024-11-28', milestone: 'Testing & QA' },
                    { id: '4', name: 'Design System Setup', status: 'completed', hours: 14, priority: 'high', estimatedHours: 16, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Design Phase' }
                  ],
                  allTasks: [
                    { id: '1', name: 'Homepage UI Components', status: 'in-progress', hours: 8.5, priority: 'high', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-12-01', milestone: 'Frontend Development' },
                    { id: '2', name: 'Responsive Design', status: 'blocked', hours: 3.5, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-05', milestone: 'Frontend Development' },
                    { id: '3', name: 'Component Testing', status: 'completed', hours: 6, priority: 'low', estimatedHours: 6, project: 'Website Redesign', dueDate: '2024-11-28', milestone: 'Testing & QA' },
                    { id: '4', name: 'Design System Setup', status: 'completed', hours: 14, priority: 'high', estimatedHours: 16, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Design Phase' },
                    { id: '5', name: 'User Interface Wireframes', status: 'completed', hours: 12, priority: 'high', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-20', milestone: 'Design Phase' },
                    { id: '6', name: 'Navigation Menu Implementation', status: 'completed', hours: 8, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-22', milestone: 'Frontend Development' },
                    { id: '7', name: 'Form Validation System', status: 'blocked', hours: 10, priority: 'medium', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-11-26', milestone: 'Frontend Development' },
                    { id: '8', name: 'Performance Optimization', status: 'planned', hours: 0, priority: 'low', estimatedHours: 6, project: 'Website Redesign', dueDate: '2024-12-10', milestone: 'Testing & QA' }
                  ]
                },
                {
                  id: '2',
                  name: 'Mike Chen',
                  role: 'Backend Developer',
                  avatar: '',
                  totalHours: 28,
                  weeklyHours: 10,
                  efficiency: 87,
                  tasksAssigned: 6,
                  tasksCompleted: 4,
                  tasksInProgress: 1,
                  tasksPlanned: 1,
                  currentTasks: [
                    { id: '5', name: 'API Development', status: 'in-progress', hours: 12, priority: 'high', estimatedHours: 16, project: 'Website Redesign', dueDate: '2024-12-03', milestone: 'Backend Development' },
                    { id: '6', name: 'Database Schema', status: 'in-progress', hours: 8, priority: 'high', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-30', milestone: 'Backend Development' },
                    { id: '7', name: 'Authentication System', status: 'completed', hours: 8, priority: 'critical', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Backend Development' }
                  ],
                  allTasks: [
                    { id: '5', name: 'API Development', status: 'in-progress', hours: 12, priority: 'high', estimatedHours: 16, project: 'Website Redesign', dueDate: '2024-12-03', milestone: 'Backend Development' },
                    { id: '6', name: 'Database Schema', status: 'in-progress', hours: 8, priority: 'high', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-30', milestone: 'Backend Development' },
                    { id: '7', name: 'Authentication System', status: 'completed', hours: 8, priority: 'critical', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Backend Development' },
                    { id: '8', name: 'User Management API', status: 'completed', hours: 14, priority: 'high', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-11-20', milestone: 'Backend Development' },
                    { id: '9', name: 'Data Migration Scripts', status: 'completed', hours: 6, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-18', milestone: 'Backend Development' },
                    { id: '10', name: 'Security Implementation', status: 'planned', hours: 0, priority: 'critical', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-12-05', milestone: 'Backend Development' }
                  ]
                },
                {
                  id: '3',
                  name: 'Emily Davis',
                  role: 'UX Designer',
                  avatar: '',
                  totalHours: 24,
                  weeklyHours: 8,
                  efficiency: 95,
                  tasksAssigned: 5,
                  tasksCompleted: 4,
                  tasksInProgress: 1,
                  tasksPlanned: 0,
                  currentTasks: [
                    { id: '8', name: 'User Journey Mapping', status: 'in-progress', hours: 6, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-01', milestone: 'Design Phase' },
                    { id: '9', name: 'Wireframe Creation', status: 'completed', hours: 10, priority: 'high', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-22', milestone: 'Design Phase' },
                    { id: '10', name: 'Usability Testing', status: 'completed', hours: 8, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-20', milestone: 'Design Phase' }
                  ],
                  allTasks: [
                    { id: '8', name: 'User Journey Mapping', status: 'in-progress', hours: 6, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-01', milestone: 'Design Phase' },
                    { id: '9', name: 'Wireframe Creation', status: 'completed', hours: 10, priority: 'high', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-22', milestone: 'Design Phase' },
                    { id: '10', name: 'Usability Testing', status: 'completed', hours: 8, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-20', milestone: 'Design Phase' },
                    { id: '11', name: 'User Research Analysis', status: 'completed', hours: 12, priority: 'high', estimatedHours: 14, project: 'Website Redesign', dueDate: '2024-11-15', milestone: 'Project Kickoff' },
                    { id: '12', name: 'Persona Development', status: 'completed', hours: 8, priority: 'medium', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-18', milestone: 'Design Phase' }
                  ]
                },
                {
                  id: '4',
                  name: 'Alex Wilson',
                  role: 'QA Engineer',
                  avatar: '',
                  totalHours: 20,
                  weeklyHours: 15,
                  efficiency: 88,
                  tasksAssigned: 7,
                  tasksCompleted: 5,
                  tasksInProgress: 2,
                  tasksPlanned: 0,
                  currentTasks: [
                    { id: '11', name: 'Integration Testing', status: 'in-progress', hours: 4, priority: 'high', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-02', milestone: 'Testing & QA' },
                    { id: '12', name: 'Bug Verification', status: 'in-progress', hours: 3, priority: 'medium', estimatedHours: 6, project: 'Website Redesign', dueDate: '2024-11-29', milestone: 'Testing & QA' },
                    { id: '13', name: 'Test Case Creation', status: 'completed', hours: 13, priority: 'medium', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Testing & QA' }
                  ],
                  allTasks: [
                    { id: '11', name: 'Integration Testing', status: 'in-progress', hours: 4, priority: 'high', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-12-02', milestone: 'Testing & QA' },
                    { id: '12', name: 'Bug Verification', status: 'in-progress', hours: 3, priority: 'medium', estimatedHours: 6, project: 'Website Redesign', dueDate: '2024-11-29', milestone: 'Testing & QA' },
                    { id: '13', name: 'Test Case Creation', status: 'completed', hours: 13, priority: 'medium', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-11-25', milestone: 'Testing & QA' },
                    { id: '14', name: 'Automated Test Setup', status: 'completed', hours: 16, priority: 'high', estimatedHours: 16, project: 'Website Redesign', dueDate: '2024-11-20', milestone: 'Testing & QA' },
                    { id: '15', name: 'Performance Testing', status: 'completed', hours: 10, priority: 'medium', estimatedHours: 10, project: 'Website Redesign', dueDate: '2024-11-22', milestone: 'Testing & QA' },
                    { id: '16', name: 'Security Testing', status: 'completed', hours: 8, priority: 'high', estimatedHours: 8, project: 'Website Redesign', dueDate: '2024-11-24', milestone: 'Testing & QA' },
                    { id: '17', name: 'User Acceptance Testing', status: 'completed', hours: 12, priority: 'critical', estimatedHours: 12, project: 'Website Redesign', dueDate: '2024-11-26', milestone: 'Testing & QA' }
                  ]
                }
              ].map((member) => (
                <Card key={member.id} className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden relative">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-accent" />
                  
                  <CardContent className="p-6">
                    {/* Header Section */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground truncate">{member.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{member.role}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{member.totalHours}h total logged</span>
                        </div>
                      </div>
                      
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedMemberForTasks(member)}
                          >
                            View Tasks
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[600px] sm:w-[800px]">
                          <SheetHeader>
                            <SheetTitle className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              {member.name}'s Tasks
                            </SheetTitle>
                            <SheetDescription>
                              View and manage tasks assigned to {member.name}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-6">
                            {/* Member Stats Summary */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-muted/30 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-primary">{member.tasksAssigned}</div>
                                <div className="text-sm text-muted-foreground">Total Tasks</div>
                              </div>
                              <div className="bg-muted/30 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">{member.tasksCompleted}</div>
                                <div className="text-sm text-muted-foreground">Completed</div>
                              </div>
                              <div className="bg-muted/30 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{member.totalHours}h</div>
                                <div className="text-sm text-muted-foreground">Hours Logged</div>
                              </div>
                            </div>

                            {/* Tasks List */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground">Recent Tasks</h4>
                              <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-3">
                                  {member.allTasks.map((task) => (
                                    <Card key={task.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                                      <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                          {task.status === 'completed' ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                          ) : task.status === 'in-progress' ? (
                                            <Clock className="w-3 h-3 text-blue-500" />
                                          ) : task.status === 'blocked' ? (
                                            <AlertCircleIcon className="w-3 h-3 text-red-500" />
                                          ) : (
                                            <Circle className="w-3 h-3 text-gray-400" />
                                          )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm truncate">{task.name}</span>
                                            <Badge 
                                              variant="outline" 
                                              className={`text-xs px-1.5 py-0.5 ${
                                                task.priority === 'critical' ? 'text-red-600 bg-red-50 border-red-200' :
                                                task.priority === 'high' ? 'text-orange-600 bg-orange-50 border-orange-200' :
                                                task.priority === 'medium' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                                                'text-gray-600 bg-gray-50 border-gray-200'
                                              }`}
                                            >
                                              {task.priority}
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                            <span className="flex items-center gap-1">
                                              <Users className="w-3 h-3" />
                                              Assigned to member
                                            </span>
                                            <span className="flex items-center gap-1">
                                              <Clock className="w-3 h-3" />
                                              {task.hours}h / {task.estimatedHours}h
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                              <span className="text-muted-foreground">Progress</span>
                                              <span className="font-medium">
                                                {task.estimatedHours > 0 ? Math.round((task.hours / task.estimatedHours) * 100) : 0}%
                                              </span>
                                            </div>
                                            <Progress 
                                              value={task.estimatedHours > 0 ? (task.hours / task.estimatedHours) * 100 : 0} 
                                              className="h-1.5"
                                            />
                                          </div>
                                        </div>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => navigate(`/task/${task.id}`)}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          View Details
                                        </Button>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>

                            {/* Performance Metrics */}
                            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                              <h4 className="font-semibold text-foreground">Performance Metrics</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Efficiency Rate:</span>
                                  <span className="ml-2 font-medium">{member.efficiency}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Weekly Hours:</span>
                                  <span className="ml-2 font-medium">{member.weeklyHours}h</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Tasks in Progress:</span>
                                  <span className="ml-2 font-medium">{member.tasksInProgress}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Completion Rate:</span>
                                  <span className="ml-2 font-medium">{Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-600">{member.weeklyHours}h</div>
                        <div className="text-xs text-muted-foreground">This Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-600">{member.tasksCompleted}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-orange-600">{member.tasksInProgress}</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-purple-600">{member.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Task Completion Rate</span>
                        <span className="font-medium">{Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(member.tasksCompleted / member.tasksAssigned) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sprints" className="space-y-8 animate-fade-in">
            {/* Compact Sprint Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Active Sprints</p>
                      <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">2</p>
                    </div>
                    <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-violet-500" />
                    <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Both on track</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">Avg Velocity</p>
                      <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">47</p>
                    </div>
                    <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-cyan-500" />
                    <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">+8.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Success Rate</p>
                      <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">94%</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compact Sprint Velocity */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-primary-foreground" />
                    </div>
                    Velocity Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={[
                      { sprint: 'Sprint 1', velocity: 42, planned: 45 },
                      { sprint: 'Sprint 2', velocity: 48, planned: 50 },
                      { sprint: 'Sprint 3', velocity: 45, planned: 48 },
                      { sprint: 'Sprint 4', velocity: 55, planned: 52 },
                      { sprint: 'Sprint 5', velocity: 46, planned: 46 }
                    ]}
                    dataKeys={[
                      { key: 'planned', color: '#94a3b8' },
                      { key: 'velocity', color: '#8b5cf6' }
                    ]}
                    height={180}
                  />
                </CardContent>
              </Card>

              {/* Compact Sprint Burndown */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                      <Activity className="h-4 w-4 text-accent-foreground" />
                    </div>
                    Sprint Burndown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleAreaChart 
                    data={[
                      { day: 'Day 1', remaining: 50, ideal: 50 },
                      { day: 'Day 3', remaining: 42, ideal: 43 },
                      { day: 'Day 5', remaining: 35, ideal: 36 },
                      { day: 'Day 7', remaining: 28, ideal: 29 },
                      { day: 'Day 9', remaining: 18, ideal: 21 },
                      { day: 'Day 11', remaining: 12, ideal: 14 },
                      { day: 'Day 13', remaining: 5, ideal: 7 },
                      { day: 'Day 14', remaining: 0, ideal: 0 }
                    ]}
                    dataKeys={[
                      { key: 'ideal', color: '#94a3b8' },
                      { key: 'remaining', color: '#ef4444' }
                    ]}
                    height={180}
                  />
                </CardContent>
              </Card>

              {/* Compact Sprint Summary */}
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    Sprint Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Sprint 5 - UI Components', status: 'Active', progress: 85, velocity: 46 },
                    { name: 'Sprint 4 - Backend API', status: 'Completed', progress: 100, velocity: 55 },
                    { name: 'Sprint 3 - Database Design', status: 'Completed', progress: 100, velocity: 45 }
                  ].map((sprint, index) => (
                    <div key={index} className="p-3 border border-border/50 bg-muted/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${sprint.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                          <span className="font-medium text-sm truncate">{sprint.name.split(' - ')[1]}</span>
                        </div>
                        <Badge 
                          variant={sprint.status === 'Active' ? 'default' : 'secondary'}
                          className={`text-xs ${sprint.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
                        >
                          {sprint.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{sprint.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-1000 ${
                            sprint.status === 'Active' 
                              ? 'bg-gradient-to-r from-green-400 to-green-600' 
                              : 'bg-gradient-to-r from-blue-400 to-blue-600'
                          }`}
                          style={{ width: `${sprint.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sprint Performance Details */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  Sprint Performance Overview
                </CardTitle>
                <p className="text-muted-foreground text-sm">Detailed metrics for recent sprints</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: 'Sprint 5 - UI Components', status: 'Active', progress: 85, velocity: 46, planned: 46, daysLeft: 3 },
                    { name: 'Sprint 4 - Backend API', status: 'Completed', progress: 100, velocity: 55, planned: 52, daysLeft: 0 },
                    { name: 'Sprint 3 - Database Design', status: 'Completed', progress: 100, velocity: 45, planned: 48, daysLeft: 0 }
                  ].map((sprint, index) => (
                    <Card key={index} className="group border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${sprint.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                            <h4 className="font-semibold text-lg">{sprint.name}</h4>
                          </div>
                          <Badge 
                            variant={sprint.status === 'Active' ? 'default' : 'secondary'}
                            className={sprint.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                          >
                            {sprint.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{sprint.progress}%</div>
                            <div className="text-xs text-blue-600 font-medium">Progress</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">{sprint.velocity}</div>
                            <div className="text-xs text-purple-600 font-medium">Velocity</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                            <div className="text-xl font-bold text-gray-600">{sprint.planned}</div>
                            <div className="text-xs text-gray-600 font-medium">Planned</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                            <div className="text-xl font-bold text-orange-600">{sprint.daysLeft}</div>
                            <div className="text-xs text-orange-600 font-medium">Days Left</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Sprint Progress</span>
                            <span className="font-medium">{sprint.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-1000 ${
                                sprint.status === 'Active' 
                                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
                              }`}
                              style={{ width: `${sprint.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">On Track Performance</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Project is progressing well with 78% completion rate ahead of schedule.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">High Team Efficiency</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Team members are performing at 91% efficiency with consistent output.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Resource Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider reallocating team members to accelerate testing phase.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">Early Delivery Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Current pace suggests potential for 1-week early delivery.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium">Sprint Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Sprint velocity is consistently above planned capacity. Consider increasing scope.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectStatusReport;
