import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjectBySlug, getOtherProjects, type ProjectItem } from "@/lib/projects"
import { ExternalLink, ArrowRight } from "lucide-react"

const ACCENT_TEAL = "#629FAD"
const BG_DARK = "#0f0f0f"

function ProjectHeroImage({ project }: { project: ProjectItem }) {
  const heroImages = project.heroImages
  const singleSrc = project.heroImage || project.image

  if (heroImages && heroImages.length >= 2) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        {heroImages.slice(0, 2).map((src, i) => (
          <div
            key={src}
            className="w-full aspect-[16/10] relative rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt={`${project.name} ${i === 0 ? "— product preview" : "— logo"}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    )
  }

  if (!singleSrc) {
    return (
      <div
        className="w-full aspect-[16/10] rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      />
    )
  }
  return (
    <div className="w-full aspect-[16/10] relative rounded-xl overflow-hidden">
      <Image src={singleSrc} alt={project.name} fill className="object-cover" unoptimized />
    </div>
  )
}

function SectionImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div
        className="w-full aspect-video rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #0f3460 100%)",
        }}
      />
    )
  }
  return (
    <div className="w-full aspect-video relative rounded-xl overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
    </div>
  )
}

function MoreProjectsCard({ project }: { project: ProjectItem }) {
  const cardImage = project.cardImage ?? project.image
  return (
    <Link href={`/portfolio/projects/${project.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#629FAD] hover:bg-white/10 transition-all duration-300 relative aspect-video">
        <div className="absolute inset-0">
          <Image
            src={cardImage}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
        {/* Hover overlay: name + View details only */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 gap-3">
          <h3 className="font-bold text-lg md:text-xl text-white">
            {project.name.toUpperCase()}
          </h3>
          <span className="text-sm font-medium text-[#629FAD] flex items-center gap-1">
            View details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const otherProjects = getOtherProjects(slug)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
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

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-20 relative z-10">
        {/* Hero */}
        <section className="space-y-6 mb-20">
          <Badge
            variant="outline"
            className="text-xs font-medium border-[var(--accent)] text-[var(--accent)] bg-transparent"
            style={{ borderColor: ACCENT_TEAL, color: ACCENT_TEAL }}
          >
            {project.category ?? "Project"}
          </Badge>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            {project.name.toUpperCase()}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold">
            {project.year && (
              <div>
                <span style={{ color: ACCENT_TEAL }}>
                  Year:{" "}
                </span>
                <span className="text-white">{project.year}</span>
              </div>
            )}
            {project.industry && (
              <div>
                <span style={{ color: ACCENT_TEAL }}>
                  Industry:{" "}
                </span>
                <span className="text-white">{project.industry}</span>
              </div>
            )}
            {project.client && (
              <div>
                <span style={{ color: ACCENT_TEAL }}>
                  Client:{" "}
                </span>
                <span className="text-white">{project.client}</span>
              </div>
            )}
            {project.projectDuration && (
              <div>
                <span style={{ color: ACCENT_TEAL }}>
                  Project Duration:{" "}
                </span>
                <span className="text-white">{project.projectDuration}</span>
              </div>
            )}
          </div>
          {project.liveUrl && (
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-[#629FAD] text-[#629FAD] hover:bg-[#629FAD]/10"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Project
                </a>
              </Button>
            </div>
          )}
          <div className="pt-4">
            <ProjectHeroImage project={project} />
          </div>
        </section>

        {/* Problem */}
        {project.problem && (
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">PROBLEM :</h2>
            <p className="text-white/90 leading-relaxed max-w-3xl mb-8">{project.problem}</p>
            <SectionImage src={project.problemImage} alt="Problem context" />
          </section>
        )}

        {/* Solution */}
        {project.solution && (
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">SOLUTION :</h2>
            <p className="text-white/90 leading-relaxed max-w-3xl mb-8">{project.solution}</p>
            {project.solutionImages && project.solutionImages.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {project.solutionImages.map((src, i) => (
                  <SectionImage key={i} src={src} alt={`Solution ${i + 1}`} />
                ))}
              </div>
            ) : (
              <SectionImage src={project.image} alt="Solution" />
            )}
          </section>
        )}

        {/* Challenge */}
        {project.challenge && (
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">CHALLENGE :</h2>
            <p className="text-white/90 leading-relaxed max-w-3xl">{project.challenge}</p>
          </section>
        )}

        {/* Summary */}
        {project.summary && (
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">SUMMARY :</h2>
            <p className="text-white/90 leading-relaxed max-w-3xl mb-8">{project.summary}</p>
            <SectionImage src={project.summaryImage} alt="Summary" />
          </section>
        )}

        {/* More Projects */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            MORE PROJECTS
          </h2>
          {otherProjects.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((p) => (
                  <MoreProjectsCard key={p.slug} project={p} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white text-white text-base font-bold hover:bg-white/10 hover:text-white px-6 py-3"
                asChild
              >
                <Link href="/portfolio">Back to Portfolio</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
