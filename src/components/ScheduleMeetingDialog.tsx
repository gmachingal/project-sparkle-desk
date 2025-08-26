import { useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, Check, Users, MapPin, Settings, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

const WIZARD_STEPS = [
  { id: 1, title: "Meeting Details", description: "Basic meeting information", icon: CalendarIcon },
  { id: 2, title: "Select Attendees", description: "Choose meeting participants", icon: Users },
  { id: 3, title: "Choose Location", description: "Set meeting location", icon: MapPin },
  { id: 4, title: "Configure Settings", description: "Meeting preferences", icon: Settings },
  { id: 5, title: "Review & Schedule", description: "Confirm meeting details", icon: Eye }
];

export function ScheduleMeetingDialog({ open, onOpenChange }: ScheduleMeetingDialogProps) {
  const [meetingData, setMeetingData] = useState<MeetingData>(initialMeetingData);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const updateMeetingData = (updates: Partial<MeetingData>) => {
    setMeetingData(prev => ({ ...prev, ...updates }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return meetingData.title && meetingData.date && meetingData.time;
      case 2:
        return meetingData.attendees.length > 0;
      case 3:
        return true; // Location is optional
      case 4:
        return true; // Settings are optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length && canProceedToNextStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <MeetingDetailsForm 
              data={meetingData} 
              onChange={updateMeetingData} 
            />
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <AttendeeSelector 
              selectedAttendees={meetingData.attendees}
              onChange={(attendees) => updateMeetingData({ attendees })}
            />
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <LocationSelector 
              location={meetingData.location}
              onChange={(location) => updateMeetingData({ location })}
            />
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in">
            <MeetingSettings 
              settings={meetingData.settings}
              onChange={(settings) => updateMeetingData({ settings })}
            />
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Review Meeting Details</h3>
                <p className="text-muted-foreground">Please review all meeting information before scheduling</p>
              </div>
              
              <div className="grid gap-4">
                <div className="p-4 rounded-lg border bg-card/50">
                  <h4 className="font-medium mb-2">Meeting Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Title:</span> {meetingData.title}</p>
                    <p><span className="font-medium">Date:</span> {meetingData.date?.toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {meetingData.time}</p>
                    {meetingData.duration && <p><span className="font-medium">Duration:</span> {meetingData.duration} minutes</p>}
                    {meetingData.type && <p><span className="font-medium">Type:</span> {meetingData.type}</p>}
                  </div>
                </div>
                
                {meetingData.attendees.length > 0 && (
                  <div className="p-4 rounded-lg border bg-card/50">
                    <h4 className="font-medium mb-2">Attendees ({meetingData.attendees.length})</h4>
                    <div className="flex flex-wrap gap-1">
                      {meetingData.attendees.map((attendeeId, index) => (
                        <Badge key={attendeeId} variant="secondary" className="text-xs">
                          Attendee {index + 1}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4 rounded-lg border bg-card/50">
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-sm">
                    {meetingData.location.type === 'video' ? 'Video Call' : `Conference Room: ${meetingData.location.room}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
    setCurrentStep(1);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setMeetingData(initialMeetingData);
    setCurrentStep(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
          
          <DialogHeader className="relative p-6 pb-4 border-b shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold text-foreground">
                    Schedule Meeting
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and configure your meeting in {WIZARD_STEPS.length} simple steps
                  </p>
                </div>
              </div>
              
              {/* Current Step Badge */}
              <div className="hidden sm:flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1 bg-background/80 backdrop-blur">
                  Step {currentStep} of {WIZARD_STEPS.length}
                </Badge>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round((currentStep / WIZARD_STEPS.length) * 100)}% Complete</span>
              </div>
              <div className="relative">
                <Progress 
                  value={(currentStep / WIZARD_STEPS.length) * 100} 
                  className="h-2 bg-muted"
                />
                {/* Progress segments */}
                <div className="absolute top-0 left-0 w-full h-2 flex">
                  {WIZARD_STEPS.map((_, index) => (
                    <div 
                      key={index}
                      className="flex-1 border-r border-background last:border-r-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        {/* Enhanced Step Indicators */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-muted/30 to-transparent shrink-0">
          <div className="relative">
            {/* Step Navigation */}
            <div className="flex items-center justify-between relative">
              {WIZARD_STEPS.map((step, index) => {
                const IconComponent = step.icon;
                const status = getStepStatus(step.id);
                const isLast = index === WIZARD_STEPS.length - 1;
                
                return (
                  <div key={step.id} className="flex items-center relative z-10">
                    {/* Step Circle */}
                    <div className="flex flex-col items-center">
                      <div className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-sm
                        ${status === 'completed' 
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-200' 
                          : status === 'current'
                          ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-primary/20 scale-110'
                          : 'bg-gradient-to-br from-muted to-muted-foreground/20 text-muted-foreground'
                        }
                      `}>
                        {status === 'completed' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <IconComponent className="w-5 h-5" />
                        )}
                        
                        {/* Pulse animation for current step */}
                        {status === 'current' && (
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        )}
                      </div>
                      
                      {/* Step Info */}
                      <div className="mt-3 text-center max-w-[100px]">
                        <div className={`text-xs font-medium leading-tight ${
                          status === 'current' ? 'text-primary' : 
                          status === 'completed' ? 'text-green-600' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute top-6 left-12 w-full h-0.5 -z-10">
                        <div className={`h-full transition-all duration-500 ${
                          status === 'completed' ? 'bg-gradient-to-r from-green-500 to-primary' : 'bg-muted'
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Progress Line Background */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted -z-20" />
          </div>
          
          {/* Mobile Step Counter */}
          <div className="sm:hidden mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium">
                {WIZARD_STEPS.find(s => s.id === currentStep)?.title}
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {renderStepContent()}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center p-6 pt-4 border-t bg-background shrink-0">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? handleCancel : previousStep}
            className="flex items-center gap-2"
          >
            {currentStep === 1 ? (
              "Cancel"
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </>
            )}
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {WIZARD_STEPS.length}
          </div>

          {currentStep < WIZARD_STEPS.length ? (
            <Button 
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSchedule}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <CalendarIcon className="w-4 h-4" />
              Schedule Meeting
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}