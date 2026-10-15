'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CalendarDays,
  CircleHelp,
  FileText,
  HeartHandshake,
  LayoutDashboard,
  MessageCircle,
  Quote,
  Settings,
  Tags,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const groups = [
  {
    label: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Website content',
    items: [
      { href: '/admin/content', label: 'Page content', icon: FileText },
      { href: '/admin/services', label: 'Services', icon: HeartHandshake },
      { href: '/admin/counsellors', label: 'Counsellors', icon: Users },
      { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
      { href: '/admin/faqs', label: 'FAQs', icon: CircleHelp },
    ],
  },
  {
    label: 'Support & events',
    items: [
      { href: '/admin/support', label: 'Support packages', icon: MessageCircle },
      { href: '/admin/events', label: 'Events', icon: CalendarDays },
      { href: '/admin/event-categories', label: 'Event categories', icon: Tags },
    ],
  },
  {
    label: 'Site',
    items: [{ href: '/admin/settings', label: 'Settings', icon: Settings }],
  },
]

/** Sidebar navigation with the current section highlighted. */
export function AdminNav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Admin" className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/40">
            {group.label}
          </p>
          {group.items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive(href)
                  ? 'bg-ivory/15 font-medium text-ivory'
                  : 'text-ivory/70 hover:bg-ivory/10 hover:text-ivory',
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
