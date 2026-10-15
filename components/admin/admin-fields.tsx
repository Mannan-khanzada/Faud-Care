import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-navy/70">
        {label}
      </span>
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

const fieldClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20'

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldClass, props.className)} />
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} className={cn(fieldClass, 'min-h-24 resize-y', props.className)} />
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(fieldClass, props.className)}>
      {children}
    </select>
  )
}

/**
 * Image input: shows the current image, accepts a pasted link / path, or an
 * uploaded file (a chosen file takes priority). Pair with resolveImage() in
 * the server action using the same `name`.
 */
export function ImageField({
  label,
  name,
  defaultValue = '',
  hint,
}: {
  label: string
  name: string
  defaultValue?: string
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-navy/70">{label}</span>
      {defaultValue && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={defaultValue}
          alt=""
          className="h-28 w-auto max-w-full self-start rounded-lg border border-border object-cover"
        />
      )}
      <input
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder="Image link or path, e.g. /hero.png"
        className={fieldClass}
      />
      <input
        name={`${name}_file`}
        type="file"
        accept="image/*"
        className="text-sm text-navy file:mr-3 file:rounded-lg file:border-0 file:bg-sage/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sage hover:file:bg-sage/25"
      />
      <span className="text-xs text-muted-foreground">
        {hint ?? 'Choose a file to upload (max 5 MB), or paste a link. A chosen file replaces the link.'}
      </span>
    </div>
  )
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-navy">
      <input
        type="checkbox"
        {...props}
        className="size-4 rounded border-border text-sage focus:ring-sage/30"
      />
      {label}
    </label>
  )
}

export function SubmitButton({
  children,
  variant = 'primary',
  className,
  disabled,
}: {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'destructive'
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-sage text-ivory hover:bg-sage/90',
        variant === 'outline' &&
          'border border-border bg-background text-navy hover:bg-muted',
        variant === 'destructive' &&
          'bg-destructive/10 text-destructive hover:bg-destructive/20',
        className,
      )}
    >
      {children}
    </button>
  )
}
