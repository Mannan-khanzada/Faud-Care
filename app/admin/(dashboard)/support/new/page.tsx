import { SubmitButton } from '@/components/admin/admin-fields'
import { createPackage } from '../actions'
import { PackageFormFields } from '../package-form-fields'

export default function NewPackagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-navy">Add support package</h1>
      <form action={createPackage} className="flex max-w-xl flex-col gap-5">
        <PackageFormFields />
        <SubmitButton className="w-fit">Save package</SubmitButton>
      </form>
    </div>
  )
}
