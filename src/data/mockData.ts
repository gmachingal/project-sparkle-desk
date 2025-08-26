import {
  FileText,
  MessageSquare,
  Code,
  BookOpen,
  Image,
  Calendar,
} from "lucide-react";
import { Document, Space, Template, SpaceMember, SpaceAnalytics, ActivityItem } from "@/types/document";

export const spaces: Space[] = [
  {
    id: "product",
    name: "Product Documentation",
    description: "All product-related documentation and specifications",
    icon: "📱",
    color: "bg-blue-500",
    members: 12,
    documents: 45,
    visibility: "team"
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Technical documentation, APIs, and development guides",
    icon: "⚙️",
    color: "bg-green-500",
    members: 8,
    documents: 32,
    visibility: "private"
  },
  {
    id: "marketing",
    name: "Marketing Hub",
    description: "Brand guidelines, campaigns, and marketing assets",
    icon: "📢",
    color: "bg-purple-500",
    members: 15,
    documents: 28,
    visibility: "public"
  },
  {
    id: "hr",
    name: "HR & Policies",
    description: "Company policies, procedures, and HR documentation",
    icon: "👥",
    color: "bg-orange-500",
    members: 6,
    documents: 18,
    visibility: "team"
  }
];

export const spaceMembers: Record<string, SpaceMember[]> = {
  product: [
    { id: "1", name: "Sarah Chen", email: "sarah@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
    { id: "2", name: "Mike Rodriguez", email: "mike@company.com", role: "Editor", avatar: "", status: "online", lastSeen: "2 min ago" },
    { id: "3", name: "Emily Davis", email: "emily@company.com", role: "Editor", avatar: "", status: "offline", lastSeen: "1 hour ago" },
    { id: "4", name: "Alex Johnson", email: "alex@company.com", role: "Viewer", avatar: "", status: "offline", lastSeen: "3 hours ago" }
  ],
  engineering: [
    { id: "5", name: "David Park", email: "david@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
    { id: "6", name: "Lisa Wang", email: "lisa@company.com", role: "Editor", avatar: "", status: "online", lastSeen: "5 min ago" }
  ],
  marketing: [
    { id: "7", name: "John Smith", email: "john@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" },
    { id: "8", name: "Anna Brown", email: "anna@company.com", role: "Editor", avatar: "", status: "offline", lastSeen: "30 min ago" }
  ],
  hr: [
    { id: "9", name: "Linda Brown", email: "linda@company.com", role: "Admin", avatar: "", status: "online", lastSeen: "now" }
  ]
};

export const spaceAnalytics: Record<string, SpaceAnalytics> = {
  product: { views: 1420, edits: 89, comments: 156, growth: "+12%" },
  engineering: { views: 891, edits: 134, comments: 98, growth: "+8%" },
  marketing: { views: 2103, edits: 67, comments: 203, growth: "+24%" },
  hr: { views: 567, edits: 23, comments: 45, growth: "+3%" }
};

export const documents: Document[] = [
  {
    id: "1",
    title: "Product Requirements Document - Mobile App V2.0",
    content: "Comprehensive PRD for the next version of our mobile application...",
    author: "Sarah Chen",
    authorAvatar: "",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    status: "published",
    tags: ["PRD", "Mobile", "Product"],
    collaborators: ["john@company.com", "alice@company.com"],
    comments: 12,
    views: 145,
    likes: 8,
    template: "product-requirements"
  },
  {
    id: "2",
    title: "API Documentation - Authentication Service",
    content: "Complete API documentation for our authentication microservice...",
    author: "Mike Rodriguez",
    authorAvatar: "",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-22",
    status: "published",
    tags: ["API", "Authentication", "Backend"],
    collaborators: ["dev-team@company.com"],
    comments: 8,
    views: 89,
    likes: 12,
    template: "api-documentation"
  },
  {
    id: "3",
    title: "Brand Guidelines 2024",
    content: "Updated brand guidelines including new logo, colors, and typography...",
    author: "Emily Davis",
    authorAvatar: "",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
    status: "published",
    tags: ["Brand", "Design", "Guidelines"],
    collaborators: ["design-team@company.com"],
    comments: 5,
    views: 203,
    likes: 15,
    template: "brand-guidelines"
  },
  {
    id: "4",
    title: "Sprint Retrospective - Q1 2024",
    content: "Retrospective notes and action items from Q1 sprints...",
    author: "Alex Johnson",
    authorAvatar: "",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
    status: "draft",
    tags: ["Retrospective", "Sprint", "Team"],
    collaborators: ["team-leads@company.com"],
    comments: 3,
    views: 56,
    likes: 4,
    template: "meeting-notes"
  },
  {
    id: "5",
    title: "Employee Handbook - Remote Work Policy",
    content: "Updated remote work policies and guidelines for all employees...",
    author: "Linda Brown",
    authorAvatar: "",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-24",
    status: "published",
    tags: ["HR", "Policy", "Remote"],
    collaborators: ["hr@company.com"],
    comments: 7,
    views: 178,
    likes: 9,
    template: "policy-document"
  }
];

export const templates: Template[] = [
  {
    id: "product-requirements",
    name: "Product Requirements Document",
    description: "Template for creating comprehensive PRDs",
    icon: FileText,
    category: "Product"
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Standard template for meeting documentation",
    icon: MessageSquare,
    category: "General"
  },
  {
    id: "api-documentation",
    name: "API Documentation",
    description: "Template for documenting APIs and technical specs",
    icon: Code,
    category: "Engineering"
  },
  {
    id: "policy-document",
    name: "Policy Document",
    description: "Template for company policies and procedures",
    icon: BookOpen,
    category: "HR"
  },
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description: "Template for brand and design documentation",
    icon: Image,
    category: "Design"
  },
  {
    id: "project-plan",
    name: "Project Plan",
    description: "Template for project planning and tracking",
    icon: Calendar,
    category: "Project Management"
  }
];

export const recentActivity: ActivityItem[] = [
  { user: "Sarah Chen", action: "updated", document: "Product Requirements Document", time: "2 hours ago" },
  { user: "Mike Rodriguez", action: "created", document: "API Rate Limiting Guide", time: "4 hours ago" },
  { user: "Emily Davis", action: "commented on", document: "Brand Guidelines 2024", time: "6 hours ago" },
  { user: "Alex Johnson", action: "shared", document: "Sprint Retrospective", time: "1 day ago" },
  { user: "Linda Brown", action: "published", document: "Remote Work Policy", time: "2 days ago" }
];