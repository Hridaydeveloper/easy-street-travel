
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Car, Users, Star, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import RideBookingForm from "@/components/RideBookingForm";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Car className="h-12 w-12 text-white" />,
      title: "Ride Options",
      description: "There's more than one way to move with Uber, no matter where you are or where you're headed next.",
      buttonText: "Search ride options",
      gradient: "from-orange-400 to-pink-500"
    },
    {
      icon: <MapPin className="h-12 w-12 text-white" />,
      title: "700+ airports", 
      description: "You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.",
      buttonText: "Search airports",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "10,000+ cities",
      description: "The app is available in thousands of cities worldwide, so you can request a ride even when you're far from home.",
      buttonText: "Search cities", 
      gradient: "from-green-400 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Request a ride for
                  <span className="block text-yellow-300">now or later</span>
                </h1>
                <p className="text-xl text-gray-100 max-w-md">
                  Add your trip details, hop in, and go.
                </p>
              </div>
              
              <RideBookingForm />
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4"></div>
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-30 absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4"></div>
                <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Car className="h-6 w-6 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your ride is on the way!</h3>
                      <p className="text-sm text-gray-200">Driver: John Doe</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">ETA</span>
                      <span className="text-sm font-semibold">5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vehicle</span>
                      <span className="text-sm font-semibold">Toyota Camry</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">License</span>
                      <span className="text-sm font-semibold">ABC-1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Use the Uber app to help you travel your way
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're going to work, the airport, or anywhere else, we've got options to get you there.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-64 bg-gradient-to-br ${feature.gradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    <Button 
                      className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {feature.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1B+", label: "Rides completed" },
              { number: "900+", label: "Cities worldwide" },
              { number: "5M+", label: "Active drivers" },
              { number: "4.9", label: "Average rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-pink-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of users who trust our platform for their daily commute and travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign up as Rider
            </Button>
            <Button 
              onClick={() => navigate('/driver-signup')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Become a Driver
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
