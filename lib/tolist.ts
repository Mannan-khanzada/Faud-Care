
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