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
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Award, 
  CheckCircle,
  Globe,
  Download,
  Smartphone
} from "lucide-react";

interface EnrollCourseProps {
  course: any;
  onBack: () => void;
}

const EnrollCourse = ({ course, onBack }: EnrollCourseProps) => {
  const [selectedType, setSelectedType] = useState("mandatory");
  const { toast } = useToast();

  const curriculum = [
    {
      module: "Module 1: Introduction",
      lessons: [
        { title: "Course Overview", duration: "15 min", type: "video" },
        { title: "Setting Up Development Environment", duration: "30 min", type: "video" },
        { title: "Your First Project", duration: "45 min", type: "hands-on" },
      ]
    },
    {
      module: "Module 2: Core Concepts",
      lessons: [
        { title: "Understanding Components", duration: "25 min", type: "video" },
        { title: "State Management", duration: "35 min", type: "video" },
        { title: "Practice Exercise", duration: "20 min", type: "quiz" },
      ]
    },
    {
      module: "Module 3: Advanced Topics",
      lessons: [
        { title: "Performance Optimization", duration: "40 min", type: "video" },
        { title: "Testing Strategies", duration: "30 min", type: "video" },
        { title: "Final Project", duration: "2 hours", type: "project" },
      ]
    }
  ];

  const features = [
    { icon: Play, text: "24+ hours of video content" },
    { icon: BookOpen, text: "Downloadable resources" },
    { icon: Award, text: "Certificate of completion" },
    { icon: Globe, text: "Lifetime access" },
    { icon: Smartphone, text: "Mobile-friendly" },
    { icon: Download, text: "Offline viewing" },
  ];

  const courseTypes = [
    {
      id: "mandatory",
      name: "Mandatory Training",
      description: "Required for all employees in this role",
      features: ["Compliance tracking", "Completion deadlines", "Manager notifications"],
      required: true
    },
    {
      id: "optional",
      name: "Professional Development",
      description: "Enhance your skills and advance your career",
      features: ["Self-paced learning", "Skill certificates", "Performance reviews"],
      popular: true
    },
    {
      id: "certification",
      name: "Certification Track",
      description: "Industry-recognized certification pathway",
      features: ["Industry certification", "Expert mentoring", "Exam preparation"]
    }
  ];

  const handleEnroll = () => {
    const selectedCourseType = courseTypes.find(t => t.id === selectedType);
    toast({
      title: "Enrollment Successful!",
      description: `You've enrolled in ${course.title} as ${selectedCourseType?.name}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "video": return <Play className="w-3 h-3" />;
      case "quiz": return <CheckCircle className="w-3 h-3" />;
      case "hands-on": return <BookOpen className="w-3 h-3" />;
      case "project": return <Award className="w-3 h-3" />;
      default: return <BookOpen className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <Card>
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {course.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    {course.rating} ({course.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Course Details */}
          <Tabs defaultValue="curriculum" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="space-y-4">
              {curriculum.map((module, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{module.module}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(lesson.type)}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="instructor">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{course.instructor[0]}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{course.instructor}</h3>
                      <p className="text-sm text-muted-foreground">
                        Senior Software Engineer with 8+ years of experience in web development. 
                        Has taught over 50,000 students worldwide.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📚 12 Courses</span>
                        <span>⭐ 4.9 Rating</span>
                        <span>👥 50K+ Students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                          <span className="text-xs font-medium">U{review}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Student {review}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Excellent course! Really helped me understand the concepts better.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enrollment Sidebar */}
        <div className="space-y-4">
          {/* Course Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What's Included</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course Type</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {courseTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedType === type.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{type.name}</span>
                      {type.popular && (
                        <Badge variant="default" className="text-xs">Recommended</Badge>
                      )}
                      {type.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
                  <div className="space-y-1">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <Button onClick={handleEnroll} className="w-full gap-2">
                <BookOpen className="w-4 h-4" />
                Enroll Now
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Course progress will be tracked automatically
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;