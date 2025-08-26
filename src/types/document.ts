export interface Document {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  collaborators: string[];
  comments: number;
  views: number;
  likes: number;
  parent?: string;
  children?: string[];
  template?: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  documents: number;
  visibility: "public" | "private" | "team";
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
}

export interface SpaceMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  lastSeen: string;
}

export interface SpaceAnalytics {
  views: number;
  edits: number;
  comments: number;
  growth: string;
}

export interface ActivityItem {
  user: string;
  action: string;
  document: string;
  time: string;
}