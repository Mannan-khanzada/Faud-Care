import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/lib/content/services'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_40px_-24px_rgba(35,55,79,0.35)]"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-xl text-navy">{service.title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {service.summary}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors group-hover:text-navy">
        Learn more
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
