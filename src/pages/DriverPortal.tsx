
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Car, DollarSign, Star, Clock, MapPin, User, Settings, BarChart3, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DriverPortal = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Driver</span>
          </div>
          
          {/* Online Status Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">Online Status</span>
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
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="w-full justify-start text-gray-600 hover:text-gray-800"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Driver Dashboard</h1>
                <p className="text-gray-600">Welcome back, Mike!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Earnings</p>
                      <p className="text-2xl font-bold text-green-600">{earnings.today}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-blue-600">{earnings.week}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-purple-600">{earnings.month}</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ride Requests */}
            {isOnline && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-blue-500" />
                    <span>Incoming Ride Requests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rideRequests.map((request) => (
                      <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-green-500" />
                              <span className="font-medium">{request.pickup}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Navigation className="h-4 w-4 text-red-500" />
                              <span>{request.destination}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{request.distance}</span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {request.eta}
                              </span>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-xl font-bold text-green-600">{request.fare}</p>
                            <div className="space-x-2">
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline">
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
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">You're currently offline</h3>
                  <p className="text-gray-500 mb-4">Turn on your online status to start receiving ride requests</p>
                  <Button 
                    onClick={() => setIsOnline(true)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Go Online
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Earnings Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-green-600">{earnings.today}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">{earnings.week}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">{earnings.month}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Hours Online</p>
                  <p className="text-2xl font-bold text-orange-600">42.5</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverPortal;
