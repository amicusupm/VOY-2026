# October 29 IMCI training registration

A separate training-registration form is included under `?page=volunteers#imci-training`.

1. Open Supabase > SQL Editor for the VOY 2026 project.
2. Run `supabase/IMCI_TRAINING_REGISTRATION.sql` **before** directing volunteers to register.
3. Deploy this website version using GitHub Pages as usual.
4. Test registration with an organizer email. Confirm an entry appears in `public.imci_training_registrations` under Table Editor.
5. Entries can be reviewed in Supabase SQL Editor: `select full_name, email, affiliation, volunteer_role, attendance, registered_at from public.imci_training_registrations order by registered_at desc;`

**Important:** Training date is October 29, 2026 at UP Manila School of Health Sciences, Palo. No exact training hour, room, facilitator, or attendance cap has been supplied, so these are correctly marked to be announced.

**Privacy:** The form does not collect clinical data, contact numbers, or emergency contacts. Entries are not published in the public website. The `anon` role can insert entries but has no read access; authenticated admin/treasurer roles can view. Volunteers needing to change their submission should contact organizers. As with any public form, consider CAPTCHA/rate limiting and a retention/deletion policy before large-scale use.
