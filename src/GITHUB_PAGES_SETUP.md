# Deploy AMiCUS Outreach on GitHub Pages

This is a React + Vite site. **Do not upload only `index.html`**: upload all files and folders in this project to the root of a GitHub repository.

## 1. Upload the site
1. Make a new GitHub repository (for example, `amicus-outreach`).
2. Upload everything in the extracted project folder, including **`.github/workflows/deploy.yml`** and `public/assets/`.
3. Commit files to the `main` branch.

## 2. Enable GitHub Pages
1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open **Actions → Deploy to GitHub Pages** to check the first build.
4. The website will be served from `https://YOUR_USERNAME.github.io/amicus-outreach/` (replace with your actual repository name).

The public homepage can be deployed without Supabase settings. The **Officer portal** displays a setup message until Supabase is configured.

## 3. Optional: enable private officer login and shared records
1. Create a Supabase project.
2. In Supabase SQL Editor, execute `supabase/schema.sql` after reviewing its roles and policies.
3. In your GitHub repository, open **Settings → Secrets and variables → Actions → Variables**.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (use the project's **publishable / anon** key, *not* the service_role secret).
5. Trigger **Actions → Deploy to GitHub Pages → Run workflow** or push a commit.
6. Create officer Auth users in Supabase and assign authorized roles using the process described in README.md.
7. Confirm all database Row-Level Security policies work before using real donor data.

### Important
- GitHub Pages serves static files. It **does not host a database or authenticate officers** on its own; Supabase supplies those services.
- There are no payment gateways or public donor records in this version. Never post sensitive data or private keys in the GitHub repository.
- Public copy is a campaign outline; confirm partner wording, dates, service lists, and contact channels with organizers before sharing widely.
- Original uploaded partner logos are in `public/assets/`.
