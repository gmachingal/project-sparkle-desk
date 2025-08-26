import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Space, SpaceAnalytics as SpaceAnalyticsType } from "@/types/document";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MessageSquare,
  Users,
  FileText,
  Calendar,
  Download,
  Share,
  Clock,
  Activity,
} from "lucide-react";

interface SpaceAnalyticsProps {
  space: Space;
  analytics: SpaceAnalyticsType;
  onBack: () => void;
}

export const SpaceAnalytics = ({ space, analytics, onBack }: SpaceAnalyticsProps) => {
  // Mock data for charts and detailed analytics
  const weeklyViews = [120, 145, 98, 156, 189, 167, 203];
  const topDocuments = [
    { name: "API Integration Guide", views: 234, engagement: 87 },
    { name: "Design System Updates", views: 189, engagement: 92 },
    { name: "Sprint Planning Template", views: 156, engagement: 76 },
    { name: "User Research Findings", views: 143, engagement: 89 },
    { name: "Performance Metrics", views: 98, engagement: 71 },
  ];

  const memberActivity = [
    { name: "Sarah Chen", actions: 45, lastActive: "2 hours ago" },
    { name: "Mike Rodriguez", actions: 38, lastActive: "4 hours ago" },
    { name: "Emily Davis", actions: 29, lastActive: "1 day ago" },
    { name: "Alex Johnson", actions: 22, lastActive: "2 days ago" },
  ];

  return (
    <>
      {/* Back Button Above Header */}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">           
                <Button variant="back" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 " />     
                </Button>
                Analytics</h1>
              <p className="text-sm text-muted-foreground">{space.name} performance insights</p>
            </div>
          </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">{analytics.growth}</span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Edits</p>
                <p className="text-2xl font-bold">{analytics.edits}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Edit className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+8%</span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">{analytics.comments}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+15%</span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{Math.round(space.members * 0.75)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600 font-medium">-2%</span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simple chart representation */}
                <div className="flex items-end justify-between h-32 gap-2">
                  {weeklyViews.map((views, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="bg-blue-500 rounded-t w-full"
                        style={{ height: `${(views / Math.max(...weeklyViews)) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Weekly views trend</span>
                  <span>Peak: {Math.max(...weeklyViews)} views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Documents</span>
              </div>
              <span className="font-semibold">{space.documents}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm">Members</span>
              </div>
              <span className="font-semibold">{space.members}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Avg. Daily Views</span>
              </div>
              <span className="font-semibold">{Math.round(analytics.views / 30)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Avg. Session</span>
              </div>
              <span className="font-semibold">4.2 min</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{doc.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{doc.views} views</span>
                      <Badge variant="secondary" className="text-xs">
                        {doc.engagement}% engagement
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">#{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Member Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Most Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberActivity.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{member.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{member.actions} actions</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
};