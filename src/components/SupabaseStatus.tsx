'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test the connection by getting the waitlist count
        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })

        if (error) {
          console.error('Supabase connection error:', error)
          setStatus('error')
        } else {
          setStatus('connected')
          setWaitlistCount(count || 0)
        }
      } catch (error) {
        console.error('Supabase connection failed:', error)
        setStatus('error')
      }
    }

    checkConnection()
  }, [])

  if (status === 'checking') {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm">
        Checking Supabase connection...
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
        Supabase connection failed
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm">
      Supabase connected ✓ {waitlistCount !== null && `(${waitlistCount} waitlist entries)`}
    </div>
  )
}

