import Link from 'next/link'
import { getPageContent, contentFields, contentGroups, type ContentGroup } from '@/lib/content/page-content'
import { hasSupabaseEnv } from '@/lib/supabase/server'
import { Field, TextInput, TextArea, ImageField, SubmitButton } from '@/components/admin/admin-fields'
import { saveContent } from './actions'

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>
}) {
  const { group: requested } = await searchParams
  const group: ContentGroup = contentGroups.some((g) => g.id === requested)
    ? (requested as ContentGroup)
    : 'home'
  const meta = contentGroups.find((g) => g.id === group)!
  const content = await getPageContent()
  const fields = contentFields.filter((f) => f.group === group)

  const sections: { name: string; fields: typeof fields }[] = []
  for (const field of fields) {
    const last = sections[sections.length - 1]
    if (last && last.name === field.section) last.fields.push(field)
    else sections.push({ name: field.section, fields: [field] })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Page content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the wording and images used across the site. Clearing a field (or setting it back to the original
          text) restores the default wording.
        </p>
      </div>

      <nav aria-label="Content groups" className="flex flex-wrap gap-2">
        {contentGroups.map((g) => (
          <Link
            key={g.id}
            href={`/admin/content?group=${g.id}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              g.id === group
                ? 'border-sage bg-sage/15 text-navy'
                : 'border-border bg-card text-navy/70 hover:border-sage/50 hover:text-navy'
            }`}
          >
            {g.label}
          </Link>
        ))}
      </nav>

      <p className="text-sm text-muted-foreground">{meta.description}</p>

      {!hasSupabaseEnv() && (
        <p className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          Supabase isn&apos;t connected yet, so changes here can&apos;t be saved.
        </p>
      )}

      <form action={saveContent.bind(null, group)} className="flex max-w-2xl flex-col gap-8">
        {sections.map((section) => (
          <fieldset key={section.name} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
            <legend className="px-2 font-heading text-lg text-navy">{section.name}</legend>
            {section.fields.map((field) => {
              const value = content.text(field.key)
              const hint =
                field.hint ??
                (field.type === 'list' ? 'One per line' : field.type === 'pairs' ? 'One per line: Title | Description' : undefined)

              if (field.type === 'image') {
                return <ImageField key={field.key} label={field.label} name={field.key} defaultValue={value} />
              }
              return (
                <Field key={field.key} label={field.label} hint={hint}>
                  {field.type === 'text' ? (
                    <TextInput name={field.key} defaultValue={value} />
                  ) : (
                    <TextArea
                      name={field.key}
                      defaultValue={value}
                      rows={field.type === 'textarea' ? 4 : 7}
                    />
                  )}
                </Field>
              )
            })}
          </fieldset>
        ))}
        <SubmitButton className="w-fit" disabled={!hasSupabaseEnv()}>
          Save {meta.label.toLowerCase()}
        </SubmitButton>
      </form>
    </div>
  )
}
