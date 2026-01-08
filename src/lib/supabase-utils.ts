import { supabase, WaitlistEntry, PartnerEntry } from './supabase'

export const addToWaitlist = async (entry: Omit<WaitlistEntry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()

  if (error) throw error
  return data
}

export const addPartner = async (entry: Omit<PartnerEntry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('partners')
    .insert([entry])
    .select()

  if (error) throw error
  return data
}

export const getWaitlistCount = async () => {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count || 0
}


