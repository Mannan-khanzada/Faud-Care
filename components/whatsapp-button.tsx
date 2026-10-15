'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWhatsappUrl } from '@/lib/whatsapp'
import { useSiteSettings } from './site-settings-context'
import { ctaVariants, type CtaVariantProps } from './ui/cta'

type WhatsAppButtonProps = CtaVariantProps & {
  /** the message to prefill; defaults to the standard enquiry */
  message?: string
  label?: string
  className?: string
  showIcon?: boolean
}

/**
 * Reusable WhatsApp CTA. Renders nothing when no number is configured so a
 * broken link is never shown.
 */
export function WhatsAppButton({
  message,
  label = 'Start a Conversation',
  variant = 'outline',
  size,
  className,
  showIcon = true,
}: WhatsAppButtonProps) {
  const settings = useSiteSettings()
  const url = buildWhatsappUrl(settings, message)
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens WhatsApp)`}
      className={cn(ctaVariants({ variant, size }), className)}
    >
      {showIcon && <MessageCircle className="size-4" aria-hidden="true" />}
      {label}
    </a>
  )
}
