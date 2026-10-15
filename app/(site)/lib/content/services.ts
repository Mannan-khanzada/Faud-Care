import { toList } from '@/lib/to-list'
import { getSupabasePublicClient } from '@/lib/supabase/server'

export type Service = {
  slug: string
  title: string
  /** short one-line summary for cards */
  summary: string
  /** longer intro paragraph on the detail page */
  intro: string
  supports: string[]
  concerns: string[]
  involves: string[]
  expect: string[]
  /** slugs of related services */
  related: string[]
  /** slugs of relevant counsellors */
  counsellors: string[]
  /** optional service-specific Google Calendar booking URL */
  bookingUrl?: string
  /** optional image shown on the service page (set in the admin panel) */
  imageUrl?: string
  /** optional custom text for the WhatsApp button (set in the admin panel) */
  ctaLabel?: string
  published: boolean
}

/**
 * Initial content possibilities. All fields are CMS-editable in a later step.
 * No outcomes are guaranteed and no unverifiable claims are made.
 */
export const services: Service[] = [
  {
    slug: 'individual-counselling',
    title: 'Individual Counselling',
    summary:
      'One-to-one support to slow down, make sense of what you are feeling, and explore what comes next.',
    intro:
      'Individual counselling offers a private space to talk openly about what is on your mind. Together with a counsellor, you can explore your thoughts and feelings, notice patterns, and consider gentle, realistic steps forward — at a pace that feels right for you.',
    supports: [
      'Anyone feeling overwhelmed, stuck, or unsure where to begin',
      'People navigating a difficult period or life transition',
      'Those who simply want a space to reflect and be heard',
    ],
    concerns: [
      'Low mood or persistent worry',
      'Feeling disconnected or unmotivated',
      'Difficulty coping with change',
      'Questions about identity, purpose, or direction',
    ],
    involves: [
      'An initial conversation to understand what brings you here',
      'A collaborative, non-judgmental space to explore your experience',
      'Gentle reflection on thoughts, feelings, and patterns',
    ],
    expect: [
      'To be listened to with care and without judgment',
      'To move at a pace that feels comfortable',
      'To take an active role in your own growth',
    ],
    related: ['anxiety-and-stress', 'personal-growth', 'trauma-support'],
    counsellors: ['kanzah-mahar', 'adeel-hanif', 'maham-binte-amar'],
    published: true,
  },
  {
    slug: 'marriage-counselling',
    title: 'Marriage Counselling',
    summary:
      'A supportive space for couples to understand each other more clearly and communicate with care.',
    intro:
      'Marriage counselling provides a space where both partners can speak honestly and feel heard. It can help you understand recurring patterns, ease difficult conversations, and explore healthier ways of relating to one another.',
    supports: [
      'Couples wanting to communicate more openly',
      'Partners navigating tension or distance',
      'Those working through a significant change together',
    ],
    concerns: [
      'Recurring conflict or misunderstandings',
      'Feeling unheard or disconnected',
      'Adjusting to new responsibilities or life stages',
    ],
    involves: [
      'A shared space where both perspectives matter',
      'Support in understanding patterns of communication',
      'Exploring ways to reconnect and move forward',
    ],
    expect: [
      'A balanced, respectful environment for both partners',
      'No taking of sides',
      'A focus on understanding rather than blame',
    ],
    related: ['relationship-counselling', 'individual-counselling'],
    counsellors: ['adeel-hanif', 'kanzah-mahar'],
    published: true,
  },
  {
    slug: 'relationship-counselling',
    title: 'Relationship Counselling',
    summary:
      'Support for the relationships that matter to you — family, partners, and close connections.',
    intro:
      'Our relationships shape much of how we feel day to day. Relationship counselling offers space to explore the connections that matter to you, understand what feels difficult, and consider how you would like things to be.',
    supports: [
      'Anyone finding a relationship difficult to navigate',
      'People wanting to understand their own patterns',
      'Those adjusting to changing family dynamics',
    ],
    concerns: [
      'Difficulty setting or holding boundaries',
      'Feeling misunderstood by those close to you',
      'Navigating family expectations',
    ],
    involves: [
      'Exploring the relationships and roles in your life',
      'Understanding communication and expectations',
      'Considering healthier, sustainable responses',
    ],
    expect: [
      'A space to speak honestly about what feels hard',
      'Reflection without judgment',
      'A pace that respects your comfort',
    ],
    related: ['marriage-counselling', 'individual-counselling', 'parenting-support'],
    counsellors: ['kanzah-mahar', 'maham-binte-amar'],
    published: true,
  },
  {
    slug: 'anxiety-and-stress',
    title: 'Anxiety & Stress',
    summary:
      'A calm space to understand anxiety and stress and explore ways to respond to them.',
    intro:
      'Anxiety and stress can affect how we think, feel, and move through daily life. Counselling can help you understand what you are experiencing, notice what tends to trigger it, and explore gentle ways of responding.',
    supports: [
      'People feeling persistently worried or on edge',
      'Those experiencing pressure that feels hard to carry',
      'Anyone wanting to understand their stress responses',
    ],
    concerns: [
      'Racing thoughts or difficulty switching off',
      'Feeling overwhelmed by daily demands',
      'Physical tension linked to stress',
    ],
    involves: [
      'Understanding your experience of anxiety or stress',
      'Noticing patterns and triggers',
      'Exploring healthier responses over time',
    ],
    expect: [
      'A calm, unhurried space',
      'No pressure to have the right words',
      'Support tailored to your experience',
    ],
    related: ['individual-counselling', 'work-pressure', 'trauma-support'],
    counsellors: ['maham-binte-amar', 'kanzah-mahar'],
    published: true,
  },
  {
    slug: 'trauma-support',
    title: 'Trauma Support',
    summary:
      'Careful, paced support for those working through difficult past experiences.',
    intro:
      'Difficult experiences can stay with us in ways that are not always easy to put into words. Trauma support offers a careful, paced space to be heard and supported, with respect for your comfort and your sense of safety throughout.',
    supports: [
      'People carrying the weight of past experiences',
      'Those who feel affected by something difficult',
      'Anyone wanting a safe, paced space to talk',
    ],
    concerns: [
      'Feeling affected by past events',
      'Difficulty feeling settled or safe',
      'Wanting support at a careful pace',
    ],
    involves: [
      'A gentle, paced approach led by your comfort',
      'A focus on safety and trust',
      'Space to be heard without pressure',
    ],
    expect: [
      'Respect for your pace and boundaries',
      'A steady, supportive presence',
      'No pressure to share more than you wish',
    ],
    related: ['individual-counselling', 'anxiety-and-stress'],
    counsellors: ['kanzah-mahar', 'adeel-hanif'],
    published: true,
  },
  {
    slug: 'parenting-support',
    title: 'Parenting Support',
    summary:
      'Thoughtful support for the questions and pressures that come with parenting.',
    intro:
      'Parenting brings meaning and joy, and it can also bring pressure, doubt, and exhaustion. Parenting support offers a space to reflect on the challenges you are facing and explore approaches that feel right for you and your family.',
    supports: [
      'Parents feeling stretched or unsure',
      'Those navigating a difficult stage with a child',
      'Anyone wanting space to reflect on parenting',
    ],
    concerns: [
      'Feeling overwhelmed by responsibilities',
      'Navigating difficult behaviour or transitions',
      'Balancing parenting with everything else',
    ],
    involves: [
      'Space to talk through what feels difficult',
      'Reflection on patterns and pressures',
      'Exploring approaches that suit your family',
    ],
    expect: [
      'A non-judgmental space',
      'Respect for your values and circumstances',
      'Support rather than instruction',
    ],
    related: ['relationship-counselling', 'individual-counselling'],
    counsellors: ['maham-binte-amar', 'kanzah-mahar'],
    published: true,
  },
  {
    slug: 'work-pressure',
    title: 'Work Pressure',
    summary:
      'Support for navigating stress, burnout, and the demands of working life.',
    intro:
      'Work can be a source of purpose and also a source of significant pressure. Counselling can offer space to understand how work is affecting you, explore what feels unsustainable, and consider healthier ways of coping.',
    supports: [
      'People feeling burnt out or overextended',
      'Those struggling with work-life balance',
      'Anyone carrying ongoing pressure from work',
    ],
    concerns: [
      'Exhaustion or difficulty switching off',
      'Pressure that feels hard to sustain',
      'Difficulty setting boundaries at work',
    ],
    involves: [
      'Understanding how work is affecting you',
      'Exploring boundaries and expectations',
      'Considering healthier, sustainable responses',
    ],
    expect: [
      'A space that takes your pressures seriously',
      'No judgment about how you are coping',
      'Support tailored to your situation',
    ],
    related: ['anxiety-and-stress', 'personal-growth', 'individual-counselling'],
    counsellors: ['adeel-hanif', 'maham-binte-amar'],
    published: true,
  },
  {
    slug: 'personal-growth',
    title: 'Personal Growth / Mentorship',
    summary:
      'A reflective space for those who want to understand themselves and grow with intention.',
    intro:
      'Personal growth is not only for difficult times. This space is for anyone who wants to understand themselves more deeply, reflect on where they are, and move towards where they would like to be — with support and intention.',
    supports: [
      'People wanting to understand themselves better',
      'Those reflecting on direction and purpose',
      'Anyone seeking growth with support',
    ],
    concerns: [
      'A sense of feeling stuck or uncertain',
      'Wanting clarity on values and direction',
      'A desire to grow with intention',
    ],
    involves: [
      'Reflective conversation about your goals',
      'Exploring values, patterns, and direction',
      'Considering meaningful, realistic steps',
    ],
    expect: [
      'A collaborative, forward-looking space',
      'Respect for your own pace and choices',
      'Support in taking an active role in your growth',
    ],
    related: ['individual-counselling', 'work-pressure'],
    counsellors: ['adeel-hanif', 'kanzah-mahar', 'maham-binte-amar'],
    published: true,
  },
]

type ServiceRow = {
  slug: string
  title: string
  summary: string
  intro: string
  supports: string[]
  concerns: string[]
  involves: string[]
  expect: string[]
  related: string[]
  counsellors: string[]
  booking_url: string | null
  image_url?: string | null
  cta_label?: string | null
  published: boolean
}

function rowToService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    intro: row.intro,
    supports: toList(row.supports),
    concerns: toList(row.concerns),
    involves: toList(row.involves),
    expect: toList(row.expect),
    related: toList(row.related),
    counsellors: toList(row.counsellors),
    bookingUrl: row.booking_url ?? undefined,
    imageUrl: row.image_url || undefined,
    ctaLabel: row.cta_label || undefined,
    published: row.published,
  }
}

/** Reads published services from Supabase; falls back to the static seed list. */
export async function getPublishedServices(): Promise<Service[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return services.filter((s) => s.published)

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return services.filter((s) => s.published)
  return data.map(rowToService)
}

export async function getService(slug: string): Promise<Service | undefined> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return services.find((s) => s.slug === slug && s.published)

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error || !data) return services.find((s) => s.slug === slug && s.published)
  return rowToService(data)
}

/**
 * Slugs only, via a cookie-free client — used by generateStaticParams() and
 * the sitemap, which run without a request (cookies() would throw there).
 */
export async function getPublishedServiceSlugs(): Promise<string[]> {
  const fallback = services.filter((x) => x.published).map((x) => x.slug)
  const supabase = getSupabasePublicClient()
  if (!supabase) return fallback

  try {
    const { data, error } = await supabase
      .from('services')
      .select('slug')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error || !data) return fallback
    return data.map((r: { slug: string }) => r.slug)
  } catch {
    return fallback
  }
}
