// Navigation section mapping utility
// This maps all routes to their main navigation sections

export const routeSectionMap: { [key: string]: string } = {
  // Dashboard routes
  "/": "/dashboard",
  "/dashboard": "/dashboard",
  
  // Task routes
  "/my-tasks": "/my-tasks",
  "/create-task": "/my-tasks",
  "/edit-task": "/my-tasks",
  "/task-view": "/my-tasks",
  "/time-logging": "/my-tasks",
  
  // Project routes
  "/projects": "/projects",
  "/new-project": "/projects",
  "/edit-project": "/projects",
  "/project-calendar": "/projects",
  "/project-status-report": "/projects",
  "/create-sprint": "/projects",
  "/edit-sprint": "/projects",
  "/sprint-dashboard": "/projects",
  "/my-sprints-list": "/projects",
  
  // Team routes
  "/teams": "/teams",
  
  // Attendance routes
  "/attendance": "/attendance",
  "/admin/attendance": "/attendance",
  
  // Leave routes
  "/leave-management": "/leave-management",
  "/admin/leave-management": "/leave-management",
  "/holiday-master": "/leave-management",
  
  // Settings routes
  "/settings": "/settings",
  
  // Admin routes
  "/admin/organizations": "/admin/organizations"
};

/**
 * Get the main navigation section for a given route
 * @param pathname - The current pathname
 * @returns The main section path that should be highlighted
 */
export const getCurrentSection = (pathname: string): string => {
  return routeSectionMap[pathname] || pathname;
};

/**
 * Check if a navigation item should be active based on current path
 * @param targetPath - The path of the navigation item
 * @param currentPath - The current pathname
 * @returns boolean indicating if the nav item should be highlighted
 */
export const isActiveSection = (targetPath: string, currentPath: string): boolean => {
  const currentSection = getCurrentSection(currentPath);
  const targetSection = getCurrentSection(targetPath);
  
  return currentSection === targetSection || (targetPath === "/dashboard" && currentPath === "/");
};

/**
 * Add a new route mapping (useful for dynamic routes or extensions)
 * @param route - The route path
 * @param section - The main section it belongs to
 */
export const addRouteMapping = (route: string, section: string): void => {
  routeSectionMap[route] = section;
};

/**
 * Get all routes that belong to a specific section
 * @param section - The main section path
 * @returns Array of route paths that belong to this section
 */
export const getRoutesForSection = (section: string): string[] => {
  return Object.keys(routeSectionMap).filter(route => routeSectionMap[route] === section);
};

/**
 * Get breadcrumb information for the current route
 * @param pathname - Current pathname
 * @returns Object with section and subsection information
 */
export const getBreadcrumb = (pathname: string) => {
  const section = getCurrentSection(pathname);
  
  const sectionNames: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/my-tasks": "Tasks",
    "/projects": "Projects", 
    "/teams": "Teams",
    "/attendance": "Attendance",
    "/leave-management": "Leave Management",
    "/settings": "Settings",
    "/admin/organizations": "Organizations"
  };

  const subsectionNames: { [key: string]: string } = {
    "/create-task": "Create Task",
    "/edit-task": "Edit Task",
    "/task-view": "Task Details",
    "/time-logging": "Time Logging",
    "/new-project": "New Project",
    "/edit-project": "Edit Project",
    "/project-calendar": "Project Calendar",
    "/project-status-report": "Status Report",
    "/create-sprint": "Create Sprint",
    "/edit-sprint": "Edit Sprint",
    "/sprint-dashboard": "Sprint Dashboard",
    "/my-sprints-list": "My Sprints",
    "/admin/attendance": "Admin Attendance",
    "/admin/leave-management": "Admin Leave Management",
    "/holiday-master": "Holiday Master"
  };

  return {
    section: sectionNames[section] || "Unknown",
    sectionPath: section,
    subsection: subsectionNames[pathname],
    isSubsection: pathname !== section
  };
};