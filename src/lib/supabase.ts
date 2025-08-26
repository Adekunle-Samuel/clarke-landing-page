import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for your database tables
export interface WaitlistEntry {
  id?: number
  name: string
  email: string
  created_at?: string
}

export interface PartnerEntry {
  id?: number
  brand_name: string
  email: string
  created_at?: string
}

