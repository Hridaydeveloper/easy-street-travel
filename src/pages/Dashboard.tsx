import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Car, History, User, Settings, LogOut, Navigation, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/LocationSearchInput";
import MapDisplay from "@/components/MapDisplay";
interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [pickup, setPickup] = useState<LocationData>({
    address: ''
  });
  const [destination, setDestination] = useState<LocationData>({
    address: ''
  });
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: string;
  } | null>(null);
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handlePickupChange = (address: string, placeId?: string, coordinates?: {
    lat: number;
    lng: number;
  }) => {
    setPickup({
      address,
      placeId,
      coordinates
    });
  };
  const handleDestinationChange = (address: string, placeId?: string, coordinates?: {
    lat: number;
    lng: number;
  }) => {
    setDestination({
      address,
      placeId,
      coordinates
    });
  };
  const handleRouteCalculated = (distance: number, duration: string) => {
    setRouteInfo({
      distance,
      duration
    });
  };
  const recentRides = [{
    id: 1,
    from: "Downtown",
    to: "Airport",
    date: "Today, 2:30 PM",
    fare: "$25.50",
    status: "completed"
  }, {
    id: 2,
    from: "Home",
    to: "Office",
    date: "Yesterday, 8:15 AM",
    fare: "$12.75",
    status: "completed"
  }, {
    id: 3,
    from: "Mall",
    to: "Home",
    date: "Dec 1, 6:45 PM",
    fare: "$18.25",
    status: "completed"
  }];
  const sidebarItems = [{
    id: 'home',
    icon: <MapPin className="h-5 w-5" />,
    label: 'Book Ride'
  }, {
    id: 'history',
    icon: <History className="h-5 w-5" />,
    label: 'Ride History'
  }, {
    id: 'profile',
    icon: <User className="h-5 w-5" />,
    label: 'Profile'
  }, {
    id: 'settings',
    icon: <Settings className="h-5 w-5" />,
    label: 'Settings'
  }];
  return <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 shadow-lg border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            
            <span className="text-2xl font-bold text-white">Uber</span>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${activeTab === item.id ? 'bg-orange-600/20 text-orange-400 border-r-2 border-orange-500' : 'text-gray-300 hover:bg-gray-700'}`}>
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>)}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700 space-y-2">
          <Button variant="ghost" onClick={() => navigate('/')} className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
            <Home className="h-5 w-5 mr-3" />
            Back to Home
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-900">
        {activeTab === 'home' && <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-400">Ready for your next ride?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span>Book a New Ride</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <LocationSearchInput placeholder="Enter pickup location" value={pickup.address} onChange={handlePickupChange} icon="pickup" />
                    <LocationSearchInput placeholder="Enter destination" value={destination.address} onChange={handleDestinationChange} icon="destination" />
                  </div>
                  
                  {routeInfo && <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-white text-sm">
                        Distance: {routeInfo.distance.toFixed(1)} miles • Duration: {routeInfo.duration}
                      </p>
                    </div>}
                  
                  <Button disabled={!pickup.coordinates || !destination.coordinates} className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white py-3 transition-all duration-300 bg-slate-950 hover:bg-slate-800">
                    Find Rides
                  </Button>
                </CardContent>
              </Card>

              {/* Map Display */}
              <div className="h-96">
                {pickup.coordinates && destination.coordinates ? <MapDisplay pickup={pickup} destination={destination} onRouteCalculated={handleRouteCalculated} /> : <Card className="h-full bg-gray-800 border-gray-700 flex items-center justify-center">
                    <CardContent className="text-center">
                      <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Select pickup and destination to view map</p>
                    </CardContent>
                  </Card>}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Rides</p>
                      <p className="text-2xl font-bold text-white">24</p>
                    </div>
                    <Car className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Rating</p>
                      <div className="flex items-center space-x-1">
                        <p className="text-2xl font-bold text-white">4.8</p>
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Rides */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map(ride => <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                          <Car className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{ride.from} → {ride.to}</p>
                          <p className="text-sm text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {ride.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{ride.fare}</p>
                        <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                          {ride.status}
                        </Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}

        {activeTab === 'history' && <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Ride History</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentRides.map(ride => <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <Car className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{ride.from} → {ride.to}</p>
                          <p className="text-sm text-gray-400">{ride.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{ride.fare}</p>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">{ride.status}</Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}

        {activeTab === 'profile' && <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-gray-400">{user?.email}</p>
                    <p className="text-gray-400">{user?.phone}</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>}

        {activeTab === 'settings' && <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <p className="text-gray-400">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </div>}
      </div>
    </div>;
};
export default Dashboard;