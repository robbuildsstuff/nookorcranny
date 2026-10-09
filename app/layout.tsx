import type { Metadata, Viewport } from 'next';
import { site } from '@/content';
import { siteUrl } from '@/components/desktop/siteUrl';
import './globals.css';

// What Google and link previews (iMessage, WhatsApp, Slack…) show. Set `title` and `description` in content.ts.
const title = site.title;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: title, type: 'website' },
  twitter: { card: 'summary', title, description },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2a7a78',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router: this layout covers every page */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Pixelify+Sans:wght@400;600&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
