import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToCategory } from '@/lib/content/events'
import { Field, TextInput, SubmitButton } from '@/components/admin/admin-fields'
import { createCategory, deleteCategory, moveCategory, toggleCategory } from './actions'

export default async function AdminEventCategoriesPage() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = supabase
    ? await supabase
        .from('event_categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
    : { data: [], error: null }

  const categories = (data ?? []).map(rowToCategory)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Event categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Used to group events on the Events page. Disabled categories are hidden from the public filter. Deleting a
          category keeps its events — they just lose the category.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load categories: {error.message}. If a table is missing, run
          <code className="mx-1">supabase/updates-fuad-changes.sql</code> in the Supabase SQL Editor.
        </p>
      )}

      <form action={createCategory} className="flex max-w-lg items-end gap-3">
        <div className="flex-1">
          <Field label="New category">
            <TextInput name="name" placeholder="e.g. Workshop" required />
          </Field>
        </div>
        <SubmitButton>Add</SubmitButton>
      </form>

      {categories.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-8 py-14 text-center text-sm text-muted-foreground">
          No categories yet. Add the first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((c, i) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 items-center gap-3">
                <p className="text-sm font-medium text-navy">{c.name}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    c.active ? 'bg-sage/15 text-sage' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {c.active ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <form action={moveCategory}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="direction" value="up" />
                  <SubmitButton variant="outline" className="px-2.5 py-1.5" disabled={i === 0}>
                    <ArrowUp className="size-4" aria-label="Move up" />
                  </SubmitButton>
                </form>
                <form action={moveCategory}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="direction" value="down" />
                  <SubmitButton variant="outline" className="px-2.5 py-1.5" disabled={i === categories.length - 1}>
                    <ArrowDown className="size-4" aria-label="Move down" />
                  </SubmitButton>
                </form>
                <form action={toggleCategory}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="active" value={String(!c.active)} />
                  <SubmitButton variant="outline" className="px-3 py-1.5">
                    {c.active ? 'Disable' : 'Enable'}
                  </SubmitButton>
                </form>
                <Link
                  href={`/admin/event-categories/${c.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy hover:bg-muted"
                >
                  Edit
                </Link>
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={c.id} />
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
