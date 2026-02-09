import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-transparent text-white relative overflow-hidden">
      <div className="container max-w-6xl mx-auto py-10 md:py-14 px-4 md:px-0 relative z-10">
        <Card className="bg-[#202021]/70 text-white rounded-3xl border border-white/15 shadow-md md:shadow-lg px-6 md:px-10 py-8 md:py-10 relative overflow-hidden">
          <div className="relative z-10">
            {/* Mobile & tablet: social icons + all rights reserved only */}
            <div className="flex flex-col items-center gap-6 py-4 xl:hidden">
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/a_n_d.r.e_w/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/andrew-chinomona-601805350/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:andrewtchinomona@gmail.com"
                  className="text-white/70 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="https://github.com/Andrew-Chinomona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
              <p className="text-xs text-white/60 text-center">
                © {new Date().getFullYear()} Andrew Chinomona. All rights reserved.
              </p>
            </div>

            {/* Desktop (xl+): full footer */}
            <div className="hidden xl:block">
              <div className="grid grid-cols-3 gap-12 items-start">
                {/* Brand Column */}
                <div>
                  <Link href="/" className="inline-block">
                    <Image
                      src="/professional-profile.png"
                      alt="Andrew Chinomona"
                      width={160}
                      height={160}
                      className="w-40 h-40 rounded-full object-cover"
                    />
                  </Link>
                </div>

                {/* Work Column */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base font-semibold">Work</h3>
                  <ul className="space-y-2 md:space-y-3 text-sm">
                    <li>
                      <Link href="/clients" className="text-white/70 hover:text-white transition-colors">
                        Client Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" className="text-white/70 hover:text-white transition-colors">
                        Personal Projects
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Connect Column */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base font-semibold">Connect</h3>
                  <ul className="space-y-2 md:space-y-3 text-sm">
                    <li>
                      <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                        Get in Touch
                      </Link>
                    </li>
                  </ul>
                  <div className="flex gap-3 md:gap-4 pt-1 md:pt-2">
                    <a
                      href="https://www.instagram.com/a_n_d.r.e_w/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/andrew-chinomona-601805350/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="mailto:andrewtchinomona@gmail.com"
                      className="text-white/70 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </a>
                    <a
                      href="https://github.com/Andrew-Chinomona"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/15">
                <p className="text-sm text-white/60 text-center">
                  © {new Date().getFullYear()} Andrew Chinomona. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  )
}
