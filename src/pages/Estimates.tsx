
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Estimates = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Estimates</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Get upfront pricing for your rides.
              </p>
              <p className="text-gray-600 mb-6">
                Before you book a ride, you can see an estimate of what your trip will cost. 
                Our pricing is based on factors like distance, time, demand, and local market 
                conditions. We believe in transparent pricing so you know what to expect.
              </p>
              <p className="text-gray-600">
                Use our fare estimator to plan your trips and budget accordingly. Prices may 
                vary based on traffic conditions and surge pricing during high-demand periods.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Estimates;
