# The Residence 2.0

A showcase redesign of a smart-home residential complex landing page (Medan). A concept by Titik Jalin. All content is illustrative.

> **This is a major refactoring, not a copy.** The design was prototyped on a Claude Design board and rebuilt here as a typed React app. Read [REFACTORING.md](./REFACTORING.md) for what changed, what must keep working, and the porting rules.

## Run it

```
npm install
npm run dev      # local dev server
npm run build    # type-check and production build
```

Stack: Vite, React 19, TypeScript (strict), plain CSS (global tokens in `src/styles/global.css`, one CSS file per component).

## Structure

- `src/App.tsx`: page order
- `src/components/`: one component per section (Nav, Hero, AppMockup, SitePlan, Units, Apartment, Payment, Location, Terrace, Ask, Visit, Footer)
- `src/store.tsx`: shared calculator price (set by the unit picker, read by the payment calculator)
- `src/lib/`: colour maths, tokens, Rupiah formatting

## Sample data and placeholders

Nothing here is real. Look for `// SAMPLE:` comments: unit prices and statuses, drive times, `[NAME]` / `[MIN]` / `[SIZE]` / `[PRICE]` placeholders, plan dimensions, terrace specification, scripted concierge replies. The visit form makes no network call.

## Next steps

- Finish switcher and compare-two-units
- Real 3D hero (Three.js) in place of the SVG isometric
- Real AI concierge in place of scripted replies
- Real imagery, bilingual EN/ID, verified location data
- Mobile pass
