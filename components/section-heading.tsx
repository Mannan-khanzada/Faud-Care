import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h2' | 'h1'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const Title = as
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-sage">
          <span className="h-px w-6 bg-sage/60" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Title className="text-pretty text-3xl leading-tight text-navy sm:text-4xl">
        {title}
      </Title>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
