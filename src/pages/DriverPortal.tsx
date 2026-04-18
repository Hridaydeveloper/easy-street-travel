
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Car, DollarSign, Star, Clock, MapPin, User, Settings, BarChart3, Navigation, ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRideRequest } from "@/contexts/RideRequestContext";
import RideRequestCard from "@/components/RideRequestCard";
import { supabase } from "@/integrations/supabase/client";

interface DriverProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface BookedRide {
  id: string;
  rider_name: string;
  rider_email: string;
  rider_phone: string;
  pickup_address: string;
  destination_address: string;
  ride_option_name: string;
  price: number;
  distance: number;
  duration: string;
  status: string;
  created_at: string;
}

const ALLOWED_DRIVER_EMAIL = 'dashriday856@gmail.com';

const DriverPortal = () => {
  const [isOnline, setIsOnline] = useState(() => {
    const stored = localStorage.getItem('driverOnlineStatus');
    return stored === 'true';
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const [bookedRides, setBookedRides] = useState<BookedRide[]>([]);
  const navigate = useNavigate();
  const { rideRequests, acceptRide, declineRide, pendingRequestsCount } = useRideRequest();

  // Persist online status
  useEffect(() => {
    localStorage.setItem('driverOnlineStatus', String(isOnline));
  }, [isOnline]);

  useEffect(() => {
    const stored = localStorage.getItem('driverProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      if (profile.email?.toLowerCase() !== ALLOWED_DRIVER_EMAIL) {
        localStorage.removeItem('driverProfile');
        navigate('/driver-login');
        return;
      }
      setDriverProfile(profile);
    } else {
      navigate('/driver-login');
    }
  }, [navigate]);

  // Fetch booked rides from database
  useEffect(() => {
    const fetchRides = async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) {
        setBookedRides(data as any);
      }
    };
    fetchRides();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('rides-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rides' }, () => {
        fetchRides();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const earnings = {
    today: '₹8,785',
    week: '₹47,618',
    month: '₹1,99,150'
  };

  const pendingRequests = rideRequests.filter(request => request.status === 'pending');

  const sidebarItems = [
    { 
      id: 'dashboard', 
      icon: <BarChart3 className="h-5 w-5" />, 
      label: 'Dashboard',
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null
    },
    { id: 'rides', icon: <Car className="h-5 w-5" />, label: 'Booked Rides', badge: bookedRides.length > 0 ? bookedRides.length : null },
    { id: 'earnings', icon: <DollarSign className="h-5 w-5" />, label: 'Earnings' },
    { id: 'profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rides':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Booked Rides</h1>
            {bookedRides.length === 0 ? (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 md:p-12 text-center">
                  <Car className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No booked rides yet</h3>
                  <p className="text-gray-600">Rider bookings will appear here in real-time</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookedRides.map((ride) => (
                  <Card key={ride.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 min-w-0">
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={ride.status === 'booked' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}>
                              {ride.status.toUpperCase()}
                            </Badge>
                            <span className="text-xs sm:text-sm text-gray-500 break-words">{new Date(ride.created_at).toLocaleString()}</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-start space-x-2 min-w-0">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500">Pickup</p>
                                <p className="text-sm text-gray-800 font-medium break-words">{ride.pickup_address}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2 min-w-0">
                              <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500">Destination</p>
                                <p className="text-sm text-gray-800 font-medium break-words">{ride.destination_address}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500">Rider</p>
                              <p className="text-sm font-medium text-gray-800 truncate">{ride.rider_name || 'N/A'}</p>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-sm font-medium text-gray-800 truncate">{ride.rider_phone || 'N/A'}</p>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm font-medium text-gray-800 truncate">{ride.rider_email || 'N/A'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-1 lg:items-end lg:text-right shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Ride</p>
                            <p className="text-sm font-semibold text-indigo-600 truncate">{ride.ride_option_name || 'Standard'}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Distance</p>
                            <p className="text-sm font-medium truncate">{ride.distance ? `${Number(ride.distance).toFixed(1)} km` : 'N/A'}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Fare</p>
                            <p className="text-lg sm:text-xl font-bold text-green-600 truncate">₹{Number(ride.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      case 'earnings':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Earnings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-3xl font-bold text-green-600">{earnings.today}</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-blue-600">{earnings.week}</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-purple-600">{earnings.month}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Profile</h1>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full flex items-center justify-center">
                    <User className="h-8 md:h-10 w-8 md:w-10 text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">{driverProfile?.name || 'Driver'}</h2>
                    <p className="text-gray-600">{driverProfile?.email || 'driver@example.com'}</p>
                    <p className="text-gray-600">Driver since 2020</p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-900 font-semibold">4.8</span>
                      <span className="text-gray-600">(1,234 ratings)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Total Trips</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">2,847</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Years Active</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">4</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-gray-600">Vehicle</p>
                    <p className="text-sm md:text-lg font-semibold text-gray-900">Honda Civic 2019</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <span className="text-gray-900">Push Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <span className="text-gray-900">Email Updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <span className="text-gray-900">Sound Alerts</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account</h3>
                  <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300">
                    Change Password
                  </Button>
                  <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300">
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Driver Dashboard</h1>
                <p className="text-gray-700">Welcome back, {driverProfile?.name?.split(' ')[0] || 'Driver'}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="font-medium text-gray-900">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Earnings</p>
                      <p className="text-xl md:text-2xl font-bold text-green-600">{earnings.today}</p>
                    </div>
                    <IndianRupee className="h-6 md:h-8 w-6 md:w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Week</p>
                      <p className="text-xl md:text-2xl font-bold text-blue-600">{earnings.week}</p>
                    </div>
                    <BarChart3 className="h-6 md:h-8 w-6 md:w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-gray-200">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-xl md:text-2xl font-bold text-purple-600">{earnings.month}</p>
                    </div>
                    <Star className="h-6 md:h-8 w-6 md:w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Booked Rides */}
            {bookedRides.length > 0 && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Car className="h-5 w-5 text-indigo-500" />
                    <span>Recent Bookings</span>
                    <Badge className="bg-indigo-500 text-white">{bookedRides.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookedRides.slice(0, 5).map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{ride.rider_name || 'Rider'}</p>
                          <p className="text-xs text-gray-500 truncate">{ride.pickup_address} → {ride.destination_address}</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">₹{Number(ride.price).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  {bookedRides.length > 5 && (
                    <Button variant="ghost" onClick={() => setActiveTab('rides')} className="w-full mt-3 text-indigo-600">
                      View all {bookedRides.length} rides
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Ride Requests */}
            {isOnline && pendingRequests.length > 0 && (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Car className="h-5 w-5 text-indigo-500" />
                    <span>Incoming Ride Requests</span>
                    {pendingRequestsCount > 0 && (
                      <Badge className="bg-red-500 text-white">{pendingRequestsCount}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <RideRequestCard
                        key={request.id}
                        request={request}
                        onAccept={() => acceptRide(request.id)}
                        onDecline={() => declineRide(request.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!isOnline && bookedRides.length === 0 && (
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardContent className="p-8 md:p-12 text-center">
                  <Car className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">You're currently offline</h3>
                  <p className="text-gray-600 mb-4">Turn on your online status to start receiving ride requests</p>
                  <Button 
                    onClick={() => setIsOnline(true)}
                    className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Go Online
                  </Button>
                </CardContent>
              </Card>
            )}

            {isOnline && pendingRequests.length === 0 && bookedRides.length === 0 && (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8 md:p-12 text-center">
                  <Car className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Waiting for ride requests</h3>
                  <p className="text-gray-600">You're online and ready to receive requests</p>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  if (!driverProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:min-h-screen bg-gray-50 shadow-lg border-b md:border-r border-gray-200 flex flex-col">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0">
              <Car className="h-4 md:h-6 w-4 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 truncate">
              Drivio
            </span>
          </div>

          {/* Online Status Toggle */}
          <div className="flex items-center justify-between gap-2 p-3 bg-gray-100 rounded-lg">
            <span className="font-medium text-gray-900 text-sm md:text-base truncate">Online Status</span>
            <div className="flex items-center space-x-2 shrink-0">
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-green-500"
              />
              <Badge variant={isOnline ? 'default' : 'secondary'} className={isOnline ? 'bg-green-500' : 'bg-gray-400'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-2 md:mt-6 overflow-x-auto md:overflow-x-visible">
          <div className="flex md:flex-col">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 md:flex-none flex items-center justify-between px-3 md:px-6 py-3 text-left transition-colors duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-700 md:border-r-2 md:border-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                  {item.icon}
                  <span className="font-medium text-xs md:text-base truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-indigo-500 text-white text-xs ml-2 shrink-0">{item.badge}</Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full justify-center md:justify-start text-gray-900 border-gray-900 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 font-semibold text-sm md:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-8 bg-white min-w-0 overflow-x-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default DriverPortal;
