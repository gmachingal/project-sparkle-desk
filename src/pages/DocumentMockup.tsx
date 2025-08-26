import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { DocumentEditor } from "@/components/DocumentEditor";
import {
  FileText,
  Search,
  Plus,
  FolderOpen,
  Star,
  Clock,
  Users,
  Edit,
  Share,
  MoreHorizontal,
  Eye,
  MessageSquare,
  History,
  Download,
  Copy,
  Trash2,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Image,
  Table,
  Code,
  Link,
  Settings,
  Filter,
  Calendar,
  Tag,
  Archive,
  Globe,
  Lock,
  Heart,
  TrendingUp,
  FileImage,
  FileCode,
  FilePlus,
  Folder,
  Home,
  ArrowLeft,
  Upload,
  UserPlus
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  collaborators: string[];
  comments: number;
  views: number;
  likes: number;
  parent?: string;
  children?: string[];
  template?: string;
}

interface Space {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  documents: number;
  visibility: "public" | "private" | "team";
}

const DocumentMockup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "tree">("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedSpaceDetails, setSelectedSpaceDetails] = useState<string | null>(null);
  const [selectedDocumentView, setSelectedDocumentView] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data
  const spaces: Space[] = [
    {
      id: "product",
      name: "Product Documentation",
      description: "All product-related documentation and specifications",
      icon: "📱",
      color: "bg-blue-500",
      members: 12,
      documents: 45,
      visibility: "team"
    },
    {
      id: "engineering",
      name: "Engineering",
      description: "Technical documentation, APIs, and development guides",
      icon: "⚙️",
      color: "bg-green-500",
      members: 8,
      documents: 32,
      visibility: "private"
    },
    {
      id: "marketing",
      name: "Marketing Hub",
      description: "Brand guidelines, campaigns, and marketing assets",
      icon: "📢",
      color: "bg-purple-500",
      members: 15,
      documents: 28,
      visibility: "public"
    },
    {
      id: "hr",
      name: "HR & Policies",
      description: "Company policies, procedures, and HR documentation",
      icon: "👥",
      color: "bg-orange-500",
      members: 6,
      documents: 18,
      visibility: "team"
    }
  ];

  // Mock space members data
  const spaceMembers = {
    product: [
      { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
      { id: "2", name: "Mike Rodriguez", email: "mike@company.com", role: "Editor", avatar: "", status: "online", lastSeen: "2 min ago" },
      { id: "3", name: "Emily Davis", email: "emily@company.com", role: "Editor", avatar: "", status: "offline", lastSeen: "1 hour ago" },
      { id: "4", name: "Alex Johnson", email: "alex@company.com", role: "Viewer", avatar: "", status: "offline", lastSeen: "3 hours ago" }
    ],
    engineering: [
      { id: "5", name: "David Park", email: "david@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
      { id: "6", name: "Lisa Wang", email: "lisa@company.com", role: "Editor", avatar: "", status: "online", lastSeen: "5 min ago" }
    ],
    marketing: [
      { id: "7", name: "John Smith", email: "john@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
      { id: "8", name: "Anna Brown", email: "anna@company.com", role: "Editor", avatar: "", status: "offline", lastSeen: "30 min ago" }
    ],
    hr: [
      { id: "9", name: "Linda Brown", email: "linda@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" }
    ]
  };

  // Mock space analytics
  const spaceAnalytics = {
    product: { views: 1420, edits: 89, comments: 156, growth: "+12%" },
    engineering: { views: 891, edits: 134, comments: 98, growth: "+8%" },
    marketing: { views: 2103, edits: 67, comments: 203, growth: "+24%" },
    hr: { views: 567, edits: 23, comments: 45, growth: "+3%" }
  };

  const documents: Document[] = [
    {
      id: "1",
      title: "Product Requirements Document - Mobile App V2.0",
      content: "Comprehensive PRD for the next version of our mobile application...",
      author: "Sarah Chen",
      authorAvatar: "",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      status: "published",
      tags: ["PRD", "Mobile", "Product"],
      collaborators: ["john@company.com", "alice@company.com"],
      comments: 12,
      views: 145,
      likes: 8,
      template: "product-requirements"
    },
    {
      id: "2",
      title: "API Documentation - Authentication Service",
      content: "Complete API documentation for our authentication microservice...",
      author: "Mike Rodriguez",
      authorAvatar: "",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-22",
      status: "published",
      tags: ["API", "Authentication", "Backend"],
      collaborators: ["dev-team@company.com"],
      comments: 8,
      views: 89,
      likes: 12,
      template: "api-documentation"
    },
    {
      id: "3",
      title: "Brand Guidelines 2024",
      content: "Updated brand guidelines including new logo, colors, and typography...",
      author: "Emily Davis",
      authorAvatar: "",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-25",
      status: "published",
      tags: ["Brand", "Design", "Guidelines"],
      collaborators: ["design-team@company.com"],
      comments: 5,
      views: 203,
      likes: 15,
      template: "brand-guidelines"
    },
    {
      id: "4",
      title: "Sprint Retrospective - Q1 2024",
      content: "Retrospective notes and action items from Q1 sprints...",
      author: "Alex Johnson",
      authorAvatar: "",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      status: "draft",
      tags: ["Retrospective", "Sprint", "Team"],
      collaborators: ["team-leads@company.com"],
      comments: 3,
      views: 56,
      likes: 4,
      template: "meeting-notes"
    },
    {
      id: "5",
      title: "Employee Handbook - Remote Work Policy",
      content: "Updated remote work policies and guidelines for all employees...",
      author: "Linda Brown",
      authorAvatar: "",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-24",
      status: "published",
      tags: ["HR", "Policy", "Remote"],
      collaborators: ["hr@company.com"],
      comments: 7,
      views: 178,
      likes: 9,
      template: "policy-document"
    }
  ];

  const templates = [
    {
      id: "product-requirements",
      name: "Product Requirements Document",
      description: "Template for creating comprehensive PRDs",
      icon: FileText,
      category: "Product"
    },
    {
      id: "meeting-notes",
      name: "Meeting Notes",
      description: "Standard template for meeting documentation",
      icon: MessageSquare,
      category: "General"
    },
    {
      id: "api-documentation",
      name: "API Documentation",
      description: "Template for documenting APIs and technical specs",
      icon: Code,
      category: "Engineering"
    },
    {
      id: "policy-document",
      name: "Policy Document",
      description: "Template for company policies and procedures",
      icon: BookOpen,
      category: "HR"
    },
    {
      id: "brand-guidelines",
      name: "Brand Guidelines",
      description: "Template for brand and design documentation",
      icon: Image,
      category: "Design"
    },
    {
      id: "project-plan",
      name: "Project Plan",
      description: "Template for project planning and tracking",
      icon: Calendar,
      category: "Project Management"
    }
  ];

  const recentActivity = [
    { user: "Sarah Chen", action: "updated", document: "Product Requirements Document", time: "2 hours ago" },
    { user: "Mike Rodriguez", action: "created", document: "API Rate Limiting Guide", time: "4 hours ago" },
    { user: "Emily Davis", action: "commented on", document: "Brand Guidelines 2024", time: "6 hours ago" },
    { user: "Alex Johnson", action: "shared", document: "Sprint Retrospective", time: "1 day ago" },
    { user: "Linda Brown", action: "published", document: "Remote Work Policy", time: "2 days ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800 border-green-200";
      case "draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public": return <Globe className="w-3 h-3" />;
      case "private": return <Lock className="w-3 h-3" />;
      case "team": return <Users className="w-3 h-3" />;
      default: return <Globe className="w-3 h-3" />;
    }
  };

  const handleCreateDocument = () => {
    toast({
      title: "Document Created",
      description: "New document has been created successfully"
    });
    setIsCreateDialogOpen(false);
  };

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "Template Applied",
      description: `Document created using ${templates.find(t => t.id === templateId)?.name} template`
    });
    setIsTemplateDialogOpen(false);
  };

  const handleEditDocument = () => {
    setShowEditor(true);
  };

  const handleViewDocument = (documentId: string) => {
    setSelectedDocumentView(documentId);
  };

  const handleEditFromView = () => {
    setSelectedDocumentView(null);
    setShowEditor(true);
  };

  const handleBackToDocuments = () => {
    setSelectedDocumentView(null);
  };

  const handleSpaceClick = (spaceId: string) => {
    setSelectedSpaceDetails(spaceId);
  };

  const handleBackToSpaces = () => {
    setSelectedSpaceDetails(null);
  };

  if (selectedDocumentView) {
    const document = documents.find(doc => doc.id === selectedDocumentView);
    if (document) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-8">
            {/* Document View Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleBackToDocuments} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Documents
                </Button>
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
                <Button onClick={handleEditFromView} className="gap-2">
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
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {document.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{document.author}</p>
                        <p className="text-xs text-muted-foreground">Author</p>
                      </div>
                    </div>
                    {document.collaborators.map((collaborator, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {collaborator.split('@')[0].slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{collaborator}</p>
                          <p className="text-xs text-muted-foreground">Collaborator</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={handleEditFromView}>
                      <Edit className="w-4 h-4" />
                      Edit Document
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <History className="w-4 h-4" />
                      Version History
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (showEditor) {
    return <DocumentEditor onClose={() => setShowEditor(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Documentation Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, collaborate, and share knowledge across your organization
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Templates
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow">
                  <Plus className="w-4 h-4" />
                  Create Document
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Button variant="outline" onClick={handleEditDocument} className="gap-2">
              <Edit className="w-4 h-4" />
              Open Editor
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents, spaces, and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedSpace} onValueChange={setSelectedSpace}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Spaces" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="all">All Spaces</SelectItem>
                {spaces.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    <div className="flex items-center gap-2">
                      <span>{space.icon}</span>
                      {space.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="documents" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="spaces" className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Spaces
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Starred
                </TabsTrigger>
              </TabsList>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                {/* View Mode Selector - Only for Documents Tab */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">All Documents</h3>
                  <div className="flex items-center border rounded-lg">
                    <Button 
                      variant={viewMode === "grid" ? "default" : "ghost"} 
                      size="sm" 
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      Grid
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "default" : "ghost"} 
                      size="sm" 
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      List
                    </Button>
                    <Button 
                      variant={viewMode === "tree" ? "default" : "ghost"} 
                      size="sm" 
                      onClick={() => setViewMode("tree")}
                      className="rounded-l-none"
                    >
                      Tree
                    </Button>
                  </div>
                </div>
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-lg transition-all duration-200 group cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                {doc.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {doc.content}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Badge className={getStatusColor(doc.status)} variant="outline">
                              {doc.status}
                            </Badge>
                            <div className="flex gap-1">
                              {doc.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {doc.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{doc.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {doc.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{doc.author}</span>
                            </div>
                            <span>{doc.updatedAt}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {doc.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {doc.comments}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {doc.likes}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Star className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewDocument(doc.id)}>
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleEditDocument}>
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {viewMode === "list" && (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <FileText className="w-5 h-5 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                                  {doc.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-muted-foreground">{doc.author}</span>
                                  <Separator orientation="vertical" className="h-3" />
                                  <span className="text-sm text-muted-foreground">{doc.updatedAt}</span>
                                  <Badge className={getStatusColor(doc.status)} variant="outline">
                                    {doc.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {doc.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {doc.comments}
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={handleEditDocument}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {viewMode === "tree" && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Home className="w-4 h-4" />
                          Root
                        </div>
                        <div className="ml-4 space-y-1">
                          {documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded px-2 cursor-pointer group">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm group-hover:text-primary transition-colors flex-1 truncate">
                                {doc.title}
                              </span>
                              <Badge className={getStatusColor(doc.status)} variant="outline">
                                {doc.status}
                              </Badge>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100" onClick={() => handleViewDocument(doc.id)}>
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100" onClick={handleEditDocument}>
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Spaces Tab */}
              <TabsContent value="spaces" className="space-y-4">
                {selectedSpaceDetails ? (
                  // Space Details View
                  <div className="space-y-6">
                    {(() => {
                      const space = spaces.find(s => s.id === selectedSpaceDetails);
                      const members = spaceMembers[selectedSpaceDetails as keyof typeof spaceMembers] || [];
                      const analytics = spaceAnalytics[selectedSpaceDetails as keyof typeof spaceAnalytics];
                      const spaceDocuments = documents.filter(doc => 
                        selectedSpaceDetails === 'product' ? doc.tags.includes('Product') || doc.tags.includes('PRD') :
                        selectedSpaceDetails === 'engineering' ? doc.tags.includes('API') || doc.tags.includes('Backend') :
                        selectedSpaceDetails === 'marketing' ? doc.tags.includes('Brand') || doc.tags.includes('Design') :
                        selectedSpaceDetails === 'hr' ? doc.tags.includes('HR') || doc.tags.includes('Policy') :
                        false
                      );

                      return (
                        <>
                          {/* Space Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" onClick={handleBackToSpaces} className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Spaces
                              </Button>
                              <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-lg ${space?.color} flex items-center justify-center text-2xl`}>
                                  {space?.icon}
                                </div>
                                <div>
                                  <h2 className="text-2xl font-bold">{space?.name}</h2>
                                  <p className="text-muted-foreground">{space?.description}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" className="gap-2">
                                <Settings className="w-4 h-4" />
                                Settings
                              </Button>
                              <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                Add Document
                              </Button>
                            </div>
                          </div>

                          {/* Space Stats */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-primary" />
                                  <div>
                                    <p className="text-2xl font-bold">{spaceDocuments.length}</p>
                                    <p className="text-sm text-muted-foreground">Documents</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <Users className="w-5 h-5 text-primary" />
                                  <div>
                                    <p className="text-2xl font-bold">{members.length}</p>
                                    <p className="text-sm text-muted-foreground">Members</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <Eye className="w-5 h-5 text-primary" />
                                  <div>
                                    <p className="text-2xl font-bold">{analytics?.views || 0}</p>
                                    <p className="text-sm text-muted-foreground">Total Views</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5 text-green-500" />
                                  <div>
                                    <p className="text-2xl font-bold">{analytics?.growth || "+0%"}</p>
                                    <p className="text-sm text-muted-foreground">Growth</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Documents in Space */}
                            <div className="lg:col-span-2 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Documents</h3>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Filter className="w-4 h-4" />
                                  Filter
                                </Button>
                              </div>
                              <div className="space-y-3">
                                {spaceDocuments.map((doc) => (
                                  <Card key={doc.id} className="hover:shadow-md transition-all duration-200 group cursor-pointer">
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                          <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium group-hover:text-primary transition-colors">
                                              {doc.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                              {doc.content}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                              <div className="flex items-center gap-1">
                                                <Avatar className="w-4 h-4">
                                                  <AvatarFallback className="text-xs">
                                                    {doc.author.split(' ').map(n => n[0]).join('')}
                                                  </AvatarFallback>
                                                </Avatar>
                                                {doc.author}
                                              </div>
                                              <span>{doc.updatedAt}</span>
                                              <Badge className={getStatusColor(doc.status)} variant="outline">
                                                {doc.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Star className="w-4 h-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Share className="w-4 h-4" />
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>

                            {/* Space Sidebar */}
                            <div className="space-y-6">
                              {/* Members */}
                              <Card>
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Members</CardTitle>
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <UserPlus className="w-4 h-4" />
                                      Invite
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  {members.map((member) => (
                                    <div key={member.id} className="flex items-center gap-3">
                                      <div className="relative">
                                        <Avatar className="w-8 h-8">
                                          <AvatarFallback className="text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                                          member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                        }`} />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{member.name}</p>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-xs h-4">
                                            {member.role}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            {member.status === 'online' ? 'Online' : member.lastSeen}
                                          </span>
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </CardContent>
                              </Card>

                              {/* Analytics */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Analytics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Views</span>
                                    <span className="font-medium">{analytics?.views || 0}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Edits</span>
                                    <span className="font-medium">{analytics?.edits || 0}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Comments</span>
                                    <span className="font-medium">{analytics?.comments || 0}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Growth</span>
                                    <span className="font-medium text-green-600">{analytics?.growth || "+0%"}</span>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Quick Actions */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <Button variant="outline" className="w-full justify-start gap-2">
                                    <FilePlus className="w-4 h-4" />
                                    Create Document
                                  </Button>
                                  <Button variant="outline" className="w-full justify-start gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    Invite Member
                                  </Button>
                                  <Button variant="outline" className="w-full justify-start gap-2">
                                    <Archive className="w-4 h-4" />
                                    Archive Space
                                  </Button>
                                  <Button variant="outline" className="w-full justify-start gap-2">
                                    <Settings className="w-4 h-4" />
                                    Space Settings
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  // Spaces Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {spaces.map((space) => (
                      <Card key={space.id} className="hover:shadow-lg transition-all duration-200 group cursor-pointer" onClick={() => handleSpaceClick(space.id)}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${space.color} flex items-center justify-center text-2xl`}>
                              {space.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {space.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {space.description}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {space.members} members
                                </div>
                                <div className="flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  {space.documents} docs
                                </div>
                                <div className="flex items-center gap-1">
                                  {getVisibilityIcon(space.visibility)}
                                  {space.visibility}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Recent Tab */}
              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              {' '}{activity.action}{' '}
                              <span className="font-medium text-primary">{activity.document}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Starred Tab */}
              <TabsContent value="starred" className="space-y-4">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No starred documents yet</h3>
                    <p className="text-muted-foreground">
                      Star documents to quickly access them later
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsCreateDialogOpen(true)}>
                  <FilePlus className="w-4 h-4" />
                  Create Page
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Folder className="w-4 h-4" />
                  New Space
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="w-4 h-4" />
                  Upload File
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setIsTemplateDialogOpen(true)}>
                  <BookOpen className="w-4 h-4" />
                  Browse Templates
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleEditDocument}>
                  <Edit className="w-4 h-4" />
                  Open Editor
                </Button>
              </CardContent>
            </Card>

            {/* Popular Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.slice(0, 4).map((template) => (
                  <div key={template.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <template.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Documents Created</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <span className="font-medium">56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Collaborations</span>
                  <span className="font-medium">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Create Document Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" placeholder="Enter document title..." />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="space">Space</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {spaces.map((space) => (
                      <SelectItem key={space.id} value={space.id}>
                        <div className="flex items-center gap-2">
                          <span>{space.icon}</span>
                          {space.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="template">Template (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="blank">Blank Document</SelectItem>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the document..." />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDocument}>
                Create Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Templates Dialog */}
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Choose a Template</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => handleUseTemplate(template.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <template.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DocumentMockup;