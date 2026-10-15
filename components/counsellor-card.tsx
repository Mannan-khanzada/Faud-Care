import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Counsellor } from '@/lib/content/counsellors'
import { TO_BE_CONFIRMED } from '@/lib/content/counsellors'

export function CounsellorCard({ counsellor }: { counsellor: Counsellor }) {
  const showTitle = counsellor.title && counsellor.title !== TO_BE_CONFIRMED

  return (
    <Link
      href={`/counsellors/${counsellor.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-[0_18px_40px_-24px_rgba(35,55,79,0.35)]"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-mist">
        <Image
          src={counsellor.photo || '/placeholder.svg'}
          alt={`${counsellor.name} — counsellor at FUAD`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg text-navy">{counsellor.name}</h3>
          {showTitle && (
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-sage">
              {counsellor.title}
            </p>
          )}
        </div>
        <p className="flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {counsellor.shortBio}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition-colors group-hover:text-navy">
          View profile
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
