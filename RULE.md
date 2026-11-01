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
- Keep animation markup, timing, styles, hooks, helpers, and implementation details out of `src/Composition.tsx` and `src/registry/`.

## Composition registry

`src/Composition.tsx` only composes the per-category registries in `src/registry/` (`javascript.tsx`, `nodejs.tsx`, `aws.tsx`, `news.tsx`, `internal.tsx`). A new animation is registered in the registry file of its category, never in `src/Composition.tsx`. This keeps category branches from editing the same file, so they merge into `main` without conflicts.

Each registry file is a registry only. It may:

- Import animation components.
- Declare the registry component for its category.
- Register animations with Remotion `<Composition />` elements.
- Supply composition metadata such as `id`, `component`, `durationInFrames`, `fps`, `width`, `height`, `defaultProps`, and `calculateMetadata`.

It must not contain an animation component implementation.

Adding a new category means adding `src/registry/<category>.tsx` and one line in `src/Composition.tsx`.

Every new animation must be registered with a unique, stable composition `id` so it remains independently selectable in Remotion Studio.

## Existing animations

- Do not modify, move, rename, combine, or delete existing animation components unless the user explicitly requests that exact change.
- Do not replace existing composition registrations when adding a new animation.
- Preserve all existing compositions and their IDs during feature-branch merges.
- Resolve merge conflicts additively so every independent animation remains available.

## Completion checks

Before finishing an animation task:

1. Confirm the implementation lives under `src/animations/javascript/<animation-name>/`.
2. Confirm the category's `src/registry/<category>.tsx` only imports and registers the new component, and `src/Composition.tsx` is unchanged.
3. Confirm existing animation files and registrations remain intact.
4. Confirm every registered composition has a unique ID.
5. Run the repository lint/type-check command and address failures caused by the change.

## Branch model

- `main` holds everything: shared code plus every category's animations.
- Category branches (`Javascript`, `NodeJs`, `Aws`) hold the shared code plus only their own category's animations.
- Work goes feature branch -> category branch. A push to a category branch is merged into `main` by `.github/workflows/sync-to-main.yml`, which opens a PR instead if the merge conflicts.
- Shared code (design-system, config, rules, workflows) is changed on its own branch and merged into `main` and into every category branch.
- Never merge `main` into a category branch: it would pull in the other categories' animations.
- Each category edits only its own `src/registry/<category>.tsx`, so these merges stay conflict-free.
