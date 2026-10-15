import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToPackage } from '@/lib/content/support'
import { SubmitButton } from '@/components/admin/admin-fields'
import { deletePackage, movePackage, togglePackage } from './actions'

export default async function AdminSupportPage() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = supabase
    ? await supabase
        .from('support_packages')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
    : { data: [], error: null }

  const packages = (data ?? []).map(rowToPackage)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-navy">Support packages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chat-based counselling packages shown on the Support page. Each package’s button opens WhatsApp with a
            message naming that package. The WhatsApp wording is edited under Page content → Support page.
          </p>
        </div>
        <Link
          href="/admin/support/new"
          className="shrink-0 rounded-lg bg-sage px-4 py-2 text-sm font-medium text-ivory hover:bg-sage/90"
        >
          Add package
        </Link>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load packages: {error.message}. If a table is missing, run
          <code className="mx-1">supabase/updates-fuad-changes.sql</code> in the Supabase SQL Editor.
        </p>
      )}

      {packages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center text-sm text-muted-foreground">
          No packages yet. Add the first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {packages.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-sm font-medium text-navy">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {[p.duration, p.price].filter(Boolean).join(' · ') || '—'}
                </p>
                <span
                  className={`mt-1 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.active ? 'bg-sage/15 text-sage' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {p.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <form action={movePackage}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="direction" value="up" />
                  <SubmitButton variant="outline" className="px-2.5 py-1.5" disabled={i === 0}>
                    <ArrowUp className="size-4" aria-label="Move up" />
                  </SubmitButton>
                </form>
                <form action={movePackage}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="direction" value="down" />
                  <SubmitButton variant="outline" className="px-2.5 py-1.5" disabled={i === packages.length - 1}>
                    <ArrowDown className="size-4" aria-label="Move down" />
                  </SubmitButton>
                </form>
                <form action={togglePackage}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="active" value={String(!p.active)} />
                  <SubmitButton variant="outline" className="px-3 py-1.5">
                    {p.active ? 'Deactivate' : 'Activate'}
                  </SubmitButton>
                </form>
                <Link
                  href={`/admin/support/${p.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy hover:bg-muted"
                >
                  Edit
                </Link>
                <form action={deletePackage}>
                  <input type="hidden" name="id" value={p.id} />
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
