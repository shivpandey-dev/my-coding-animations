---
name: javascript-animation-architecture
description: Enforce this repository's independent-component architecture for JavaScript Remotion animations. Use whenever creating, editing, registering, reviewing, or merging animations under src/animations/javascript or changing src/Composition.tsx.
---

# JavaScript Animation Architecture

Read `RULE.md` at the repository root before taking action. Treat it as the canonical policy and follow it with applicable Remotion skills.

## Workflow

1. Inspect `src/Composition.tsx` and `src/animations/javascript` before editing.
2. Preserve existing animation files, registrations, and composition IDs unless the user explicitly requests a specific change.
3. Put each implementation at `src/animations/javascript/<animation-name>/<ComponentName>.tsx`.
4. Keep animation markup, hooks, timing, styles, and helpers inside the animation folder.
5. Change `src/Composition.tsx` only to import components and add `<Composition />` registrations and metadata.
6. Choose a unique, stable composition ID after checking existing registrations.
7. Resolve merge conflicts additively so every animation remains registered.
8. Run `npm run lint` and fix failures introduced by the work.

## Guardrails

- Never implement an animation in `src/Composition.tsx`.
- Never overwrite an existing registration to add a new one.
- Never modify, move, rename, combine, or delete an existing animation without explicit authorization.
- Never reuse a composition ID.

If requested work conflicts with `RULE.md`, stop and explain the conflict before editing.
