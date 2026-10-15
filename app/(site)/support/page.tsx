import type { Metadata } from 'next'
import { getActivePackages } from '@/lib/content/support'
import { getPageContent } from '@/lib/content/page-content'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { PackageCard } from '@/components/support/package-card'
import { EmptyState } from '@/components/empty-state'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent()
  return {
    title: 'Support — chat-based online counselling',
    description: c.text('support.hero_description'),
    alternates: { canonical: '/support' },
  }
}

export default async function SupportPage() {
  const [c, packages] = await Promise.all([getPageContent(), getActivePackages()])
  const steps = c.pairs('support.steps')
  const template = c.text('support.whatsapp_template')

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Support', url: '/support' },
        ]}
      />
      <PageHero
        eyebrow={c.text('support.hero_eyebrow')}
        title={c.text('support.hero_title')}
        description={c.text('support.hero_description')}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Support' }]}
      />

      {steps.length > 0 && (
        <section className="px-5 py-16 sm:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={c.text('support.steps_heading')} />
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 60}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                    <span className="font-heading text-sm text-sage">0{i + 1}</span>
                    <h3 className="text-lg text-navy">{step.title}</h3>
                    {step.body && (
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-secondary/40 px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={c.text('support.packages_heading')}
            description={c.text('support.packages_description')}
          />
          <div className="mt-12">
            {packages.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg, i) => (
                  <Reveal key={pkg.id} delay={(i % 3) * 60}>
                    <PackageCard pkg={pkg} messageTemplate={template} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState message={c.text('support.empty_message')} />
            )}
          </div>
          {c.text('support.disclaimer') && (
            <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-xs leading-relaxed text-muted-foreground">
              {c.text('support.disclaimer')}
            </p>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
