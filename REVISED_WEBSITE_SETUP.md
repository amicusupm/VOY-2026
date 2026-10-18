# VOY 2026 · Pharmacy and Business Sponsorship Edition

## What changed
- Public homepage links to two dedicated sponsor information pages: `?page=pharmacy` and `?page=business`.
- The **New solicitation** form now has a **Solicitation category** dropdown: General, Pharmacy, Business.
- The unique personalized link (`?sponsor=<token>`) chooses the appropriate letter wording based on that category.
- Digital letters show the organizer names and **Noted by** names in text, along with an explicit unsigned-document notice. The Print option prints an **unsigned** copy. No handwritten signatures or digitally forged endorsements are included.
- Existing original Abuyog outreach photos are kept. No generated photos were included. Logos remain centralized on the public site.

## Deployment into existing GitHub Pages repo
1. Extract the zip and copy the **contents** of `amicus-outreach-portal/` to the **root** of your `amicusupm/VOY-2026` repository. Preserve `.github/workflows/deploy.yml` and existing GitHub Actions variables.
2. In Supabase → SQL Editor, run `supabase/SPONSOR_CATEGORIES_MIGRATION.sql` **after** your original Supabase schema and personalized-link setup. It adds the category field and updates the public RPC. Do not rerun initial schema if you already have live records.
3. In GitHub → Settings → Secrets and variables → Actions → Variables, verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present. Only use the browser-safe anon/publishable key, never `service_role`.
4. Under Settings → Pages, keep **GitHub Actions** selected. Push/commit to `main`, and verify a successful workflow before sharing links.
5. Test logging in as an officer; create General, Pharmacy and Business example requests; verify each personalized URL. Verify the request data displayed is appropriate for public link sharing.

## Signed official letters
The web portal **does not** host or automatically insert handwritten signatures. Signed PDFs must first be approved by each signatory and distributed separately through an access-controlled channel. Because a personalized link is viewable by whoever has the token, do not put sensitive personal or donor information in public request fields. For signed PDFs, use the 'Contact the organizers' link to request an authorized copy.

## Image use
Original photos from Abuyog outreach are included; obtain permission to publish images of children or identifiable participants before publishing them publicly.
