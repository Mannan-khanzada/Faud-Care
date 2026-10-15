import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Field, TextInput, TextArea, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { updateFaq } from '../actions'

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data: faq } = await supabase.from('faqs').select('*').eq('id', id).maybeSingle()
  if (!faq) notFound()

  const updateWithId = updateFaq.bind(null, id)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit FAQ</h1>
      <form action={updateWithId} className="flex max-w-lg flex-col gap-5">
        <Field label="Question">
          <TextInput name="question" defaultValue={faq.question} required />
        </Field>
        <Field label="Answer">
          <TextArea name="answer" defaultValue={faq.answer} required rows={5} />
        </Field>
        <Field label="Sort order">
          <TextInput name="sort_order" type="number" defaultValue={faq.sort_order} />
        </Field>
        <Checkbox name="published" label="Published (visible on the site)" defaultChecked={faq.published} />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
