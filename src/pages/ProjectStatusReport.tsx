import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useNavigate } from 'react-router-dom';
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
  FileText
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { SimpleBarChart, SimpleAreaChart, SimplePieChart } from '@/components/SimpleCharts';

const ProjectStatusReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');

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
    health: 'Good'
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
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('progress')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Progress Tracking
          </Button>
          <Button
            variant={activeTab === 'team' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('team')}
          >
            <Users className="h-4 w-4 mr-2" />
            Team Performance
          </Button>
          <Button
            variant={activeTab === 'sprints' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('sprints')}
          >
            <Target className="h-4 w-4 mr-2" />
            Sprint Analytics
          </Button>
          <Button
            variant={activeTab === 'milestones' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('milestones')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Milestones
          </Button>
          <Button
            variant={activeTab === 'insights' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('insights')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Insights
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
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
                  <SimplePieChart data={taskStatusData} height={250} />
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
                  data={progressData}
                  dataKeys={[
                    { key: 'planned', color: '#94a3b8' },
                    { key: 'actual', color: '#3b82f6' }
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Velocity Chart */}
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

            {/* Task Completion Trends */}
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
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Team Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleBarChart 
                  data={teamPerformanceData}
                  dataKeys={[
                    { key: 'tasksCompleted', color: '#10b981', name: 'Tasks Completed' },
                    { key: 'efficiency', color: '#3b82f6', name: 'Efficiency %' }
                  ]}
                />
              </CardContent>
            </Card>

            {/* Individual Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamPerformanceData.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {member.member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{member.member}</h4>
                        <p className="text-sm text-muted-foreground">Team Member</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tasks Completed</span>
                        <span className="text-sm font-semibold">{member.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Efficiency</span>
                        <span className="text-sm font-semibold">{member.efficiency}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sprints' && (
          <div className="space-y-6">
            {/* Sprint Performance Overview */}
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
              {/* Sprint Velocity */}
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

              {/* Sprint Burndown */}
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

            {/* Sprint Details */}
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
          </div>
        )}

        {activeTab === 'milestones' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Project Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestoneData.map((milestone, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{milestone.milestone}</h4>
                      {getStatusBadge(milestone.status)}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Due: {milestone.dueDate}
                      </span>
                      <span className="text-sm font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'insights' && (
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
        )}
      </div>
    </div>
  );
};

export default ProjectStatusReport;