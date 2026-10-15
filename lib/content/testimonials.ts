import { getSupabasePublicClient } from '@/lib/supabase/server'

export type Testimonial = {
  id: string
  quote: string
  attribution: string
  published: boolean
}

/**
 * Testimonials must be genuine. None are fabricated. Until real, approved
 * testimonials are added from /admin, this stays empty and the section is
 * hidden entirely.
 */
export const testimonials: Testimonial[] = []

/** Reads published testimonials from Supabase; falls back to the (empty) static list. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return testimonials.filter((t) => t.published)

  const { data, error } = await supabase
    .from('testimonials')
    .select('id, quote, attribution, published')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return testimonials.filter((t) => t.published)
  return data
}
