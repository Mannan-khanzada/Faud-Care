-- FUAD: safe repair script. Run the WHOLE thing once in Supabase -> SQL Editor.
-- It is idempotent: creates missing tables, adds missing columns, resets policies,
-- and refreshes the API schema cache. It never deletes your data.

create extension if not exists "pgcrypto";

-- ---------- testimonials ----------
create table if not exists public.testimonials (id uuid primary key default gen_random_uuid());
alter table public.testimonials add column if not exists quote text not null default '';
alter table public.testimonials add column if not exists attribution text not null default '';
alter table public.testimonials add column if not exists published boolean not null default false;
alter table public.testimonials add column if not exists sort_order integer not null default 0;
alter table public.testimonials add column if not exists created_at timestamptz not null default now();
alter table public.testimonials enable row level security;
drop policy if exists "public can read published testimonials" on public.testimonials;
drop policy if exists "authenticated can manage testimonials" on public.testimonials;
create policy "public can read published testimonials" on public.testimonials for select using (published = true or auth.uid() is not null);
create policy "authenticated can manage testimonials" on public.testimonials for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- faqs ----------
create table if not exists public.faqs (id text primary key);
alter table public.faqs add column if not exists question text not null default '';
alter table public.faqs add column if not exists answer text not null default '';
alter table public.faqs add column if not exists published boolean not null default true;
alter table public.faqs add column if not exists sort_order integer not null default 0;
alter table public.faqs add column if not exists created_at timestamptz not null default now();
alter table public.faqs enable row level security;
drop policy if exists "public can read published faqs" on public.faqs;
drop policy if exists "authenticated can manage faqs" on public.faqs;
create policy "public can read published faqs" on public.faqs for select using (published = true or auth.uid() is not null);
create policy "authenticated can manage faqs" on public.faqs for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- counsellors ----------
create table if not exists public.counsellors (slug text primary key);
alter table public.counsellors add column if not exists name text not null default '';
alter table public.counsellors add column if not exists title text not null default '';
alter table public.counsellors add column if not exists short_bio text not null default '';
alter table public.counsellors add column if not exists full_bio text not null default '';
alter table public.counsellors add column if not exists qualifications text[] not null default '{}';
alter table public.counsellors add column if not exists certifications text[] not null default '{}';
alter table public.counsellors add column if not exists experience text not null default '';
alter table public.counsellors add column if not exists areas text[] not null default '{}';
alter table public.counsellors add column if not exists specialties text[] not null default '{}';
alter table public.counsellors add column if not exists languages text[] not null default '{}';
alter table public.counsellors add column if not exists approach text not null default '';
alter table public.counsellors add column if not exists session_format text not null default '';
alter table public.counsellors add column if not exists fee text not null default '';
alter table public.counsellors add column if not exists booking_url text;
alter table public.counsellors add column if not exists photo text not null default '/counsellor-placeholder.png';
alter table public.counsellors add column if not exists published boolean not null default true;
alter table public.counsellors add column if not exists sort_order integer not null default 0;
alter table public.counsellors add column if not exists created_at timestamptz not null default now();
alter table public.counsellors enable row level security;
drop policy if exists "public can read published counsellors" on public.counsellors;
drop policy if exists "authenticated can manage counsellors" on public.counsellors;
create policy "public can read published counsellors" on public.counsellors for select using (published = true or auth.uid() is not null);
create policy "authenticated can manage counsellors" on public.counsellors for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- services ----------
create table if not exists public.services (slug text primary key);
alter table public.services add column if not exists title text not null default '';
alter table public.services add column if not exists summary text not null default '';
alter table public.services add column if not exists intro text not null default '';
alter table public.services add column if not exists supports text[] not null default '{}';
alter table public.services add column if not exists concerns text[] not null default '{}';
alter table public.services add column if not exists involves text[] not null default '{}';
alter table public.services add column if not exists expect text[] not null default '{}';
alter table public.services add column if not exists related text[] not null default '{}';
alter table public.services add column if not exists counsellors text[] not null default '{}';
alter table public.services add column if not exists booking_url text;
alter table public.services add column if not exists published boolean not null default true;
alter table public.services add column if not exists sort_order integer not null default 0;
alter table public.services add column if not exists created_at timestamptz not null default now();
alter table public.services enable row level security;
drop policy if exists "public can read published services" on public.services;
drop policy if exists "authenticated can manage services" on public.services;
create policy "public can read published services" on public.services for select using (published = true or auth.uid() is not null);
create policy "authenticated can manage services" on public.services for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- site_settings ----------
create table if not exists public.site_settings (id boolean primary key default true);
alter table public.site_settings add column if not exists name text not null default 'FUAD';
alter table public.site_settings add column if not exists domain text not null default 'FUAD.care';
alter table public.site_settings add column if not exists url text not null default 'https://fuad.care';
alter table public.site_settings add column if not exists tagline text not null default '';
alter table public.site_settings add column if not exists description text not null default '';
alter table public.site_settings add column if not exists booking_enabled boolean not null default true;
alter table public.site_settings add column if not exists booking_global_url text not null default '';
alter table public.site_settings add column if not exists booking_button_label text not null default 'Book a Session';
alter table public.site_settings add column if not exists whatsapp_number text not null default '';
alter table public.site_settings add column if not exists whatsapp_display_number text not null default '';
alter table public.site_settings add column if not exists contact_email text not null default '';
alter table public.site_settings add column if not exists contact_location text not null default '';
alter table public.site_settings add column if not exists contact_hours text not null default '';
alter table public.site_settings add column if not exists social_instagram text not null default '';
alter table public.site_settings add column if not exists social_facebook text not null default '';
alter table public.site_settings add column if not exists social_linkedin text not null default '';
alter table public.site_settings add column if not exists updated_at timestamptz not null default now();
alter table public.site_settings enable row level security;
drop policy if exists "public can read published site_settings" on public.site_settings;
drop policy if exists "authenticated can manage site_settings" on public.site_settings;
drop policy if exists "public can read site settings" on public.site_settings;
drop policy if exists "authenticated can manage site settings" on public.site_settings;
create policy "public can read site settings" on public.site_settings for select using (true);
create policy "authenticated can manage site settings" on public.site_settings for all using (auth.uid() is not null) with check (auth.uid() is not null);

insert into public.site_settings (id) values (true) on conflict (id) do nothing;

-- Refresh Supabase API schema cache so new tables/columns are visible immediately.
notify pgrst, 'reload schema';
