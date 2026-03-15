
CREATE TABLE public.rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id uuid NOT NULL,
  rider_name text,
  rider_email text,
  rider_phone text,
  pickup_address text NOT NULL,
  pickup_lat double precision,
  pickup_lng double precision,
  destination_address text NOT NULL,
  destination_lat double precision,
  destination_lng double precision,
  ride_option_id text,
  ride_option_name text,
  price numeric NOT NULL,
  distance numeric,
  duration text,
  status text NOT NULL DEFAULT 'booked',
  driver_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert rides"
ON public.rides FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view all rides"
ON public.rides FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update rides"
ON public.rides FOR UPDATE TO authenticated
USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.rides;
