# Phase 6 quality checklist

## Performance
- [x] `npm run analyze` writes `dist/stats.html`
- [x] Vendor chunks split: `react`, `redux`, `formik`
- [x] Route pages and below-the-fold panels are `React.lazy`
- [x] ProductCard memoized; selectors use `createSelector`
- [x] Search debounced 400ms; skeletons delayed 150ms

## Skeletons / CLS
- [x] Every lazy route has a page-specific Suspense fallback
- [x] RTK `isLoading` uses layout-matched skeletons
- [x] Pagination/filter refetch uses top progress bar only (`isFetching`)
- [x] Images reserve aspect-ratio and fade in on load
- [x] Gallery, reviews, cart drawer, checkout steps, theme panel have skeleton fallbacks

## Responsive (CSS reviewed for 320–1920)
- [x] Container padding uses `clamp()`; max-width 1280 / 1440
- [x] Navbar mobile sheet + drawer; desktop inline search
- [x] Product grid 1/2/3/4/5 columns across breakpoints
- [x] Filters sidebar ≥1024; bottom sheet on smaller screens
- [x] Detail sticky CTA; cart fixed summary; checkout compact stepper
- [x] Tap targets ≥44px; inputs 16px on mobile; safe-area on fixed bars

## Accessibility
- [x] Form labels / `aria-invalid` / error text
- [x] Dialogs use `aria-modal` and Escape to close
- [x] Focus-visible ring in global CSS
- [x] Toast region `aria-live="polite"`
- [x] Theme toggle and icon actions have accessible names

## Cleanup
- [x] Removed default Vite App.css / demo assets
- [x] Lint clean; production build succeeds
