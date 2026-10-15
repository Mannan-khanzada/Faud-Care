import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Counsellor } from '@/lib/content/counsellors'
import { TO_BE_CONFIRMED } from '@/lib/content/counsellors'
import { LogoMark } from '@/components/logo'

const PLACEHOLDER_PHOTOS = ['', '/placeholder.svg', '/counsellor-placeholder.png']

function specialization(c: Counsellor): string {
  const real = (list: string[]) => list.filter((v) => v && v !== TO_BE_CONFIRMED)
  const fromLists = real(c.specialties).concat(real(c.areas))
  if (fromLists.length > 0) return fromLists.slice(0, 3).join(' · ')
  return c.title && c.title !== TO_BE_CONFIRMED ? c.title : 'Online counselling'
}

/** Small round visual: the FUAD logo until a real photo is added in the admin panel. */
function Visual({ counsellor }: { counsellor: Counsellor }) {
  const hasPhoto = !PLACEHOLDER_PHOTOS.includes(counsellor.photo)
  return (
    <span className="relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary/60">
      {hasPhoto ? (
        <Image src={counsellor.photo} alt="" fill sizes="48px" className="object-cover" />
      ) : (
        <LogoMark height={9} />
      )}
    </span>
  )
}

/** Compact, list-style counsellor layout: Name | Specialization | Introduction | View profile. */
export function CounsellorList({ counsellors }: { counsellors: Counsellor[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        aria-hidden="true"
        className="hidden grid-cols-[1.1fr_1fr_1.8fr_auto] gap-6 border-b border-border bg-secondary/40 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-navy/60 md:grid"
      >
        <span>Counsellor</span>
        <span>Specialization</span>
        <span>Introduction</span>
        <span className="w-28 text-right">Profile</span>
      </div>
      <ul className="divide-y divide-border">
        {counsellors.map((c) => (
          <li
            key={c.slug}
            className="grid gap-3 px-5 py-5 transition-colors hover:bg-secondary/30 md:grid-cols-[1.1fr_1fr_1.8fr_auto] md:items-center md:gap-6 md:px-6"
          >
            <div className="flex items-center gap-4">
              <Visual counsellor={c} />
              <h3 className="text-base text-navy">{c.name}</h3>
            </div>
            <p className="text-sm font-medium text-sage md:text-navy/75">{specialization(c)}</p>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{c.shortBio}</p>
            <Link
              href={`/counsellors/${c.slug}`}
              aria-label={`View profile of ${c.name}`}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sage transition-colors hover:text-navy md:w-28 md:justify-end"
            >
              View Profile
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
