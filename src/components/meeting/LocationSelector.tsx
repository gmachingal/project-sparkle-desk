import { Video, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MeetingData } from "../ScheduleMeetingDialog";

interface LocationSelectorProps {
  location: MeetingData['location'];
  onChange: (location: MeetingData['location']) => void;
}

const conferenceRooms = [
  { id: "boardroom", name: "Boardroom", capacity: "12 people", features: ["Projector", "Video Conferencing", "Whiteboard"] },
  { id: "meeting-a", name: "Meeting Room A", capacity: "8 people", features: ["TV Screen", "Whiteboard", "Phone"] },
  { id: "meeting-b", name: "Meeting Room B", capacity: "6 people", features: ["TV Screen", "Whiteboard"] },
  { id: "huddle-1", name: "Huddle Room 1", capacity: "4 people", features: ["TV Screen", "Informal Setup"] },
  { id: "huddle-2", name: "Huddle Room 2", capacity: "4 people", features: ["TV Screen", "Informal Setup"] },
  { id: "conference-center", name: "Conference Center", capacity: "50 people", features: ["Projector", "Sound System", "Catering"] }
];

export function LocationSelector({ location, onChange }: LocationSelectorProps) {
  const selectedRoom = conferenceRooms.find(room => room.id === location.room);

  return (
    <div className="space-y-6">
      {/* Location Type Selection */}
      <div>
        <Label className="text-base font-medium">Meeting Location</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <Card 
            className={`cursor-pointer transition-all ${
              location.type === 'video' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onChange({ ...location, type: 'video', room: undefined })}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  location.type === 'video' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Video Call</div>
                  <div className="text-sm text-muted-foreground">Online meeting</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${
              location.type === 'room' 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => onChange({ ...location, type: 'room' })}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  location.type === 'room' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Conference Room</div>
                  <div className="text-sm text-muted-foreground">In-person meeting</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Room Selection - Only show for in-person meetings */}
      {location.type === 'room' && (
        <div className="space-y-4">
          <div>
            <Label>Select Conference Room</Label>
            <Select 
              value={location.room || ""} 
              onValueChange={(room) => onChange({ ...location, room })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a conference room" />
              </SelectTrigger>
              <SelectContent>
                {conferenceRooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{room.name}</span>
                      <span className="text-xs text-muted-foreground">{room.capacity}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Details */}
          {selectedRoom && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">{selectedRoom.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">Capacity: {selectedRoom.capacity}</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRoom.features.map((feature) => (
                        <span 
                          key={feature}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Additional Details */}
      <div>
        <Label htmlFor="location-details">
          {location.type === 'video' ? 'Meeting Link & Instructions' : 'Additional Location Details'}
        </Label>
        <Textarea
          id="location-details"
          placeholder={
            location.type === 'video' 
              ? "Meeting link will be auto-generated. Add any special instructions here..."
              : "Add building, floor, parking instructions, or special access requirements..."
          }
          value={location.details || ""}
          onChange={(e) => onChange({ ...location, details: e.target.value })}
          className="mt-2 min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
}