
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RideRequest {
  id: string;
  customerId: string;
  customerName: string;
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  distance: string;
  fare: string;
  eta: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined';
}

interface RideRequestContextType {
  rideRequests: RideRequest[];
  addRideRequest: (request: Omit<RideRequest, 'id' | 'timestamp' | 'status'>) => void;
  acceptRide: (requestId: string) => void;
  declineRide: (requestId: string) => void;
  pendingRequestsCount: number;
}

const RideRequestContext = createContext<RideRequestContextType | undefined>(undefined);

export const useRideRequest = () => {
  const context = useContext(RideRequestContext);
  if (!context) {
    throw new Error('useRideRequest must be used within a RideRequestProvider');
  }
  return context;
};

interface RideRequestProviderProps {
  children: ReactNode;
}

export const RideRequestProvider: React.FC<RideRequestProviderProps> = ({ children }) => {
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);

  const addRideRequest = (request: Omit<RideRequest, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: RideRequest = {
      ...request,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending'
    };
    setRideRequests(prev => [...prev, newRequest]);
  };

  const acceptRide = (requestId: string) => {
    setRideRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status: 'accepted' } : request
      )
    );
  };

  const declineRide = (requestId: string) => {
    setRideRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status: 'declined' } : request
      )
    );
  };

  const pendingRequestsCount = rideRequests.filter(request => request.status === 'pending').length;

  useEffect(() => {
    // Listen for ride requests from localStorage (simulating real-time updates)
    const handleStorageChange = () => {
      const storedRequests = localStorage.getItem('pendingRideRequests');
      if (storedRequests) {
        const requests = JSON.parse(storedRequests);
        requests.forEach((request: any) => {
          const exists = rideRequests.find(r => r.id === request.id);
          if (!exists) {
            addRideRequest(request);
          }
        });
        localStorage.removeItem('pendingRideRequests');
      }
    };

    const interval = setInterval(handleStorageChange, 1000);
    return () => clearInterval(interval);
  }, [rideRequests]);

  return (
    <RideRequestContext.Provider
      value={{
        rideRequests,
        addRideRequest,
        acceptRide,
        declineRide,
        pendingRequestsCount
      }}
    >
      {children}
    </RideRequestContext.Provider>
  );
};
