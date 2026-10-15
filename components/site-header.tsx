'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNav } from '@/lib/site-config'
import { LogoLink } from './logo'
import { BookingButton } from './booking-button'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation and lock scroll while open.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-border/70 bg-ivory/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <LogoLink height={20} priority />

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium tracking-wide transition-colors',
                  active ? 'text-navy' : 'text-navy/65 hover:text-navy',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-sage" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <BookingButton size="sm" hideFallbackNote />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex size-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-18 z-40 origin-top border-b border-border bg-ivory transition-all duration-300 lg:hidden',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 sm:px-8"
        >
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-3 text-lg font-medium transition-colors',
                  active
                    ? 'bg-navy/5 text-navy'
                    : 'text-navy/70 hover:bg-navy/5 hover:text-navy',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="mt-4">
            <BookingButton className="w-full" hideFallbackNote />
          </div>
        </nav>
      </div>
    </header>
  )
}
