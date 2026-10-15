import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'

export async function Intro() {
  const c = await getPageContent()
  const eyebrow = c.text('home.intro_eyebrow')
  const heading = c.text('home.intro_heading')
  const body = c.text('home.intro_body')
  const pillars = c.list('home.intro_pillars')

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal
          as="span"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-sage"
        >
          {eyebrow}
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-3xl leading-tight text-navy sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {body}
          </p>
        </Reveal>
        <Reveal
          delay={180}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {pillars.map((pillar) => (
            <span
              key={pillar}
              className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-navy/80"
            >
              {pillar}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
