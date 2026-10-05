-- ==============================================================================
-- ProxyTech Database Schema & Row-Level Security (RLS) Setup
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- ==============================================================================

-- 1. Contact Submissions Table (Lead Capture)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed'))
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors (public) to insert inquiries
CREATE POLICY "Allow public insert on contact_submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow only authenticated service role / admins to view submissions
CREATE POLICY "Allow authenticated read on contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- 2. Services Table (Optional: Dynamic CMS)
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  problems_solved TEXT[] DEFAULT '{}',
  deliverables TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  timeline TEXT NOT NULL,
  benefits TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on services" ON public.services FOR SELECT TO anon, authenticated USING (true);

-- 3. Projects & Case Studies Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  client_industry TEXT NOT NULL,
  overview TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  timeline TEXT NOT NULL,
  deliverables TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  full_bio TEXT NOT NULL,
  location TEXT NOT NULL,
  experience_years INT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  social_github TEXT,
  social_linkedin TEXT,
  social_twitter TEXT,
  social_email TEXT NOT NULL,
  projects_count INT DEFAULT 0,
  avatar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on team_members" ON public.team_members FOR SELECT TO anon, authenticated USING (true);

-- 5. Pricing Plans Table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT NOT NULL,
  monthly_price INT,
  yearly_price INT,
  popular BOOLEAN DEFAULT false,
  deliverables TEXT[] DEFAULT '{}',
  support TEXT NOT NULL,
  revisions TEXT NOT NULL,
  development_hours TEXT NOT NULL,
  maintenance_included BOOLEAN DEFAULT true,
  seo_audit_included BOOLEAN DEFAULT false,
  cta_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on pricing_plans" ON public.pricing_plans FOR SELECT TO anon, authenticated USING (true);
