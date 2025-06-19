
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    initMap: () => void;
    googleMapsLoaded: boolean;
  }
}

const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already loading
    if (window.googleMapsLoaded || document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for existing script to load
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          setIsLoaded(true);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    // Mark that we're loading Google Maps
    window.googleMapsLoaded = true;

    window.initMap = () => {
      console.log('Google Maps API loaded successfully');
      setIsLoaded(true);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDoA0Tm4J5P1P5UFvR3wXLVjki1ECShUMw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
      window.googleMapsLoaded = false;
    };
    
    document.head.appendChild(script);

    return () => {
      // Don't remove the script as it might be used by other components
    };
  }, []);

  return <>{children}</>;
};

export default GoogleMapsLoader;
