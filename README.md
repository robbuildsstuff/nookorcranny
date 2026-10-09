# Nook or Cranny

Your own corner of the internet. A little Windows 98 desktop full of your stuff: what you eat, read, wear, think about and where you've been. Link it to your friends' Nooks. No feed, no algorithm, no timeline.

## Make your own (about 20 minutes, no experience needed)

Two free services do the heavy lifting:

- **GitHub** stores your site's files (think Google Drive for websites).
- **Vercel** puts those files on the internet so anyone can visit (it's the web host).
- **Claude** is the AI that builds and changes your site for you. You just chat with it.

### Part 1: Put your site online (5 minutes)

1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robbuildsstuff/nookorcranny&repository-name=my-nook)
2. Click **Continue with GitHub**.
3. No GitHub account yet? Click **Sign up**, pick a username, use your email, and follow the steps. It's free. You'll come back to Vercel when you're done.
4. Vercel asks you to name your site. Type something like `jess-nook` (lowercase, no spaces). This becomes your address.
5. Click **Create** (or **Deploy**).
6. Wait about a minute. When you see confetti 🎉, your site is live.
7. Click the picture of your site to visit it. Your address looks like `jess-nook.vercel.app`. Save it somewhere.

It's full of sample stuff for now. That's next.

### Part 2: Make it yours with Claude (15 minutes)

1. Go to [claude.ai/code](https://claude.ai/code) and sign in to Claude (Claude Code needs a paid Claude plan).
2. It asks to connect GitHub. Click **Connect** and allow it.
3. Pick the repository with your site's name (e.g. `jess-nook`).
4. Copy the whole prompt below, paste it into the chat box and press Enter.
5. Answer Claude's questions. It will put your changes live as you go; refresh your site to see them.

```text
Hi Claude! I just set up a Nook or Cranny site and this is its project. Please read CLAUDE.md first; it explains how the site works.

A bit about me: I have never built a website and I don't know how any of this works. Hold my hand the whole way: explain things in plain English, one small step at a time, tell me exactly where to click when I need to do something, and check in before moving on. Never ask me to edit code myself. If something goes wrong, fix it and tell me simply what happened.

What I'm making: my own little corner of the internet that looks like an old Windows 98 desktop. Each icon on the desktop is something I'm into. When you click an icon, a window opens with my stuff inside (photos, lists, recipes, links, notes, whatever fits).

The desktop already has three icons: README (a welcome note), My Computer (a bit about me and my friends) and Trash. Leave those.

Let's start small. Help me pick 4 more folders, one for each thing I'm into. There's no right or wrong; it's whatever feels like me. If I'm stuck, here are some ideas to get me going:
- Food: recipes I make, restaurants I love, a grocery list
- Books: a bookshelf of what I'm reading and what I've read
- Travel: a map with pins where I've been
- Music: albums or playlists on repeat
- Sport: running, cycling, climbing, the team I yell at
- Wardrobe: clothes I love and things I want
- Photos: pictures I'm proud of
- Movies & TV: favourites and what's next
- Thoughts: quotes and little notes to self
- Projects: things I'm building or making
- Something weird and specific to me (plants, sneakers, my dog, coffee)

How I'd like to work with you:
1. Ask me a few easy questions at a time: my name, a one-line hello for the README, and which 4 folders I want.
2. For each folder, keep it simple at first. Ask me for 2 or 3 real things to put inside. If I don't have them yet, use clear placeholders and keep a list of what I still need to fill in.
3. Don't invent facts about me.
4. After each round, check that the site still builds, put it live, and tell me in one or two sentences what changed so I can go and look.
5. Then ask what I'd like to change. I might say things like "make the Food folder look like a cookbook" or "I want an icon that's a calculator", and you build it, I look, I give feedback, and we go again.

For any photo I send you: shrink it to about 2000px wide, keep it under 500KB, and remove all hidden location (GPS) and camera data before adding it.

We can always add more later, so let's get the first version live before making it fancy.

Tips for me (please share these with me after the first version is live):
- The more detail I give you, the closer you'll get to what I'm picturing. "Make it nicer" is hard; "make the window green with a pixel cactus in the corner" is easy.
- Screenshots and reference pictures help a lot. I can drop them in the chat.
- If I don't like something, I can just say "undo that".
```

### Optional: your own domain

Want `jessnook.com` instead of `jess-nook.vercel.app`? Buy one (Namecheap, Cloudflare, Squarespace…), then in Vercel open your project → **Settings → Domains → Add** and follow the steps. Then tell Claude the new address.

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
