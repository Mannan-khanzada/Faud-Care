import { toList, toStr } from '@/lib/to-list'
import { getSupabasePublicClient } from '@/lib/supabase/server'

export type Counsellor = {
  slug: string
  name: string
  /** professional title — kept unverified until confirmed */
  title: string
  shortBio: string
  fullBio: string
  qualifications: string[]
  certifications: string[]
  experience: string
  areas: string[]
  specialties: string[]
  languages: string[]
  approach: string
  sessionFormat: string
  fee: string
  /** optional counsellor-specific Google Calendar booking URL */
  bookingUrl?: string
  /** relative path to profile photo; a placeholder is used until provided */
  photo: string
  published: boolean
}

/**
 * Real counsellor names are used. Every detail that has not been verified is
 * marked [TO BE CONFIRMED] and is fully editable from Admin in a later step.
 * No qualifications, credentials, or experience are invented.
 */
const TBC = '[TO BE CONFIRMED]'

export const counsellors: Counsellor[] = [
  {
    slug: 'kanzah-mahar',
    name: 'Kanzah Mahar',
    title: TBC,
    shortBio:
      'A counsellor at FUAD, offering a warm and non-judgmental space to be heard.',
    fullBio:
      'Kanzah is part of the FUAD counselling team. Further details about background, approach, and areas of support are being confirmed and will be added here.',
    qualifications: [TBC],
    certifications: [TBC],
    experience: TBC,
    areas: [TBC],
    specialties: [TBC],
    languages: [TBC],
    approach: TBC,
    sessionFormat: TBC,
    fee: TBC,
    photo: '/counsellor-placeholder.png',
    published: true,
  },
  {
    slug: 'adeel-hanif',
    name: 'Adeel Hanif',
    title: TBC,
    shortBio:
      'A counsellor at FUAD, providing thoughtful and respectful support.',
    fullBio:
      'Adeel is part of the FUAD counselling team. Further details about background, approach, and areas of support are being confirmed and will be added here.',
    qualifications: [TBC],
    certifications: [TBC],
    experience: TBC,
    areas: [TBC],
    specialties: [TBC],
    languages: [TBC],
    approach: TBC,
    sessionFormat: TBC,
    fee: TBC,
    photo: '/counsellor-placeholder.png',
    published: true,
  },
  {
    slug: 'maham-binte-amar',
    name: 'Maham Binte Amar',
    title: TBC,
    shortBio:
      'A counsellor at FUAD, offering a calm space for reflection and growth.',
    fullBio:
      'Maham is part of the FUAD counselling team. Further details about background, approach, and areas of support are being confirmed and will be added here.',
    qualifications: [TBC],
    certifications: [TBC],
    experience: TBC,
    areas: [TBC],
    specialties: [TBC],
    languages: [TBC],
    approach: TBC,
    sessionFormat: TBC,
    fee: TBC,
    photo: '/counsellor-placeholder.png',
    published: true,
  },
]

type CounsellorRow = {
  slug: string
  name: string
  title: string
  short_bio: string
  full_bio: string
  qualifications: string[]
  certifications: string[]
  experience: string
  areas: string[]
  specialties: string[]
  languages: string[]
  approach: string
  session_format: string
  fee: string
  booking_url: string | null
  photo: string
  published: boolean
}

function rowToCounsellor(row: CounsellorRow): Counsellor {
  return {
    slug: row.slug,
    name: row.name,
    title: toStr(row.title),
    shortBio: toStr(row.short_bio),
    fullBio: toStr(row.full_bio),
    qualifications: toList(row.qualifications),
    certifications: toList(row.certifications),
    experience: toStr(row.experience),
    areas: toList(row.areas),
    specialties: toList(row.specialties),
    languages: toList(row.languages),
    approach: toStr(row.approach),
    sessionFormat: toStr(row.session_format),
    fee: toStr(row.fee),
    bookingUrl: row.booking_url ?? undefined,
    photo: toStr(row.photo),
    published: row.published,
  }
}

/** Reads published counsellors from Supabase; falls back to the static seed list. */
export async function getPublishedCounsellors(): Promise<Counsellor[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return counsellors.filter((c) => c.published)

  const { data, error } = await supabase
    .from('counsellors')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return counsellors.filter((c) => c.published)
  return data.map(rowToCounsellor)
}

export async function getCounsellor(slug: string): Promise<Counsellor | undefined> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return counsellors.find((c) => c.slug === slug && c.published)

  const { data, error } = await supabase
    .from('counsellors')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error || !data) return counsellors.find((c) => c.slug === slug && c.published)
  return rowToCounsellor(data)
}

export const TO_BE_CONFIRMED = TBC

/**
 * Slugs only, via a cookie-free client — used by generateStaticParams() and
 * the sitemap, which run without a request (cookies() would throw there).
 */
export async function getPublishedCounsellorSlugs(): Promise<string[]> {
  const fallback = counsellors.filter((x) => x.published).map((x) => x.slug)
  const supabase = getSupabasePublicClient()
  if (!supabase) return fallback

  try {
    const { data, error } = await supabase
      .from('counsellors')
      .select('slug')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error || !data) return fallback
    return data.map((r: { slug: string }) => r.slug)
  } catch {
    return fallback
  }
}
