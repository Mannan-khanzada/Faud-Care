import Link from 'next/link'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/admin/admin-fields'
import { deleteFaq } from './actions'

export default async function AdminFaqsPage() {
  const supabase = await getSupabaseServerClient()
  const { data } = supabase
    ? await supabase.from('faqs').select('*').order('sort_order', { ascending: true })
    : { data: [] }

  const faqs = data ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-navy">FAQs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shown on the homepage preview and the full FAQs page.
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-ivory hover:bg-sage/90"
        >
          Add FAQ
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((f) => (
          <div
            key={f.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-navy">{f.question}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {f.answer}
              </p>
              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  f.published ? 'bg-sage/15 text-sage' : 'bg-muted text-muted-foreground'
                }`}
              >
                {f.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/faqs/${f.id}`}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy hover:bg-muted"
              >
                Edit
              </Link>
              <form action={deleteFaq}>
                <input type="hidden" name="id" value={f.id} />
                <SubmitButton variant="destructive" className="px-3 py-1.5">
                  Delete
                </SubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
