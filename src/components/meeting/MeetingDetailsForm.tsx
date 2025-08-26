import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MeetingData } from "../ScheduleMeetingDialog";

interface MeetingDetailsFormProps {
  data: MeetingData;
  onChange: (updates: Partial<MeetingData>) => void;
}

export function MeetingDetailsForm({ data, onChange }: MeetingDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="meeting-title">Meeting Title *</Label>
        <Input
          id="meeting-title"
          placeholder="Enter meeting title..."
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal mt-2",
                  !data.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.date ? format(data.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.date || undefined}
                onSelect={(date) => onChange({ date: date || null })}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="meeting-time">Time *</Label>
          <Input
            id="meeting-time"
            type="time"
            value={data.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Duration</Label>
          <Select value={data.duration} onValueChange={(duration) => onChange({ duration })}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="180">3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Meeting Type</Label>
          <Select value={data.type} onValueChange={(type) => onChange({ type })}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select meeting type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team-standup">Team Standup</SelectItem>
              <SelectItem value="project-review">Project Review</SelectItem>
              <SelectItem value="training">Training Session</SelectItem>
              <SelectItem value="one-on-one">One-on-One</SelectItem>
              <SelectItem value="all-hands">All Hands</SelectItem>
              <SelectItem value="client-meeting">Client Meeting</SelectItem>
              <SelectItem value="brainstorming">Brainstorming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="meeting-description">Description</Label>
        <Textarea
          id="meeting-description"
          placeholder="Enter meeting agenda or description..."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="mt-2 min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
}