import { getPublishedTestimonials } from '@/lib/content/testimonials'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/**
 * Shows real, published testimonials from /admin. Renders nothing when
 * there are none — testimonials are never fabricated (see
 * lib/content/testimonials.ts).
 */
export async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials()
  if (testimonials.length === 0) return null

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="A Safe Space to Be Heard"
          description="Everyone's journey is different. Here are some experiences shared by clients who chose to take the first step."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 60}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <span className="mb-4 font-heading text-5xl leading-none text-sage/40" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sm font-semibold text-sage">
                    {initialsOf(testimonial.attribution)}
                  </div>
                  <p className="text-sm font-medium text-navy">{testimonial.attribution}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
