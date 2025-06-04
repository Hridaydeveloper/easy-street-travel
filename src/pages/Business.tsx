
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Shield, BarChart3, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Business = () => {
  const features = [
    {
      icon: <Building className="h-8 w-8 text-white" />,
      title: "Corporate Accounts",
      description: "Centralized billing and management for your organization"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Enhanced Security",
      description: "Advanced safety features and verification for business rides"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Analytics & Reporting",
      description: "Detailed insights into your organization's transportation usage"
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "24/7 Support",
      description: "Dedicated support team available around the clock"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Uber for Business</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform how your organization moves with our comprehensive business solutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Business;
