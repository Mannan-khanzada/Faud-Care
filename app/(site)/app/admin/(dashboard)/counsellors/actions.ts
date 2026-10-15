'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { resolveImage } from '@/lib/admin/upload'

const LIST_PATH = '/admin/counsellors'

function fail(message: string): never {
  redirect(`${LIST_PATH}?error=${encodeURIComponent(message)}`)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function linesToArray(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean)
}

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) fail('Supabase is not configured (check environment variables).')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

async function fieldsFrom(supabase: Awaited<ReturnType<typeof requireClient>>, formData: FormData) {
  let photo = ''
  try {
    photo = await resolveImage(supabase, formData, 'photo', 'counsellors')
  } catch (e) {
    fail(e instanceof Error ? e.message : 'Image upload failed.')
  }
  return {
    name: String(formData.get('name') ?? ''),
    title: String(formData.get('title') ?? ''),
    short_bio: String(formData.get('short_bio') ?? ''),
    full_bio: String(formData.get('full_bio') ?? ''),
    qualifications: linesToArray(formData.get('qualifications')),
    certifications: linesToArray(formData.get('certifications')),
    experience: String(formData.get('experience') ?? ''),
    areas: linesToArray(formData.get('areas')),
    specialties: linesToArray(formData.get('specialties')),
    languages: linesToArray(formData.get('languages')),
    approach: String(formData.get('approach') ?? ''),
    session_format: String(formData.get('session_format') ?? ''),
    fee: String(formData.get('fee') ?? ''),
    booking_url: String(formData.get('booking_url') ?? '') || null,
    photo: photo || '/counsellor-placeholder.png',
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  }
}

export async function createCounsellor(formData: FormData) {
  const supabase = await requireClient()
  const name = String(formData.get('name') ?? '')
  const slugInput = String(formData.get('slug') ?? '')

  const { error } = await supabase.from('counsellors').insert({
    slug: slugify(slugInput || name),
    ...(await fieldsFrom(supabase, formData)),
  })
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/counsellors?saved=1')
}

export async function updateCounsellor(slug: string, formData: FormData) {
  const supabase = await requireClient()

  const { error } = await supabase.from('counsellors').update(await fieldsFrom(supabase, formData)).eq('slug', slug)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/counsellors?saved=1')
}

export async function deleteCounsellor(formData: FormData) {
  const supabase = await requireClient()
  const slug = String(formData.get('slug'))

  const { error } = await supabase.from('counsellors').delete().eq('slug', slug)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect(LIST_PATH + '?saved=1')
}
