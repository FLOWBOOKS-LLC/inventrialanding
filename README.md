
  # Professional Landing Page Design

  This is a code bundle for Professional Landing Page Design. The original project is available at https://www.figma.com/design/vobi49iLbSOgI8edkdyejX/Professional-Landing-Page-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

## Container / Docker

Build the production image and run it (binds container port 80 to local port 3000):

```bash
docker build -t inventria-landing .
docker run --rm -p 3000:80 inventria-landing
```

Or with Docker Compose:

```bash
docker compose up --build
```

## SEO

The marketing site is a Vite + React SPA. SEO is implemented in three layers:

1. **Route config** — `src/app/seo/routes.json` is the single source of truth for every
   public path, title, meta description, keywords, robots directive, sitemap priority and
   change frequency. The React app and the build script both read it.
2. **Runtime head management** — `src/app/lib/useSeo.ts` updates `<title>`, description,
   canonical, robots, Open Graph, Twitter and JSON-LD on every route change (client-side
   navigation), using `src/app/lib/jsonLd.ts` for Organization, WebSite, BreadcrumbList,
   SoftwareApplication, Service and FAQPage schema.
3. **Build-time pre-rendering** — `scripts/generate-seo-pages.mjs` (runs as part of
   `npm run build`) writes `dist/<path>/index.html` for every route with that route's head
   tags baked into the HTML, plus `sitemap.xml`, `robots.txt` and `404.html`. Crawlers and
   social scrapers therefore see the correct metadata without executing JavaScript.

Routing uses the History API (`src/app/lib/router.ts`) so each page has a real URL. The app
still navigates through the existing `onNavigate(page)` props — no component was rewritten.

### Hosting requirement

Direct hits such as `https://flowbooks.org/about` must return the pre-rendered
`/about/index.html`. `nginx.conf` (copied into the Docker image) does this with
`try_files $uri $uri/index.html =404` and a `=404` error page that serves the app shell for
unknown URLs. If the site is deployed to another host, configure the same behaviour:
serve `/<path>/index.html` when it exists, otherwise serve `/index.html`.

Build output contains:

- `/sitemap.xml` — generated from every indexable route
- `/robots.txt` — allows public pages, blocks `/register`, `/register-partner`, `/api/` and UTM URLs
- `/404.html` — noindex page for unknown URLs

### Analytics and Search Console

Set these at build time (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). GA4 only loads after the visitor grants analytics consent in the cookie banner, then sends an SPA `page_view` on every route change. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token; injected into every generated page. |

```bash
# example
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run build
```

### Adding a new public page

1. Add the page key, path and metadata to `src/app/seo/routes.json`.
2. Render it in `src/app/App.tsx` (the route is picked up automatically by the router).
3. Run `npm run build` — the HTML document, sitemap entry and head tags are generated for you.

## Backend (Express + Remita)

An Express backend scaffold is available in `backend/` for payment integration.

### Run backend locally

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL: `http://localhost:4000`

### Remita endpoints

- `GET /health`
- `GET /api/payments/remita/health`
- `POST /api/payments/remita/initiate`
- `GET /api/payments/remita/verify/:rrr`
- `POST /api/payments/remita/webhook`
