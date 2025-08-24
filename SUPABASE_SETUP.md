# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project

## 2. Create the Waitlist Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow insert access for all users" ON waitlist
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

## 4. Test the Setup

Run your application and try submitting the waitlist form. Check your Supabase dashboard to see if data is being inserted correctly.
