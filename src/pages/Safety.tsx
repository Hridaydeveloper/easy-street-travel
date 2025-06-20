
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Safety = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Safety</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Your safety is our priority, every mile of the way.
              </p>
              <p className="text-gray-600 mb-6">
                We're committed to raising the bar on safety for everyone who uses our platform. 
                From rigorous background checks for drivers to 24/7 customer support, we've built 
                multiple layers of safety features into every ride.
              </p>
              <p className="text-gray-600">
                Our safety features include GPS tracking, driver photo verification, two-way ratings, 
                emergency assistance, and ongoing safety education for our driver-partners.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Safety;
