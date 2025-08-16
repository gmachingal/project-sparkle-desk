import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import reposeLogoNew from "@/assets/repose-logo-new.png";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'member' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        // Fetch user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        setUserRole(roleData?.role || 'member');
      }
      
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          
          // Fetch user role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
          
          setUserRole(roleData?.role || 'member');
        } else {
          setUser(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show landing page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Section */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img 
                  src={reposeLogoNew} 
                  alt="Repose Logo" 
                  className="w-16 h-16"
                />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Repose
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                The complete project management solution for modern teams. 
                Streamline workflows, track progress, and boost productivity.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work together seamlessly with real-time updates and communication tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Project Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Plan, execute, and track projects from start to finish with powerful tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <LogIn className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle>Secure Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enterprise-grade security with role-based access controls.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/register")}
              >
                <UserPlus className="w-5 h-5" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Index;
