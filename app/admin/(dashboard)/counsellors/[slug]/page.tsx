import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Field, TextInput, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { CounsellorFormFields } from '../counsellor-form-fields'
import { updateCounsellor } from '../actions'

export default async function EditCounsellorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data: row } = await supabase
    .from('counsellors')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!row) notFound()

  const counsellor = {
    slug: row.slug,
    name: row.name,
    title: row.title,
    shortBio: row.short_bio,
    fullBio: row.full_bio,
    qualifications: row.qualifications,
    certifications: row.certifications,
    experience: row.experience,
    areas: row.areas,
    specialties: row.specialties,
    languages: row.languages,
    approach: row.approach,
    sessionFormat: row.session_format,
    fee: row.fee,
    bookingUrl: row.booking_url ?? undefined,
    photo: row.photo,
    published: row.published,
  }

  const updateWithSlug = updateCounsellor.bind(null, slug)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit {counsellor.name}</h1>
      <form action={updateWithSlug} className="flex max-w-lg flex-col gap-5">
        <Field label="URL slug" hint="Fixed — this is used in the page URL">
          <TextInput value={counsellor.slug} disabled className="opacity-60" />
        </Field>
        <CounsellorFormFields counsellor={counsellor} />
        <Field label="Sort order">
          <TextInput name="sort_order" type="number" defaultValue={row.sort_order} />
        </Field>
        <Checkbox
          name="published"
          label="Published (visible on the site)"
          defaultChecked={counsellor.published}
        />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
