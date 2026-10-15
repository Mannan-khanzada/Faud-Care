import type { Metadata } from 'next'
import { getPublishedServices } from '@/lib/content/services'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { ServiceCard } from '@/components/service-card'
import { EmptyState } from '@/components/empty-state'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Thoughtful counselling across individual, relationship, anxiety, trauma, parenting, work pressure and personal growth support.',
  alternates: { canonical: '/services' },
}

export default async function ServicesPage() {
  const services = await getPublishedServices()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Support for what you're carrying"
        description="Explore the areas where counselling with FUAD may help. Every service is a starting point for a conversation — not a fixed path."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          {services.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={service.slug} delay={(i % 3) * 60}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState message="Our services are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
