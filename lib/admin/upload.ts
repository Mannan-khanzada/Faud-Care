import type { SupabaseClient } from '@supabase/supabase-js'

const MAX_BYTES = 5 * 1024 * 1024

/** Uploads an image to the public "media" bucket and returns its public URL. Throws a readable Error on failure. */
export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  folder: string,
): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Only image files can be uploaded.')
  if (file.size > MAX_BYTES) throw new Error('The image is larger than 5 MB. Please choose a smaller file.')

  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage.from('media').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
  })
  if (error) {
    throw new Error(
      `Image upload failed: ${error.message}. Check that the "media" bucket exists (run updates-fuad-changes.sql), or paste an image link instead.`,
    )
  }
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}

/**
 * Reads an image field from a form: a newly chosen file (`<name>_file`) wins,
 * otherwise the pasted URL / path in `<name>` is used.
 */
export async function resolveImage(
  supabase: SupabaseClient,
  formData: FormData,
  name: string,
  folder: string,
): Promise<string> {
  const file = formData.get(`${name}_file`)
  if (file instanceof File && file.size > 0) return uploadImage(supabase, file, folder)
  return String(formData.get(name) ?? '').trim()
}
