
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Car, Heart, Target, Award, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  const stats = [
    { number: "1B+", label: "Rides completed", icon: <Car className="h-8 w-8" /> },
    { number: "900+", label: "Cities served", icon: <Globe className="h-8 w-8" /> },
    { number: "5M+", label: "Active drivers", icon: <Users className="h-8 w-8" /> },
    { number: "15+", label: "Years of experience", icon: <Award className="h-8 w-8" /> }
  ];

  const values = [
    {
      icon: <Target className="h-12 w-12 text-white" />,
      title: "Our Mission",
      description: "We ignite opportunity by setting the world in motion. We take on big problems to help drivers, riders, and cities get what they need to move forward."
    },
    {
      icon: <Heart className="h-12 w-12 text-white" />,
      title: "Our Values",
      description: "We build globally, we live locally. We harness the power and scale of our global operations to deeply connect with the cities, communities, drivers, and riders we serve, every day."
    },
    {
      icon: <Globe className="h-12 w-12 text-white" />,
      title: "Our Vision",
      description: "Transportation as reliable as running water, everywhere for everyone. We envision a world where movement should be accessible, and people and things flow more efficiently."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Leading the vision for the future of transportation with over 15 years of experience in tech.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Building the technology that powers millions of rides with a focus on safety and reliability.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      description: "Ensuring seamless operations across all markets with a commitment to driver and rider satisfaction.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Uber</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We're changing the way the world moves. Through our technology, we make transportation 
              safer, more reliable, and more accessible to everyone, everywhere.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              Join Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-800 transition-colors duration-300">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-black mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, from product development to community engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto group-hover:bg-gray-800 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team is dedicated to building the future of transportation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-black">{member.name}</h3>
                    <p className="text-lg font-semibold text-gray-600">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're looking to ride, drive, or build the future of transportation with us, 
            we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              Start Riding
            </Button>
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold">
              Become a Driver
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
