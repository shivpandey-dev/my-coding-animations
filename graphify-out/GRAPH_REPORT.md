# Graph Report - my-coding-animations  (2026-11-01)

## Corpus Check
- 38 files · ~3,286 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 160 nodes · 293 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5abd7436`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens/index.ts
- package.json
- registry.ts
- Scene.tsx
- DesignSystemShowcase.tsx
- compilerOptions
- remotion
- dependencies
- devDependencies
- Remotion video
- JavaScript Animation Architecture

## God Nodes (most connected - your core abstractions)
1. `colors` - 15 edges
2. `DesignSystemShowcase()` - 14 edges
3. `remotion` - 12 edges
4. `compilerOptions` - 12 edges
5. `react` - 10 edges
6. `spacing` - 9 edges
7. `GlassCard()` - 7 edges
8. `Scene()` - 6 edges
9. `typography` - 6 edges
10. `Remotion video` - 6 edges

## Surprising Connections (you probably didn't know these)
- `DesignSystemShowcase()` --calls--> `Scene()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Scene.tsx
- `RemotionRoot()` --calls--> `MyComposition()`  [EXTRACTED]
  src/Root.tsx → src/Composition.tsx
- `DesignSystemShowcase()` --calls--> `AnimatedIcon()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/AnimatedIcon.tsx
- `DesignSystemShowcase()` --calls--> `Badge()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Badge.tsx
- `DesignSystemShowcase()` --calls--> `BrandWatermark()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/BrandWatermark.tsx

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "tokens/index.ts"
Cohesion: 0.15
Nodes (15): @remotion/fonts, BadgeProps, BrandWatermarkProps, CodeWindowProps, GlassCardProps, SceneTitleProps, TerminalEntry, TerminalWindowProps (+7 more)

### Community 1 - "package.json"
Cohesion: 0.08
Nodes (23): description, license, name, private, repository, scripts, build, dev (+15 more)

### Community 2 - "registry.ts"
Cohesion: 0.18
Nodes (11): lucide-react, AwsServiceIconProps, AwsServiceName, awsServiceRegistry, TechIconName, techIconRegistry, TechLogoName, techLogoRegistry (+3 more)

### Community 3 - "Scene.tsx"
Cohesion: 0.21
Nodes (11): react, AnimatedIconProps, Glow(), GlowProps, GridBackground(), GridBackgroundProps, SafeArea(), SafeAreaProps (+3 more)

### Community 4 - "DesignSystemShowcase.tsx"
Cohesion: 0.21
Nodes (16): awsServices, commonIcons, DesignSystemShowcase(), swatches, techLogos, AnimatedIcon(), Badge(), BrandWatermark() (+8 more)

### Community 5 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 6 - "remotion"
Cohesion: 0.29
Nodes (6): remotion, SpringAnimation(), MyComposition(), ConnectionArrowProps, rotations, RemotionRoot()

### Community 7 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, lucide-react, react, react-dom, remotion, @remotion/cli, @remotion/fonts, @remotion/tailwind-v4 (+2 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 79 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `remotion` connect `remotion` to `tokens/index.ts`, `package.json`, `registry.ts`, `Scene.tsx`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **What connects `react-dom`, `tailwindcss`, `@types/react` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1455026455026455 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Scene.tsx` to `tokens/index.ts`, `package.json`, `registry.ts`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._