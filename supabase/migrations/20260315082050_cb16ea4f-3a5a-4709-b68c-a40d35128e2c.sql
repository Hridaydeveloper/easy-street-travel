
DROP POLICY "Authenticated users can insert rides" ON public.rides;
DROP POLICY "Authenticated users can update rides" ON public.rides;

CREATE POLICY "Users can insert their own rides"
ON public.rides FOR INSERT TO authenticated
WITH CHECK (rider_id = auth.uid());

CREATE POLICY "Users can update their own rides"
ON public.rides FOR UPDATE TO authenticated
USING (rider_id = auth.uid());
