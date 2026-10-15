import { homepage } from '@/lib/content/homepage'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function ProcessSection() {
  const steps = homepage.process

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="How Counselling Works"
          title="A simple, unhurried path to support"
          description="Four gentle steps, taken at your own pace."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 70} as="li">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7">
                <span className="font-heading text-3xl text-sage">
                  {step.step}
                </span>
                <h3 className="text-lg text-navy">{step.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
