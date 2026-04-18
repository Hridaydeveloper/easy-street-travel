
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, MapPin, CreditCard, IndianRupee, Clock, User, Phone, Mail, Car, Users, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Please login first", variant: "destructive" });
        setIsBooking(false);
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.from('rides').insert({
        rider_id: session.user.id,
        rider_name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        rider_email: user?.email || session.user.email,
        rider_phone: user?.phone || '',
        pickup_address: rideDetails.pickup.address,
        pickup_lat: rideDetails.pickup.coordinates?.lat,
        pickup_lng: rideDetails.pickup.coordinates?.lng,
        destination_address: rideDetails.destination.address,
        destination_lat: rideDetails.destination.coordinates?.lat,
        destination_lng: rideDetails.destination.coordinates?.lng,
        ride_option_id: rideDetails.rideOption?.id,
        ride_option_name: rideDetails.rideOption?.name,
        price: rideDetails.price,
        distance: rideDetails.distance,
        duration: rideDetails.duration,
        status: 'booked'
      } as any).select('id').single();

      if (error) {
        console.error('Error saving ride:', error);
        toast({ title: "Booking failed", description: error.message, variant: "destructive" });
        setIsBooking(false);
        return;
      }

      setIsBooking(false);
      setIsBooked(true);
      toast({ title: "Ride booked successfully!" });

      // Navigate to live tracking
      if (data?.id) {
        setTimeout(() => navigate(`/track-ride/${data.id}`), 1200);
      }
    } catch (error) {
      console.error('Error saving ride:', error);
      toast({ title: "Booking failed", variant: "destructive" });
      setIsBooking(false);
    }
  };

  const getRideIcon = (rideOptionId: string) => {
    switch (rideOptionId) {
      case 'drivio-go': return <Car className="h-8 w-8" />;
      case 'drivio-premier': return <Car className="h-8 w-8" />;
      case 'drivio-xl': return <Users className="h-8 w-8" />;
      case 'drivio-black': return <Crown className="h-8 w-8" />;
      default: return <Car className="h-8 w-8" />;
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 pb-8 container mx-auto p-4 min-h-screen flex items-center justify-center">
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
            <Button onClick={() => navigate('/')} className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <div className="pt-16">
        <div className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4">
          <div className="container mx-auto">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-black hover:bg-gray-200 shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-black truncate">Payment</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-3 sm:p-4 max-w-2xl">
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-gray-200">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-black flex items-center space-x-2 text-base sm:text-lg">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>Trip Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 sm:px-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 min-w-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700 break-words min-w-0">{rideDetails.pickup.address}</span>
                  </div>
                  <div className="flex items-start space-x-3 min-w-0">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700 break-words min-w-0">{rideDetails.destination.address}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">Distance</p>
                    <p className="font-semibold text-black text-sm sm:text-base truncate">{rideDetails.distance?.toFixed(1)} km</p>
                  </div>
                  <div className="text-center min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-black text-sm sm:text-base truncate">{rideDetails.duration}</p>
                  </div>
                  <div className="text-center min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">Price</p>
                    <p className="font-semibold text-black text-sm sm:text-base truncate">₹{rideDetails.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-black flex items-center space-x-2 text-base sm:text-lg">
                  <User className="h-5 w-5 shrink-0" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-4 sm:px-6">
                <div className="flex items-center space-x-3 min-w-0">
                  <User className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 truncate">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex items-center space-x-3 min-w-0">
                  <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 truncate">{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3 min-w-0">
                  <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 truncate">{user?.email}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-black flex items-center space-x-2 text-base sm:text-lg">
                  <CreditCard className="h-5 w-5 shrink-0" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0">
                      <IndianRupee className="h-5 w-5 text-green-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-black text-sm sm:text-base">Cash Payment</p>
                        <p className="text-xs sm:text-sm text-gray-500 break-words">Pay with cash when you reach your destination</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="shrink-0">{getRideIcon(rideDetails.rideOption?.id)}</div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-black text-sm sm:text-base truncate">{rideDetails.rideOption?.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{rideDetails.rideOption?.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-lg sm:text-xl text-black">₹{rideDetails.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handlePayment}
              disabled={isBooking}
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3"
            >
              {isBooking ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Booking your ride...</span>
                </div>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Confirm Ride - ₹{rideDetails.price}
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
