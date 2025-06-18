
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
    <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 truncate max-w-xs">{pickup.address}</span>
              </div>
              <span className="text-gray-500">→</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300 truncate max-w-xs">{destination.address}</span>
              </div>
            </div>
            {distance > 0 && (
              <div className="text-xs text-gray-500 mt-1 flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{distance.toFixed(1)} miles</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
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
