-- FUAD admin schema
-- Run this once in your Supabase project's SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- After running this:
--   1. Go to Authentication -> Users -> Add user, create your own admin
--      login (email + password). Anyone who can sign in can manage content;
--      there is no separate "role" system in this v1, so only create
--      accounts for people you trust with full site control.
--   2. Copy the Project URL and anon public key (Settings -> API) into
--      .env.local (see .env.example).
--   3. Log in at /admin/login.

create extension if not exists "pgcrypto";

-- ---------- testimonials ----------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  attribution text not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "public can read published testimonials"
  on public.testimonials for select
  using (published = true or auth.uid() is not null);

create policy "authenticated can manage testimonials"
  on public.testimonials for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ---------- faqs ----------
create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.faqs enable row level security;

create policy "public can read published faqs"
  on public.faqs for select
  using (published = true or auth.uid() is not null);

create policy "authenticated can manage faqs"
  on public.faqs for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ---------- counsellors ----------
create table if not exists public.counsellors (
  slug text primary key,
  name text not null,
  title text not null default '',
  short_bio text not null default '',
  full_bio text not null default '',
  qualifications text[] not null default '{}',
  certifications text[] not null default '{}',
  experience text not null default '',
  areas text[] not null default '{}',
  specialties text[] not null default '{}',
  languages text[] not null default '{}',
  approach text not null default '',
  session_format text not null default '',
  fee text not null default '',
  booking_url text,
  photo text not null default '/counsellor-placeholder.png',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.counsellors enable row level security;

create policy "public can read published counsellors"
  on public.counsellors for select
  using (published = true or auth.uid() is not null);

create policy "authenticated can manage counsellors"
  on public.counsellors for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ---------- services ----------
create table if not exists public.services (
  slug text primary key,
  title text not null,
  summary text not null default '',
  intro text not null default '',
  supports text[] not null default '{}',
  concerns text[] not null default '{}',
  involves text[] not null default '{}',
  expect text[] not null default '{}',
  related text[] not null default '{}',
  counsellors text[] not null default '{}',
  booking_url text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "public can read published services"
  on public.services for select
  using (published = true or auth.uid() is not null);

create policy "authenticated can manage services"
  on public.services for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ---------- site settings (single row) ----------
create table if not exists public.site_settings (
  id boolean primary key default true constraint single_row check (id),
  name text not null default 'FUAD',
  domain text not null default 'FUAD.care',
  url text not null default 'https://fuad.care',
  tagline text not null default '',
  description text not null default '',
  booking_enabled boolean not null default true,
  booking_global_url text not null default '',
  booking_button_label text not null default 'Book a Session',
  whatsapp_number text not null default '',
  whatsapp_display_number text not null default '',
  contact_email text not null default '',
  contact_location text not null default '',
  contact_hours text not null default '',
  social_instagram text not null default '',
  social_facebook text not null default '',
  social_linkedin text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "public can read site settings"
  on public.site_settings for select
  using (true);

create policy "authenticated can manage site settings"
  on public.site_settings for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

insert into public.site_settings (id) values (true) on conflict (id) do nothing;
