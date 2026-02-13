"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Montserrat } from "next/font/google"
import SplitText from "@/components/SplitText"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const TEAL = "#629FAD"


type ServiceCard = {
  id: string
  title: string
  price: string
  tagline: string
  bullets: string[]
}

type ServiceItem =
  | { id: string; title: string; type: "cards"; cards: ServiceCard[] }
  | { id: string; title: string; type: "quote" }

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    title: "Websites",
    type: "cards",
    cards: [
      {
        id: "landing-page",
        title: "Landing Page",
        price: "$150",
        tagline: "A single responsive page that makes a strong first impression.",
        bullets: ["1 responsive page", "Modern design", "Contact form", "Mobile-first"],
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
      },
    ],
  },
  {
    id: "brand",
    title: "Brand Design",
    type: "cards",
    cards: [
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
      },
    ],
  },
  {
    id: "custom",
    title: "Custom Software",
    type: "quote",
  },
]

/* ── Map card ID to contact form params ──────────────────────── */
function getContactParams(cardId: string): { service: string; budget: string } {
  const mapping: Record<string, { service: string; budget: string }> = {
    "landing-page": { service: "landing-page", budget: "<200" },
    "multi-page": { service: "website", budget: "200-500" },
    "web-app": { service: "web-app", budget: "500-1000" },
    "brand-refresh": { service: "brand-refresh", budget: "200-500" },
    "brand-creation": { service: "brand-creation", budget: "500-1000" },
  }
  return mapping[cardId] || { service: "", budget: "" }
}

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

/* ── Horizontal card slider ──────────────────────────────────── */
function CardSlider({ cards }: { cards: ServiceCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / cards.length
    const idx = Math.round(el.scrollLeft / cardWidth)
    setActive(idx)
  }

  return (
    <div>
      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-6 pb-6 -mx-2 px-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
            className="rounded-3xl p-6 snap-center shrink-0 border-2"
            style={{
              borderColor: TEAL,
              boxShadow: `0 0 12px ${TEAL}, 0 0 20px rgba(98,159,173,0.4), inset 0 0 12px rgba(98,159,173,0.15)`,
              backgroundColor: "transparent",
              width: "80vw",
              maxWidth: 340,
            }}
          >
            {/* Plan name */}
            <h3 className="text-white text-sm mb-6">{card.title}</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[28px] text-white">{card.price}</span>
            </div>
            <p className="text-white/70 text-xs mb-8 leading-relaxed">
              {card.tagline}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {card.bullets.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                  <CircleCheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={`/contact?service=${getContactParams(card.id).service}&budget=${encodeURIComponent(getContactParams(card.id).budget)}`}
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

      {/* Dot indicators */}
      {cards.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {cards.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: i === active ? TEAL : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main section ────────────────────────────────────────────── */
export function MobileServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="lg:hidden w-full px-4 py-12 relative z-10">
      <div className="text-center mb-8">
        <SplitText
          text="Services"
          tag="h2"
          className={`text-3xl font-bold uppercase tracking-tight text-white ${montserrat.className}`}
          splitType="chars"
          delay={40}
          duration={0.8}
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          rootMargin="-50px"
          textAlign="center"
        />
      </div>

      <div className="space-y-0">
        {SERVICES.map((service, index) => {
          const isExpanded = expandedIndex === index

          return (
            <div
              key={service.id}
              className="border-b-2"
              style={{ borderColor: "#ffffff" }}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full flex items-center justify-between py-4 px-3 text-left transition-colors"
                aria-expanded={isExpanded}
              >
                <span
                  className={`font-bold uppercase tracking-tight text-lg transition-colors ${montserrat.className}`}
                  style={{ color: isExpanded ? TEAL : "#ffffff" }}
                >
                  {index + 1}. {service.title}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 ml-2" style={{ color: "#ffffff" }} />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 ml-2" style={{ color: "#ffffff" }} />
                )}
              </button>

              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="overflow-hidden"
              >
                <div className="pb-4 pt-2 px-2">
                  {service.type === "cards" && (
                    <CardSlider cards={service.cards} />
                  )}

                  {service.type === "quote" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                      className="pt-2 pb-2 flex justify-center"
                    >
                      <Link
                        href="/contact?service=custom-software&budget=1500%2B"
                        className="inline-flex items-center justify-center rounded-full border-2 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{
                          borderColor: TEAL,
                          backgroundColor: "transparent",
                          boxShadow:
                            "0 0 12px rgba(98, 159, 173, 0.6), 0 0 24px rgba(98, 159, 173, 0.3)",
                        }}
                      >
                        Get a quote
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Hide scrollbar across browsers */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
