import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Navigation as NavIcon, Clock, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import GoogleMapsLoader from '@/components/GoogleMapsLoader';

interface Ride {
  id: string;
  pickup_address: string;
  pickup_lat: number | null;
  pickup_lng: number | null;
  destination_address: string;
  destination_lat: number | null;
  destination_lng: number | null;
  ride_option_name: string | null;
  price: number;
  status: string;
  duration: string | null;
  distance: number | null;
}

const TrackRide = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(5 * 60); // seconds until driver arrives at pickup
  const [phase, setPhase] = useState<'arriving' | 'in-trip' | 'completed'>('arriving');

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const driverMarker = useRef<google.maps.Marker | null>(null);
  const driverPos = useRef<{ lat: number; lng: number } | null>(null);
  const targetPos = useRef<{ lat: number; lng: number } | null>(null);

  // Fetch ride
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data } = await supabase.from('rides').select('*').eq('id', id).maybeSingle();
      if (data) setRide(data as any);
      setLoading(false);
    };
    load();
  }, [id]);

  // Init map + driver simulation
  useEffect(() => {
    if (!ride || !ride.pickup_lat || !ride.pickup_lng || !mapRef.current) return;

    const initMap = () => {
      if (!window.google?.maps || !mapRef.current || mapInstance.current) return;

      const pickup = { lat: ride.pickup_lat!, lng: ride.pickup_lng! };
      const destination = ride.destination_lat && ride.destination_lng
        ? { lat: ride.destination_lat, lng: ride.destination_lng }
        : pickup;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: pickup,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Pickup marker
      new window.google.maps.Marker({
        position: pickup,
        map: mapInstance.current,
        label: { text: 'P', color: 'white', fontWeight: 'bold' },
        title: 'Pickup',
      });

      // Destination marker
      new window.google.maps.Marker({
        position: destination,
        map: mapInstance.current,
        label: { text: 'D', color: 'white', fontWeight: 'bold' },
        title: 'Destination',
      });

      // Render route line
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: { strokeColor: '#6e42d7', strokeWeight: 5 },
      });
      directionsRenderer.setMap(mapInstance.current);
      directionsService.route(
        { origin: pickup, destination, travelMode: window.google.maps.TravelMode.DRIVING },
        (res, status) => {
          if (status === 'OK' && res) directionsRenderer.setDirections(res);
        }
      );

      // Driver starts ~1km offset from pickup
      const startLat = pickup.lat + 0.009;
      const startLng = pickup.lng + 0.009;
      driverPos.current = { lat: startLat, lng: startLng };
      targetPos.current = pickup;

      driverMarker.current = new window.google.maps.Marker({
        position: driverPos.current,
        map: mapInstance.current,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" fill="%2322c55e" stroke="white" stroke-width="3"/></svg>'
          ),
          scaledSize: new window.google.maps.Size(28, 28),
        } as any,
        title: 'Driver',
      } as any);
    };

    if (window.google?.maps) initMap();
    else {
      const t = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(t);
          initMap();
        }
      }, 200);
      return () => clearInterval(t);
    }
  }, [ride]);

  // Animate driver toward target every second
  useEffect(() => {
    if (!ride) return;
    const interval = setInterval(() => {
      if (!driverPos.current || !targetPos.current || !driverMarker.current) return;

      const dLat = targetPos.current.lat - driverPos.current.lat;
      const dLng = targetPos.current.lng - driverPos.current.lng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);

      if (dist < 0.0005) {
        // Reached target
        if (phase === 'arriving') {
          setPhase('in-trip');
          targetPos.current = ride.destination_lat && ride.destination_lng
            ? { lat: ride.destination_lat, lng: ride.destination_lng }
            : null;
          setEta(Math.max(60, Math.round((ride.distance || 5) * 90)));
        } else if (phase === 'in-trip') {
          setPhase('completed');
          clearInterval(interval);
        }
        return;
      }

      // Move ~5% closer
      const step = 0.05;
      driverPos.current = {
        lat: driverPos.current.lat + dLat * step,
        lng: driverPos.current.lng + dLng * step,
      };
      (driverMarker.current as any).setPosition(driverPos.current);
      setEta((e) => Math.max(0, e - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [ride, phase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 text-center text-gray-600">Loading ride...</div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 text-center text-gray-600 px-4">Ride not found.</div>
      </div>
    );
  }

  const minutes = Math.floor(eta / 60);
  const seconds = eta % 60;

  return (
    <GoogleMapsLoader>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navigation />
        <div className="pt-16">
          <div className="bg-gray-50 border-b border-gray-200 p-3 sm:p-4">
            <div className="container mx-auto flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-black hover:bg-gray-200 shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-black truncate">Track Your Ride</h1>
            </div>
          </div>

          <div className="container mx-auto p-3 sm:p-4 max-w-4xl space-y-4">
            {/* Status banner */}
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-black truncate">
                      {phase === 'arriving' && 'Driver is on the way'}
                      {phase === 'in-trip' && 'On trip — heading to destination'}
                      {phase === 'completed' && 'Trip completed'}
                    </p>
                  </div>
                  {phase !== 'completed' && (
                    <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        {minutes}m {seconds.toString().padStart(2, '0')}s
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="border-gray-200 overflow-hidden">
              <CardContent className="p-0">
                <div ref={mapRef} className="w-full h-[300px] sm:h-[420px]" />
              </CardContent>
            </Card>

            {/* Ride info */}
            <Card className="border-gray-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="text-sm text-gray-800 break-words">{ride.pickup_address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <NavIcon className="h-4 w-4 text-red-600 mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm text-gray-800 break-words">{ride.destination_address}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Ride</p>
                    <p className="text-sm font-semibold text-black truncate">{ride.ride_option_name || 'Standard'}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="text-sm font-semibold text-black truncate">{ride.distance ? `${Number(ride.distance).toFixed(1)} km` : '—'}</p>
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-xs text-gray-500">Fare</p>
                    <p className="text-sm font-bold text-green-600 truncate">₹{Number(ride.price).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver info */}
            <Card className="border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">HD</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-black truncate">Hriday Das</p>
                  <p className="text-xs text-gray-500 truncate">Honda Civic • DL 3C AB 1234</p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  <Phone className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </GoogleMapsLoader>
  );
};

export default TrackRide;
