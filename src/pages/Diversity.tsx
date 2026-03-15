
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Diversity = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Diversity</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Building a diverse and inclusive community.</p>
              <p className="text-gray-600 mb-6">
                At Drivio, we believe that diversity and inclusion are fundamental to our success. 
                We're committed to creating an environment where everyone feels valued and respected.
              </p>
              <p className="text-gray-600">
                From our workforce to our driver-partners, we're working to build a more inclusive future.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Diversity;
