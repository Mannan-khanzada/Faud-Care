'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const LIST_PATH = '/admin/faqs'

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

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) fail('Supabase is not configured (check environment variables).')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

export async function createFaq(formData: FormData) {
  const supabase = await requireClient()
  const question = String(formData.get('question') ?? '')

  const { error } = await supabase.from('faqs').insert({
    id: slugify(question) || crypto.randomUUID(),
    question,
    answer: String(formData.get('answer') ?? ''),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  })
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/faqs?saved=1')
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await requireClient()

  const { error } = await supabase
    .from('faqs')
    .update({
      question: String(formData.get('question') ?? ''),
      answer: String(formData.get('answer') ?? ''),
      published: formData.get('published') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0),
    })
    .eq('id', id)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/faqs?saved=1')
}

export async function deleteFaq(formData: FormData) {
  const supabase = await requireClient()
  const id = String(formData.get('id'))

  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect(LIST_PATH + '?saved=1')
}
