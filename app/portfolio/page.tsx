"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import AboutMeCard from "@/components/about-me-card"
import TechStackSection from "@/components/TechStackSection"
import {
  Instagram,
  Linkedin,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Montserrat } from "next/font/google"
import { projects } from "@/lib/projects"
import { SparklesPreview } from "@/components/sparkles-preview"

const montserrat = Montserrat({ subsets: ["latin"] })

const GREETINGS = ["Hi", "Salut", "Hola", "Olá", "Hallo", "Ciao", "Hoi", "Hej", "こんにちは", "你好"]

export default function PortfolioPage() {
  const [selectedExperience, setSelectedExperience] = useState(0)
  const [mobileExperienceOpen, setMobileExperienceOpen] = useState<number | null>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [showHeader, setShowHeader] = useState(false)
  const [showSocials, setShowSocials] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setGreetingIndex((i) => (i + 1) % GREETINGS.length), 2000)
    return () => clearInterval(id)
  }, [])

  const experiences = [
    {
      company: "Kenac Computer Systems",
      companyLink: { text: "@kenac.co.zw", href: "https://kenac.co.zw/index.html" },
      position: "Software Engineering Intern",
      dates: "01 June 2025 - 31 July 2025",
      achievements: [
        "Collaborated with team members to troubleshoot and resolve software issues",
        "Assisted in the design and implementation of user-friendly interfaces",
        "Participated in daily scrum meetings to discuss project progress and challenges",
        "Proved successful working within tight deadlines and fast-paced environment",
        "Demonstrated adaptability by swiftly learning and applying new technologies, tools, and methodologies as needed throughout the internship period",
        "Worked with developers to identify and remove software bugs",
      ],
    },
  ]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className={`flex min-h-screen flex-col overflow-x-hidden m-0 p-0 relative ${montserrat.className}`} style={{ backgroundColor: '#737373' }}>
      {/* Mobile: Noise BG - black layer beneath GIF, then texture, then two black tint layers */}
      <div className="block md:hidden absolute inset-0 z-0 rounded-[inherit] pointer-events-none">
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

      {/* Mobile: header always visible */}
      <div className="block md:hidden absolute top-0 left-0 right-0 z-50">
        <SiteHeader />
      </div>
      {/* Desktop: header animates in near video end */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block absolute top-0 left-0 right-0 z-50"
      >
        <SiteHeader />
      </motion.div>

      <main className="w-full m-0 p-0 relative z-10" style={{ lineHeight: 0 }}>
        {/* MOBILE HERO - stacked layout with profile circle */}
        <div
          className="block md:hidden relative w-full px-6 pt-20 pb-12 min-h-[100dvh] flex flex-col items-center justify-center text-center"
        >
          <p className="text-white text-sm uppercase tracking-[0.3em] mb-4 font-bold">Andrew Chinomona</p>

          <div className="relative mb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-[#E0E0E0] flex items-center justify-center">
              <Image
                src="/professional-profile.png"
                alt="Andrew Chinomona"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              layout
              className="absolute -bottom-2 -left-2 min-w-[3rem] px-4 py-2.5 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
              style={{ backgroundColor: "#629FAD" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={GREETINGS[greetingIndex]}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-black text-sm font-medium whitespace-nowrap"
                >
                  {GREETINGS[greetingIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <h1 className="text-white text-5xl md:text-6xl font-bold uppercase mb-10">Software engineer</h1>

          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="https://www.instagram.com/andrew_chinomona/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Instagram className="h-5 w-5 group-hover:text-pink-400" style={{ color: '#ffffff' }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/andrew-chinomona-601805350/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Linkedin className="h-5 w-5 group-hover:text-blue-400" style={{ color: '#ffffff' }} />
            </Link>
            <Link
              href="https://github.com/Andrew-Chinomona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Github className="h-5 w-5" style={{ color: '#ffffff' }} />
            </Link>
            <Link
              href="mailto:andrewtchinomona@gmail.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Mail className="h-5 w-5 group-hover:text-red-400" style={{ color: '#ffffff' }} />
            </Link>
          </div>
        </div>

        {/* DESKTOP HERO - Video Animation */}
        <div className="hidden md:block relative w-full" style={{ height: '100vh' }}>
          <video
            autoPlay
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              // Show both socials and header 2 seconds before video ends
              if (video.duration - video.currentTime <= 2 && !showSocials) {
                setShowSocials(true);
              }
              if (video.duration - video.currentTime <= 2 && !showHeader) {
                setShowHeader(true);
              }
            }}
            onEnded={(e) => {
              // Keep showing the last frame
              const video = e.currentTarget;
              video.pause();
            }}
          >
            <source src="/Black Brown Modern Creative Portfolio Presentation.mp4" type="video/mp4" />
          </video>

          {/* Social Icons - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showSocials ? 1 : 0, x: showSocials ? 0 : -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-8 left-8 z-40 flex flex-col gap-4"
          >
            <Link
              href="https://www.instagram.com/andrew_chinomona/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Instagram className="h-6 w-6 group-hover:text-pink-600 transition-colors" style={{ color: '#ffffff' }} />
            </Link>

            <Link
              href="https://www.linkedin.com/in/andrew-chinomona-601805350/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Linkedin className="h-6 w-6 group-hover:text-blue-600 transition-colors" style={{ color: '#ffffff' }} />
            </Link>

            <Link
              href="https://github.com/Andrew-Chinomona"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Github className="h-6 w-6 transition-colors" style={{ color: '#ffffff' }} />
            </Link>

            <Link
              href="mailto:andrewtchinomona@gmail.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 group"
            >
              <Mail className="h-6 w-6 group-hover:text-red-600 transition-colors" style={{ color: '#ffffff' }} />
            </Link>
          </motion.div>
        </div>

        {/* SECTION 1 - About Me */}
        <section className="py-16 md:py-24 w-full overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full px-4 md:px-8 lg:px-16 relative"
          >
            {/* Card Component with integrated title */}
            <AboutMeCard>
              <p
                className={`${montserrat.className} leading-relaxed font-normal`}
                style={{
                  color: "#000000",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                I'm a Christian who believes in Jesus Christ as my Lord and Savior. I live by
                the concept of <em>Magis</em>—Latin for "more" or "greater"—embracing the belief
                that 100% is never quite enough. This drives me to continuously push boundaries,
                explore emerging technologies, and pursue excellence in everything I do. I'm passionate
                about solving complex problems and building innovative solutions that make a meaningful impact.
                I'm currently studying software engineering at Thompson Rivers University.
              </p>
            </AboutMeCard>
          </motion.div>
        </section>

        {/* SECTION 2 - My Tech Stack */}
        <section className="w-full max-w-full overflow-x-hidden">
          <TechStackSection />
        </section>

        {/* SECTION 3 - Experience */}
        <section className="container py-12 md:py-16 w-full max-w-full overflow-x-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 space-y-8 md:space-y-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
              style={{ color: '#ffffff' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Experience
            </motion.h2>

            {/* Mobile only: dropdown accordion */}
            <div className="block lg:hidden w-full space-y-1">
              {experiences.map((exp, index) => (
                <div key={index} className="w-full">
                  <button
                    type="button"
                    onClick={() => setMobileExperienceOpen((prev) => (prev === index ? null : index))}
                    className="w-full flex items-center justify-between gap-2 px-3 py-3 border-l-2 transition-colors duration-150 text-left"
                    style={{ borderColor: mobileExperienceOpen === index ? "#629FAD" : "#296374" }}
                  >
                    <span
                      className="text-sm font-medium flex-1 min-w-0 truncate"
                      style={{ color: "#ffffff" }}
                    >
                      {exp.company}
                      {"companyLink" in exp && exp.companyLink && (
                        <>
                          {" "}
                          <a
                            href={exp.companyLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline"
                            style={{ color: "#629FAD" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {exp.companyLink.text}
                          </a>
                        </>
                      )}
                    </span>
                    <motion.span
                      animate={{ rotate: mobileExperienceOpen === index ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="shrink-0"
                      style={{ color: "#ffffff" }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileExperienceOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pt-2 pb-4">
                          <Card className="w-full flex flex-col border-2 bg-transparent" style={{ borderColor: "#629FAD" }}>
                            <CardContent
                              className="p-5 space-y-4"
                              style={{ fontFamily: "Georgia, 'Times New Roman', var(--font-montserrat), Montserrat, serif" }}
                            >
                              <div className="space-y-1.5">
                                <h3 className="text-xl font-semibold" style={{ color: "#ffffff" }}>{exp.position}</h3>
                                <p className="text-xs" style={{ color: "#ffffff" }}>{exp.dates}</p>
                              </div>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#629FAD" }} />
                                    <span className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden lg:grid lg:grid-cols-[32%_68%] gap-8 w-full items-start">
              {/* Left side - Clickable job titles (desktop) */}
              <div className="space-y-2">
                {experiences.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedExperience(index)}
                    className="w-full text-left px-2 py-2 border-l transition-colors duration-150"
                    style={{ borderColor: selectedExperience === index ? "#629FAD" : "#296374" }}
                  >
                    <span
                      className={`text-sm md:text-base transition-colors duration-150 ${
                        selectedExperience === index ? "font-semibold" : ""
                      }`}
                      style={{ color: "#ffffff" }}
                    >
                      {exp.company}
                      {"companyLink" in exp && exp.companyLink && (
                        <>
                          {" "}
                          <a
                            href={exp.companyLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline"
                            style={{ color: "#629FAD" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {exp.companyLink.text}
                          </a>
                        </>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right side - Single experience card with transition (desktop) */}
              <div className="relative w-full">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      selectedExperience === index
                        ? "opacity-100 translate-x-0 relative z-10"
                        : "opacity-0 translate-x-4 absolute top-0 left-0 w-full pointer-events-none z-0"
                    }`}
                  >
                    <Card className="w-full flex flex-col" style={{ backgroundColor: "white", borderColor: "#e5e5e5" }}>
                      <CardContent
                        className="p-6 md:p-8 space-y-4"
                        style={{ fontFamily: "Georgia, 'Times New Roman', var(--font-montserrat), Montserrat, serif" }}
                      >
                        <div className="space-y-1.5">
                          <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: "#000000" }}>{exp.position}</h3>
                          <p className="text-sm md:text-base" style={{ color: "#000000" }}>{exp.dates}</p>
                        </div>
                        <ul className="space-y-2.5">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <div className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#629FAD" }} />
                              <span className="text-base md:text-lg leading-relaxed" style={{ color: "#000000" }}>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - Personal Projects */}
        <section className="container py-16 md:py-24 w-full max-w-full overflow-x-hidden min-h-screen flex flex-col justify-center relative">
          <div className="space-y-12 md:space-y-16 w-full relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
              style={{ color: '#ffffff' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Personal Projects
            </motion.h2>

            {/* Mobile: vertical list with always-visible info */}
            <div className="block md:hidden w-full px-4 space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-0"
                >
                  <div
                    className="relative mx-auto w-full overflow-hidden rounded-3xl shadow-xl aspect-[16/10] focus-within:ring-2 focus-within:ring-[#629FAD] focus-within:ring-offset-2 focus-within:ring-offset-[#737373]"
                    style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    {imageErrors[index] ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <p className="text-white">Image not available</p>
                      </div>
                    ) : (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        unoptimized
                        className="object-cover"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, [index]: true }))
                        }
                      />
                    )}
                  </div>
                  <div className="mt-4 px-1 space-y-3">
                    <h3
                      className="text-xl font-bold uppercase tracking-tight"
                      style={{ color: "#ffffff" }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: "rgba(255, 255, 255, 0.9)" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-white text-black hover:bg-white/90 font-medium text-base min-h-[48px] px-6 py-3"
                      >
                        <Link href={`/portfolio/projects/${project.slug}`}>
                          View details
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      {project.liveUrl ? (
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="rounded-full border-white text-white hover:bg-white/20 font-medium text-base min-h-[48px] px-6 py-3"
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live project
                          </a>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="rounded-full border-white text-white hover:bg-white/20 font-medium text-base min-h-[48px] px-6 py-3"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-5 w-5" />
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: carousel with hover overlay */}
            <div className="hidden md:block relative w-full overflow-hidden max-w-full">
              <div className="relative max-w-6xl mx-auto w-full space-y-8">
                {projects.length > 1 && (
                  <>
                    <button
                      onClick={prevProject}
                      className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="h-6 w-6" style={{ color: "#ffffff" }} />
                    </button>
                    <button
                      onClick={nextProject}
                      className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                      aria-label="Next project"
                    >
                      <ChevronRight className="h-6 w-6" style={{ color: "#ffffff" }} />
                    </button>
                  </>
                )}

                <div className="overflow-hidden px-4 md:px-8 w-full">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentProject * 100}%)` }}
                  >
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        className="min-w-full px-2 md:px-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <div
                          className="group relative mx-auto w-full overflow-hidden rounded-3xl shadow-xl aspect-[16/10] focus-within:ring-2 focus-within:ring-[#629FAD] focus-within:ring-offset-2 focus-within:ring-offset-[#737373]"
                          style={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div className="absolute inset-0">
                            {imageErrors[index] ? (
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
                                  setImageErrors((prev) => ({ ...prev, [index]: true }))
                                }
                              />
                            )}
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center text-center p-6 md:p-8 pb-8 md:pb-10">
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
                                  View details
                                  <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                              </Button>
                              <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="rounded-full border-white text-white hover:bg-white/20 font-medium text-base px-6 py-6 h-12"
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="mr-2 h-5 w-5" />
                                  GitHub
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {projects.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProject(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentProject ? "w-8" : "w-2"
                        }`}
                        style={{
                          backgroundColor:
                            index === currentProject ? "#629FAD" : "rgba(41, 99, 116, 0.5)",
                        }}
                        aria-label={`Go to project ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - Mobile: Sparkles (in-page) */}
        <section className="block md:hidden w-full overflow-visible">
          <SparklesPreview />
        </section>

        {/* SECTION 5 - Desktop: Call to Action Card */}
        <section className="hidden md:flex container py-16 md:py-24 w-full max-w-full overflow-x-hidden justify-center">
          <div className="max-w-4xl mx-auto w-full flex justify-center">
            <Card className="backdrop-blur-md border overflow-hidden w-full max-w-2xl" style={{ backgroundColor: 'white', borderColor: '#e5e5e5' }}>
              <CardContent className="p-8 md:p-12 text-center space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#000000' }}>Let&apos;s bring your ideas to life</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
                  I&apos;m available for freelance projects and full-time opportunities.
                </p>
                <div className="flex justify-center pt-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full min-w-[150px]"
                    style={{ borderColor: '#629FAD', color: '#000000', backgroundColor: 'transparent' }}
                    asChild
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}