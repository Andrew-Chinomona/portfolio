import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Project not found</h1>
        <p className="text-white/80 text-center max-w-md mb-8">
          The project you’re looking for doesn’t exist or may have been moved.
        </p>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full border-[#629FAD] text-[#629FAD] hover:bg-[#629FAD]/10 text-base font-bold px-6 py-3"
        >
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </main>
    </div>
  )
}
