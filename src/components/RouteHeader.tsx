
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

interface RouteHeaderProps {
  pickup: LocationData;
  destination: LocationData;
  distance: number;
  duration: string;
}

const RouteHeader: React.FC<RouteHeaderProps> = ({ pickup, destination, distance, duration }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-black hover:text-gray-700 hover:bg-gray-200 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-sm space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-gray-700 truncate">{pickup.address}</span>
              </div>
              <span className="text-gray-400 hidden sm:inline">→</span>
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-gray-700 truncate">{destination.address}</span>
              </div>
            </div>
            {distance > 0 && (
              <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span>{distance.toFixed(1)} km</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span>{duration}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteHeader;
