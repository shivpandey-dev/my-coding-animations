# Graph Report - my-coding-animations  (2026-11-01)

## Corpus Check
- 49 files · ~7,264 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 209 nodes · 467 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7fbfa7a4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens/index.ts
- package.json
- DesignSystemShowcase.tsx
- OnePasswordAgentsBroll.tsx
- dependencies
- compilerOptions
- remotion
- Remotion video
- JavaScript Animation Architecture
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `useEnter()` - 22 edges
2. `remotion` - 22 edges
3. `colors` - 15 edges
4. `DesignSystemShowcase()` - 14 edges
5. `react` - 13 edges
6. `compilerOptions` - 12 edges
7. `OnePasswordAgentsBroll()` - 11 edges
8. `lucide-react` - 10 edges
9. `brand` - 9 edges
10. `spacing` - 9 edges

## Surprising Connections (you probably didn't know these)
- `DesignSystemShowcase()` --calls--> `Scene()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Scene.tsx
- `RemotionRoot()` --calls--> `MyComposition()`  [EXTRACTED]
  src/Root.tsx → src/Composition.tsx
- `Row()` --calls--> `useEnter()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/AvailabilityScene.tsx → src/animations/javascript/onepassword-agents-broll/shared.tsx
- `ChipGroup()` --calls--> `useEnter()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/AvailabilityScene.tsx → src/animations/javascript/onepassword-agents-broll/shared.tsx
- `Chip()` --calls--> `useEnter()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/AvailabilityScene.tsx → src/animations/javascript/onepassword-agents-broll/shared.tsx

## Import Cycles
- None detected.

## Communities (10 total, 1 thin omitted)

### Community 0 - "tokens/index.ts"
Cohesion: 0.10
Nodes (27): react, AnimatedIconProps, BadgeProps, BrandWatermarkProps, CodeWindowProps, ConnectionArrowProps, rotations, GlassCardProps (+19 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (30): description, devDependencies, eslint, prettier, @remotion/eslint-config-flat, @types/react, @types/web, typescript (+22 more)

### Community 2 - "DesignSystemShowcase.tsx"
Cohesion: 0.12
Nodes (27): simple-icons, awsServices, commonIcons, DesignSystemShowcase(), swatches, techLogos, AnimatedIcon(), Badge() (+19 more)

### Community 3 - "OnePasswordAgentsBroll.tsx"
Cohesion: 0.15
Nodes (31): lucide-react, remotion, AvailabilityProps, AvailabilityScene(), Chip(), ChipGroup(), Row(), BouncerScene() (+23 more)

### Community 4 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, react, react-dom, remotion, @remotion/cli, @remotion/fonts, @remotion/tailwind-v4 (+2 more)

### Community 5 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 6 - "remotion"
Cohesion: 0.33
Nodes (5): ONEPASSWORD_BROLL_DURATION, onePasswordAgentsBrollDefaults, SpringAnimation(), MyComposition(), RemotionRoot()

### Community 9 - "Remotion video"
Cohesion: 0.29
Nodes (6): Commands, Docs, Help, Issues, License, Remotion video

### Community 10 - "JavaScript Animation Architecture"
Cohesion: 0.33
Nodes (5): Completion checks, Composition registry, Existing animations, JavaScript Animation Architecture, Required structure

## Knowledge Gaps
- **7 isolated node(s):** `eslint`, `prettier`, `react-dom`, `tailwindcss`, `@types/react` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 89 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `remotion` connect `OnePasswordAgentsBroll.tsx` to `tokens/index.ts`, `package.json`, `DesignSystemShowcase.tsx`, `remotion`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **What connects `eslint`, `prettier`, `react-dom` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09898242368177614 - nodes in this community are weakly interconnected._
- **Why does `react` connect `tokens/index.ts` to `package.json`, `DesignSystemShowcase.tsx`, `OnePasswordAgentsBroll.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `DesignSystemShowcase.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11553030303030302 - nodes in this community are weakly interconnected._