import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingBackButton } from "@/components/floating-back-button"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// <CHANGE> Updated metadata for personal brand site
export const metadata: Metadata = {
  title: "Andrew Chinomona",
  description:
    "Building modern, high-performing web experiences. Expert in React, Next.js, Django, and AI integrations.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/professional-profile.png",
      },
    ],
    apple: "/professional-profile.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden w-full">
        <div className="w-full min-h-screen flex flex-col">
          <FloatingBackButton />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
