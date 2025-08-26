import { useEffect } from 'react';
import AOS from 'aos';

export const useAOS = () => {
  useEffect(() => {
    // Refresh AOS when component mounts
    AOS.refresh();
    
    // Also refresh after a short delay to ensure all elements are rendered
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
};
