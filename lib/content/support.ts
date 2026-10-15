import { getSupabasePublicClient } from '@/lib/supabase/server'
import { toList, toStr } from '@/lib/to-list'

export type SupportPackage = {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  duration: string
  sessions: string
  features: string[]
  price: string
  ctaLabel: string
  active: boolean
  sortOrder: number
}

export const DEFAULT_PACKAGE_CTA = 'WhatsApp Chat / Book This Package'

/** Placeholder packages shown until real ones exist in the database. Editable from /admin/support. */
const fallbackPackages: SupportPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    shortDescription: 'A gentle starting point for chat-based support.',
    fullDescription: 'Placeholder content — final package details are still being confirmed.',
    duration: '1 week',
    sessions: 'Chat support during the week',
    features: ['Chat-based counselling support', 'Confidential and compassionate', 'Spiritually grounded approach'],
    price: 'Price to be confirmed',
    ctaLabel: DEFAULT_PACKAGE_CTA,
    active: true,
    sortOrder: 10,
  },
  {
    id: 'standard',
    name: 'Standard',
    shortDescription: 'Steady, ongoing chat support over a few weeks.',
    fullDescription: 'Placeholder content — final package details are still being confirmed.',
    duration: '2 weeks',
    sessions: 'Chat support during the period',
    features: ['Everything in Basic', 'Longer period of support', 'Space to explore patterns and relationships'],
    price: 'Price to be confirmed',
    ctaLabel: DEFAULT_PACKAGE_CTA,
    active: true,
    sortOrder: 20,
  },
  {
    id: 'premium',
    name: 'Premium',
    shortDescription: 'Extended chat support with the most time and care.',
    fullDescription: 'Placeholder content — final package details are still being confirmed.',
    duration: '4 weeks',
    sessions: 'Chat support during the period',
    features: ['Everything in Standard', 'Extended period of support', 'Priority replies during support hours'],
    price: 'Price to be confirmed',
    ctaLabel: DEFAULT_PACKAGE_CTA,
    active: true,
    sortOrder: 30,
  },
]

type Row = Record<string, unknown>

export function rowToPackage(row: Row): SupportPackage {
  return {
    id: toStr(row.id),
    name: toStr(row.name),
    shortDescription: toStr(row.short_description),
    fullDescription: toStr(row.full_description),
    duration: toStr(row.duration),
    sessions: toStr(row.sessions),
    features: toList(row.features),
    price: toStr(row.price),
    ctaLabel: toStr(row.cta_label) || DEFAULT_PACKAGE_CTA,
    active: row.active !== false,
    sortOrder: Number(row.sort_order ?? 0),
  }
}

/** Active packages in display order. Falls back to placeholders if Supabase is unavailable. */
export async function getActivePackages(): Promise<SupportPackage[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return fallbackPackages

  const { data, error } = await supabase
    .from('support_packages')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return fallbackPackages
  return (data as Row[]).map(rowToPackage)
}

/** Builds the pre-filled WhatsApp message for a package (name is inserted dynamically). */
export function packageMessage(template: string, packageName: string): string {
  const name = packageName.replace(/\s*package\s*$/i, '').trim() || packageName
  return template.replace(/\{package\}/gi, name)
}
