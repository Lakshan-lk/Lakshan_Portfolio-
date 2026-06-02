-- =========================================================================
-- Lakshan Portfolio CMS Supabase Setup Script
-- Run this SQL in your Supabase SQL Editor to initialize all tables
-- =========================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., "UI/UX Design", "Web Projects", "Mobile Projects"
    description TEXT NOT NULL,
    image TEXT NOT NULL, -- Public URL of uploaded screenshot in Storage
    github TEXT,
    demo TEXT,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of items like: [{"name": "React", "icon": "FaReact"}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    org TEXT NOT NULL, -- e.g., "SLIIT", "Simplilearn", "University of Moratuwa"
    date TEXT NOT NULL, -- e.g., "Issued July 2025"
    logo TEXT NOT NULL, -- Public URL of uploaded logo image in Storage
    credential_id TEXT, -- e.g., "7Wf2MWI1MH"
    link TEXT, -- Credential verification URL
    color TEXT DEFAULT 'bg-white' NOT NULL, -- Background color class for logo card
    border_color TEXT DEFAULT 'group-hover:border-white/50' NOT NULL, -- Border hover class
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. JOURNEY TABLE (TIMELINE)
CREATE TABLE IF NOT EXISTS journey (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year TEXT NOT NULL, -- e.g., "2025 - Present"
    title TEXT NOT NULL, -- e.g., "UI/UX Designer"
    subtitle TEXT NOT NULL, -- e.g., "All In One Holding"
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('experience', 'education')), -- Milestone type
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL, -- Array of tag strings: ['Figma', 'UI/UX']
    icon_name TEXT DEFAULT 'Briefcase' NOT NULL, -- Lucide Icon identifier
    "order" INT DEFAULT 0 NOT NULL, -- For custom sorting
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CONTACT MESSAGES TABLE (INBOX)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS POLICIES
-- =========================================================================

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 1. Projects Policies
CREATE POLICY "Allow public read access on projects" 
ON projects FOR SELECT USING (true);

CREATE POLICY "Allow admin write access on projects" 
ON projects FOR ALL TO authenticated USING (true);

-- 2. Certifications Policies
CREATE POLICY "Allow public read access on certifications" 
ON certifications FOR SELECT USING (true);

CREATE POLICY "Allow admin write access on certifications" 
ON certifications FOR ALL TO authenticated USING (true);

-- 3. Journey Policies
CREATE POLICY "Allow public read access on journey" 
ON journey FOR SELECT USING (true);

CREATE POLICY "Allow admin write access on journey" 
ON journey FOR ALL TO authenticated USING (true);

-- 4. Messages Policies
CREATE POLICY "Allow public insert access on messages" 
ON messages FOR INSERT WITH CHECK (true); -- Anyone can submit a message!

CREATE POLICY "Allow admin read/write access on messages" 
ON messages FOR ALL TO authenticated USING (true); -- Only admin can read/edit/delete messages
