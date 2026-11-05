# Major refactoring: Claude Design board to React

**This is a major refactoring, not a copy.** The design was drawn and prototyped on a Claude Design board
(`Main.dc.html`, one 73 KB file of inline styles, template holes and one logic class). This project rebuilds it
as a typed React app. Treat the board as the visual and behavioural spec, and expect every part to change shape.

## What changes

| On the board | In this project |
| --- | --- |
| One file, one `Component` class, one big `renderVals()` | One React component per section, local `useState`, small pure helpers |
| Inline `style="..."` everywhere | Shared tokens and classes in `src/styles/global.css`, plus one `Name.css` per component |
| `{{hole}}` template lookups and `<sc-for>` / `<sc-if>` | JSX expressions, `.map()` and conditional rendering |
| Handlers returned from `renderVals()` | Event handlers defined in the component |
| Accent colour as a Tweaks prop | Single `--accent` CSS variable and `ACCENT` constant |
| Fixed canvas frame (1440 wide) | Fluid page, same `flex-wrap` breakpoints, `max-width: 1280px` container |
| Isometric hero faked with SVG | Same SVG for now. A real Three.js scene is a later, separate step |

## What stays the same

- Section order, copy, colours, type pairing, and all interactions (see the list below).
- Sample data stays flagged as sample: prices, unit availability, drive times, place names, plan dimensions, terrace spec.

## Interactions that must keep working

1. Hero: time-of-day slider, four presets, Clear/Rain toggle, system chips, scene caption.
2. App mockup: four scenes, manual lights, temperature, door and camera controls.
3. Site plan: six selectable places, highlight on the plan, detail panel.
4. Unit picker: filters, 26 units, reserve and release, "Calculate payment" sets the calculator price.
5. Apartment plan: four toggleable layers. Residence types table.
6. Payment calculator: price, down payment, term, rate, monthly instalment, principal vs interest bar.
7. Location map: four category toggles drive pins and the list.
8. Concierge: scripted answers, suggestion buttons, free text.
9. Visit form: unit type choice, submit, confirmation.

## Risks to check during the refactor

- SVG ids (`sky`, `win`, `rain`, `grid`, `grid2`, `hatch`) must stay unique across the page.
- The isometric faces use `matrix(...)` transforms and a pattern fill. Do not "simplify" the numbers.
- Contrast: yellow is only a fill, or text on navy. Never yellow text on the light grey.
- Reduced motion: no autoplaying animation.
- Everything is a real `<button>`, `<a>` or labelled input.

## Porting rules (used by every contributor)

- React 19, TypeScript strict. `verbatimModuleSyntax` is on: use `import type` for types. `erasableSyntaxOnly` is on: no enums.
  `noUnusedLocals` and `noUnusedParameters` are on.
- No new dependencies.
- Each component is a default export in `src/components/Name.tsx` with styles in `src/components/Name.css`,
  imported by the component. Use the shared classes and variables from `src/styles/global.css` where they fit.
- Colour constants for computed SVG values are in `src/lib/tokens.ts`. Colour maths is in `src/lib/color.ts`.
  Rupiah formatting is `formatRupiah` in `src/lib/format.ts`. The shared calculator price is `useSite()` in `src/store.tsx`.
- Keep the section `id` attributes (`top`, `app`, `siteplan`, `units`, `apartment`, `payment`, `location`, `terrace`, `ask`, `visit`).
- Copy text exactly as on the board.
- Put sample data in a clearly named constant with a `// SAMPLE:` comment.
- Source of truth for look and behaviour: the board file, found by its `<!-- SECTION -->` comment.
