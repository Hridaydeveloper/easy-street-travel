
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Team</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Meet the passionate individuals who drive Uber's mission to reimagine the way the world moves.
              </p>
              <p className="text-gray-600 mb-6">
                Our diverse team of engineers, designers, product managers, and business leaders work together 
                to create innovative transportation solutions that connect millions of people around the world.
              </p>
              <p className="text-gray-600">
                From our headquarters in San Francisco to offices around the globe, we're united by our 
                commitment to safety, reliability, and creating economic opportunities for millions of drivers 
                and delivery partners.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurTeam;
