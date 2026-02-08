"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingBackButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleBack = () => {
    router.back()
  }

  // Don't show back button on home page
  if (pathname === "/") {
    return null
  }

  return (
    <div className="md:hidden fixed top-6 left-0 right-0 z-50">
      <div className="container max-w-6xl mx-auto px-4">
        <Button
          onClick={handleBack}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-border/40 shadow-lg hover:bg-background/90 hover:shadow-xl transition-all duration-300 [&_svg]:!h-6 [&_svg]:!w-6 [&_svg]:!text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft />
        </Button>
      </div>
    </div>
  )
}
