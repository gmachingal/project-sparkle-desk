import { useState } from "react";
import Header from "@/components/Header";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  // Mock user role - in real app this would come from auth context
  const [userRole] = useState<'admin' | 'user'>(() => {
    // Check for admin context based on various indicators
    const preferredRole = localStorage.getItem('preferredRole');
    const currentPath = window.location.pathname;
    const hasAdminContext = currentPath.includes('/admin') || 
                           currentPath.includes('admin-') || 
                           currentPath === '/organization' ||
                           preferredRole === 'admin';
    
    // Maintain admin state but don't clear from localStorage
    return hasAdminContext ? 'admin' : 'user';
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Index;
