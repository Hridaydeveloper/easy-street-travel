import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Car, DollarSign, Star, Clock, MapPin, User, Settings, BarChart3, Navigation, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DriverProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const DriverPortal = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('driverProfile');
    if (stored) {
      setDriverProfile(JSON.parse(stored));
    } else {
      // Redirect to login if no profile found
      navigate('/driver-login');
    }
  }, [navigate]);

  const earnings = {
    today: '$125.50',
    week: '$680.25',
    month: '$2,845.00'
  };

  const rideRequests = [
    { id: 1, pickup: "Downtown Mall", destination: "Airport", distance: "12.5 miles", fare: "$25.50", eta: "3 min" },
    { id: 2, pickup: "Central Station", destination: "Business District", distance: "8.2 miles", fare: "$18.75", eta: "5 min" }
  ];

  const sidebarItems = [
    { id: 'dashboard', icon: <BarChart3 className="h-5 w-5" />, label: 'Dashboard' },
    { id: 'rides', icon: <Car className="h-5 w-5" />, label: 'Active Rides' },
    { id: 'earnings', icon: <DollarSign className="h-5 w-5" />, label: 'Earnings' },
    { id: 'profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rides':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Active Rides</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 md:p-12 text-center">
                <Car className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No active rides</h3>
                <p className="text-gray-400">You don't have any active rides at the moment</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Driver Profile</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-8 md:h-10 w-8 md:w-10 text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-white">{driverProfile?.name || 'Driver'}</h2>
                    <p className="text-gray-400">{driverProfile?.email || 'driver@example.com'}</p>
                    <p className="text-gray-400">Driver since 2020</p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-white font-semibold">4.8</span>
                      <span className="text-gray-400">(1,234 ratings)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-400">Total Trips</p>
                    <p className="text-xl md:text-2xl font-bold text-white">2,847</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-400">Years Active</p>
                    <p className="text-xl md:text-2xl font-bold text-white">4</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-400">Vehicle</p>
                    <p className="text-sm md:text-lg font-semibold text-white">Honda Civic 2019</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Preferences</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <span className="text-white">Push Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <span className="text-white">Email Updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <span className="text-white">Sound Alerts</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Account</h3>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                    Change Password
                  </Button>
                  <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
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
                <h1 className="text-2xl md:text-3xl font-bold text-white">Driver Dashboard</h1>
                <p className="text-gray-300">Welcome back, {driverProfile?.name?.split(' ')[0] || 'Driver'}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="font-medium text-white">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Today's Earnings</p>
                      <p className="text-xl md:text-2xl font-bold text-green-400">{earnings.today}</p>
                    </div>
                    <DollarSign className="h-6 md:h-8 w-6 md:w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">This Week</p>
                      <p className="text-xl md:text-2xl font-bold text-blue-400">{earnings.week}</p>
                    </div>
                    <BarChart3 className="h-6 md:h-8 w-6 md:w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">This Month</p>
                      <p className="text-xl md:text-2xl font-bold text-purple-400">{earnings.month}</p>
                    </div>
                    <Star className="h-6 md:h-8 w-6 md:w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ride Requests */}
            {isOnline && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Car className="h-5 w-5 text-blue-500" />
                    <span>Incoming Ride Requests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideRequests.map((request) => (
                      <div key={request.id} className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-green-500" />
                              <span className="font-medium text-white">{request.pickup}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Navigation className="h-4 w-4 text-red-500" />
                              <span className="text-gray-300">{request.destination}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{request.distance}</span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {request.eta}
                              </span>
                            </div>
                          </div>
                          <div className="text-center md:text-right space-y-2">
                            <p className="text-lg md:text-xl font-bold text-green-400">{request.fare}</p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                                Accept
                              </Button>
                              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!isOnline && (
              <Card className="border-2 border-dashed border-gray-600 bg-gray-800/50">
                <CardContent className="p-8 md:p-12 text-center">
                  <Car className="h-12 md:h-16 w-12 md:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">You're currently offline</h3>
                  <p className="text-gray-400 mb-4">Turn on your online status to start receiving ride requests</p>
                  <Button 
                    onClick={() => setIsOnline(true)}
                    className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Go Online
                  </Button>
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
    <div className="min-h-screen bg-black flex flex-col md:flex-row relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/lovable-uploads/dc2b1809-4950-48b0-a818-76730bc701c8.png')`
        }}
      />
      
      {/* Sidebar */}
      <div className="relative w-full md:w-64 bg-gray-900/95 backdrop-blur-md shadow-lg border-b md:border-r border-gray-700">
        <div className="p-4 md:p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Car className="h-4 md:h-6 w-4 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">Driver</span>
          </div>
          
          {/* Online Status Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="font-medium text-white text-sm md:text-base">Online Status</span>
            <div className="flex items-center space-x-2">
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

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 md:px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-500/20 text-blue-400 border-r-2 border-blue-500' 
                  : 'text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm md:text-base">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 md:p-6 border-t border-gray-700">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full justify-start text-white border-white hover:bg-white hover:text-black transition-all duration-300 bg-white/10 font-semibold text-sm md:text-base py-2 md:py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 p-4 md:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default DriverPortal;
