import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Award, Download, Share2, Calendar, CheckCircle, Trophy, Star, Eye, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ViewAllCertificates = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  const certificates = [
    {
      id: "cert-001",
      title: "React Advanced Patterns Certification",
      course: "Advanced React Patterns",
      issueDate: "2024-01-15",
      expiryDate: "2026-01-15",
      score: 92,
      status: "active",
      credentialId: "RC-2024-001-ADV",
      instructor: "Sarah Johnson",
      category: "Frontend Development",
      level: "Advanced",
      skills: ["React", "Hooks", "Performance", "Testing"],
      verificationUrl: "https://certificates.company.com/verify/RC-2024-001-ADV",
      downloadUrl: "#",
      description: "This certification validates advanced React development skills including custom hooks, performance optimization, and testing strategies.",
      employee: "Alex Johnson",
      employeeRole: "Senior Frontend Developer",
      department: "Engineering"
    },
    {
      id: "cert-002",
      title: "TypeScript Fundamentals Certification",
      course: "TypeScript for JavaScript Developers",
      issueDate: "2023-11-20",
      expiryDate: "2025-11-20",
      score: 88,
      status: "active",
      credentialId: "TS-2023-002-FUN",
      instructor: "Mark Davis",
      category: "Programming",
      level: "Intermediate",
      skills: ["TypeScript", "Interfaces", "Generics", "Type Safety"],
      verificationUrl: "https://certificates.company.com/verify/TS-2023-002-FUN",
      downloadUrl: "#",
      description: "Demonstrates proficiency in TypeScript fundamentals including type definitions, interfaces, and advanced type features.",
      employee: "Sarah Chen",
      employeeRole: "UI/UX Designer",
      department: "Design"
    },
    {
      id: "cert-003",
      title: "Agile Project Management Certification",
      course: "Agile & Scrum Principles",
      issueDate: "2023-12-10",
      expiryDate: "2025-12-10",
      score: 95,
      status: "active",
      credentialId: "AG-2023-003-PMP",
      instructor: "Emily Chen",
      category: "Project Management",
      level: "Intermediate",
      skills: ["Agile", "Scrum", "Sprint Planning", "Team Leadership"],
      verificationUrl: "https://certificates.company.com/verify/AG-2023-003-PMP",
      downloadUrl: "#",
      description: "Certifies understanding of Agile methodologies and Scrum framework for effective project management.",
      employee: "Mike Rodriguez",
      employeeRole: "Backend Developer",
      department: "Engineering"
    },
    {
      id: "cert-004",
      title: "Cybersecurity Awareness Certification",
      course: "Cybersecurity Fundamentals",
      issueDate: "2023-10-05",
      expiryDate: "2024-10-05",
      score: 89,
      status: "expiring",
      credentialId: "CS-2023-004-AWR",
      instructor: "Robert Kim",
      category: "Security",
      level: "Beginner",
      skills: ["Security", "Threat Detection", "Compliance", "Risk Assessment"],
      verificationUrl: "https://certificates.company.com/verify/CS-2023-004-AWR",
      downloadUrl: "#",
      description: "Validates knowledge of cybersecurity fundamentals and awareness of common security threats and mitigation strategies.",
      employee: "Emily Davis",
      employeeRole: "Marketing Manager",
      department: "Marketing"
    },
    {
      id: "cert-005",
      title: "Git Workflow Mastery Certification",
      course: "Git Version Control",
      issueDate: "2023-08-15",
      expiryDate: null,
      score: 92,
      status: "lifetime",
      credentialId: "GIT-2023-005-MAS",
      instructor: "Alex Thompson",
      category: "Development Tools",
      level: "Intermediate",
      skills: ["Git", "Version Control", "Branching", "Collaboration"],
      verificationUrl: "https://certificates.company.com/verify/GIT-2023-005-MAS",
      downloadUrl: "#",
      description: "Demonstrates mastery of Git version control system including advanced workflows and collaboration techniques.",
      employee: "Alex Johnson",
      employeeRole: "Senior Frontend Developer",
      department: "Engineering"
    },
    {
      id: "cert-006",
      title: "RESTful API Design Certification",
      course: "API Development Best Practices",
      issueDate: "2023-07-20",
      expiryDate: "2025-07-20",
      score: 88,
      status: "active",
      credentialId: "API-2023-006-REST",
      instructor: "Maria Gonzalez",
      category: "Backend Development",
      level: "Intermediate",
      skills: ["REST API", "HTTP", "Authentication", "Documentation"],
      verificationUrl: "https://certificates.company.com/verify/API-2023-006-REST",
      downloadUrl: "#",
      description: "Certifies proficiency in designing and developing RESTful APIs following industry best practices.",
      employee: "Sarah Chen",
      employeeRole: "UI/UX Designer", 
      department: "Design"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Frontend Development", name: "Frontend Development" },
    { id: "Backend Development", name: "Backend Development" },
    { id: "Programming", name: "Programming" },
    { id: "Project Management", name: "Project Management" },
    { id: "Security", name: "Security" },
    { id: "Development Tools", name: "Development Tools" }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedFilter === "all" || cert.category === selectedFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "expiring": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired": return "bg-red-100 text-red-800 border-red-200";
      case "lifetime": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
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

  const handleViewDetails = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsDetailDialogOpen(true);
  };

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === "active").length,
    expiring: certificates.filter(c => c.status === "expiring").length,
    lifetime: certificates.filter(c => c.status === "lifetime").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Organization Certificates</h2>
          <p className="text-muted-foreground">View and manage all employee learning achievements</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Trophy className="w-3 h-3" />
          {stats.total} Total Certificates
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.expiring}</div>
            <div className="text-sm text-muted-foreground">Expiring Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.lifetime}</div>
            <div className="text-sm text-muted-foreground">Lifetime</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
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

      {/* Certificates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCertificates.map((certificate) => (
          <Card 
            key={certificate.id}
            className="group transition-all duration-200 hover:shadow-md cursor-pointer hover:scale-[1.02]"
            onClick={() => handleViewDetails(certificate)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <Award className="w-8 h-8 text-primary" />
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(certificate.status)}>
                    {certificate.status}
                  </Badge>
                  <Badge className={getLevelColor(certificate.level)}>
                    {certificate.level}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg line-clamp-2">{certificate.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{certificate.course}</p>
                <p className="text-sm text-primary font-medium">By {certificate.instructor}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Employee Information - Admin Context */}
              <div className="p-3 bg-muted/50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{certificate.employee}</p>
                    <p className="text-xs text-muted-foreground">{certificate.employeeRole}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {certificate.department}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span className="font-medium">{certificate.score}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Issued</span>
                  <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                </div>
                {certificate.expiryDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Expires</span>
                    <span>{new Date(certificate.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1">
                {certificate.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {certificate.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{certificate.skills.length - 3}
                  </Badge>
                )}
              </div>
              
              {/* Click hint */}
              <div className="text-xs text-muted-foreground text-center py-2 opacity-60 group-hover:opacity-100 transition-opacity">
                Click to view certificate details
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No certificates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria" : "Start learning to earn your first certificate!"}
            </p>
            {searchTerm && (
              <Button onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Certificate Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Certificate Details
            </DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-6">
              <div className="text-center border-2 border-primary/20 rounded-lg p-6 bg-gradient-to-br from-primary/5 to-primary-glow/10">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{selectedCertificate.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedCertificate.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Credential ID:</span>
                    <p className="font-mono font-medium">{selectedCertificate.credentialId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Score:</span>
                    <p className="font-medium">{selectedCertificate.score}%</p>
                  </div>
                </div>
              </div>
              
              {/* Employee Information in Detail View */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      Employee Information
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{selectedCertificate.employee}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Role:</span>
                      <p className="font-medium">{selectedCertificate.employeeRole}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Department:</span>
                      <p className="font-medium">{selectedCertificate.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Course Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Course:</span> {selectedCertificate.course}</p>
                    <p><span className="text-muted-foreground">Instructor:</span> {selectedCertificate.instructor}</p>
                    <p><span className="text-muted-foreground">Category:</span> {selectedCertificate.category}</p>
                    <p><span className="text-muted-foreground">Level:</span> {selectedCertificate.level}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Certification Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Issue Date:</span> {new Date(selectedCertificate.issueDate).toLocaleDateString()}</p>
                    {selectedCertificate.expiryDate ? (
                      <p><span className="text-muted-foreground">Expiry Date:</span> {new Date(selectedCertificate.expiryDate).toLocaleDateString()}</p>
                    ) : (
                      <p><span className="text-muted-foreground">Validity:</span> Lifetime</p>
                    )}
                    <p><span className="text-muted-foreground">Status:</span> <Badge className={getStatusColor(selectedCertificate.status)}>{selectedCertificate.status}</Badge></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Skills Validated</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => handleDownload(selectedCertificate.credentialId, selectedCertificate.title)}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => handleShare(selectedCertificate.credentialId, selectedCertificate.title)}
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewAllCertificates;