import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock, BookOpen, Trophy, ChevronRight, Play, Target } from "lucide-react";

const TakeAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { toast } = useToast();

  const assessments = [
    {
      id: "react-basics",
      title: "React Fundamentals",
      description: "Test your knowledge of React components, hooks, and state management",
      duration: "15 min",
      questions: 10,
      difficulty: "Beginner",
      passingScore: 80,
      category: "Frontend Development",
      estimatedTime: "15-20 minutes",
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
      passingScore: 85,
      category: "Programming",
      estimatedTime: "25-30 minutes",
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
      passingScore: 75,
      category: "Project Management",
      estimatedTime: "20-25 minutes",
      attempts: 1,
      maxAttempts: 3,
      status: "in-progress"
    },
    {
      id: "security-basics",
      title: "Cybersecurity Awareness",
      description: "Essential security practices and threat identification",
      duration: "10 min",
      questions: 8,
      difficulty: "Beginner",
      passingScore: 90,
      category: "Security",
      estimatedTime: "10-15 minutes",
      attempts: 3,
      maxAttempts: 3,
      status: "completed"
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

    setSelectedAssessment(assessmentId);
    setIsAssessmentStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex.toString();
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete assessment
      const score = Math.floor(Math.random() * 30) + 70; // Mock score
      toast({
        title: "Assessment Completed!",
        description: `Your score: ${score}%`,
      });
      setIsAssessmentStarted(false);
      setSelectedAssessment(null);
    }
  };

  if (isAssessmentStarted && selectedAssessment) {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Assessment in Progress</h2>
            <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            Time Remaining: 12:45
          </Badge>
        </div>

        <Progress value={progress} className="h-2" />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion] === index.toString() ? "default" : "outline"}
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button 
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion]}
            className="gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Submit Assessment" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Take Assessment</h2>
          <p className="text-muted-foreground">Test your knowledge and earn certifications</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Trophy className="w-3 h-3" />
          {assessments.filter(a => a.status === "completed").length} Completed
        </Badge>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className={`transition-all duration-200 hover:shadow-md ${getStatusColor(assessment.status)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{assessment.title}</CardTitle>
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{assessment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {assessment.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {assessment.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {assessment.passingScore}% to pass
                    </span>
                  </div>
                </div>
                {assessment.status === "completed" && (
                  <Trophy className="w-5 h-5 text-success" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Attempts: {assessment.attempts}/{assessment.maxAttempts}
                  </p>
                  <p className="text-muted-foreground">Category: {assessment.category}</p>
                </div>
                <Button 
                  onClick={() => handleStartAssessment(assessment.id)}
                  disabled={assessment.status === "completed"}
                  className="gap-2"
                >
                  <Play className="w-4 h-4" />
                  {assessment.status === "completed" ? "Completed" : 
                   assessment.status === "in-progress" ? "Continue" : "Start Assessment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TakeAssessment;