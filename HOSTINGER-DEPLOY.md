# FUAD Care — Hostinger + GitHub + Google SEO guide

Node.js chahiye: Hostinger **Business Web Hosting / Cloud** ka "Node.js Web App" (ya VPS). Basic shared plan par ye nahi chalta.

## 1. GitHub par push (pehli dafa)
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
`.env` aur `node_modules` / `.next` `.gitignore` mein hain — push nahi honge. (Agar `.env` pehle kabhi push hui thi to Supabase keys rotate kar dein.)

## 2. Hostinger (hPanel)
1. **Websites → Add website → Node.js Apps → Import Git Repository** → repo select karein.
2. Framework **Next.js**, Node **22.x**, Install `npm install`, Build `npm run build`, Start `npm start`.
3. **Environment variables** (build se PEHLE):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://fuad.care`
4. Deploy. Har `git push` to `main` par auto-redeploy hoga.
5. Domain connect + SSL (Force HTTPS) on.

## 3. Supabase
- SQL Editor mein **`supabase/repair.sql`** run karein (poori file, ek baar). Ye missing tables/columns bana deta hai aur schema cache refresh karta hai. Phir `supabase/seed.sql` run karein.
- Agar admin mein "Could not find the ... column/table in the schema cache" aaye to dobara `repair.sql` chalayein.
- Authentication → URL Configuration: Site URL `https://fuad.care`, Redirect `https://fuad.care/**`.
- **Authentication → Sign In / Providers → "Allow new users to sign up" OFF karein.** Warna koi bhi signup karke admin ban sakta hai (RLS "logged-in = admin" maanti hai).
- Admin user Authentication → Users → Add user se khud banayein.

## 4. Google SEO
1. https://search.google.com/search-console → domain add karein (DNS TXT verify).
2. Sitemaps → `sitemap.xml` submit.
3. URL Inspection se `https://fuad.care/` → "Request indexing".
4. Check: `/robots.txt`, `/sitemap.xml`, view-source par `<link rel="canonical">`, og:image, JSON-LD.
5. Admin se Settings mein contact/location/hours/social bharein (local SEO), aur har service/counsellor ki bio unique likhein.
6. Rich Results Test se FAQ schema check karein.

## Agar build/start fail ho
- Node 20.9+ (22 best), 3 env vars set hain?
- Build log copy karke bhej dein.
