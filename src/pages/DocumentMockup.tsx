import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  Download, 
  Eye, 
  Trash2, 
  Plus,
  FolderOpen,
  Calendar,
  User,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const DocumentMockup = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mock documents data
  const projectDocuments = [
    {
      id: '1',
      name: 'Project Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'John Smith',
      uploadedAt: new Date('2024-01-15'),
      category: 'Requirements'
    },
    {
      id: '2',
      name: 'Design Mockups.figma',
      type: 'design',
      size: '15.7 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: new Date('2024-01-20'),
      category: 'Design'
    },
    {
      id: '3',
      name: 'Technical Specifications.docx',
      type: 'document',
      size: '892 KB',
      uploadedBy: 'Mike Chen',
      uploadedAt: new Date('2024-01-25'),
      category: 'Technical'
    },
    {
      id: '4',
      name: 'User Journey Map.png',
      type: 'image',
      size: '3.2 MB',
      uploadedBy: 'Emily Davis',
      uploadedAt: new Date('2024-01-28'),
      category: 'Research'
    }
  ];

  const taskDocuments = [
    {
      id: '1',
      name: 'Wireframe Draft v1.sketch',
      type: 'design',
      size: '4.1 MB',
      uploadedBy: 'You',
      uploadedAt: new Date('2024-01-30'),
      taskPhase: 'Design Phase'
    },
    {
      id: '2',
      name: 'Content Guidelines.pdf',
      type: 'pdf',
      size: '1.8 MB',
      uploadedBy: 'Content Team',
      uploadedAt: new Date('2024-02-01'),
      taskPhase: 'Content Phase'
    },
    {
      id: '3',
      name: 'Approval Screenshot.png',
      type: 'image',
      size: '567 KB',
      uploadedBy: 'Project Manager',
      uploadedAt: new Date('2024-02-03'),
      taskPhase: 'Review Phase'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'image':
        return <Image className="w-8 h-8 text-green-500" />;
      case 'design':
        return <File className="w-8 h-8 text-purple-500" />;
      default:
        return <File className="w-8 h-8 text-blue-500" />;
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                Document Management Mockup
              </h1>
              <p className="text-muted-foreground mt-1">
                Upload and manage documents for projects and tasks
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
            Demo Mode
          </Badge>
        </div>

        <Tabs defaultValue="project" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="project">Project Documents</TabsTrigger>
            <TabsTrigger value="task">Task Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="project" className="space-y-6">
            {/* Project Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  Website Redesign Project - Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Zone */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-primary bg-primary/10 scale-105' 
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    simulateUpload();
                  }}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Upload Project Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop files here or click to browse
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button onClick={simulateUpload}>
                      <Plus className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                    <Badge variant="outline">
                      Supports: PDF, DOC, XLS, IMG, Figma
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 50MB per file
                  </p>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Uploading: New Document.pdf</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">{uploadProgress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Documents List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Documents ({projectDocuments.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{projectDocuments.reduce((acc, doc) => acc + parseFloat(doc.size), 0).toFixed(1)} MB total</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {doc.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {doc.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{doc.uploadedBy}</span>
                          <Clock className="w-3 h-3 ml-2" />
                          <span>{format(doc.uploadedAt, 'MMM dd')}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mt-3">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="task" className="space-y-6">
            {/* Task Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Task: Design Homepage Layout - Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Zone for Task */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                    isDragging 
                      ? 'border-primary bg-primary/10 scale-105' 
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    simulateUpload();
                  }}
                >
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Upload Task Documents</h3>
                  <p className="text-muted-foreground mb-3">
                    Add documents specific to this task
                  </p>
                  <Button onClick={simulateUpload} className="mb-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Files
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Attach progress updates, designs, or reference materials
                  </p>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Upload className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Uploading task document...</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Task Documents List */}
            <Card>
              <CardHeader>
                <CardTitle>Task Documents by Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['Design Phase', 'Content Phase', 'Review Phase'].map((phase) => {
                    const phaseDocuments = taskDocuments.filter(doc => doc.taskPhase === phase);
                    return (
                      <div key={phase}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="font-medium">
                            {phase}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ({phaseDocuments.length} {phaseDocuments.length === 1 ? 'document' : 'documents'})
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phaseDocuments.map((doc) => (
                            <Card key={doc.id} className="hover:shadow-md transition-all duration-300 group border-l-4 border-l-primary">
                              <CardContent className="p-3">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    {getFileIcon(doc.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                      {doc.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                      <User className="w-3 h-3" />
                                      <span>{doc.uploadedBy}</span>
                                      <Calendar className="w-3 h-3 ml-2" />
                                      <span>{format(doc.uploadedAt, 'MMM dd')}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1 mt-3">
                                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                                    <Download className="w-3 h-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          
                          {phaseDocuments.length === 0 && (
                            <div className="col-span-2 p-6 text-center text-muted-foreground bg-muted/30 rounded-lg border-2 border-dashed">
                              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No documents for this phase yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Document Upload Mockup</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  This is a visual mockup showing how document upload would work for Projects and Tasks. 
                  To implement actual file upload functionality, you'll need to connect to Supabase for file storage, 
                  database management, and user authentication.
                </p>
                <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn About Supabase Integration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentMockup;