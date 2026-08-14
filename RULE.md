# JavaScript Animation Architecture

Apply these rules whenever creating, editing, registering, reviewing, or merging a JavaScript Remotion animation in this repository.

## Required structure

- Implement every animation as an independent React component.
- Place each new animation at `src/animations/javascript/<animation-name>/<ComponentName>.tsx`.
- Use a unique kebab-case animation directory and a PascalCase component name.
- Keep animation markup, timing, styling, hooks, and helpers out of `src/Composition.tsx`.

## Composition registry

Use `src/Composition.tsx` only to import animation components and register them with Remotion `<Composition />` elements and composition metadata.

Give every animation a unique, stable composition ID so it remains independently selectable in Remotion Studio.

## Existing animations

- Do not modify, move, rename, combine, or delete existing animation components unless explicitly requested.
- Do not replace existing composition registrations when adding an animation.
- Preserve all existing compositions and IDs during merges.
- Resolve merge conflicts additively so every independent animation remains available.

## Completion checks

1. Confirm each implementation lives under `src/animations/javascript/<animation-name>/`.
2. Confirm `src/Composition.tsx` only imports and registers components.
3. Confirm existing animation files and registrations remain intact.
4. Confirm every composition ID is unique.
5. Run `npm run lint` and fix failures caused by the change.
