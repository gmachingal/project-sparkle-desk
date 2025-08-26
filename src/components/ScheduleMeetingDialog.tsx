import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MeetingDetailsForm } from "./meeting/MeetingDetailsForm";
import { AttendeeSelector } from "./meeting/AttendeeSelector";
import { LocationSelector } from "./meeting/LocationSelector";
import { MeetingSettings } from "./meeting/MeetingSettings";

interface ScheduleMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface MeetingData {
  title: string;
  date: Date | null;
  time: string;
  duration: string;
  type: string;
  description: string;
  attendees: string[];
  location: {
    type: 'video' | 'room';
    room?: string;
    details?: string;
  };
  settings: {
    sendCalendarInvite: boolean;
    enableRecording: boolean;
    requireApproval: boolean;
    sendReminder: boolean;
  };
}

const initialMeetingData: MeetingData = {
  title: "",
  date: null,
  time: "",
  duration: "",
  type: "",
  description: "",
  attendees: [],
  location: {
    type: 'video'
  },
  settings: {
    sendCalendarInvite: true,
    enableRecording: false,
    requireApproval: false,
    sendReminder: true,
  }
};

export function ScheduleMeetingDialog({ open, onOpenChange }: ScheduleMeetingDialogProps) {
  const [meetingData, setMeetingData] = useState<MeetingData>(initialMeetingData);
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

  const updateMeetingData = (updates: Partial<MeetingData>) => {
    setMeetingData(prev => ({ ...prev, ...updates }));
  };

  const handleSchedule = () => {
    // Basic validation
    if (!meetingData.title || !meetingData.date || !meetingData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in the meeting title, date, and time.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Meeting Scheduled",
      description: "Meeting has been scheduled and invites sent to attendees."
    });
    
    setMeetingData(initialMeetingData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setMeetingData(initialMeetingData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Schedule Meeting
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
          <div className="px-6 pt-2 shrink-0">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
              <TabsContent value="details" className="mt-0">
                <MeetingDetailsForm 
                  data={meetingData} 
                  onChange={updateMeetingData} 
                />
              </TabsContent>

              <TabsContent value="attendees" className="mt-0">
                <AttendeeSelector 
                  selectedAttendees={meetingData.attendees}
                  onChange={(attendees) => updateMeetingData({ attendees })}
                />
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <LocationSelector 
                  location={meetingData.location}
                  onChange={(location) => updateMeetingData({ location })}
                />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <MeetingSettings 
                  settings={meetingData.settings}
                  onChange={(settings) => updateMeetingData({ settings })}
                />
              </TabsContent>
            </div>

            <div className="flex justify-end gap-3 p-6 pt-4 border-t bg-background shrink-0">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSchedule}>
                Schedule Meeting
              </Button>
            </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}