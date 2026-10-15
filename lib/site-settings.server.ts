import { getSupabasePublicClient } from '@/lib/supabase/server'
import { siteConfig, type SiteSettings } from './site-config'

/**
 * Server-only. Reads live settings from Supabase (edited at /admin/settings);
 * falls back to the static defaults in site-config.ts if Supabase isn't
 * configured or the read fails. Never import this from a Client Component —
 * it pulls in next/headers via lib/supabase/server.
 */

type SiteSettingsRow = {
  name: string
  domain: string
  url: string
  tagline: string
  description: string
  booking_enabled: boolean
  booking_global_url: string
  booking_button_label: string
  whatsapp_number: string
  whatsapp_display_number: string
  contact_email: string
  contact_location: string
  contact_hours: string
  social_instagram: string
  social_facebook: string
  social_linkedin: string
}

function rowToSettings(row: SiteSettingsRow): SiteSettings {
  return {
    name: row.name,
    domain: row.domain,
    url: row.url,
    tagline: row.tagline,
    description: row.description,
    booking: {
      enabled: row.booking_enabled,
      globalUrl: row.booking_global_url,
      buttonLabel: row.booking_button_label,
    },
    whatsapp: {
      number: row.whatsapp_number,
      displayNumber: row.whatsapp_display_number,
    },
    contact: {
      email: row.contact_email,
      location: row.contact_location,
      hours: row.contact_hours,
    },
    social: {
      instagram: row.social_instagram,
      facebook: row.social_facebook,
      linkedin: row.social_linkedin,
    },
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return siteConfig

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', true)
    .maybeSingle()

  if (error || !data) return siteConfig
  return rowToSettings(data as SiteSettingsRow)
}
