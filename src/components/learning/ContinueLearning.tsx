import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, BookOpen, Clock, CheckCircle, Star, TrendingUp, Award, Trophy, Download, Share2, Eye } from "lucide-react";
import StartCourse from "./StartCourse";

const ContinueLearning = () => {
  const [playingCourse, setPlayingCourse] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showCourseViewer, setShowCourseViewer] = useState(false);
  const { toast } = useToast();

  const inProgressCourses = [
    {
      id: "react-advanced",
      title: "Advanced React Patterns",
      description: "Master advanced React concepts including render props, HOCs, and compound components",
      progress: 65,
      currentLesson: "Lesson 8: Custom Hooks",
      totalLessons: 12,
      timeSpent: "4h 32m",
      estimatedTime: "2h 15m remaining",
      category: "Frontend Development",
      difficulty: "Advanced",
      rating: 4.8,
      instructor: "Sarah Johnson",
      lastAccessed: "2 hours ago",
      nextLesson: "Error Boundaries and Error Handling"
    },
    {
      id: "typescript-fundamentals",
      title: "TypeScript for JavaScript Developers",
      description: "Learn TypeScript from the ground up and improve your JavaScript development",
      progress: 30,
      currentLesson: "Lesson 4: Interfaces and Types",
      totalLessons: 15,
      timeSpent: "2h 45m",
      estimatedTime: "6h 30m remaining",
      category: "Programming",
      difficulty: "Intermediate",
      rating: 4.9,
      instructor: "Mark Davis",
      lastAccessed: "1 day ago",
      nextLesson: "Generic Types and Constraints"
    },
    {
      id: "agile-scrum",
      title: "Agile Project Management",
      description: "Complete guide to Agile methodologies and Scrum framework implementation",
      progress: 85,
      currentLesson: "Lesson 10: Sprint Retrospectives",
      totalLessons: 12,
      timeSpent: "8h 15m",
      estimatedTime: "1h 45m remaining",
      category: "Project Management",
      difficulty: "Beginner",
      rating: 4.7,
      instructor: "Emily Chen",
      lastAccessed: "3 hours ago",
      nextLesson: "Scaling Agile Across Teams"
    }
  ];

  const certificates = [
    {
      id: "cert-001",
      title: "React Advanced Patterns",
      issueDate: "2024-01-15",
      score: 92,
      status: "active",
      credentialId: "RC-2024-001-ADV"
    },
    {
      id: "cert-002", 
      title: "TypeScript Fundamentals",
      issueDate: "2023-11-20",
      score: 88,
      status: "active",
      credentialId: "TS-2023-002-FUN"
    },
    {
      id: "cert-003",
      title: "Agile Project Management", 
      issueDate: "2023-12-10",
      score: 95,
      status: "active",
      credentialId: "AG-2023-003-PMP"
    }
  ];

  const handlePlayPause = (course: any) => {
    setSelectedCourse(course);
    setShowCourseViewer(true);
  };

  const handleDownload = (certId: string, title: string) => {
    toast({
      title: "Download Started",
      description: `Downloading certificate: ${title}`,
    });
  };

  const handleShare = (certId: string, title: string) => {
    navigator.clipboard.writeText(`https://certificates.company.com/verify/${certId}`);
    toast({
      title: "Link Copied", 
      description: "Certificate verification link copied to clipboard",
    });
  };

  if (showCourseViewer && selectedCourse) {
    return (
      <StartCourse 
        course={selectedCourse} 
        onBack={() => {
          setShowCourseViewer(false);
          setSelectedCourse(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">My Learning Dashboard</h2>
          <p className="text-sm text-muted-foreground">Track your progress and continue your learning journey</p>
        </div>
        <Badge variant="outline" className="gap-1 text-xs">
          <TrendingUp className="w-3 h-3" />
          {inProgressCourses.length} Active
        </Badge>
      </div>

      {/* Current Courses */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Continue Learning</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {inProgressCourses.map((course) => (
            <Card key={course.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm leading-tight line-clamp-2">{course.title}</CardTitle>
                    <Button
                      onClick={() => handlePlayPause(course)}
                      variant={playingCourse === course.id ? "secondary" : "default"}
                      size="sm"
                      className="gap-1 h-7 shrink-0 ml-2"
                    >
                      {playingCourse === course.id ? (
                        <>
                          <Pause className="w-3 h-3" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" />
                          Continue
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {course.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
                
                <div className="bg-muted/50 rounded-md p-2 space-y-1">
                  <p className="text-xs font-medium line-clamp-1">Next: {course.nextLesson}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {Math.floor(course.progress / 100 * course.totalLessons) + 1}/{course.totalLessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.timeSpent}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats & Certificates */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Learning Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Learning Stats</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-primary/5 rounded-md">
                <div className="text-lg font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Courses</div>
              </div>
              <div className="text-center p-2 bg-success/5 rounded-md">
                <div className="text-lg font-bold text-success">47.5h</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="text-center p-2 bg-warning/5 rounded-md">
                <div className="text-lg font-bold text-warning">{certificates.length}</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </div>
              <div className="text-center p-2 bg-info/5 rounded-md">
                <div className="text-lg font-bold text-info">95%</div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">My Certificates</CardTitle>
              <Badge variant="outline" className="gap-1 text-xs">
                <Trophy className="w-3 h-3" />
                {certificates.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {certificates.slice(0, 3).map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-xs">{cert.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(cert.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedCertificate(cert)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            {cert.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-primary-glow/10">
                            <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                            <h3 className="text-base font-bold mb-2">{cert.title}</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">ID:</span>
                                <p className="font-mono font-medium text-xs">{cert.credentialId}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Score:</span>
                                <p className="font-medium">{cert.score}%</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1 gap-2" size="sm" onClick={() => handleDownload(cert.credentialId, cert.title)}>
                              <Download className="w-3 h-3" />
                              Download
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2" size="sm" onClick={() => handleShare(cert.credentialId, cert.title)}>
                              <Share2 className="w-3 h-3" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDownload(cert.credentialId, cert.title)}>
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContinueLearning;