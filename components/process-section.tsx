"use client"

import React from "react"
import { motion } from "framer-motion"
import SplitText from "@/components/SplitText"

const TEAL = "#629FAD"
const TEAL_LIGHT = "#7fb8c5"

/* Trail path: gentler curves with clearance so text and nodes don’t overlap */
/* Trail path: straight line 1–2–3, then curves to 4–5–6–7 */
const TRAIL_PATH = `
  M 180 300 L 683 300 L 1100 300
  L 1100 470 L 380 470
  L 380 640 L 683 640
`

/** @deprecated No longer used (connector to footer removed). Kept to avoid runtime reference errors. */
const CONNECTOR_PATH = TRAIL_PATH

type Step = {
  n: number
  title: string
  body: string
  x: number
  y: number
  align?: "left" | "right" | "center"
  tx: number
  ty: number
}

const steps: Step[] = [
  {
    n: 1,
    title: "1. DISCOVERY CALL",
    body: "Share your goals, vision\nand requirements\nwith us.",
    x: 180,
    y: 300,
    tx: 180,
    ty: 198,
    align: "center",
  },
  {
    n: 2,
    title: "2. STRATEGY & ARCHITECTURE",
    body: "We map out user journeys,\ntechnical structure and milestones.",
    x: 683,
    y: 300,
    tx: 683,
    ty: 218,
    align: "center",
  },
  {
    n: 3,
    title: "3. WIREFRAMES & PROTOTYPING",
    body: "Interactive wireframes that\nvalidate the experience\nbefore building.",
    x: 1100,
    y: 300,
    tx: 1140,
    ty: 188,
    align: "center",
  },
  {
    n: 4,
    title: "4. UI DESIGN",
    body: "Pixel-perfect interfaces\nthat reflect your brand\nand delight users.",
    x: 1100,
    y: 470,
    tx: 1230,
    ty: 450,
    align: "center",
  },
  {
    n: 5,
    title: "5. DEVELOPMENT",
    body: "Clean, scalable code using\nReact, Next.js, Django\nand modern tooling.",
    x: 380,
    y: 470,
    tx: 260,
    ty: 438,
    align: "center",
  },
  {
    n: 6,
    title: "6. LAUNCH",
    body: "Deployment, DNS, SSL—\nwe handle the go-live.",
    x: 380,
    y: 640,
    tx: 260,
    ty: 630,
    align: "center",
  },
  {
    n: 7,
    title: "7. SUPPORT & ITERATION",
    body: "Post-launch monitoring,\nupdates, and continuous\nimprovement.",
    x: 683,
    y: 640,
    tx: 683,
    ty: 698,
    align: "center",
  },
]

export function ProcessSection() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 py-16 lg:py-24">
        {/* Title above SVG */}
        <div className="text-center mb-10">
          <SplitText
            text="Delivery Process"
            tag="h2"
            className="text-3xl font-bold uppercase tracking-tight text-white lg:text-6xl xl:text-7xl"
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

        {/* Mobile: vertical trail on far left, outline nodes, text to the right */}
        <motion.div
          className="block lg:hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
            hidden: {},
          }}
        >
          <div className="relative pl-8">
            {/* Vertical 90° trail line */}
            <motion.div
              className="absolute left-3 top-6 bottom-6 w-0.5 rounded-full opacity-80"
              style={{
                backgroundColor: TEAL,
                boxShadow: `0 0 8px ${TEAL}`,
                transformOrigin: "top",
              }}
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {steps.map((s) => (
              <motion.div
                key={s.n}
                className="relative flex items-start gap-4 py-5 first:pt-0"
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -20 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Outline circle with number */}
                <div
                  className="relative z-10 w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center bg-transparent"
                  style={{ borderColor: TEAL }}
                >
                  <span className="text-base font-extrabold text-white">{s.n}</span>
                </div>
                {/* Text to the right of node */}
                <div className="flex-1 min-w-0 pt-0.5 pr-2">
                  <h3 className="font-bold text-white text-sm uppercase tracking-tight leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-white/90 text-sm mt-1.5 leading-relaxed">
                    {s.body.replace(/\n/g, ' ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative w-full overflow-hidden rounded-2xl hidden lg:block min-h-[520px] lg:min-h-[600px] xl:min-h-[680px]">
          {/* Desktop: SVG canvas - hidden on mobile, larger on big screens */}
          <svg
            viewBox="0 0 1366 768"
            className="h-auto w-full min-h-[520px] lg:min-h-[600px] xl:min-h-[680px]"
            role="img"
            aria-label="Our process infographic"
          >
            <defs>
              {/* Glow filter for the light */}
              <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="1366" height="768" fill="transparent" />

            {/* Main trail path */}
            <path
              d={TRAIL_PATH}
              fill="none"
              stroke={TEAL}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.5"
              style={{ filter: `drop-shadow(0 0 8px ${TEAL})` }}
            />
            {/* Animated light moving along the trail from 1 to 7 */}
            <path
              d={TRAIL_PATH}
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#lightGlow)"
              pathLength="1"
              strokeDasharray="0.04 0.96"
              style={{ opacity: 0.9 }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>

            {/* Step circles + text blocks */}
            {steps.map((s) => (
              <g key={s.n}>
                {/* Glow behind circle */}
                <circle cx={s.x} cy={s.y} r="32" fill={TEAL} opacity="0.15" />

                {/* Number circle */}
                <circle cx={s.x} cy={s.y} r="26" fill={TEAL} />
                <text
                  x={s.x}
                  y={s.y + 8}
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="800"
                  fill="#ffffff"
                >
                  {s.n}
                </text>

                {/* Step title */}
                <text
                  x={s.tx}
                  y={s.ty}
                  textAnchor={s.align === "right" ? "end" : s.align === "center" ? "middle" : "start"}
                  fontSize="16"
                  fontWeight="800"
                  fill="#ffffff"
                  style={{ letterSpacing: "0.5px" }}
                >
                  {s.title}
                </text>

                {/* Body text (multiline) */}
                <text
                  x={s.tx}
                  y={s.ty + 24}
                  textAnchor={s.align === "right" ? "end" : s.align === "center" ? "middle" : "start"}
                  fontSize="15"
                  fill="#ffffff"
                >
                  {s.body.split("\n").map((line, i) => (
                    <tspan key={i} x={s.tx} dy={i === 0 ? 0 : 20}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
