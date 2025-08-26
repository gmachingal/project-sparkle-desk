import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { DocumentEditor } from "@/components/DocumentEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import all the new components
import { DocumentGrid } from "@/components/documents/DocumentGrid";
import { DocumentView } from "@/components/documents/DocumentView";
import { CreateDocumentDialog } from "@/components/documents/CreateDocumentDialog";
import { SpacesList } from "@/components/spaces/SpacesList";
import { SpaceDetails } from "@/components/spaces/SpaceDetails";
import { CreateSpaceDialog } from "@/components/spaces/CreateSpaceDialog";

import { ActivityFeed } from "@/components/common/ActivityFeed";
import { UploadDialog } from "@/components/common/UploadDialog";
import { SearchAndFilters } from "@/components/common/SearchAndFilters";

// Import data and types
import { documents, spaces, spaceMembers, spaceAnalytics, templates, recentActivity } from "@/data/mockData";

const DocumentMockup = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "tree">("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [isCreateSpaceDialogOpen, setIsCreateSpaceDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedSpaceDetails, setSelectedSpaceDetails] = useState<string | null>(null);
  const [selectedDocumentView, setSelectedDocumentView] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateDocument = () => {
    toast({
      title: "Document Created",
      description: "New document has been created successfully"
    });
    setIsCreateDialogOpen(false);
  };


  const handleCreateSpace = () => {
    toast({
      title: "Space Created",
      description: "New workspace has been created successfully"
    });
    setIsCreateSpaceDialogOpen(false);
  };

  const handleUploadFile = () => {
    toast({
      title: "Files Uploaded",
      description: "Files have been uploaded successfully"
    });
    setIsUploadDialogOpen(false);
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
          <DocumentView
            document={document}
            onBack={handleBackToDocuments}
            onEdit={handleEditFromView}
          />
        </div>
      );
    }
  }

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <DocumentEditor onClose={() => setShowEditor(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Knowledge Base</h1>
            <p className="text-muted-foreground mt-2">
              Organize, create, and collaborate on documents across your organization
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CreateDocumentDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              onSubmit={handleCreateDocument}
            />
            <CreateSpaceDialog
              open={isCreateSpaceDialogOpen}
              onOpenChange={setIsCreateSpaceDialogOpen}
              onSubmit={handleCreateSpace}
            />
            <UploadDialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
              onSubmit={handleUploadFile}
            />
          </div>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="spaces">Spaces</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedSpace={selectedSpace}
              onSpaceChange={setSelectedSpace}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <DocumentGrid
              documents={documents}
              onViewDocument={handleViewDocument}
              onEditDocument={handleEditDocument}
            />
          </TabsContent>

          <TabsContent value="spaces" className="space-y-6">
            {selectedSpaceDetails ? (
              <SpaceDetails
                space={spaces.find(s => s.id === selectedSpaceDetails)!}
                members={spaceMembers[selectedSpaceDetails] || []}
                analytics={spaceAnalytics[selectedSpaceDetails]}
                onBack={handleBackToSpaces}
              />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Workspaces</h2>
                </div>
                <SpacesList
                  spaces={spaces}
                  onSpaceClick={handleSpaceClick}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityFeed activities={recentActivity} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentMockup;