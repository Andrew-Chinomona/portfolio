"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col text-white relative overflow-x-hidden m-0 p-0" style={{ backgroundColor: "#000000" }}>
      {/* Same as landing: grain noise BG — black layer, GIF texture, two dark tint layers (all viewports) */}
      <div className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none">
        <div className="absolute inset-0 rounded-[inherit] border-0" style={{ backgroundColor: "#000000" }} aria-hidden />
        <div
          className="absolute inset-0 rounded-[inherit] border-0"
          style={{
            backgroundImage: "url(https://framerusercontent.com/images/AVsssNQRylEZc5orEWvz8Q1wQT4.gif?width=500&height=700)",
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "250px auto",
          }}
        />
        <div className="absolute inset-0 rounded-[inherit] border-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} aria-hidden />
        <div className="absolute inset-0 rounded-[inherit] border-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} aria-hidden />
      </div>

      <SiteHeader />

      <main className="flex-1 pt-16 md:pt-20 relative z-10">
        {/* Contact Section */}
        <section className="container py-12 md:py-20 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="space-y-6 md:space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
                    Let&apos;s work together
                  </h1>
                  <p className="mt-3 text-white/90 text-base md:text-lg max-w-lg">
                    Let&apos;s build something impactful together—whether it&apos;s your brand, your website, or your next big idea.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium" style={{ color: "#629FAD" }}>
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="rounded-lg !bg-white border-gray-300 text-black placeholder:text-gray-500 focus-visible:ring-[#629FAD]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#629FAD" }}>
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johnsmith@gmail.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="rounded-lg !bg-white border-gray-300 text-black placeholder:text-gray-500 focus-visible:ring-[#629FAD]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-sm font-medium" style={{ color: "#629FAD" }}>
                        Service Needed ? *
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleChange("projectType", value)}
                        required
                      >
                        <SelectTrigger id="projectType" className="rounded-lg !bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="!bg-white border-gray-200 text-black">
                          <SelectItem value="web-app" className="text-black focus:bg-gray-100">Web Application</SelectItem>
                          <SelectItem value="website" className="text-black focus:bg-gray-100">Website</SelectItem>
                          <SelectItem value="dashboard" className="text-black focus:bg-gray-100">Dashboard/Internal Tool</SelectItem>
                          <SelectItem value="ai" className="text-black focus:bg-gray-100">AI Integration</SelectItem>
                          <SelectItem value="other" className="text-black focus:bg-gray-100">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-medium" style={{ color: "#629FAD" }}>
                        Budget Range
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger id="budget" className="rounded-lg !bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent className="!bg-white border-gray-200 text-black">
                          <SelectItem value="200-500" className="text-black focus:bg-gray-100">$200 - $500</SelectItem>
                          <SelectItem value="500-1000" className="text-black focus:bg-gray-100">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-2000" className="text-black focus:bg-gray-100">$1,000 - $2,000</SelectItem>
                          <SelectItem value="5000+" className="text-black focus:bg-gray-100">$5,000+</SelectItem>
                          <SelectItem value="discuss" className="text-black focus:bg-gray-100">Let&apos;s discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium" style={{ color: "#629FAD" }}>
                      What Can I Help You With ? *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Hello, I'd like to enquire about..."
                      className="min-h-[140px] rounded-lg !bg-white border-gray-300 text-black placeholder:text-gray-500 focus-visible:ring-[#629FAD]/50 resize-y"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className="pt-2 space-y-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto rounded-lg bg-black text-white uppercase font-semibold border-2 hover:bg-black/90"
                      style={{ borderColor: "#629FAD" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit"}
                    </Button>

                    {submitStatus === "success" && (
                      <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                        <p className="text-sm text-white font-medium">
                          ✓ Message sent successfully! I&apos;ll get back to you within 24 hours.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 rounded-lg bg-white/10 border border-white/30">
                        <p className="text-sm text-white font-medium">
                          ✗ Failed to send message. Please try again or email me directly at andrewtchinomona@gmail.com
                        </p>
                      </div>
                    )}

                    {submitStatus === "idle" && (
                      <p className="text-sm text-white/70">
                        I&apos;ll respond within 24 hours. All inquiries are confidential.
                      </p>
                    )}
                  </div>
                </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
              <p className="text-[#629FAD]">Quick answers to common questions.</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">How do you charge for projects?</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">
                  I typically work on a fixed-price basis for well-defined projects, or hourly for ongoing maintenance
                  and support. After our initial discussion, I&apos;ll provide a detailed proposal with clear milestones and
                  payment terms.
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">What&apos;s your typical project timeline?</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">
                  Most projects take 4-12 weeks depending on scope. Simple landing pages can be done in 1-2 weeks, while
                  complex web applications may take 2-3 months. I&apos;ll give you a realistic timeline estimate during our
                  discovery call.
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Do you provide ongoing support?</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">
                  Yes! I offer maintenance packages for bug fixes, updates, and feature additions. Many clients choose
                  to keep me on retainer for ongoing improvements and technical support after the initial launch.
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">What information should I prepare?</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">
                  Come prepared with your goals, target audience, key features, and any design preferences or examples
                  you like. Don&apos;t worry if you don&apos;t have all the details - part of my job is helping you define the
                  requirements.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
