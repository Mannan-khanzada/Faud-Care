import { getSiteSettings } from '@/lib/site-settings.server'
import { hasSupabaseEnv } from '@/lib/supabase/server'
import { Field, TextInput, TextArea, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { updateSettings } from './actions'

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()
  const configured = hasSupabaseEnv()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Controls the booking button, WhatsApp link, and contact details
          used across the whole site.
        </p>
      </div>

      {!configured && (
        <p className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Supabase isn&apos;t connected yet, so changes here can&apos;t be
          saved. The values below are the current defaults.
        </p>
      )}

      <form action={updateSettings} className="flex max-w-lg flex-col gap-5">
        <Field label="Site name">
          <TextInput name="name" defaultValue={settings.name} />
        </Field>
        <Field label="Tagline">
          <TextInput name="tagline" defaultValue={settings.tagline} />
        </Field>
        <Field label="Description" hint="Used for SEO and social previews">
          <TextArea name="description" defaultValue={settings.description} rows={3} />
        </Field>

        <hr className="border-border" />

        <Checkbox
          name="booking_enabled"
          label="Booking enabled"
          defaultChecked={settings.booking.enabled}
        />
        <Field label="Global booking URL" hint="Google Calendar link used when a counsellor has none of their own">
          <TextInput name="booking_global_url" defaultValue={settings.booking.globalUrl} type="url" />
        </Field>
        <Field label="Booking button label">
          <TextInput name="booking_button_label" defaultValue={settings.booking.buttonLabel} />
        </Field>

        <hr className="border-border" />

        <Field label="WhatsApp number" hint="Digits only, with country code, e.g. 923001234567">
          <TextInput name="whatsapp_number" defaultValue={settings.whatsapp.number} />
        </Field>
        <Field label="WhatsApp display number" hint="How it's shown to visitors, e.g. +92 300 1234567">
          <TextInput name="whatsapp_display_number" defaultValue={settings.whatsapp.displayNumber} />
        </Field>

        <hr className="border-border" />

        <Field label="Contact email">
          <TextInput name="contact_email" defaultValue={settings.contact.email} type="email" />
        </Field>
        <Field label="Location" hint="Leave blank to hide">
          <TextInput name="contact_location" defaultValue={settings.contact.location} />
        </Field>
        <Field label="Hours" hint="Leave blank to hide">
          <TextInput name="contact_hours" defaultValue={settings.contact.hours} />
        </Field>

        <hr className="border-border" />

        <Field label="Instagram URL">
          <TextInput name="social_instagram" defaultValue={settings.social.instagram} type="url" />
        </Field>
        <Field label="Facebook URL">
          <TextInput name="social_facebook" defaultValue={settings.social.facebook} type="url" />
        </Field>
        <Field label="LinkedIn URL">
          <TextInput name="social_linkedin" defaultValue={settings.social.linkedin} type="url" />
        </Field>

        <SubmitButton className="w-fit" disabled={!configured}>
          Save settings
        </SubmitButton>
      </form>
    </div>
  )
}
