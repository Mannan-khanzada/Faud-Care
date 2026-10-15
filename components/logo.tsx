import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * SINGLE SOURCE OF TRUTH FOR THE FUAD LOGO.
 *
 * To use the official supplied logo, set LOGO_SRC to its path (e.g.
 * '/fuad-logo.svg' after adding the file to /public). The exact asset is then
 * used everywhere — header, footer, loader, admin, favicon — with no other
 * code changes. When LOGO_SRC is empty a clean wordmark fallback renders so the
 * site is never broken while the asset is being added.
 *
 * The official logo must never be recreated, restyled, recoloured, or
 * distorted — only referenced from this constant.
 */
const LOGO_SRC = '/fuad-logo.png'
const LOGO_SRC_IVORY = '/fuad-logo-ivory.png'
const LOGO_ASPECT = 528 / 138 // width / height of the supplied asset; adjust to match

type LogoProps = {
  /** rendered height in pixels */
  height?: number
  /** wordmark colour when the image asset is not yet set */
  tone?: 'navy' | 'ivory'
  className?: string
  priority?: boolean
}

export function LogoMark({
  height = 34,
  tone = 'navy',
  className,
  priority,
}: LogoProps) {
  if (LOGO_SRC) {
    return (
      <Image
        src={tone === 'ivory' ? LOGO_SRC_IVORY : LOGO_SRC}
        alt="FUAD"
        height={height}
        width={Math.round(height * LOGO_ASPECT)}
        priority={priority}
        className={cn('max-w-none object-contain object-left', className)}
        style={{ height, width: Math.round(height * LOGO_ASPECT) }}
      />
    )
  }

  return (
    <span
      aria-label="FUAD"
      className={cn(
        'font-heading font-medium leading-none tracking-[0.28em]',
        tone === 'ivory' ? 'text-ivory' : 'text-navy',
        className,
      )}
      style={{ fontSize: height * 0.62 }}
    >
      FUAD
    </span>
  )
}

export function LogoLink({
  height = 34,
  tone = 'navy',
  className,
  priority,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="FUAD — home"
      className={cn('inline-flex items-center', className)}
    >
      <LogoMark height={height} tone={tone} priority={priority} />
    </Link>
  )
}
