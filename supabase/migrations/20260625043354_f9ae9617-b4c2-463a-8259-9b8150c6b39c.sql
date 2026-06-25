
-- Fix 1: revoke EXECUTE on SECURITY DEFINER has_role from PUBLIC/authenticated/anon.
-- RLS policies evaluate it as the policy owner regardless of EXECUTE grants, so
-- restricting direct callability does not affect row-level checks.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;

-- Fix 2: replace the always-true INSERT check on contact_submissions with
-- a real validation predicate so the public contact form still works but the
-- policy is no longer "WITH CHECK (true)".
DROP POLICY IF EXISTS "anyone submits" ON public.contact_submissions;
CREATE POLICY "anyone submits"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND char_length(btrim(name)) BETWEEN 1 AND 120
    AND email IS NOT NULL AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 254
    AND message IS NOT NULL AND char_length(btrim(message)) BETWEEN 1 AND 5000
  );
