import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Space } from "@/types/document";
import {
  ArrowLeft,
  Settings,
  Globe,
  Lock,
  Users,
  Trash2,
  AlertTriangle,
  Save,
  Eye,
  Edit,
  MessageSquare,
  Bell,
  Shield,
} from "lucide-react";

interface SpaceSettingsProps {
  space: Space;
  onBack: () => void;
}

export const SpaceSettings = ({ space, onBack }: SpaceSettingsProps) => {
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
                </Button> Space Settings</h1>
              <p className="text-sm text-muted-foreground">Configure {space.name} workspace</p>
            </div>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spaceName">Space Name</Label>
                <Input id="spaceName" defaultValue={space.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={space.description}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spaceIcon">Space Icon</Label>
                <Select defaultValue="current">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">{space.icon} Current Icon</SelectItem>
                    <SelectItem value="folder">📁 Folder</SelectItem>
                    <SelectItem value="chart">📊 Chart</SelectItem>
                    <SelectItem value="design">🎨 Design</SelectItem>
                    <SelectItem value="code">⚙️ Code</SelectItem>
                    <SelectItem value="mobile">📱 Mobile</SelectItem>
                    <SelectItem value="marketing">📢 Marketing</SelectItem>
                    <SelectItem value="people">👥 People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Access */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue={space.visibility}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Public - Anyone in organization can view
                      </div>
                    </SelectItem>
                    <SelectItem value="team">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Team - Team members only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Private - Invite only
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow external sharing</Label>
                    <p className="text-sm text-muted-foreground">Members can share documents outside the organization</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval for new members</Label>
                    <p className="text-sm text-muted-foreground">Admin approval needed for new member requests</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow member invitations</Label>
                    <p className="text-sm text-muted-foreground">Members can invite others to this space</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Document Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable comments</Label>
                  <p className="text-sm text-muted-foreground">Allow comments on documents</p>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Version history</Label>
                  <p className="text-sm text-muted-foreground">Track document version changes</p>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-save documents</Label>
                  <p className="text-sm text-muted-foreground">Automatically save document changes</p>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="space-y-2">
                <Label>Default document template</Label>
                <Select defaultValue="blank">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blank">Blank Document</SelectItem>
                    <SelectItem value="meeting">Meeting Notes</SelectItem>
                    <SelectItem value="project">Project Plan</SelectItem>
                    <SelectItem value="requirements">Requirements Doc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-red-600">Archive Space</Label>
                <p className="text-sm text-muted-foreground">
                  Archive this space and all its contents. This action can be reversed.
                </p>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  Archive Space
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-red-600">Delete Space</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this space and all its contents. This action cannot be undone.
                </p>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Space
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Visibility</span>
                <Badge variant="outline" className="gap-1 capitalize">
                  {space.visibility === 'public' && <Globe className="w-3 h-3" />}
                  {space.visibility === 'private' && <Lock className="w-3 h-3" />}
                  {space.visibility === 'team' && <Users className="w-3 h-3" />}
                  {space.visibility}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Members</span>
                <span className="font-medium">{space.members}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Documents</span>
                <span className="font-medium">{space.documents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="font-medium">Jan 15, 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-sm">All members can view</span>
              </div>
              <div className="flex items-center gap-3">
                <Edit className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Editors can modify</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Comments enabled</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Admin approval required</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Description updated</p>
                <p className="text-muted-foreground">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Member added</p>
                <p className="text-muted-foreground">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Privacy settings changed</p>
                <p className="text-muted-foreground">3 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
};