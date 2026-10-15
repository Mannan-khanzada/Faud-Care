import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Moves one row up or down by renumbering sort_order for the whole table
 * (10, 20, 30 …). Rows keep a clean, gap-free order afterwards.
 */
export async function moveRow(
  supabase: SupabaseClient,
  table: 'support_packages' | 'event_categories',
  id: string,
  direction: 'up' | 'down',
): Promise<string | null> {
  const { data, error } = await supabase
    .from(table)
    .select('id')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error || !data) return error?.message ?? 'Could not load the list.'

  const ids = (data as { id: string }[]).map((r) => r.id)
  const from = ids.indexOf(id)
  const to = direction === 'up' ? from - 1 : from + 1
  if (from < 0 || to < 0 || to >= ids.length) return null

  ;[ids[from], ids[to]] = [ids[to], ids[from]]
  for (let i = 0; i < ids.length; i++) {
    const { error: updateError } = await supabase
      .from(table)
      .update({ sort_order: (i + 1) * 10 })
      .eq('id', ids[i])
    if (updateError) return updateError.message
  }
  return null
}
