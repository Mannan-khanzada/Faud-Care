'use client'

import { CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveBooking } from '@/lib/booking'
import { useSiteSettings } from './site-settings-context'
import { WhatsAppButton } from './whatsapp-button'
import { ctaVariants, type CtaVariantProps } from './ui/cta'

type BookingButtonProps = CtaVariantProps & {
  /** counsellor-specific Google Calendar URL, if any */
  counsellorUrl?: string
  /** overrides the default resolved label */
  label?: string
  className?: string
  showIcon?: boolean
  /** message used if the booking falls back to WhatsApp */
  fallbackMessage?: string
  /** hide the "being updated" note under the fallback */
  hideFallbackNote?: boolean
}

/**
 * The single reusable booking entry point. Resolves the correct destination
 * following the priority: counsellor URL -> global URL -> WhatsApp fallback.
 * Never renders a broken button.
 */
export function BookingButton({
  counsellorUrl,
  label,
  variant = 'primary',
  size,
  className,
  showIcon = true,
  fallbackMessage,
  hideFallbackNote = false,
}: BookingButtonProps) {
  const settings = useSiteSettings()
  const resolution = resolveBooking(settings, counsellorUrl)

  if (resolution.kind === 'calendar') {
    return (
      <a
        href={resolution.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(ctaVariants({ variant, size }), className)}
      >
        {showIcon && <CalendarCheck className="size-4" aria-hidden="true" />}
        {label ?? resolution.label}
      </a>
    )
  }

  // Fallback: no valid booking URL — offer WhatsApp instead of a broken link.
  return (
    <div className="flex flex-col items-start gap-2">
      <WhatsAppButton
        variant={variant === 'primary' ? 'primary' : variant}
        size={size}
        className={className}
        message={fallbackMessage}
        label="Start a Conversation"
      />
      {!hideFallbackNote && (
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          {resolution.message}
        </p>
      )}
    </div>
  )
}
