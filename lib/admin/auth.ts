import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

/**
 * Shared guard for admin server actions. Every write goes through
 * requireClient(), which redirects to the login page when nobody is signed in,
 * and fail(), which sends the user back to the list with an error message.
 */
export function adminContext(listPath: string) {
  function fail(message: string, path: string = listPath): never {
    const sep = path.includes('?') ? '&' : '?'
    redirect(`${path}${sep}error=${encodeURIComponent(message)}`)
  }

  async function requireClient() {
    const supabase = await getSupabaseServerClient()
    if (!supabase) fail('Supabase is not configured (check environment variables).')
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) redirect('/admin/login')
    return supabase
  }

  return { fail, requireClient }
}
