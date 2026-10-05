# ProxyTech — Modern Digital Engineering & Software Agency

ProxyTech is a production-ready, high-performance website for an elite software engineering and digital services agency. Designed with a dark high-tech terminal aesthetic (`#0c0d10` background with mint `#7cf5c8` accents), monospace metadata pills, and responsive architecture.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Supabase**, and **Lucide React**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero untyped code)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS variables & mint theme
- **Database / Backend**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Social Icons
- **SEO & Meta**: Next.js Metadata API, Dynamic OpenGraph, JSON-LD Schemas, XML Sitemap, `robots.txt`, and `llms.txt`
- **Deployment**: Vercel-ready with zero build warnings

---

## 📁 Project Architecture & File Structure

```text
proxytech/
├── .env.example                  # Environment variable configuration template
├── AGENTS.md                     # Programmatic RFP specification for AI agents
├── public/
│   ├── llms.txt                  # LLM indexing specification
│   └── ...                       # Static public assets
├── supabase/
│   └── schema.sql                # Complete PostgreSQL tables & RLS policies
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global layout with JSON-LD (Org & WebSite), fonts & nav
│   │   ├── page.tsx              # Homepage (Hero, Stats, Services, Projects, Pods, etc.)
│   │   ├── globals.css           # Design system tokens, ticker animations, dark/light vars
│   │   ├── robots.ts             # Dynamic robots.txt
│   │   ├── sitemap.ts            # Dynamic XML sitemap covering all 32+ routes
│   │   ├── about/
│   │   │   └── page.tsx          # About ProxyTech (Mission, Vision, Values, Stats)
│   │   ├── contact/
│   │   │   └── page.tsx          # Lead generation, Calendly booking & office info
│   │   ├── pricing/
│   │   │   └── page.tsx          # Monthly / Yearly pods, comparison matrix & FAQs
│   │   ├── projects/
│   │   │   ├── page.tsx          # Case study directory with category filters
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Dynamic project case study details & metrics
│   │   ├── services/
│   │   │   ├── page.tsx          # Services directory overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Dynamic service specification & scope pages
│   │   ├── team/
│   │   │   ├── page.tsx          # Engineering team roster
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Team member bio, skills, and JSON-LD Person schema
│   │   ├── privacy/
│   │   │   └── page.tsx          # Client confidentiality & data privacy policy
│   │   ├── terms/
│   │   │   └── page.tsx          # Master Services Agreement (MSA) & IP ownership terms
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts      # Contact lead capture handler
│   │       └── hire/
│   │           └── route.ts      # Agent-ready JSON RFP endpoint (POST /api/hire)
│   ├── components/
│   │   ├── AnnouncementTicker.tsx# Scrolling marquee ticker with mint pulse
│   │   ├── Navbar.tsx            # Sticky navigation with mobile menu drawer
│   │   ├── Footer.tsx            # 4-column footer with newsletter & system status
│   │   ├── HeroSection.tsx       # Flagship hero with live telemetry visual
│   │   ├── ServicesSection.tsx   # 6 core service modules with hover mint glow
│   │   ├── StatsSection.tsx      # Proof-in-numbers counters & trusted client tags
│   │   ├── CaseStudiesSection.tsx# Filterable case study showcase with metrics
│   │   ├── ProcessSection.tsx    # 4-stage sprint execution framework
│   │   ├── PricingSection.tsx    # Interactive monthly/yearly pricing toggle
│   │   ├── TeamSection.tsx       # Team grid with hover states and profile links
│   │   ├── TestimonialsSection.tsx# Verified client testimonials and star ratings
│   │   ├── TechStackTicker.tsx   # "Tools we ship with" chip wrapping list
│   │   ├── AgentHireSection.tsx  # AGENTS.md code snippet & live endpoint tester
│   │   ├── FAQSection.tsx        # Accordion FAQ with expand/collapse logic
│   │   ├── CTASection.tsx        # High-converting project inquiry banner
│   │   ├── ContactForm.tsx       # Supabase-integrated RFP form with validation
│   │   ├── Breadcrumbs.tsx       # Accessible breadcrumb trail
│   │   ├── ThemeToggle.tsx       # Dark & light mode switcher
│   │   └── SocialIcons.tsx       # Pixel-perfect SVG social icons
│   └── lib/
│       ├── data.ts               # Static data store for services, team, projects, etc.
│       ├── supabase.ts           # Supabase client with graceful local fallback
│       ├── types.ts              # TypeScript interface definitions
│       └── utils.ts              # Class merging and currency utilities
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20+` or `v25+`
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone the repository
cd proxytech

# Install dependencies
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update your Supabase variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/proxytech/discovery
NEXT_PUBLIC_SITE_URL=https://proxytech.dev
```
*(Note: If Supabase variables are left empty, ProxyTech gracefully runs in resilient offline mode with local storage logging).*

### 4. Database Setup (Supabase)
1. Open your [Supabase Dashboard](https://app.supabase.com/).
2. Navigate to the **SQL Editor**.
3. Open `supabase/schema.sql` and run the script. This will create:
   - `contact_submissions` table with public INSERT RLS policy
   - `services`, `projects`, `team_members`, and `pricing_plans` tables.

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Build & Vercel Deployment

### Step A: Test Production Build Locally
Verify that all TypeScript types, routes, and static pages compile cleanly:
```bash
npm run build
```

### Step B: Deploying to Vercel

#### Method 1: Using the Vercel Dashboard (Recommended)
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" > "Project"**.
3. Import your `proxytech` repository.
4. Set the Framework Preset to **Next.js**.
5. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase Anon API key
   - `NEXT_PUBLIC_CALENDLY_URL` = your Calendly booking URL
6. Click **Deploy**. Vercel will build and assign your production domain.

#### Method 2: Using the Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Authenticate and deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🤖 AI Agent Integration Protocol

ProxyTech supports programmatic project brief submissions for autonomous AI agents (Claude, Cursor, Devin, ChatGPT, Antigravity) via:

- **Endpoint**: `POST https://proxytech.dev/api/hire`
- **Discovery**: [https://proxytech.dev/llms.txt](https://proxytech.dev/llms.txt) and [AGENTS.md](./AGENTS.md)

### Sample Payload:
```json
{
  "name": "Autonomous Agent / Client",
  "email": "agent@company.com",
  "company": "NextGen Systems Inc.",
  "service": "Software & SaaS Development",
  "budget": "$10,000 - $25,000",
  "brief": "We need a multi-tenant Next.js platform with PostgreSQL Row Level Security."
}
```

---

## 📄 License & Attribution

&copy; ProxyTech Software Solutions LLC. All rights reserved.
