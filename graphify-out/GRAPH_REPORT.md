# Graph Report - my-coding-animations  (2026-11-01)

## Corpus Check
- 91 files · ~20,424 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 409 nodes · 1243 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a27922bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens/index.ts
- package.json
- LexicalScope.tsx
- OnePasswordAgentsBroll.tsx
- remotion
- compilerOptions
- Composition.tsx
- Scenes.tsx
- ExecutionContext.tsx
- Remotion video
- JavaScript Animation Architecture
- CLAUDE.md
- FunctionHoisting.tsx
- LetConstHoisting.tsx
- Hoisting.tsx
- sync-to-main.sh

## God Nodes (most connected - your core abstractions)
1. `remotion` - 57 edges
2. `SceneLayout()` - 31 edges
3. `colors` - 29 edges
4. `ServiceHeader()` - 25 edges
5. `colors` - 24 edges
6. `useEnter()` - 22 edges
7. `react` - 19 edges
8. `ArchitectureNode()` - 19 edges
9. `clamp` - 19 edges
10. `ConnectionLine()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `ScopeLabel()` --calls--> `TechIcon()`  [EXTRACTED]
  src/animations/javascript/lexical-scope/LexicalScope.tsx → src/design-system/icons/TechIcon.tsx
- `SceneShell()` --calls--> `Glow()`  [EXTRACTED]
  src/animations/javascript/node-typescript-execution/Scenes.tsx → src/design-system/components/Glow.tsx
- `SceneShell()` --calls--> `GridBackground()`  [EXTRACTED]
  src/animations/javascript/node-typescript-execution/Scenes.tsx → src/design-system/components/GridBackground.tsx
- `Scene2Terminal()` --calls--> `GlassCard()`  [EXTRACTED]
  src/animations/javascript/node-typescript-execution/Scenes.tsx → src/design-system/components/GlassCard.tsx
- `Scene4Question()` --calls--> `GlassCard()`  [EXTRACTED]
  src/animations/javascript/node-typescript-execution/Scenes.tsx → src/design-system/components/GlassCard.tsx

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "tokens/index.ts"
Cohesion: 0.06
Nodes (49): react, simple-icons, awsServices, commonIcons, DesignSystemShowcase(), swatches, techLogos, AnimatedIcon() (+41 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (40): dependencies, lucide-react, react, react-dom, remotion, @remotion/cli, @remotion/fonts, @remotion/tailwind-v4 (+32 more)

### Community 2 - "LexicalScope.tsx"
Cohesion: 0.09
Nodes (44): C, CALL_STACK_DURATION, CallStack(), codeRows, CodeScene(), fadeUp(), HookScene(), LifoScene() (+36 more)

### Community 3 - "OnePasswordAgentsBroll.tsx"
Cohesion: 0.14
Nodes (36): lucide-react, AvailabilityProps, AvailabilityScene(), Chip(), ChipGroup(), Row(), BouncerScene(), CtaScene() (+28 more)

### Community 4 - "remotion"
Cohesion: 0.18
Nodes (38): remotion, scenes, ArchitectureNode(), AwsServiceBadge(), ConnectionLine(), ConnectionLineProps, DatabaseNode(), Panel() (+30 more)

### Community 5 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 6 - "Composition.tsx"
Cohesion: 0.24
Nodes (9): NODE_TYPESCRIPT_DURATION, Aws12Services(), MyComposition(), AwsCompositions(), InternalCompositions(), JavascriptCompositions(), NewsCompositions(), NodeJsCompositions() (+1 more)

### Community 7 - "Scenes.tsx"
Cohesion: 0.35
Nodes (16): NodeTypeScriptExecution(), clamp, CommandCard(), CompareSide(), Eyebrow(), FlowBox(), Pop(), Scene1Hook() (+8 more)

### Community 8 - "ExecutionContext.tsx"
Cohesion: 0.31
Nodes (17): C, CodeIntro(), codeLines, CodePanel(), ConsolePanel(), ContextCard(), ContextStack(), ContextState (+9 more)

### Community 9 - "Remotion video"
Cohesion: 0.29
Nodes (6): Commands, Docs, Help, Issues, License, Remotion video

### Community 10 - "JavaScript Animation Architecture"
Cohesion: 0.29
Nodes (6): Branch model, Completion checks, Composition registry, Existing animations, JavaScript Animation Architecture, Required structure

### Community 12 - "FunctionHoisting.tsx"
Cohesion: 0.28
Nodes (16): C, CaseKind, cases, CaseScene(), CodePanel(), Comparison(), ConsolePanel(), Eyebrow() (+8 more)

### Community 13 - "LetConstHoisting.tsx"
Cohesion: 0.32
Nodes (16): BindingCard(), C, CodeCard(), Comparison(), comparisonRows, ConsoleCard(), ConstExample(), Eyebrow() (+8 more)

### Community 14 - "Hoisting.tsx"
Cohesion: 0.35
Nodes (11): CodePanel(), colors, ConsolePanel(), fadeUp(), Hoisting(), Intro(), MemoryPanel(), PhaseLabel() (+3 more)

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `tailwindcss`, `@types/react`, `@types/web`, `eslint` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `remotion` connect `remotion` to `tokens/index.ts`, `package.json`, `LexicalScope.tsx`, `OnePasswordAgentsBroll.tsx`, `Composition.tsx`, `Scenes.tsx`, `ExecutionContext.tsx`, `FunctionHoisting.tsx`, `LetConstHoisting.tsx`, `Hoisting.tsx`?**
  _High betweenness centrality (0.500) - this node is a cross-community bridge._
- **What connects `react-dom`, `tailwindcss`, `@types/react` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06306306306306306 - nodes in this community are weakly interconnected._
- **Why does `react` connect `tokens/index.ts` to `package.json`, `LexicalScope.tsx`, `OnePasswordAgentsBroll.tsx`, `remotion`, `Scenes.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Why does `colors` connect `tokens/index.ts` to `LexicalScope.tsx`, `OnePasswordAgentsBroll.tsx`, `Scenes.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `LexicalScope.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09142857142857143 - nodes in this community are weakly interconnected._