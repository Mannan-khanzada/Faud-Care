import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/admin/admin-fields'
import { deleteTestimonial } from './actions'

export default async function AdminTestimonialsPage() {
  const supabase = await getSupabaseServerClient()
  const { data } = supabase
    ? await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true })
    : { data: [] }

  const testimonials = data ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-navy">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Only published testimonials appear on the site. None are added
            automatically — every one here was entered by you.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-ivory hover:bg-sage/90"
        >
          Add testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center text-sm text-muted-foreground">
          No testimonials yet. Add the first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-navy/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-2 text-sm font-medium text-navy">
                  {t.attribution}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    t.published
                      ? 'bg-sage/15 text-sage'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {t.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy hover:bg-muted"
                >
                  Edit
                </Link>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <SubmitButton variant="destructive" className="px-3 py-1.5">
                    Delete
                  </SubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
