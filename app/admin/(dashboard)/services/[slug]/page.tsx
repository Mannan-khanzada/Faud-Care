import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Field, TextInput, Checkbox, SubmitButton } from '@/components/admin/admin-fields'
import { ServiceFormFields } from '../service-form-fields'
import { updateService } from '../actions'

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!service) notFound()

  const updateWithSlug = updateService.bind(null, slug)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit {service.title}</h1>
      <form action={updateWithSlug} className="flex max-w-lg flex-col gap-5">
        <Field label="URL slug" hint="Fixed — this is used in the page URL">
          <TextInput value={service.slug} disabled className="opacity-60" />
        </Field>
        <ServiceFormFields service={service} />
        <Field label="Sort order">
          <TextInput name="sort_order" type="number" defaultValue={service.sort_order} />
        </Field>
        <Checkbox
          name="published"
          label="Published (visible on the site)"
          defaultChecked={service.published}
        />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
