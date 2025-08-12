import { useLocation } from "react-router-dom";
import { getCurrentSection, isActiveSection, getBreadcrumb } from "@/lib/navigation";

/**
 * Custom hook for navigation state and utilities
 * Provides easy access to current section, active state checking, and breadcrumbs
 */
export const useNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return {
    /**
     * Current pathname
     */
    currentPath,
    
    /**
     * Current main navigation section
     */
    currentSection: getCurrentSection(currentPath),
    
    /**
     * Check if a navigation item should be highlighted
     * @param targetPath - Path to check against
     */
    isActive: (targetPath: string) => isActiveSection(targetPath, currentPath),
    
    /**
     * Get breadcrumb information for current route
     */
    breadcrumb: getBreadcrumb(currentPath),
    
    /**
     * Check if currently on a subsection page
     */
    isOnSubsection: getBreadcrumb(currentPath).isSubsection
  };
};