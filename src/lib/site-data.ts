import vidya from "@/assets/project-vidya.jpg";
import kidab from "@/assets/project-kidab.jpg";
import casabella from "@/assets/project-casabella.jpg";
import warehouse from "@/assets/project-warehouse.jpg";
import scaffolding from "@/assets/project-scaffolding.jpg";
import bridge from "@/assets/project-bridge.jpg";
import construction from "@/assets/about-construction.jpg";
import projectsHero from "@/assets/projects-hero.jpg";

export const COMPANY = {
  name: "SRI VISHNU CONSOL PVT LTD",
  short: "Sri Vishnu Consol",
  tagline: "Crafting Quality Structures for Tomorrow",
  cin: "U45201KA2012PTC063587",
  email: "info@srivishnu.in",
  phone: "+91 98450 00000",
  whatsapp: "919845000000",
  address: "Bangalore, Karnataka, India",
  website: "www.srivishnu.in",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
  },
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  client?: string;
  shortDescription: string;
  description: string;
  cover: string;
  gallery: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "vidya-vardhaka-engineering-college",
    title: "Vidya Vardhaka Engineering College",
    location: "Mysore, Karnataka",
    category: "Institutional",
    year: "2022",
    client: "Vidya Vardhaka Sangha",
    shortDescription:
      "Comprehensive construction and scaffolding for a prestigious educational institution.",
    description:
      "We successfully delivered comprehensive construction and scaffolding solutions for this prestigious educational institution, ensuring timely completion while maintaining the highest standards of quality and safety. Our team coordinated multiple trades across academic blocks, laboratories, and administrative facilities, working within the tight schedule of the academic calendar.",
    cover: vidya,
    gallery: [vidya, construction, scaffolding, projectsHero, warehouse],
  },
  {
    slug: "kidab-commercial-building",
    title: "KIDAB Commercial Building, I-Gate",
    location: "Bangalore, Karnataka",
    category: "Commercial",
    year: "2023",
    client: "KIDAB Developers",
    shortDescription:
      "End-to-end project management and scaffolding for a modern commercial complex.",
    description:
      "Our team provided end-to-end project management and scaffolding services for this modern commercial complex, demonstrating our capability to handle sophisticated urban developments with precision and efficiency. The glass-and-steel facade required specialized access systems and rigorous quality control across every floor.",
    cover: kidab,
    gallery: [kidab, scaffolding, construction, projectsHero, bridge, warehouse],
  },
  {
    slug: "prestige-casabella",
    title: "Prestige Casabella",
    location: "Bangalore, Karnataka",
    category: "Residential",
    year: "2023",
    client: "Prestige Group",
    shortDescription:
      "General contracting and access solutions for a premium residential development.",
    description:
      "We executed complete general contracting and access solutions for this premium residential project, showcasing our expertise in delivering luxury developments that exceed client expectations. Multi-tower coordination, landscaped courtyards, and a strict finish standard were all delivered on schedule.",
    cover: casabella,
    gallery: [casabella, construction, scaffolding, projectsHero, warehouse, vidya],
  },
  {
    slug: "industrial-warehouse-hosur",
    title: "Industrial Warehouse, Hosur",
    location: "Hosur, Tamil Nadu",
    category: "Industrial",
    year: "2024",
    client: "Confidential",
    shortDescription:
      "Pre-engineered industrial facility delivered with full structural and MEP coordination.",
    description:
      "A large-format warehouse with steel structural frame, RCC walls, and integrated logistics infrastructure. Our scope covered earthworks, structural erection, scaffolding rental, finishing trades, and final handover with safety certification.",
    cover: warehouse,
    gallery: [warehouse, construction, scaffolding, projectsHero, bridge],
  },
  {
    slug: "metro-corridor-scaffolding",
    title: "Metro Corridor Scaffolding Works",
    location: "Bangalore, Karnataka",
    category: "Infrastructure",
    year: "2024",
    shortDescription:
      "Specialized scaffolding and access engineering for an elevated metro corridor.",
    description:
      "Sri Vishnu Consol designed, supplied and erected the access systems for elevated viaduct works including pier-cap formwork access and segmental launch supports. Daily safety audits and load testing ensured zero incidents across the project window.",
    cover: bridge,
    gallery: [bridge, scaffolding, construction, projectsHero, warehouse],
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  author: string;
  cover: string;
  readMinutes: number;
};

export const POSTS: BlogPost[] = [
  {
    slug: "scaffolding-safety-best-practices-2025",
    title: "Scaffolding Safety: Best Practices for 2025",
    excerpt:
      "How modern access engineering, daily inspections, and worker training keep large Indian construction sites incident-free.",
    body: "Modern scaffolding is no longer just steel pipe and clamps — it is an engineered access system designed for the specific geometry, loading, and duration of each project. At Sri Vishnu Consol we begin every job with a load study, a method statement, and a tag-based inspection regime. This article walks through the daily inspection checklist we use on commercial and institutional sites, the most common defects we catch, and how our supervisors close them out within the shift.",
    date: "2025-02-12",
    author: "Praveen BV",
    cover: scaffolding,
    readMinutes: 6,
  },
  {
    slug: "green-building-materials-india",
    title: "Green Building Materials Driving Indian Construction",
    excerpt:
      "Fly-ash blocks, GGBS concrete, low-VOC finishes and the procurement choices that move projects toward IGBC ratings.",
    body: "Sustainability is now a procurement decision, not just a design intent. We unpack the material substitutions that have the biggest impact on a project's embodied carbon, how they affect construction sequencing, and the documentation required for IGBC and LEED submissions in India.",
    date: "2025-01-20",
    author: "Vijay Kumar",
    cover: construction,
    readMinutes: 5,
  },
  {
    slug: "managing-subcontractors-large-projects",
    title: "Managing Subcontractors on Large Indian Projects",
    excerpt:
      "Coordination, payments, and quality control across multiple trades — the playbook we use on 50,000+ sqft sites.",
    body: "Subcontractor relationships make or break a programme. We share the weekly cadence — pre-pour checks, RA-bill cycles, defect logs, and material reconciliation — that keeps a multi-trade site moving without surprises.",
    date: "2024-12-04",
    author: "Praveen BV",
    cover: projectsHero,
    readMinutes: 7,
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ramesh Iyer",
    role: "Project Director, KIDAB Developers",
    quote:
      "Sri Vishnu Consol delivered our I-Gate commercial block ahead of schedule with impeccable finish quality. Their site supervision and safety standards are best in class.",
  },
  {
    name: "Dr. Sudha N.",
    role: "Principal, Vidya Vardhaka Engineering College",
    quote:
      "From scaffolding design to final handover, the team was professional, transparent, and committed. Our campus was completed without a single safety incident.",
  },
  {
    name: "Anil Kapoor",
    role: "GM Projects, Prestige Group",
    quote:
      "A reliable contracting partner. Their coordination across trades and proactive risk management saved us weeks on Prestige Casabella.",
  },
];

export type VideoTestimonial = {
  name: string;
  role: string;
  embedUrl: string;
};

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Client Story — KIDAB Commercial",
    role: "Project handover walkthrough",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    name: "Client Story — Prestige Casabella",
    role: "Site testimonial",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
];
