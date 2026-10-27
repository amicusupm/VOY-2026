# VOY 2026 Officer Portal patch

## New features
- IMCI registrations tab for admin and treasurer; search, filter, list, attendance marking (Pending/Present/Absent/Excused), notes and CSV export.
- Public donor/support inquiry inbox includes CSV export. Existing sponsor response, donations, pledges, solicitation, forms, branding, schedule, and volunteer pages remain in place.

## Deploy
1. Back up current Supabase data and website repository.
2. If not previously done, run `supabase/IMCI_TRAINING_REGISTRATION.sql` in Supabase SQL Editor.
3. Run `supabase/IMCI_DASHBOARD_ATTENDANCE_PATCH.sql` in Supabase SQL Editor. No existing records are deleted.
4. Replace GitHub repository files with this package; retain your existing `.env` secrets or GitHub Actions environment variables. Wait for GitHub Pages deployment.
5. Log in to Officer Portal as a user whose `public.profiles.role` is `admin` or `treasurer`. Open **IMCI registrations**, mark one test record, refresh, and export CSV. Test public form submissions.

## Access & limitations
- IMCI private records are only readable/editable by admin/treasurer under existing and added RLS policies. Ordinary officers see a restricted-access message.
- The external Google Forms volunteer application is **not** synchronized into Supabase; its responses must be managed in Google Forms/Sheets.
- Public donor/support forms are inquiries/pledges, **not verified payments**. Verified cash/in-kind donations remain under Donations & pledges.
- CSV contains personal information: store privately and avoid public sharing.
- Existing database must contain `public.profiles` with the standard role values and existing schema policies.
