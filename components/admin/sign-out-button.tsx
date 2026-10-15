'use client'

import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={signOut}
      className="rounded-lg border border-ivory/20 px-3 py-2 text-left text-sm text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
    >
      Sign out
    </button>
  )
}
