import type { CityIconName } from './components/desktop/cityIcons';

/*
 * ===========================================================================
 *  YOUR NOOK. Everything on the desktop comes from this one file.
 * ===========================================================================
 *
 * Everything below marked "sample" is there to show how things work. Replace it with
 * your own stuff, or delete it. To add something, copy an item inside a folder's
 * `items` list and change the words. Read CLAUDE.md for the full guide.
 *
 * Item types (go inside a folder's `items`):
 *   note    { type, id, title, date?, body?, lines? }                  -> opens in Notepad. `lines` is a list, one thing per line;
 *                                                                        { text: 'Milk', crossed: true, scribble: 'why??' } crosses a
 *                                                                        line out and scribbles a handwritten note beside it
 *   recipe  { type, id, title, date?, serves?, time?, ingredients, steps, note?, source?, image? }
 *           ('— Section —' in ingredients makes a heading; image is a photo shown on the card)
 *   link    { type, id, title, date?, url, note? }                     -> little browser window with a "Visit" button
 *   video   { type, id, title, date?, url, note? }                     -> media player. YouTube links play right in the window
 *   list    { type, id, title, date?, rows: [{ name, detail, url? }] } -> a table (playlists, gear, anything)
 *   image   { type, id, title, date?, src, thumb?, caption? }          -> photo viewer. src = a file in /public, e.g. '/photos/me.jpg'.
 *                                                                        Shows as a thumbnail in its folder (`thumb` = a smaller copy)
 *   map     { type, id, title, date?, url?, area?, note?, places?: [{ name, note?, query? }] }
 *                                                                     -> Google Map in a window. `url` is any Google Maps link
 *                                                                        (e.g. a saved list's Share link). `places` is a clickable list.
 *                                                                        A map inside Food > City Guides also turns that city's pin
 *                                                                        green on the Travel map
 *   folder  { type, id, title, blurb?, items: [...] }                 -> a folder inside a folder
 *
 * Any item can also have `icon: 'paris'` etc. to swap its icon (see IconName below),
 * `newRow: true` to start a new row of icons, and `date: '2026-01-31'` to show in "Latest Entries".
 *
 * `id` makes a link: yoursite.com/#food.pasta opens that item, yoursite.com/#food opens the folder,
 * yoursite.com/#about opens your profile. Once you've shared a link, don't change that id
 * (or add the old one to `aliases`).
 */

export type IconName =
  | 'folder'
  | 'trash'
  | 'computer'
  | 'notepad'
  | 'recipe'
  | 'globe'
  | 'film'
  | 'book'
  | 'image'
  | 'mail'
  | 'camera'
  | 'music'
  | 'km'
  | 'shutdown'
  | 'runner'
  | 'tools'
  | 'map'
  | CityIconName;

// `icon` is optional on every item and replaces the default icon for its type.
type ItemBase = { id: string; title: string; date?: string; icon?: IconName; newRow?: boolean };

// A line in a note's `lines` list: plain text, or crossed out with an optional handwritten scribble beside it.
export type NoteLine = string | { text: string; crossed?: boolean; scribble?: string };
export type NoteItem = ItemBase & { type: 'note'; body?: string; lines?: NoteLine[] };
export type RecipeItem = ItemBase & {
  type: 'recipe';
  image?: string; // optional photo shown on the card, e.g. the handwritten original
  serves?: string;
  time?: string;
  ingredients: string[];
  steps: string[];
  note?: string;
  source?: string;
};
export type LinkItem = ItemBase & { type: 'link'; url: string; note?: string };
export type VideoItem = ItemBase & { type: 'video'; url: string; note?: string };
export type ListItem = ItemBase & { type: 'list'; rows: { name: string; detail: string; url?: string }[] };
export type ImageItem = ItemBase & { type: 'image'; src: string; thumb?: string; caption?: string };
export type MapItem = ItemBase & {
  type: 'map';
  url?: string;
  area?: string;
  note?: string;
  places?: { name: string; note?: string; query?: string }[];
};

export type FolderItem = ItemBase & { type: 'folder'; blurb?: string; items: Item[] };

export type ContentItem = NoteItem | RecipeItem | LinkItem | VideoItem | ListItem | ImageItem | MapItem;
export type Item = ContentItem | FolderItem;
export type ItemType = Item['type'];

// An animated scene at the top of a folder window: a runner on a hilly road saying `lines` in turn.
// While the window is open, the status bar counts how far the visitor has "run" at `metresPerSecond`.
export type Banner = { title: string; lines: string[]; metresPerSecond?: number };

// A bookshelf for a folder window. Books stand as spines (with `short` on the spine if given);
// a series is a run of spines that share one note. Clicking a spine opens its card, and
// each book has a link like #books.shantaram.
export type Book = { id: string; title: string; short?: string; author: string; note?: string };
export type BookSeries = { series: string; id: string; author: string; note?: string; books: { id: string; title: string }[] };
export type Bookshelf = { title: string; reading: Book[]; read: (Book | BookSeries)[] };

// A wardrobe for a folder window. Each category is a cartoon "hero" in its spot in the wardrobe
// (shelf, upper rail, lower rail or floor); clicking it shows its items in a carousel.
// To add something you own, add to a category's items:
//   { id: 'grey-crewneck', name: 'Grey crewneck', brand: 'Some Brand', boughtAt: 'A shop in town',
//     note: 'Lives on me Oct to Apr', url: 'https://...', photo: '/wardrobe/grey-crewneck.jpg' },
// Fits are full-outfit photos for the photo frame on the shelf: { src: '/wardrobe/fits/sunday.jpg', caption?: '...' }.
// Wants is the wishlist notebook, written like the grocery list.
export type WardrobeItem = { id: string; name: string; brand?: string; boughtAt?: string; note?: string; url?: string; photo: string; placeholder?: boolean };
export type WardrobeArt = 'cap' | 'tee' | 'sweater' | 'jacket' | 'jersey' | 'pants' | 'jeans' | 'shorts' | 'sneakers' | 'loafers' | 'running' | 'boots';
export type WardrobeCategory = { id: string; name: string; zone: 'shelf' | 'upper' | 'lower' | 'floor'; art: WardrobeArt; items: WardrobeItem[] };
export type Wardrobe = { categories: WardrobeCategory[]; fits: { src: string; caption?: string }[]; wants: NoteLine[]; inspoUrl?: string };

// Places you've been, for the Travel map and passport. Each city has a latitude/longitude for its pin;
// a country with no cities listed gets one unnamed pin at `spot`. `home: true` gives a little house pin.
export type TravelCity = { name: string; lat: number; lon: number; home?: boolean };
export type TravelCountry = { country: string; cities: TravelCity[]; spot?: { lat: number; lon: number } };

export type Folder = {
  id: string;
  name: string;
  icon?: IconName;
  blurb?: string;
  banner?: Banner;
  bookshelf?: Bookshelf;
  wardrobe?: Wardrobe;
  travel?: TravelCountry[];
  hidden?: boolean; // true keeps the folder here but off the desktop, Start menu and profile
  items: Item[];
};

export type QuickLink =
  | { label: string; icon: IconName; email: string }
  | { label: string; icon: IconName; url: string };

// Stickers scattered over the desktop wallpaper, like a laptop lid: doodles, stickers, logos.
// Files go in /public/stickers (PNG or WebP with a see-through background works best).
// x and y are % across and down the desktop, size is the width in px, rotate is in degrees.
// Leave x, y or rotate out and the sticker gets a spot of its own that stays the same every visit.
export type Sticker = { id: string; src: string; alt?: string; x?: number; y?: number; size?: number; rotate?: number };

// The Friend Space on your profile ("Your Computer"). `url` is where clicking a friend goes (leave it out for "coming soon").
// Give a friend `photos` instead and clicking them opens a window of their photos, with `instagram` linked below.
export type Friend = { name: string; photo: string; url?: string; instagram?: string; photos?: { src: string; alt: string }[] };

export type Site = {
  owner: string; // your name as it shows on the profile and passport, e.g. 'Sam Sample'
  firstName: string; // used in "Sam's Computer", "About Sam", "Sam's Friend Space"
  handle: string; // a short lowercase name, shown in the profile window title
  tagline: string; // one line under your picture on the profile
  avatar?: string; // a square picture for the profile, e.g. '/photos/me.png'. Leave out for the pixel portrait
  title: string; // the browser tab title and the name Google shows
  description: string; // the line under your site in Google and in link previews
  url?: string; // your custom domain once you have one, e.g. 'https://www.samsample.com'. Leave out on vercel.app
  os: { name: string; suffix: string }; // the Start menu's side banner reads name + suffix + ' 98', e.g. 'nook' 'OS' -> nookOS 98
  home: { city: string; lat: number; lon: number; timezone: string }; // the taskbar clock and the weather
  taskbar: QuickLink[];
  // The welcome note. `heading` is the big first line, `signoff` sits at the bottom, and
  // `image` is the picture it's written on (the text sits between 12% and 68% of its height, see ReadmeView).
  readme: { title: string; heading: string; body: string; signoff?: string; signature?: string; image?: string };
  stickers: Sticker[];
  friends: Friend[];
  aliases?: Record<string, string>; // old links that moved: { 'food.old-id': 'food.new-id' }
  folders: Folder[];
};

export const site: Site = {
  owner: 'Sam Sample',
  firstName: 'Sam',
  handle: 'samsample',
  tagline: "Food, books, places and whatever else I'm into this week. (sample)",
  title: "Sam's Nook",
  description: "My corner of the internet: food, books, travel and whatever else I'm into. No feed, no algorithm. (sample)",
  // url: 'https://www.samsample.com',
  os: { name: 'nook', suffix: 'OS' },
  // Find your city's latitude/longitude on Google Maps (right-click a spot). Timezone names: 'America/New_York',
  // 'Europe/London', 'Australia/Sydney', etc.
  home: { city: 'New York', lat: 40.71, lon: -74.01, timezone: 'America/New_York' },

  // Quick-launch icons on the taskbar. An `email` one copies the address; `url` ones open the link.
  taskbar: [
    { label: 'Email me', icon: 'mail', email: 'you@example.com' },
    { label: 'Instagram', icon: 'camera', url: 'https://www.instagram.com/' },
    { label: 'Spotify', icon: 'music', url: 'https://open.spotify.com/' },
  ],

  // Opens by itself on bigger screens the first time someone visits.
  readme: {
    title: 'README.TXT',
    image: '/photos/readme-field.svg',
    heading: 'Hey - Welcome to My Nook',
    body: `This is my little corner of the internet. No feed, no algorithm, just my stuff.

What I'm eating, reading, thinking about and where I've been.

Double-click a folder to poke around.
Start menu, bottom left, has everything in one list.

(This is sample text. Make it yours.)`,
    signoff: 'Sam',
    // signature: '/photos/signature.png', // a picture of your handwritten name, shown instead of `signoff`
  },

  // Stickers on the desktop wallpaper. Files go in /public/stickers.
  // e.g. { id: 'bagel', src: '/stickers/bagel.png', size: 120, rotate: -8 },
  stickers: [],

  // Friends on your profile. `url` links to their site (ideally their own Nook!).
  // Or give them `photos` (and `instagram`) and clicking them opens a little gallery of their work.
  friends: [
    { name: 'A Friend (sample)', photo: '/photos/friends/placeholder.svg', url: 'https://example.com' },
    {
      name: 'Photo Friend (sample)',
      photo: '/photos/friends/placeholder.svg',
      instagram: 'https://www.instagram.com/',
      photos: [
        { src: '/photos/sample-mountain.svg', alt: 'Sample photo: mountains' },
        { src: '/photos/sample-sunset.svg', alt: 'Sample photo: a sunset over water' },
      ],
    },
  ],

  folders: [
    {
      id: 'food',
      name: 'Food',
      blurb: 'Food I make and eat (sample)',
      items: [
        {
          type: 'folder',
          id: 'city-guides',
          title: 'City Guides',
          blurb: 'Where I eat when I travel.',
          items: [
            {
              type: 'map',
              id: 'new-york',
              title: 'New York',
              icon: 'new-york',
              area: 'New York, USA',
              // url: 'https://maps.app.goo.gl/...', // your saved Google Maps list's Share link
              note: 'Sample list. Click a spot to find it on the map.',
              places: [
                { name: "Katz's Delicatessen", note: 'Deli', query: "Katz's Delicatessen, New York" },
                { name: 'Russ & Daughters', note: 'Bagels', query: 'Russ & Daughters, New York' },
              ],
            },
          ],
        },
        {
          type: 'recipe',
          id: 'weeknight-pasta',
          title: 'Weeknight Pasta',
          newRow: true,
          serves: '2',
          time: '20 min',
          image: '/photos/sample-pasta.svg',
          ingredients: ['— Pasta —', '200 g spaghetti', 'Salt', '— Sauce —', '2 tbsp olive oil', '3 cloves garlic, sliced', '1 can whole tomatoes', 'Chili flakes', 'Basil'],
          steps: ['Boil the pasta in well-salted water.', 'Warm the oil and garlic gently until golden.', 'Add tomatoes and chili, crush, simmer 10 min.', 'Toss the pasta in with a splash of pasta water. Basil on top.'],
          note: 'Sample recipe. Swap in one of yours.',
        },
        {
          type: 'note',
          id: 'grocery-list',
          title: 'Grocery List',
          lines: ['Eggs', 'Bread', 'Lemons', { text: 'Milk', crossed: true, scribble: 'we have oat' }, 'Coffee'],
        },
        {
          type: 'image',
          id: 'sunset',
          title: '📍 Somewhere nice',
          src: '/photos/sample-sunset.svg',
          thumb: '/photos/sample-sunset.svg',
          caption: 'Sample photo. Put yours in /public/photos.',
        },
      ],
    },
    {
      id: 'wardrobe',
      name: 'Wardrobe',
      icon: 'wardrobe',
      // A cartoon wardrobe. Each category sits in its zone; clicking it opens its items.
      // Swap a placeholder for { id, name, brand?, boughtAt?, note?, url?, photo: '/wardrobe/thing.jpg' }.
      wardrobe: {
        categories: [
          { id: 'headwear', name: 'Headwear', zone: 'shelf', art: 'cap', items: [{ id: 'headwear-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your headwear go here.' }] },
          { id: 'tees', name: 'Tees', zone: 'upper', art: 'tee', items: [{ id: 'tees-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your tees go here.' }] },
          { id: 'knitwear', name: 'Knitwear', zone: 'upper', art: 'sweater', items: [{ id: 'knitwear-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your knitwear go here.' }] },
          { id: 'outerwear', name: 'Outerwear', zone: 'upper', art: 'jacket', items: [{ id: 'outerwear-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your outerwear go here.' }] },
          { id: 'sport', name: 'Sport', zone: 'upper', art: 'jersey', items: [{ id: 'sport-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your sport go here.' }] },
          { id: 'pants', name: 'Pants', zone: 'lower', art: 'pants', items: [{ id: 'pants-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your pants go here.' }] },
          { id: 'jeans', name: 'Jeans', zone: 'lower', art: 'jeans', items: [{ id: 'jeans-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your jeans go here.' }] },
          { id: 'shorts', name: 'Shorts', zone: 'lower', art: 'shorts', items: [{ id: 'shorts-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your shorts go here.' }] },
          { id: 'sneakers', name: 'Sneakers', zone: 'floor', art: 'sneakers', items: [{ id: 'sneakers-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your sneakers go here.' }] },
          { id: 'loafers', name: 'Loafers', zone: 'floor', art: 'loafers', items: [{ id: 'loafers-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your loafers go here.' }] },
          { id: 'running', name: 'Running', zone: 'floor', art: 'running', items: [{ id: 'running-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your running go here.' }] },
          { id: 'boots', name: 'Boots', zone: 'floor', art: 'boots', items: [{ id: 'boots-placeholder', name: 'Placeholder', placeholder: true, photo: '/wardrobe/placeholder.svg', note: 'Sample: your boots go here.' }] },
        ],
        fits: [{ src: '/wardrobe/fit-placeholder-1.svg', caption: 'Sample: outfit photos go here' }],
        wants: ['Sample: first thing on the wishlist'],
        // inspoUrl: 'https://www.pinterest.com/you/board/', // a Pinterest board, pinned inside the door
      },
      items: [],
    },
    {
      id: 'thoughts',
      name: 'Thoughts',
      blurb: 'just thinking',
      items: [
        {
          type: 'note',
          id: 'quotes',
          title: 'Quotes',
          // Quotes here also drift across the sky on the field page (the arrow on the right edge of the desktop).
          body: `“The best time to plant a tree was 20 years ago. The second best time is now.”
  - Proverb

“Sample quote. Put your favourites here.”
  - You`,
        },
      ],
    },
    {
      id: 'books',
      name: 'Books',
      blurb: "What I'm reading, what I've read",
      // A bookshelf. Each book gets a link like #books.moby-dick. A series is a box set of spines.
      bookshelf: {
        title: "What I'm reading, what I've read",
        reading: [{ id: 'moby-dick', title: 'Moby-Dick', author: 'Herman Melville', note: 'Sample: the one on the go' }],
        read: [
          { id: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', note: 'Sample note: what you thought of it' },
          { id: 'the-old-man-and-the-sea', title: 'The Old Man and the Sea', short: 'Old Man & the Sea', author: 'Ernest Hemingway' },
          {
            series: 'Sample Series',
            id: 'sample-series',
            author: 'An Author',
            note: 'A series shows as a box set',
            books: [{ id: 'sample-series-1', title: 'Book One' }, { id: 'sample-series-2', title: 'Book Two' }, { id: 'sample-series-3', title: 'Book Three' }],
          },
        ],
      },
      items: [],
    },
    {
      id: 'travel',
      name: 'Travel',
      icon: 'globe',
      blurb: "Where I've been",
      // A pixel world map with a pin per city, plus a passport of stamps. `home: true` is a little house pin.
      // Country with no cities? Give it a `spot` for one unnamed pin.
      travel: [
        { country: 'USA', cities: [{ name: 'New York', lat: 40.71, lon: -74.01, home: true }] },
        { country: 'France', cities: [{ name: 'Paris', lat: 48.86, lon: 2.35 }] },
        { country: 'Japan', cities: [{ name: 'Tokyo', lat: 35.68, lon: 139.69 }] },
        { country: 'Iceland', cities: [], spot: { lat: 64.96, lon: -19.02 } },
      ],
      items: [],
    },
    {
      id: 'running',
      name: 'Running',
      icon: 'runner',
      // An animated runner at the top of the folder, saying `lines` in turn. Delete `banner` for a plain folder.
      banner: {
        title: 'Training for something',
        lines: ['ouch', 'why do I do this', 'actually this rocks'],
        metresPerSecond: 3,
      },
      items: [
        { type: 'video', id: 'sample-video', title: 'A video I like', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', note: 'Sample: any YouTube link plays in the window.' },
        { type: 'link', id: 'sample-link', title: 'A site I like', url: 'https://example.com', note: 'Sample link.' },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      hidden: true, // off the desktop for now; delete this line to show it
      icon: 'tools',
      items: [{ type: 'note', id: 'sample-project', title: 'A thing I made', body: 'Sample: a hidden folder still works by link (#projects).' }],
    },
    {
      id: 'recycle',
      name: 'Trash',
      icon: 'trash',
      blurb: 'Hey, get outta here!',
      items: [
        {
          type: 'note',
          id: 'bad-take',
          title: 'pineapple on pizza is wrong.txt',
          date: '2019-06-01',
          body: 'I was young.\n\n(sample note)',
        },
      ],
    },
  ],
};

export const visibleFolders = site.folders.filter((f) => !f.hidden);
