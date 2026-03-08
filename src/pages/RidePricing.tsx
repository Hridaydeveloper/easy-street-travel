
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Car, Users, Crown, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import RouteHeader from "@/components/RouteHeader";
import MapDisplay from "@/components/MapDisplay";
import RideOptionCard from "@/components/RideOptionCard";
import SafetyFeatures from "@/components/SafetyFeatures";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

interface RideOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  estimatedTime: string;
  features: string[];
  rating: number;
  passengerCount: string;
}

const MAX_DISTANCE_KM = 200;

const RidePricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number>(0);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [duration, setDuration] = useState<string>('');
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [isUnavailable, setIsUnavailable] = useState(false);

  const { pickup, destination, rideType } = location.state || {};

  // Uber India-style pricing (INR)
  const rideOptions: RideOption[] = [
    {
      id: 'ubergo',
      name: 'Uber Go',
      description: 'Affordable compact rides',
      icon: <Car className="h-8 w-8" />,
      basePrice: 40,
      pricePerKm: 11,
      pricePerMinute: 1.5,
      estimatedTime: '2-5 min',
      features: ['Compact cars', 'Professional drivers', 'Door-to-door service'],
      rating: 4.8,
      passengerCount: '1-4'
    },
    {
      id: 'uberpremier',
      name: 'Uber Premier',
      description: 'Comfortable sedans for everyday',
      icon: <Users className="h-8 w-8" />,
      basePrice: 70,
      pricePerKm: 14,
      pricePerMinute: 2,
      estimatedTime: '3-8 min',
      features: ['Sedan cars', 'Top-rated drivers', 'Extra comfort'],
      rating: 4.7,
      passengerCount: '1-4'
    },
    {
      id: 'uberxl',
      name: 'Uber XL',
      description: 'SUVs & larger cars for groups',
      icon: <Users className="h-8 w-8" />,
      basePrice: 100,
      pricePerKm: 18,
      pricePerMinute: 2.5,
      estimatedTime: '5-10 min',
      features: ['SUVs & MUVs', 'Group travel', 'Luggage friendly'],
      rating: 4.7,
      passengerCount: '1-6'
    },
    {
      id: 'uberblack',
      name: 'Uber Black',
      description: 'Premium luxury rides',
      icon: <Crown className="h-8 w-8" />,
      basePrice: 150,
      pricePerKm: 23,
      pricePerMinute: 3,
      estimatedTime: '5-12 min',
      features: ['Luxury vehicles', 'Professional chauffeurs', 'Premium service'],
      rating: 4.9,
      passengerCount: '1-4'
    }
  ];

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/');
      return;
    }
  }, [pickup, destination, navigate]);

  const handleRouteCalculated = (calculatedDistance: number, calculatedDuration: string) => {
    // calculatedDistance comes in miles, convert to km
    const km = calculatedDistance * 1.60934;
    setDistance(calculatedDistance);
    setDistanceKm(km);
    setDuration(calculatedDuration);

    if (km > MAX_DISTANCE_KM) {
      setIsUnavailable(true);
      return;
    }
    setIsUnavailable(false);
    
    const calculatedPrices: { [key: string]: number } = {};
    const durationInMinutes = parseInt(calculatedDuration) || 0;
    
    rideOptions.forEach(option => {
      let price = option.basePrice + 
                   (km * option.pricePerKm) + 
                   (durationInMinutes * option.pricePerMinute);
      // Minimum fare
      if (price < option.basePrice * 1.5) price = option.basePrice * 1.5;
      // Surge pricing placeholder (1x)
      calculatedPrices[option.id] = Math.round(price);
    });
    
    setPrices(calculatedPrices);
  };

  const handleBookRide = (optionId: string) => {
    console.log('Booking ride:', optionId, prices[optionId]);
  };

  if (!pickup || !destination) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <div className="pt-16">
        <RouteHeader 
          pickup={pickup}
          destination={destination}
          distance={distanceKm}
          duration={duration}
        />

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:hidden order-1 mb-6">
              <MapDisplay
                pickup={pickup}
                destination={destination}
                onRouteCalculated={handleRouteCalculated}
              />
            </div>

            <div className="hidden lg:block order-2 lg:order-1">
              <MapDisplay
                pickup={pickup}
                destination={destination}
                onRouteCalculated={handleRouteCalculated}
              />
            </div>

            <div className="order-2 lg:order-2 space-y-6">
              <div className="text-center lg:text-left px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                  Choose Your Ride
                </h2>
                <p className="text-gray-600">Premium transportation options for every need</p>
              </div>

              {isUnavailable ? (
                <div className="px-2">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center space-y-4">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
                    <h3 className="text-2xl font-bold text-red-700">Service Not Available</h3>
                    <p className="text-red-600 text-lg">
                      The distance between your pickup and destination is {distanceKm.toFixed(1)} km, which exceeds our maximum limit of {MAX_DISTANCE_KM} km.
                    </p>
                    <p className="text-gray-500">Please choose a closer destination or try an intercity service.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 px-2">
                  {rideOptions.map((option) => (
                    <RideOptionCard
                      key={option.id}
                      option={option}
                      price={prices[option.id]}
                      onBook={handleBookRide}
                    />
                  ))}
                </div>
              )}

              <div className="px-2">
                <SafetyFeatures />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePricing;
