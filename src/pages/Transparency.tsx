
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Transparency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Transparency</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Open, honest, and accountable.</p>
              <p className="text-gray-600 mb-6">
                We believe in being transparent about our practices, policies, and progress.
              </p>
              <p className="text-gray-600">
                Transparency builds trust, and trust is the foundation of everything we do at Drivio.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Transparency;
