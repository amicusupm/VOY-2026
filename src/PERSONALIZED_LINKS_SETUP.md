# Personalized donor links — VOY 2026

## Hosting
The site deploys to GitHub Pages under https://amicusupm.github.io/VOY-2026/ . GitHub Pages hosts the static site only; Supabase provides authentication, records, and the private-to-public token lookup.

## Configure
1. Create or open your Supabase project and run `supabase/schema.sql` for a new database, OR run **only** `supabase/PERSONALIZED_LINKS_MIGRATION.sql` for an existing database previously created from the earlier schema. The latter avoids re-creating old policies.
2. Disable public sign-ups; invite authorized officers through Supabase Auth. Assign admin/treasurer roles as described in README.
3. In the GitHub repository, go to Settings → Secrets and variables → Actions → **Variables**. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Supabase publishable/anon key, **never** service role key). Re-run Actions deployment.
4. Each officer signs in, chooses **New solicitation**, fills recipient name, position, company, requested support and officer-in-charge, and saves.
5. In **Letter registry**, choose **Copy link**. Example `https://amicusupm.github.io/VOY-2026/?sponsor=<unguessable-UUID>` (the actual UUID comes from Supabase).
6. Send that URL privately to the sponsor. The sponsor sees a personalized public letter; no login needed. The link reveals only recipient name, position, organization, requested support and control number, not address, email, financial ledger or officer records.

## Data protection
Treat possession of a link as permission to view its addressed request. Do not insert sensitive personal or financial data in the requested-support field. Links are intended to be shared privately, not posted publicly. They are *not* one-time links, and forwarding allows others to view them. Revocation currently requires admin to rotate `public_token` in Supabase; the backend does not include a self-service revocation button. Do not display unapproved signer images or publish bank instructions without confirmation. Public donation records require treasurer verification; digital sponsor pages are not official receipts.

## Deployment note
Deploy via GitHub Actions. `vite.config.js` uses a relative base, so it works under `/VOY-2026/`. All images now use `import.meta.env.BASE_URL` for GitHub Pages paths.
