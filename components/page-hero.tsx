import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'

type Crumb = { name: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="border-b border-border/70 bg-secondary/40 px-5 pb-16 pt-14 sm:px-8 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-6xl">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.name} className="inline-flex items-center gap-1.5">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-navy"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-navy">{crumb.name}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="size-3" aria-hidden="true" />
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal className="flex max-w-3xl flex-col gap-5">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-sage">
              <span className="h-px w-6 bg-sage/60" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-4xl leading-[1.1] text-navy sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
