-- The Learning Pulse - Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technology', 'business', 'creative', 'health', 'vocational')),
  cost TEXT NOT NULL CHECK (cost IN ('free', 'paid', 'scholarship')),
  mode TEXT NOT NULL CHECK (mode IN ('online', 'in_person', 'hybrid')),
  duration TEXT NOT NULL CHECK (duration IN ('short', 'medium', 'long')),
  education_type TEXT NOT NULL CHECK (education_type IN ('formal', 'non_formal', 'vocational')),
  external_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  submitted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  participated_12_months BOOLEAN,
  education_level TEXT,
  interest_field TEXT,
  learning_goal TEXT,
  preferred_mode TEXT,
  budget TEXT,
  time_commitment TEXT,
  recommended_course_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Threads table
CREATE TABLE IF NOT EXISTS threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'General Discussion',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Thread replies table
CREATE TABLE IF NOT EXISTS thread_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('formal_education', 'non_formal', 'lifelong_learning', 'sdg_info', 'external_link')),
  external_url TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_threads_author ON threads(author_id);
CREATE INDEX IF NOT EXISTS idx_thread_replies_thread ON thread_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE thread_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view approved courses" ON courses FOR SELECT USING (status = 'approved' OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can submit courses" ON courses FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update courses" ON courses FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete courses" ON courses FOR DELETE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Quiz results policies
CREATE POLICY "Anyone can insert quiz results" ON quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own quiz results" ON quiz_results FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Threads policies
CREATE POLICY "Anyone can view threads" ON threads FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create threads" ON threads FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors or admins can delete threads" ON threads FOR DELETE USING (
  author_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update threads" ON threads FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Thread replies policies
CREATE POLICY "Anyone can view replies" ON thread_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON thread_replies FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authors or admins can delete replies" ON thread_replies FOR DELETE USING (
  author_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Resources policies
CREATE POLICY "Anyone can view resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Admins can manage resources" ON resources FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create bookmarks" ON bookmarks FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (user_id = auth.uid());
