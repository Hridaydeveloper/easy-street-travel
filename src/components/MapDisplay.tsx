
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
  const [routeCalculated, setRouteCalculated] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current || mapInstanceRef.current) {
        return;
      }

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 40.7128, lng: -74.0060 },
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

      directionsServiceRef.current = new window.google.maps.DirectionsService();
      setIsMapReady(true);
      console.log('Map initialized successfully');
    };

    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);
      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  const calculateRoute = useCallback(() => {
    if (!isMapReady || !mapInstanceRef.current || !directionsServiceRef.current || 
        !pickup.coordinates || !destination.coordinates || routeCalculated) {
      return;
    }

    // Clean up previous renderer
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }

    // Create new renderer
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      preserveViewport: false,
      polylineOptions: {
        strokeColor: '#1a73e8',
        strokeWeight: 5,
        strokeOpacity: 1.0,
        geodesic: true
      }
    });
    
    directionsRendererRef.current.setMap(mapInstanceRef.current);

    directionsServiceRef.current.route({
      origin: pickup.coordinates,
      destination: destination.coordinates,
      travelMode: window.google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false
    }, (result, status) => {
      if (status === 'OK' && result && directionsRendererRef.current) {
        directionsRendererRef.current.setDirections(result);
        
        const route = result.routes[0];
        const leg = route.legs[0];
        
        const distance = leg.distance?.value ? leg.distance.value / 1609.34 : 0;
        const duration = leg.duration?.text || '';
        
        onRouteCalculated(distance, duration);
        setDirectionsLoaded(true);
        setRouteCalculated(true);
        
        console.log('Route calculated successfully:', { distance: distance.toFixed(1), duration });
      } else {
        console.error('Directions request failed:', status);
        setDirectionsLoaded(false);
      }
    });
  }, [pickup.coordinates, destination.coordinates, isMapReady, onRouteCalculated, routeCalculated]);

  useEffect(() => {
    if (pickup.coordinates && destination.coordinates && isMapReady && !routeCalculated) {
      const timer = setTimeout(() => {
        calculateRoute();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [calculateRoute, pickup.coordinates, destination.coordinates, isMapReady, routeCalculated]);

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
