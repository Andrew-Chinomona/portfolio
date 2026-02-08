export type ProjectItem = {
  slug: string
  name: string
  category?: string
  description: string
  tags: string[]
  image: string
  github: string
  demo: string
  /** When set, project is a client project; show "Live Project" instead of GitHub. */
  liveUrl?: string
  // Case study / detail page fields
  year?: string
  industry?: string
  client?: string
  projectDuration?: string
  problem?: string
  solution?: string
  challenge?: string
  summary?: string
  heroImage?: string
  heroImages?: string[]
  problemImage?: string
  solutionImages?: string[]
  summaryImage?: string
  /** Image for "More projects" card; falls back to image if not set */
  cardImage?: string
}

export const projects: ProjectItem[] = [
  {
    slug: "tourwise-real-estate-platform",
    name: "Tourwise (Real Estate Platform)",
    category: "Web Platform",
    description:
      "A modern property-discovery and rental platform for Zimbabwe, featuring intelligent search, map-based exploration, and AI-powered recommendations for tenants and host property owners.",
    tags: ["Django", "Python", "Javascript", "PostGIS", "Postgres", "Leaflet", "OpenCage", "Groq llama"],
    image: "/tourwise.png",
    github: "https://github.com/Andrew-Chinomona/tourwise",
    demo: "#",
    year: "2025",
    industry: "Real Estate",
    client: "Personal Project",
    projectDuration: "4 months",
    problem:
      "Property seekers in Zimbabwe faced fragmented listings, limited search options, and no map-based discovery. Hosts had no centralized platform to list and manage properties. The market lacked transparency and trust signals, leading to inefficiency and missed connections between tenants and property owners.",
    solution:
      "Built a full-stack platform with Django and PostGIS for geospatial search, Leaflet for interactive maps, and OpenCage for geocoding. Implemented intelligent filters, saved searches, and AI-powered recommendations using Groq and LLM APIs. Designed clear listing and inquiry flows so both tenants and hosts could manage interactions in one place.",
    challenge:
      "Balancing rich property data and filters with a simple, fast interface was a key challenge. Integrating multiple map and geocoding services while keeping the UX responsive required careful caching and progressive loading. We iterated based on early user feedback to prioritize the features that mattered most for discovery and trust.",
    summary:
      "Tourwise delivers a modern property-discovery experience for Zimbabwe, with map-based search, smart filters, and AI-assisted recommendations. The project demonstrates end-to-end product thinking—from geospatial backend to responsive frontend—and sets a foundation for scaling to more regions and features.",
    heroImage: "/tourwise.png",
    heroImages: [
      "/Gemini_Generated_Image_rkk53nrkk53nrkk5.png",
      "/ChatGPT Image Feb 7, 2026, 04_11_59 AM.png",
    ],
    problemImage: "/tourwise.png",
    solutionImages: ["/Screenshot 2026-02-07 043833.png", "/Screenshot 2026-02-07 055715.png"],
    summaryImage: "/tourwise-summary.png",
    cardImage: "/ChatGPT Image Feb 7, 2026, 04_11_59 AM.png",
  },
  {
    slug: "house-of-destiny",
    name: "House of Destiny",
    category: "Web Application",
    description:
      "A church web application for House of Destiny Ministries with sermons, events, testimonies, and an admin portal for content management.",
    tags: ["React", "Django", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vercel", "Railway"],
    image: "/houseofdestinyprofessional.png",
    github: "#",
    demo: "https://www.houseofdestiny.ca/",
    liveUrl: "https://www.houseofdestiny.ca/",
    year: "2024",
    industry: "Faith / Nonprofit",
    client: "House of Destiny Ministries",
    projectDuration: "Ongoing",
    problem:
      "House of Destiny Ministries needed a central online presence to share sermons, post events, collect testimonies, and manage church content. They required an easy-to-use admin portal for staff to upload and organize content without technical expertise.",
    solution:
      "Built a custom web application with a public-facing site for sermons, events, testimonies, and ministry information, plus a secure admin portal for uploading sermons, posting events, reviewing testimonies, and managing all church content. Deployed with modern tooling for performance and reliability.",
    challenge:
      "Balancing a rich feature set for admins with a simple, welcoming experience for visitors required careful UX decisions. Integrating event scheduling, media hosting, and testimony moderation into one cohesive platform took iterative feedback from the church team.",
    summary:
      "The House of Destiny Ministries platform delivers a professional, accessible presence for the church community. The admin portal streamlines content management so staff can focus on ministry, while visitors can easily find sermons, events, and testimonies.",
    heroImage: "/houseofdestinyprofessional.png",
    heroImages: [
      "/houseofdestinyprofessional.png",
      "/Gemini_Generated_Image_md3i2kmd3i2kmd3i.png",
    ],
    problemImage: "/hod-web-hero.png",
    solutionImages: ["/houseofdestinyprofessional.png", "/houseofdestinyprofessional.png"],
    summaryImage: "/houseofdestinyprofessional.png",
  },
]

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getOtherProjects(currentSlug: string, limit = 6): ProjectItem[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit)
}

export function getClientProjects(): ProjectItem[] {
  return projects.filter((p) => p.liveUrl)
}
