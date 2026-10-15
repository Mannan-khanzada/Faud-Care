import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { getPublishedEvents, formatEventDate } from '@/lib/content/events'
import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

/** Upcoming events on the homepage. Renders nothing when there are none. */
export async function EventsTeaser() {
  const [c, { events }] = await Promise.all([getPageContent(), getPublishedEvents()])
  const upcoming = events
    .filter((e) => e.status === 'upcoming')
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3)
  if (upcoming.length === 0) return null

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={c.text('home.events_eyebrow')}
            title={c.text('home.events_heading')}
            description={c.text('home.events_body')}
          />
          <Reveal delay={80}>
            <Link href="/events" className={cn(ctaVariants({ variant: 'outline', size: 'sm' }))}>
              {c.text('home.events_cta')}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 60}>
              <Link
                href={`/events#event-${e.id}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-sage/50"
              >
                {e.categoryName && (
                  <span className="w-fit rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage">
                    {e.categoryName}
                  </span>
                )}
                <h3 className="text-lg text-navy">{e.title}</h3>
                {e.date && (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 text-sage" aria-hidden="true" />
                    {formatEventDate(e.date)}
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
