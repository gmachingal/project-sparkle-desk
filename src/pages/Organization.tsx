import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Building2, Calendar, Crown } from "lucide-react";

const Organization = () => {
  // Mock organization data
  const organization = {
    name: "TechCorp Solutions",
    id: "ORG-2024-001",
    plan: "Enterprise",
    totalLicenses: 50,
    usedLicenses: 37,
    joinedDate: "January 15, 2024",
    adminEmail: "admin@techcorp.com",
    features: [
      { name: "Project Management", enabled: true },
      { name: "Time Tracking", enabled: true },
      { name: "Advanced Analytics", enabled: true },
      { name: "API Access", enabled: false },
      { name: "Custom Integrations", enabled: true },
      { name: "Priority Support", enabled: true }
    ]
  };

  const licenseUsagePercentage = (organization.usedLicenses / organization.totalLicenses) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">My Organization</h1>
            <p className="text-muted-foreground">Organization details and membership information</p>
          </div>
        </div>

        {/* Organization Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {organization.name}
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    {organization.plan}
                  </Badge>
                </CardTitle>
                <CardDescription>Organization ID: {organization.id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4" />
                  License Usage
                </div>
                <div className="space-y-2">
                  <Progress value={licenseUsagePercentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {organization.usedLicenses} of {organization.totalLicenses} licenses used
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </div>
                <p className="text-sm text-muted-foreground">{organization.joinedDate}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4" />
                  Admin Contact
                </div>
                <p className="text-sm text-muted-foreground">{organization.adminEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Features */}
        <Card>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
            <CardDescription>Features enabled for your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organization.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{feature.name}</span>
                  <Badge variant={feature.enabled ? "default" : "secondary"}>
                    {feature.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Organization Members */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest organization activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">New user joined</p>
                  <p className="text-sm text-muted-foreground">john.doe@techcorp.com joined the organization</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Feature activated</p>
                  <p className="text-sm text-muted-foreground">Custom Integrations feature was enabled</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">License updated</p>
                  <p className="text-sm text-muted-foreground">Organization plan upgraded to Enterprise</p>
                </div>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default Organization;