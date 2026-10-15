import { Field, TextInput, TextArea, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { createTestimonial } from '../actions'

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Add testimonial</h1>
      <form action={createTestimonial} className="flex max-w-lg flex-col gap-5">
        <Field label="Quote">
          <TextArea name="quote" required />
        </Field>
        <Field label="Attribution" hint="e.g. a first name and last initial">
          <TextInput name="attribution" required />
        </Field>
        <Field label="Sort order" hint="Lower numbers show first">
          <TextInput name="sort_order" type="number" defaultValue={0} />
        </Field>
        <Checkbox name="published" label="Published (visible on the site)" />
        <SubmitButton className="w-fit">Save</SubmitButton>
      </form>
    </div>
  )
}
