
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Airports = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Airports</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Seamless airport transportation worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Get to and from airports with ease using Uber. We operate at hundreds of airports 
                around the world, providing reliable transportation options for travelers. Whether 
                you're catching an early flight or arriving late at night, Uber is there when you need us.
              </p>
              <p className="text-gray-600">
                Check pickup locations, estimated travel times, and fare estimates for airport 
                trips in your city through the Uber app.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Airports;
