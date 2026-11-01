# Graph Report - my-coding-animations  (2026-11-01)

## Corpus Check
- 49 files · ~7,234 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 203 nodes · 472 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a470b0da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens/index.ts
- package.json
- DesignSystemShowcase.tsx
- OnePasswordAgentsBroll.tsx
- compilerOptions
- remotion
- devDependencies
- Remotion video
- JavaScript Animation Architecture
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `colors` - 25 edges
2. `remotion` - 22 edges
3. `useEnter()` - 22 edges
4. `DesignSystemShowcase()` - 14 edges
5. `react` - 13 edges
6. `OnePasswordAgentsBroll()` - 13 edges
7. `compilerOptions` - 12 edges
8. `motion` - 11 edges
9. `lucide-react` - 10 edges
10. `fontFamilies` - 10 edges

## Surprising Connections (you probably didn't know these)
- `OnePasswordAgentsBroll()` --calls--> `GridBackground()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/OnePasswordAgentsBroll.tsx → src/design-system/components/GridBackground.tsx
- `DesignSystemShowcase()` --calls--> `Badge()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Badge.tsx
- `DesignSystemShowcase()` --calls--> `Scene()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Scene.tsx
- `Scene()` --calls--> `Glow()`  [EXTRACTED]
  src/design-system/components/Scene.tsx → src/design-system/components/Glow.tsx
- `RemotionRoot()` --calls--> `MyComposition()`  [EXTRACTED]
  src/Root.tsx → src/Composition.tsx

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "tokens/index.ts"
Cohesion: 0.10
Nodes (24): react, AnimatedIconProps, BadgeProps, BrandWatermarkProps, CodeWindowProps, ConnectionArrowProps, rotations, GlassCardProps (+16 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (33): dependencies, lucide-react, react, react-dom, remotion, @remotion/cli, @remotion/fonts, @remotion/tailwind-v4 (+25 more)

### Community 2 - "DesignSystemShowcase.tsx"
Cohesion: 0.12
Nodes (26): simple-icons, awsServices, commonIcons, DesignSystemShowcase(), swatches, techLogos, AnimatedIcon(), BrandWatermark() (+18 more)

### Community 3 - "OnePasswordAgentsBroll.tsx"
Cohesion: 0.15
Nodes (35): lucide-react, remotion, AvailabilityProps, AvailabilityScene(), Chip(), ChipGroup(), Row(), BouncerScene() (+27 more)

### Community 5 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 6 - "remotion"
Cohesion: 0.33
Nodes (5): ONEPASSWORD_BROLL_DURATION, onePasswordAgentsBrollDefaults, SpringAnimation(), MyComposition(), RemotionRoot()

### Community 8 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, eslint, prettier, @remotion/eslint-config-flat, @types/react, @types/web, typescript

### Community 9 - "Remotion video"
Cohesion: 0.29
Nodes (6): Commands, Docs, Help, Issues, License, Remotion video

### Community 10 - "JavaScript Animation Architecture"
Cohesion: 0.33
Nodes (5): Completion checks, Composition registry, Existing animations, JavaScript Animation Architecture, Required structure

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `tailwindcss`, `@types/react`, `@types/web`, `eslint` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `remotion` connect `OnePasswordAgentsBroll.tsx` to `tokens/index.ts`, `package.json`, `DesignSystemShowcase.tsx`, `remotion`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **What connects `react-dom`, `tailwindcss`, `@types/react` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10409745293466224 - nodes in this community are weakly interconnected._
- **Why does `react` connect `tokens/index.ts` to `package.json`, `DesignSystemShowcase.tsx`, `OnePasswordAgentsBroll.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Why does `colors` connect `tokens/index.ts` to `DesignSystemShowcase.tsx`, `OnePasswordAgentsBroll.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `DesignSystemShowcase.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._