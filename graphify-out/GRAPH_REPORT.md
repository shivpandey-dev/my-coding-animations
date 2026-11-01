# Graph Report - my-coding-animations  (2026-11-01)

## Corpus Check
- 89 files · ~18,960 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 391 nodes · 1167 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24026ba0`
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
- CallStack.tsx
- ExecutionContext.tsx
- Remotion video
- JavaScript Animation Architecture
- CLAUDE.md
- FunctionHoisting.tsx
- LetConstHoisting.tsx
- Hoisting.tsx
- sync-to-main.sh

## God Nodes (most connected - your core abstractions)
1. `remotion` - 54 edges
2. `SceneLayout()` - 31 edges
3. `colors` - 28 edges
4. `ServiceHeader()` - 25 edges
5. `colors` - 24 edges
6. `useEnter()` - 22 edges
7. `ArchitectureNode()` - 19 edges
8. `clamp` - 19 edges
9. `react` - 18 edges
10. `ConnectionLine()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `LexicalScope()` --calls--> `ReelEducationLayout()`  [EXTRACTED]
  src/animations/javascript/lexical-scope/LexicalScope.tsx → src/components/reel/ReelEducationLayout.tsx
- `HookScene()` --calls--> `Glow()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/HookScene.tsx → src/design-system/components/Glow.tsx
- `OnePasswordAgentsBroll()` --calls--> `Glow()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/OnePasswordAgentsBroll.tsx → src/design-system/components/Glow.tsx
- `OnePasswordAgentsBroll()` --calls--> `GridBackground()`  [EXTRACTED]
  src/animations/javascript/onepassword-agents-broll/OnePasswordAgentsBroll.tsx → src/design-system/components/GridBackground.tsx
- `DesignSystemShowcase()` --calls--> `Badge()`  [EXTRACTED]
  src/compositions/design-system/DesignSystemShowcase.tsx → src/design-system/components/Badge.tsx

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "tokens/index.ts"
Cohesion: 0.06
Nodes (49): react, @remotion/fonts, awsServices, commonIcons, DesignSystemShowcase(), swatches, techLogos, AnimatedIcon() (+41 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (40): dependencies, lucide-react, react, react-dom, remotion, @remotion/cli, @remotion/fonts, @remotion/tailwind-v4 (+32 more)

### Community 2 - "LexicalScope.tsx"
Cohesion: 0.16
Nodes (27): C, codeLines, CodeStructureScene(), ConsoleScene(), DirectionRuleScene(), HookScene(), InvalidLookupScene(), LexicalDefinitionScene() (+19 more)

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
Cohesion: 0.26
Nodes (8): Aws12Services(), MyComposition(), AwsCompositions(), InternalCompositions(), JavascriptCompositions(), NewsCompositions(), NodeJsCompositions(), RemotionRoot()

### Community 7 - "CallStack.tsx"
Cohesion: 0.19
Nodes (18): C, CALL_STACK_DURATION, CallStack(), codeRows, CodeScene(), fadeUp(), HookScene(), LifoScene() (+10 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 121 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `remotion` connect `remotion` to `tokens/index.ts`, `package.json`, `LexicalScope.tsx`, `OnePasswordAgentsBroll.tsx`, `Composition.tsx`, `CallStack.tsx`, `ExecutionContext.tsx`, `FunctionHoisting.tsx`, `LetConstHoisting.tsx`, `Hoisting.tsx`?**
  _High betweenness centrality (0.494) - this node is a cross-community bridge._
- **What connects `react-dom`, `tailwindcss`, `@types/react` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058738738738738736 - nodes in this community are weakly interconnected._
- **Why does `react` connect `tokens/index.ts` to `package.json`, `LexicalScope.tsx`, `OnePasswordAgentsBroll.tsx`, `remotion`, `CallStack.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Why does `colors` connect `OnePasswordAgentsBroll.tsx` to `tokens/index.ts`, `LexicalScope.tsx`, `CallStack.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `OnePasswordAgentsBroll.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14095744680851063 - nodes in this community are weakly interconnected._