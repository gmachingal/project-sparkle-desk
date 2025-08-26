import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Settings,
  Maximize,
  BookOpen,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

interface StartCourseProps {
  course: any;
  onBack: () => void;
}

const StartCourse = ({ course, onBack }: StartCourseProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(245); // 4:05
  const [duration, setDuration] = useState(1080); // 18:00
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const lessons = [
    { id: 1, title: "Course Introduction", duration: "5:30", completed: true },
    { id: 2, title: "Setting Up Your Environment", duration: "12:45", completed: true },
    { id: 3, title: "Understanding the Basics", duration: "18:20", completed: false, current: true },
    { id: 4, title: "Your First Project", duration: "25:10", completed: false },
    { id: 5, title: "Advanced Concepts", duration: "22:30", completed: false },
  ];

  const notes = [
    { time: "2:30", note: "Important concept about state management" },
    { time: "8:15", note: "Remember to use useEffect for side effects" },
  ];

  const discussions = [
    {
      user: "Sarah M.",
      time: "2 hours ago",
      message: "Great explanation! This really helped me understand the concept.",
      replies: 3
    },
    {
      user: "John D.",
      time: "5 hours ago", 
      message: "Can someone explain the difference between props and state?",
      replies: 7
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Video Paused" : "Video Playing",
      description: isPlaying ? "Your progress has been saved" : "Continue learning!",
    });
  };

  const handleLessonSelect = (lessonId: number) => {
    toast({
      title: "Switching Lesson",
      description: `Loading lesson ${lessonId}...`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-2">
          <Progress value={35} className="w-32" />
          <span className="text-sm text-muted-foreground">35% Complete</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Video Player */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-0">
              {/* Video Area */}
              <div className="aspect-video bg-black rounded-t-lg relative flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </div>
                  <p className="text-sm opacity-80">Video Player Simulation</p>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-white text-xs">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 bg-white/20 rounded-full h-1">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white hover:text-white/80"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Understanding the Basics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    In this lesson, we'll explore the fundamental concepts that form the foundation 
                    of modern web development. You'll learn about component architecture, 
                    state management, and best practices.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">What you'll learn:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Component lifecycle and rendering</li>
                      <li>• State vs Props understanding</li>
                      <li>• Event handling patterns</li>
                      <li>• Common pitfalls and how to avoid them</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">My Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notes.map((note, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{note.time}</span>
                      </div>
                      <p className="text-sm">{note.note}</p>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <FileText className="w-4 h-4" />
                    Add Note
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Lesson Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <FileText className="w-4 h-4" />
                      Lesson Slides (PDF)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <BookOpen className="w-4 h-4" />
                      Code Examples
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <FileText className="w-4 h-4" />
                      Additional Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="p-3 border rounded-md space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">{discussion.user[0]}</span>
                          </div>
                          <span className="text-sm font-medium">{discussion.user}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{discussion.time}</span>
                      </div>
                      <p className="text-sm">{discussion.message}</p>
                      <Button variant="ghost" size="sm" className="gap-2 h-7">
                        <MessageSquare className="w-3 h-3" />
                        {discussion.replies} replies
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Course Sidebar */}
        <div className="space-y-4">
          {/* Course Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">35%</div>
                  <div className="text-xs text-muted-foreground">2 of 5 lessons complete</div>
                </div>
                <Progress value={35} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Lesson List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lessons</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`p-2 rounded-md cursor-pointer transition-colors ${
                      lesson.current 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleLessonSelect(lesson.id)}
                  >
                    <div className="flex items-center gap-2">
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : lesson.current ? (
                        <Play className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 border border-muted-foreground rounded-full" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Course Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{course.students} students enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{course.duration} total content</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span>Certificate included</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartCourse;