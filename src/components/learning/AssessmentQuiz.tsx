import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon
} from "lucide-react";

interface AssessmentQuizProps {
  assessment: any;
  onBack: () => void;
}

const AssessmentQuiz = ({ assessment, onBack }: AssessmentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance of React applications",
        "To handle routing in React applications"
      ],
      correct: 1,
      explanation: "React hooks allow you to use state and other React features in functional components without writing a class."
    },
    {
      id: 2,
      question: "Which hook is used for side effects in React?",
      options: [
        "useState",
        "useContext",
        "useEffect",
        "useReducer"
      ],
      correct: 2,
      explanation: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM."
    },
    {
      id: 3,
      question: "What does the dependency array in useEffect control?",
      options: [
        "The order of effect execution",
        "When the effect should re-run",
        "The cleanup function timing",
        "The component render cycle"
      ],
      correct: 1,
      explanation: "The dependency array controls when the effect should re-run. The effect only runs when one of the dependencies has changed."
    },
    {
      id: 4,
      question: "Which of the following is NOT a valid React hook rule?",
      options: [
        "Only call hooks at the top level",
        "Only call hooks from React functions",
        "Hooks can be called conditionally",
        "Don't call hooks inside loops or conditions"
      ],
      correct: 2,
      explanation: "Hooks cannot be called conditionally. They must always be called in the same order to ensure React can correctly associate state with components."
    },
    {
      id: 5,
      question: "What is the purpose of the key prop in React lists?",
      options: [
        "To style list items",
        "To help React identify which items have changed",
        "To set the order of list items",
        "To pass data to child components"
      ],
      correct: 1,
      explanation: "The key prop helps React identify which items have changed, are added, or are removed, enabling efficient re-rendering of lists."
    }
  ];

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const userAnswer = parseInt(answers[index]);
      if (userAnswer === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    toast({
      title: "Assessment Completed!",
      description: `You scored ${finalScore}% (${correctAnswers}/${totalQuestions} correct)`,
    });
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeRemaining(1800);
    
    toast({
      title: "Assessment Restarted",
      description: "Good luck on your retake!",
    });
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessments
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              {score >= 70 ? (
                <Trophy className="w-16 h-16 text-yellow-500" />
              ) : (
                <AlertCircle className="w-16 h-16 text-orange-500" />
              )}
            </div>
            <CardTitle className="text-xl">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{score}%</div>
              <p className="text-muted-foreground">
                You scored {Object.keys(answers).filter(key => {
                  const qIndex = parseInt(key);
                  return parseInt(answers[qIndex]) === questions[qIndex].correct;
                }).length} out of {totalQuestions} questions correctly
              </p>
              <Badge variant={score >= 70 ? "default" : "secondary"} className="mt-2">
                {score >= 70 ? "Passed" : "Needs Improvement"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Question Review</h3>
              {questions.map((question, index) => {
                const userAnswer = parseInt(answers[index]);
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <Card key={question.id} className={`border-l-4 ${isCorrect ? "border-l-success" : "border-l-destructive"}`}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                          )}
                          <div className="space-y-2">
                            <p className="font-medium">{question.question}</p>
                            <div className="space-y-1 text-sm">
                              <p className="text-muted-foreground">
                                Your answer: {question.options[userAnswer] || "Not answered"}
                              </p>
                              {!isCorrect && (
                                <p className="text-success">
                                  Correct answer: {question.options[question.correct]}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground italic">
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleRetake} variant="outline" className="flex-1 gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </Button>
              <Button onClick={onBack} className="flex-1">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </Button>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(timeRemaining)}
          </Badge>
          <Badge variant="outline">
            {currentQuestion + 1} of {totalQuestions}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Question Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <Badge variant="outline">{assessment.difficulty}</Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-semibold">
                  Question {currentQuestion + 1}: {currentQ.question}
                </h3>
                
                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className="gap-2"
                >
                  {currentQuestion === totalQuestions - 1 ? "Submit" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Sidebar */}
        <div className="space-y-4">
          {/* Progress Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  {Object.keys(answers).length} of {totalQuestions} answered
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigator */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Questions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square text-xs font-medium rounded-md border transition-colors ${
                      index === currentQuestion
                        ? "bg-primary text-primary-foreground border-primary"
                        : answers[index]
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Assessment Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span>{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Limit:</span>
                  <span>30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passing Score:</span>
                  <span>70%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempts:</span>
                  <span>{assessment.attempts}/{assessment.maxAttempts}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuiz;