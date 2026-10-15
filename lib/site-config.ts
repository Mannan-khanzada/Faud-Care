/**
 * Central site configuration — client-safe (no server-only imports), so
 * Client Components (site-header, site-footer, booking/whatsapp buttons)
 * can import it directly.
 *
 * `siteConfig` is the static fallback used until Supabase is configured, or
 * if a request to `site_settings` fails for any reason — the public site
 * must never break because of a settings read. The live, admin-editable
 * values come from `getSiteSettings()` in lib/site-settings.server.ts
 * (Server Components only) and flow down via SiteSettingsProvider.
 */

export type SiteSettings = {
  name: string
  domain: string
  url: string
  tagline: string
  description: string
  booking: {
    enabled: boolean
    globalUrl: string
    buttonLabel: string
  }
  whatsapp: {
    number: string
    displayNumber: string
  }
  contact: {
    email: string
    location: string
    hours: string
  }
  social: {
    instagram: string
    facebook: string
    linkedin: string
  }
}

export const siteConfig: SiteSettings = {
  name: 'FUAD',
  domain: 'FUAD.care',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://fuad.care').replace(/\/$/, ''),
  tagline: 'Online counselling with a spiritual foundation.',
  description:
    'FUAD offers accessible, confidential, and compassionate online counselling with a spiritual foundation, supporting emotional wellbeing, relationships, and personal growth.',

  // Booking (Google Calendar). Empty string means "not configured yet".
  booking: {
    enabled: true,
    globalUrl: '',
    buttonLabel: 'Book a Session',
  },

  // WhatsApp — main secondary conversion channel.
  whatsapp: {
    number: '923155553823',
    displayNumber: '+92 315 555 3823',
  },

  contact: {
    email: 'hello@fuad.care',
    location: '', // e.g. 'Lahore, Pakistan' — leave empty to hide
    hours: '', // e.g. 'Mon–Sat, 10am–8pm' — leave empty to hide
  },

  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
}

export const mainNav = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Support', href: '/support' },
  { label: 'Events', href: '/events' },
  { label: 'Counsellors', href: '/counsellors' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQs', href: '/faqs' },
] as const

export const footerNav = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Support', href: '/support' },
  { label: 'Events', href: '/events' },
  { label: 'Counsellors', href: '/counsellors' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
] as const
