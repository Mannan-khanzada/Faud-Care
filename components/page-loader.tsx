'use client'

import { useEffect, useState } from 'react'
import { LogoMark } from './logo'

/**
 * Branded page loader on the Soft Ivory background with the FUAD logo centred.
 * Minimal and fast: it fades away shortly after mount and never blocks the
 * user. Shows only once per browser session and respects reduced motion.
 */
export function PageLoader() {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.setAttribute('data-hydrated', '1')

    if (sessionStorage.getItem('fuad_loaded') === '1') {
      setRemove(true)
      return
    }

    setMounted(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const holdFor = reduce ? 150 : 650

    const hideTimer = window.setTimeout(() => setHidden(true), holdFor)
    const removeTimer = window.setTimeout(() => {
      setRemove(true)
      sessionStorage.setItem('fuad_loaded', '1')
    }, holdFor + 500)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (remove) return null

  return (
    <div
      aria-hidden="true"
      className="fuad-loader fixed inset-0 z-[100] flex items-center justify-center bg-ivory transition-opacity duration-500 ease-out"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div
        className="flex flex-col items-center gap-6 transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        <LogoMark height={30} tone="navy" />
        <span className="relative h-px w-16 overflow-hidden rounded-full bg-sage/25">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[loaderSlide_1.1s_ease-in-out_infinite] rounded-full bg-sage" />
        </span>
      </div>

      <style>{`
        @keyframes loaderSlide {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(360%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[loaderSlide_1\\.1s_ease-in-out_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  )
}
