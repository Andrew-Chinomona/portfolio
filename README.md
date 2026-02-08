# Andrew Chinomona - Personal Brand Website

A modern, interactive personal portfolio and brand website built with Next.js 16, featuring smooth animations, 3D graphics, and a comprehensive content management system for showcasing projects, clients, and resources.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Key Dependencies](#key-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a professional personal brand website designed to showcase work, attract clients, and provide valuable resources. The site features:

- **Landing Page**: Eye-catching entry point with modern animations
- **Portfolio**: Dynamic project showcase with detailed case studies
- **Clients**: Client testimonials and case studies
- **Resources**: Content library for sharing knowledge and insights
- **Contact**: Integrated contact form with email notifications

**Live Site**: [andrewchinomona.me](https://andrewchinomona.me) *(coming soon)*

## Features

### Core Functionality

- **Server-Side Rendering (SSR)**: Fast initial page loads with Next.js App Router
- **Dynamic Routing**: Project pages, client profiles, and resource details
- **Contact Form**: Serverless API with email delivery via Resend
- **Analytics**: Integrated Vercel Analytics for visitor tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Theme switching with next-themes

### UI/UX Features

- **Advanced Animations**: Framer Motion and GSAP for smooth transitions
- **3D Graphics**: Three.js integration with React Three Fiber
- **Particle Effects**: Interactive particle systems with tsParticles
- **Glass Morphism**: Modern UI effects with liquid-glass
- **Custom Components**: Radix UI primitives for accessibility
- **Loading States**: Skeleton screens and smooth transitions

## Tech Stack

### Framework & Language

- **Next.js 16.0.8**: React framework with App Router
- **React 19.2.1**: UI library
- **TypeScript 5**: Type-safe development

### Styling

- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **PostCSS**: CSS preprocessing
- **Tailwind Animate**: Animation utilities
- **class-variance-authority**: Component variant management

### Animation & Graphics

- **Framer Motion 12.33.0**: Declarative animations
- **GSAP 3.14.2**: Professional-grade animations
- **Three.js 0.182.0**: 3D graphics
- **React Three Fiber 9.5.0**: React renderer for Three.js
- **React Three Drei 10.7.7**: Useful helpers for R3F
- **tsParticles 3.9.1**: Particle effects

### UI Components

- **Radix UI**: Accessible component primitives (40+ components)
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets
- **Sonner**: Toast notifications
- **Vaul**: Drawer component
- **Embla Carousel**: Touch-friendly carousels

### Forms & Validation

- **React Hook Form 7.60.0**: Form state management
- **Zod 3.25.76**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Backend & APIs

- **Resend 6.7.0**: Email delivery service
- **Vercel Analytics**: Built-in analytics

### Data & Utilities

- **date-fns 4.1.0**: Date manipulation
- **clsx**: Conditional class names
- **tailwind-merge**: Merge Tailwind classes

## Project Structure

```
personal-brand/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── clients/
│   │   ├── page.tsx              # Clients listing page
│   │   └── [id]/
│   │       └── page.tsx          # Individual client page
│   ├── portfolio/
│   │   ├── page.tsx              # Portfolio listing
│   │   └── projects/
│   │       └── [slug]/
│   │           ├── page.tsx      # Project detail page
│   │           └── not-found.tsx # 404 for invalid projects
│   ├── resources/
│   │   ├── page.tsx              # Resources listing
│   │   ├── loading.tsx           # Loading state
│   │   └── [id]/
│   │       └── page.tsx          # Individual resource page
│   ├── contact/
│   │   └── page.tsx              # Contact form page
│   ├── landing-page/
│   │   └── page.tsx              # Main landing page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Root page (redirects)
│   ├── globals.css               # Global styles
│   └── favicon.ico               # Site favicon
├── components/
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility functions
├── public/
│   ├── andrew-chinomona-logo.png
│   ├── ai-chatbot.png
│   └── ...                       # Static assets
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Dependencies and scripts
```

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or yarn/pnpm/bun)
- **Git**: For version control

### Installation

1. **Clone the repository**:

```bash
git clone <your-repository-url>
cd personal-website/personal-brand
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```bash
# Required for contact form
RESEND_API_KEY=your_resend_api_key_here

# Optional - defaults to andrewtchinomona@gmail.com
CONTACT_EMAIL=your_email@example.com
```

4. **Run the development server**:

```bash
npm run dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

The app will automatically redirect to `/landing-page`.

## Environment Variables

### Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `RESEND_API_KEY` | API key for sending emails via Resend | [resend.com](https://resend.com) - Sign up and create an API key |

### Optional

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `CONTACT_EMAIL` | Email address to receive contact form submissions | `andrewtchinomona@gmail.com` |

### Setting Up Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your email domain (or use the onboarding domain for testing)
3. Create an API key in the dashboard
4. Add the key to `.env.local`

## Development

### Running Locally

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Development Server

The dev server runs on `http://localhost:3000` with:

- **Fast Refresh**: Instant feedback on code changes
- **Error Overlay**: Helpful error messages in the browser
- **Turbopack**: Next.js's fast bundler (configured in `next.config.ts`)

### Code Quality

- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict type checking enabled
- **Editor Integration**: Works with VS Code, Cursor, and other IDEs

## API Routes

### POST `/api/contact`

Handles contact form submissions and sends email notifications.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "Web Development",
  "budget": "$5,000 - $10,000",
  "message": "I'd like to discuss a project..."
}
```

**Response** (Success):

```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

**Response** (Error):

```json
{
  "error": "Missing required fields"
}
```

**Required Fields**: `name`, `email`, `message`

**Optional Fields**: `projectType`, `budget`

## Deployment

### Deploying to Vercel (Recommended)

1. **Push to GitHub**:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**:

- Go to [vercel.com](https://vercel.com)
- Click "Add New" → "Project"
- Import your GitHub repository
- **Root Directory**: Set to `personal-brand` (if repo contains parent folder)
- Framework: Next.js (auto-detected)

3. **Configure Environment Variables**:

In Vercel project settings → Environment Variables:

```
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=your_email@example.com
```

4. **Deploy**:

Click "Deploy" - Vercel will build and deploy automatically

5. **Custom Domain** (andrewchinomona.me):

- Settings → Domains → Add Domain
- Enter `andrewchinomona.me`
- Follow DNS configuration instructions
- Vercel automatically provisions SSL

### Deploying to Other Platforms

#### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Add environment variables in Netlify dashboard
```

#### Railway/Render

```bash
# Build command
npm install && npm run build

# Start command
npm run start

# Add environment variables in platform dashboard
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |

## Key Dependencies

### Production Dependencies

- **Next.js 16**: React framework with App Router, Server Components
- **React 19**: Latest React with improved performance
- **Framer Motion**: Animation library for smooth transitions
- **GSAP**: Professional animation platform
- **Three.js + R3F**: 3D graphics and rendering
- **Radix UI**: 40+ accessible, unstyled components
- **Tailwind CSS 4**: Latest version with improved performance
- **Resend**: Email API for contact form
- **React Hook Form + Zod**: Form handling with validation
- **Vercel Analytics**: Built-in analytics tracking

### Development Dependencies

- **TypeScript 5**: Type-safe development
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing for Tailwind

## Pages Overview

### `/landing-page`

Main entry point featuring:
- Hero section with animations
- Portfolio highlights
- Call-to-action sections

### `/portfolio`

Project showcase with:
- Grid layout of projects
- Filtering capabilities
- Dynamic project pages at `/portfolio/projects/[slug]`

### `/clients`

Client testimonials and case studies:
- Client logos and descriptions
- Individual client pages at `/clients/[id]`

### `/resources`

Knowledge base with:
- Blog posts and articles
- Tutorials and guides
- Individual resource pages at `/resources/[id]`

### `/contact`

Contact form with:
- Form validation
- Email integration
- Success/error notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Core Web Vitals**: All green

## Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Vercel Deployment Documentation](https://vercel.com/docs)

## Contact

**Andrew Chinomona**
- Website: [andrewchinomona.me](https://andrewchinomona.me)
- Email: andrewtchinomona@gmail.com

---

**Built with Next.js 16, React 19, and Tailwind CSS 4**
