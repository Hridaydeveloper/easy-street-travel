
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!window.google || !mapRef.current || !pickup.coordinates || !destination.coordinates) {
      console.log('Google Maps not loaded or coordinates missing');
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: pickup.coordinates,
      styles: [] // Remove dark theme styles for normal appearance
    });

    // Add markers
    new window.google.maps.Marker({
      position: pickup.coordinates,
      map: mapInstance,
      title: 'Pickup Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="#10B981"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });

    new window.google.maps.Marker({
      position: destination.coordinates,
      map: mapInstance,
      title: 'Destination',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="#EF4444"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });

    // Calculate route
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#3B82F6',
        strokeWeight: 5
      }
    });

    directionsRenderer.setMap(mapInstance);

    directionsService.route({
      origin: pickup.coordinates,
      destination: destination.coordinates,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
        
        const route = result.routes[0];
        const leg = route.legs[0];
        
        const distance = leg.distance?.value ? leg.distance.value / 1609.34 : 0;
        const duration = leg.duration?.text || '';
        
        onRouteCalculated(distance, duration);
      }
    });
  }, [pickup, destination, onRouteCalculated]);

  return (
    <Card className="h-96 lg:h-full bg-white border-gray-300 overflow-hidden">
      <CardContent className="p-0 h-full">
        <div ref={mapRef} className="w-full h-full rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
