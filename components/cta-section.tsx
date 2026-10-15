import { Reveal } from './reveal'
import { getPageContent } from '@/lib/content/page-content'
import { BookingButton } from './booking-button'
import { WhatsAppButton } from './whatsapp-button'

type CtaSectionProps = {
  heading?: string
  supporting?: string
  /** message prefilled if booking falls back to WhatsApp */
  fallbackMessage?: string
  /** WhatsApp secondary message */
  whatsappMessage?: string
}

/**
 * The shared final call-to-action used across major pages. Booking goes to
 * Google Calendar; the secondary action starts a WhatsApp conversation.
 */
export async function CtaSection({
  heading,
  supporting,
  fallbackMessage,
  whatsappMessage,
}: CtaSectionProps) {
  const c = await getPageContent()
  heading = heading ?? c.text('cta.heading')
  supporting = supporting ?? c.text('cta.supporting')
  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center sm:px-14 sm:py-20">
          {/* quiet organic accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sage/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-teal/20 blur-2xl"
          />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="max-w-2xl text-balance text-3xl leading-tight text-ivory sm:text-4xl">
              {heading}
            </h2>
            <p className="max-w-md text-pretty leading-relaxed text-ivory/70">
              {supporting}
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
              <BookingButton
                variant="primary"
                size="lg"
                hideFallbackNote
                fallbackMessage={fallbackMessage}
              />
              <WhatsAppButton
                variant="outlineLight"
                size="lg"
                message={whatsappMessage}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
