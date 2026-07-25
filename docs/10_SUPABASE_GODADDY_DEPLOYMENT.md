# Supabase and GoDaddy deployment

## What is already prepared

- The browser client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Local-only secrets are ignored by Git.
- `supabase/migrations/20260724000100_create_player_progress.sql` creates a protected per-user progress table.
- Row-level security restricts every progress row to its authenticated owner.

## Connect a Supabase project

1. Create a project in the Supabase dashboard.
2. Copy `.env.example` to `.env.local`.
3. Add the project URL and publishable key. Never place a service-role key in this Vite app.
4. Install the Supabase CLI and authenticate:

   ```powershell
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

5. Enable the desired sign-in method under Supabase Authentication.
6. Add the production website URL and local development URL to the authentication redirect allow-list.

## Publish the website

Run:

```powershell
npm.cmd run build
```

The deployable static site is produced in `dist/`.

If the GoDaddy plan includes cPanel/static hosting, upload the contents of `dist/` to the domain's document root and configure SPA fallback to `index.html`.

For a managed static host such as Vercel, Netlify, or Cloudflare Pages, deploy this repository with:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: the two `VITE_SUPABASE_*` values

Then connect the GoDaddy-owned domain by copying the host's exact DNS records into GoDaddy DNS. Usually this is a CNAME for `www` plus an A, ALIAS, or flattened CNAME record for the root domain. Use only the values supplied by the selected host.

## Final live-link checklist

- Supabase project reference and publishable key configured on the hosting platform.
- Database migration pushed successfully.
- Authentication redirect URLs include the final HTTPS domain.
- GoDaddy DNS records point to the chosen web host.
- HTTPS certificate is active.
- Refreshing a nested app URL returns `index.html`.
- Progress remains isolated between two test accounts.
