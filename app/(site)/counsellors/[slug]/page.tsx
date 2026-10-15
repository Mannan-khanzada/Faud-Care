import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getCounsellor,
  getPublishedCounsellorSlugs,
  TO_BE_CONFIRMED,
} from '@/lib/content/counsellors'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { BookingButton } from '@/components/booking-button'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { whatsappMessages } from '@/lib/whatsapp'
import { BreadcrumbSchema } from '@/components/seo-schema'

export async function generateStaticParams() {
  const slugs = await getPublishedCounsellorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const counsellor = await getCounsellor(slug)
  if (!counsellor) return { title: 'Counsellor not found' }
  return {
    title: counsellor.name,
    description: counsellor.shortBio,
    alternates: { canonical: `/counsellors/${counsellor.slug}` },
  }
}

function isSet(value: string) {
  return value && value !== TO_BE_CONFIRMED
}

function listIsSet(values: string[]) {
  return (
    Array.isArray(values) &&
    values.length > 0 &&
    values.some((v) => v !== TO_BE_CONFIRMED)
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 last:border-0">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
        {label}
      </dt>
      <dd className="text-pretty leading-relaxed text-navy/80">
        {isSet(value) ? (
          value
        ) : (
          <span className="text-muted-foreground">To be confirmed</span>
        )}
      </dd>
    </div>
  )
}

function TagRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-4 last:border-0">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
        {label}
      </dt>
      <dd>
        {listIsSet(values) ? (
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(values) ? values : [])
              .filter((v) => v !== TO_BE_CONFIRMED)
              .map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-navy/75"
                >
                  {v}
                </span>
              ))}
          </div>
        ) : (
          <span className="text-muted-foreground">To be confirmed</span>
        )}
      </dd>
    </div>
  )
}

export default async function CounsellorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const counsellor = await getCounsellor(slug)
  if (!counsellor) notFound()

  const message = whatsappMessages.counsellor(counsellor.name)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Counsellors', url: '/counsellors' },
          { name: counsellor.name, url: `/counsellors/${counsellor.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Counsellor"
        title={counsellor.name}
        description={counsellor.shortBio}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Counsellors', href: '/counsellors' },
          { name: counsellor.name },
        ]}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Photo + booking */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border border-border bg-mist shadow-[0_30px_70px_-45px_rgba(35,55,79,0.5)]">
                <Image
                  src={counsellor.photo || '/placeholder.svg'}
                  alt={`${counsellor.name} — counsellor at FUAD`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal
              delay={80}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <BookingButton
                className="w-full"
                counsellorUrl={counsellor.bookingUrl}
                label={`Book with ${counsellor.name.split(' ')[0]}`}
                fallbackMessage={message}
                hideFallbackNote
              />
              <WhatsAppButton
                variant="outline"
                className="w-full"
                message={message}
              />
            </Reveal>
          </div>

          {/* Bio + details */}
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl text-navy">About</h2>
              <p className="text-pretty text-lg leading-relaxed text-navy/80">
                {counsellor.fullBio}
              </p>
              {isSet(counsellor.approach) && (
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {counsellor.approach}
                </p>
              )}
            </Reveal>

            <Reveal>
              <dl className="rounded-2xl border border-border bg-card px-7 py-2">
                <DetailRow label="Professional title" value={counsellor.title} />
                <DetailRow label="Experience" value={counsellor.experience} />
                <TagRow label="Qualifications" values={counsellor.qualifications} />
                <TagRow label="Certifications" values={counsellor.certifications} />
                <TagRow label="Areas of support" values={counsellor.areas} />
                <TagRow label="Specialties" values={counsellor.specialties} />
                <TagRow label="Languages" values={counsellor.languages} />
                <DetailRow label="Session format" value={counsellor.sessionFormat} />
                <DetailRow label="Fee" value={counsellor.fee} />
              </dl>
            </Reveal>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Profile details marked &ldquo;to be confirmed&rdquo; will be added
              once verified.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
