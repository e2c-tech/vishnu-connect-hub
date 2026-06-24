CREATE POLICY "admin uploads media" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id='media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin updates media" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id='media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin deletes media" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id='media' AND public.has_role(auth.uid(),'admin'));