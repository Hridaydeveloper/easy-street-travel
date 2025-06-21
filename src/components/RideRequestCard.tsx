
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock } from "lucide-react";
import RideRequestAnimation from './RideRequestAnimation';

interface RideRequest {
  id: string;
  customerName: string;
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  distance: string;
  fare: string;
  eta: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface RideRequestCardProps {
  request: RideRequest;
  onAccept: () => void;
  onDecline: () => void;
}

const RideRequestCard: React.FC<RideRequestCardProps> = ({ request, onAccept, onDecline }) => {
  const [showAnimation, setShowAnimation] = useState<'accept' | 'decline' | null>(null);

  const handleAccept = () => {
    setShowAnimation('accept');
  };

  const handleDecline = () => {
    setShowAnimation('decline');
  };

  const handleAnimationComplete = () => {
    if (showAnimation === 'accept') {
      onAccept();
    } else {
      onDecline();
    }
    setShowAnimation(null);
  };

  if (request.status !== 'pending') return null;

  return (
    <>
      <div className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">Customer: {request.customerName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="font-medium text-gray-900">{request.pickup.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4 text-red-600" />
              <span className="text-gray-700">{request.destination.address}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{request.distance}</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {request.eta}
              </span>
            </div>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="text-lg md:text-xl font-bold text-green-600">{request.fare}</p>
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white">
                Accept
              </Button>
              <Button size="sm" onClick={handleDecline} className="bg-gray-600 hover:bg-gray-700 text-white">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showAnimation && (
        <RideRequestAnimation
          type={showAnimation}
          onComplete={handleAnimationComplete}
        />
      )}
    </>
  );
};

export default RideRequestCard;
