
-- Fix: storage RLS calls has_role() but authenticated role lacks EXECUTE
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;

-- Add stats column to site_settings for the hero stat strip
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS stats jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Seed default stats if empty
UPDATE public.site_settings
SET stats = '[
  {"label":"Projects Delivered","value":"250+"},
  {"label":"Years of Experience","value":"15+"},
  {"label":"Cities Served","value":"12"},
  {"label":"Safety Record","value":"Zero LTI"}
]'::jsonb
WHERE id = 1 AND (stats IS NULL OR jsonb_array_length(stats) = 0);
