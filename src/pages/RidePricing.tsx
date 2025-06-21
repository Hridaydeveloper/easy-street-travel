
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Car, Users, Crown } from "lucide-react";
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
  pricePerMile: number;
  pricePerMinute: number;
  estimatedTime: string;
  features: string[];
  rating: number;
  passengerCount: string;
}

const RidePricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<string>('');
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  const { pickup, destination, rideType } = location.state || {};

  const rideOptions: RideOption[] = [
    {
      id: 'uberx',
      name: 'UberX',
      description: 'Affordable, everyday rides',
      icon: <Car className="h-8 w-8" />,
      basePrice: 2.50,
      pricePerMile: 1.75,
      pricePerMinute: 0.30,
      estimatedTime: '2-5 min',
      features: ['Clean vehicles', 'Professional drivers', 'Door-to-door service'],
      rating: 4.8,
      passengerCount: '1-4'
    },
    {
      id: 'uberxl',
      name: 'UberXL',
      description: 'Larger rides for up to 6',
      icon: <Users className="h-8 w-8" />,
      basePrice: 3.50,
      pricePerMile: 2.25,
      pricePerMinute: 0.45,
      estimatedTime: '3-8 min',
      features: ['Extra space', 'Group travel', 'Luggage friendly'],
      rating: 4.7,
      passengerCount: '1-6'
    },
    {
      id: 'uberblack',
      name: 'Uber Black',
      description: 'Premium rides in luxury cars',
      icon: <Crown className="h-8 w-8" />,
      basePrice: 7.00,
      pricePerMile: 3.75,
      pricePerMinute: 0.65,
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
    setDistance(calculatedDistance);
    setDuration(calculatedDuration);
    
    const calculatedPrices: { [key: string]: number } = {};
    const distanceInMiles = calculatedDistance;
    const durationInMinutes = parseInt(calculatedDuration) || 0;
    
    rideOptions.forEach(option => {
      const price = option.basePrice + 
                   (distanceInMiles * option.pricePerMile) + 
                   (durationInMinutes * option.pricePerMinute);
      calculatedPrices[option.id] = Math.round(price * 100) / 100;
    });
    
    setPrices(calculatedPrices);
  };

  const handleBookRide = (optionId: string) => {
    console.log('Booking ride:', optionId, prices[optionId]);
    alert(`Ride booked! Estimated price: $${prices[optionId]}`);
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
          distance={distance}
          duration={duration}
        />

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mobile Map - Show above Choose Your Ride heading on small screens */}
            <div className="lg:hidden order-1 mb-6">
              <MapDisplay
                pickup={pickup}
                destination={destination}
                onRouteCalculated={handleRouteCalculated}
              />
            </div>

            {/* Desktop Map - Show on left for larger screens */}
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
