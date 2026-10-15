'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { adminContext } from '@/lib/admin/auth'
import { resolveImage } from '@/lib/admin/upload'
import { contentFields, contentGroups, type ContentGroup } from '@/lib/content/page-content'

const BASE = '/admin/content'
const { fail, requireClient } = adminContext(BASE)

const normalise = (v: string) => v.replace(/\r\n/g, '\n').trim()

/**
 * Saves every field of one content group. A field left blank, or identical to
 * the built-in default, is removed from the database so the default applies
 * (and any future improvement to the default flows through automatically).
 */
export async function saveContent(group: ContentGroup, formData: FormData) {
  const supabase = await requireClient()
  const here = `${BASE}?group=${group}`
  if (!contentGroups.some((g) => g.id === group)) fail('Unknown content group.')

  const fields = contentFields.filter((f) => f.group === group)
  const upserts: { key: string; value: string; updated_at: string }[] = []
  const removals: string[] = []
  const now = new Date().toISOString()

  for (const field of fields) {
    let value = ''
    if (field.type === 'image') {
      try {
        value = await resolveImage(supabase, formData, field.key, 'content')
      } catch (e) {
        fail(e instanceof Error ? e.message : 'Image upload failed.', here)
      }
    } else {
      value = normalise(String(formData.get(field.key) ?? ''))
    }

    if (value === '' || value === normalise(field.default)) removals.push(field.key)
    else upserts.push({ key: field.key, value, updated_at: now })
  }

  if (upserts.length > 0) {
    const { error } = await supabase.from('site_content').upsert(upserts, { onConflict: 'key' })
    if (error) fail(error.message, here)
  }
  if (removals.length > 0) {
    const { error } = await supabase.from('site_content').delete().in('key', removals)
    if (error) fail(error.message, here)
  }

  revalidatePath('/', 'layout')
  redirect(`${here}&saved=1`)
}
