"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const TEAL = "#629FAD"

const glassStyle = {
  background: "rgba(0, 0, 0, 0.35)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
} as const

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkClass =
    "text-sm font-medium text-white transition-colors hover:text-[#629FAD] focus:outline-none focus-visible:text-[#629FAD]"

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isScrolled ? "opacity-100 translate-y-0 rounded-full" : "opacity-100 translate-y-0 rounded-2xl",
      )}
    >
      <nav
        className={cn(
          "rounded-full border px-6 py-3 transition-all duration-300",
          "hover:border-white/20",
        )}
        style={glassStyle}
      >
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className={linkClass}>
              Home
            </Link>

            <Link href="/clients" className={cn(linkClass, "px-4 py-2 rounded-md hover:bg-white/5")}>
              Clients
            </Link>

            <Link href="/portfolio" className={linkClass}>
              Portfolio
            </Link>

            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#629FAD] text-white border-0 hover:bg-[#629FAD]/90 hover:text-white"
            >
              <Link href="/contact">Work with me</Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center justify-between gap-3 w-full">
            <Link href="/" className="flex items-center justify-center text-white" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>

            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#629FAD] text-white text-xs px-3 py-1 h-8 border-0 hover:bg-[#629FAD]/90"
            >
              <Link href="/contact">Work with me</Link>
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:text-[#629FAD] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl border" style={glassStyle}>
          <div className="p-4 space-y-3">
            <Link
              href="/clients"
              className="block py-2 text-sm font-medium text-white hover:text-[#629FAD] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clients
            </Link>
            <Link
              href="/portfolio"
              className="block py-2 text-sm font-medium text-white hover:text-[#629FAD] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
