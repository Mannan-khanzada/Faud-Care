import { Field, TextInput, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { ServiceFormFields } from '../service-form-fields'
import { createService } from '../actions'

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Add service</h1>
      <form action={createService} className="flex max-w-lg flex-col gap-5">
        <Field label="URL slug" hint="Leave blank to generate from title">
          <TextInput name="slug" />
        </Field>
        <ServiceFormFields />
        <Field label="Sort order" hint="Lower numbers show first">
          <TextInput name="sort_order" type="number" defaultValue={0} />
        </Field>
        <Checkbox name="published" label="Published (visible on the site)" defaultChecked />
        <SubmitButton className="w-fit">Save</SubmitButton>
      </form>
    </div>
  )
}
