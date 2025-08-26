import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Space, Document } from "@/types/document";
import { getStatusColor } from "@/utils/documentUtils";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  FileText,
  Star,
  Eye,
  MessageSquare,
  Heart,
  Edit,
  Share,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react";

interface ViewDocumentsProps {
  space: Space;
  documents: Document[];
  onBack: () => void;
  onViewDocument: (id: string) => void;
  onEditDocument: () => void;
}

export const ViewDocuments = ({ space, documents, onBack, onViewDocument, onEditDocument }: ViewDocumentsProps) => {
  return (
    <>
      {/* Back Button Above Header */}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">
                <Button variant="back" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 " />     
                </Button>

                {space.name} Documents</h1>
              <p className="text-sm text-muted-foreground">{documents.length} documents in this space</p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-2 items-center max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents in this space..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="recent">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Modified</SelectItem>
              <SelectItem value="created">Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow cursor-pointer group">
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
                className="font-semibold text-lg leading-tight hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => onViewDocument(document.id)}
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
                  <Button variant="ghost" size="sm" className="gap-1" onClick={onEditDocument}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first document in this space to get started.
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Document
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
    </>
  );
};