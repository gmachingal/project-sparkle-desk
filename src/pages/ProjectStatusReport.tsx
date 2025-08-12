import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
    { name: 'Blocked', value: 0, color: '#ef4444' }
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
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="pb-4 mb-6 border-b border-border">
          <Button variant="back" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Project Status Report
              </h1>
              <p className="text-muted-foreground mt-1">
                {project.name} - Comprehensive Performance Analysis
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

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Project Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health Score</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {project.health}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tasks Completion Rate</span>
                    <span className="text-sm font-semibold">{Math.round((project.completedTasks / project.totalTasks) * 100)}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Task Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Task Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimplePieChart data={generateMockData.taskStatus} height={280} />
                </CardContent>
              </Card>
            </div>

            {/* Progress vs Planned */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Progress vs Planned Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleAreaChart 
                  data={generateMockData.sprintVelocity}
                  dataKeys={[
                    { key: 'planned', color: '#94a3b8' },
                    { key: 'completed', color: '#3b82f6' }
                  ]}
                  height={350}
                  xAxisKey="sprint"
                />
              </CardContent>
            </Card>

            {/* Project Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Documents ({project.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.documents.slice(0, 6).map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {doc.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3">
                          <Button variant="ghost" size="sm" className="flex-1 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-xs">
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

          <TabsContent value="progress" className="space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle>Sprint Velocity & Burndown</CardTitle>
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
                  height={300}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Task Completion</CardTitle>
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
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress Health Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">On Schedule</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quality Score</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Team Satisfaction</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">94%</span>
                      </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: '1',
                  name: 'Sarah Johnson',
                  role: 'Frontend Developer',
                  avatar: '',
                  totalHours: 32,
                  weeklyHours: 12,
                  efficiency: 92,
                  tasksAssigned: 6,
                  tasksCompleted: 4,
                  tasksInProgress: 2,
                  currentTasks: [
                    { id: '1', name: 'Homepage UI Components', status: 'in-progress', hours: 8.5, priority: 'high' },
                    { id: '2', name: 'Responsive Design', status: 'in-progress', hours: 3.5, priority: 'medium' },
                    { id: '3', name: 'Component Testing', status: 'completed', hours: 6, priority: 'low' },
                    { id: '4', name: 'Design System Setup', status: 'completed', hours: 14, priority: 'high' }
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
                  tasksAssigned: 5,
                  tasksCompleted: 3,
                  tasksInProgress: 2,
                  currentTasks: [
                    { id: '5', name: 'API Development', status: 'in-progress', hours: 12, priority: 'high' },
                    { id: '6', name: 'Database Schema', status: 'in-progress', hours: 8, priority: 'high' },
                    { id: '7', name: 'Authentication System', status: 'completed', hours: 8, priority: 'critical' }
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
                  tasksAssigned: 4,
                  tasksCompleted: 3,
                  tasksInProgress: 1,
                  currentTasks: [
                    { id: '8', name: 'User Journey Mapping', status: 'in-progress', hours: 6, priority: 'medium' },
                    { id: '9', name: 'Wireframe Creation', status: 'completed', hours: 10, priority: 'high' },
                    { id: '10', name: 'Usability Testing', status: 'completed', hours: 8, priority: 'medium' }
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
                  currentTasks: [
                    { id: '11', name: 'Integration Testing', status: 'in-progress', hours: 4, priority: 'high' },
                    { id: '12', name: 'Bug Verification', status: 'in-progress', hours: 3, priority: 'medium' },
                    { id: '13', name: 'Test Case Creation', status: 'completed', hours: 13, priority: 'medium' }
                  ]
                }
              ].map((member) => (
                <Card key={member.id} className="border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{member.totalHours}h</div>
                          <div className="text-xs text-muted-foreground">Total Logged</div>
                        </div>
                        
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setSelectedMemberForTasks(member)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Tasks
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="font-semibold">{member.name}</div>
                                  <div className="text-sm text-muted-foreground">{member.role}</div>
                                </div>
                              </SheetTitle>
                            </SheetHeader>
                            
                            <div className="mt-6 space-y-6">
                              {/* Task Stats */}
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                  <div className="text-2xl font-bold text-green-600">{member.tasksCompleted}</div>
                                  <div className="text-xs text-muted-foreground">Completed</div>
                                </div>
                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600">{member.tasksInProgress}</div>
                                  <div className="text-xs text-muted-foreground">In Progress</div>
                                </div>
                                <div className="text-center p-3 bg-muted/30 rounded-lg">
                                  <div className="text-2xl font-bold text-orange-600">{member.totalHours}h</div>
                                  <div className="text-xs text-muted-foreground">Total Hours</div>
                                </div>
                              </div>
                              
                              {/* Detailed Task List */}
                              <div className="space-y-3">
                                <h4 className="font-medium flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  Current Tasks ({member.currentTasks.length})
                                </h4>
                                
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                  {member.currentTasks.map((task) => (
                                    <Card key={task.id} className="p-3 hover:shadow-sm transition-shadow">
                                      <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                          {getTaskStatusIcon(task.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm truncate">{task.name}</span>
                                            <Badge 
                                              variant="outline" 
                                              className={cn("text-xs px-1.5 py-0.5", getTaskPriorityColor(task.priority))}
                                            >
                                              {task.priority}
                                            </Badge>
                                          </div>
                                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                            <span className="flex items-center gap-1">
                                              <Clock className="w-3 h-3" />
                                              {task.hours}h logged
                                            </span>
                                            <span className="capitalize">{task.status.replace('-', ' ')}</span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-1.5">
                                            <div 
                                              className={cn(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                task.status === 'completed' ? 'bg-green-500' :
                                                task.status === 'in-progress' ? 'bg-blue-500' :
                                                task.status === 'blocked' ? 'bg-red-500' : 'bg-gray-300'
                                              )}
                                              style={{ 
                                                width: task.status === 'completed' ? '100%' : '60%'
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Performance Summary */}
                              <div className="p-4 bg-muted/20 rounded-lg">
                                <h4 className="font-medium mb-2">Performance Summary</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Weekly Hours:</span>
                                    <span className="ml-2 font-medium">{member.weeklyHours}h</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Efficiency:</span>
                                    <span className="ml-2 font-medium">{member.efficiency}%</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Tasks Assigned:</span>
                                    <span className="ml-2 font-medium">{member.tasksAssigned}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Completion Rate:</span>
                                    <span className="ml-2 font-medium">{Math.round((member.tasksCompleted / member.tasksAssigned) * 100)}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

          <TabsContent value="sprints" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatsCard
                title="Active Sprints"
                value="2"
                description="Currently running"
                icon={Target}
              />
              <StatsCard
                title="Average Velocity"
                value="47"
                description="Story points per sprint"
                icon={TrendingUp}
                trend={{ value: 8.3, positive: true }}
              />
              <StatsCard
                title="Sprint Success Rate"
                value="94%"
                description="Goals achieved"
                icon={CheckCircle}
                trend={{ value: 2.1, positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sprint Velocity Trend</CardTitle>
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
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Sprint Burndown</CardTitle>
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
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sprint Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sprint 5 - UI Components', status: 'Active', progress: 85, velocity: 46, planned: 46 },
                    { name: 'Sprint 4 - Backend API', status: 'Completed', progress: 100, velocity: 55, planned: 52 },
                    { name: 'Sprint 3 - Database Design', status: 'Completed', progress: 100, velocity: 45, planned: 48 }
                  ].map((sprint, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{sprint.name}</h4>
                        <Badge variant={sprint.status === 'Active' ? 'default' : 'secondary'}>
                          {sprint.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Progress:</span>
                          <span className="ml-2 font-medium">{sprint.progress}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Velocity:</span>
                          <span className="ml-2 font-medium">{sprint.velocity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Planned:</span>
                          <span className="ml-2 font-medium">{sprint.planned}</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${sprint.progress}%` }}
                        />
                      </div>
                    </div>
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
