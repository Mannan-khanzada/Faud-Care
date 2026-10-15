'use client'

import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'
import { footerNav } from '@/lib/site-config'
import { buildWhatsappUrl } from '@/lib/whatsapp'
import { useSiteSettings } from './site-settings-context'
import { LogoMark } from './logo'
import { SocialIcon } from './social-icon'

export function SiteFooter() {
  const settings = useSiteSettings()
  const whatsappUrl = buildWhatsappUrl(settings)
  const year = new Date().getFullYear()

  const socials = [
    { href: settings.social.instagram, label: 'Instagram', platform: 'instagram' as const },
    { href: settings.social.facebook, label: 'Facebook', platform: 'facebook' as const },
    { href: settings.social.linkedin, label: 'LinkedIn', platform: 'linkedin' as const },
  ].filter((s) => s.href)

  return (
    <footer className="border-t border-border bg-navy text-ivory">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="flex flex-col gap-5">
          <LogoMark height={24} tone="ivory" />
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-ivory/70">
            {settings.tagline}
          </p>
          <div className="flex items-center gap-3 pt-1">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start a Conversation on WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory/50 hover:text-ivory"
              >
                <MessageCircle className="size-4" />
              </a>
            )}
            <a
              href={`mailto:${settings.contact.email}`}
              aria-label="Email FUAD"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory/50 hover:text-ivory"
            >
              <Mail className="size-4" />
            </a>
            {socials.map(({ href, label, platform }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory/50 hover:text-ivory"
              >
                <SocialIcon platform={platform} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ivory/50">
            Explore
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ivory/50">
            Get in touch
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-ivory/75">
            <li>
              <a
                href={`mailto:${settings.contact.email}`}
                className="transition-colors hover:text-ivory"
              >
                {settings.contact.email}
              </a>
            </li>
            {whatsappUrl && (
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ivory"
                >
                  WhatsApp {settings.whatsapp.displayNumber}
                </a>
              </li>
            )}
            {settings.contact.location && <li>{settings.contact.location}</li>}
            {settings.contact.hours && <li>{settings.contact.hours}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; {year} {settings.name}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
