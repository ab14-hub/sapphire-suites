# Sapphire Suites on Vercel
1. Upload this folder to a GitHub repo and import it in Vercel (Framework: Other, no build command).
2. **Bookings database:** Vercel project -> Storage (or Marketplace) -> add **Upstash Redis** (free plan) and connect it to the project. This adds the variables automatically.
3. **Admin password:** Project -> Settings -> Environment Variables -> add `ADMIN_PASSWORD` (any strong password). Then Deployments -> Redeploy.
4. Open `/admin`: enter the GitHub repo + token (for editing content) and the admin password (for viewing bookings).
Content lives in `data/site.json`; photos in `img/`; booking API in `api/`.
