import vidya from "@/assets/project-vidya.jpg";
import kidab from "@/assets/project-kidab.jpg";
import casabella from "@/assets/project-casabella.jpg";
import warehouse from "@/assets/project-warehouse.jpg";
import scaffolding from "@/assets/project-scaffolding.jpg";
import bridge from "@/assets/project-bridge.jpg";
import construction from "@/assets/about-construction.jpg";
import projectsHero from "@/assets/projects-hero.jpg";
import bannerSite from "@/assets/banner-construction-site.jpg";
import bannerCompleted from "@/assets/banner-completed-building.jpg";
import bannerAerial from "@/assets/banner-aerial-site.jpg";
import bannerTeam from "@/assets/banner-scaffolding-team.jpg";
import bannerGlass from "@/assets/banner-glass-tower.jpg";

export const COMPANY = {
  name: "SRI VISHNU CONSOL PVT LTD",
  short: "Sri Vishnu Consol",
  tagline: "Crafting Quality Structures for Tomorrow",
  cin: "U45201KA2012PTC063587",
  email: "info@srivishnu.in",
  phone: "+91 98450 00000",
  whatsapp: "919845000000",
  address:
    "No. 16, 1st Cross, ITI Layout, Nayandahalli, Bangalore - 560039, Karnataka, India",
  addressLines: [
    "SRI VISHNU CONSOL PRIVATE LIMITED",
    "No. 16, 1st Cross, ITI Layout",
    "Nayandahalli, Bangalore - 560039",
    "Karnataka, India",
  ],
  website: "www.srivishnu.in",
  cities: ["Bangalore", "Mysore", "Mangalore", "Mumbai", "Pune", "Noida", "Chennai", "Hyderabad", "Kolkata"],
  services: ["Scaffolding", "Construction", "Building", "Interiors", "Project Management", "Civil Works"],
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
    twitter: "https://twitter.com/",
  },
};

export const BANNER_IMAGES = [
  { src: bannerCompleted, alt: "Completed commercial building by Sri Vishnu Consol" },
  { src: bannerSite, alt: "High-rise construction project under execution" },
  { src: bannerAerial, alt: "Aerial view of construction site with tower cranes" },
  { src: bannerTeam, alt: "Scaffolding erection team at work" },
  { src: bannerGlass, alt: "Modern glass facade commercial tower" },
];

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

const GALLERY_POOL = [bannerCompleted, bannerSite, bannerAerial, bannerTeam, bannerGlass, vidya, kidab, casabella, warehouse, scaffolding, bridge, construction, projectsHero];
const pickGallery = (cover: string) => [cover, ...GALLERY_POOL.filter((g) => g !== cover).slice(0, 6)];

const RAW_PROJECTS: Array<Omit<Project, "gallery"> & { gallery?: string[] }> = [
  { slug: "vidya-vardhaka-engineering-college", title: "Vidya Vardhaka Engineering College", location: "Mysore, Karnataka", category: "Institutional", year: "2022", client: "Vidya Vardhaka Sangha", shortDescription: "Construction & scaffolding for a prestigious educational institution.", description: "Comprehensive construction and scaffolding solutions across academic blocks, laboratories and administrative facilities — delivered within the tight academic calendar.", cover: vidya },
  { slug: "kidab-commercial-building", title: "KIDAB Commercial Building, I-Gate", location: "Bangalore, Karnataka", category: "Commercial", year: "2023", client: "KIDAB Developers", shortDescription: "End-to-end project management for a modern commercial complex.", description: "End-to-end project management and scaffolding for a modern glass-and-steel commercial complex requiring specialised access systems.", cover: kidab },
  { slug: "prestige-casabella", title: "Prestige Casabella", location: "Bangalore, Karnataka", category: "Residential", year: "2023", client: "Prestige Group", shortDescription: "General contracting and access solutions for a premium residential development.", description: "Complete general contracting and access solutions for a luxury residential development with multi-tower coordination and strict finish standards.", cover: casabella },
  { slug: "industrial-warehouse-hosur", title: "Industrial Warehouse, Hosur", location: "Hosur, Tamil Nadu", category: "Industrial", year: "2024", shortDescription: "Pre-engineered industrial facility with full structural and MEP coordination.", description: "Large-format warehouse with steel structural frame, RCC walls, and integrated logistics infrastructure.", cover: warehouse },
  { slug: "metro-corridor-scaffolding", title: "Metro Corridor Scaffolding Works", location: "Bangalore, Karnataka", category: "Infrastructure", year: "2024", shortDescription: "Specialised scaffolding and access engineering for elevated metro corridor.", description: "Designed, supplied and erected access systems for elevated viaduct works including pier-cap formwork access and segmental launch supports.", cover: bridge },
  { slug: "tech-park-pune", title: "Aurora Tech Park, Hinjewadi", location: "Pune, Maharashtra", category: "Commercial", year: "2024", client: "Aurora Realty", shortDescription: "Scaffolding & finishing trades for a 6-block IT campus.", description: "Coordinated cuplock scaffolding, plastering and facade access for a six-block IT campus in Hinjewadi Phase 3.", cover: bannerGlass },
  { slug: "luxury-villas-whitefield", title: "Skyline Luxury Villas, Whitefield", location: "Bangalore, Karnataka", category: "Residential", year: "2023", shortDescription: "Premium villa community with bespoke interior finishes.", description: "Forty-two premium villas with bespoke interiors, landscaped courtyards and clubhouse infrastructure.", cover: casabella },
  { slug: "school-block-mysore", title: "Sharada International School", location: "Mysore, Karnataka", category: "Institutional", year: "2022", shortDescription: "G+3 academic block with auditorium and labs.", description: "Ground-plus-three academic block including auditorium, science laboratories and playground infrastructure.", cover: vidya },
  { slug: "mumbai-highrise-scaffolding", title: "Andheri Highrise Scaffolding", location: "Mumbai, Maharashtra", category: "Scaffolding", year: "2024", shortDescription: "Cantilever scaffolding & facade access for a 28-storey tower.", description: "Cantilever scaffolding, suspended access platforms and facade cleaning systems for a 28-storey residential tower in Andheri West.", cover: scaffolding },
  { slug: "chennai-hospital-block", title: "Anugraha Multi-Speciality Hospital", location: "Chennai, Tamil Nadu", category: "Healthcare", year: "2024", client: "Anugraha Trust", shortDescription: "200-bed hospital block with clean-room interiors.", description: "Two-hundred-bed hospital block with operation theatres, ICU clean rooms, and seismic-grade structural detailing.", cover: bannerCompleted },
  { slug: "hyderabad-mall-fitout", title: "Galleria Mall Interiors", location: "Hyderabad, Telangana", category: "Interiors", year: "2024", shortDescription: "Retail mall interiors & MEP fitout.", description: "Two-lakh-sqft retail mall interior fitout including ceilings, flooring, MEP integration and storefront coordination.", cover: bannerGlass },
  { slug: "kolkata-warehouse-park", title: "Eastern Logistics Park", location: "Kolkata, West Bengal", category: "Industrial", year: "2024", shortDescription: "Multi-block logistics warehouse park.", description: "Six-block logistics park with PEB structures, dock levellers, internal roads and full site services.", cover: warehouse },
  { slug: "noida-corporate-hq", title: "Vega Corporate HQ, Sector 62", location: "Noida, Uttar Pradesh", category: "Commercial", year: "2025", shortDescription: "Corporate HQ with glass curtain wall facade.", description: "Eight-floor corporate headquarters with unitised glass curtain wall facade and double-height entrance lobby.", cover: bannerGlass },
  { slug: "mangalore-resort", title: "Coastal Bay Resort", location: "Mangalore, Karnataka", category: "Hospitality", year: "2023", shortDescription: "Beachfront resort with 80 keys and spa.", description: "Beachfront resort with eighty keys, pool deck, spa, banquet and back-of-house infrastructure.", cover: bannerCompleted },
  { slug: "pune-school-renovation", title: "Saraswathi Vidyalaya Renovation", location: "Pune, Maharashtra", category: "Institutional", year: "2022", shortDescription: "Heritage school renovation & strengthening.", description: "Structural strengthening, facade restoration and modern classroom upgrades for a 60-year-old heritage school campus.", cover: vidya },
  { slug: "industrial-pharma-plant", title: "Vyana Pharma Manufacturing Plant", location: "Bangalore Rural, Karnataka", category: "Industrial", year: "2024", shortDescription: "Pharma manufacturing plant with clean-room build-out.", description: "Pharma manufacturing facility with epoxy flooring, clean-room walling and HVAC coordination.", cover: warehouse },
  { slug: "mumbai-airport-scaffolding", title: "Airport Terminal Scaffolding", location: "Mumbai, Maharashtra", category: "Scaffolding", year: "2023", shortDescription: "Heavy-duty access scaffolding for terminal expansion.", description: "Heavy-duty system scaffolding for terminal expansion works including roof-truss access and finishing trade platforms.", cover: scaffolding },
  { slug: "kollata-residential-towers", title: "Greenfield Residential Towers", location: "Kolkata, West Bengal", category: "Residential", year: "2024", shortDescription: "Twin 24-storey residential towers.", description: "Twin twenty-four-storey residential towers with podium parking, clubhouse and landscaped amenities.", cover: casabella },
  { slug: "hyderabad-data-center", title: "Genesis Data Center", location: "Hyderabad, Telangana", category: "Industrial", year: "2025", shortDescription: "Tier-3 data centre civil & MEP works.", description: "Tier-3 data centre civil shell, raised flooring, and coordination with critical MEP trades.", cover: warehouse },
  { slug: "noida-mall-interiors", title: "Spectra Mall Interiors", location: "Noida, Uttar Pradesh", category: "Interiors", year: "2023", shortDescription: "Mall common-area interiors and atrium fitout.", description: "Mall common-area interiors, atrium fitout, signage backbone and food-court services.", cover: bannerGlass },
  { slug: "chennai-it-park-scaffolding", title: "Chennai IT Park Access Works", location: "Chennai, Tamil Nadu", category: "Scaffolding", year: "2024", shortDescription: "Facade access for a 4-block IT park.", description: "Cuplock and ring-lock scaffolding for facade access across a four-block IT park.", cover: scaffolding },
  { slug: "mysore-housing-block", title: "Affordable Housing Block, Mysore", location: "Mysore, Karnataka", category: "Residential", year: "2022", shortDescription: "G+5 affordable housing programme.", description: "G+5 affordable housing programme delivered with precast components and rapid finishing trades.", cover: casabella },
  { slug: "pune-hospital-interiors", title: "Sahyadri Hospital Interior Upgrade", location: "Pune, Maharashtra", category: "Interiors", year: "2024", shortDescription: "Operational hospital interior upgrade.", description: "Phased interior upgrade of an operational hospital — ward refurbishment, OT modernisation and waiting-area redesign.", cover: bannerCompleted },
  { slug: "bangalore-flyover-access", title: "Outer Ring Road Flyover Access", location: "Bangalore, Karnataka", category: "Infrastructure", year: "2023", shortDescription: "Pier and pier-cap formwork access.", description: "Pier and pier-cap formwork access systems for an urban flyover including load-tested launching gantries.", cover: bridge },
  { slug: "mangalore-port-warehouse", title: "Port-Side Bonded Warehouse", location: "Mangalore, Karnataka", category: "Industrial", year: "2023", shortDescription: "Bonded warehouse for port logistics.", description: "Bonded warehouse with PEB structure, customs office, and reinforced internal hardstanding.", cover: warehouse },
];

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({ ...p, gallery: p.gallery ?? pickGallery(p.cover) }));

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
  { slug: "scaffolding-safety-best-practices-2026", title: "Scaffolding Safety: Best Practices for Indian Construction Sites in 2026", excerpt: "Modern access engineering, daily inspections and worker training that keep large Indian construction sites incident-free.", body: "Modern scaffolding is an engineered access system designed for the specific geometry, loading and duration of each project. At Sri Vishnu Consol every job starts with a load study, a method statement and a tag-based inspection regime. This article walks through the daily inspection checklist used on commercial and institutional sites across Bangalore, Mumbai and Pune, the most common defects we catch, and how supervisors close them out within the shift.", date: "2026-02-12", author: "Praveen BV", cover: scaffolding, readMinutes: 6 },
  { slug: "green-building-materials-india", title: "Green Building Materials Driving Indian Construction", excerpt: "Fly-ash blocks, GGBS concrete, low-VOC finishes and the procurement choices that move projects toward IGBC ratings.", body: "Sustainability is now a procurement decision, not just a design intent. We unpack the material substitutions that have the biggest impact on embodied carbon, how they affect construction sequencing, and the documentation required for IGBC and LEED submissions.", date: "2026-01-20", author: "Vijay Kumar", cover: construction, readMinutes: 5 },
  { slug: "managing-subcontractors-large-projects", title: "Managing Subcontractors on Large Indian Projects", excerpt: "Coordination, payments, and quality control across multiple trades — the playbook we use on 50,000+ sqft sites.", body: "Subcontractor relationships make or break a programme. We share the weekly cadence — pre-pour checks, RA-bill cycles, defect logs, and material reconciliation — that keeps a multi-trade site moving without surprises.", date: "2025-12-04", author: "Praveen BV", cover: projectsHero, readMinutes: 7 },
  { slug: "cuplock-vs-ringlock-scaffolding", title: "Cuplock vs Ringlock Scaffolding: Which System When?", excerpt: "A practical comparison of cuplock and ringlock systems for facade, formwork and shoring applications in India.", body: "Cuplock is faster to erect for repetitive facade access while ringlock excels at irregular geometries and heavy shoring. We compare load tables, erection speed, rental economics and the typical project profile where each system wins on Indian sites.", date: "2025-11-18", author: "Rakesh M.", cover: scaffolding, readMinutes: 5 },
  { slug: "rera-compliance-checklist", title: "RERA Compliance Checklist for Contractors", excerpt: "What contractors need to document at every milestone to keep developer clients RERA-compliant.", body: "From quality certificates and pour-cards to milestone billing and material reconciliation — a contractor-side RERA documentation checklist developers expect from day one.", date: "2025-10-22", author: "Sneha P.", cover: bannerCompleted, readMinutes: 6 },
  { slug: "monsoon-construction-planning", title: "Planning Construction Through the Indian Monsoon", excerpt: "Sequencing, dewatering and waterproofing strategies that keep sites moving from June to September.", body: "Monsoon doesn't have to stall a programme. We share the sequencing tricks, dewatering setups and waterproofing-first detailing that have let Sri Vishnu Consol hit milestones through three consecutive Bengaluru monsoons.", date: "2025-09-10", author: "Vijay Kumar", cover: bannerSite, readMinutes: 5 },
  { slug: "interior-fitout-handover", title: "The Interior Fit-out Handover Playbook", excerpt: "How a clean snag-list and a rehearsed walkthrough cut handover defects to near zero.", body: "Interior handovers fail when defect-lists drag on. We share the pre-snag, dry-run and joint-walkthrough cadence that has reduced our average fit-out handover defect count by 70%.", date: "2025-08-02", author: "Sneha P.", cover: bannerGlass, readMinutes: 4 },
  { slug: "bim-on-mid-size-projects", title: "BIM on Mid-Size Indian Projects: Where it Pays Off", excerpt: "Clash detection, quantity take-off and 4D sequencing on sub-200-crore projects.", body: "BIM isn't only for mega projects. Even on mid-size commercial and institutional builds, clash detection and 4D sequencing return their investment many times over — here is what to model and what to skip.", date: "2025-07-14", author: "Praveen BV", cover: bannerAerial, readMinutes: 6 },
  { slug: "site-safety-culture", title: "Building a Site Safety Culture That Actually Holds", excerpt: "Beyond signage and PPE — the routines that make safety stick on long-running sites.", body: "Toolbox talks, near-miss reporting, supervisor empowerment and visible leadership — the four habits that move a site from compliant safety to lived safety.", date: "2025-06-20", author: "Rakesh M.", cover: bannerTeam, readMinutes: 5 },
  { slug: "cost-control-construction-india", title: "Cost Control on Indian Construction Projects", excerpt: "Earned-value, material reconciliation and weekly cash burn — the metrics we track.", body: "A simple weekly cost-control dashboard built around earned-value progress, material reconciliation and labour productivity keeps surprises out of the monthly review.", date: "2025-05-05", author: "Vijay Kumar", cover: construction, readMinutes: 6 },
  { slug: "facade-access-systems", title: "Choosing Facade Access Systems for High-Rise Projects", excerpt: "Suspended platforms, monorails and BMUs compared for Indian high-rise projects.", body: "Suspended platforms, monorails and Building Maintenance Units (BMUs) each suit different facade geometries. We compare cost, speed and life-cycle considerations for high-rise projects across Mumbai, Bangalore and Hyderabad.", date: "2025-04-09", author: "Rakesh M.", cover: scaffolding, readMinutes: 5 },
  { slug: "modular-construction-india", title: "Modular & Precast Construction in India: Where We Are", excerpt: "Where precast and modular techniques are winning on Indian sites — and where they aren't.", body: "Precast podiums, bathroom pods and modular MEP risers are winning on repetitive residential and hospitality programmes. We look at where the supply chain is ready and where stick-build still wins.", date: "2025-03-15", author: "Praveen BV", cover: bannerCompleted, readMinutes: 6 },
];

export type Testimonial = { name: string; role: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Ramesh Iyer", role: "Project Director, KIDAB Developers", quote: "Sri Vishnu Consol delivered our I-Gate commercial block ahead of schedule with impeccable finish quality. Their site supervision and safety standards are best in class." },
  { name: "Dr. Sudha N.", role: "Principal, Vidya Vardhaka Engineering College", quote: "From scaffolding design to final handover, the team was professional, transparent and committed. Our campus was completed without a single safety incident." },
  { name: "Anil Kapoor", role: "GM Projects, Prestige Group", quote: "A reliable contracting partner. Their coordination across trades and proactive risk management saved us weeks on Prestige Casabella." },
  { name: "Meera Joshi", role: "Director, Aurora Realty", quote: "Their scaffolding and finishing crews ran like clockwork across our six-block IT park in Pune. Zero rework, transparent billing — exactly what we needed." },
  { name: "Capt. Rajiv Menon", role: "Project Head, Coastal Bay Resort", quote: "A coastal resort is unforgiving on quality. The Sri Vishnu team delivered a finish standard that matched the brand brief on day one." },
  { name: "Sanjay Bhatia", role: "VP Construction, Vega Corp", quote: "Their unitised facade access engineering on our Noida HQ was first-rate. Daily safety culture is genuinely lived, not posted." },
  { name: "Dr. Anita R.", role: "Medical Director, Anugraha Hospital", quote: "Building an operational hospital block needs surgeons-grade precision. Sri Vishnu delivered clean rooms and OT shells on schedule." },
  { name: "Karthik V.", role: "Country Head, Genesis Data Centers", quote: "Tier-3 data centre civil works demand tight tolerances. The team understood the criticality and executed to spec from slab to handover." },
  { name: "Lakshmi N.", role: "Owner, Sharada International School", quote: "Three buildings, two summer breaks, zero disruption to the academic year. That is the standard they set." },
  { name: "Prakash Shetty", role: "Director, Eastern Logistics Park", quote: "Six PEB blocks delivered on a rolling sequence with full site services. Cost control and snag-closure were exemplary." },
  { name: "Neha Agarwal", role: "Head of Real Estate, Galleria Malls", quote: "Two lakh sqft of mall interiors finished without a single tenant-fitout delay. They genuinely partner with the developer." },
  { name: "Ravi Subramaniam", role: "Founder, Vyana Pharma", quote: "Clean rooms, epoxy flooring and HVAC coordination — all delivered to GMP requirements, audited on first inspection." },
];

export type VideoTestimonial = { name: string; role: string; embedUrl: string };

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  { name: "Client Story — KIDAB Commercial", role: "Project handover walkthrough", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { name: "Client Story — Prestige Casabella", role: "Site testimonial", embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U" },
];

export const SEO_KEYWORDS = [
  "scaffolding contractor Bangalore",
  "construction company Bangalore",
  "scaffolding rental Mumbai",
  "civil contractor Mysore",
  "construction company Pune",
  "interior fitout Hyderabad",
  "scaffolding services Chennai",
  "warehouse construction Kolkata",
  "commercial construction Noida",
  "scaffolding Mangalore",
  "building contractor India",
  "facade access scaffolding",
  "RCC construction",
  "PEB warehouse construction",
  "turnkey construction contractor",
  "Sri Vishnu Consol",
].join(", ");
