import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, BookOpen, Clock, CheckCircle, RotateCcw, Star, TrendingUp } from "lucide-react";

const ContinueLearning = () => {
  const [playingCourse, setPlayingCourse] = useState<string | null>(null);
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

  const recentlyCompleted = [
    {
      id: "git-workflow",
      title: "Git Workflow Mastery",
      completedDate: "2 days ago",
      score: 92,
      certificate: true,
      category: "Development Tools"
    },
    {
      id: "api-design",
      title: "RESTful API Design",
      completedDate: "1 week ago",
      score: 88,
      certificate: true,
      category: "Backend Development"
    }
  ];

  const recommendations = [
    {
      id: "node-microservices",
      title: "Node.js Microservices Architecture",
      reason: "Based on your completion of RESTful API Design",
      difficulty: "Advanced",
      duration: "12 hours",
      rating: 4.9
    },
    {
      id: "react-testing",
      title: "React Testing with Jest & Testing Library",
      reason: "Complements your Advanced React Patterns course",
      difficulty: "Intermediate",
      duration: "8 hours",
      rating: 4.8
    }
  ];

  const handlePlayPause = (courseId: string) => {
    if (playingCourse === courseId) {
      setPlayingCourse(null);
      toast({
        title: "Learning Paused",
        description: "Your progress has been saved",
      });
    } else {
      setPlayingCourse(courseId);
      toast({
        title: "Resuming Learning",
        description: "Continue where you left off",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <p className="text-muted-foreground">Pick up where you left off</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <TrendingUp className="w-3 h-3" />
          {inProgressCourses.length} In Progress
        </Badge>
      </div>

      {/* In Progress Courses */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">In Progress</h3>
        <div className="grid gap-4">
          {inProgressCourses.map((course) => (
            <Card key={course.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {course.instructor}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        {course.rating}
                      </span>
                      <span>Last accessed {course.lastAccessed}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePlayPause(course.id)}
                    variant={playingCourse === course.id ? "secondary" : "default"}
                    className="gap-2"
                  >
                    {playingCourse === course.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Continue
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}% complete</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.currentLesson}</span>
                    <span>{course.estimatedTime}</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium">Next: {course.nextLesson}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Lesson {Math.floor(course.progress / 100 * course.totalLessons) + 1} of {course.totalLessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.timeSpent} completed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recently Completed */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recently Completed</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recentlyCompleted.map((course) => (
            <Card key={course.id} className="border-success/50 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.category}</p>
                    <p className="text-sm text-muted-foreground">Completed {course.completedDate}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <CheckCircle className="w-5 h-5 text-success ml-auto" />
                    <Badge variant="outline" className="text-xs">
                      Score: {course.score}%
                    </Badge>
                  </div>
                </div>
                {course.certificate && (
                  <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
                    <BookOpen className="w-3 h-3" />
                    View Certificate
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended for You</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((course) => (
            <Card key={course.id} className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{course.reason}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge className={getDifficultyColor(course.difficulty)} variant="outline">
                      {course.difficulty}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;