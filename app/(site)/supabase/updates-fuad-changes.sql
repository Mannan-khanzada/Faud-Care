-- FUAD website changes — run ONCE in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run again (everything is "if not exists" / "on conflict do nothing").
-- Adds: support packages, event categories, events, editable page content,
-- and an image bucket for uploads from the admin panel.

create extension if not exists "pgcrypto";

-- ---------- support packages ----------
create table if not exists public.support_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_description text not null default '',
  full_description text not null default '',
  duration text not null default '',
  sessions text not null default '',
  features text[] not null default '{}',
  price text not null default '',
  cta_label text not null default 'WhatsApp Chat / Book This Package',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.support_packages enable row level security;
drop policy if exists "public can read active packages" on public.support_packages;
create policy "public can read active packages" on public.support_packages
  for select using (active = true or auth.uid() is not null);
drop policy if exists "authenticated can manage packages" on public.support_packages;
create policy "authenticated can manage packages" on public.support_packages
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- event categories ----------
create table if not exists public.event_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.event_categories enable row level security;
drop policy if exists "public can read active categories" on public.event_categories;
create policy "public can read active categories" on public.event_categories
  for select using (active = true or auth.uid() is not null);
drop policy if exists "authenticated can manage categories" on public.event_categories;
create policy "authenticated can manage categories" on public.event_categories
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- events ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category_id uuid references public.event_categories(id) on delete set null,
  description text not null default '',
  event_date date,
  event_time text not null default '',
  mode text not null default 'online' check (mode in ('online', 'onsite')),
  location text not null default '',
  image_url text not null default '',
  cta_label text not null default 'Register',
  registration_url text not null default '',
  featured boolean not null default false,
  status text not null default 'upcoming' check (status in ('upcoming', 'past')),
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.events enable row level security;
drop policy if exists "public can read published events" on public.events;
create policy "public can read published events" on public.events
  for select using (published = true or auth.uid() is not null);
drop policy if exists "authenticated can manage events" on public.events;
create policy "authenticated can manage events" on public.events
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- editable page content (home / about / support / events ...) ----------
create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "public can read site content" on public.site_content;
create policy "public can read site content" on public.site_content
  for select using (true);
drop policy if exists "authenticated can manage site content" on public.site_content;
create policy "authenticated can manage site content" on public.site_content
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---------- starting data (only if the tables are empty) ----------
insert into public.event_categories (name, slug, sort_order) values
  ('Webinar', 'webinar', 10),
  ('Panel Discussion', 'panel-discussion', 20),
  ('Onsite Event', 'onsite-event', 30),
  ('Awareness Session', 'awareness-session', 40)
on conflict (slug) do nothing;

insert into public.support_packages
  (name, short_description, full_description, duration, sessions, features, price, sort_order)
select * from (values
  ('Basic', 'A gentle starting point for chat-based support.',
   'Placeholder content — final package details are still being confirmed. A short period of chat-based counselling support to help you begin.',
   '1 week', 'Chat support during the week',
   array['Chat-based counselling support','Confidential and compassionate','Spiritually grounded approach']::text[],
   'Price to be confirmed', 10),
  ('Standard', 'Steady, ongoing chat support over a few weeks.',
   'Placeholder content — final package details are still being confirmed. A longer period of chat-based support for working through what is on your mind.',
   '2 weeks', 'Chat support during the period',
   array['Everything in Basic','Longer period of support','Space to explore patterns and relationships']::text[],
   'Price to be confirmed', 20),
  ('Premium', 'Extended chat support with the most time and care.',
   'Placeholder content — final package details are still being confirmed. The fullest level of chat-based support across a longer period.',
   '4 weeks', 'Chat support during the period',
   array['Everything in Standard','Extended period of support','Priority replies during support hours']::text[],
   'Price to be confirmed', 30)
) as v(name, short_description, full_description, duration, sessions, features, price, sort_order)
where not exists (select 1 from public.support_packages);

-- Update the site-wide tagline/description only if they still hold the old defaults.
update public.site_settings
set tagline = 'Online counselling with a spiritual foundation.',
    description = 'FUAD offers accessible, confidential, and compassionate online counselling with a spiritual foundation, supporting emotional wellbeing, relationships, and personal growth.'
where tagline = 'A safe space to understand yourself, heal, and grow.' or tagline = '';

-- ---------- services: image + button text (admin parity with the change document) ----------
alter table public.services add column if not exists image_url text not null default '';
alter table public.services add column if not exists cta_label text not null default '';

-- ---------- image uploads from the admin panel ----------
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public can read media" on storage.objects;
create policy "public can read media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "authenticated can manage media" on storage.objects;
create policy "authenticated can manage media" on storage.objects
  for all using (bucket_id = 'media' and auth.uid() is not null)
  with check (bucket_id = 'media' and auth.uid() is not null);

notify pgrst, 'reload schema';
