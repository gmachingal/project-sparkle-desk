import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Table,
  Code,
  Quote,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Save,
  Share,
  Eye,
  MessageSquare,
  Users,
  Clock,
  MoreHorizontal,
  ChevronDown,
  Plus,
  Settings,
  History,
  Download,
  Printer,
  Star,
  Bookmark,
  Tag,
  Globe,
  Lock,
  UserPlus,
  Send,
  Bell,
  Check,
  X,
  Edit,
  MessageCircle,
  Paperclip,
  Smile,
  Circle,
  ArrowLeft
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  position?: number;
  resolved: boolean;
  replies?: Comment[];
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "editor" | "viewer" | "commenter";
  status: "online" | "offline";
  cursor?: { position: number; color: string };
}

export function DocumentEditor({ onClose }: { onClose?: () => void }) {
  const [title, setTitle] = useState("Product Requirements Document - Mobile App V2.0");
  const [content, setContent] = useState(`# Product Requirements Document

## Overview
This document outlines the requirements for version 2.0 of our mobile application...

## Objectives
- Improve user experience with a redesigned interface
- Add new features based on user feedback
- Enhance performance and reliability

## User Stories
1. As a user, I want to easily navigate through the app
2. As a user, I want faster loading times
3. As a user, I want access to new productivity features

## Technical Requirements
- iOS 14+ and Android 10+ support
- Offline functionality for core features
- Improved security measures`);
  
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      avatar: "",
      content: "Should we also consider tablet optimization for this version?",
      timestamp: "2 hours ago",
      resolved: false,
      position: 150
    },
    {
      id: "2",
      author: "Mike Rodriguez",
      avatar: "",
      content: "The technical requirements look comprehensive. Let's add specific performance metrics.",
      timestamp: "4 hours ago",
      resolved: false,
      position: 580,
      replies: [
        {
          id: "2-1",
          author: "Alex Johnson",
          avatar: "",
          content: "Good point! I'll add specific load time targets.",
          timestamp: "3 hours ago",
          resolved: false
        }
      ]
    }
  ]);

  const [collaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@company.com",
      avatar: "",
      role: "editor",
      status: "online",
      cursor: { position: 120, color: "#3B82F6" }
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      email: "mike@company.com",
      avatar: "",
      role: "editor",
      status: "online",
      cursor: { position: 320, color: "#10B981" }
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@company.com",
      avatar: "",
      role: "commenter",
      status: "offline"
    },
    {
      id: "4",
      name: "Alex Johnson",
      email: "alex@company.com",
      avatar: "",
      role: "viewer",
      status: "online"
    }
  ]);

  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const versions = [
    { id: "v3", version: "Current", author: "You", time: "Just now", changes: "Updated technical requirements" },
    { id: "v2", version: "Version 2", author: "Sarah Chen", time: "2 hours ago", changes: "Added user stories section" },
    { id: "v1", version: "Version 1", author: "Mike Rodriguez", time: "1 day ago", changes: "Initial draft created" }
  ];

  const handleSave = () => {
    toast({
      title: "Document Saved",
      description: "All changes have been saved successfully"
    });
  };

  const handleShare = () => {
    toast({
      title: "Sharing Options",
      description: "Document sharing settings updated"
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "",
      content: newComment,
      timestamp: "Just now",
      resolved: false,
      position: 0
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the document"
    });
  };

  const handleResolveComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, resolved: !comment.resolved }
        : comment
    ));
  };

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-400";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "editor": return "bg-blue-100 text-blue-800";
      case "commenter": return "bg-yellow-100 text-yellow-800";
      case "viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onClose && (
                <Button variant="outline" size="sm" onClick={onClose} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Hub
                </Button>
              )}
              <div className="flex items-center gap-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-none bg-transparent p-0 h-auto focus-visible:ring-0"
              />
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Published
              </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Collaborators */}
              <div className="flex items-center -space-x-2">
                {collaborators.slice(0, 4).map((collaborator) => (
                  <div key={collaborator.id} className="relative">
                    <Avatar className="w-8 h-8 border-2 border-background">
                      <AvatarFallback className="text-xs">
                        {collaborator.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator.status)}`} />
                  </div>
                ))}
                {collaborators.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                    +{collaborators.length - 4}
                  </div>
                )}
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                {comments.length}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => setShowVersionHistory(!showVersionHistory)}>
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="min-h-[800px]">
              {/* Toolbar */}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex items-center gap-1 border-r pr-2 mr-2">
                    <Button variant="ghost" size="sm">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 border-r pr-2 mr-2">
                    <Button variant="ghost" size="sm">
                      <Heading1 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading3 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 border-r pr-2 mr-2">
                    <Button variant="ghost" size="sm">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 border-r pr-2 mr-2">
                    <Button variant="ghost" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Table className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Quote className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {/* Editor Content */}
              <CardContent className="pt-0">
                <div className="relative">
                  <Textarea
                    ref={editorRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[600px] border-none resize-none focus-visible:ring-0 text-base leading-relaxed"
                    placeholder="Start writing..."
                  />
                  
                  {/* Collaborative Cursors */}
                  {collaborators.map((collaborator) => (
                    collaborator.cursor && collaborator.status === "online" && (
                      <div
                        key={collaborator.id}
                        className="absolute w-0.5 h-6 animate-pulse"
                        style={{
                          backgroundColor: collaborator.cursor.color,
                          top: `${Math.min(collaborator.cursor.position, 500)}px`,
                          left: "20px"
                        }}
                      >
                        <div
                          className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                          style={{ backgroundColor: collaborator.cursor.color }}
                        >
                          {collaborator.name}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Comments Panel */}
            {showComments && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Comments ({comments.length})
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setShowComments(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Comment */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setNewComment("")}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleAddComment}>
                        <Send className="w-3 h-3 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Comments List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id} className={`p-3 rounded-lg border ${comment.resolved ? 'bg-muted/50' : 'bg-background'}`}>
                        <div className="flex items-start gap-3">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground ml-2">{comment.timestamp}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResolveComment(comment.id)}
                                className="h-6 w-6 p-0"
                              >
                                {comment.resolved ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Circle className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            
                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-4 space-y-2 border-l pl-3">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start gap-2">
                                    <Avatar className="w-5 h-5">
                                      <AvatarFallback className="text-xs">
                                        {reply.author.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-xs">{reply.author}</span>
                                        <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                      </div>
                                      <p className="text-xs mt-1">{reply.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Version History */}
            {showVersionHistory && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Version History
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setShowVersionHistory(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {versions.map((version) => (
                    <div key={version.id} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{version.version}</span>
                        <span className="text-xs text-muted-foreground">{version.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{version.author}</p>
                      <p className="text-xs mt-1">{version.changes}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Collaborators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Collaborators ({collaborators.length})
                  </span>
                  <Button variant="ghost" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {collaborator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator.status)}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{collaborator.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(collaborator.role)} variant="outline">
                          {collaborator.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{collaborator.status}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>Jan 15, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Modified</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Word Count</span>
                  <span>1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reading Time</span>
                  <span>5 min</span>
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Printer className="w-3 h-3 mr-1" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}