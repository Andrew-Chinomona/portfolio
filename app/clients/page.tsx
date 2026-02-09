"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getClientProjects } from "@/lib/projects"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function ClientsPage() {
  const clientProjects = getClientProjects()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  return (
    <div
      className="flex min-h-screen flex-col text-white relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Noise BG - black layer beneath GIF, then texture, then two black tint layers */}
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

      <main className="flex-1 pt-24 md:pt-28 relative z-10">
        {/* Hero Section */}
        <section className="container py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center space-y-4">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
              style={{ color: "#ffffff" }}
            >
              Client Projects
            </h1>
          </div>
        </section>

        {/* Client project cards - same styling as portfolio Personal Projects */}
        <section className="container pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
            {clientProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-24">
                <p
                  className="text-lg text-center max-w-md"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Client project case studies will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:gap-10">
                {clientProjects.map((project) => (
                  <div key={project.slug} className="space-y-0">
                    <div
                      className="group relative w-full overflow-hidden rounded-3xl shadow-xl aspect-[16/10]"
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <div className="absolute inset-0">
                        {imageErrors[project.slug] ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                            <p className="text-white">Image not available</p>
                          </div>
                        ) : (
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() =>
                              setImageErrors((prev) => ({ ...prev, [project.slug]: true }))
                            }
                          />
                        )}
                      </div>

                      {/* Desktop (xl): hover overlay - View details + Live Project */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden xl:flex flex-col justify-end items-center text-center p-6 md:p-8 pb-8 md:pb-10">
                        <h3
                          className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-2"
                          style={{ color: "#ffffff" }}
                        >
                          {project.name}
                        </h3>
                        <p
                          className="text-sm md:text-base mb-6 max-w-2xl line-clamp-2 mx-auto"
                          style={{ color: "rgba(255, 255, 255, 0.9)" }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-white text-black hover:bg-white/90 font-medium text-base px-6 py-6 h-12"
                          >
                            <Link href={`/portfolio/projects/${project.slug}`}>
                              Project details
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                          {project.liveUrl && (
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="rounded-full border-white text-white hover:bg-white/20 font-medium text-base px-6 py-6 h-12"
                            >
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Live Project
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mobile & tablet: two buttons below card (hidden on xl where hover overlay is used) */}
                    <div className="flex flex-col gap-4 xl:hidden mt-6 px-0">
                      <div className="flex flex-wrap gap-4">
                        {project.liveUrl && (
                          <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-white text-black hover:bg-white/90 font-medium text-base min-h-[48px] px-6 py-3 flex-1 min-w-0"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-5 w-5 shrink-0" />
                              Live project
                            </a>
                          </Button>
                        )}
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="rounded-full border-white text-white hover:bg-white/20 font-medium text-base min-h-[48px] px-6 py-3 flex-1 min-w-0"
                        >
                          <Link href={`/portfolio/projects/${project.slug}`}>
                            Project details
                            <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
