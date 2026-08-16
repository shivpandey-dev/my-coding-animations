import type {CSSProperties, ReactNode} from "react";
import {Check, CircleX, Code2, Search, Terminal} from "lucide-react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {colors, fontFamilies, motion, radii, shadows, TechIcon} from "../../../design-system";
import {
  REEL_HORIZONTAL_PADDING,
  REEL_TOP_PADDING,
  ReelEducationLayout,
} from "../../../components/reel/ReelEducationLayout";

export const LEXICAL_SCOPE_DURATION = 600;

const C = {
  ...colors,
  cyan: "#5DDCFF",
  violet: "#A78BFA",
  green: "#4ADE80",
  red: "#FB7185",
  panel: "rgba(15,23,42,0.94)",
};

const reveal = (frame: number, delay = 0, distance = 16): CSSProperties => ({
  opacity: interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }),
  translate: interpolate(frame, [delay, delay + 10], [`0px ${distance}px`, "0px 0px"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }),
});

const SceneShell = ({children, eyebrow}: {children: ReactNode; eyebrow?: string}) => (
  <AbsoluteFill style={{boxSizing: "border-box", padding: `${REEL_TOP_PADDING}px ${REEL_HORIZONTAL_PADDING}px 54px`}}>
    {eyebrow ? (
      <div style={{color: C.javascript, fontFamily: fontFamilies.sans, fontSize: 19, fontWeight: 850, letterSpacing: 3, textTransform: "uppercase"}}>
        {eyebrow}
      </div>
    ) : null}
    {children}
  </AbsoluteFill>
);

const Pill = ({name, value, accent = C.cyan, active = false}: {name: string; value: string; accent?: string; active?: boolean}) => (
  <div style={{alignItems: "center", backgroundColor: active ? `${accent}20` : "rgba(7,10,18,0.72)", border: `1px solid ${active ? accent : C.border}`, borderRadius: radii.pill, boxShadow: active ? `0 0 24px ${accent}28` : "none", display: "flex", gap: 10, padding: "8px 14px"}}>
    <span style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 21, fontWeight: 700}}>{name}</span>
    <span style={{color: C.textMuted, fontFamily: fontFamilies.mono, fontSize: 20}}>→</span>
    <span style={{color: accent, fontFamily: fontFamilies.mono, fontSize: 21, fontWeight: 800}}>{value}</span>
  </div>
);

type ScopeLevel = "global" | "outer" | "inner";

const scopeMeta = {
  global: {label: "GLOBAL SCOPE", variable: "globalValue", value: '"A"', color: C.javascript},
  outer: {label: "OUTER SCOPE", variable: "outerValue", value: '"B"', color: C.cyan},
  inner: {label: "INNER SCOPE", variable: "innerValue", value: '"C"', color: C.violet},
} as const;

const ScopeLabel = ({level, active, found}: {level: ScopeLevel; active?: boolean; found?: boolean}) => {
  const meta = scopeMeta[level];
  return (
    <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
      <div style={{alignItems: "center", color: active || found ? meta.color : C.textMuted, display: "flex", fontFamily: fontFamilies.sans, fontSize: 16, fontWeight: 850, gap: 8, letterSpacing: 1.8}}>
        {level === "global" ? <TechIcon name="globe" size={22} color={active || found ? meta.color : C.textMuted} /> : <Code2 size={22} />}
        {meta.label}
      </div>
      {active ? <span style={{backgroundColor: `${meta.color}20`, borderRadius: radii.pill, color: meta.color, fontFamily: fontFamilies.sans, fontSize: 12, fontWeight: 850, padding: "5px 9px"}}>SEARCHING</span> : null}
      {found ? <Check color={C.green} size={24} strokeWidth={3} /> : null}
    </div>
  );
};

const ScopeTree = ({active, found, buildFrame}: {active?: ScopeLevel; found?: ScopeLevel; buildFrame?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = buildFrame ?? frame;
  const pop = (delay: number) => spring({frame: localFrame - delay, fps, config: motion.smooth});
  const border = (level: ScopeLevel) => active === level || found === level ? scopeMeta[level].color : C.border;
  return (
    <div style={{backgroundColor: "rgba(15,23,42,0.84)", border: `2px solid ${border("global")}`, borderRadius: 25, boxShadow: active === "global" || found === "global" ? `0 0 28px ${scopeMeta.global.color}26` : shadows.soft, padding: "16px 18px", scale: interpolate(pop(0), [0, 1], [0.96, 1]), opacity: pop(0)}}>
      <ScopeLabel level="global" active={active === "global"} found={found === "global"} />
      <div style={{marginTop: 11}}><Pill name="globalValue" value={'"A"'} accent={C.javascript} active={found === "global"} /></div>
      <div style={{backgroundColor: "rgba(7,10,18,0.66)", border: `2px solid ${border("outer")}`, borderRadius: 21, marginTop: 12, opacity: pop(7), padding: "14px 16px", scale: interpolate(pop(7), [0, 1], [0.96, 1])}}>
        <ScopeLabel level="outer" active={active === "outer"} found={found === "outer"} />
        <div style={{marginTop: 9}}><Pill name="outerValue" value={'"B"'} active={found === "outer"} /></div>
        <div style={{backgroundColor: "rgba(20,14,38,0.72)", border: `2px solid ${border("inner")}`, borderRadius: 18, marginTop: 11, opacity: pop(14), padding: "13px 14px", scale: interpolate(pop(14), [0, 1], [0.96, 1])}}>
          <ScopeLabel level="inner" active={active === "inner"} found={found === "inner"} />
          <div style={{marginTop: 8}}><Pill name="innerValue" value={'"C"'} accent={C.violet} active={found === "inner"} /></div>
        </div>
      </div>
    </div>
  );
};

const HookScene = () => {
  const frame = useCurrentFrame();
  const firstOut = interpolate(frame, [28, 39], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const answer = spring({frame: frame - 34, fps: 30, config: motion.smooth});
  return (
    <SceneShell>
      <div style={{alignItems: "center", display: "flex", height: "100%", justifyContent: "center", textAlign: "center"}}>
        <div style={{position: "relative", width: 890}}>
          <Search color={C.cyan} size={66} style={{marginBottom: 24, ...reveal(frame)}} strokeWidth={2.3} />
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 72, fontWeight: 830, letterSpacing: -2.6, lineHeight: 1.08, opacity: firstOut}}>Where does JavaScript look for a variable?</div>
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 80, fontWeight: 850, inset: "90px 0 0", letterSpacing: -3, opacity: answer, position: "absolute", scale: interpolate(answer, [0, 1], [0.94, 1])}}>It follows<br /><span style={{color: C.javascript}}>Lexical Scope.</span></div>
        </div>
      </div>
    </SceneShell>
  );
};

const codeLines = [
  'const globalValue = "A";',
  "function outer() {",
  '  const outerValue = "B";',
  "  function inner() {",
  '    const innerValue = "C";',
  "  }",
  "}",
] as const;

const CodeStructureScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="Code structure">
      <div style={{alignItems: "center", display: "flex", gap: 16, marginTop: 12}}>
        {(["Global", "outer()", "inner()"] as const).map((item, index) => <div key={item} style={{alignItems: "center", display: "flex", gap: 16, ...reveal(frame, index * 7)}}><span style={{backgroundColor: index === 0 ? `${C.javascript}18` : index === 1 ? `${C.cyan}18` : `${C.violet}18`, border: `1px solid ${index === 0 ? C.javascript : index === 1 ? C.cyan : C.violet}`, borderRadius: radii.pill, color: C.text, fontFamily: fontFamilies.mono, fontSize: 22, fontWeight: 750, padding: "8px 14px"}}>{item}</span>{index < 2 ? <span style={{color: C.textMuted, fontSize: 26}}>→</span> : null}</div>)}
      </div>
      <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: radii.lg, boxShadow: shadows.soft, marginTop: 18, overflow: "hidden", padding: "14px 20px"}}>
        {codeLines.map((line, index) => {
          const depth = index >= 3 && index <= 5 ? 2 : index >= 1 && index <= 6 ? 1 : 0;
          return <div key={line} style={{color: depth === 0 ? C.javascript : depth === 1 ? C.cyan : C.violet, fontFamily: fontFamilies.mono, fontSize: 23, fontWeight: 600, lineHeight: 1.5, opacity: interpolate(frame, [index * 5, index * 5 + 8], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), translate: `${depth * 12}px 0px`}}>{line}</div>;
        })}
      </div>
    </SceneShell>
  );
};

const ScopeTreeScene = () => {
  const frame = useCurrentFrame();
  return <SceneShell eyebrow="Lexical nesting"><div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 43, fontWeight: 820, margin: "10px 0 15px", ...reveal(frame)}}>Code nesting creates scope nesting.</div><ScopeTree buildFrame={frame} /></SceneShell>;
};

const LookupPath = ({name, target, visited}: {name: string; target: ScopeLevel; visited: ScopeLevel[]}) => {
  const frame = useCurrentFrame();
  const currentIndex = Math.min(visited.length - 1, Math.floor(interpolate(frame, [8, 34], [0, visited.length], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})));
  const current = visited[Math.max(0, currentIndex)];
  const found = frame >= 34 ? target : undefined;
  return (
    <>
      <div style={{alignItems: "center", display: "flex", justifyContent: "space-between", margin: "10px 0 13px"}}>
        <div style={{alignItems: "center", display: "flex", gap: 12}}><Search color={C.cyan} size={32} /><span style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 30, fontWeight: 800}}>{name}</span></div>
        <div style={{backgroundColor: found ? `${C.green}1c` : `${C.cyan}18`, border: `1px solid ${found ? C.green : C.cyan}`, borderRadius: radii.pill, color: found ? C.green : C.cyan, fontFamily: fontFamilies.sans, fontSize: 15, fontWeight: 850, padding: "7px 11px"}}>{found ? "FOUND" : "LOOKING OUTWARD"}</div>
      </div>
      <ScopeTree active={found ? undefined : current} found={found} />
      <div style={{alignItems: "center", color: found ? C.green : C.textMuted, display: "flex", fontFamily: fontFamilies.sans, fontSize: 19, fontWeight: 750, gap: 9, justifyContent: "center", marginTop: 11}}>
        {visited.map((level, index) => <span key={level} style={{alignItems: "center", display: "flex", gap: 9, opacity: interpolate(frame, [8 + index * 9, 14 + index * 9], [0.25, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>{scopeMeta[level].label.replace(" SCOPE", "")}{index < visited.length - 1 ? <span style={{color: C.textMuted}}>→</span> : null}</span>)}
        {found ? <Check size={24} strokeWidth={3} /> : null}
      </div>
    </>
  );
};

const LookupScene = ({name, target, visited}: {name: string; target: ScopeLevel; visited: ScopeLevel[]}) => <SceneShell eyebrow="Identifier lookup"><LookupPath name={name} target={target} visited={visited} /></SceneShell>;

const ConsoleScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="Console result">
      <div style={{alignItems: "center", display: "flex", height: 670, justifyContent: "center"}}>
        <div style={{backgroundColor: "#05080E", border: `1px solid ${C.border}`, borderRadius: radii.lg, boxShadow: shadows.elevated, padding: "28px 32px", width: 720, ...reveal(frame)}}>
          <div style={{alignItems: "center", color: C.textMuted, display: "flex", fontFamily: fontFamilies.sans, fontSize: 18, fontWeight: 750, gap: 10}}><Terminal size={26} /> CONSOLE</div>
          <div style={{color: C.green, fontFamily: fontFamilies.mono, fontSize: 76, fontWeight: 850, letterSpacing: 12, marginTop: 30, ...reveal(frame, 10)}}>A B C</div>
          <div style={{borderTop: `1px solid ${C.border}`, color: C.text, fontFamily: fontFamilies.sans, fontSize: 29, fontWeight: 720, marginTop: 25, paddingTop: 21, ...reveal(frame, 20)}}>All found through lexical scope.</div>
        </div>
      </div>
    </SceneShell>
  );
};

const DirectionRuleScene = () => {
  const frame = useCurrentFrame();
  const upward = interpolate(frame, [8, 31], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)});
  return (
    <SceneShell eyebrow="The direction rule">
      <div style={{display: "grid", gridTemplateColumns: "0.8fr 1.2fr", height: 690, placeItems: "center"}}>
        <div style={{textAlign: "center", ...reveal(frame)}}>
          {(["GLOBAL", "OUTER", "INNER"] as const).map((label, index) => <div key={label} style={{color: index === 2 ? C.violet : index === 1 ? C.cyan : C.javascript, fontFamily: fontFamilies.sans, fontSize: 31, fontWeight: 850, margin: "10px 0"}}>{label}{index < 2 ? <div style={{color: C.green, fontSize: 34, opacity: upward}}>↑</div> : null}</div>)}
        </div>
        <div>
          <Check color={C.green} size={58} strokeWidth={2.8} style={reveal(frame, 8)} />
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 43, fontWeight: 820, lineHeight: 1.18, marginTop: 18, ...reveal(frame, 13)}}>Inner scopes can<br /><span style={{color: C.green}}>look outward.</span></div>
          <div style={{color: C.textMuted, fontFamily: fontFamilies.sans, fontSize: 23, lineHeight: 1.4, marginTop: 20, ...reveal(frame, 23)}}>Current → outer → global</div>
        </div>
      </div>
    </SceneShell>
  );
};

const InvalidLookupScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="The reverse does not work">
      <div style={{alignItems: "center", display: "grid", gridTemplateColumns: "1fr 1fr", height: 680}}>
        <div style={{...reveal(frame)}}>
          <div style={{backgroundColor: C.panel, border: `2px solid ${C.javascript}`, borderRadius: radii.lg, padding: "23px 25px"}}><ScopeLabel level="global" active /><div style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 25, marginTop: 24}}>innerValue ?</div></div>
          <div style={{borderLeft: `3px dashed ${C.red}`, height: 90, margin: "12px 0 0 50%", opacity: interpolate(frame, [10, 23], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}} />
          <div style={{color: C.red, fontFamily: fontFamilies.sans, fontSize: 20, fontWeight: 800, textAlign: "center"}}>STOP — no inward search</div>
        </div>
        <div style={{paddingLeft: 35}}>
          <CircleX color={C.red} size={62} style={reveal(frame, 18)} strokeWidth={2.5} />
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 39, fontWeight: 830, marginTop: 16, ...reveal(frame, 22)}}>Not accessible</div>
          <div style={{backgroundColor: `${C.red}18`, border: `1px solid ${C.red}`, borderRadius: radii.md, color: C.red, fontFamily: fontFamilies.mono, fontSize: 24, fontWeight: 750, marginTop: 15, padding: "12px 16px", ...reveal(frame, 28)}}>ReferenceError</div>
          <div style={{color: C.textMuted, fontFamily: fontFamilies.sans, fontSize: 22, lineHeight: 1.4, marginTop: 18, ...reveal(frame, 34)}}>Outer scopes cannot look inward.</div>
        </div>
      </div>
    </SceneShell>
  );
};

const LexicalDefinitionScene = () => {
  const frame = useCurrentFrame();
  const row = (text: string, good: boolean, delay: number) => <div style={{alignItems: "center", backgroundColor: good ? `${C.green}12` : `${C.red}10`, border: `1px solid ${good ? C.green : C.red}`, borderRadius: radii.md, display: "flex", gap: 14, padding: "17px 19px", ...reveal(frame, delay)}}>{good ? <Check color={C.green} size={28} /> : <CircleX color={C.red} size={28} />}<span style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 26, fontWeight: 760}}>{text}</span></div>;
  return (
    <SceneShell eyebrow="Why “lexical”?">
      <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 48, fontWeight: 840, lineHeight: 1.16, marginTop: 18, ...reveal(frame)}}>Scope comes from where code is <span style={{color: C.javascript}}>written.</span></div>
      <div style={{alignItems: "center", display: "flex", gap: 18, margin: "26px 0", ...reveal(frame, 9)}}><Code2 color={C.violet} size={40} /><span style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 27, fontWeight: 700}}>inner() is written inside outer()</span></div>
      <div style={{display: "grid", gap: 14}}>{row("Code location determines scope", true, 16)}{row("Who calls the function", false, 25)}</div>
    </SceneShell>
  );
};

const SummaryScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="Final mental model">
      <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 44, fontWeight: 830, marginTop: 12, ...reveal(frame)}}>Identifier lookup</div>
      <div style={{alignItems: "center", display: "flex", gap: 10, marginTop: 22}}>{["Current", "Outer", "Outer", "Global"].map((item, index) => <div key={`${item}-${index}`} style={{alignItems: "center", display: "flex", gap: 10, ...reveal(frame, 5 + index * 6)}}><span style={{backgroundColor: C.panel, border: `1px solid ${index === 0 ? C.violet : index === 3 ? C.javascript : C.cyan}`, borderRadius: radii.md, color: C.text, fontFamily: fontFamilies.sans, fontSize: 21, fontWeight: 760, padding: "13px 15px"}}>{item}</span>{index < 3 ? <span style={{color: C.textMuted, fontSize: 24}}>→</span> : null}</div>)}</div>
      <div style={{display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr", marginTop: 26}}>
        <div style={{backgroundColor: `${C.green}12`, border: `1px solid ${C.green}`, borderRadius: radii.lg, padding: "20px 22px", ...reveal(frame, 28)}}><Check color={C.green} size={30} /><div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 26, fontWeight: 790, marginTop: 10}}>Stop when found.</div></div>
        <div style={{backgroundColor: `${C.red}10`, border: `1px solid ${C.red}`, borderRadius: radii.lg, padding: "20px 22px", ...reveal(frame, 34)}}><CircleX color={C.red} size={30} /><div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 24, fontWeight: 790, marginTop: 10}}>Not found → ReferenceError</div></div>
      </div>
      <div style={{borderTop: `1px solid ${C.border}`, color: C.text, fontFamily: fontFamilies.sans, fontSize: 29, fontWeight: 760, marginTop: 24, paddingTop: 19, ...reveal(frame, 42)}}>Lexical scope follows <span style={{color: C.javascript}}>code structure.</span></div>
      <div style={{color: C.violet, fontFamily: fontFamilies.sans, fontSize: 21, fontWeight: 800, marginTop: 13, ...reveal(frame, 52)}}>Next → Closures</div>
    </SceneShell>
  );
};

export const LexicalScope = () => (
  <ReelEducationLayout>
    <Sequence durationInFrames={45} premountFor={30} name="Hook"><HookScene /></Sequence>
    <Sequence from={45} durationInFrames={60} premountFor={30} name="Nested code"><CodeStructureScene /></Sequence>
    <Sequence from={105} durationInFrames={65} premountFor={30} name="Build scope tree"><ScopeTreeScene /></Sequence>
    <Sequence from={170} durationInFrames={50} premountFor={30} name="Lookup innerValue"><LookupScene name="innerValue" target="inner" visited={["inner"]} /></Sequence>
    <Sequence from={220} durationInFrames={55} premountFor={30} name="Lookup outerValue"><LookupScene name="outerValue" target="outer" visited={["inner", "outer"]} /></Sequence>
    <Sequence from={275} durationInFrames={60} premountFor={30} name="Lookup globalValue"><LookupScene name="globalValue" target="global" visited={["inner", "outer", "global"]} /></Sequence>
    <Sequence from={335} durationInFrames={45} premountFor={30} name="Console result"><ConsoleScene /></Sequence>
    <Sequence from={380} durationInFrames={55} premountFor={30} name="Inner can look outward"><DirectionRuleScene /></Sequence>
    <Sequence from={435} durationInFrames={55} premountFor={30} name="Outer cannot look inward"><InvalidLookupScene /></Sequence>
    <Sequence from={490} durationInFrames={55} premountFor={30} name="Lexical not dynamic"><LexicalDefinitionScene /></Sequence>
    <Sequence from={545} durationInFrames={55} premountFor={30} name="Summary"><SummaryScene /></Sequence>
  </ReelEducationLayout>
);
