import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { useNavigate } from "react-router-dom";
import { getCurrentSection, getRoutesForSection, addRouteMapping } from "@/lib/navigation";

/**
 * Demo component to show navigation system features
 * This can be used for testing and development purposes
 */
export const NavigationDemo = () => {
  const { currentPath, currentSection, isActive, breadcrumb, isOnSubsection } = useNavigation();
  const navigate = useNavigate();

  const demoRoutes = [
    "/dashboard",
    "/my-tasks", 
    "/create-task",
    "/projects",
    "/new-project",
    "/teams",
    "/attendance",
    "/leave-management",
    "/settings"
  ];

  const handleAddCustomRoute = () => {
    // Example: Add a custom route mapping
    addRouteMapping("/custom-reports", "/projects");
    console.log("Added custom route mapping: /custom-reports -> /projects");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Navigation System Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current State</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <strong>Current Path:</strong> {currentPath}
              </div>
              <div>
                <strong>Current Section:</strong> {currentSection}
              </div>
              <div>
                <strong>Is Subsection:</strong> 
                <Badge variant={isOnSubsection ? "default" : "secondary"} className="ml-2">
                  {isOnSubsection ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Breadcrumb Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <strong>Section:</strong> {breadcrumb.section}
              </div>
              <div>
                <strong>Section Path:</strong> {breadcrumb.sectionPath}
              </div>
              {breadcrumb.subsection && (
                <div>
                  <strong>Subsection:</strong> {breadcrumb.subsection}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Navigation Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {demoRoutes.map((route) => (
                <Button
                  key={route}
                  variant={isActive(route) ? "default" : "outline"}
                  size="sm"
                  onClick={() => navigate(route)}
                  className="text-xs"
                >
                  {route}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section Mapping */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Section Mappings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["/my-tasks", "/projects", "/teams", "/attendance", "/leave-management"].map((section) => {
                const routes = getRoutesForSection(section);
                return (
                  <div key={section} className="flex items-start gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">
                      {section}
                    </Badge>
                    <div className="flex flex-wrap gap-1">
                      {routes.map((route) => (
                        <span key={route} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Utils Test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Utility Functions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleAddCustomRoute} size="sm">
              Add Custom Route Mapping
            </Button>
            <div className="text-xs text-muted-foreground">
              Check console for custom route mapping result
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default NavigationDemo;