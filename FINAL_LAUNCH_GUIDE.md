# VOY 2026 — Final deployment guide

## What this version does

- Retains the clean public homepage, genuine Abuyog outreach photos, official AMiCUS chart, public volunteer registration link, and separate Pharmacy and Business sponsorship pages.
- Personalized donor links retain reply, proof submission, GoTyme QR, and post-verification donation acknowledgments.
- Sponsors can click **Download Official Letter (PDF)**. A Supabase Edge Function builds an addressed PDF using the registered recipient, letter category, control number and **four approved signature images from a private Supabase Storage bucket**.
- No individual signed PDF upload is required. **The four authorized signature PNGs must be installed privately ONCE** before downloads work.

## 1. Website update (GitHub Pages)

Upload the contents of this `amicus-outreach-portal` folder to `amicusupm/VOY-2026` (not the parent folder). Keep GitHub Actions variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Your `/.github/workflows/deploy.yml` builds the Vite site and publishes `dist`.

## 2. Supabase private signature storage

In Supabase > SQL Editor, run `supabase/SIGNATURES_PRIVATE_SETUP.sql` once. It creates the private bucket `official-signatures-private`. In Supabase > Storage, open the bucket and upload four approved PNGs with these exact filenames:

- `cheribelle.png`
- `diadem.png`
- `pastor-monsales.png`
- `dr-jaya.png`

**Never add these PNGs to your GitHub repository or `public/assets`, and never mark the bucket public.** Make sure the cropped signature PNGs contain ONLY the handwriting, with no printed name text. The photographed letter supplied earlier contains handwriting overlapping printed text; the separate draft cutouts are therefore **not publication-ready** and must be visually cleaned/approved before use. A good original signature scan is preferable.

## 3. Deploy the PDF generator Edge Function

The website is on GitHub Pages, but secure signature rendering requires a server-side Supabase Edge Function. GitHub Pages alone cannot protect signature image files.

Install the Supabase CLI locally (or use its deployment integration), authenticate to your Supabase project, then from the project root run:

```bash
supabase login
supabase link --project-ref YOUR_SUPABASE_PROJECT_REF
supabase functions deploy generate-letter --no-verify-jwt
```

The function is in `supabase/functions/generate-letter/index.ts`. It uses Supabase's automatically provided `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` **only on the server**. Do not place either service-role key in Vite variables or in GitHub source code. The function validates the UUID sponsor token, checks that the solicitation has been marked **Sent** (or later), and downloads the four signature images privately.

Because the token link is a bearer credential, recipients can forward it. Anyone with a valid issued link can download the authorized PDF. Restrict who can issue/approve letters and do not send links for drafts. Add rate limiting / CAPTCHA or gateway abuse protection before public campaign-wide distribution.

## 4. Test before sending real letters

1. In Officer Portal create a sample Pharmacy solicitation and save it.
2. Set status to **Sent** only after the letter is approved by your organizing committee/signatories.
3. Copy the sponsor link; open privately in a different browser.
4. Click **Download Official Letter (PDF)**. Confirm recipient, address, request type, control number, every signature image, and page layout.
5. Test **Reply / Donate** with a fake proof submission, then have the treasurer verify it using the existing dashboard. Only the verified entry should generate an acknowledgment, not a BIR official receipt.
6. Check responsive homepage, separate Pharmacy/Business pages, original photo gallery, volunteer form, and organizational chart.

## Notes

- The generated PDF uses a concise standard outreach letter based on the provided project documents; it is not a pixel-identical recreation of the scanned 12 October original.
- This setup **does not change existing table schemas**, and does not require running the earlier broken `position text` migration. It only adds a private signatures bucket.
- Publishing this website does not itself deploy the Edge Function or install the signature images.
- Obtain organizational permission for the continued automated reuse of all four signatures on recipient-specific letters. Store clear approved versions of those signatures privately.
