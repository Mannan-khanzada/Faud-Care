import type { Metadata } from 'next'
import { getPublishedCounsellors } from '@/lib/content/counsellors'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CounsellorList } from '@/components/counsellor-list'
import { getPageContent } from '@/lib/content/page-content'
import { EmptyState } from '@/components/empty-state'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export const metadata: Metadata = {
  title: 'Counsellors',
  description:
    'Meet the FUAD counselling team. Get to know each counsellor before you reach out.',
  alternates: { canonical: '/counsellors' },
}

export default async function CounsellorsPage() {
  const [counsellors, c] = await Promise.all([getPublishedCounsellors(), getPageContent()])

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Counsellors', url: '/counsellors' },
        ]}
      />
      <PageHero
        eyebrow={c.text('counsellors.eyebrow')}
        title={c.text('counsellors.title')}
        description={c.text('counsellors.description')}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Counsellors' }]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          {counsellors.length > 0 ? (
            <Reveal>
              <CounsellorList counsellors={counsellors} />
            </Reveal>
          ) : (
            <EmptyState message="Our counsellor profiles are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
