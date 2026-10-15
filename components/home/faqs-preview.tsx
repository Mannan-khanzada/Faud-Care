import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedFaqs } from '@/lib/content/faqs'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FaqAccordion } from '@/components/faq-accordion'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

export async function FaqsPreview() {
  const faqs = (await getPublishedFaqs()).slice(0, 6)
  if (faqs.length === 0) return null

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions people often ask"
            description="If something you're wondering about isn't here, you're always welcome to ask."
          />
          <Reveal delay={80}>
            <Link
              href="/faqs"
              className={cn(ctaVariants({ variant: 'outline', size: 'sm' }))}
            >
              All questions
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  )
}
