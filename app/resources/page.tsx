"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Calendar, ArrowRight, Code } from "lucide-react"

const articles = [
  {
    id: "building-scalable-react-apps",
    title: "Building Scalable React Applications: Lessons from Production",
    excerpt: "Key architectural patterns and best practices I've learned from shipping React apps at scale.",
    category: "Development",
    date: "2024-01-15",
    readTime: "8 min read",
    type: "article",
  },
  {
    id: "ai-integration-guide",
    title: "A Practical Guide to AI Integration in Web Apps",
    excerpt: "How to add LLM-powered features to your product without breaking the bank or compromising UX.",
    category: "AI",
    date: "2024-01-08",
    readTime: "12 min read",
    type: "article",
  },
  {
    id: "database-design-tips",
    title: "Database Design for Web Developers",
    excerpt: "Essential PostgreSQL patterns that will save you from painful migrations later.",
    category: "Backend",
    date: "2023-12-20",
    readTime: "10 min read",
    type: "article",
  },
  {
    id: "performance-optimization",
    title: "Web Performance: The Low-Hanging Fruit",
    excerpt: "Simple optimizations that can dramatically improve your site's load time and Core Web Vitals.",
    category: "Performance",
    date: "2023-12-05",
    readTime: "6 min read",
    type: "article",
  },
  {
    id: "freelance-tips",
    title: "What I Wish I Knew Before Going Freelance",
    excerpt: "Honest lessons about pricing, client communication, and staying productive as a solo developer.",
    category: "Career",
    date: "2023-11-28",
    readTime: "7 min read",
    type: "article",
  },
  {
    id: "nextjs-patterns",
    title: "Next.js App Router: Patterns I Actually Use",
    excerpt: "Real-world patterns for data fetching, caching, and server components that work in production.",
    category: "Development",
    date: "2023-11-15",
    readTime: "9 min read",
    type: "article",
  },
]

const templates = [
  {
    id: "saas-starter",
    title: "SaaS Starter Template",
    description: "Complete Next.js template with auth, payments, and admin dashboard",
    tags: ["Next.js", "Stripe", "Supabase"],
    type: "template",
  },
  {
    id: "landing-components",
    title: "Landing Page Components",
    description: "20+ production-ready React components for marketing sites",
    tags: ["React", "Tailwind", "Framer Motion"],
    type: "template",
  },
  {
    id: "dashboard-ui",
    title: "Dashboard UI Kit",
    description: "Charts, tables, and data visualization components",
    tags: ["TypeScript", "Recharts", "shadcn/ui"],
    type: "template",
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const categories = ["All", "Development", "AI", "Backend", "Performance", "Career"]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All" || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 space-y-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Resources & Insights</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Practical guides, lessons learned, and free tools to help you build better web applications.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="container pb-12 space-y-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Article */}
        <section className="container pb-16">
          <Card className="group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5"></div>
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {articles[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(articles[0].date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <span>•</span>
                  <span>{articles[0].readTime}</span>
                </div>
                <Button asChild variant="ghost" className="w-fit group-hover:text-primary">
                  <Link href={`/resources/${articles[0].id}`}>
                    Read article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Articles Grid */}
        <section className="container pb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">All Articles</h2>

            {filteredArticles.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                  No articles found matching your search.
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(1).map((article) => (
                  <Card
                    key={article.id}
                    className="group hover:shadow-lg hover:shadow-primary/10 transition-all flex flex-col"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-xl"></div>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="w-full group-hover:text-primary">
                        <Link href={`/resources/${article.id}`}>
                          Read article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="container py-24 bg-card/50">
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Free Templates & Tools</h2>
              <p className="text-xl text-muted-foreground">Production-ready code you can use in your projects</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <Card key={template.id} className="group hover:shadow-lg hover:shadow-primary/10 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-xl flex items-center justify-center">
                    <Code className="h-12 w-12 text-primary opacity-50" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container py-24">
          <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
            <CardContent className="py-16 px-8 text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Stay in the loop</h2>
              <p className="text-lg text-muted-foreground">
                Get notified when I publish new articles, templates, or case studies. No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <Input type="email" placeholder="your@email.com" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">I respect your privacy. Your email will never be shared.</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
