import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedCounsellors } from '@/lib/content/counsellors'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CounsellorList } from '@/components/counsellor-list'
import { getPageContent } from '@/lib/content/page-content'
import { EmptyState } from '@/components/empty-state'
import { ctaVariants } from '@/components/ui/cta'
import { cn } from '@/lib/utils'

export async function CounsellorsSection() {
  const counsellors = (await getPublishedCounsellors()).slice(0, 3)
  const c = await getPageContent()

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={c.text('counsellors.eyebrow')}
            title={c.text('counsellors.title')}
            description={c.text('counsellors.description')}
          />
          {counsellors.length > 0 && (
            <Reveal delay={80}>
              <Link
                href="/counsellors"
                className={cn(ctaVariants({ variant: 'outline', size: 'sm' }))}
              >
                Meet the team
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-12">
          {counsellors.length > 0 ? (
            <Reveal>
              <CounsellorList counsellors={counsellors} />
            </Reveal>
          ) : (
            <EmptyState message="Our counsellor profiles are being updated. Please contact FUAD to learn more." />
          )}
        </div>
      </div>
    </section>
  )
}
