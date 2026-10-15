import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { rowToPackage } from '@/lib/content/support'
import { SubmitButton } from '@/components/admin/admin-fields'
import { updatePackage } from '../actions'
import { PackageFormFields } from '../package-form-fields'

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()
  if (!supabase) notFound()

  const { data } = await supabase.from('support_packages').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Edit support package</h1>
      <form action={updatePackage.bind(null, id)} className="flex max-w-xl flex-col gap-5">
        <PackageFormFields pkg={rowToPackage(data)} />
        <SubmitButton className="w-fit">Save changes</SubmitButton>
      </form>
    </div>
  )
}
