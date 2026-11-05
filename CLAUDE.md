# CLAUDE.md

**This project is a major refactoring** of a Claude Design board into React. Read `REFACTORING.md` before changing anything. It lists what changed, the interactions that must keep working, and the porting rules.

## Commands
- `npm run dev`: dev server
- `npm run build`: `tsc -b` then `vite build` (must pass)

## Conventions
- React 19, TypeScript strict. `verbatimModuleSyntax` (use `import type`), `erasableSyntaxOnly` (no enums), unused locals and parameters are errors.
- Components are default exports in `src/components/Name.tsx` with `Name.css` beside them. Use shared classes and variables from `src/styles/global.css`.
- Computed SVG colours come from `src/lib/tokens.ts`. Keep it in sync with the CSS variables.
- Keep section ids: top, app, siteplan, units, apartment, payment, location, terrace, ask, visit.
- SVG ids must stay unique: sky, win, rain, grid, grid2, hatch. Do not alter the isometric `matrix(...)` numbers.
- Yellow (`--accent`) is a fill, or text on navy. Never yellow text on light backgrounds.
- No autoplaying motion. Use real buttons, links and labelled inputs.
- Sample data is marked `// SAMPLE:`. Do not add invented stats or testimonials.
- Only the calculator price is shared state (`useSite()`); everything else is local.
