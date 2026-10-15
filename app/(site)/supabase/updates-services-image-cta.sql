-- Run ONCE in Supabase SQL Editor (safe to re-run). Adds an image and a button text to services.

-- ---------- services: image + button text (admin parity with the change document) ----------
alter table public.services add column if not exists image_url text not null default '';
alter table public.services add column if not exists cta_label text not null default '';

notify pgrst, 'reload schema';
