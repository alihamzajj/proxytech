-- =========================================================
-- ProxyTech Contact Submissions Table Schema & Policy Fix
-- Run this in Supabase Dashboard -> SQL Editor -> New Query
-- =========================================================

CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    preferred_contact TEXT DEFAULT 'email',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop previous restrictive policy if it exists
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anyone to insert" ON public.contact_submissions;

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/anon visitors) to insert their inquiry
CREATE POLICY "Allow anyone to insert"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated project owners (you) to view and read submissions
CREATE POLICY "Allow authenticated read access"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);
