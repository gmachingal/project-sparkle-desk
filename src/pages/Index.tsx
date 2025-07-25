import { useState } from "react";
import Header from "@/components/Header";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  // Mock user role - in real app this would come from auth context
  const [userRole] = useState<'admin' | 'user'>('user'); // Change to 'admin' to see admin view

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Index;
