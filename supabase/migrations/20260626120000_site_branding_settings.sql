-- Branding & footer content managed from admin (logo, services cards, cities, social links)
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS service_cards jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS service_cities jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS social_links jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.site_settings
SET
  service_cards = '[
    {"title":"Scaffolding & Access","body":"System scaffolding design, supply and erection — cuplock, ringlock, cantilever, suspended platforms and BMU coordination.","icon":"HardHat","bg_color":"#f5b400"},
    {"title":"Construction & Civil","body":"Turnkey general contracting for commercial, residential, institutional, industrial and infrastructure projects.","icon":"Building2","bg_color":"#f5b400"},
    {"title":"Interiors & Fit-out","body":"Office, retail, hospitality and healthcare interiors — ceilings, flooring, MEP integration and joinery.","icon":"Leaf","bg_color":"#f5b400"}
  ]'::jsonb,
  service_cities = '[
    {"name":"Bangalore"},{"name":"Mysore"},{"name":"Mangalore"},{"name":"Mumbai"},{"name":"Pune"},
    {"name":"Noida"},{"name":"Chennai"},{"name":"Hyderabad"},{"name":"Kolkata"}
  ]'::jsonb,
  social_links = '[
    {"platform":"facebook","url":"https://facebook.com/"},
    {"platform":"instagram","url":"https://instagram.com/"},
    {"platform":"linkedin","url":"https://linkedin.com/"},
    {"platform":"youtube","url":"https://youtube.com/"},
    {"platform":"twitter","url":"https://twitter.com/"}
  ]'::jsonb
WHERE id = 1
  AND jsonb_array_length(service_cards) = 0
  AND jsonb_array_length(service_cities) = 0
  AND jsonb_array_length(social_links) = 0;
