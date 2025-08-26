import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Image, FileCode } from "lucide-react";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export const UploadDialog = ({ open, onOpenChange, onSubmit }: UploadDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 ml-4 border-green-200 text-green-700 hover:bg-green-50">
          <Upload className="w-4 h-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-8">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drag and drop files here</h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse from your computer
                </p>
                <Button>Choose Files</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Supported File Types */}
          <div className="space-y-3">
            <h4 className="font-medium">Supported file types:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Documents</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX, TXT</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Image className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">Images</div>
                  <div className="text-xs text-muted-foreground">PNG, JPG, SVG</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <FileCode className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-medium text-sm">Code</div>
                  <div className="text-xs text-muted-foreground">JS, TS, JSON</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Upload Files
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};