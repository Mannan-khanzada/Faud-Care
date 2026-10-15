import type { Metadata } from 'next'
import { getPublishedEvents, formatEventDate } from '@/lib/content/events'
import { getPageContent } from '@/lib/content/page-content'
import { siteConfig } from '@/lib/site-config'
import { PageHero } from '@/components/page-hero'
import { EventsBrowser } from '@/components/events/events-browser'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent()
  return {
    title: 'Events — webinars, discussions & awareness sessions',
    description: c.text('events.hero_description'),
    alternates: { canonical: '/events' },
  }
}

export default async function EventsPage() {
  const [c, { events, categories }] = await Promise.all([getPageContent(), getPublishedEvents()])

  // Plain, serialisable data for the client-side filter component.
  const browserEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    categoryId: e.categoryId,
    categoryName: e.categoryName,
    description: e.description,
    dateLabel: formatEventDate(e.date),
    time: e.time,
    mode: e.mode,
    location: e.location,
    imageUrl: e.imageUrl,
    ctaLabel: e.ctaLabel,
    registrationUrl: e.registrationUrl,
    featured: e.featured,
    status: e.status,
  }))

  // schema.org Event data helps Google show upcoming events in search.
  const eventSchema = events
    .filter((e) => e.status === 'upcoming' && e.date)
    .map((e) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.title,
      description: e.description || undefined,
      startDate: e.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode:
        e.mode === 'online'
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
      location:
        e.mode === 'online'
          ? { '@type': 'VirtualLocation', url: `${siteConfig.url}/events` }
          : { '@type': 'Place', name: e.location || 'To be announced', address: e.location || 'To be announced' },
      image: e.imageUrl || undefined,
      organizer: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
      url: `${siteConfig.url}/events#event-${e.id}`,
    }))

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Events', url: '/events' },
        ]}
      />
      {eventSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c') }}
        />
      )}
      <PageHero
        eyebrow={c.text('events.hero_eyebrow')}
        title={c.text('events.hero_title')}
        description={c.text('events.hero_description')}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Events' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <EventsBrowser
            events={browserEvents}
            categories={categories.map((cat) => ({ id: cat.id, name: cat.name }))}
            emptyMessage={c.text('events.empty_message')}
          />
        </div>
      </section>

      <CtaSection />
    </>
  )
}
