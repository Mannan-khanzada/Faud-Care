import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToCategory } from '@/lib/content/events'
import { Field, TextInput, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { updateCategory } from '../actions'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data } = await supabase.from('event_categories').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const category = rowToCategory(data)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit category</h1>
      <form action={updateCategory.bind(null, id)} className="flex max-w-lg flex-col gap-5">
        <Field label="Name">
          <TextInput name="name" defaultValue={category.name} required />
        </Field>
        <Field label="Display order" hint="Lower numbers show first. You can also use the arrows on the list.">
          <TextInput name="sort_order" type="number" defaultValue={category.sortOrder} />
        </Field>
        <Checkbox name="active" label="Enabled (shown in the public filter)" defaultChecked={category.active} />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
