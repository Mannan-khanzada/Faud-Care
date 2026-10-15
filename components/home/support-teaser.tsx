import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getActivePackages } from '@/lib/content/support'
import { getPageContent } from '@/lib/content/page-content'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

/** Short pointer from the homepage to the Support (chat-based counselling) page. */
export async function SupportTeaser() {
  const [c, packages] = await Promise.all([getPageContent(), getActivePackages()])
  if (packages.length === 0) return null

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={c.text('home.support_eyebrow')}
            title={c.text('home.support_heading')}
            description={c.text('home.support_body')}
          />
          <Reveal delay={80}>
            <Link href="/support" className={cn(ctaVariants({ variant: 'primary', size: 'md' }))}>
              {c.text('home.support_cta')}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {packages.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 50}>
              <Link
                href="/support"
                className="inline-flex flex-col rounded-2xl border border-border bg-card px-6 py-4 transition-colors hover:border-sage/50"
              >
                <span className="text-lg text-navy">{p.name}</span>
                {p.duration && <span className="text-sm text-muted-foreground">{p.duration}</span>}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
