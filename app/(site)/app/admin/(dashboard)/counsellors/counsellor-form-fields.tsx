import { Field, TextInput, TextArea, ImageField } from '@/components/admin/admin-fields'
import type { Counsellor } from '@/lib/content/counsellors'

/** Shared fields for the counsellor create/edit forms. */
export function CounsellorFormFields({ counsellor }: { counsellor?: Counsellor }) {
  const listVal = (arr?: string[]) => (arr ?? []).join('\n')

  return (
    <>
      <Field label="Full name">
        <TextInput name="name" defaultValue={counsellor?.name} required />
      </Field>
      <Field label="Professional title">
        <TextInput name="title" defaultValue={counsellor?.title} />
      </Field>
      <Field label="Short bio" hint="Shown on cards">
        <TextArea name="short_bio" defaultValue={counsellor?.shortBio} rows={2} />
      </Field>
      <Field label="Full bio" hint="Shown on the profile page">
        <TextArea name="full_bio" defaultValue={counsellor?.fullBio} rows={4} />
      </Field>
      <Field label="Qualifications" hint="One per line">
        <TextArea name="qualifications" defaultValue={listVal(counsellor?.qualifications)} rows={3} />
      </Field>
      <Field label="Certifications" hint="One per line">
        <TextArea name="certifications" defaultValue={listVal(counsellor?.certifications)} rows={3} />
      </Field>
      <Field label="Experience">
        <TextInput name="experience" defaultValue={counsellor?.experience} />
      </Field>
      <Field label="Areas of support" hint="One per line">
        <TextArea name="areas" defaultValue={listVal(counsellor?.areas)} rows={3} />
      </Field>
      <Field label="Specialties" hint="One per line">
        <TextArea name="specialties" defaultValue={listVal(counsellor?.specialties)} rows={3} />
      </Field>
      <Field label="Languages" hint="One per line">
        <TextArea name="languages" defaultValue={listVal(counsellor?.languages)} rows={2} />
      </Field>
      <Field label="Approach">
        <TextArea name="approach" defaultValue={counsellor?.approach} rows={3} />
      </Field>
      <Field label="Session format">
        <TextInput name="session_format" defaultValue={counsellor?.sessionFormat} />
      </Field>
      <Field label="Fee">
        <TextInput name="fee" defaultValue={counsellor?.fee} />
      </Field>
      <Field label="Booking URL" hint="Optional — Google Calendar link specific to this counsellor">
        <TextInput name="booking_url" defaultValue={counsellor?.bookingUrl} type="url" />
      </Field>
      <ImageField
        label="Photo / logo"
        name="photo"
        defaultValue={counsellor?.photo}
        hint="The public list shows the FUAD logo until a real photo is added here. Choose a file to upload, or paste a link."
      />
    </>
  )
}
