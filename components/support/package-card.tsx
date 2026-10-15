import { Check, Clock, MessageCircle } from 'lucide-react'
import type { SupportPackage } from '@/lib/content/support'
import { packageMessage } from '@/lib/content/support'
import { WhatsAppButton } from '@/components/whatsapp-button'

/**
 * One support package. The WhatsApp message is built from the admin-editable
 * template with this package's name inserted, so no per-package link is needed.
 */
export function PackageCard({
  pkg,
  messageTemplate,
}: {
  pkg: SupportPackage
  messageTemplate: string
}) {
  const hasPrice = pkg.price.trim() !== ''

  return (
    <article className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-7 transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_rgba(35,55,79,0.35)] sm:p-8">
      <header className="flex flex-col gap-3">
        <h3 className="text-2xl text-navy">{pkg.name}</h3>
        {pkg.shortDescription && (
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {pkg.shortDescription}
          </p>
        )}
      </header>

      {hasPrice && (
        <p className="font-heading text-2xl text-navy">{pkg.price}</p>
      )}

      {(pkg.duration || pkg.sessions) && (
        <ul className="flex flex-col gap-2 text-sm text-navy/80">
          {pkg.duration && (
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-sage" aria-hidden="true" />
              <span>
                <span className="text-muted-foreground">Duration: </span>
                {pkg.duration}
              </span>
            </li>
          )}
          {pkg.sessions && (
            <li className="flex items-center gap-2.5">
              <MessageCircle className="size-4 shrink-0 text-sage" aria-hidden="true" />
              <span>
                <span className="text-muted-foreground">Support: </span>
                {pkg.sessions}
              </span>
            </li>
          )}
        </ul>
      )}

      {pkg.features.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-navy/80">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {pkg.fullDescription && (
        <details className="group text-sm text-muted-foreground">
          <summary className="cursor-pointer select-none font-medium text-sage transition-colors hover:text-navy">
            More details
          </summary>
          <p className="mt-3 whitespace-pre-line text-pretty leading-relaxed">
            {pkg.fullDescription}
          </p>
        </details>
      )}

      <div className="mt-auto pt-2">
        <WhatsAppButton
          variant="primary"
          size="md"
          label={pkg.ctaLabel}
          message={packageMessage(messageTemplate, pkg.name)}
          className="w-full"
        />
      </div>
    </article>
  )
}
