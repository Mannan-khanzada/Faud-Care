import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Field, TextInput, TextArea, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { updateTestimonial } from '../actions'

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (!testimonial) notFound()

  const updateWithId = updateTestimonial.bind(null, id)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit testimonial</h1>
      <form action={updateWithId} className="flex max-w-lg flex-col gap-5">
        <Field label="Quote">
          <TextArea name="quote" defaultValue={testimonial.quote} required />
        </Field>
        <Field label="Attribution">
          <TextInput name="attribution" defaultValue={testimonial.attribution} required />
        </Field>
        <Field label="Sort order">
          <TextInput name="sort_order" type="number" defaultValue={testimonial.sort_order} />
        </Field>
        <Checkbox
          name="published"
          label="Published (visible on the site)"
          defaultChecked={testimonial.published}
        />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
