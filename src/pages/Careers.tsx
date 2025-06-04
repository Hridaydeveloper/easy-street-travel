
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Globe, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Careers = () => {
  const benefits = [
    {
      icon: <Briefcase className="h-8 w-8 text-white" />,
      title: "Growth Opportunities",
      description: "Advance your career with learning and development programs"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Diverse Team",
      description: "Work with talented people from all backgrounds"
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Global Impact",
      description: "Help shape the future of transportation worldwide"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: "Innovation",
      description: "Be part of cutting-edge technology and solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Help us build the future of transportation and make an impact on millions of lives worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Work With Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">Explore open positions and find your next opportunity</p>
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
            View Open Positions
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
