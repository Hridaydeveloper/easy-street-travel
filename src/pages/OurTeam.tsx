
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
                Meet the passionate individuals who drive Drivio's mission to reimagine the way the world moves.
              </p>
              <p className="text-gray-600 mb-6">
                Our diverse team of engineers, designers, product managers, and business leaders work together 
                to create innovative transportation solutions.
              </p>
              <p className="text-gray-600">
                United by our commitment to safety, reliability, and creating economic opportunities for millions.
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
