
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocationSearchInput from './LocationSearchInput';
import { useAuth } from "@/contexts/AuthContext";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

const RideBookingForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest } = useAuth();
  const [pickup, setPickup] = useState<LocationData>({ address: '' });
  const [destination, setDestination] = useState<LocationData>({ address: '' });
  const [rideType, setRideType] = useState('now');

  const handlePickupChange = (address: string, placeId?: string, coordinates?: { lat: number; lng: number }) => {
    setPickup({ address, placeId, coordinates });
  };

  const handleDestinationChange = (address: string, placeId?: string, coordinates?: { lat: number; lng: number }) => {
    setDestination({ address, placeId, coordinates });
  };

  const handleBookRide = () => {
    if (!pickup.address || !destination.address) {
      alert('Please enter both pickup and destination locations');
      return;
    }

    // If user is guest or not authenticated, redirect to auth page
    if (isGuest || !isAuthenticated) {
      navigate('/auth');
      return;
    }

    console.log('Booking ride:', {
      pickup,
      destination,
      rideType
    });

    // Navigate to pricing page with location data
    navigate('/ride-pricing', {
      state: {
        pickup,
        destination,
        rideType
      }
    });
  };

  const handleScheduleLater = () => {
    // If user is guest or not authenticated, redirect to auth page
    if (isGuest || !isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Handle schedule for later functionality
    console.log('Schedule for later clicked');
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 space-y-4 shadow-2xl">
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={rideType === 'now' ? 'default' : 'ghost'} 
          onClick={() => setRideType('now')} 
          className={`flex-1 ${rideType === 'now' ? 'bg-white text-black hover:bg-gray-200' : 'text-white hover:bg-white/10'}`}
        >
          <Clock className="h-4 w-4 mr-2" />
          Now
        </Button>
        <Button 
          variant={rideType === 'later' ? 'default' : 'ghost'} 
          onClick={() => setRideType('later')} 
          className={`flex-1 ${rideType === 'later' ? 'bg-white text-black hover:bg-gray-200' : 'text-white hover:bg-white/10 hover:text-white'}`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule for later
        </Button>
      </div>

      <div className="space-y-3">
        <LocationSearchInput
          placeholder="Enter pickup location"
          value={pickup.address}
          onChange={handlePickupChange}
          icon="pickup"
        />
        
        <LocationSearchInput
          placeholder="Enter destination"
          value={destination.address}
          onChange={handleDestinationChange}
          icon="destination"
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <Button 
          onClick={handleBookRide} 
          className="flex-1 bg-white text-black hover:bg-gray-200 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
        >
          {isGuest || !isAuthenticated ? 'Login to See Prices' : 'See prices'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleScheduleLater}
          className="px-6 bg-white text-black border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          {isGuest || !isAuthenticated ? 'Login to Schedule' : 'Schedule for later'}
        </Button>
      </div>
    </div>
  );
};

export default RideBookingForm;
