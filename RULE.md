# JavaScript Animation Architecture

Apply these rules whenever creating, editing, registering, reviewing, or merging a JavaScript Remotion animation in this repository.

## Required structure

- Implement every animation as an independent React component.
- Place each new animation at:

  ```text
  src/animations/javascript/<animation-name>/<ComponentName>.tsx
  ```

- Use a unique, descriptive kebab-case directory name for `<animation-name>`.
- Use a unique PascalCase component name for `<ComponentName>`.
- Keep animation markup, timing, styles, hooks, helpers, and implementation details out of `src/Composition.tsx`.

## Composition registry

`src/Composition.tsx` is a registry only. It may:

- Import animation components.
- Declare the root composition component.
- Register animations with Remotion `<Composition />` elements.
- Supply composition metadata such as `id`, `component`, `durationInFrames`, `fps`, `width`, `height`, `defaultProps`, and `calculateMetadata`.

It must not contain an animation component implementation.

Every new animation must be registered with a unique, stable composition `id` so it remains independently selectable in Remotion Studio.

## Existing animations

- Do not modify, move, rename, combine, or delete existing animation components unless the user explicitly requests that exact change.
- Do not replace existing composition registrations when adding an animation.
- Preserve all existing compositions and their IDs during feature-branch merges.
- Resolve merge conflicts additively so every independent animation remains available.

## Completion checks

Before finishing an animation task:

1. Confirm the implementation lives under `src/animations/javascript/<animation-name>/`.
2. Confirm `src/Composition.tsx` only imports and registers the new component.
3. Confirm existing animation files and registrations remain intact.
4. Confirm every registered composition has a unique ID.
5. Run the repository lint/type-check command and address failures caused by the change.
