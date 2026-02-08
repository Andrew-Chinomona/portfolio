"use client";

import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

type AboutMeCardProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function AboutMeCard({
  children,
  className = "",
}: AboutMeCardProps) {
  return (
    <section className={`relative w-full ${className} ${montserrat.variable}`}>
      {/* MOBILE: no card, Montserrat header, sans serif text */}
      <div className="block md:hidden w-full px-4 text-center">
        <h2
          className={`font-bold uppercase tracking-wide mb-6 ${montserrat.className}`}
          style={{
            color: "#ffffff",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
          }}
        >
          About Me
        </h2>
        <div className={`${montserrat.className} text-left leading-relaxed max-w-xl mx-auto [&_p]:!text-white [&_em]:!text-white/90 [&_p]:font-normal`}>
          {children}
        </div>
      </div>

      {/* DESKTOP: card layout */}
      <div className="hidden md:block relative w-full">
        <svg
          className="block w-full h-auto"
          viewBox="0 0 1200 600"
          aria-hidden="true"
        >
        {/* Soft shadow */}
        <defs>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Card shape - folder tab style */}
        <path
          d="
            M 100 180
            Q 100 130 150 130
            L 400 130
            Q 460 130 460 105
            L 460 80
            Q 460 55 485 55
            L 1050 55
            Q 1100 55 1100 105
            L 1100 505
            Q 1100 555 1050 555
            L 150 555
            Q 100 555 100 505
            L 100 180
            Z
          "
          fill="white"
          stroke="#e5e5e5"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#cardShadow)"
        />
        </svg>

        {/* Title - Positioned in gray space at top left, outside the card */}
        <h2
          className={`absolute font-bold uppercase tracking-wide ${montserrat.className}`}
          style={{
            color: "#ffffff",
            top: "14%",
            left: "13%",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
          }}
        >
          About Me
        </h2>

        {/* Content layer sits on top of the SVG card - properly constrained */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute overflow-hidden flex items-center justify-center p-4 md:p-6 lg:p-8 pointer-events-auto"
            style={{
              left: "8.3%",
              right: "8.3%",
              top: "22%",
              bottom: "7.5%",
            }}
          >
            <div className="w-full h-full text-center overflow-hidden flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
