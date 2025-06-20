
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

interface MapDisplayProps {
  pickup: LocationData;
  destination: LocationData;
  onRouteCalculated: (distance: number, duration: string) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ pickup, destination, onRouteCalculated }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [directionsLoaded, setDirectionsLoaded] = useState(false);

  // Memoize coordinates to prevent unnecessary re-renders
  const pickupKey = pickup.coordinates ? `${pickup.coordinates.lat},${pickup.coordinates.lng}` : '';
  const destinationKey = destination.coordinates ? `${destination.coordinates.lat},${destination.coordinates.lng}` : '';
  const routeKey = `${pickupKey}-${destinationKey}`;

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current) {
        console.log('Google Maps not loaded or ref not ready');
        return;
      }

      if (mapInstanceRef.current) {
        return; // Map already initialized
      }

      // Initialize map with proper zoom controls
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        gestureHandling: 'auto',
        styles: [],
        clickableIcons: true,
        keyboardShortcuts: true
      });

      // Initialize directions service
      directionsServiceRef.current = new window.google.maps.DirectionsService();

      setIsMapReady(true);
      console.log('Map initialized successfully with zoom controls');
    };

    // Check if Google Maps is loaded
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);

      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  const calculateAndDisplayRoute = useCallback(() => {
    if (!isMapReady || !mapInstanceRef.current || !directionsServiceRef.current || 
        !pickup.coordinates || !destination.coordinates) {
      return;
    }

    // Clean up previous directions renderer
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    // Create new directions renderer
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      preserveViewport: false,
      polylineOptions: {
        strokeColor: '#1a73e8',
        strokeWeight: 5,
        strokeOpacity: 1.0,
        geodesic: true
      },
      markerOptions: {
        draggable: false
      }
    });
    
    directionsRendererRef.current.setMap(mapInstanceRef.current);

    // Calculate route
    directionsServiceRef.current.route({
      origin: pickup.coordinates,
      destination: destination.coordinates,
      travelMode: window.google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false
    }, (result, status) => {
      if (status === 'OK' && result && directionsRendererRef.current) {
        try {
          // Set the directions
          directionsRendererRef.current.setDirections(result);
          
          const route = result.routes[0];
          const leg = route.legs[0];
          
          const distance = leg.distance?.value ? leg.distance.value / 1609.34 : 0;
          const duration = leg.duration?.text || '';
          
          onRouteCalculated(distance, duration);
          setDirectionsLoaded(true);
          
          console.log('Route calculated successfully:', { distance: distance.toFixed(1), duration });
        } catch (error) {
          console.error('Error setting directions:', error);
        }
      } else {
        console.error('Directions request failed:', status);
        setDirectionsLoaded(false);
      }
    });
  }, [pickup.coordinates, destination.coordinates, isMapReady, onRouteCalculated]);

  // Effect to calculate route when coordinates change
  useEffect(() => {
    if (pickup.coordinates && destination.coordinates && isMapReady) {
      // Small delay to ensure map is fully ready
      const timer = setTimeout(() => {
        calculateAndDisplayRoute();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [routeKey, calculateAndDisplayRoute, isMapReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="h-96 lg:h-full bg-white border-gray-300 overflow-hidden">
      <CardContent className="p-0 h-full relative">
        <div 
          ref={mapRef} 
          className="w-full h-full rounded-lg"
          style={{ minHeight: '300px' }}
        />
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-600">Loading map...</div>
          </div>
        )}
        {isMapReady && pickup.coordinates && destination.coordinates && !directionsLoaded && (
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Calculating route...</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
