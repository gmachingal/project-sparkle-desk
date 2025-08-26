import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock, BookOpen, Trophy, ChevronRight, Play, Target } from "lucide-react";
import AssessmentQuiz from "./AssessmentQuiz";

const TakeAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { toast } = useToast();

  const assessments = [
    {
      id: "react-basics",
      title: "React Fundamentals",
      description: "Test your knowledge of React components, hooks, and state management",
      duration: "15 min",
      questions: 10,
      difficulty: "Beginner",
      category: "Frontend",
      attempts: 2,
      maxAttempts: 3,
      status: "available"
    },
    {
      id: "javascript-advanced",
      title: "Advanced JavaScript",
      description: "Advanced concepts including closures, promises, and ES6+ features",
      duration: "25 min",
      questions: 15,
      difficulty: "Advanced",
      category: "Programming",
      attempts: 0,
      maxAttempts: 3,
      status: "available"
    },
    {
      id: "agile-methodology",
      title: "Agile & Scrum Principles",
      description: "Understanding of Agile methodologies and Scrum framework",
      duration: "20 min",
      questions: 12,
      difficulty: "Intermediate",
      category: "Management",
      attempts: 1,
      maxAttempts: 3,
      status: "in-progress"
    }
  ];

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React Hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance only",
        "To handle routing in React applications"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Which hook is used for managing side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "border-primary bg-primary/5";
      case "in-progress": return "border-warning bg-warning/5";
      case "completed": return "border-success bg-success/5";
      default: return "border-muted";
    }
  };

  const handleStartAssessment = (assessmentId: string) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    if (assessment?.status === "completed") {
      toast({
        title: "Assessment Completed",
        description: "You have already completed this assessment with maximum attempts.",
        variant: "destructive"
      });
      return;
    }

    setSelectedAssessment(assessment);
    setShowQuiz(true);
  };

  if (showQuiz && selectedAssessment) {
    return (
      <AssessmentQuiz 
        assessment={selectedAssessment} 
        onBack={() => {
          setShowQuiz(false);
          setSelectedAssessment(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Take Assessment</h2>
          <p className="text-sm text-muted-foreground">Test your knowledge and earn certifications</p>
        </div>
        <Badge variant="outline" className="gap-1 text-xs">
          <Trophy className="w-3 h-3" />
          {assessments.filter(a => a.status === "completed").length} Done
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className={`transition-all duration-200 hover:shadow-md ${getStatusColor(assessment.status)}`}>
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm leading-tight line-clamp-2">{assessment.title}</CardTitle>
                  {assessment.status === "completed" && (
                    <Trophy className="w-4 h-4 text-success shrink-0 ml-2" />
                  )}
                </div>
                <Badge className={getDifficultyColor(assessment.difficulty)} variant="outline">
                  {assessment.difficulty}
                </Badge>
                <p className="text-xs text-muted-foreground line-clamp-2">{assessment.description}</p>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {assessment.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {assessment.questions} Q
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {assessment.category}
                </div>
                <div className="text-xs text-muted-foreground">
                  Attempts: {assessment.attempts}/{assessment.maxAttempts}
                </div>
              </div>
              
              <Button 
                onClick={() => handleStartAssessment(assessment.id)}
                disabled={assessment.status === "completed"}
                size="sm"
                className="w-full gap-1 h-7"
              >
                <Play className="w-3 h-3" />
                {assessment.status === "completed" ? "Done" : 
                 assessment.status === "in-progress" ? "Continue" : "Start"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TakeAssessment;