import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="container min-h-screen flex items-center justify-center relative z-10">
            <div className="text-center max-w-5xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight text-neutral-900">
                Elevate Your Business
              </h1>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
