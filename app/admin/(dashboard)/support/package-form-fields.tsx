import { Field, TextInput, TextArea, Checkbox } from '@/components/admin/admin-fields'
import type { SupportPackage } from '@/lib/content/support'

export function PackageFormFields({ pkg }: { pkg?: SupportPackage }) {
  return (
    <>
      <Field label="Package name" hint="e.g. Basic, Standard, Premium. This name is used in the WhatsApp message.">
        <TextInput name="name" defaultValue={pkg?.name} required />
      </Field>
      <Field label="Short description" hint="One or two lines shown at the top of the card">
        <TextArea name="short_description" defaultValue={pkg?.shortDescription} rows={2} />
      </Field>
      <Field label="Full description" hint="Shown under “More details” on the card">
        <TextArea name="full_description" defaultValue={pkg?.fullDescription} rows={5} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Duration / period of support" hint="e.g. 2 weeks">
          <TextInput name="duration" defaultValue={pkg?.duration} />
        </Field>
        <Field label="Number of chat sessions / support period" hint="e.g. 8 chat sessions">
          <TextInput name="sessions" defaultValue={pkg?.sessions} />
        </Field>
      </div>
      <Field label="Features / inclusions" hint="One per line">
        <TextArea name="features" defaultValue={pkg?.features.join('\n')} rows={6} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price" hint="Any text, e.g. PKR 5,000 or Price on request">
          <TextInput name="price" defaultValue={pkg?.price} />
        </Field>
        <Field label="Button text" hint="Leave as is for the standard wording">
          <TextInput name="cta_label" defaultValue={pkg?.ctaLabel ?? 'WhatsApp Chat / Book This Package'} />
        </Field>
      </div>
      <Field label="Display order" hint="Lower numbers show first. You can also use the arrows on the list.">
        <TextInput name="sort_order" type="number" defaultValue={pkg?.sortOrder ?? 0} />
      </Field>
      <Checkbox name="active" label="Active (visible on the Support page)" defaultChecked={pkg ? pkg.active : true} />
    </>
  )
}
