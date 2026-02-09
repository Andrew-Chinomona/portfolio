"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const ICON_CDN = "https://cdn.simpleicons.org";
const TEAL = "#629FAD";
const HEADER_ACTIVE_BLUE = "#3b82f6";

type Tool = {
  slug: string;
  name: string;
  description: string;
  oneLiner?: string;
};

type Category = {
  id: string;
  title: string;
  toolNames: string[];
};

const TOOLS: Tool[] = [
  { slug: "/icons8-canva-48.png", name: "Canva", description: "Creative design platform for graphics, presentations, and social media content with intuitive drag-and-drop tools.", oneLiner: "Creative design for graphics and social media" },
  { slug: "/icons8-figma-48.png", name: "Figma", description: "Collaborative interface design tool—perfect for wireframing, prototyping, and real-time team collaboration.", oneLiner: "Collaborative UI design and prototyping" },
  { slug: "/icons8-framer-24.png", name: "Framer", description: "Design and publish responsive sites with a visual canvas—from prototypes to production-ready code.", oneLiner: "Visual design and responsive sites" },
  { slug: "tailwindcss", name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development with responsive design and consistent styling.", oneLiner: "Utility first CSS framework" },
  { slug: "django", name: "Django", description: "High-level Python web framework for building secure, scalable applications with batteries included.", oneLiner: "Python web framework with batteries included" },
  { slug: "typescript", name: "TypeScript", description: "Typed superset of JavaScript that adds static types for safer and more maintainable codebases.", oneLiner: "Typed JavaScript for safer code" },
  { slug: "/icons8-solidworks.svg", name: "SolidWorks", description: "Professional 3D CAD software for mechanical design, simulation, and product development.", oneLiner: "3D CAD for mechanical design" },
  { slug: "autocad", name: "AutoCAD", description: "Industry-standard 2D and 3D CAD software for drafting, design, and documentation.", oneLiner: "2D and 3D drafting and design" },
  { slug: "cursor", name: "Cursor", description: "AI-powered code editor that enhances productivity with intelligent completions and context-aware assistance.", oneLiner: "AI powered code editor" },
  { slug: "pycharm", name: "PyCharm", description: "Full-featured Python IDE with debugging, refactoring, and integrated tools for development.", oneLiner: "Python IDE with debugging and refactoring" },
  { slug: "github", name: "GitHub", description: "Platform for version control, collaboration, and CI/CD—the hub for open source and team development.", oneLiner: "Version control and collaboration" },
  { slug: "modelcontextprotocol", name: "MCP", description: "Model Context Protocol for connecting AI assistants to external tools and data sources.", oneLiner: "Connecting AI to external tools and data" },
  { slug: "vercel", name: "Vercel", description: "Platform for frontend frameworks and serverless functions with instant deployments and global CDN.", oneLiner: "Frontend deployment and serverless" },
  { slug: "railway", name: "Railway", description: "Developer platform for deploying and scaling applications with simplified infrastructure management.", oneLiner: "Simplified app deployment" },
  { slug: "/neon-logomark-light-color%20(1).svg", name: "Neon", description: "Serverless Postgres with branching, autoscaling, and instant provisioning for modern applications.", oneLiner: "Serverless Postgres" },
  { slug: "postgresql", name: "PostgreSQL", description: "Powerful open-source relational database with advanced features and extensibility.", oneLiner: "Open source relational database" },
  { slug: "react", name: "React", description: "JavaScript library for building user interfaces with component-based architecture.", oneLiner: "Component based UI library" },
  { slug: "nextdotjs", name: "Next.js", description: "React framework for production with SSR, static generation, and optimized performance.", oneLiner: "React framework for production" },
  { slug: "python", name: "Python", description: "Versatile programming language for web development, data science, automation, and more.", oneLiner: "Web, data science, and automation" },
  { slug: "mysql", name: "SQL", description: "Structured Query Language for managing and querying relational databases efficiently.", oneLiner: "Managing and querying databases" },
  { slug: "html5", name: "HTML", description: "Markup language for structuring content and building the foundation of web pages.", oneLiner: "Structure and foundation of web pages" },
];

const CATEGORIES: Category[] = [
  {
    id: "design",
    title: "Design, UI & CAD Tools",
    toolNames: ["Canva", "Figma", "Framer", "SolidWorks", "AutoCAD"],
  },
  {
    id: "frontend",
    title: "Frontend & UI Development",
    toolNames: ["HTML", "Tailwind CSS", "React", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend, Languages & Frameworks",
    toolNames: ["Python", "Django", "TypeScript", "SQL"],
  },
  {
    id: "devtools",
    title: "Developer Tools, Databases & Deployment",
    toolNames: ["PostgreSQL", "Neon", "GitHub", "Cursor", "PyCharm", "MCP", "Vercel", "Railway"],
  },
];

const toolByName = Object.fromEntries(TOOLS.map((t) => [t.name, t]));

function ToolItem({ tool, index }: { tool: Tool; index: number }) {
  const iconUrl = tool.slug.startsWith("http") || tool.slug.startsWith("/") ? tool.slug : `${ICON_CDN}/${tool.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="flex gap-4 py-6 border-b last:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        <img
          src={iconUrl}
          alt={tool.name}
          className="w-7 h-7 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-white text-base mb-1">{tool.name}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const mid = Math.ceil(TOOLS.length / 2);
  const leftColumn = TOOLS.slice(0, mid);
  const rightColumn = TOOLS.slice(mid);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6 mb-12"
      >
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight ${montserrat.className}`} style={{ color: "#ffffff" }}>
          My Tech Stack
        </h2>
      </motion.div>

      {/* Mobile: accordion with four numbered categories */}
      <div className="block md:hidden space-y-0">
        {CATEGORIES.map((category, index) => {
          const isExpanded = expandedCategory === index;
          const tools = category.toolNames
            .map((n) => toolByName[n])
            .filter(Boolean);
          return (
            <div
              key={category.id}
              className="border-b"
              style={{ borderColor: "#ffffff" }}
            >
              <button
                type="button"
                onClick={() => setExpandedCategory(isExpanded ? null : index)}
                className="w-full flex items-center justify-between py-4 px-0 text-left"
                aria-expanded={isExpanded}
              >
                <span
                  className={`font-bold uppercase tracking-tight text-lg transition-colors duration-300 ease-in-out ${montserrat.className}`}
                  style={{ color: isExpanded ? TEAL : "#ffffff" }}
                >
                  {index + 1}. {category.title}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 ml-2 transition-colors duration-300" style={{ color: "#ffffff" }} />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 ml-2 transition-colors duration-300" style={{ color: "#ffffff" }} />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-4 space-y-3 pt-0 font-sans">
                  {isExpanded &&
                    tools.map((tool, i) => {
                      const iconUrl = tool.slug.startsWith("http") || tool.slug.startsWith("/") ? tool.slug : `${ICON_CDN}/${tool.slug}`;
                      const oneLiner = tool.oneLiner ?? tool.description;
                      return (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.05 + i * 0.04,
                            ease: "easeOut",
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center gap-3 shrink-0">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2"
                              style={{ borderColor: TEAL, color: TEAL }}
                            >
                              <Check className="h-3 w-3" strokeWidth={2.5} />
                            </div>
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                              style={{ backgroundColor: "#ffffff" }}
                            >
                              <img
                                src={iconUrl}
                                alt={tool.name}
                                className="w-5 h-5 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            </div>
                          </div>
                          <p
                            className="text-sm leading-relaxed font-sans flex-1 min-w-0"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                          >
                            {oneLiner}
                          </p>
                        </motion.div>
                      );
                    })}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Desktop: two-column grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-0">
          {leftColumn.map((tool, i) => (
            <ToolItem key={tool.name} tool={tool} index={i} />
          ))}
        </div>
        <div className="space-y-0">
          {rightColumn.map((tool, i) => (
            <ToolItem key={tool.name} tool={tool} index={mid + i} />
          ))}
        </div>
      </div>
    </section>
  );
}
