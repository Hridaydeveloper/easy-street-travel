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
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-400">Ready for your next ride?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Card */}
              <BookingCard
                pickup={pickup}
                destination={destination}
                routeInfo={routeInfo}
                onPickupChange={handlePickupChange}
                onDestinationChange={handleDestinationChange}
              />

              {/* Map Display */}
              <div className="h-96">
                {pickup.coordinates && destination.coordinates ? (
                  <MapDisplay 
                    pickup={pickup} 
                    destination={destination} 
                    onRouteCalculated={handleRouteCalculated} 
                  />
                ) : (
                  <Card className="h-full bg-white border-gray-300 flex items-center justify-center">
                    <CardContent className="text-center">
                      <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-600">Select pickup and destination to view map</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Search Options */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Quick Search</h2>
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
          <div className="flex-1 p-8 bg-gray-900">
            {renderContent()}
          </div>
        </div>
      </div>
    </GoogleMapsLoader>
  );
};

export default Dashboard;
