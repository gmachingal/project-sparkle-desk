import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderOpen } from "lucide-react";

interface CreateSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export const CreateSpaceDialog = ({ open, onOpenChange, onSubmit }: CreateSpaceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 ml-4 border-green-200 text-green-700 hover:bg-green-50">
          <FolderOpen className="w-4 h-4" />
          New Space
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Space</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="spaceName">Space Name</Label>
            <Input 
              id="spaceName" 
              placeholder="Enter space name..." 
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spaceDescription">Description</Label>
            <Textarea 
              id="spaceDescription" 
              placeholder="Describe the purpose of this space..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">🌐 Public - Anyone can view</SelectItem>
                  <SelectItem value="team">👥 Team - Team members only</SelectItem>
                  <SelectItem value="private">🔒 Private - Invite only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spaceIcon">Icon</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="📁">📁 Folder</SelectItem>
                  <SelectItem value="📊">📊 Analytics</SelectItem>
                  <SelectItem value="🎨">🎨 Design</SelectItem>
                  <SelectItem value="⚙️">⚙️ Engineering</SelectItem>
                  <SelectItem value="📱">📱 Product</SelectItem>
                  <SelectItem value="📢">📢 Marketing</SelectItem>
                  <SelectItem value="👥">👥 HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="initialMembers">Initial Members (Optional)</Label>
            <Input 
              id="initialMembers" 
              placeholder="Enter email addresses separated by commas..."
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Create Space
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};