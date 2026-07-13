# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Stuff to replace
- Replace the OG meta tags in `src/app.html`

## Testimonials (when you have real reviews)

The `/testimonials` page and data files exist, but public links to it are **disabled until real reviews are live**:

- Footer: Testimonials entry is **commented out** in [`src/lib/data/nav.js`](src/lib/data/nav.js)
- Services: Testimonials link was **removed** from the Service Areas section in [`src/routes/services/+page.svelte`](src/routes/services/+page.svelte)

Placeholder copy in [`src/lib/data/testimonials.js`](src/lib/data/testimonials.js) is for layout preview only and is **not** included in Review JSON-LD.

### 1. Add review content

Edit [`src/lib/data/testimonials.js`](src/lib/data/testimonials.js). For each real Google or MassageBook review, add or update an entry:

```js
{
  id: 'google-2025-06',
  author: 'First name + last initial', // e.g. "Mike R." — match how you want it shown publicly
  quote: 'Paste the exact review text.',
  source: 'Google',
  date: 'June 2025', // display label (optional)
  ratingValue: 5,
  datePublished: '2025-06-15', // ISO date (YYYY-MM-DD) from the review
  includeInSchema: true // required for JSON-LD; leave false for placeholders
}
```

- Use **verbatim** review text you are allowed to republish (your own GBP/MassageBook listings).
- Set `includeInSchema: true` only for real reviews. Google may penalize fabricated or misleading structured data.
- Remove or replace placeholder entries when going live.

### 2. Re-enable navigation links

**Footer** — In [`src/lib/data/nav.js`](src/lib/data/nav.js), uncomment the Testimonials block inside `footerNavItems`:

```js
{
  href: '/testimonials',
  text: 'Testimonials'
},
```

**Services page** — In [`src/routes/services/+page.svelte`](src/routes/services/+page.svelte), restore the Testimonials link in the Service Areas section (between FAQ and Contact):

```html
<a href="/faq" class="text-secondary font-semibold hover:underline">View FAQ</a>
<span aria-hidden="true"> · </span>
<a href="/testimonials" class="text-secondary font-semibold hover:underline">Testimonials</a>
<span aria-hidden="true"> · </span>
<a href="/contact" class="text-secondary font-semibold hover:underline">Contact</a>
```

### 3. Sitemap and SEO

- `/testimonials` is already listed in [`src/routes/sitemap.xml/+server.ts`](src/routes/sitemap.xml/+server.ts). No change needed unless you want to remove it until launch (then comment that path out too).
- Meta description for the route lives in [`src/lib/data/meta.js`](src/lib/data/meta.js) under `pageDescriptions['/testimonials']`.
- When at least one review has `includeInSchema: true`, [`src/lib/seo/testimonials-schema.ts`](src/lib/seo/testimonials-schema.ts) emits Review `ItemList` JSON-LD via [`src/lib/components/TestimonialsSchema.svelte`](src/lib/components/TestimonialsSchema.svelte) on the testimonials page. Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy.

### 4. “Leave a review” CTA

The testimonials page already links to `meta.gbp_url` for new Google reviews. Keep NAP consistent with [`src/lib/data/meta.js`](src/lib/data/meta.js) and your Google Business Profile.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
