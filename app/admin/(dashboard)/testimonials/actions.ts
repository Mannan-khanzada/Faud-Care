'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const LIST_PATH = '/admin/testimonials'

function fail(message: string): never {
  redirect(`${LIST_PATH}?error=${encodeURIComponent(message)}`)
}

async function requireClient() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) fail('Supabase is not configured (check environment variables).')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}

export async function createTestimonial(formData: FormData) {
  const supabase = await requireClient()

  const { error } = await supabase.from('testimonials').insert({
    quote: String(formData.get('quote') ?? ''),
    attribution: String(formData.get('attribution') ?? ''),
    published: formData.get('published') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  })
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/testimonials?saved=1')
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await requireClient()

  const { error } = await supabase
    .from('testimonials')
    .update({
      quote: String(formData.get('quote') ?? ''),
      attribution: String(formData.get('attribution') ?? ''),
      published: formData.get('published') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0),
    })
    .eq('id', id)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/testimonials?saved=1')
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await requireClient()
  const id = String(formData.get('id'))

  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) fail(error.message)

  revalidatePath('/', 'layout')
  redirect(LIST_PATH + '?saved=1')
}
