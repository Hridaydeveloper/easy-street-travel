
import React from 'react';
import Navigation from "@/components/Navigation";
import MapSearch from "@/components/MapSearch";

const MapExplorer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore the World
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search for any location worldwide using our interactive map. 
              Type in the search bar to find places, cities, landmarks, and more.
            </p>
          </div>
          <MapSearch />
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;
