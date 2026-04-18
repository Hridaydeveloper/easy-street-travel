import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, MapPin, Navigation as NavIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DBRide {
  id: string;
  pickup_address: string;
  destination_address: string;
  price: number;
  distance: number | null;
  status: string;
  ride_option_name: string | null;
  created_at: string;
}

interface HistoryTabProps {
  rides?: any[]; // legacy prop, ignored
}

const HistoryTab: React.FC<HistoryTabProps> = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rides, setRides] = useState<DBRide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('rides')
        .select('id, pickup_address, destination_address, price, distance, status, ride_option_name, created_at')
        .eq('rider_id', session.user.id)
        .order('created_at', { ascending: false });
      if (data) setRides(data as any);
      setLoading(false);
    };
    fetchRides();
  }, [user?.id]);

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-black">Ride History</h1>

      {loading ? (
        <p className="text-gray-600 text-sm">Loading your rides...</p>
      ) : rides.length === 0 ? (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8 text-center">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-black mb-1">No rides yet</h3>
            <p className="text-sm text-gray-600 mb-4">Your booked rides will show up here.</p>
            <Button onClick={() => navigate('/')} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Book a ride
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rides.map((ride) => (
            <Card key={ride.id} className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                      <Car className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-sm font-medium text-black truncate">
                      {ride.ride_option_name || 'Standard'}
                    </span>
                  </div>
                  <Badge className={ride.status === 'booked' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800'}>
                    {ride.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-2 min-w-0">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-800 break-words min-w-0">{ride.pickup_address}</p>
                  </div>
                  <div className="flex items-start gap-2 min-w-0">
                    <NavIcon className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-800 break-words min-w-0">{ride.destination_address}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 flex-wrap">
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(ride.created_at).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3">
                    {ride.distance && (
                      <span className="text-xs text-gray-500">{Number(ride.distance).toFixed(1)} km</span>
                    )}
                    <p className="font-bold text-black">₹{Number(ride.price).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/track-ride/${ride.id}`)}
                    className="w-full sm:w-auto"
                  >
                    Track / View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
