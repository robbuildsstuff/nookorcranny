@AGENTS.md

# Nook or Cranny: how this site works

Read this whole file before changing anything.

## What this is

Nook or Cranny gives one person their own corner of the internet (their "nook"). It looks like a Windows 98 desktop: folders of their stuff (food, books, travel, clothes, thoughts, whatever they're into), a profile with a Friend Space that links to friends' Nooks, a README that opens on arrival, Solitaire, live weather, and a second "field" page with a meditation timer. It is not a portfolio, a blog or a feed. No algorithm, no timeline. Just their stuff.

You are helping the owner make it theirs. They are probably not a developer. Talk plainly, avoid jargon, and explain what you changed in a sentence or two.

## The golden rule

**Almost everything lives in `content.ts`.** Names, folders, notes, recipes, photos, maps, books, travel, friends, the README, the clock's city, the site title. Change content there, not in the components.

Only touch `components/` or `app/` when the owner asks for a new feature or a change in how something looks or works. If you do, keep the Win98 look (bevelled grey buttons, blue title bars, pixel icons, Tahoma/VT323/Pixelify fonts) and match the code around it.

Never commit secrets (passwords, API keys, tokens). This site needs none.

## Setting up a new owner (do this first)

At the top of `site` in `content.ts`, replace the sample person:

- `owner` (full name or alias), `firstName` (used in "Sam's Computer", "About Sam"), `handle` (short, lowercase)
- `tagline` (one line on the profile)
- `avatar`: a square picture for the profile, e.g. `'/photos/me.png'` (leave out for the pixel portrait)
- `title` (browser tab and Google) and `description` (the line under it in Google and link previews)
- `home`: city name, latitude, longitude and timezone (e.g. `'Europe/London'`). Drives the clock and the weather. Use the city centre's coordinates if you know them; the same goes for Travel pins
- `os`: what the Start menu banner says, e.g. `{ name: 'sam', suffix: 'OS' }` shows "samOS 98"
- `taskbar`: their email (an `email` link copies it) and socials (`url` links). Remove any they don't want; if they haven't given one yet, leave the placeholder and list it as a to-do
- `readme`: `heading`, `body` (blank line = new paragraph), `signoff`. The default background (`/photos/readme-field.svg`, a field with someone at a desk) can stay; a replacement photo works best at the same tall shape (614 x 942), with plain space between 12% and 68% of its height for the text
- `url`: only once they have a custom domain (e.g. `'https://www.samsmith.com'`). Leave it out on vercel.app; the site works out its own address
- Delete every item marked "(sample)" that they don't want, or rewrite it as theirs

Then check for leftovers: `grep -n "sample\|Sam" content.ts` should only hit comments, and `ls public/photos` should hold no `sample-*` files they aren't using.

Ask for a rough date for new things ("when did you read that?") and set `date`: dated items fill "Latest Entries" on the profile.

When you're done with a round, list anything still left as a placeholder so the owner knows what to fill in.

## First session with a beginner

Most owners have never built a website. Treat it like teaching a friend:

- Explain each step in plain English, one small step at a time. Say what a thing is in a line before using it ("Vercel is the service that puts your site on the internet").
- When they need to do something themselves (sign in, upload a photo, look at the site), tell them exactly where to click. Never ask them to edit code.
- Check in before moving on. A few easy questions at a time, never a wall of them.
- Start small: besides README, My Computer and Trash, help them pick 4 folders. Offer ideas, and let them make up their own. Remove the sample folders they didn't pick (if they drop Thoughts, move its `quotes` note somewhere or tell them the field-page quotes stop).
- For each folder, ask for 2 or 3 real things. Use clear placeholders for the rest and keep a running list of what's left to fill in.
- Get a first version live fast, then iterate on their feedback: they ask ("I want an icon that's a calculator"), you build a simple version, they look, they react, you go again.
- After the first version is live, share these tips: more detail gets closer to what they picture ("make it nicer" is hard, "make the window green with a pixel cactus in the corner" is easy); screenshots and reference pictures help; they can always say "undo that".
- If something breaks, fix it and tell them simply what happened.

## Folders

Each entry in `site.folders` is a desktop icon:

```ts
{
  id: 'music',          // the link: yoursite.com/#music. lowercase-with-dashes, unique
  name: 'Music',        // the label under the icon
  icon: 'music',        // optional, see IconName in content.ts
  blurb: 'On repeat',   // optional, a line at the top of the folder
  hidden: true,         // optional, keeps it off the desktop (still opens by link)
  items: [ /* see below */ ],
}
```

Keep the Trash (`id: 'recycle'`) as the last folder. It sits in the top-right corner.

To remove a folder, delete its whole `{ id: ..., items: [...] }` entry (and any photos only it used). Or add `hidden: true` to keep it for later.

The note with `id: 'quotes'` (in Thoughts by default) also feeds the quotes that drift across the sky on the field page. If the owner removes Thoughts, move that note to another folder or tell them the field quotes will stop.

Special folders (put the extra field on the folder, keep `items: []` or add items too):

- **Bookshelf**: `bookshelf: { title, reading: [Book], read: [Book | BookSeries] }`
  - Book: `{ id, title, short?, author, note? }`. `short` is the spine text for long titles
  - Series (box set): `{ series, id, author, note?, books: [{ id, title }] }`
- **Wardrobe**: `wardrobe: { categories, fits, wants, inspoUrl? }`. Twelve cartoon categories (zones: shelf, upper, lower, floor; art: cap, tee, sweater, jacket, jersey, pants, jeans, shorts, sneakers, loafers, running, boots). Replace a category's placeholder with real items: `{ id, name, brand?, boughtAt?, note?, url?, photo }`
- **Travel**: `travel: [{ country, cities: [{ name, lat, lon, home? }], spot? }]`. A pixel world map plus a passport. A city that also has a map in Food > City Guides gets a green pin
- **Banner**: `banner: { title, lines: ['...'], metresPerSecond? }`. An animated runner at the top of the folder

## Items (inside a folder's `items`)

Every item needs a unique `type`, `id` and `title`. Optional on all: `date: '2026-01-31'` (shows in Latest Entries on the profile), `icon`, `newRow: true`.

```ts
{ type: 'note', id: 'ideas', title: 'Ideas', body: 'Free text.\n\nBlank line = new paragraph.' }
{ type: 'note', id: 'groceries', title: 'Grocery List', lines: ['Eggs', { text: 'Milk', crossed: true, scribble: 'we have oat' }] }
{ type: 'recipe', id: 'pasta', title: 'Pasta', serves: '2', time: '20 min', image: '/photos/pasta.jpg',
  ingredients: ['— Sauce —', '1 can tomatoes'], steps: ['Do this.', 'Then this.'], note: 'Optional', source: 'Optional' }
{ type: 'link', id: 'fav-site', title: 'A site I like', url: 'https://...', note: 'Why' }
{ type: 'video', id: 'fav-video', title: 'A video', url: 'https://www.youtube.com/watch?v=...' }
{ type: 'list', id: 'playlist', title: 'On Repeat', rows: [{ name: 'Song', detail: 'Artist', url: 'https://...' }] }
{ type: 'image', id: 'trip', title: '📍 Lisbon', src: '/photos/lisbon.jpg', thumb: '/photos/lisbon-thumb.jpg', caption: 'Lisbon, 2025' }
{ type: 'map', id: 'paris', title: 'Paris', icon: 'paris', area: 'Paris, France', url: 'https://maps.app.goo.gl/...',
  places: [{ name: 'Le Baratin', note: 'Bistro', query: 'Le Baratin, Paris' }] }
{ type: 'folder', id: 'city-guides', title: 'City Guides', items: [ /* more items */ ] }
```

City icons available for `icon`: paris, ottawa, stockholm, london, montreal, boston, new-york, los-angeles, melbourne, mexico-city, denver, copenhagen, gothenburg, nashville, madrid, lisbon, toronto. Others: folder, trash, computer, notepad, recipe, globe, film, book, image, mail, camera, music, km, runner, cycling, tools, map, cards, weather, wardrobe. No icon that fits a new folder (climbing, coffee, guitar…)? Draw one: add a new entry to `cityArt` in `components/desktop/cityIcons.ts` (a small grid of letters, one letter per colour; copy an existing one and its palette). Its key automatically becomes a valid `icon` everywhere, not just for cities.

## Links (ids)

`id`s make links: `#food`, `#food.pasta`, `#food.city-guides.paris`, `#books.moby-dick`, `#travel.france`, `#about`. Once a link has been shared, never rename that `id`. If you must, add `'old.path': 'new.path'` to `site.aliases`.

## Friends

`site.friends`: `{ name, photo, url? }` links to their site (ideally their own Nook). No picture of them yet? Use `photo: '/photos/friends/placeholder.svg'`. Or `{ name, photo, instagram?, photos: [{ src, alt }] }` opens a little gallery of their work at `#about.their-name`.

## Photos

- Put files in `public/photos/` (or `public/wardrobe/`, `public/stickers/`), refer to them as `'/photos/name.jpg'`
- Lowercase names with dashes, no spaces
- **Before adding any photo: strip its location (GPS) and camera data, and resize it.** Long side about 2000px, under 500KB; thumbnails about 160px. On a Mac:
  `sips -s format bmp -Z 2000 in.jpg --out /tmp/t.bmp && sips -s format jpeg -s formatOptions 70 /tmp/t.bmp --out public/photos/name.jpg`
  (going through BMP drops all metadata). Elsewhere, any tool that re-encodes without metadata works
- Always write `alt`/`caption` text describing the picture
- Never add photos of other people without the owner confirming it's OK

## Going live

The site is hosted on Vercel and connected to the owner's GitHub repo. **Every push to `main` goes live in about a minute.** So:

1. Make the change
2. Check it: `npm run build` must pass, and `npx eslint .` should show no errors
3. If you changed how something looks, run it (`npm run dev`, then open http://localhost:3000) and check both a desktop-sized and a phone-sized window
4. Commit with a short plain message ("Add Lisbon photos to Travel"), push to `main`
5. Tell the owner what changed and the link to see it (e.g. `their-site.vercel.app/#food.pasta`)

If you're running in Claude Code on the web, you can't open a browser: rely on the build, and ask the owner to look.

## Tone

It's their voice, not yours. Keep their spelling, slang and jokes. Don't invent facts about them; use clear placeholders and tell them what to fill in. No marketing speak.

## Files, if you need them

- `content.ts`: everything the site shows
- `components/desktop/Desktop.tsx`: windows, links, desktop icons
- `components/desktop/viewers.tsx`: how each item type opens
- `components/desktop/FolderView.tsx`, `Bookshelf.tsx`, `Wardrobe.tsx`, `Travel.tsx`, `Profile.tsx`, `ReadmeView.tsx`, `FieldPage.tsx`, `Meditation.tsx`, `Solitaire.tsx`
- `components/desktop/icons.tsx`, `cityIcons.ts`: pixel icons
- `app/globals.css`: all styles
- `app/layout.tsx`: page title and share previews (reads from `content.ts`)
