import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Space, SpaceMember, SpaceAnalytics } from "@/types/document";
import {
  ArrowLeft,
  Settings,
  UserPlus,
  BarChart,
  Users,
  FileText,
  MessageSquare,
  Edit,
  TrendingUp,
  Eye,
  Share,
  Archive,
  Globe,
  Lock,
} from "lucide-react";

interface SpaceDetailsProps {
  space: Space;
  members: SpaceMember[];
  analytics: SpaceAnalytics;
  onBack: () => void;
  onViewDocuments: () => void;
  onManageMembers: () => void;
  onSpaceSettings: () => void;
  onSpaceAnalytics: () => void;
}

const getVisibilityIcon = (visibility: string) => {
  switch (visibility) {
    case "public": return <Globe className="w-3 h-3" />;
    case "private": return <Lock className="w-3 h-3" />;
    case "team": return <Users className="w-3 h-3" />;
    default: return <Globe className="w-3 h-3" />;
  }
};

export const SpaceDetails = ({ space, members, analytics, onBack, onViewDocuments, onManageMembers, onSpaceSettings, onSpaceAnalytics }: SpaceDetailsProps) => {
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
                </Button> {space.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {getVisibilityIcon(space.visibility)}
                <span className="text-sm text-muted-foreground capitalize">
                  {space.visibility} space
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Space Actions - After clicking space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Primary Actions */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200 bg-blue-50/50" onClick={onViewDocuments}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">View Documents</h3>
                <p className="text-sm text-blue-700">Browse all documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200 bg-green-50/50" onClick={onManageMembers}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Manage Members</h3>
                <p className="text-sm text-green-700">Add or remove users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200 bg-purple-50/50" onClick={onSpaceSettings}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Space Settings</h3>
                <p className="text-sm text-purple-700">Configure space</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-orange-200 bg-orange-50/50" onClick={onSpaceAnalytics}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <BarChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900">Analytics</h3>
                <p className="text-sm text-orange-700">View usage stats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
          <FileText className="w-4 h-4" />
          New Document
        </Button>
        <Button variant="outline" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
          <Share className="w-4 h-4" />
          Share Space
        </Button>
        <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
          <Archive className="w-4 h-4" />
          Archive Space
        </Button>
      </div>

      {/* Space Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Views</span>
              <span className="font-semibold">{analytics.views}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Edits</span>
              <span className="font-semibold">{analytics.edits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Comments</span>
              <span className="font-semibold">{analytics.comments}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Growth</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {analytics.growth}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Members ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {members.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
              {members.length > 5 && (
                <Button variant="link" className="p-0 h-auto text-sm">
                  View all {members.length} members
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
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
                <Eye className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Total Views</span>
              </div>
              <span className="font-semibold">{analytics.views}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Comments</span>
              </div>
              <span className="font-semibold">{analytics.comments}</span>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
};