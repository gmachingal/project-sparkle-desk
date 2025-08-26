import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Document } from "@/types/document";
import { getStatusColor } from "@/utils/documentUtils";
import {
  ArrowLeft,
  Star,
  Share,
  Edit,
} from "lucide-react";

interface DocumentViewProps {
  document: Document;
  onBack: () => void;
  onEdit: () => void;
}

export const DocumentView = ({ document, onBack, onEdit }: DocumentViewProps) => {
  return (
    <>
      {/* Back Button Above Header */}
      
        <div className="container mx-auto px-4 py-3">
          <Button variant="back" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
        </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Document View Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{document.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {document.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>By {document.author}</span>
              </div>
              <span>Updated {document.updatedAt}</span>
              <Badge className={getStatusColor(document.status)} variant="outline">
                {document.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Star className="w-4 h-4" />
              Star
            </Button>
            <Button variant="outline" className="gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button onClick={onEdit} className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>

        {/* Document Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {document.content}
                    
                    {/* Extended content for demo */}
                    <div className="mt-8 space-y-4">
                      <h2 className="text-xl font-semibold">Overview</h2>
                      <p>This document outlines the requirements for version 2.0 of our mobile application. The new version focuses on improving user experience, adding requested features, and enhancing overall performance.</p>
                      
                      <h2 className="text-xl font-semibold">Key Features</h2>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Redesigned user interface with modern aesthetics</li>
                        <li>Enhanced navigation system for better user flow</li>
                        <li>New productivity features based on user feedback</li>
                        <li>Improved performance and loading times</li>
                        <li>Enhanced security measures and data protection</li>
                      </ul>

                      <h2 className="text-xl font-semibold">Technical Specifications</h2>
                      <p>The application will support iOS 14+ and Android 10+, with offline functionality for core features and improved security measures throughout the platform.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Sidebar */}
          <div className="space-y-6">
            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(document.status)} variant="outline">
                    {document.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="font-medium">{document.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <span className="font-medium">{document.comments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="font-medium">{document.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-medium">{document.createdAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collaborators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collaborators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {document.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {collaborator.split('@')[0].substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{collaborator}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};