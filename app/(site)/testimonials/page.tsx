import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Experiences shared by FUAD clients who chose to take the first step towards counselling support.',
  alternates: { canonical: '/testimonials' },
}

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Testimonials', url: '/testimonials' },
        ]}
      />
      <PageHero
        eyebrow="Testimonials"
        title="A Safe Space to Be Heard"
        description="Everyone's journey is different. Here are some experiences shared by clients who chose to take the first step."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Testimonials' }]}
      />

      <TestimonialsSection />

      <CtaSection />
    </>
  )
}
