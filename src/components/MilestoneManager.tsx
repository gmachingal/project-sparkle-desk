import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Target,
  Plus,
  X,
  CalendarIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
  Flag,
  ArrowRight,
  Star,
  TrendingUp,
  Edit,
  Save
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate?: Date;
  endDate?: Date;
  progress: number;
  estimatedDuration: string;
  dependencies?: string[];
  assignee?: string;
}

interface MilestoneManagerProps {
  milestones: Milestone[];
  onMilestonesChange: (milestones: Milestone[]) => void;
  presetMilestones?: Milestone[];
}

const statusConfig = {
  planned: { icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Planned' },
  'in-progress': { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
  delayed: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Delayed' }
};

const priorityConfig = {
  low: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Low' },
  medium: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Medium' },
  high: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'High' },
  critical: { color: 'text-red-600', bg: 'bg-red-100', label: 'Critical' }
};

const presetMilestones: Milestone[] = [
  {
    id: 'preset-1',
    name: 'Project Kickoff',
    description: 'Initial project setup, team onboarding, and requirements gathering',
    status: 'planned',
    priority: 'high',
    progress: 0,
    estimatedDuration: '1-2 weeks'
  },
  {
    id: 'preset-2',
    name: 'Design Phase',
    description: 'UI/UX design, wireframes, prototypes, and design system creation',
    status: 'planned',
    priority: 'high',
    progress: 0,
    estimatedDuration: '2-3 weeks'
  },
  {
    id: 'preset-3',
    name: 'Development Sprint 1',
    description: 'Core functionality development and basic features implementation',
    status: 'planned',
    priority: 'medium',
    progress: 0,
    estimatedDuration: '3-4 weeks'
  },
  {
    id: 'preset-4',
    name: 'Testing & QA',
    description: 'Comprehensive testing, bug fixes, and quality assurance',
    status: 'planned',
    priority: 'high',
    progress: 0,
    estimatedDuration: '1-2 weeks'
  },
  {
    id: 'preset-5',
    name: 'MVP Release',
    description: 'Minimum viable product deployment and initial user feedback',
    status: 'planned',
    priority: 'critical',
    progress: 0,
    estimatedDuration: '1 week'
  },
  {
    id: 'preset-6',
    name: 'User Feedback & Iteration',
    description: 'Collect user feedback and implement improvements',
    status: 'planned',
    priority: 'medium',
    progress: 0,
    estimatedDuration: '2-3 weeks'
  }
];

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({
  milestones,
  onMilestonesChange,
  presetMilestones: customPresets
}) => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const availablePresets = customPresets || presetMilestones;

  const addPresetMilestone = (preset: Milestone) => {
    if (selectedPresets.includes(preset.id)) {
      setSelectedPresets(prev => prev.filter(id => id !== preset.id));
      onMilestonesChange(milestones.filter(m => m.id !== preset.id));
    } else {
      setSelectedPresets(prev => [...prev, preset.id]);
      onMilestonesChange([...milestones, { ...preset, id: `milestone-${Date.now()}` }]);
    }
  };

  const openEditModal = (milestoneId: string) => {
    setEditingMilestone(milestoneId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingMilestone(null);
    setIsEditModalOpen(false);
  };

  const addCustomMilestone = () => {
    const newMilestone: Milestone = {
      id: `custom-${Date.now()}`,
      name: '',
      description: '',
      status: 'planned',
      priority: 'medium',
      progress: 0,
      estimatedDuration: '1 week'
    };
    onMilestonesChange([...milestones, newMilestone]);
    openEditModal(newMilestone.id);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    onMilestonesChange(milestones.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMilestone = (id: string) => {
    onMilestonesChange(milestones.filter(m => m.id !== id));
    closeEditModal();
  };

  const calculateOverallProgress = () => {
    if (milestones.length === 0) return 0;
    return Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Project Milestones
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="text-muted-foreground">Overall Progress:</span>
              <Badge variant="secondary">{calculateOverallProgress()}%</Badge>
            </div>
            <Progress value={calculateOverallProgress()} className="w-24" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Milestone Timeline Visualization */}
        {milestones.length > 0 && (
          <div className="relative">
            <h3 className="text-lg font-medium mb-4">Milestone Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => {
                  const StatusIcon = statusConfig[milestone.status].icon;
                  return (
                    <div key={milestone.id} className="relative flex items-start gap-4">
                      {/* Timeline node */}
                      <div className={cn(
                        "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background",
                        milestone.status === 'completed' ? 'border-green-500' : 
                        milestone.status === 'in-progress' ? 'border-blue-500' : 
                        milestone.status === 'delayed' ? 'border-red-500' : 'border-border'
                      )}>
                        <StatusIcon className={cn("w-4 h-4", statusConfig[milestone.status].color)} />
                      </div>
                      
                      {/* Milestone card */}
                      <Card className="flex-1 hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{milestone.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{milestone.description}</p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", statusConfig[milestone.status].color)}
                                >
                                  {statusConfig[milestone.status].label}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", priorityConfig[milestone.priority].color)}
                                >
                                  <Flag className="w-3 h-3 mr-1" />
                                  {priorityConfig[milestone.priority].label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {milestone.estimatedDuration}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditModal(milestone.id)}
                                className="gap-1"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteMilestone(milestone.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Arrow connector */}
                      {index < milestones.length - 1 && (
                        <div className="absolute left-4 top-12 flex items-center justify-center w-8 h-6">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Preset Milestones Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Common Milestone Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availablePresets.map((preset) => (
              <Card
                key={preset.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedPresets.includes(preset.id) ? "ring-2 ring-primary bg-primary/5" : ""
                )}
                onClick={() => addPresetMilestone(preset)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{preset.name}</h4>
                    {selectedPresets.includes(preset.id) && (
                      <Badge variant="default" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Added
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{preset.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {preset.estimatedDuration}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", priorityConfig[preset.priority].color)}
                    >
                      {priorityConfig[preset.priority].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Milestone Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Custom Milestones</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomMilestone}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Custom Milestone
            </Button>
          </div>

          {/* Edit Milestone Modal */}
          {editingMilestone && (
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Edit Milestone
                  </DialogTitle>
                </DialogHeader>
                
                {(() => {
                  const milestone = milestones.find(m => m.id === editingMilestone);
                  if (!milestone) return null;
                  
                  return (
                    <div className="space-y-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label>Milestone Name *</Label>
                          <Input
                            placeholder="Enter milestone name"
                            value={milestone.name}
                            onChange={(e) => updateMilestone(milestone.id, { name: e.target.value })}
                            className="bg-background/50"
                          />
                        </div>
                        
                        <div>
                          <Label>Status</Label>
                          <Select
                            value={milestone.status}
                            onValueChange={(value: any) => updateMilestone(milestone.id, { status: value })}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border shadow-lg z-50">
                              <SelectItem value="planned">
                                <div className="flex items-center gap-2">
                                  <Circle className="w-4 h-4 text-muted-foreground" />
                                  Planned
                                </div>
                              </SelectItem>
                              <SelectItem value="in-progress">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  In Progress
                                </div>
                              </SelectItem>
                              <SelectItem value="completed">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  Completed
                                </div>
                              </SelectItem>
                              <SelectItem value="delayed">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  Delayed
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Priority</Label>
                          <Select
                            value={milestone.priority}
                            onValueChange={(value: any) => updateMilestone(milestone.id, { priority: value })}
                          >
                            <SelectTrigger className="bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border shadow-lg z-50">
                              <SelectItem value="low">
                                <div className="flex items-center gap-2">
                                  <Flag className="w-4 h-4 text-gray-600" />
                                  Low
                                </div>
                              </SelectItem>
                              <SelectItem value="medium">
                                <div className="flex items-center gap-2">
                                  <Flag className="w-4 h-4 text-blue-600" />
                                  Medium
                                </div>
                              </SelectItem>
                              <SelectItem value="high">
                                <div className="flex items-center gap-2">
                                  <Flag className="w-4 h-4 text-orange-600" />
                                  High
                                </div>
                              </SelectItem>
                              <SelectItem value="critical">
                                <div className="flex items-center gap-2">
                                  <Flag className="w-4 h-4 text-red-600" />
                                  Critical
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Progress (%)</Label>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={milestone.progress}
                              onChange={(e) => updateMilestone(milestone.id, { progress: parseInt(e.target.value) || 0 })}
                              className="bg-background/50"
                            />
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Estimated Duration</Label>
                          <Input
                            placeholder="e.g., 2-3 weeks"
                            value={milestone.estimatedDuration}
                            onChange={(e) => updateMilestone(milestone.id, { estimatedDuration: e.target.value })}
                            className="bg-background/50"
                          />
                        </div>
                        
                        <div>
                          <Label>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-background/50",
                                  !milestone.startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {milestone.startDate ? format(milestone.startDate, "PPP") : "Select start date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                              <Calendar
                                mode="single"
                                selected={milestone.startDate}
                                onSelect={(date) => updateMilestone(milestone.id, { startDate: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <Label>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-background/50",
                                  !milestone.endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {milestone.endDate ? format(milestone.endDate, "PPP") : "Select end date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
                              <Calendar
                                mode="single"
                                selected={milestone.endDate}
                                onSelect={(date) => updateMilestone(milestone.id, { endDate: date })}
                                initialFocus
                                disabled={(date) => {
                                  if (milestone.startDate) {
                                    return date < milestone.startDate;
                                  }
                                  return false;
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe this milestone in detail..."
                          value={milestone.description}
                          onChange={(e) => updateMilestone(milestone.id, { description: e.target.value })}
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => deleteMilestone(milestone.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Delete Milestone
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={closeEditModal}>
                            Cancel
                          </Button>
                          <Button onClick={closeEditModal} className="gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneManager;