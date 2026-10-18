# Remix of TURQUIA NOVO TBALA HCAVE 222 — Guidelines

## Components

The design system exports these components — import them from `@ws-c285cdd8ff2005042701/27fe6599-69f2-4a35-9d71-845164adda23` and compose them before building anything from scratch:

`Button`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger`, `Dialog`, `HotelDetails`, `HotelGallery`, `Hotels`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-c285cdd8ff2005042701/27fe6599-69f2-4a35-9d71-845164adda23/styles.css` (source — preferred import)
- `@ws-c285cdd8ff2005042701/27fe6599-69f2-4a35-9d71-845164adda23/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

