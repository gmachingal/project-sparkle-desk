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
    budget: 150000,
    spent: 117000,
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
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Project Status Report
              </h1>
              <p className="text-muted-foreground mt-1">
                {project.name} - Comprehensive Performance Analysis
              </p>
            </div>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Overall Progress"
            value={`${project.progress}%`}
            description="Project completion"
            icon={Target}
            trend={{ value: 5.2, positive: true }}
          />
          <StatsCard
            title="Budget Used"
            value={`$${(project.spent / 1000).toFixed(0)}k`}
            description={`of $${(project.budget / 1000)}k total`}
            icon={TrendingUp}
            trend={{ value: 2.1, positive: false }}
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Budget Utilization</span>
                    <span className="text-sm font-semibold">{Math.round((project.spent / project.budget) * 100)}%</span>
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
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Progress Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress metrics would go here */}
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Detailed Progress Tracking</h3>
                    <p className="text-muted-foreground">
                      Sprint-wise progress analysis and velocity charts will be displayed here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Performance
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
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
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
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Budget Attention Needed</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          78% of budget used with 22% project remaining. Monitor spending closely.
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
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h4 className="font-medium">Budget Control</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement stricter budget monitoring for remaining phases.
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