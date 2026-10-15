import { Field, TextInput, TextArea, Select, Checkbox, ImageField } from '@/components/admin/admin-fields'
import type { EventCategory, FuadEvent } from '@/lib/content/events'

export function EventFormFields({
  event,
  categories,
}: {
  event?: FuadEvent
  categories: EventCategory[]
}) {
  return (
    <>
      <Field label="Event title">
        <TextInput name="title" defaultValue={event?.title} required />
      </Field>
      <Field label="Category" hint="Manage categories under Event categories">
        <Select name="category_id" defaultValue={event?.categoryId ?? ''}>
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.active ? '' : ' (disabled)'}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Description">
        <TextArea name="description" defaultValue={event?.description} rows={5} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date">
          <TextInput name="event_date" type="date" defaultValue={event?.date} />
        </Field>
        <Field label="Time" hint="Free text, e.g. 8:00 PM PKT">
          <TextInput name="event_time" defaultValue={event?.time} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Online / onsite">
          <Select name="mode" defaultValue={event?.mode ?? 'online'}>
            <option value="online">Online</option>
            <option value="onsite">Onsite</option>
          </Select>
        </Field>
        <Field label="Location" hint="For onsite events (venue, city). Optional for online.">
          <TextInput name="location" defaultValue={event?.location} />
        </Field>
      </div>
      <ImageField label="Event image" name="image_url" defaultValue={event?.imageUrl} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Button text" hint="e.g. Register, Join on Zoom, Watch recording">
          <TextInput name="cta_label" defaultValue={event?.ctaLabel ?? 'Register'} />
        </Field>
        <Field label="Registration link" hint="Leave empty to hide the button">
          <TextInput name="registration_url" type="url" defaultValue={event?.registrationUrl} placeholder="https://" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Status">
          <Select name="status" defaultValue={event?.status ?? 'upcoming'}>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </Select>
        </Field>
        <Field label="Display order" hint="Lower numbers show first">
          <TextInput name="sort_order" type="number" defaultValue={event?.sortOrder ?? 0} />
        </Field>
      </div>
      <Checkbox name="featured" label="Featured (shown larger, and first)" defaultChecked={event?.featured} />
      <Checkbox name="published" label="Published (visible on the site)" defaultChecked={event ? event.published : true} />
    </>
  )
}
