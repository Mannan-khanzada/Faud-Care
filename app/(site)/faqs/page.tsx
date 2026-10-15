import type { Metadata } from 'next'
import { getPublishedFaqs } from '@/lib/content/faqs'
import { PageHero } from '@/components/page-hero'
import { FaqAccordion } from '@/components/faq-accordion'
import { EmptyState } from '@/components/empty-state'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema, FaqSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Answers to common questions about counselling with FUAD, getting started, confidentiality, and what to expect.',
  alternates: { canonical: '/faqs' },
}

export default async function FaqsPage() {
  const faqs = await getPublishedFaqs()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQs', url: '/faqs' },
        ]}
      />
      {faqs.length > 0 && <FaqSchema items={faqs} />}

      <PageHero
        eyebrow="FAQs"
        title="Questions people often ask"
        description="If something you're wondering about isn't here, you're always welcome to ask."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'FAQs' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          {faqs.length > 0 ? (
            <FaqAccordion items={faqs} />
          ) : (
            <EmptyState message="Our FAQs are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
