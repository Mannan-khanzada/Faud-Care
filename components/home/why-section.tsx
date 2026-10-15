import { Shield, Heart, Award, Globe, Sparkles } from 'lucide-react'
import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const icons = [Shield, Heart, Award, Globe, Sparkles]

export async function WhySection() {
  const c = await getPageContent()
  const eyebrow = c.text('home.why_eyebrow')
  const heading = c.text('home.why_heading')
  const pillars = c.pairs('home.why_pillars')

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={eyebrow} title={heading} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={pillar.title} delay={i * 60}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-sage/12 text-sage">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg text-navy">{pillar.title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
