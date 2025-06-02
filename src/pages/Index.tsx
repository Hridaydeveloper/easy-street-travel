
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Car, Users, Star, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import RideBookingForm from "@/components/RideBookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Car className="h-12 w-12 text-white" />,
      title: "Ride Options",
      description: "There's more than one way to move with Uber, no matter where you are or where you're headed next.",
      buttonText: "Search ride options",
      image: "https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_372,w_558/v1565733741/assets/0f/9719ad-69a4-4c0d-9444-ce6d8c3f9759/original/Signup.svg"
    },
    {
      icon: <MapPin className="h-12 w-12 text-white" />,
      title: "700+ airports", 
      description: "You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.",
      buttonText: "Search airports",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "10,000+ cities",
      description: "The app is available in thousands of cities worldwide, so you can request a ride even when you're far from home.",
      buttonText: "Search cities", 
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1689609697/assets/b8/c39de0-6e13-485b-ba45-66511170c62a/original/SS_Commuter.jpg"
    }
  ];

  const benefits = [
    "One tap to request",
    "Upfront pricing",
    "24/7 reliable service",
    "Safe and secure rides"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Go anywhere with
                  <span className="block text-gray-300">Uber</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                  Request a ride, hop in, and go. Or reserve for later so you can relax on the day of your trip.
                </p>
                <div className="flex flex-wrap gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <RideBookingForm />
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-96 h-96 rounded-full bg-gray-800 opacity-20 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4"></div>
                <div className="w-72 h-72 rounded-full bg-gray-700 opacity-30 absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4"></div>
                <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Car className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Your ride is on the way!</h3>
                      <p className="text-sm text-gray-300">Driver: John Doe</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">ETA</span>
                      <span className="text-sm font-semibold text-white">5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Vehicle</span>
                      <span className="text-sm font-semibold text-white">Toyota Camry</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">License</span>
                      <span className="text-sm font-semibold text-white">ABC-1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Use the Uber app to help you travel your way
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're going to work, the airport, or anywhere else, we've got options to get you there.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="h-80 relative overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-black">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 group"
                    >
                      {feature.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Trusted by millions worldwide</h2>
            <p className="text-gray-300 text-lg">Join the global community that moves with Uber</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1B+", label: "Rides completed" },
              { number: "900+", label: "Cities worldwide" },
              { number: "5M+", label: "Active drivers" },
              { number: "4.9", label: "Average rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Join millions of users who trust our platform for their daily commute and travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-white text-black hover:bg-gray-200 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign up as Rider
            </Button>
            <Button 
              onClick={() => navigate('/driver-signup')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Become a Driver
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
