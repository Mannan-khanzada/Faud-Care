'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function hint(message: string) {
  const m = message.toLowerCase()
  if (m.includes('row-level security'))
    return 'Permission denied by the database. Make sure you are signed in and that supabase/schema.sql was run completely.'
  if (m.includes('does not exist') || m.includes('schema cache'))
    return 'A table or column is missing. In the Supabase SQL Editor run supabase/schema.sql, then updates-fuad-changes.sql and updates-services-image-cta.sql.'
  if (m.includes('duplicate key'))
    return 'An item with this URL slug / ID already exists. Use a different name or slug.'
  return null
}

function FlashInner() {
  const params = useSearchParams()
  const error = params.get('error')
  const saved = params.get('saved')

  if (error) {
    const extra = hint(error)
    return (
      <div role="alert" className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        <p className="font-medium">Could not save: {error}</p>
        {extra && <p className="mt-1 text-destructive/80">{extra}</p>}
      </div>
    )
  }
  if (saved) {
    return (
      <div role="status" className="mb-6 rounded-xl border border-sage/30 bg-sage/15 px-4 py-3 text-sm text-navy">
        Saved successfully.
      </div>
    )
  }
  return null
}

export function AdminFlash() {
  return (
    <Suspense fallback={null}>
      <FlashInner />
    </Suspense>
  )
}
