import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ImageGallery } from "@/components/image-gallery"
import { ExternalLink, Check, Code, Palette, Zap, Globe, Database, Rocket } from "lucide-react"

type TechStackItem = {
  name: string
  icon: React.ReactNode
}

type DeliveredItem = {
  title: string
  description: string
}

type ProjectData = {
  title: string
  description: string
  client: string
  year: string
  category: string
  techStack: TechStackItem[]
  delivered: DeliveredItem[]
  images: string[]
  projectUrl: string
}

const projects: Record<string, ProjectData> = {}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const projectData = projects[id]

  if (!projectData) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col text-white relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex flex-col gap-6">
              {/* Title and Button Row */}
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">{projectData.client.toUpperCase()}</h1>
                    <Button
                      size="default"
                  className="font-semibold rounded-full text-sm py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
                      asChild
                    >
                    <Link href={projectData.projectUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Live Project
                    </Link>
                  </Button>
                  </div>
              
              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed">{projectData.description}</p>
            </div>
          </div>

        {/* Images Gallery */}
        <ImageGallery images={projectData.images} />

        {/* Tech Stack Section */}
        <div className="mb-16">
          <Card className="border border-border bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Code className="w-8 h-8 text-primary" />
                Tech Stack
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Technologies and tools used to build this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {projectData.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-primary mb-2">{tech.icon}</div>
                    <span className="text-sm font-semibold text-foreground text-center">{tech.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We Delivered Section */}
        <div className="mb-16">
          <Card className="border border-border bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Check className="w-8 h-8 text-primary" />
                What We Delivered
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Comprehensive solutions tailored to meet project requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.delivered.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-muted border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed ml-11">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
