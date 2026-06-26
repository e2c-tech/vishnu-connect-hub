import construction from "@/assets/about-construction.jpg";
import { supabase } from "@/integrations/supabase/client";

export type AboutView = { heading: string; intro: string; mission: string; vision: string; image: string };
export type FounderView = { name: string; role: string; bio: string; photo: string };

function mapAboutRow(data: {
  heading: string | null;
  intro: string | null;
  mission: string | null;
  vision: string | null;
  image_url: string | null;
}): AboutView {
  return {
    heading: data.heading ?? "",
    intro: data.intro ?? "",
    mission: data.mission ?? "",
    vision: data.vision ?? "",
    image: data.image_url || construction,
  };
}

export async function fetchAboutContent(): Promise<AboutView | null> {
  const { data, error } = await supabase
    .from("about_content")
    .select("heading,intro,mission,vision,image_url")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return null;
  return mapAboutRow(data);
}

export async function fetchFounders(): Promise<FounderView[]> {
  const { data, error } = await supabase
    .from("founders")
    .select("name,title,bio,photo_url,sort_order,published")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) return [];
  return data.map((f) => ({
    name: f.name,
    role: f.title ?? "",
    bio: f.bio ?? "",
    photo: f.photo_url ?? "",
  }));
}
