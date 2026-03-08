
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/LocationSearchInput";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface BookingCardProps {
  pickup: LocationData;
  destination: LocationData;
  routeInfo: {
    distance: number;
    duration: string;
  } | null;
  onPickupChange: (address: string, placeId?: string, coordinates?: {
    lat: number;
    lng: number;
  }) => void;
  onDestinationChange: (address: string, placeId?: string, coordinates?: {
    lat: number;
    lng: number;
  }) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  pickup,
  destination,
  routeInfo,
  onPickupChange,
  onDestinationChange
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, user } = useAuth();

  const handleFindRides = () => {
    if (!pickup.coordinates || !destination.coordinates) {
      return;
    }

    // If user is guest or not authenticated, redirect to auth page
    if (isGuest || !isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Create a ride request and store it for drivers to see
    const rideRequest = {
      customerId: user?.id || 'unknown',
      customerName: `${user?.firstName || 'Unknown'} ${user?.lastName || 'User'}`,
      pickup,
      destination,
      distance: routeInfo ? `${(routeInfo.distance * 1.60934).toFixed(1)} km` : '0 km',
      fare: routeInfo ? `₹${Math.round(routeInfo.distance * 1.60934 * 11 + 40)}` : '₹100',
      eta: '5 min'
    };

    // Store the request for drivers to pick up
    const existingRequests = JSON.parse(localStorage.getItem('pendingRideRequests') || '[]');
    existingRequests.push(rideRequest);
    localStorage.setItem('pendingRideRequests', JSON.stringify(existingRequests));

    // Navigate to ride pricing
    navigate('/ride-pricing', {
      state: {
        pickup,
        destination,
        rideType: 'now'
      }
    });
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-900">
          <MapPin className="h-5 w-5 text-orange-500" />
          <span>Book a New Ride</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <LocationSearchInput 
            placeholder="Enter pickup location" 
            value={pickup.address} 
            onChange={onPickupChange} 
            icon="pickup" 
          />
          <LocationSearchInput 
            placeholder="Enter destination" 
            value={destination.address} 
            onChange={onDestinationChange} 
            icon="destination" 
          />
        </div>
        
        {routeInfo && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-900 text-sm">
              Distance: {(routeInfo.distance * 1.60934).toFixed(1)} km • Duration: {routeInfo.duration}
            </p>
          </div>
        )}
        
        <Button 
          disabled={!pickup.coordinates || !destination.coordinates} 
          onClick={handleFindRides} 
          className="w-full py-3 transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800"
        >
          {isGuest || !isAuthenticated ? 'Login to See Prices' : 'Find Rides'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
