import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AttendeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

// Mock attendee data
const mockAttendees: AttendeeData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Senior Developer",
    department: "Engineering",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    role: "UI/UX Designer",
    department: "Design",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@company.com",
    role: "Project Manager",
    department: "Management",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "QA Engineer",
    department: "Engineering",
    avatar: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma.brown@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@company.com",
    role: "Backend Developer",
    department: "Engineering",
    avatar: "/placeholder.svg"
  }
];

interface AttendeeSelectorProps {
  selectedAttendees: string[];
  onChange: (attendees: string[]) => void;
}

export function AttendeeSelector({ selectedAttendees, onChange }: AttendeeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAttendees = mockAttendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAttendee = (attendeeId: string) => {
    if (selectedAttendees.includes(attendeeId)) {
      onChange(selectedAttendees.filter(id => id !== attendeeId));
    } else {
      onChange([...selectedAttendees, attendeeId]);
    }
  };

  const removeAttendee = (attendeeId: string) => {
    onChange(selectedAttendees.filter(id => id !== attendeeId));
  };

  const getSelectedAttendeeData = () => {
    return mockAttendees.filter(attendee => selectedAttendees.includes(attendee.id));
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search attendees by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Selected Attendees */}
      {selectedAttendees.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3">Selected Attendees ({selectedAttendees.length})</h4>
          <div className="flex flex-wrap gap-2">
            {getSelectedAttendeeData().map((attendee) => (
              <Badge key={attendee.id} variant="secondary" className="flex items-center gap-2 py-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback className="text-xs">
                    {attendee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{attendee.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeAttendee(attendee.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Available Attendees */}
      <div>
        <h4 className="text-sm font-medium mb-3">Available Attendees</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={selectedAttendees.includes(attendee.id)}
                onCheckedChange={() => toggleAttendee(attendee.id)}
              />
              <Avatar className="h-8 w-8">
                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                <AvatarFallback className="text-xs">
                  {attendee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{attendee.name}</div>
                <div className="text-xs text-muted-foreground truncate">{attendee.email}</div>
                <div className="text-xs text-muted-foreground">
                  {attendee.role} • {attendee.department}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredAttendees.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <UserPlus className="mx-auto h-8 w-8 mb-2" />
          <p>No attendees found matching your search.</p>
        </div>
      )}
    </div>
  );
}