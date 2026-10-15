import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Shared link-styled call-to-action used by BookingButton, WhatsAppButton and
 * inline CTAs. Anchor-first so it works for external booking / WhatsApp links.
 */
export const ctaVariants = cva(
  'group inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Sage — primary conversion action
        primary:
          'bg-sage text-ivory shadow-sm hover:bg-sage/90 hover:shadow-md active:translate-y-px',
        // Navy — strong action on light sections
        navy: 'bg-navy text-ivory hover:bg-navy/90 active:translate-y-px',
        // Outline on ivory/light backgrounds
        outline:
          'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-ivory',
        // Outline on navy/dark backgrounds
        outlineLight:
          'border border-ivory/30 text-ivory hover:bg-ivory hover:text-navy',
        // Quiet text link
        ghost: 'text-navy hover:text-sage',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-7 text-sm',
        lg: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type CtaVariantProps = VariantProps<typeof ctaVariants>
