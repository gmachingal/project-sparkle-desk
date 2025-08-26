import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, BookOpen, Clock, Star, Users, Play, Plus } from "lucide-react";

const BrowseLearning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "devops", name: "DevOps" },
    { id: "security", name: "Security" },
    { id: "project-management", name: "Management" }
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
      price: "Free",
      difficulty: "Intermediate",
      category: "frontend",
      tags: ["React", "JavaScript", "Hooks"]
    },
    {
      id: "nodejs-microservices",
      title: "Node.js Microservices Architecture",
      description: "Build scalable microservices with Node.js, Docker, and Kubernetes",
      instructor: "Emily Davis",
      rating: 4.8,
      students: 8200,
      duration: "24 hours",
      price: "Premium",
      difficulty: "Advanced",
      category: "backend",
      tags: ["Node.js", "Microservices", "Docker"]
    },
    {
      id: "aws-cloud-architect",
      title: "AWS Cloud Architect Certification",
      description: "Prepare for AWS Solutions Architect certification with hands-on labs",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 9800,
      duration: "45 hours",
      price: "Premium",
      difficulty: "Advanced",
      category: "devops",
      tags: ["AWS", "Cloud", "Architecture"]
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      description: "Essential security concepts, threat analysis, and defense strategies",
      instructor: "Robert Kim",
      rating: 4.8,
      students: 7200,
      duration: "16 hours",
      price: "Free",
      difficulty: "Beginner",
      category: "security",
      tags: ["Security", "Threats", "Defense"]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEnrollCourse = (courseId: string, courseName: string) => {
    toast({
      title: "Enrolled Successfully!",
      description: `You have been enrolled in "${courseName}"`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Browse Courses</h2>
          <p className="text-sm text-muted-foreground">Discover new courses and expand your skills</p>
        </div>
        <Badge variant="outline" className="gap-1 text-xs">
          <BookOpen className="w-3 h-3" />
          {courses.length} Available
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
              <Input
                placeholder="Search courses or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
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
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="group transition-all duration-200 hover:shadow-md">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/30 rounded-t-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-primary" />
            </div>
            
            <CardHeader className="space-y-2 pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {course.title}
                </CardTitle>
                <Badge variant="outline" className="text-xs">{course.price}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <p className="text-xs font-medium text-primary">
                By {course.instructor}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
              
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                size="sm"
                className="w-full gap-2 h-7"
                onClick={() => handleEnrollCourse(course.id, course.title)}
              >
                <Plus className="w-3 h-3" />
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-medium mb-2">No courses found</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Try adjusting your search or browse all courses
            </p>
            <Button size="sm" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
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