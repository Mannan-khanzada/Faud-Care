'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { adminContext } from '@/lib/admin/auth'
import { moveRow } from '@/lib/admin/reorder'
import { toList } from '@/lib/to-list'

const LIST_PATH = '/admin/support'
const { fail, requireClient } = adminContext(LIST_PATH)

function readPackage(formData: FormData) {
  const str = (name: string) => String(formData.get(name) ?? '').trim()
  return {
    name: str('name'),
    short_description: str('short_description'),
    full_description: str('full_description'),
    duration: str('duration'),
    sessions: str('sessions'),
    features: toList(String(formData.get('features') ?? '')),
    price: str('price'),
    cta_label: str('cta_label') || 'WhatsApp Chat / Book This Package',
    active: formData.get('active') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  }
}

function refresh() {
  revalidatePath('/', 'layout')
}

export async function createPackage(formData: FormData) {
  const supabase = await requireClient()
  const row = readPackage(formData)
  if (!row.name) fail('Please enter a package name.', `${LIST_PATH}/new`)

  const { error } = await supabase.from('support_packages').insert(row)
  if (error) fail(error.message, `${LIST_PATH}/new`)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await requireClient()
  const row = readPackage(formData)
  if (!row.name) fail('Please enter a package name.', `${LIST_PATH}/${id}`)

  const { error } = await supabase.from('support_packages').update(row).eq('id', id)
  if (error) fail(error.message, `${LIST_PATH}/${id}`)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function deletePackage(formData: FormData) {
  const supabase = await requireClient()
  const { error } = await supabase
    .from('support_packages')
    .delete()
    .eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function movePackage(formData: FormData) {
  const supabase = await requireClient()
  const direction = formData.get('direction') === 'up' ? 'up' : 'down'
  const message = await moveRow(supabase, 'support_packages', String(formData.get('id')), direction)
  if (message) fail(message)

  refresh()
  redirect(LIST_PATH)
}

export async function togglePackage(formData: FormData) {
  const supabase = await requireClient()
  const { error } = await supabase
    .from('support_packages')
    .update({ active: formData.get('active') === 'true' })
    .eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(LIST_PATH)
}
