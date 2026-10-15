/**
 * Turns whatever the database hands back into a clean string[].
 *
 * Supabase should return `text[]` columns as real arrays, but if a column was
 * created with a different type (text / jsonb) or holds null, the raw value is
 * a string or null and calling `.some()` / `.map()` on it crashes the build.
 * This accepts: arrays, null/undefined, JSON arrays ("[\"a\",\"b\"]"),
 * Postgres array literals ("{a,b}") and plain newline-separated text.
 */
export function toList(value: unknown): string[] {
  if (value == null) return []

  if (Array.isArray(value)) {
    return value
      .map((v) => (v == null ? '' : String(v).trim()))
      .filter(Boolean)
  }

  if (typeof value !== 'string') return []
  const text = value.trim()
  if (!text) return []

  // JSON array
  if (text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) return toList(parsed)
    } catch {
      /* fall through */
    }
  }

  // Postgres array literal: {a,"b, c",d}
  if (text.startsWith('{') && text.endsWith('}')) {
    const inner = text.slice(1, -1)
    const items = inner.match(/"((?:[^"\\]|\\.)*)"|[^,]+/g) ?? []
    return items
      .map((s) => s.trim().replace(/^"|"$/g, '').replace(/\\(.)/g, '$1'))
      .filter((s) => s && s !== 'NULL')
  }

  // Plain text: one item per line
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Null-safe string. */
export function toStr(value: unknown, fallback = ''): string {
  return value == null ? fallback : String(value)
}
