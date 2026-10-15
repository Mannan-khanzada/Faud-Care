import { getSupabasePublicClient } from '@/lib/supabase/server'
import { toStr } from '@/lib/to-list'

export type EventCategory = {
  id: string
  name: string
  slug: string
  active: boolean
  sortOrder: number
}

export type FuadEvent = {
  id: string
  title: string
  categoryId: string | null
  categoryName: string
  description: string
  /** ISO date, e.g. 2026-11-05 — or '' when not set */
  date: string
  time: string
  mode: 'online' | 'onsite'
  location: string
  imageUrl: string
  ctaLabel: string
  registrationUrl: string
  featured: boolean
  status: 'upcoming' | 'past'
  published: boolean
  sortOrder: number
}

/** The four starting categories, used until the database has its own. */
const fallbackCategories: EventCategory[] = [
  { id: 'webinar', name: 'Webinar', slug: 'webinar', active: true, sortOrder: 10 },
  { id: 'panel-discussion', name: 'Panel Discussion', slug: 'panel-discussion', active: true, sortOrder: 20 },
  { id: 'onsite-event', name: 'Onsite Event', slug: 'onsite-event', active: true, sortOrder: 30 },
  { id: 'awareness-session', name: 'Awareness Session', slug: 'awareness-session', active: true, sortOrder: 40 },
]

type Row = Record<string, unknown>

export function rowToCategory(row: Row): EventCategory {
  return {
    id: toStr(row.id),
    name: toStr(row.name),
    slug: toStr(row.slug),
    active: row.active !== false,
    sortOrder: Number(row.sort_order ?? 0),
  }
}

export async function getActiveCategories(): Promise<EventCategory[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return fallbackCategories

  const { data, error } = await supabase
    .from('event_categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return fallbackCategories
  return (data as Row[]).map(rowToCategory)
}

export function rowToEvent(row: Row, categories: Map<string, string>): FuadEvent {
  const categoryId = row.category_id ? toStr(row.category_id) : null
  return {
    id: toStr(row.id),
    title: toStr(row.title),
    categoryId,
    categoryName: categoryId ? (categories.get(categoryId) ?? '') : '',
    description: toStr(row.description),
    date: toStr(row.event_date).slice(0, 10),
    time: toStr(row.event_time),
    mode: row.mode === 'onsite' ? 'onsite' : 'online',
    location: toStr(row.location),
    imageUrl: toStr(row.image_url),
    ctaLabel: toStr(row.cta_label) || 'Register',
    registrationUrl: toStr(row.registration_url),
    featured: row.featured === true,
    status: row.status === 'past' ? 'past' : 'upcoming',
    published: row.published !== false,
    sortOrder: Number(row.sort_order ?? 0),
  }
}

/**
 * Published events with their category names resolved. Events whose category
 * was disabled or deleted are still shown, just without a category.
 * No sample events are invented: with nothing in the database this is empty.
 */
export async function getPublishedEvents(): Promise<{
  events: FuadEvent[]
  categories: EventCategory[]
}> {
  const supabase = getSupabasePublicClient()
  const categories = await getActiveCategories()
  if (!supabase) return { events: [], categories }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return { events: [], categories }

  const names = new Map(categories.map((c) => [c.id, c.name]))
  return { events: (data as Row[]).map((r) => rowToEvent(r, names)), categories }
}

/** Fixed, locale-independent date format so server and browser always agree. */
export function formatEventDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
