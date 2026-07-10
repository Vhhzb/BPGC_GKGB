# Campus Dogs

A small field-guide style website for the dogs of your campus. A grid of
cards on the homepage, each linking to a detail page with more photos and
the full write-up.

## How it's built

- `index.html` — the homepage grid
- `dog.html` — the detail page template (one file handles *every* dog)
- `data/dogs.json` — **all the dog data lives here.** This is the only file
  you need to edit to add, remove, or update a dog.
- `js/app.js` — reads `dogs.json` and builds both pages
- `css/style.css` — all the styling
- `images/` — put your real dog photos here

You never need to create a new HTML page per dog — `dog.html` reads the
`id` from the URL (e.g. `dog.html?id=bruno`) and looks it up in
`dogs.json`.

## Adding a real dog

1. Make a folder for their photos, e.g. `images/bruno/`, and drop the
   photos in (jpg/png, any size — they'll be cropped to fit automatically).
2. Open `data/dogs.json` and add a new entry, copying this shape:

```json
{
  "id": "bruno",
  "name": "Bruno",
  "nickname": "The Mess Regular",
  "spottedAt": "Mess & Convo",
  "tags": ["food-motivated", "very good boy", "brown coat"],
  "summary": "One short sentence for the card on the homepage.",
  "story": "A longer paragraph for the detail page — his personality, habits, where he hangs out, funny stories.",
  "cover": "images/bruno/main.jpg",
  "photos": [
    "images/bruno/main.jpg",
    "images/bruno/1.jpg",
    "images/bruno/2.jpg"
  ]
}
```

- `id` must be unique and URL-safe (lowercase, no spaces — use hyphens).
- `cover` is the photo shown on the homepage card and at the top of the
  detail page.
- `photos` is the full gallery shown on the detail page (`cover` can be
  repeated as the first one, like in the example).

That's it — no HTML or CSS editing needed. Save the file and refresh.

## Testing it locally

Browsers block a webpage from loading a local JSON file directly (a
security restriction), so opening `index.html` by double-clicking it won't
work — you'll see a friendly error message instead of the dogs.

Instead, run a tiny local server from inside the project folder:

```bash
# if you have Python installed (most Macs/Linux do; Windows may need to install it)
python -m http.server
```

Then open **http://localhost:8000** in your browser. This local-server
requirement disappears once it's hosted online (see below).

## Putting it online with GitHub Pages

Since you already have a GitHub Pages site, this'll be familiar:

1. Create a new repository (e.g. `campus-dogs`) and push this whole folder
   to it.
2. In the repo, go to **Settings → Pages**, set the source branch to
   `main` (or `master`) and the folder to `/ (root)`.
3. Give it a minute — your site will be live at
   `https://<your-username>.github.io/campus-dogs/`.

## Ideas for later (optional)

- A search/filter bar on the homepage (by tag or location)
- A "submit a dog" Google Form that feeds into `dogs.json`
- A map view showing where each dog is usually spotted
