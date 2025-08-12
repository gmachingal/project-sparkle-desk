import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "@/hooks/use-navigation";

interface BreadcrumbProps {
  /**
   * Optional custom items to override the automatic breadcrumb
   */
  customItems?: Array<{
    label: string;
    path?: string;
    isActive?: boolean;
  }>;
  
  /**
   * Whether to show the home icon
   */
  showHome?: boolean;
  
  /**
   * Custom className for styling
   */
  className?: string;
}

export const Breadcrumb = ({ customItems, showHome = true, className = "" }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const { breadcrumb, currentSection } = useNavigation();

  const items = customItems || [
    ...(showHome ? [{ label: "Home", path: "/dashboard", isActive: false }] : []),
    { label: breadcrumb.section, path: breadcrumb.sectionPath, isActive: !breadcrumb.isSubsection },
    ...(breadcrumb.isSubsection && breadcrumb.subsection 
      ? [{ label: breadcrumb.subsection, isActive: true }] 
      : []
    )
  ];

  if (items.length <= 1) return null;

  return (
    <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
          {item.path && !item.isActive ? (
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => navigate(item.path!)}
              className="h-auto p-1 font-normal text-muted-foreground hover:text-foreground"
            >
              {index === 0 && showHome && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </Button>
          ) : (
            <span className={`px-1 ${item.isActive ? 'text-foreground font-medium' : ''}`}>
              {index === 0 && showHome && <Home className="w-4 h-4 mr-1 inline" />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;