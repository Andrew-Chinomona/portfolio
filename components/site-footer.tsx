import Link from "next/link"
import { SparklesCore } from "@/components/ui/sparkles"
import { useMemo } from "react"

export function SiteFooter() {
  const sparkles = useMemo(
    () => (
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    ),
    []
  )

  return (
    <footer className="bg-transparent text-white relative overflow-hidden">
      <div className="w-full flex flex-col items-center overflow-visible rounded-md relative pt-8 pb-0">
        <Link
          href="/contact"
          className="relative z-20 inline-flex items-center justify-center rounded-full border-2 px-8 py-4 text-base font-semibold text-white transition-colors hover:opacity-90"
          style={{
            borderColor: "#629fad",
            backgroundColor: "transparent",
            boxShadow: "0 0 12px rgba(98, 159, 173, 0.6), 0 0 24px rgba(98, 159, 173, 0.3)",
          }}
        >
          Get in touch
        </Link>

        {/* Thin line: full width on sm+, capped on very small screens so it reaches edges */}
        <div
          className="w-full min-w-0 max-w-[40rem] sm:max-w-none h-px pointer-events-none shrink-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(98, 159, 173, 0.6) 20%, rgba(98, 159, 173, 0.95) 35%, rgba(98, 159, 173, 1) 50%, rgba(98, 159, 173, 0.95) 65%, rgba(98, 159, 173, 0.6) 80%, transparent 100%)",
            boxShadow: "0 0 8px rgba(98, 159, 173, 0.7), 0 0 20px rgba(98, 159, 173, 0.6), 0 0 36px rgba(98, 159, 173, 0.5)",
          }}
        />

        <div className="w-full min-w-0 max-w-[40rem] sm:max-w-none h-40 relative overflow-hidden">
          {sparkles}

          {/* Soft edge mask: scales with container width */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: "radial-gradient(ellipse 80% 200px at 50% 0%, transparent 30%, white)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 200px at 50% 0%, transparent 30%, white)",
            }}
          />
        </div>
      </div>
    </footer>
  )
}
