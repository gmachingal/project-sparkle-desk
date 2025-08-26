import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, BookOpen, Clock, Star, Users, Play, Plus, Filter, TrendingUp, Award } from "lucide-react";

const BrowseLearning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "frontend", name: "Frontend Development" },
    { id: "backend", name: "Backend Development" },
    { id: "mobile", name: "Mobile Development" },
    { id: "devops", name: "DevOps & Cloud" },
    { id: "data", name: "Data Science" },
    { id: "security", name: "Cybersecurity" },
    { id: "project-management", name: "Project Management" },
    { id: "soft-skills", name: "Soft Skills" }
  ];

  const courses = [
    {
      id: "react-masterclass",
      title: "React Masterclass 2024",
      description: "Complete modern React course covering hooks, context, testing, and performance optimization",
      instructor: "John Smith",
      rating: 4.9,
      students: 12500,
      duration: "18 hours",
      lessons: 156,
      price: "Free",
      difficulty: "Intermediate",
      category: "frontend",
      tags: ["React", "JavaScript", "Hooks", "Testing"],
      thumbnail: "/api/placeholder/300/200",
      isNew: true,
      isTrending: true,
      hasAssessment: true,
      prerequisites: ["Basic JavaScript", "HTML/CSS"]
    },
    {
      id: "nodejs-microservices",
      title: "Node.js Microservices Architecture",
      description: "Build scalable microservices with Node.js, Docker, and Kubernetes",
      instructor: "Emily Davis",
      rating: 4.8,
      students: 8200,
      duration: "24 hours",
      lessons: 189,
      price: "Premium",
      difficulty: "Advanced",
      category: "backend",
      tags: ["Node.js", "Microservices", "Docker", "Kubernetes"],
      thumbnail: "/api/placeholder/300/200",
      isNew: false,
      isTrending: true,
      hasAssessment: true,
      prerequisites: ["JavaScript", "Node.js Basics", "REST APIs"]
    },
    {
      id: "python-data-science",
      title: "Python for Data Science",
      description: "Learn data analysis, visualization, and machine learning with Python",
      instructor: "Dr. Sarah Johnson",
      rating: 4.7,
      students: 15600,
      duration: "32 hours",
      lessons: 245,
      price: "Premium",
      difficulty: "Beginner",
      category: "data",
      tags: ["Python", "Data Science", "Pandas", "Machine Learning"],
      thumbnail: "/api/placeholder/300/200",
      isNew: false,
      isTrending: false,
      hasAssessment: true,
      prerequisites: ["Basic Programming"]
    },
    {
      id: "aws-cloud-architect",
      title: "AWS Cloud Architect Certification",
      description: "Prepare for AWS Solutions Architect certification with hands-on labs",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 9800,
      duration: "45 hours",
      lessons: 312,
      price: "Premium",
      difficulty: "Advanced",
      category: "devops",
      tags: ["AWS", "Cloud", "Architecture", "Certification"],
      thumbnail: "/api/placeholder/300/200",
      isNew: true,
      isTrending: true,
      hasAssessment: true,
      prerequisites: ["Basic AWS Knowledge", "Linux Fundamentals"]
    },
    {
      id: "agile-leadership",
      title: "Agile Leadership & Team Management",
      description: "Master agile methodologies and lead high-performing development teams",
      instructor: "Lisa Rodriguez",
      rating: 4.6,
      students: 5400,
      duration: "12 hours",
      lessons: 89,
      price: "Free",
      difficulty: "Intermediate",
      category: "project-management",
      tags: ["Agile", "Leadership", "Scrum", "Team Management"],
      thumbnail: "/api/placeholder/300/200",
      isNew: false,
      isTrending: false,
      hasAssessment: true,
      prerequisites: ["Basic Project Management"]
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      description: "Essential security concepts, threat analysis, and defense strategies",
      instructor: "Robert Kim",
      rating: 4.8,
      students: 7200,
      duration: "16 hours",
      lessons: 124,
      price: "Free",
      difficulty: "Beginner",
      category: "security",
      tags: ["Security", "Threats", "Defense", "Compliance"],
      thumbnail: "/api/placeholder/300/200",
      isNew: true,
      isTrending: false,
      hasAssessment: true,
      prerequisites: ["Basic IT Knowledge"]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty.toLowerCase() === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const handleEnrollCourse = (courseId: string, courseName: string) => {
    toast({
      title: "Enrolled Successfully!",
      description: `You have been enrolled in "${courseName}"`,
    });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Browse Learning</h2>
          <p className="text-muted-foreground">Discover new courses and expand your skills</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <BookOpen className="w-3 h-3" />
          {courses.length} Courses Available
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedCourses.length} of {courses.length} courses
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="w-3 h-3" />
            Filters
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCourses.map((course) => (
          <Card key={course.id} className="group transition-all duration-200 hover:shadow-md">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-t-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute top-2 left-2 flex gap-1">
                {course.isNew && (
                  <Badge className="bg-success text-success-foreground">New</Badge>
                )}
                {course.isTrending && (
                  <Badge variant="outline" className="bg-background">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background">
                  {course.price}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <p className="text-sm font-medium text-primary">
                By {course.instructor}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.students.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                {course.hasAssessment && (
                  <Badge variant="outline" className="gap-1">
                    <Award className="w-3 h-3" />
                    Certificate
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <Button 
                className="w-full gap-2"
                onClick={() => handleEnrollCourse(course.id, course.title)}
              >
                <Plus className="w-4 h-4" />
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all courses
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrowseLearning;