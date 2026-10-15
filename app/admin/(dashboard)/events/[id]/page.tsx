import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToCategory, rowToEvent } from '@/lib/content/events'
import { SubmitButton } from '@/components/admin/admin-fields'
import { updateEvent } from '../actions'
import { EventFormFields } from '../event-form-fields'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const [{ data: row }, { data: cats }] = await Promise.all([
    supabase.from('events').select('*').eq('id', id).maybeSingle(),
    supabase.from('event_categories').select('*').order('sort_order', { ascending: true }),
  ])
  if (!row) notFound()

  const categories = (cats ?? []).map(rowToCategory)
  const event = rowToEvent(row, new Map(categories.map((c) => [c.id, c.name])))

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit event</h1>
      <form action={updateEvent.bind(null, id)} className="flex max-w-xl flex-col gap-5">
        <EventFormFields event={event} categories={categories} />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
