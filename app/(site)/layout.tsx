import { getSiteSettings } from '@/lib/site-settings.server'
import { SiteSettingsProvider } from '@/components/site-settings-context'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'

// Public pages are static + revalidated hourly (and on every admin edit via revalidatePath).
export const revalidate = 3600

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  return (
    <SiteSettingsProvider settings={settings}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
    </SiteSettingsProvider>
  )
}
