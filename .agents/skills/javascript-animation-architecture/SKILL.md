---
name: javascript-animation-architecture
description: Enforce this repository's independent-component architecture for JavaScript Remotion animations. Use whenever creating, editing, registering, reviewing, or merging animations under src/animations/javascript or changing src/Composition.tsx.
---

# JavaScript Animation Architecture

Read `RULE.md` at the repository root before taking action. Treat it as the canonical policy and follow it together with applicable Remotion skills.

## Workflow

1. Inspect `src/Composition.tsx` and the existing `src/animations/javascript` tree before editing.
2. Preserve all existing animation files, component names, composition registrations, and composition IDs unless the user explicitly requests a specific change to them.
3. Create each new implementation at `src/animations/javascript/<animation-name>/<ComponentName>.tsx`.
4. Keep all animation markup, hooks, timing logic, styles, and helpers in that animation's folder. Extract additional local files there when useful.
5. Change `src/Composition.tsx` only to import the component and add its `<Composition />` registration and metadata.
6. Give the composition a unique, stable ID. Check all current registrations before choosing it.
7. Resolve merge conflicts additively: retain every independent component import and composition registration.
8. Run `npm run lint` and fix failures introduced by the work.

## Guardrails

- Never implement an animation directly in `src/Composition.tsx`.
- Never overwrite an existing registration to add a new one.
- Never modify, move, rename, combine, or delete an existing animation component without explicit user authorization.
- Never reuse a composition ID.
- Do not finish until the new animation is independently selectable in Remotion Studio and previous animations remain registered.

If the requested work conflicts with `RULE.md`, stop and explain the conflict before editing.
