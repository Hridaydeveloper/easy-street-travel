
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Star, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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

interface RideOptionCardProps {
  option: RideOption;
  price: number | undefined;
  onBook: (optionId: string) => void;
}

const RideOptionCard: React.FC<RideOptionCardProps> = ({ option, price, onBook }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNow = () => {
    const { pickup, destination } = location.state || {};
    const distance = pickup?.coordinates && destination?.coordinates ? 
      Math.sqrt(
        Math.pow(destination.coordinates.lat - pickup.coordinates.lat, 2) + 
        Math.pow(destination.coordinates.lng - pickup.coordinates.lng, 2)
      ) * 111 : 0; // ~111 km per degree

    const serializableRideOption = {
      id: option.id,
      name: option.name,
      description: option.description,
      basePrice: option.basePrice,
      pricePerKm: option.pricePerKm,
      pricePerMinute: option.pricePerMinute,
      estimatedTime: option.estimatedTime,
      features: option.features,
      rating: option.rating,
      passengerCount: option.passengerCount
    };

    navigate('/payment', {
      state: {
        pickup,
        destination,
        rideOption: serializableRideOption,
        price: price || 0,
        distance,
        duration: option.estimatedTime
      }
    });
  };

  return (
    <Card className="bg-white border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl group overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 min-w-0">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="text-black group-hover:text-gray-700 transition-colors shrink-0">
              {option.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-black break-words">{option.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{option.rating}</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 break-words">{option.description}</p>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                  <Users className="h-4 w-4 text-black shrink-0" />
                  <span className="truncate">{option.passengerCount} passengers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                  <Clock className="h-4 w-4 text-gray-600 shrink-0" />
                  <span className="truncate">{option.estimatedTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                    <div className="w-1.5 h-1.5 bg-black rounded-full shrink-0"></div>
                    <span className="break-words">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:ml-4 sm:text-right shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
            <div className="text-xl sm:text-2xl font-bold text-black sm:mb-2">
              {price ? (
                <span className="text-black">₹{price}</span>
              ) : (
                <span className="text-gray-400 text-base">Calculating...</span>
              )}
            </div>
            <Button
              onClick={handleBookNow}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!price}
            >
              {!price ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Book Now
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideOptionCard;
