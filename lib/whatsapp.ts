import type { SiteSettings } from './site-config'

export const whatsappMessages = {
  default:
    "Hi FUAD, I'd like to learn more about counselling and available sessions.",
  service: (serviceName: string) =>
    `Hi FUAD, I'm interested in ${serviceName} and would like to learn more about the sessions.`,
  counsellor: (counsellorName: string) =>
    `Hi FUAD, I'd like to learn more about counselling with ${counsellorName}.`,
}

/**
 * Builds a correctly encoded wa.me link from live site settings. Returns
 * null when no number is configured so callers can fall back gracefully
 * instead of rendering a broken link.
 */
export function buildWhatsappUrl(settings: SiteSettings, message?: string): string | null {
  const number = settings.whatsapp.number.replace(/\D/g, '')
  if (!number) return null
  const text = encodeURIComponent(message ?? whatsappMessages.default)
  return `https://wa.me/${number}?text=${text}`
}
