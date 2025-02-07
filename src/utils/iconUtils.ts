/**
 * Get all available icons from the public/icons directory
 * @returns Array of icon paths
 */
export const getAvailableIcons = async (): Promise<string[]> => {
  // Use Vite's glob import to get all SVG files from the icons directory
  const iconModules = import.meta.glob('/src/assets/icons/*.svg', { eager: true });
  
  // Convert the modules object into an array of icon paths
  return Object.keys(iconModules).map(path => 
    // Convert the full path to the public path format
    path
  ).sort();
};
