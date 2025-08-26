# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project

## 2. Create the Database Tables

Run this SQL in your Supabase SQL editor:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partners table
CREATE TABLE partners (
  id BIGSERIAL PRIMARY KEY,
  brand_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on both tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts on waitlist
CREATE POLICY "Allow insert access for all users" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow inserts on partners
CREATE POLICY "Allow insert access for all users" ON partners
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

## 3. Environment Variables

1. Copy your project URL and anon key from Supabase dashboard
2. Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Supabase Client Setup

The project now uses a centralized Supabase client located at `src/lib/supabase.ts`. This provides:
- Centralized configuration
- Type definitions for database tables
- Better error handling for missing environment variables
- Reusable client across components

## 5. Test the Setup

Run your application and try submitting both the waitlist form and partner form. Check your Supabase dashboard to see if data is being inserted correctly into both tables.

## 6. View Data in Supabase

You can view your data in the Supabase dashboard:
1. Go to your project dashboard
2. Navigate to "Table Editor"
3. Check both `waitlist` and `partners` tables for new entries
