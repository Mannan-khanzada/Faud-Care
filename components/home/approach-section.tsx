import Image from 'next/image'
import { Check } from 'lucide-react'
import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'

export async function ApproachSection() {
  const c = await getPageContent()
  const eyebrow = c.text('home.approach_eyebrow')
  const heading = c.text('home.approach_heading')
  const body = c.text('home.approach_body')
  const points = c.list('home.approach_points')

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_70px_-45px_rgba(35,55,79,0.5)]">
            <Image
              src={c.text('home.approach_image') || '/approach.png'}
              alt="A soft green branch casting a gentle shadow on an ivory wall"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-sage"
          >
            <span className="h-px w-6 bg-sage/60" aria-hidden="true" />
            {eyebrow}
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-balance text-3xl leading-tight text-navy sm:text-4xl">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {body}
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-2 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {points.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2.5 text-sm text-navy/80"
              >
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {point}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
