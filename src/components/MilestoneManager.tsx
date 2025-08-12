import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  TrendingUp
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
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null);

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
    setEditingMilestone(newMilestone.id);
    setShowCustomForm(true);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    onMilestonesChange(milestones.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMilestone = (id: string) => {
    onMilestonesChange(milestones.filter(m => m.id !== id));
    setEditingMilestone(null);
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
                                onClick={() => setEditingMilestone(milestone.id)}
                              >
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

          {/* Milestone editing form */}
          {editingMilestone && (
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-4 space-y-4">
                {(() => {
                  const milestone = milestones.find(m => m.id === editingMilestone);
                  if (!milestone) return null;
                  
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Edit Milestone</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingMilestone(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Milestone Name</Label>
                          <Input
                            placeholder="Enter milestone name"
                            value={milestone.name}
                            onChange={(e) => updateMilestone(milestone.id, { name: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label>Status</Label>
                          <Select
                            value={milestone.status}
                            onValueChange={(value: any) => updateMilestone(milestone.id, { status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="planned">Planned</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="delayed">Delayed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Priority</Label>
                          <Select
                            value={milestone.priority}
                            onValueChange={(value: any) => updateMilestone(milestone.id, { priority: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Progress (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={milestone.progress}
                            onChange={(e) => updateMilestone(milestone.id, { progress: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe this milestone..."
                          value={milestone.description}
                          onChange={(e) => updateMilestone(milestone.id, { description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label>Estimated Duration</Label>
                        <Input
                          placeholder="e.g., 2-3 weeks"
                          value={milestone.estimatedDuration}
                          onChange={(e) => updateMilestone(milestone.id, { estimatedDuration: e.target.value })}
                        />
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneManager;