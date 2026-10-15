'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Clock, MapPin, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ctaVariants } from '@/components/ui/cta'

export type BrowserEvent = {
  id: string
  title: string
  categoryId: string | null
  categoryName: string
  description: string
  dateLabel: string
  time: string
  mode: 'online' | 'onsite'
  location: string
  imageUrl: string
  ctaLabel: string
  registrationUrl: string
  featured: boolean
  status: 'upcoming' | 'past'
}

export type BrowserCategory = { id: string; name: string }

type Props = {
  events: BrowserEvent[]
  categories: BrowserCategory[]
  emptyMessage: string
}

/**
 * Filterable events list. All events are rendered in the server HTML (good
 * for SEO); the tabs and category chips only show/hide them in the browser.
 */
export function EventsBrowser({ events, categories, emptyMessage }: Props) {
  const upcomingCount = events.filter((e) => e.status === 'upcoming').length
  const pastCount = events.length - upcomingCount

  const [tab, setTab] = useState<'upcoming' | 'past'>(
    upcomingCount > 0 || pastCount === 0 ? 'upcoming' : 'past',
  )
  const [categoryId, setCategoryId] = useState<string>('all')

  // Only offer categories that actually have an event in the current tab.
  const tabEvents = useMemo(() => events.filter((e) => e.status === tab), [events, tab])
  const chips = useMemo(
    () => categories.filter((c) => tabEvents.some((e) => e.categoryId === c.id)),
    [categories, tabEvents],
  )

  const activeCategory = chips.some((c) => c.id === categoryId) ? categoryId : 'all'
  const visible = tabEvents
    .filter((e) => activeCategory === 'all' || e.categoryId === activeCategory)
    .sort((a, b) => Number(b.featured) - Number(a.featured))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Event timing" className="inline-flex w-fit rounded-full border border-border bg-card p-1">
          {(
            [
              ['upcoming', `Upcoming (${upcomingCount})`],
              ['past', `Past (${pastCount})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                tab === id ? 'bg-navy text-ivory' : 'text-navy/70 hover:text-navy',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Filter by category">
            {[{ id: 'all', name: 'All' }, ...chips].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={activeCategory === c.id}
                onClick={() => setCategoryId(c.id)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm transition-colors',
                  activeCategory === c.id
                    ? 'border-sage bg-sage/15 text-navy'
                    : 'border-border bg-card text-navy/70 hover:border-sage/50 hover:text-navy',
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center text-muted-foreground">
          {events.length === 0
            ? emptyMessage
            : tab === 'upcoming'
              ? 'No upcoming events in this category right now.'
              : 'No past events in this category.'}
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((event) => (
            <li key={event.id} id={`event-${event.id}`} className={event.featured ? 'md:col-span-2' : ''}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function EventCard({ event }: { event: BrowserEvent }) {
  const isOnline = event.mode === 'online'
  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-3xl border bg-card',
        event.featured ? 'border-sage/50 md:flex-row' : 'border-border',
      )}
    >
      {event.imageUrl && (
        <div
          className={cn(
            'relative shrink-0 bg-mist',
            event.featured ? 'aspect-16/9 md:aspect-auto md:w-2/5' : 'aspect-16/9',
          )}
        >
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          {event.featured && (
            <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-ivory">Featured</span>
          )}
          {event.categoryName && (
            <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage">
              {event.categoryName}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-navy/70">
            {isOnline ? <Monitor className="size-3" aria-hidden="true" /> : <MapPin className="size-3" aria-hidden="true" />}
            {isOnline ? 'Online' : 'Onsite'}
          </span>
        </div>

        <h3 className="text-xl text-navy">{event.title}</h3>

        {(event.dateLabel || event.time || event.location) && (
          <ul className="flex flex-col gap-1.5 text-sm text-navy/75">
            {event.dateLabel && (
              <li className="flex items-center gap-2.5">
                <CalendarDays className="size-4 shrink-0 text-sage" aria-hidden="true" />
                {event.dateLabel}
              </li>
            )}
            {event.time && (
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-sage" aria-hidden="true" />
                {event.time}
              </li>
            )}
            {event.location && (
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-sage" aria-hidden="true" />
                {event.location}
              </li>
            )}
          </ul>
        )}

        {event.description && (
          <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        )}

        {event.registrationUrl && (
          <div className="mt-auto pt-2">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(ctaVariants({ variant: event.status === 'upcoming' ? 'primary' : 'outline', size: 'sm' }))}
            >
              {event.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
