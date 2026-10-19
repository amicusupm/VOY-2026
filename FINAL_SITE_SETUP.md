# Final public site update — Official signed letters

## What changed
- Cleaner sponsor invitation pages without internal phrases such as “personalized letter.”
- Officer-facing **Signed PDF** file input next to each solicitation entry.
- Public visitor sees **Download Official Signed Letter** only after an officer uploads that approved PDF.
- No signature graphics are displayed on the website. The four authorized signatories remain named in the invitation.
- Existing sponsor response, proof upload, GoTyme QR, finance review, and verified acknowledgment workflows are preserved.

## Deploy
1. Upload **all files in this folder**, including `.github`, to the existing `amicusupm/VOY-2026` repository (root, not a nested folder).
2. In Supabase SQL Editor run `supabase/SIGNED_LETTER_DOWNLOAD_MIGRATION.sql` **after** the previous donor-reply/database migrations.
3. Keep your existing Vite GitHub Actions variables and run `Deploy VOY Website`.
4. Sign in as an officer, create/open a solicitation in **Letter registry**, click **Signed PDF**, and attach the recipient-specific *approved signed PDF* (max 10 MB).
5. Share the generated sponsor link. Only that recipient's PDF appears on that invitation.

## Important limits
- The signed letters bucket in this straightforward GitHub Pages/Supabase edition is **public**. The uploaded PDF URLs are hard to guess, but anyone who obtains a URL can view/download the PDF. Avoid confidential contents. A private bucket plus short-lived server-generated signed URLs is recommended for stricter confidentiality.
- The uploaded photo of signed paper is a visual reference **not** an automatically reusable authorization or a clean vector-signature source. Do not reapply it automatically to new letters. Export each finalized recipient-specific letter with the four signatories' approved signatures, then upload it.
- PDFs should include the correct sponsor name, address, control number, and actual approved signatories. Upload a signed PDF only after approval.
- Donate/reply and digital acknowledgments remain separate. Acknowledgments are NOT tax invoices or BIR official receipts.
- Verify any published bank account and QR code with the finance team before accepting payments.
