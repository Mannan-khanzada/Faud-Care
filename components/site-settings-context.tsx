'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { SiteSettings } from '@/lib/site-config'

const SiteSettingsContext = createContext<SiteSettings | null>(null)

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings
  children: ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

/**
 * Live site settings (booking, WhatsApp, contact, social) as configured in
 * /admin/settings. Must be used inside SiteSettingsProvider, which wraps the
 * whole public site in app/(site)/layout.tsx.
 */
export function useSiteSettings(): SiteSettings {
  const settings = useContext(SiteSettingsContext)
  if (!settings) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  }
  return settings
}
