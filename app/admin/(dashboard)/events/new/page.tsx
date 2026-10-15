import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToCategory } from '@/lib/content/events'
import { SubmitButton } from '@/components/admin/admin-fields'
import { createEvent } from '../actions'
import { EventFormFields } from '../event-form-fields'

export default async function NewEventPage() {
  const supabase = await getSupabaseServerClient()
  const { data } = supabase
    ? await supabase.from('event_categories').select('*').order('sort_order', { ascending: true })
    : { data: [] }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Add event</h1>
      <form action={createEvent} className="flex max-w-xl flex-col gap-5">
        <EventFormFields categories={(data ?? []).map(rowToCategory)} />
        <SubmitButton className="w-fit">Save event</SubmitButton>
      </form>
    </div>
  )
}
