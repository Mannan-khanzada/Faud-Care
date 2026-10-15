'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser client for the admin login form. Only call this where
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are known to be
 * set (the login page checks first and shows a setup notice otherwise).
 */
export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
