import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { ServicesSection } from '@/components/home/services-section'
import { ApproachSection } from '@/components/home/approach-section'
import { WhySection } from '@/components/home/why-section'
import { CounsellorsSection } from '@/components/home/counsellors-section'
import { SupportTeaser } from '@/components/home/support-teaser'
import { EventsTeaser } from '@/components/home/events-teaser'
import { FaqsPreview } from '@/components/home/faqs-preview'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CtaSection } from '@/components/cta-section'
import { WebsiteSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  // `absolute` so the home page is "FUAD — <tagline>" without the "%s — FUAD" template.
  title: { absolute: `${siteConfig.name} — Online counselling with a spiritual foundation` },
  description: siteConfig.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <WebsiteSchema />
      <Hero />
      <Intro />
      <ServicesSection />
      <SupportTeaser />
      <ApproachSection />
      <WhySection />
      <EventsTeaser />
      <CounsellorsSection />
      {/* Testimonials take the place a pricing section would have had.
          Renders nothing until a real testimonial is published from /admin. */}
      <TestimonialsSection />
      <FaqsPreview />
      <CtaSection />
    </>
  )
}
