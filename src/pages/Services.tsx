
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Car, Truck, Package, Users, Clock, Shield, Star, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import rideOptionsImg from "@/assets/ride-options.jpg";
import cityRidesImg from "@/assets/city-rides.jpg";
import airportRidesImg from "@/assets/airport-rides.jpg";

const Services = () => {
  const services = [
    {
      icon: <Car className="h-12 w-12 text-white" />,
      title: "UberX",
      description: "Affordable, everyday rides for up to 4 passengers",
      features: ["Up to 4 seats", "Affordable rates", "Reliable drivers"],
      image: rideOptionsImg
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "UberXL",
      description: "Affordable rides for larger groups, up to 6 passengers",
      features: ["Up to 6 seats", "Extra space", "Group friendly"],
      image: cityRidesImg
    },
    {
      icon: <Package className="h-12 w-12 text-white" />,
      title: "Airport Rides",
      description: "Reliable rides to and from 700+ airports worldwide",
      features: ["24/7 availability", "Flight tracking", "Fixed pricing"],
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1692743890/assets/f9/ba27c4-665c-4cca-8161-9e3f87f49994/original/Airport-rides.png"
    }
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-black" />,
      title: "24/7 Service",
      description: "Available round the clock, whenever you need a ride"
    },
    {
      icon: <Shield className="h-8 w-8 text-black" />,
      title: "Safe & Secure",
      description: "Background-checked drivers and real-time tracking"
    },
    {
      icon: <Star className="h-8 w-8 text-black" />,
      title: "5-Star Experience",
      description: "Highly rated drivers committed to excellent service"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from a variety of ride options designed to meet your needs, 
            from everyday trips to special occasions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 transform hover:scale-105 group"
                    >
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Choose Uber?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best ride experience with safety, reliability, and convenience at the forefront.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
