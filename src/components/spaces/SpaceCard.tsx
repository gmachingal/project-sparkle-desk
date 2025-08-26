import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Space } from "@/types/document";
import { Globe, Lock, Users, Settings, MoreHorizontal, FileText } from "lucide-react";

interface SpaceCardProps {
  space: Space;
  onClick: (spaceId: string) => void;
}

const getVisibilityIcon = (visibility: string) => {
  switch (visibility) {
    case "public": return <Globe className="w-3 h-3" />;
    case "private": return <Lock className="w-3 h-3" />;
    case "team": return <Users className="w-3 h-3" />;
    default: return <Globe className="w-3 h-3" />;
  }
};

export const SpaceCard = ({ space, onClick }: SpaceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onClick(space.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${space.color} flex items-center justify-center text-white text-lg`}>
              {space.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{space.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {getVisibilityIcon(space.visibility)}
                <span className="text-xs text-muted-foreground capitalize">
                  {space.visibility}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {space.description}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {space.members} members
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {space.documents} docs
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};