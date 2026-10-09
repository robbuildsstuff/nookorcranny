import { site } from '@/content';

// The site's address. Uses `url` from content.ts if set; otherwise the address Vercel gives the site
// (e.g. my-nook.vercel.app), so links and share previews work before a custom domain is added.
const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (site.url || (vercel ? `https://${vercel}` : 'http://localhost:3000')).replace(/\/$/, '');

// Just the name, for status bars: "my-nook.vercel.app"
export const siteHost = siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
