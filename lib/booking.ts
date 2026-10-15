import type { SiteSettings } from './site-config'

export type BookingResolution =
  | { kind: 'calendar'; url: string; label: string }
  | { kind: 'unavailable'; message: string }

const UNAVAILABLE_MESSAGE =
  'Booking is currently being updated. Please contact FUAD through WhatsApp.'

/**
 * Resolves the correct booking action following the required priority:
 *   1. Counsellor-specific Google Calendar URL
 *   2. Global FUAD Google Calendar URL (from live site settings)
 *   3. Unavailable (caller shows WhatsApp fallback)
 *
 * A booking that is disabled or has no valid URL never renders a broken button.
 */
export function resolveBooking(
  settings: SiteSettings,
  counsellorUrl?: string,
): BookingResolution {
  const label = settings.booking.buttonLabel || 'Book a Session'

  if (!settings.booking.enabled) {
    return { kind: 'unavailable', message: UNAVAILABLE_MESSAGE }
  }

  const candidate = (counsellorUrl || settings.booking.globalUrl || '').trim()

  if (candidate && isValidUrl(candidate)) {
    return { kind: 'calendar', url: candidate, label }
  }

  return { kind: 'unavailable', message: UNAVAILABLE_MESSAGE }
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}
