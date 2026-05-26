# Mini Website Builder

A clean, lightweight website section builder built with Next.js, TypeScript, Tailwind CSS, and Zustand. The app lets users compose a simple landing page from reusable sections, edit content and styling in real time, preview the result, and save or move designs through JSON import/export.

## Live Demo ?????

https://bader-mini-website-builder.vercel.app

## Features

- Add, edit, duplicate, move, and delete page sections.
- Live preview canvas with click-to-select editing.
- Reusable Header, Hero, Features, CTA, and Footer sections.
- Dynamic navigation items for Header sections.
- Dynamic feature items for Features sections.
- Multi-button editing for Hero and CTA sections.
- Button label, link, background color, text color, alignment, and placement controls.
- Section-level background color, text color, and text alignment controls.
- Header logo plus title rendering.
- Hero image URL rendering.
- JSON import/export for portable designs.
- Local storage autosave and reset support.
- Responsive desktop and mobile layout.
- Small reusable UI primitives for consistent controls.

## Tech Stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **State management:** Zustand
- **Icons:** lucide-react
- **Build tooling:** Next.js / Turbopack
- **Linting:** ESLint

## Architecture

The project is organized around a small builder shell and a registry of section components.

- `src/components/builder` contains the builder interface: section library, preview canvas, editor, persistence, and import/export controls.
- `src/components/sections` contains the rendered website sections.
- `src/components/ui` contains reusable form and action primitives.
- `src/constants/sections.ts` defines available section types, labels, and default content.
- `src/store/builder-store.ts` owns builder state and section mutations.
- `src/lib/json-utils.ts` handles JSON normalization, import/export, localStorage helpers, and ID creation.
- `src/types/builder.ts` defines shared section and prop types.

This keeps editing logic, rendered section UI, data normalization, and shared types separated while keeping the app intentionally small.

## SSR-Friendly Approach

The app uses the Next.js App Router while keeping browser-only behavior inside client components. Builder interactions, Zustand state, file import/export, and localStorage access are isolated to client-side components and helpers guarded by `typeof window` checks where needed.

Rendered section components remain simple and prop-driven, which keeps them easy to preview, serialize, and reuse without coupling them to browser APIs.

## State Management

Zustand stores the active builder state:

- `sections`
- `selectedSectionId`
- `addSection`
- `deleteSection`
- `duplicateSection`
- `moveSection`
- `replaceSections`
- `resetBuilder`
- `selectSection`
- `updateSection`

Each section stores its `type`, `id`, and serializable `props`. This makes autosave, import/export, duplication, and restoration straightforward.

## Reusable UI Components

The builder uses simple reusable UI components from `src/components/ui`:

- `Button`
- `Input`
- `Textarea`
- `EmptyState`

These components keep repeated Tailwind classes centralized while staying small and flexible. They are intentionally minimal and do not introduce a heavy design system.

## Import and Export

Designs can be exported as JSON and imported back into the builder. Imported data is normalized before being accepted so unsupported section types or invalid structures are rejected gracefully.

The import pipeline preserves supported fields including:

- text content
- colors
- nav items
- feature items
- button arrays
- alignment and placement options
- media URLs

## Autosave

The builder persists designs to `localStorage` using the `mini-website-builder-design` key. Saved designs are restored on load, and reset clears both the current Zustand state and the saved localStorage value.

## Responsive Design

The interface is designed for both desktop and mobile use:

- Desktop uses a three-column builder layout with sticky side panels.
- Smaller screens collapse into a single-column workflow.
- Preview sections use flexible spacing, wrapping button groups, and responsive image sizing.
- Editor controls use compact rounded inputs and buttons that adapt to narrow layouts.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## NPM Commands

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Runs the production server after a build.

```bash
npm run lint
```

Runs ESLint.

## Future Improvements

- Drag-and-drop section ordering using the installed dnd-kit dependencies.
- More section templates such as testimonials, pricing, gallery, FAQ, and contact forms.
- Per-section spacing controls.
- Button style presets.
- Design theme presets.
- Better image validation and optional image upload support.
- Undo and redo history.
- Preview/export as standalone HTML.
- Schema versioning for imported JSON designs.
