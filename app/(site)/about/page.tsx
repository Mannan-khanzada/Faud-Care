import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe, Lock, Sparkles } from 'lucide-react'
import { getPageContent } from '@/lib/content/page-content'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CtaSection } from '@/components/cta-section'
import { BreadcrumbSchema } from '@/components/seo-schema'

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent()
  return {
    title: 'About FUAD',
    description: c.text('about.hero_description'),
    alternates: { canonical: '/about' },
  }
}

export default async function AboutPage() {
  const c = await getPageContent()
  const areas = c.list('about.areas')
  const different = c.pairs('about.different')

  const pillars = [
    { icon: Globe, heading: c.text('about.online_heading'), body: c.text('about.online_body') },
    { icon: Lock, heading: c.text('about.confidential_heading'), body: c.text('about.confidential_body') },
    { icon: Sparkles, heading: c.text('about.spiritual_heading'), body: c.text('about.spiritual_body') },
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
      <PageHero
        eyebrow={c.text('about.hero_eyebrow')}
        title={c.text('about.hero_title')}
        description={c.text('about.hero_description')}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'About' }]}
      />

      {/* What FUAD is */}
      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_70px_-45px_rgba(35,55,79,0.5)]">
              <Image
                src={c.text('about.image') || '/about.png'}
                alt="Two hands gently holding a warm mug of tea in soft natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-balance text-3xl leading-tight text-navy sm:text-4xl">
                {c.text('about.what_heading')}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="whitespace-pre-line text-pretty text-lg leading-relaxed text-muted-foreground">
                {c.text('about.what_body')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why FUAD exists + approach */}
      <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <h2 className="text-balance text-2xl leading-tight text-navy sm:text-3xl">
              {c.text('about.why_heading')}
            </h2>
            <p className="whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
              {c.text('about.why_body')}
            </p>
          </Reveal>
          <Reveal delay={80} className="flex flex-col gap-5">
            <h2 className="text-balance text-2xl leading-tight text-navy sm:text-3xl">
              {c.text('about.approach_heading')}
            </h2>
            <p className="whitespace-pre-line text-pretty leading-relaxed text-muted-foreground">
              {c.text('about.approach_body')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Online · confidential · spiritual */}
      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, heading, body }, i) => (
            <Reveal key={heading} delay={i * 60}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-sage/12 text-sage">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg text-navy">{heading}</h3>
                <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Areas of support */}
      {areas.length > 0 && (
        <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="text-balance text-3xl leading-tight text-navy sm:text-4xl">
                {c.text('about.areas_heading')}
              </h2>
            </Reveal>
            <Reveal delay={80} className="mt-10 flex flex-wrap justify-center gap-3">
              {areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-card px-5 py-2 text-sm text-navy/80"
                >
                  {area}
                </span>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* How FUAD is different */}
      {different.length > 0 && (
        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title={c.text('about.different_heading')} />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {different.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-7">
                    <h3 className="text-lg text-navy">{item.title}</h3>
                    {item.body && (
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing quote */}
      <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-balance font-heading text-2xl leading-relaxed text-navy sm:text-3xl">
              &ldquo;{c.text('about.quote')}&rdquo;
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {c.text('about.quote_body')}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
