
import { useEffect } from 'react';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (window.google && window.google.maps) {
      return; // Already loaded
    }

    window.initMap = () => {
      console.log('Google Maps API loaded');
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDoA0Tm4J5P1P5UFvR3wXLVjki1ECShUMw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return <>{children}</>;
};

export default GoogleMapsLoader;
