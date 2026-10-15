'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsappUrl } from '@/lib/whatsapp'
import { useSiteSettings } from './site-settings-context'

/**
 * Subtle floating WhatsApp CTA. Bottom-right on desktop; on mobile it sits
 * above the safe area and clear of primary content. Renders nothing when no
 * number is configured.
 */
export function FloatingWhatsApp() {
  const settings = useSiteSettings()
  const url = buildWhatsappUrl(settings)
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start a Conversation on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-0 rounded-full bg-sage px-4 py-4 text-ivory shadow-lg shadow-navy/20 transition-all duration-300 hover:gap-2 hover:bg-sage/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-6 shrink-0" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100">
        Start a Conversation
      </span>
    </a>
  )
}
