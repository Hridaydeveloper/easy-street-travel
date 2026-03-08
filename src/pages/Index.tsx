import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Car, Users, Star, Shield, Clock, ArrowRight, CheckCircle, Mail, Phone, MapIcon, Award, Target, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import RideBookingForm from "@/components/RideBookingForm";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import rideOptionsImg from "@/assets/ride-options.jpg";
import airportRidesImg from "@/assets/airport-rides.jpg";
import cityRidesImg from "@/assets/city-rides.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest } = useAuth();

  const features = [{
    icon: <Car className="h-12 w-12 text-white" />,
    title: "Ride Options",
    description: "There's more than one way to move with Uber, no matter where you are or where you're headed next.",
    buttonText: "Search ride options",
    image: rideOptionsImg
  }, {
    icon: <MapPin className="h-12 w-12 text-white" />,
    title: "700+ airports",
    description: "You can request a ride to and from most major airports. Schedule a ride to the airport for one less thing to worry about.",
    buttonText: "Search airports",
    image: airportRidesImg
  }, {
    icon: <Users className="h-12 w-12 text-white" />,
    title: "10,000+ cities",
    description: "The app is available in thousands of cities worldwide, so you can request a ride even when you're far from home.",
    buttonText: "Search cities",
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1689609697/assets/b8/c39de0-6e13-485b-ba45-66511170c62a/original/SS_Commuter.jpg"
  }];
  const benefits = ["One tap to request", "Upfront pricing", "24/7 reliable service", "Safe and secure rides"];

  return <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{
        backgroundImage: `url('/lovable-uploads/bcd9c71b-8043-4e06-b4a9-686d30d12c76.png')`
      }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        
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
                  {benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                      <span className="text-sm">{benefit}</span>
                    </div>)}
                </div>
              </div>
              
              <RideBookingForm />
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <img src="/lovable-uploads/dc2b1809-4950-48b0-a818-76730bc701c8.png" alt="Uber Car" className="w-full h-auto rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Use the Uber app to help you travel your way
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Whether you're going to work, the airport, or anywhere else, we've got options to get you there.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden bg-gray-800">
                <CardContent className="p-0">
                  <div className="h-80 relative overflow-hidden">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                    <Button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 group">
                      {feature.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  About Uber
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We reimagine the way the world moves for the better. Movement is what we power. It's our lifeblood. It runs through our veins. It's what gets us out of bed each morning.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Our technology and platform help people move forward. We connect riders to drivers at the tap of a button, helping people get where they want to go.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-900 rounded-xl">
                  <Award className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Excellence</h3>
                  <p className="text-gray-400">Committed to providing the best service</p>
                </div>
                <div className="text-center p-6 bg-gray-900 rounded-xl">
                  <Target className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400">Leading technology in transportation</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img src="/lovable-uploads/660b454f-8bfe-4dd4-adb2-e9e8f7ca60d3.png" alt="About Uber" className="w-full h-auto rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Trusted by millions worldwide</h2>
            <p className="text-gray-400 text-lg">Join the global community that moves with Uber</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            number: "1B+",
            label: "Rides completed"
          }, {
            number: "900+",
            label: "Cities worldwide"
          }, {
            number: "5M+",
            label: "Active drivers"
          }, {
            number: "4.9",
            label: "Average rating"
          }].map((stat, index) => <div key={index} className="text-center group">
                <div className="text-4xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Have questions? We're here to help you get moving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none" />
                  <input type="email" placeholder="Your Email" className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none" />
                  <textarea placeholder="Your Message" rows={6} className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none resize-none" />
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-200 py-3 transition-all duration-300">
                  Send Message
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <p className="text-gray-400">support@uber.com</p>
                    <p className="text-gray-400">dashriday856@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <p className="text-gray-400">+91 9615262753</p>
                    <p className="text-gray-400">24/7 Support Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapIcon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                    <p className="text-gray-400">Agartala</p>
                    <p className="text-gray-400">Tripura, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for guests or non-authenticated users */}
      {(isGuest || !isAuthenticated) && (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">Ready to get started?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400 leading-relaxed">
              Join millions of users who trust our platform for their daily commute and travel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button onClick={() => navigate('/auth')} className="bg-white text-black hover:bg-gray-200 px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Sign up as Rider
              </Button>
              <Button onClick={() => navigate('/driver-signup')} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Become a Driver
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>;
};

export default Index;
