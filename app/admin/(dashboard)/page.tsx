import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const sections = [
  { href: '/admin/content', label: 'Page content', table: null, blurb: 'Homepage, About, Support and Events wording and images.' },
  { href: '/admin/support', label: 'Support packages', table: 'support_packages', blurb: 'Chat-based packages, prices and WhatsApp buttons.' },
  { href: '/admin/events', label: 'Events', table: 'events', blurb: 'Webinars, discussions, onsite events and sessions.' },
  { href: '/admin/event-categories', label: 'Event categories', table: 'event_categories', blurb: 'Add, rename, reorder and disable categories.' },
  { href: '/admin/services', label: 'Services', table: 'services', blurb: 'Counselling services and their detail pages.' },
  { href: '/admin/counsellors', label: 'Counsellors', table: 'counsellors', blurb: 'Names, specialisation and profile details.' },
  { href: '/admin/testimonials', label: 'Testimonials', table: 'testimonials', blurb: 'Published testimonials.' },
  { href: '/admin/faqs', label: 'FAQs', table: 'faqs', blurb: 'Questions shown on the site.' },
  { href: '/admin/settings', label: 'Settings', table: null, blurb: 'WhatsApp number, email, social links, site name.' },
] as const

export default async function AdminDashboardPage() {
  const supabase = await getSupabaseServerClient()

  const counts = new Map<string, number | null>()
  if (supabase) {
    await Promise.all(
      sections
        .filter((s) => s.table)
        .map(async (s) => {
          const { count, error } = await supabase.from(s.table!).select('*', { count: 'exact', head: true })
          counts.set(s.table!, error ? null : (count ?? 0))
        }),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage everything on the FUAD website from here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => {
          const count = s.table ? counts.get(s.table) : undefined
          return (
            <Link
              key={s.href}
              href={s.href}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-sage/50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-lg text-navy">{s.label}</span>
                {typeof count === 'number' && (
                  <span className="rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage">{count}</span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{s.blurb}</span>
              {s.table && supabase && count === null && (
                <span className="text-xs text-destructive">Table not found — run updates-fuad-changes.sql</span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
