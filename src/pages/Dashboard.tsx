
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LocationSearchInput from "@/components/LocationSearchInput";
import MapDisplay from "@/components/MapDisplay";
import Navigation from "@/components/Navigation";
import GoogleMapsLoader from "@/components/GoogleMapsLoader";
import DashboardSidebar from "@/components/DashboardSidebar";
import BookingCard from "@/components/BookingCard";
import QuickStats from "@/components/QuickStats";
import RecentRides from "@/components/RecentRides";
import ProfileTab from "@/components/ProfileTab";
import SettingsTab from "@/components/SettingsTab";
import HistoryTab from "@/components/HistoryTab";
import SearchOptions from "@/components/SearchOptions";

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
  
  const { user } = useAuth();

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

  const recentRides = [
    {
      id: 1,
      from: "Downtown",
      to: "Airport",
      date: "Today, 2:30 PM",
      fare: "$25.50",
      status: "completed"
    },
    {
      id: 2,
      from: "Home",
      to: "Office",
      date: "Yesterday, 8:15 AM",
      fare: "$12.75",
      status: "completed"
    },
    {
      id: 3,
      from: "Mall",
      to: "Home",
      date: "Dec 1, 6:45 PM",
      fare: "$18.25",
      status: "completed"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 px-2 sm:px-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-300">Ready for your next ride?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Card */}
              <div className="order-1">
                <BookingCard
                  pickup={pickup}
                  destination={destination}
                  routeInfo={routeInfo}
                  onPickupChange={handlePickupChange}
                  onDestinationChange={handleDestinationChange}
                />
              </div>

              {/* Map Display */}
              <div className="order-2 h-96">
                {pickup.coordinates && destination.coordinates ? (
                  <MapDisplay 
                    pickup={pickup} 
                    destination={destination} 
                    onRouteCalculated={handleRouteCalculated} 
                  />
                ) : (
                  <Card className="h-full bg-gray-800 border-gray-600 flex items-center justify-center">
                    <CardContent className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300">Select pickup and destination to view map</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Current Ride Status */}
            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Current Ride</h2>
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Your ride is arriving!</p>
                      <p className="text-sm text-gray-300">Estimated arrival: 3-5 minutes</p>
                    </div>
                    <div className="text-green-400 font-bold text-lg">
                      Active
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Options */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Quick Search</h2>
              <SearchOptions />
            </div>

            {/* Quick Stats */}
            <QuickStats />

            {/* Recent Rides */}
            <RecentRides rides={recentRides} />
          </div>
        );
      case 'history':
        return <HistoryTab rides={recentRides} />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <GoogleMapsLoader>
      <div className="min-h-screen bg-gray-900">
        {/* Add Navigation Bar */}
        <Navigation />
        
        <div className="flex pt-16">
          {/* Sidebar */}
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-8 bg-gray-900 overflow-x-hidden">
            {renderContent()}
          </div>
        </div>
      </div>
    </GoogleMapsLoader>
  );
};

export default Dashboard;
