import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToCategory, rowToEvent, formatEventDate } from '@/lib/content/events'
import { SubmitButton } from '@/components/admin/admin-fields'
import { deleteEvent, quickUpdateEvent } from './actions'

function QuickToggle({
  id,
  field,
  value,
  label,
}: {
  id: string
  field: 'published' | 'featured' | 'status'
  value: string
  label: string
}) {
  return (
    <form action={quickUpdateEvent}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={value} />
      <SubmitButton variant="outline" className="px-3 py-1.5">
        {label}
      </SubmitButton>
    </form>
  )
}

export default async function AdminEventsPage() {
  const supabase = await getSupabaseServerClient()
  const [events, cats] = supabase
    ? await Promise.all([
        supabase.from('events').select('*').order('sort_order', { ascending: true }),
        supabase.from('event_categories').select('*'),
      ])
    : [{ data: [], error: null }, { data: [] }]

  const categories = new Map((cats.data ?? []).map(rowToCategory).map((c) => [c.id, c.name]))
  const list = (events.data ?? []).map((r) => rowToEvent(r, categories))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-navy">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Webinars, panel discussions, onsite events and awareness sessions shown on the Events page. No sample
            events are added automatically.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="shrink-0 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-ivory hover:bg-sage/90"
        >
          Add event
        </Link>
      </div>

      {events.error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load events: {events.error.message}. If a table is missing, run
          <code className="mx-1">supabase/updates-fuad-changes.sql</code> in the Supabase SQL Editor.
        </p>
      )}

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center text-sm text-muted-foreground">
          No events yet. Add the first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((e) => (
            <div
              key={e.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-sm font-medium text-navy">{e.title}</p>
                <p className="text-sm text-muted-foreground">
                  {[e.categoryName || 'No category', e.date ? formatEventDate(e.date) : 'No date', e.mode === 'online' ? 'Online' : 'Onsite']
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      e.published ? 'bg-sage/15 text-sage' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {e.published ? 'Published' : 'Hidden'}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-navy/70">
                    {e.status === 'upcoming' ? 'Upcoming' : 'Past'}
                  </span>
                  {e.featured && (
                    <span className="rounded-full bg-sage px-2.5 py-0.5 text-xs font-medium text-ivory">Featured</span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <QuickToggle id={e.id} field="published" value={String(!e.published)} label={e.published ? 'Hide' : 'Publish'} />
                <QuickToggle id={e.id} field="featured" value={String(!e.featured)} label={e.featured ? 'Unfeature' : 'Feature'} />
                <QuickToggle
                  id={e.id}
                  field="status"
                  value={e.status === 'upcoming' ? 'past' : 'upcoming'}
                  label={e.status === 'upcoming' ? 'Mark past' : 'Mark upcoming'}
                />
                <Link
                  href={`/admin/events/${e.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy hover:bg-muted"
                >
                  Edit
                </Link>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <SubmitButton variant="destructive" className="px-3 py-1.5">
                    Delete
                  </SubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
