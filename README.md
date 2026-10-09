# Nook or Cranny

Your own corner of the internet. A little Windows 98 desktop full of your stuff: what you eat, read, wear, think about and where you've been. Link it to your friends' Nooks. No feed, no algorithm, no timeline.

## Make your own (about 15 minutes)

You need a free [GitHub](https://github.com/signup) account and [Claude](https://claude.ai) (a paid plan includes Claude Code).

**1. Put your copy online.** Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robbuildsstuff/nookorcranny&repository-name=my-nook)

- Sign in to Vercel with your GitHub account
- Give your site a name (this becomes your address: `your-name.vercel.app`)
- Click **Create** / **Deploy** and wait about a minute

You now have your own copy of the code on GitHub and a live site with sample content.

**2. Open Claude Code.** Go to [claude.ai/code](https://claude.ai/code), connect GitHub when it asks, and pick the repo Vercel just made for you.

**3. Paste this prompt:**

```text
I just set up my own Nook or Cranny site (a personal website that looks like a Windows 98 desktop).
Read CLAUDE.md first, it explains how everything works.

Then interview me, a few questions at a time, to make it mine:
- my name, a one-line tagline, my home city
- which folders I want (food, books, travel, music, clothes, sport, whatever I'm into)
- what goes in each one (notes, links, recipes, places, videos, photos, books I've read, countries I've been to)
- my README welcome message
- any friends I want to link to

Suggest ideas based on my answers. Remove the sample content as you replace it.
After each round, update the site, tell me in plain words what changed, and push it live.
Don't make up facts about me: use clear placeholders and tell me what's left to fill in.
Keep going until I say I'm done.
```

**4. Add photos.** Drag photos into the Claude chat and say where they go ("put this in Travel, it's from Lisbon"). Claude strips the location data, resizes them and adds them.

**5. (Optional) Your own domain.** Buy one (Namecheap, Cloudflare, Squarespace…), then in Vercel: your project → **Settings → Domains → Add** and follow the steps. Tell Claude the new address so it can update `url` in `content.ts`.

## Changing it later

Open Claude Code on your repo and just ask: "add my new running shoes to the wardrobe", "new recipe: …", "add Sam's site to my friends". Every change goes live by itself about a minute after Claude pushes it.

Prefer doing it by hand? Everything is in `content.ts`. Edit it on GitHub (the pencil icon), commit, and it goes live.

## Join the Neighbourhood

Add your friends' Nooks to your Friend Space, and send them yours.

## For developers

Next.js + React + TypeScript, no database, no API keys.

```bash
npm install
npm run dev
```

All content is in `content.ts`; see `CLAUDE.md` for the full guide.
