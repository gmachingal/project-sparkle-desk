import { useState } from "react";
import Header from "@/components/Header";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  // Mock user role - in real app this would come from auth context
  const [userRole] = useState<'admin' | 'user'>(() => {
    // Check for preferred role in localStorage (for demo purposes)
    const preferredRole = localStorage.getItem('preferredRole');
    if (preferredRole === 'admin') {
      localStorage.removeItem('preferredRole'); // Clear after use
      return 'admin';
    }
    return 'user';
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Index;
