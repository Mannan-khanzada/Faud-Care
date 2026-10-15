'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { adminContext } from '@/lib/admin/auth'
import { moveRow } from '@/lib/admin/reorder'

const LIST_PATH = '/admin/event-categories'
const { fail, requireClient } = adminContext(LIST_PATH)

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'category'
  )
}

function refresh() {
  revalidatePath('/', 'layout')
}

export async function createCategory(formData: FormData) {
  const supabase = await requireClient()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) fail('Please enter a category name.')

  // Keep slugs unique: webinar, webinar-2, webinar-3 …
  const { data: existing } = await supabase.from('event_categories').select('slug, sort_order')
  const taken = new Set((existing ?? []).map((r: { slug: string }) => r.slug))
  const base = slugify(name)
  let slug = base
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`
  const nextOrder =
    Math.max(0, ...(existing ?? []).map((r: { sort_order: number }) => Number(r.sort_order) || 0)) + 10

  const { error } = await supabase
    .from('event_categories')
    .insert({ name, slug, active: true, sort_order: nextOrder })
  if (error) fail(error.message)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await requireClient()
  const name = String(formData.get('name') ?? '').trim()
  if (!name) fail('Please enter a category name.', `${LIST_PATH}/${id}`)

  const { error } = await supabase
    .from('event_categories')
    .update({
      name,
      active: formData.get('active') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0) || 0,
    })
    .eq('id', id)
  if (error) fail(error.message, `${LIST_PATH}/${id}`)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function deleteCategory(formData: FormData) {
  const supabase = await requireClient()
  // Events in this category are kept; they simply become uncategorised.
  const { error } = await supabase
    .from('event_categories')
    .delete()
    .eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function moveCategory(formData: FormData) {
  const supabase = await requireClient()
  const direction = formData.get('direction') === 'up' ? 'up' : 'down'
  const message = await moveRow(supabase, 'event_categories', String(formData.get('id')), direction)
  if (message) fail(message)

  refresh()
  redirect(LIST_PATH)
}

export async function toggleCategory(formData: FormData) {
  const supabase = await requireClient()
  const { error } = await supabase
    .from('event_categories')
    .update({ active: formData.get('active') === 'true' })
    .eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(LIST_PATH)
}
