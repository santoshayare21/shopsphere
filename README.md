# ShopSphere

Frontend-only e-commerce demo built with React, Vite, Redux Toolkit, RTK Query, React Router, Formik, and a flat **Indigo Minimal** design system. Product data comes exclusively from [DummyJSON](https://dummyjson.com) via RTK Query.

## Screenshots

> Place real captures here after running the app.

| Desktop | Tablet | Mobile | Dark mode |
| --- | --- | --- | --- |
| ![Desktop placeholder](docs/screenshots/desktop.png) | ![Tablet placeholder](docs/screenshots/tablet.png) | ![Mobile placeholder](docs/screenshots/mobile.png) | ![Dark placeholder](docs/screenshots/dark.png) |

## Tech stack

| Layer | Choice |
| --- | --- |
| Bundler | Vite 8 |
| UI | React 19 (JSX) |
| Routing | React Router (`createBrowserRouter`) |
| Server state | RTK Query |
| Client state | Redux Toolkit slices |
| Persistence | `createListenerMiddleware` → localStorage |
| Forms | Formik + Yup |
| Theme / toasts | Context API |
| Icons | lucide-react |
| Font | Poppins |
| Lint | oxlint |

## Features

- Catalog browse with search, category filters, sort, pagination (URL is source of truth)
- Product detail with image gallery, reviews, hover/focus prefetch
- Cart + wishlist with derived totals and local persistence
- Auth login (DummyJSON), protected checkout/orders/profile, redirect-back
- Multi-step checkout with Luhn card validation
- Light/dark theme, custom toasts, layout-matched skeletons
- Route-level code splitting and vendor chunk splitting

## Skill → file map

| Skill | Where it is demonstrated |
| --- | --- |
| Context API | `src/context/ThemeContext.jsx`, `src/context/ToastContext.jsx` |
| Redux Toolkit | `src/features/*/slices/*`, `src/app/store.js`, `src/app/listenerMiddleware.js` |
| RTK Query | `src/app/baseApi.js`, `src/features/products/services/productsApi.js`, `src/features/auth/services/authApi.js` |
| React Router | `src/routes/router.jsx`, `src/routes/ProtectedRoute.jsx` |
| Formik + Yup | `src/features/auth/pages/LoginPage.jsx`, `src/features/checkout/pages/CheckoutPage.jsx`, `src/features/profile/pages/ProfilePage.jsx`, `src/components/forms/*` |
| Lazy loading | `src/routes/router.jsx`, detail gallery/reviews, cart drawer, checkout steps, theme panel |
| Memoization | `ProductCard` (`React.memo`), cart/wishlist selectors (`createSelector`), grid handlers (`useCallback`/`useMemo`) |
| Skeleton loading | `src/components/skeletons/*`, Suspense fallbacks, RTK `isLoading` + `useDelayedFlag` |
| Responsive design | `src/styles/tokens.css`, Navbar/Drawer filters, product grid, cart/checkout layouts |

## Folder structure

```
my-app/
  src/
    app/                 # store, baseApi, providers, persistence
    features/
      auth/ products/ cart/ wishlist/ checkout/ orders/ profile/
    components/
      ui/ skeletons/ layout/ forms/
    context/ hooks/ routes/ styles/ utils/
  docs/                  # KT.md + generated PDF
  scripts/generate-kt-pdf.mjs
```

## Getting started

```bash
cd my-app
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |
| `npm run analyze` | Build + rollup visualizer → `dist/stats.html` |
| `npm run docs:pdf` | Render Mermaid diagrams and generate `docs/ShopSphere_KT.pdf` |

## Demo credentials

- Username: `emilys`
- Password: `emilyspass`

## Design system summary

- **Accent:** `#4F46E5` (light) / `#818CF8` (dark)
- **Surfaces:** `#FFFFFF` on `#F8FAFC` (light); `#111827` on `#0B1020` (dark)
- **Radius:** 12px cards, 8px inputs/buttons
- **Type:** Poppins, fluid `--text-sm` … `--text-3xl`
- **Spacing:** 4px scale via CSS variables
- **Breakpoints:** 480, 768, 1024, 1280, 1536
- **Motion:** flat opacity/color transitions (150–200ms) + skeleton shimmer

## Performance notes

Measured from a production `npm run build` after vendor splitting:

| Chunk | Approx size (gzip) |
| --- | --- |
| `react` | ~96 KB |
| `redux` | ~28 KB |
| `formik` | ~27 KB |
| app `index` | ~9 KB |

Before splitting, React + Redux + Formik tended to land in fewer larger blobs; `manualChunks` isolates the three vendor groups and route pages stay as async chunks. Run `npm run analyze` for the interactive treemap.

## Future improvements

- Wire `GET /auth/me` on app boot to refresh profile fields
- Real payment provider instead of mock Luhn checkout
- Visual regression snapshots for the breakpoint matrix
- Optional infinite scroll alongside pagination
- PWA offline shell for the catalog

## Knowledge transfer

See [`docs/KT.md`](docs/KT.md) and generate the PDF with `npm run docs:pdf` → [`docs/ShopSphere_KT.pdf`](docs/ShopSphere_KT.pdf).
