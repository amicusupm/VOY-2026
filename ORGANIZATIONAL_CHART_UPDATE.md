# Organizational Chart Update

This package replaces the old organizational-chart placeholder with the supplied original AMiCUS Executive Board 2026–2027 graphic.

For the full site, upload the project contents to the **root** of the GitHub repo (`amicusupm/VOY-2026`) and preserve the `.github` folder. This packaged site is based on the most recent Pharmacy/Business version.

To update only the chart WITHOUT overwriting later edits, upload `public/assets/amicus-executive-board-2026-2027.png` to that exact GitHub path, then in `src/App.jsx` replace the markup inside `<section id="officers" ...>` that currently contains `org-chart-placeholder` with the `<figure>` in the packaged `src/App.jsx`. No Supabase changes required.

If you have added other sections manually to your live GitHub code since the previous website ZIP, do NOT replace your entire `src/App.jsx` blindly: it could erase those changes.
