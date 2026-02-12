"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import SplitText from "@/components/SplitText"
import { HeroTerminal } from "@/components/hero-terminal"
import { MobileServicesSection } from "@/components/mobile-services-section"
import { ProcessSection } from "@/components/process-section"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col text-white relative overflow-hidden font-montero" style={{ backgroundColor: "#000000" }}>
      {/* Noise BG - black layer beneath GIF, then texture, then black tint */}
      <div className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none">
        <div
          className="absolute inset-0 rounded-[inherit] border-0"
          style={{ backgroundColor: "#000000" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-[inherit] border-0"
          style={{
            backgroundImage: "url(https://framerusercontent.com/images/AVsssNQRylEZc5orEWvz8Q1wQT4.gif?width=500&height=700)",
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "250px auto",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] border-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-[inherit] border-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          aria-hidden
        />
      </div>

      <SiteHeader />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container min-h-screen flex flex-col items-center justify-center relative z-10 gap-6">
            <div className="text-center max-w-5xl md:max-w-none mx-auto px-4">
              <SplitText
                text="Elevate Your Business"
                tag="h1"
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-white md:whitespace-nowrap"
                splitType="chars"
                delay={50}
                duration={1.25}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
            {/* Terminal below headline */}
            <div className="w-full max-w-3xl mx-auto px-4">
              <HeroTerminal />
            </div>
          </div>
        </section>

        {/* Mobile only: Services accordion */}
        <MobileServicesSection />

        {/* Process Section */}
        <ProcessSection />
      </main>

      <SiteFooter />
    </div>
  )
}
