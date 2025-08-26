import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: {
    name: string;
    role: string;
    department: string;
    avatar: string;
    status: string;
    availableUntil: string;
  };
  getStatusColor: (status: string) => string;
}

const ProfileCard = ({ profile, getStatusColor }: ProfileCardProps) => {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Welcome back, {profile.name.split(' ')[0]}!</CardTitle>
            <p className="text-muted-foreground text-sm">Ready to be productive today?</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-16 h-16 ring-2 ring-primary/20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-lg font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background",
              getStatusColor(profile.status)
            )} />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <p className="text-muted-foreground">{profile.role}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {profile.department}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Available until {profile.availableUntil}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;