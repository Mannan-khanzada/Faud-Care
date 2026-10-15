'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { adminContext } from '@/lib/admin/auth'
import { resolveImage } from '@/lib/admin/upload'

const LIST_PATH = '/admin/events'
const { fail, requireClient } = adminContext(LIST_PATH)

type Supabase = Awaited<ReturnType<typeof requireClient>>

async function readEvent(supabase: Supabase, formData: FormData, errorPath: string) {
  const str = (name: string) => String(formData.get(name) ?? '').trim()

  let imageUrl = ''
  try {
    imageUrl = await resolveImage(supabase, formData, 'image_url', 'events')
  } catch (e) {
    fail(e instanceof Error ? e.message : 'Image upload failed.', errorPath)
  }

  return {
    title: str('title'),
    category_id: str('category_id') || null,
    description: str('description'),
    event_date: str('event_date') || null,
    event_time: str('event_time'),
    mode: str('mode') === 'onsite' ? 'onsite' : 'online',
    location: str('location'),
    image_url: imageUrl,
    cta_label: str('cta_label') || 'Register',
    registration_url: str('registration_url'),
    featured: formData.get('featured') === 'on',
    status: str('status') === 'past' ? 'past' : 'upcoming',
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  }
}

function refresh() {
  revalidatePath('/', 'layout')
}

export async function createEvent(formData: FormData) {
  const supabase = await requireClient()
  const row = await readEvent(supabase, formData, `${LIST_PATH}/new`)
  if (!row.title) fail('Please enter an event title.', `${LIST_PATH}/new`)

  const { error } = await supabase.from('events').insert(row)
  if (error) fail(error.message, `${LIST_PATH}/new`)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await requireClient()
  const row = await readEvent(supabase, formData, `${LIST_PATH}/${id}`)
  if (!row.title) fail('Please enter an event title.', `${LIST_PATH}/${id}`)

  const { error } = await supabase.from('events').update(row).eq('id', id)
  if (error) fail(error.message, `${LIST_PATH}/${id}`)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

export async function deleteEvent(formData: FormData) {
  const supabase = await requireClient()
  const { error } = await supabase.from('events').delete().eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(`${LIST_PATH}?saved=1`)
}

/** Quick toggles from the list: published / featured / upcoming-past. */
export async function quickUpdateEvent(formData: FormData) {
  const supabase = await requireClient()
  const field = String(formData.get('field'))
  const value = String(formData.get('value'))
  const patch =
    field === 'published'
      ? { published: value === 'true' }
      : field === 'featured'
        ? { featured: value === 'true' }
        : field === 'status'
          ? { status: value === 'past' ? 'past' : 'upcoming' }
          : null
  if (!patch) return fail('Unknown change.')

  const { error } = await supabase.from('events').update(patch).eq('id', String(formData.get('id')))
  if (error) fail(error.message)

  refresh()
  redirect(LIST_PATH)
}
