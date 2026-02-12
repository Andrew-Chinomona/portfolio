"use client"

import { useState } from "react"
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
  | { id: string; title: string; type: "contact" }

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    title: "Websites",
    type: "cards",
    cards: [
      {
        id: "website",
        title: "Website",
        price: "$399+",
        tagline: "A clean, fast site that looks premium and converts visitors into leads.",
        bullets: ["Modern UI", "Mobile-first", "SEO basics", "Contact / lead form"],
      },
    ],
  },
  {
    id: "internal",
    title: "Internal System",
    type: "cards",
    cards: [
      {
        id: "internal-system",
        title: "Internal System",
        price: "$899+",
        tagline: "Dashboards, roles, approvals, and workflows to run your business smoothly.",
        bullets: ["Admin dashboard", "Role-based access", "Audit-friendly", "Reports"],
      },
    ],
  },
  {
    id: "brand",
    title: "Brand Refresh",
    type: "cards",
    cards: [
      {
        id: "brand-refresh",
        title: "Brand Refresh",
        price: "Quote",
        tagline: "Logo, visual identity, and brand guidelines that stand out.",
        bullets: ["Logo design", "Color & typography", "Brand guidelines", "Asset kit"],
      },
    ],
  },
  {
    id: "custom",
    title: "Custom Software",
    type: "contact",
  },
]

export function MobileServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="md:hidden w-full px-4 py-12 relative z-10">
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
                  {service.type === "cards" &&
                    service.cards.map((card, i) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                        className="rounded-2xl border-2 p-5 mb-4 last:mb-0"
                        style={{
                          backgroundColor: "transparent",
                          borderColor: TEAL,
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                          <span
                            className="text-lg font-semibold shrink-0"
                            style={{ color: TEAL }}
                          >
                            {card.price}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                          {card.tagline}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {card.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 text-sm text-white/85"
                            >
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{
                                  backgroundColor: TEAL,
                                  boxShadow: `0 0 0 2px rgba(98,159,173,0.2)`,
                                }}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}

                  {service.type === "contact" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
                      className="pt-2 pb-2 flex justify-center"
                    >
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border-2 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{
                          borderColor: TEAL,
                          backgroundColor: "transparent",
                          boxShadow:
                            "0 0 12px rgba(98, 159, 173, 0.6), 0 0 24px rgba(98, 159, 173, 0.3)",
                        }}
                      >
                        Get in touch
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
