"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SplitText from "@/components/SplitText"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const TEAL = "#629FAD"

type ServiceCard = {
  id: string
  title: string
  price: string
  tagline: string
  bullets: string[]
  service: string
  budget: string
}

const ALL_SERVICES: ServiceCard[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    price: "$150",
    tagline: "A single responsive page that makes a strong first impression.",
    bullets: ["1 responsive page", "Modern design", "Contact form", "Mobile-first"],
    service: "landing-page",
    budget: "<200",
  },
  {
    id: "multi-page",
    title: "5-Page Website",
    price: "$500",
    tagline: "A full site with multiple pages, SEO, and lead generation built in.",
    bullets: [
      "5 responsive pages",
      "SEO optimised",
      "Contact / lead forms",
      "CMS integration",
    ],
    service: "website",
    budget: "200-500",
  },
  {
    id: "web-app",
    title: "Web App",
    price: "$1200",
    tagline: "A full-featured web application with database, admin portal, and bookings.",
    bullets: [
      "Database integration",
      "Admin portal",
      "Booking system",
      "Auth & roles",
    ],
    service: "web-app",
    budget: "500-1000",
  },
  {
    id: "brand-refresh",
    title: "Brand Refresh",
    price: "$250",
    tagline: "Update your existing brand — you bring the logos, we refine the rest.",
    bullets: [
      "Colour palette update",
      "Typography refresh",
      "Brand guidelines",
      "Asset kit",
    ],
    service: "brand-refresh",
    budget: "200-500",
  },
  {
    id: "brand-creation",
    title: "Brand Creation",
    price: "$600",
    tagline: "Full brand identity from scratch — logo, colours, type, and guidelines.",
    bullets: [
      "Logo design",
      "Colour scheme",
      "Typography system",
      "Full brand guidelines",
    ],
    service: "brand-creation",
    budget: "500-1000",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    price: "Quote",
    tagline: "Tailored solutions for your unique business needs and workflows.",
    bullets: [
      "Custom features",
      "Scalable architecture",
      "Integration support",
      "Ongoing maintenance",
    ],
    service: "custom-software",
    budget: "1500+",
  },
]

/* ── Circle check icon ───────────────────────────────────────── */
function CircleCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      style={{ color: TEAL }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function DesktopServicesSection() {
  return (
    <section className="hidden lg:block w-full px-4 py-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <SplitText
            text="Services"
            tag="h2"
            className={`text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white ${montserrat.className}`}
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-80px"
            textAlign="center"
          />
        </div>

        {/* Grid of 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {ALL_SERVICES.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl p-6 border flex flex-col h-full"
              style={{
                borderColor: TEAL,
                boxShadow: `0 0 12px ${TEAL}, 0 0 20px rgba(98,159,173,0.4), inset 0 0 12px rgba(98,159,173,0.15)`,
                backgroundColor: "transparent",
              }}
            >
              {/* Plan name */}
              <h3 className="text-white text-base font-semibold mb-4">{card.title}</h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl text-white font-medium">{card.price}</span>
              </div>
              <p className="text-white text-sm mb-6 leading-relaxed">
                {card.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6 grow">
                {card.bullets.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white">
                    <CircleCheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/contact?service=${card.service}&budget=${encodeURIComponent(card.budget)}`}
                className="w-full block text-center cursor-pointer py-3 rounded-full text-white text-sm hover:opacity-95 transition-opacity"
                style={{
                  background: `radial-gradient(circle at center, ${TEAL} 0%, rgba(98,159,173,0.7) 100%)`,
                }}
              >
                Select option
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
