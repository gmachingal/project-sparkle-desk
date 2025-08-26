import { 
  Mail, 
  Video, 
  UserCheck, 
  Bell,
  Clock,
  Shield,
  Users,
  Calendar
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MeetingData } from "../ScheduleMeetingDialog";

interface MeetingSettingsProps {
  settings: MeetingData['settings'];
  onChange: (settings: MeetingData['settings']) => void;
}

export function MeetingSettings({ settings, onChange }: MeetingSettingsProps) {
  const updateSetting = (key: keyof MeetingData['settings'], value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Communication Settings */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Communication
        </h4>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Send Calendar Invitation</Label>
                  <p className="text-xs text-muted-foreground">
                    Email calendar invites to all attendees with meeting details
                  </p>
                </div>
                <Switch
                  checked={settings.sendCalendarInvite}
                  onCheckedChange={(checked) => updateSetting('sendCalendarInvite', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Send Reminder</Label>
                  <p className="text-xs text-muted-foreground">
                    Send reminder notifications before the meeting
                  </p>
                </div>
                <Switch
                  checked={settings.sendReminder}
                  onCheckedChange={(checked) => updateSetting('sendReminder', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meeting Controls */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Video className="w-4 h-4" />
          Meeting Controls
        </h4>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Enable Recording</Label>
                  <p className="text-xs text-muted-foreground">
                    Record the meeting for later review and sharing
                  </p>
                </div>
                <Switch
                  checked={settings.enableRecording}
                  onCheckedChange={(checked) => updateSetting('enableRecording', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Require Approval</Label>
                  <p className="text-xs text-muted-foreground">
                    Attendees must confirm attendance before joining
                  </p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Options */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Additional Options
        </h4>
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium">Reminder Timing</Label>
            <Select defaultValue="15">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="5">5 minutes before</SelectItem>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Meeting Priority</Label>
            <Select defaultValue="normal">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Time Zone</Label>
            <Select defaultValue="local">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="local">Local Time</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="cst">Central Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}