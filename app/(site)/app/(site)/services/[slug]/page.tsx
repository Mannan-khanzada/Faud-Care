import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import {
  getPublishedServices,
  getPublishedServiceSlugs,
  getService,
  type Service,
} from '@/lib/content/services'
import { getCounsellor } from '@/lib/content/counsellors'
import { getPublishedFaqs } from '@/lib/content/faqs'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { CounsellorCard } from '@/components/counsellor-card'
import { FaqAccordion } from '@/components/faq-accordion'
import Image from 'next/image'
import { BookingButton } from '@/components/booking-button'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { whatsappMessages } from '@/lib/whatsapp'
import { BreadcrumbSchema, FaqSchema } from '@/components/seo-schema'

export async function generateStaticParams() {
  const slugs = await getPublishedServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

function ListBlock({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl text-navy">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
              <Check className="size-3" aria-hidden="true" />
            </span>
            <span className="text-pretty leading-relaxed text-muted-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const related = (
    await Promise.all(service.related.map((s) => getService(s)))
  ).filter((s): s is Service => Boolean(s))
  const counsellors = (
    await Promise.all(service.counsellors.map((c) => getCounsellor(c)))
  ).filter((c) => Boolean(c))
  const faqs = (await getPublishedFaqs()).slice(0, 5)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
      />
      {faqs.length > 0 && <FaqSchema items={faqs} />}

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.title },
        ]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            {service.imageUrl && (
              <Reveal>
                <div className="relative aspect-16/9 overflow-hidden rounded-3xl border border-border">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-navy/80">
                {service.intro}
              </p>
            </Reveal>

            <Reveal>
              <ListBlock title="Who it may support" items={service.supports} />
            </Reveal>
            <Reveal>
              <ListBlock title="Common concerns" items={service.concerns} />
            </Reveal>
            <Reveal>
              <ListBlock
                title="What counselling may involve"
                items={service.involves}
              />
            </Reveal>
            <Reveal>
              <ListBlock title="What to expect" items={service.expect} />
            </Reveal>

            <p className="text-sm leading-relaxed text-muted-foreground">
              FUAD does not promise guaranteed outcomes. Counselling is a
              supportive, collaborative process that unfolds at your own pace.
            </p>
          </div>

          {/* Sticky booking aside */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-7">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-xl text-navy">
                  Ready when you are
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Book a session through Google Calendar, or start a
                  conversation first — whatever feels right.
                </p>
              </div>
              <BookingButton
                className="w-full"
                fallbackMessage={whatsappMessages.service(service.title)}
                hideFallbackNote
              />
              <WhatsAppButton
                variant="outline"
                className="w-full"
                label={service.ctaLabel}
                message={whatsappMessages.service(service.title)}
              />
            </Reveal>
          </aside>
        </div>
      </section>

      {counsellors.length > 0 && (
        <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Relevant counsellors"
              title="Who you might speak with"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {counsellors.map((counsellor, i) => (
                <Reveal key={counsellor!.slug} delay={i * 60}>
                  <CounsellorCard counsellor={counsellor!} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="px-5 py-20 sm:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="FAQs"
              title="Questions people often ask"
              className="mb-10"
            />
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Related services" title="You may also explore" />
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-navy"
              >
                All services
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 60}>
                  <ServiceCard service={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
