
import React, { useEffect, useRef, useState } from 'react';
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
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current) {
        console.log('Google Maps not loaded or ref not ready');
        return;
      }

      if (mapInstanceRef.current) {
        return; // Map already initialized
      }

      // Initialize map with normal Google Maps theme
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [] // Normal Google Maps styling
      });

      setIsMapReady(true);
      console.log('Map initialized successfully');
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

  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !pickup.coordinates || !destination.coordinates) {
      return;
    }

    // Clear existing directions renderer to prevent blinking
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    // Create new directions renderer with stable styling
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      preserveViewport: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 6,
        strokeOpacity: 0.9,
        geodesic: true
      },
      markerOptions: {
        draggable: false,
        animation: null // Disable marker animations to prevent blinking
      }
    });

    directionsRendererRef.current.setMap(mapInstanceRef.current);

    // Calculate and display route
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route({
      origin: pickup.coordinates,
      destination: destination.coordinates,
      travelMode: window.google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false,
      optimizeWaypoints: false
    }, (result, status) => {
      if (status === 'OK' && result && directionsRendererRef.current && mapInstanceRef.current) {
        // Set directions without clearing previous state
        directionsRendererRef.current.setDirections(result);
        
        const route = result.routes[0];
        const leg = route.legs[0];
        
        const distance = leg.distance?.value ? leg.distance.value / 1609.34 : 0;
        const duration = leg.duration?.text || '';
        
        onRouteCalculated(distance, duration);
        
        // Fit map to show entire route with padding
        const bounds = new (window.google.maps as any).LatLngBounds();
        bounds.extend(new (window.google.maps as any).LatLng(pickup.coordinates.lat, pickup.coordinates.lng));
        bounds.extend(new (window.google.maps as any).LatLng(destination.coordinates.lat, destination.coordinates.lng));
        
        // Use fitBounds with padding to prevent constant readjustment
        (mapInstanceRef.current as any).fitBounds(bounds, {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80
        });
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });

    // Cleanup function to prevent memory leaks
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, [pickup.coordinates, destination.coordinates, onRouteCalculated, isMapReady]);

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
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
