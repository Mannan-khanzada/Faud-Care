'use client'

import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Faq } from '@/lib/content/faqs'

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  const baseId = useId()

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((faq) => {
        const isOpen = open === faq.id
        const panelId = `${baseId}-${faq.id}`
        return (
          <div key={faq.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-pretty text-lg font-medium text-navy">
                  {faq.question}
                </span>
                <Plus
                  className={cn(
                    'size-5 shrink-0 text-sage transition-transform duration-300',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn(
                'grid overflow-hidden transition-all duration-300 ease-out',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0">
                <p className="max-w-2xl pb-6 text-pretty leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
