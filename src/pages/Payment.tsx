
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, MapPin, CreditCard, DollarSign, Clock, User, Phone, Mail, Car, Users, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

interface RideDetails {
  pickup: LocationData;
  destination: LocationData;
  rideOption: any;
  price: number;
  distance: number;
  duration: string;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const rideDetails: RideDetails = location.state || {};

  if (!rideDetails.pickup || !rideDetails.destination) {
    navigate('/');
    return null;
  }

  const handlePayment = async () => {
    setIsBooking(true);
    
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
    }, 2000);
  };

  // Get the appropriate icon based on ride option
  const getRideIcon = (rideOptionId: string) => {
    switch (rideOptionId) {
      case 'uberx':
        return <Car className="h-8 w-8" />;
      case 'uberxl':
        return <Users className="h-8 w-8" />;
      case 'uberblack':
        return <Crown className="h-8 w-8" />;
      default:
        return <Car className="h-8 w-8" />;
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <div className="pt-16 container mx-auto p-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-black mb-2">Ride Booked Successfully!</h1>
              <p className="text-gray-600">Your ride is arriving in 3-5 minutes</p>
            </div>

            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 truncate">{rideDetails.pickup.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 truncate">{rideDetails.destination.address}</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-16">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="container mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-black hover:bg-gray-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-black">Payment</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 max-w-2xl">
          <div className="space-y-6">
            {/* Trip Details */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Trip Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{rideDetails.pickup.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{rideDetails.destination.address}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-semibold text-black">{rideDetails.distance?.toFixed(1)} mi</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-black">{rideDetails.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold text-black">${rideDetails.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user?.phone || '+1 (555) 123-4567'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-black">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay with cash when you reach your destination</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Ride Option */}
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getRideIcon(rideDetails.rideOption?.id)}
                    <div>
                      <h3 className="font-semibold text-black">{rideDetails.rideOption?.name}</h3>
                      <p className="text-sm text-gray-500">{rideDetails.rideOption?.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-black">${rideDetails.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handlePayment}
              disabled={isBooking}
              className="w-full bg-black text-white hover:bg-gray-800 py-3"
            >
              {isBooking ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Booking your ride...</span>
                </div>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Book Ride - ${rideDetails.price}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
