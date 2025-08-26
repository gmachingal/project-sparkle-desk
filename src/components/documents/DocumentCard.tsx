import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Document } from "@/types/document";
import { getStatusColor } from "@/utils/documentUtils";
import {
  FileText,
  Star,
  Eye,
  MessageSquare,
  Edit,
  Share,
  MoreHorizontal,
  Heart,
} from "lucide-react";

interface DocumentCardProps {
  document: Document;
  onView: (id: string) => void;
  onEdit: () => void;
}

export const DocumentCard = ({ document, onView, onEdit }: DocumentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <Badge className={getStatusColor(document.status)} variant="outline">
              {document.status}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <h3 
          className="font-semibold text-lg leading-tight hover:text-blue-600 transition-colors"
          onClick={() => onView(document.id)}
        >
          {document.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {document.content}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs">
                {document.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{document.author}</span>
          </div>
          <span className="text-xs text-muted-foreground">{document.updatedAt}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {document.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {document.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{document.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {document.views}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {document.comments}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {document.likes}
            </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="gap-1">
              <Star className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Share className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1" onClick={onEdit}>
              <Edit className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};