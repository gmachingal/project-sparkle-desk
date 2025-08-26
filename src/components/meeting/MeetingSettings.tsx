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
    <div className="space-y-6 max-h-full overflow-y-auto">
      {/* Communication Settings */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
          <Mail className="w-4 h-4" />
          Communication Settings
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex-1">
              <Label className="text-sm font-medium">Calendar Invitation</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Send email invites to attendees
              </p>
            </div>
            <Switch
              checked={settings.sendCalendarInvite}
              onCheckedChange={(checked) => updateSetting('sendCalendarInvite', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex-1">
              <Label className="text-sm font-medium">Meeting Reminders</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Send notifications before meeting
              </p>
            </div>
            <Switch
              checked={settings.sendReminder}
              onCheckedChange={(checked) => updateSetting('sendReminder', checked)}
            />
          </div>
        </div>
      </div>

      {/* Meeting Controls */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
          <Video className="w-4 h-4" />
          Meeting Controls
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex-1">
              <Label className="text-sm font-medium">Recording</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Record meeting for later review
              </p>
            </div>
            <Switch
              checked={settings.enableRecording}
              onCheckedChange={(checked) => updateSetting('enableRecording', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
            <div className="flex-1">
              <Label className="text-sm font-medium">Approval Required</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Attendees must confirm attendance
              </p>
            </div>
            <Switch
              checked={settings.requireApproval}
              onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
            />
          </div>
        </div>
      </div>

      {/* Quick Settings Grid */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-primary">
          <Shield className="w-4 h-4" />
          Meeting Preferences
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="normal">Normal Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="text-sm font-medium">Time Zone</Label>
            <Select defaultValue="local">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="local">Local Time</SelectItem>
                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="est">Eastern Time (EST/EDT)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST/PDT)</SelectItem>
                <SelectItem value="cst">Central Time (CST/CDT)</SelectItem>
                <SelectItem value="mst">Mountain Time (MST/MDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}