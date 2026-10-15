import { Field, TextInput, TextArea, ImageField } from '@/components/admin/admin-fields'

type ServiceRow = {
  title: string
  summary: string
  intro: string
  supports: string[]
  concerns: string[]
  involves: string[]
  expect: string[]
  related: string[]
  counsellors: string[]
  booking_url: string | null
  image_url?: string | null
  cta_label?: string | null
}

/** Shared fields for the service create/edit forms. */
export function ServiceFormFields({ service }: { service?: ServiceRow }) {
  const listVal = (arr?: string[]) => (arr ?? []).join('\n')

  return (
    <>
      <Field label="Title">
        <TextInput name="title" defaultValue={service?.title} required />
      </Field>
      <Field label="Summary" hint="Shown on cards">
        <TextArea name="summary" defaultValue={service?.summary} rows={2} />
      </Field>
      <Field label="Intro" hint="Longer paragraph on the service's own page">
        <TextArea name="intro" defaultValue={service?.intro} rows={4} />
      </Field>
      <Field label="Who this supports" hint="One per line">
        <TextArea name="supports" defaultValue={listVal(service?.supports)} rows={3} />
      </Field>
      <Field label="Common concerns" hint="One per line">
        <TextArea name="concerns" defaultValue={listVal(service?.concerns)} rows={3} />
      </Field>
      <Field label="What it involves" hint="One per line">
        <TextArea name="involves" defaultValue={listVal(service?.involves)} rows={3} />
      </Field>
      <Field label="What to expect" hint="One per line">
        <TextArea name="expect" defaultValue={listVal(service?.expect)} rows={3} />
      </Field>
      <Field label="Related service slugs" hint="One per line, e.g. anxiety-support">
        <TextArea name="related" defaultValue={listVal(service?.related)} rows={2} />
      </Field>
      <Field label="Counsellor slugs" hint="One per line, e.g. jane-doe">
        <TextArea name="counsellors" defaultValue={listVal(service?.counsellors)} rows={2} />
      </Field>
      <ImageField label="Service image" name="image_url" defaultValue={service?.image_url ?? ''} hint="Shown on the service page. Choose a file to upload, or paste a link." />
      <Field label="Button text" hint="Optional — replaces “Start a Conversation” on this service’s WhatsApp button">
        <TextInput name="cta_label" defaultValue={service?.cta_label ?? ''} />
      </Field>
      <Field label="Booking URL" hint="Optional — Google Calendar link specific to this service">
        <TextInput name="booking_url" defaultValue={service?.booking_url ?? undefined} type="url" />
      </Field>
    </>
  )
}
