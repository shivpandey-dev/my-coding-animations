import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  bg: "#070b14",
  panel: "#0d1524",
  raised: "#111c30",
  border: "#293955",
  text: "#f4f7fb",
  muted: "#8f9db6",
  cyan: "#5ddcff",
  green: "#68e0a5",
  amber: "#ffc857",
  violet: "#a78bfa",
  yellow: "#f7df1e",
};

const sans = "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";
const mono = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const reveal = (frame: number, start = 0, duration = 12) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.out(Easing.cubic),
  }),
  translate: interpolate(
    frame,
    [start, start + duration],
    ["0px 16px", "0px 0px"],
    {
      extrapolateLeft: "clamp" as const,
      extrapolateRight: "clamp" as const,
      easing: Easing.out(Easing.cubic),
    },
  ),
});

const codeLines = [
  'const name = "Shiv";',
  "",
  "function greet(age) {",
  '  const message = "Hello";',
  "",
  "  console.log(name, age, message);",
  "}",
  "",
  "greet(30);",
] as const;

const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = C.yellow,
}) => (
  <div style={{color, fontFamily: sans, fontSize: 15, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase"}}>
    {children}
  </div>
);

const Header: React.FC = () => (
  <div style={{color: C.text, fontFamily: sans, fontSize: 31, fontWeight: 830, letterSpacing: -1}}>
    JavaScript <span style={{color: C.yellow}}>Execution Context</span>
  </div>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{textAlign: "center", width: 1040}}>
        <div style={{color: C.text, fontFamily: sans, fontSize: 49, fontWeight: 850, letterSpacing: -1.7, lineHeight: 1.2, ...reveal(frame)}}>
          What actually happens when
          <br />JavaScript runs your code?
        </div>
        <div style={{color: C.cyan, fontFamily: sans, fontSize: 28, fontWeight: 750, marginTop: 28, ...reveal(frame, 24)}}>
          JavaScript executes code inside an Execution Context.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CodePanel: React.FC<{activeLine?: number; compact?: boolean}> = ({activeLine, compact = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pointer = spring({frame, fps, config: {damping: 24, stiffness: 150}});
  const row = compact ? 34 : 39;
  return (
    <div>
      <Eyebrow color={C.muted}>Source code</Eyebrow>
      <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 17, marginTop: 10, overflow: "hidden", padding: "12px 13px", position: "relative"}}>
        {activeLine !== undefined ? (
          <div style={{backgroundColor: "rgba(93,220,255,0.10)", border: `1px solid rgba(93,220,255,${0.35 + pointer * 0.4})`, borderRadius: 7, height: row - 5, left: 10, position: "absolute", right: 10, top: 14 + activeLine * row, translate: `${interpolate(pointer, [0, 1], [-11, 0])}px 0px`}} />
        ) : null}
        {codeLines.map((line, index) => (
          <div key={`${line}-${index}`} style={{alignItems: "center", color: activeLine !== undefined && activeLine !== index ? C.muted : C.text, display: "flex", fontFamily: mono, fontSize: compact ? 16 : 18, height: row, opacity: activeLine !== undefined && activeLine !== index ? 0.43 : 1, position: "relative"}}>
            <span style={{color: C.muted, fontSize: 13, width: 27}}>{index + 1}</span>{line}
          </div>
        ))}
      </div>
    </div>
  );
};

type ContextState = {
  globalActive: boolean;
  showGlobalName?: boolean;
  showGlobalFunction?: boolean;
  showFunction?: boolean;
  functionActive?: boolean;
  showAge?: boolean;
  showMessage?: boolean;
};

const ContextCard: React.FC<{
  title: string;
  active: boolean;
  values: Array<[string, string, boolean]>;
  accent: string;
}> = ({title, active, values, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 3, fps, config: {damping: 22, stiffness: 145}});
  return (
    <div style={{backgroundColor: C.raised, border: `1px solid ${active ? accent : C.border}`, borderRadius: 17, boxShadow: active ? `0 0 34px ${accent}18` : undefined, opacity: enter, padding: "17px 19px", scale: interpolate(enter, [0, 1], [0.94, 1])}}>
      <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
        <div style={{color: C.text, fontFamily: sans, fontSize: 18, fontWeight: 800}}>{title}</div>
        <div style={{backgroundColor: active ? `${accent}1c` : "rgba(143,157,182,0.10)", borderRadius: 999, color: active ? accent : C.muted, fontFamily: sans, fontSize: 12, fontWeight: 850, padding: "6px 9px"}}>
          {active ? "● ACTIVE" : "○ PAUSED"}
        </div>
      </div>
      <div style={{borderTop: `1px solid ${C.border}`, display: "grid", gap: 9, marginTop: 13, minHeight: 53, paddingTop: 12}}>
        {values.map(([name, value, visible], index) => visible ? (
          <div key={name} style={{alignItems: "center", display: "flex", justifyContent: "space-between", ...reveal(frame, 6 + index * 7, 9)}}>
            <span style={{color: C.muted, fontFamily: mono, fontSize: 15}}>{name}</span>
            <span style={{color: accent, fontFamily: mono, fontSize: 16, fontWeight: 750}}>{value}</span>
          </div>
        ) : null)}
      </div>
    </div>
  );
};

const ContextStack: React.FC<ContextState> = ({
  globalActive,
  showGlobalName = false,
  showGlobalFunction = false,
  showFunction = false,
  functionActive = false,
  showAge = false,
  showMessage = false,
}) => (
  <div>
    <Eyebrow color={C.muted}>Execution contexts · educational model</Eyebrow>
    <div style={{display: "grid", gap: 11, marginTop: 10}}>
      {showFunction ? (
        <ContextCard
          title="greet Execution Context"
          active={functionActive}
          accent={C.violet}
          values={[["age", "30", showAge], ["message", '"Hello"', showMessage]]}
        />
      ) : null}
      <ContextCard
        title="Global Execution Context"
        active={globalActive}
        accent={C.cyan}
        values={[["name", '"Shiv"', showGlobalName], ["greet", "ƒ greet()", showGlobalFunction]]}
      />
    </div>
  </div>
);

const ConsolePanel: React.FC<{visible: boolean}> = ({visible}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{marginTop: 12}}>
      <Eyebrow color={C.muted}>Console</Eyebrow>
      <div style={{backgroundColor: "#050910", border: `1px solid ${C.border}`, borderRadius: 14, height: 61, marginTop: 8, padding: "13px 17px"}}>
        {visible ? <div style={{color: C.green, fontFamily: mono, fontSize: 17, fontWeight: 700, ...reveal(frame, 8, 10)}}><span style={{color: C.muted, marginRight: 9}}>›</span>Shiv 30 Hello</div> : null}
      </div>
    </div>
  );
};

const CodeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "39px 90px"}}>
      <Header />
      <div style={{margin: "22px auto 0", width: 790, ...reveal(frame, 3)}}><CodePanel compact /></div>
      <div style={{color: C.cyan, fontFamily: sans, fontSize: 23, fontWeight: 750, marginTop: 17, textAlign: "center", ...reveal(frame, 25)}}>JavaScript starts with the global code.</div>
    </AbsoluteFill>
  );
};

const RuntimeScene: React.FC<ContextState & {activeLine?: number; consoleVisible?: boolean; note: string}> = ({activeLine, consoleVisible = false, note, ...state}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "35px 61px 42px"}}>
      <Header />
      <div style={{display: "grid", gap: 31, gridTemplateColumns: "1.08fr 0.92fr", marginTop: 21}}>
        <CodePanel activeLine={activeLine} compact />
        <div><ContextStack {...state} /><ConsolePanel visible={consoleVisible} /></div>
      </div>
      <div style={{alignItems: "center", bottom: 31, color: C.text, display: "flex", fontFamily: sans, fontSize: 18, fontWeight: 650, gap: 10, left: 61, position: "absolute", ...reveal(frame, 8)}}><span style={{color: state.functionActive ? C.violet : C.cyan}}>●</span>{note}</div>
    </AbsoluteFill>
  );
};

const LookupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lookup = frame < 25 ? "age" : frame < 50 ? "message" : "name";
  const detail = lookup === "age" ? "greet context → 30" : lookup === "message" ? 'greet context → "Hello"' : 'not local → outer environment → "Shiv"';
  return (
    <AbsoluteFill style={{padding: "35px 61px 42px"}}>
      <Header />
      <div style={{display: "grid", gap: 31, gridTemplateColumns: "1.08fr 0.92fr", marginTop: 21}}>
        <CodePanel activeLine={5} compact />
        <div>
          <ContextStack globalActive={false} showGlobalName showGlobalFunction showFunction functionActive showAge showMessage />
          <ConsolePanel visible={frame >= 63} />
        </div>
      </div>
      <div style={{alignItems: "center", bottom: 30, display: "flex", gap: 12, left: 61, position: "absolute", ...reveal(frame % 25, 0, 8)}}>
        <span style={{backgroundColor: "rgba(167,139,250,0.13)", border: `1px solid ${C.violet}`, borderRadius: 8, color: C.violet, fontFamily: mono, fontSize: 18, fontWeight: 800, padding: "7px 11px"}}>{lookup}</span>
        <span style={{color: C.text, fontFamily: sans, fontSize: 18, fontWeight: 650}}>→ {detail}</span>
      </div>
    </AbsoluteFill>
  );
};

const ReturnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const removal = interpolate(frame, [12, 38], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{padding: "38px 90px"}}>
      <Header />
      <div style={{color: C.text, fontFamily: sans, fontSize: 33, fontWeight: 820, marginTop: 36, textAlign: "center", ...reveal(frame)}}>greet() finished</div>
      <div style={{display: "grid", gap: 14, margin: "31px auto 0", width: 590}}>
        <div style={{opacity: removal, scale: interpolate(removal, [0, 1], [0.92, 1]), translate: `0px ${interpolate(removal, [0, 1], [-18, 0])}px`}}>
          <ContextCard title="greet Execution Context" active={frame < 24} accent={C.violet} values={[["age", "30", true], ["message", '"Hello"', true]]} />
        </div>
        <ContextCard title="Global Execution Context" active={frame >= 30} accent={C.cyan} values={[["name", '"Shiv"', true], ["greet", "ƒ greet()", true]]} />
      </div>
      <div style={{color: C.muted, fontFamily: sans, fontSize: 19, marginTop: 23, textAlign: "center", ...reveal(frame, 35)}}>Function context removed · global execution resumes</div>
    </AbsoluteFill>
  );
};

const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    ["Script starts", "Global Execution Context"],
    ["Function called", "New Function Execution Context"],
    ["Function finishes", "Function Context removed"],
  ];
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", padding: "48px 100px"}}>
      <div style={{width: 1020}}>
        <Eyebrow>Final mental model</Eyebrow>
        <div style={{display: "grid", gap: 11, marginTop: 19}}>
          {rows.map((row, index) => <div key={row[0]} style={{alignItems: "center", backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", padding: "15px 20px", ...reveal(frame, 4 + index * 8)}}><span style={{color: index === 1 ? C.violet : C.cyan, fontFamily: sans, fontSize: 19, fontWeight: 800}}>{row[0]}</span><span style={{color: C.text, fontFamily: sans, fontSize: 19}}>→ {row[1]}</span></div>)}
        </div>
        <div style={{color: C.text, fontFamily: sans, fontSize: 30, fontWeight: 830, marginTop: 24, textAlign: "center", ...reveal(frame, 31)}}>Execution Context = the runtime environment used to execute code.</div>
        <div style={{borderTop: `1px solid ${C.border}`, color: C.muted, display: "flex", fontFamily: sans, fontSize: 17, justifyContent: "space-between", marginTop: 22, paddingTop: 16, ...reveal(frame, 43)}}><span>Related, not identical: execution context ≠ scope</span><span style={{color: C.yellow}}>Next → Call Stack</span></div>
      </div>
    </AbsoluteFill>
  );
};

export const ExecutionContext: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg, backgroundImage: "radial-gradient(circle at 84% 12%, rgba(93,220,255,0.07), transparent 28%), radial-gradient(circle at 10% 88%, rgba(167,139,250,0.08), transparent 30%)"}}>
    <Sequence durationInFrames={55} name="Hook"><Hook /></Sequence>
    <Sequence from={55} durationInFrames={55} name="Code introduction"><CodeIntro /></Sequence>
    <Sequence from={110} durationInFrames={65} name="Global context created"><RuntimeScene globalActive showGlobalName showGlobalFunction note="Created when the script starts · simplified runtime model" /></Sequence>
    <Sequence from={175} durationInFrames={55} name="Execute name"><RuntimeScene globalActive showGlobalName showGlobalFunction activeLine={0} note={'Global execution initializes name → "Shiv"'} /></Sequence>
    <Sequence from={230} durationInFrames={45} name="Function declaration"><RuntimeScene globalActive showGlobalName showGlobalFunction activeLine={2} note="greet exists in the global context" /></Sequence>
    <Sequence from={275} durationInFrames={65} name="Function call"><RuntimeScene globalActive={false} showGlobalName showGlobalFunction showFunction functionActive showAge activeLine={8} note="Every function call creates a new Function Execution Context" /></Sequence>
    <Sequence from={340} durationInFrames={55} name="Function context active"><RuntimeScene globalActive={false} showGlobalName showGlobalFunction showFunction functionActive showAge activeLine={2} note="Execution now continues inside greet() · global context is paused" /></Sequence>
    <Sequence from={395} durationInFrames={60} name="Function local variable"><RuntimeScene globalActive={false} showGlobalName showGlobalFunction showFunction functionActive showAge showMessage activeLine={3} note={'message → "Hello" belongs to this greet() invocation'} /></Sequence>
    <Sequence from={455} durationInFrames={85} name="Identifier lookups"><LookupScene /></Sequence>
    <Sequence from={540} durationInFrames={55} name="Function returns"><ReturnScene /></Sequence>
    <Sequence from={595} durationInFrames={65} name="Summary"><Summary /></Sequence>
  </AbsoluteFill>
);
