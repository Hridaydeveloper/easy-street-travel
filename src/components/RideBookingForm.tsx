
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";

const RideBookingForm = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('now');

  const handleBookRide = () => {
    // Handle ride booking logic
    console.log('Booking ride:', { pickup, destination, rideType });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 space-y-4">
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={rideType === 'now' ? 'default' : 'ghost'}
          onClick={() => setRideType('now')}
          className={`flex-1 ${rideType === 'now' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/20'}`}
        >
          <Clock className="h-4 w-4 mr-2" />
          Now
        </Button>
        <Button 
          variant={rideType === 'later' ? 'default' : 'ghost'}
          onClick={() => setRideType('later')}
          className={`flex-1 ${rideType === 'later' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/20'}`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule for later
        </Button>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="pl-10 bg-white/90 border-white/30 placeholder-gray-500 text-gray-800"
          />
        </div>
        
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 bg-white/90 border-white/30 placeholder-gray-500 text-gray-800"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button 
          onClick={handleBookRide}
          className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 hover:from-yellow-500 hover:to-orange-600 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
        >
          See prices
        </Button>
        <Button 
          variant="outline"
          className="px-6 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
        >
          Schedule for later
        </Button>
      </div>
    </div>
  );
};

export default RideBookingForm;
