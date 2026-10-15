import { redirect } from 'next/navigation'
import { getSupabaseServerClient, hasSupabaseEnv } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/admin-shell'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!hasSupabaseEnv()) redirect('/admin/login')

  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } }

  if (!user) redirect('/admin/login')

  return <AdminShell userEmail={user.email}>{children}</AdminShell>
}
