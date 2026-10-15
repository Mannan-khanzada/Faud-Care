// FUAD site sync checker.
// Run from the project root:   node check-sync.mjs
// It compares your project files with the latest version and lists what is
// MISSING or OUTDATED. It only reads files — it never changes anything.
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const manifest = {
 "app/(site)/about/page.tsx": "ca03cbb7fcee",
 "app/(site)/contact/page.tsx": "dd11d3273bfd",
 "app/(site)/counsellors/[slug]/page.tsx": "b11a1017bb42",
 "app/(site)/counsellors/page.tsx": "a1a5a66584a1",
 "app/(site)/events/page.tsx": "199893d25b0e",
 "app/(site)/faqs/page.tsx": "9fb78e402de4",
 "app/(site)/layout.tsx": "740b3a37de9d",
 "app/(site)/page.tsx": "4f71e0ef8b7d",
 "app/(site)/privacy/page.tsx": "531a46315b5f",
 "app/(site)/services/[slug]/page.tsx": "eac01169b052",
 "app/(site)/services/page.tsx": "2c9418b566bd",
 "app/(site)/support/page.tsx": "c55925b83ae7",
 "app/(site)/testimonials/page.tsx": "550d7f474cb1",
 "app/admin/(dashboard)/content/actions.ts": "094bcd72f8e3",
 "app/admin/(dashboard)/content/page.tsx": "a5ed01fa21b8",
 "app/admin/(dashboard)/counsellors/[slug]/page.tsx": "7f208693b3e0",
 "app/admin/(dashboard)/counsellors/actions.ts": "220ce1ea0639",
 "app/admin/(dashboard)/counsellors/counsellor-form-fields.tsx": "029fae1a9436",
 "app/admin/(dashboard)/counsellors/new/page.tsx": "5e658de219c7",
 "app/admin/(dashboard)/counsellors/page.tsx": "57de9965d734",
 "app/admin/(dashboard)/event-categories/[id]/page.tsx": "25da4aa36dfe",
 "app/admin/(dashboard)/event-categories/actions.ts": "23af292282c6",
 "app/admin/(dashboard)/event-categories/page.tsx": "97367b502c86",
 "app/admin/(dashboard)/events/[id]/page.tsx": "adb53a109ec3",
 "app/admin/(dashboard)/events/actions.ts": "2e629f65af8b",
 "app/admin/(dashboard)/events/event-form-fields.tsx": "2e3287ec8fe7",
 "app/admin/(dashboard)/events/new/page.tsx": "b05e5f229e25",
 "app/admin/(dashboard)/events/page.tsx": "ef55e886242f",
 "app/admin/(dashboard)/faqs/[id]/page.tsx": "f0f9a089ff62",
 "app/admin/(dashboard)/faqs/actions.ts": "bc6a1ac42a56",
 "app/admin/(dashboard)/faqs/new/page.tsx": "76cb7acadd29",
 "app/admin/(dashboard)/faqs/page.tsx": "4c69c9326b85",
 "app/admin/(dashboard)/layout.tsx": "abda5cc55e0d",
 "app/admin/(dashboard)/page.tsx": "503f88fd869c",
 "app/admin/(dashboard)/services/[slug]/page.tsx": "b72ff91aea28",
 "app/admin/(dashboard)/services/actions.ts": "3d404c3f8d1f",
 "app/admin/(dashboard)/services/new/page.tsx": "d23355966d6d",
 "app/admin/(dashboard)/services/page.tsx": "f7ecb6643ff1",
 "app/admin/(dashboard)/services/service-form-fields.tsx": "cb8c89100f94",
 "app/admin/(dashboard)/settings/actions.ts": "b530c8431b69",
 "app/admin/(dashboard)/settings/page.tsx": "c43659610228",
 "app/admin/(dashboard)/support/[id]/page.tsx": "7c8853620980",
 "app/admin/(dashboard)/support/actions.ts": "9a52f37916fa",
 "app/admin/(dashboard)/support/new/page.tsx": "bf38ec61c468",
 "app/admin/(dashboard)/support/package-form-fields.tsx": "d0d8a7c64271",
 "app/admin/(dashboard)/support/page.tsx": "29c87388e339",
 "app/admin/(dashboard)/testimonials/[id]/page.tsx": "93871eb04558",
 "app/admin/(dashboard)/testimonials/actions.ts": "56979edc0bbd",
 "app/admin/(dashboard)/testimonials/new/page.tsx": "3d9d3b4fed24",
 "app/admin/(dashboard)/testimonials/page.tsx": "3e737ab0680a",
 "app/admin/login/login-form.tsx": "e97c06477671",
 "app/admin/login/page.tsx": "8d59c440b08f",
 "app/globals.css": "82655f78bb83",
 "app/layout.tsx": "21008c3583af",
 "app/not-found.tsx": "2bcc2e78c192",
 "app/robots.ts": "8eff9771d660",
 "app/sitemap.ts": "2c1a88880286",
 "components/Testimonials.tsx": "1f07b0dc8131",
 "components/admin/admin-fields.tsx": "48a62afadf68",
 "components/admin/admin-nav.tsx": "a60badf63f96",
 "components/admin/admin-shell.tsx": "7e596521b70f",
 "components/admin/flash.tsx": "3d9990a9ad66",
 "components/admin/sign-out-button.tsx": "e1245f897be1",
 "components/booking-button.tsx": "bb59c2cdeac1",
 "components/counsellor-card.tsx": "b244ed669c90",
 "components/counsellor-list.tsx": "6f1fad266ef1",
 "components/cta-section.tsx": "a42c89b1eaf6",
 "components/empty-state.tsx": "45c9e9cce007",
 "components/events/events-browser.tsx": "b2c33fc5125e",
 "components/faq-accordion.tsx": "08f46d571a74",
 "components/floating-whatsapp.tsx": "6dbd269d32f9",
 "components/home/approach-section.tsx": "546e058c7e56",
 "components/home/counsellors-section.tsx": "f63e59d56cc0",
 "components/home/events-teaser.tsx": "987b3ac59073",
 "components/home/faqs-preview.tsx": "3be065fed3f4",
 "components/home/hero.tsx": "1cff249a0a63",
 "components/home/intro.tsx": "f00258eb7777",
 "components/home/process-section.tsx": "f7416f995f89",
 "components/home/services-section.tsx": "844475171dc9",
 "components/home/support-teaser.tsx": "ee465d4a769e",
 "components/home/why-section.tsx": "697d85506d86",
 "components/logo.tsx": "7f3245d3737b",
 "components/page-hero.tsx": "7724533a03b2",
 "components/page-loader.tsx": "91e06918a6a9",
 "components/reveal.tsx": "d803e9d125c4",
 "components/section-heading.tsx": "84950fb7e55b",
 "components/seo-schema.tsx": "7bb2d4acb84e",
 "components/service-card.tsx": "1fc8828d98ca",
 "components/site-footer.tsx": "69dda0d4ce68",
 "components/site-header.tsx": "549ceb2f287d",
 "components/site-settings-context.tsx": "222c6eeeb6a1",
 "components/social-icon.tsx": "80e7d823fe5a",
 "components/support/package-card.tsx": "95265b161faf",
 "components/testimonials-section.tsx": "a2ad63f0ff97",
 "components/ui/button.tsx": "f2cdb510672b",
 "components/ui/cta.tsx": "1f676fc907f5",
 "components/whatsapp-button.tsx": "ff4535653bf1",
 "lib/admin/auth.ts": "f5febd1dcaf1",
 "lib/admin/reorder.ts": "91380f6caeee",
 "lib/admin/upload.ts": "90d55be22de3",
 "lib/booking.ts": "7c1b2d23891d",
 "lib/content/counsellors.ts": "5ec658cd067f",
 "lib/content/events.ts": "d02847c205a9",
 "lib/content/faqs.ts": "e25f7b7019c5",
 "lib/content/homepage.ts": "da18705ea5ee",
 "lib/content/page-content.ts": "27f96fa5e191",
 "lib/content/services.ts": "0fc06fd9102f",
 "lib/content/support.ts": "39ab8ddb25c9",
 "lib/content/testimonials.ts": "0bc69b9b079e",
 "lib/site-config.ts": "3e02b3132794",
 "lib/site-settings.server.ts": "a45be66717ae",
 "lib/supabase/client.ts": "8656bcef5d9c",
 "lib/supabase/middleware.ts": "0d17faba5f49",
 "lib/supabase/server.ts": "20d66375fd0c",
 "lib/to-list.ts": "0ef0f19ca633",
 "lib/utils.ts": "6ed53d5424ed",
 "lib/whatsapp.ts": "5d6d37a9e125",
 "middleware.ts": "e20e202b4fb0",
 "next.config.mjs": "638944812f7e",
 "postcss.config.mjs": "0092c0dd0655",
 "supabase/repair.sql": "acda85cc20e2",
 "supabase/schema.sql": "b77dada4d086",
 "supabase/seed.sql": "980a3caf695b",
 "supabase/updates-fuad-changes.sql": "0aa8f7750562",
 "supabase/updates-services-image-cta.sql": "9ce8dc2c4367"
}

const missing = []
const outdated = []
for (const [path, expected] of Object.entries(manifest)) {
  if (!existsSync(path)) { missing.push(path); continue }
  const text = readFileSync(path).toString('utf8').replace(/\r\n/g, '\n')
  const hash = createHash('sha1').update(text, 'utf8').digest('hex').slice(0, 12)
  if (hash !== expected) outdated.push(path)
}

const lines = []
lines.push(`Checked ${Object.keys(manifest).length} files.`)
lines.push(`MISSING:  ${missing.length}`)
lines.push(`OUTDATED: ${outdated.length}`)
if (missing.length) { lines.push('', '--- MISSING (copy these from the latest zip) ---', ...missing) }
if (outdated.length) { lines.push('', '--- OUTDATED (overwrite these from the latest zip) ---', ...outdated) }
if (!missing.length && !outdated.length) lines.push('', 'All files match the latest version.')
const report = lines.join('\n')
console.log(report)
writeFileSync('sync-report.txt', report)
console.log('\nThis report was also saved to sync-report.txt')
