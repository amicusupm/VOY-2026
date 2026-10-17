# AMiCUS Outreach Portal

**VOY: AWAKEN 2026 × Community Health Outreach and Medical Mission** — public campaign page and private solicitation/donation officer dashboard.

## What is included

- Public-facing, responsive mission page: November 1–7 activities, purpose, and sponsorship guidance.
- Email/password sign-in for invited officers; no public sign-up form.
- Solicitations registry: database-generated unique `VOY26-0001` control number, recipient, designation, company, address, officer-in-charge, dates, follow-up status, notes.
- Contributions: recorded cash pledges, cash received, and in-kind donations, kept distinct.
- Overview metrics, search/filter, Excel-compatible CSV exports, print-to-PDF internal acknowledgments.
- Supabase SQL with Row Level Security: signed-in officers can read records, originating officer/admin can edit letters, treasurer/admin can record contributions; only admin changes roles or deletes solicitations.

## Run locally

Requires Node.js 18+.

```bash
npm install
cp .env.example .env
```

1. Create a Supabase project at https://supabase.com.
2. Open **SQL Editor**, paste/run `supabase/schema.sql` in full (once on a fresh project).
3. Under **Authentication → Providers → Email**, disable public sign-ups / allow new users to sign up. Invite trusted officers from **Authentication → Users → Invite user** (or create a user with a temporary password through the Supabase dashboard).
4. Put project URL and **anon/publishable** key in `.env` (Settings → API Keys). Never use a Supabase `service_role`/secret key in frontend variables.
5. After your own invited user appears in `public.profiles`, run the following in Supabase SQL Editor, replacing the email:

```sql
update public.profiles set role = 'admin' where email = 'admin@example.com';
update public.profiles set role = 'treasurer' where email = 'treasurer@example.com';
```

6. Run:

```bash
npm run dev
```

Visit the local address printed by Vite. Click **Officer portal** to sign in.

## Deploy

### Vercel (easiest, recommended)

1. Push this folder to your own GitHub repository.
2. Import the repository into Vercel (framework preset: Vite).
3. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel project environment variables.
4. Build command: `npm run build`; output folder: `dist`.
5. Deploy and verify sign-in on your public URL.

### GitHub Pages

A GitHub Actions deployment is included at `.github/workflows/deploy.yml`.

1. Push project to GitHub.
2. Under **Settings → Secrets and variables → Actions**, create *repository variables* `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (these are publishable client config, not secret keys).
3. Under **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
4. Push to `main` and Actions will publish the static site.

## Operational notes and safeguards

- This project has **no sample donation figures**; all numbers come from your database.
- Donations are manually recorded. The portal **does not collect payments** or automatically verify deposits.
- "Received" must only be selected by an authorized treasurer after verification. Printouts are **internal acknowledgments**, not official BIR receipts or tax certificates.
- Public visitors cannot read solicitation addresses, contacts, donor details, or financial data. Enforced server-side using RLS, not only through hidden UI.
- Use strong account passwords, remove departed officers from Supabase Auth, and consider enabling MFA and scheduled backups before real-world deployment.
- Confirm partnerships, speaker names, services, venue, payment details, and physician attendance **before publishing**; current public site does not claim unconfirmed services are guaranteed.
- For safer coordination, avoid inputting beneficiary medical data in this solicitation portal.
- It is recommended to avoid including personal home addresses or sensitive donor information unless operationally necessary and permitted.
- Before production: have treasurer/leadership approve financial records, acknowledgment wording, donation handling, and privacy notices. A dedicated audit trail and independent receipt approval process would be sensible future enhancements.

## Future upgrades

QR-linked verification page, uploaded signed letters, actual user assignment picker, detailed audit log, downloadable signed PDF templates, receipts review flow, privacy-policy page, and sponsor contact form (requires email backend and spam controls).
