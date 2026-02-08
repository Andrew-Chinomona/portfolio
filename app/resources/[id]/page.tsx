import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft, Calendar, Clock, Github, Share2, ArrowRight } from "lucide-react"

// This would typically come from a CMS or database
const articleData = {
  title: "Building Scalable React Applications: Lessons from Production",
  excerpt: "Key architectural patterns and best practices I've learned from shipping React apps at scale.",
  category: "Development",
  date: "2024-01-15",
  readTime: "8 min read",
  content: `
## Introduction

After building and shipping multiple React applications to production, I've learned that 
scalability isn't just about performance—it's about maintainability, developer experience, 
and long-term adaptability.

In this article, I'll share the key patterns and practices that have helped me build React 
apps that can grow with your business without collapsing under their own weight.

## 1. Component Architecture

The foundation of a scalable React app is a well-thought-out component architecture. Here's 
what works:

### Co-location is Your Friend

Keep related files close together. Instead of organizing by file type (components/, hooks/, 
utils/), organize by feature or domain.

\`\`\`
features/
  authentication/
    components/
    hooks/
    utils/
    index.ts
  dashboard/
    components/
    hooks/
    utils/
    index.ts
\`\`\`

This makes it easier to understand the scope of a feature and reduces cognitive load when 
making changes.

### Component Composition Over Props Drilling

Instead of passing props through multiple levels, use composition patterns:

\`\`\`tsx
// Instead of this:
<Layout user={user} theme={theme}>
  <Dashboard user={user} theme={theme} />
</Layout>

// Do this:
<Layout>
  <Dashboard />
</Layout>
\`\`\`

## 2. State Management

Don't reach for Redux immediately. Start with these principles:

### Server State vs Client State

Separate concerns:
- **Server state**: Data from APIs (use React Query or SWR)
- **Client state**: UI state, form state (use useState, useReducer)

### Lift State Sparingly

Keep state as local as possible. Only lift it when multiple components truly need to share it.

## 3. Performance Optimization

Performance matters, but premature optimization is still the root of all evil.

### Measure First

Use React DevTools Profiler to identify actual bottlenecks before optimizing.

### Code Splitting

Split your code at route boundaries using dynamic imports:

\`\`\`tsx
const Dashboard = lazy(() => import('./Dashboard'))
\`\`\`

## Conclusion

Building scalable React applications is about making smart architectural decisions early 
and being willing to refactor when patterns no longer serve you.

The patterns I've shared aren't dogma—they're starting points. Adapt them to your team's 
needs and your project's constraints.

## Additional Resources

- [React Documentation](https://react.dev)
- [Patterns.dev](https://patterns.dev)
- My GitHub repo with example implementations
  `,
}

export default function ArticlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Article Header */}
        <article className="container py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/resources">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Link>
            </Button>

            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline">{articleData.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{articleData.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{articleData.excerpt}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(articleData.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {articleData.readTime}
                </div>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl"></div>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {/* This would typically be rendered from markdown */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: articleData.content
                      .split("\n")
                      .map((line) => {
                        if (line.startsWith("## ")) {
                          return `<h2 class="text-3xl font-bold text-foreground mt-12 mb-4">${line.slice(3)}</h2>`
                        }
                        if (line.startsWith("### ")) {
                          return `<h3 class="text-2xl font-semibold text-foreground mt-8 mb-3">${line.slice(4)}</h3>`
                        }
                        if (line.startsWith("```")) {
                          return '<div class="bg-muted rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-foreground">'
                        }
                        if (line === "```") {
                          return "</code></div>"
                        }
                        if (line.startsWith("- ")) {
                          return `<li class="ml-6">${line.slice(2)}</li>`
                        }
                        if (line.trim() === "") {
                          return "<br />"
                        }
                        return `<p class="mb-4">${line}</p>`
                      })
                      .join(""),
                  }}
                />
              </div>
            </div>

            {/* Author CTA */}
            <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 mt-16">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="h-20 w-20 rounded-full bg-muted flex-shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold">Written by [Your Name]</h3>
                    <p className="text-muted-foreground">
                      Full-stack developer helping businesses build better web applications. I write about React,
                      Next.js, and practical software engineering.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/contact">Get in touch</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/contact">Work together</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-border">
              <Button asChild variant="outline">
                <Link href="/resources">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All articles
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View code examples
                </a>
              </Button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="container py-16 border-t border-border">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Related Articles</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="group hover:shadow-lg hover:shadow-primary/10 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-xl"></div>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm" className="w-full">
                      <Link href="#">
                        Read article <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
