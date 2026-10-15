import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { SignOutButton } from './sign-out-button'
import { AdminFlash } from './flash'
import { AdminNav } from './admin-nav'

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail?: string
}) {
  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col md:flex-row">
        <aside className="flex shrink-0 flex-col gap-7 bg-navy px-5 py-6 text-ivory md:sticky md:top-0 md:h-dvh md:w-64 md:overflow-y-auto">
          <Link href="/admin" className="inline-flex items-center gap-3 px-1">
            <LogoMark height={20} tone="ivory" />
            <span className="rounded-full bg-ivory/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/70">
              Admin
            </span>
          </Link>

          <AdminNav />

          <div className="mt-auto flex flex-col gap-3 border-t border-ivory/10 pt-5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              View website
            </Link>
            {userEmail && <p className="truncate px-3 text-xs text-ivory/45">{userEmail}</p>}
            <SignOutButton />
          </div>
        </aside>

        <main id="admin-main" className="min-w-0 flex-1 bg-secondary/25 px-5 py-8 sm:px-8 md:py-10">
          <div className="mx-auto max-w-5xl">
            <AdminFlash />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
