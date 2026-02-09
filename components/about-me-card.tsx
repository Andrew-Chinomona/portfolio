"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const ABOUT_ME_IMAGE = "/Screenshot 2026-01-23 151955.png";
const FAITH_OVERLAY_IMAGE = "/Screenshot 2026-01-23 151955.png";

/** Latin (Christian) cross: longer vertical bar, shorter horizontal bar in upper third */
function LatinCrossIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={className}
      style={style}
    >
      {/* Vertical bar (full height) */}
      <line x1="12" y1="2" x2="12" y2="22" />
      {/* Horizontal bar (shorter, positioned in upper third) */}
      <line x1="6" y1="8" x2="18" y2="8" />
    </svg>
  );
}

type AboutMeCardProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function AboutMeCard({
  children,
  className = "",
}: AboutMeCardProps) {
  const [faithOverlayOpen, setFaithOverlayOpen] = useState(false);

  return (
    <section className={`relative w-full ${className} ${montserrat.variable}`}>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-5 lg:px-6 xl:px-8 text-left">
        {/* Desktop: text left, image on the right (constrained width, not full column) */}
        <div className="hidden xl:flex xl:gap-10 xl:items-start">
          <div className="min-w-0 flex-1">
            <div className="flex flex-row items-center justify-between gap-4 mb-6">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight shrink-0 ${montserrat.className}`}
                style={{ color: "#ffffff" }}
              >
                About Me
              </h2>
              <button
                type="button"
                onClick={() => setFaithOverlayOpen(true)}
                className="xl:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 shrink-0"
                aria-label="Open faith image"
              >
                <LatinCrossIcon className="h-6 w-6" style={{ color: "#ffffff" }} />
              </button>
            </div>
            <div className={`${montserrat.className} text-lg xl:text-xl leading-relaxed max-w-2xl [&_p]:!text-white [&_em]:!text-white/90 [&_p]:font-normal`}>
              {children}
            </div>
          </div>
          <div
            className="relative w-full max-w-[380px] shrink-0 overflow-hidden rounded-3xl shadow-xl aspect-[16/10] focus-within:ring-2 focus-within:ring-[#629FAD] focus-within:ring-offset-2 focus-within:ring-offset-[#737373] min-h-[220px]"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <Image
              src={ABOUT_ME_IMAGE}
              alt="About Andrew Chinomona"
              fill
              className="object-cover"
              sizes="380px"
              unoptimized
            />
          </div>
        </div>

        {/* Mobile / Tablet: single column, no image */}
        <div className="xl:hidden">
          <div className="flex flex-row items-center justify-between gap-4 mb-6">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-center md:text-left shrink-0 ${montserrat.className}`}
              style={{ color: "#ffffff" }}
            >
              About Me
            </h2>
            <button
              type="button"
              onClick={() => setFaithOverlayOpen(true)}
              className="xl:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 shrink-0"
              aria-label="Open faith image"
            >
              <LatinCrossIcon className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#ffffff" }} />
            </button>
          </div>
          <div className={`${montserrat.className} text-base md:text-lg leading-relaxed w-full [&_p]:!text-white [&_em]:!text-white/90 [&_p]:font-normal`}>
            {children}
          </div>
        </div>
      </div>

      {/* Faith image overlay */}
      <AnimatePresence>
        {faithOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setFaithOverlayOpen(false)}
            aria-modal
            role="dialog"
            aria-label="Faith image overlay"
          >
            <button
              type="button"
              onClick={() => setFaithOverlayOpen(false)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-colors"
              aria-label="Close overlay"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="relative max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={FAITH_OVERLAY_IMAGE}
                alt="Names and titles of Jesus Christ"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
