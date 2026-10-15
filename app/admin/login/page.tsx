import type { Metadata } from 'next'
import { hasSupabaseEnv } from '@/lib/supabase/server'
import { LogoMark } from '@/components/logo'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const configured = hasSupabaseEnv()

  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary/30 px-5 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <LogoMark height={24} />
          <h1 className="font-heading text-xl text-navy">Admin</h1>
        </div>

        {configured ? (
          <LoginForm />
        ) : (
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The admin panel isn&apos;t connected to a database yet. To set it
              up:
            </p>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>Create a free project at supabase.com.</li>
              <li>
                Run <code className="rounded bg-muted px-1 py-0.5 text-xs">supabase/schema.sql</code>{' '}
                then <code className="rounded bg-muted px-1 py-0.5 text-xs">supabase/seed.sql</code>,{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">supabase/updates-fuad-changes.sql</code> and{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">supabase/updates-services-image-cta.sql</code>{' '}
                in its SQL editor.
              </li>
              <li>
                Copy your Project URL and anon key into{' '}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>{' '}
                (see <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code>).
              </li>
              <li>
                Create your login under Authentication → Users in the
                Supabase dashboard.
              </li>
              <li>Restart the app and reload this page.</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
