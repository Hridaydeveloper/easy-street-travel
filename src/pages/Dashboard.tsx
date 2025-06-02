
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Car, History, User, Settings, LogOut, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const recentRides = [
    { id: 1, from: "Downtown", to: "Airport", date: "Today, 2:30 PM", fare: "$25.50", status: "completed" },
    { id: 2, from: "Home", to: "Office", date: "Yesterday, 8:15 AM", fare: "$12.75", status: "completed" },
    { id: 3, from: "Mall", to: "Home", date: "Dec 1, 6:45 PM", fare: "$18.25", status: "completed" }
  ];

  const sidebarItems = [
    { id: 'home', icon: <MapPin className="h-5 w-5" />, label: 'Book Ride' },
    { id: 'history', icon: <History className="h-5 w-5" />, label: 'Ride History' },
    { id: 'profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Uber</span>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600' 
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
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, John!</h1>
              <p className="text-gray-600">Ready for your next ride?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span>Book a New Ride</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        placeholder="Pickup location"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        placeholder="Destination"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white py-3 transition-all duration-300">
                    Find Rides
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Rides</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                      </div>
                      <Car className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-2xl font-bold text-gray-800">4.8</p>
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </div>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Rides */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Car className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{ride.from} → {ride.to}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {ride.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{ride.fare}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {ride.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Ride History</h1>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Car className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{ride.from} → {ride.to}</p>
                          <p className="text-sm text-gray-600">{ride.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{ride.fare}</p>
                        <Badge className="bg-green-100 text-green-800">{ride.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
