import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedServices } from '@/lib/content/services'
import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ServiceCard } from '@/components/service-card'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

export async function ServicesSection() {
  const services = (await getPublishedServices()).slice(0, 6)
  const c = await getPageContent()
  if (services.length === 0) return null

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={c.text('home.services_eyebrow')}
            title={c.text('home.services_title')}
            description={c.text('home.services_description')}
          />
          <Reveal delay={80}>
            <Link
              href="/services"
              className={cn(ctaVariants({ variant: 'outline', size: 'sm' }))}
            >
              View all services
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
