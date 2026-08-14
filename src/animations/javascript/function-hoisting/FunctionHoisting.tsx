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
  red: "#ff708a",
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

type CaseKind = "declaration" | "var" | "const";
type Phase = "Creation Phase" | "Execution Phase";

const cases = {
  declaration: {
    title: "Function Declaration",
    accent: C.green,
    lines: [
      "sayHello();",
      "function sayHello() {",
      '  console.log("Hello");',
      "}",
    ],
  },
  var: {
    title: "var Function Expression",
    accent: C.cyan,
    lines: [
      "sayHello();",
      "var sayHello = function () {",
      '  console.log("Hello");',
      "};",
    ],
  },
  const: {
    title: "const Arrow Function",
    accent: C.violet,
    lines: [
      "sayHello();",
      "const sayHello = () => {",
      '  console.log("Hello");',
      "};",
    ],
  },
} as const;

const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = C.yellow,
}) => (
  <div
    style={{
      color,
      fontFamily: sans,
      fontSize: 16,
      fontWeight: 800,
      letterSpacing: 2.3,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Header: React.FC<{phase?: Phase}> = ({phase}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
      <div style={{color: C.text, fontFamily: sans, fontSize: 32, fontWeight: 830, letterSpacing: -1}}>
        Function <span style={{color: C.yellow}}>Hoisting</span>
      </div>
      {phase ? (
        <div
          style={{
            backgroundColor: phase === "Creation Phase" ? "rgba(167,139,250,0.12)" : "rgba(93,220,255,0.10)",
            border: `1px solid ${phase === "Creation Phase" ? C.violet : C.cyan}`,
            borderRadius: 999,
            color: phase === "Creation Phase" ? "#d8cbff" : "#b8efff",
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 800,
            padding: "9px 15px",
            ...reveal(frame, 0, 9),
          }}
        >
          ● &nbsp;{phase}
        </div>
      ) : null}
    </div>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{textAlign: "center", width: 980}}>
        <div style={{color: C.text, fontFamily: sans, fontSize: 51, fontWeight: 850, letterSpacing: -1.7, lineHeight: 1.18, ...reveal(frame)}}>
          Can you call a JavaScript function
          <br />before declaring it?
        </div>
        <div style={{color: C.cyan, fontFamily: sans, fontSize: 31, fontWeight: 780, marginTop: 27, ...reveal(frame, 24)}}>
          Sometimes. 👀
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CodePanel: React.FC<{kind: CaseKind; active?: number}> = ({kind, active}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pointer = spring({frame, fps, config: {damping: 24, stiffness: 150}});
  const item = cases[kind];
  return (
    <div>
      <Eyebrow color={C.muted}>Source code</Eyebrow>
      <div
        style={{
          backgroundColor: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          height: 286,
          marginTop: 11,
          overflow: "hidden",
          padding: "15px 14px",
          position: "relative",
        }}
      >
        {active !== undefined ? (
          <div
            style={{
              backgroundColor: "rgba(93,220,255,0.10)",
              border: `1px solid rgba(93,220,255,${0.35 + pointer * 0.4})`,
              borderRadius: 9,
              height: 52,
              left: 12,
              position: "absolute",
              right: 12,
              top: 18 + active * 62,
              translate: `${interpolate(pointer, [0, 1], [-13, 0])}px 0px`,
            }}
          />
        ) : null}
        {item.lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            style={{
              alignItems: "center",
              color: active !== undefined && active !== index ? C.muted : C.text,
              display: "flex",
              fontFamily: mono,
              fontSize: 20,
              height: 62,
              opacity: active !== undefined && active !== index ? 0.45 : 1,
              position: "relative",
            }}
          >
            <span style={{color: C.muted, fontSize: 15, width: 31}}>{index + 1}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const MemoryCard: React.FC<{kind: CaseKind}> = ({kind}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entry = spring({frame: frame - 4, fps, config: {damping: 22, stiffness: 145}});
  const value = kind === "declaration" ? "ƒ sayHello()" : kind === "var" ? "undefined" : "<uninitialized>";
  const accent = kind === "declaration" ? C.green : kind === "var" ? C.red : C.amber;
  const status = kind === "declaration" ? "✓ Function available" : kind === "var" ? "var binding · callable? no" : "Temporal Dead Zone · cannot access";
  return (
    <div>
      <Eyebrow color={C.muted}>Memory / binding</Eyebrow>
      <div
        style={{
          backgroundColor: C.raised,
          border: `1px solid ${accent}99`,
          borderRadius: 18,
          boxShadow: `0 0 32px ${accent}12`,
          marginTop: 11,
          opacity: entry,
          padding: "20px 23px",
          scale: interpolate(entry, [0, 1], [0.95, 1]),
        }}
      >
        <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
          <span style={{color: C.text, fontFamily: mono, fontSize: 23, fontWeight: 750}}>sayHello</span>
          <span style={{backgroundColor: `${accent}1a`, borderRadius: 999, color: accent, fontFamily: sans, fontSize: 13, fontWeight: 800, padding: "7px 10px"}}>
            {kind === "declaration" ? "DECLARATION" : kind === "var" ? "VAR" : "CONST · TDZ"}
          </span>
        </div>
        <div style={{color: accent, fontFamily: mono, fontSize: 25, fontWeight: 780, marginTop: 18}}>{value}</div>
        <div style={{borderTop: `1px solid ${C.border}`, color: accent, fontFamily: sans, fontSize: 16, fontWeight: 650, marginTop: 17, paddingTop: 13}}>{status}</div>
      </div>
    </div>
  );
};

const ConsolePanel: React.FC<{kind: CaseKind; visible: boolean}> = ({kind, visible}) => {
  const frame = useCurrentFrame();
  const heading = kind === "declaration" ? "Hello" : kind === "var" ? "TypeError" : "ReferenceError";
  const detail = kind === "var" ? "sayHello is not a function" : kind === "const" ? "Cannot access 'sayHello' before initialization" : "";
  const accent = kind === "declaration" ? C.green : C.red;
  return (
    <div style={{marginTop: 15}}>
      <Eyebrow color={C.muted}>Console</Eyebrow>
      <div style={{backgroundColor: "#050910", border: `1px solid ${C.border}`, borderRadius: 15, height: 102, marginTop: 9, padding: "14px 19px"}}>
        {visible ? (
          <div style={{...reveal(frame, 8, 10)}}>
            <div style={{color: accent, fontFamily: mono, fontSize: 20, fontWeight: 750}}><span style={{color: C.muted, marginRight: 9}}>›</span>{heading}</div>
            {detail ? <div style={{color: C.muted, fontFamily: mono, fontSize: 14, marginLeft: 22, marginTop: 7}}>{detail}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CaseScene: React.FC<{
  kind: CaseKind;
  phase: Phase;
  active?: number;
  consoleVisible?: boolean;
  note: string;
}> = ({kind, phase, active, consoleVisible = false, note}) => {
  const frame = useCurrentFrame();
  const accent = cases[kind].accent;
  return (
    <AbsoluteFill style={{padding: "36px 62px 43px"}}>
      <Header phase={phase} />
      <div style={{color: C.text, fontFamily: sans, fontSize: 23, fontWeight: 760, marginTop: 17, ...reveal(frame)}}>
        <span style={{color: accent}}>{cases[kind].title}</span>
      </div>
      <div style={{display: "grid", gap: 32, gridTemplateColumns: "1.12fr 0.88fr", marginTop: 17}}>
        <CodePanel kind={kind} active={active} />
        <div>
          <MemoryCard kind={kind} />
          <ConsolePanel kind={kind} visible={consoleVisible} />
        </div>
      </div>
      <div style={{alignItems: "center", bottom: 34, color: C.text, display: "flex", fontFamily: sans, fontSize: 19, fontWeight: 650, gap: 11, left: 62, position: "absolute", ...reveal(frame, 8)}}>
        <span style={{color: accent}}>●</span>{note}
      </div>
    </AbsoluteFill>
  );
};

const WhyDeclarationWorks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", padding: "70px 110px"}}>
      <div style={{textAlign: "center", width: 1000}}>
        <Eyebrow color={C.green}>Why it works</Eyebrow>
        <div style={{color: C.text, fontFamily: sans, fontSize: 43, fontWeight: 830, letterSpacing: -1.3, lineHeight: 1.22, marginTop: 18, ...reveal(frame, 3)}}>
          Function declarations are initialized
          <br />with the <span style={{color: C.green}}>actual function</span> during setup.
        </div>
        <div style={{color: C.muted, fontFamily: sans, fontSize: 21, marginTop: 25, ...reveal(frame, 18)}}>
          The source code is not physically moved.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const columns = [
    {title: "Function Declaration", value: "ƒ function", result: "✓ Works", color: C.green},
    {title: "var Function Expression", value: "undefined", result: "✕ TypeError", color: C.red},
    {title: "const Arrow Function", value: "<uninitialized>\nTDZ", result: "✕ ReferenceError", color: C.amber},
  ];
  return (
    <AbsoluteFill style={{padding: "40px 66px"}}>
      <Eyebrow>Creation-phase comparison</Eyebrow>
      <div style={{color: C.text, fontFamily: sans, fontSize: 37, fontWeight: 830, letterSpacing: -1, marginTop: 7}}>Same “function” idea. Different declaration semantics.</div>
      <div style={{display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)", marginTop: 29}}>
        {columns.map((column, index) => (
          <div key={column.title} style={{backgroundColor: C.panel, border: `1px solid ${column.color}66`, borderRadius: 18, minHeight: 355, padding: "22px 20px", ...reveal(frame, index * 7)}}>
            <div style={{color: column.color, fontFamily: sans, fontSize: 20, fontWeight: 800, lineHeight: 1.25, minHeight: 52}}>{column.title}</div>
            <div style={{borderTop: `1px solid ${C.border}`, color: C.muted, fontFamily: sans, fontSize: 15, fontWeight: 750, letterSpacing: 1.5, marginTop: 15, paddingTop: 18}}>MEMORY DURING SETUP</div>
            <div style={{color: column.color, fontFamily: mono, fontSize: 23, fontWeight: 760, lineHeight: 1.5, minHeight: 90, paddingTop: 18, whiteSpace: "pre-line", ...reveal(frame, 18 + index * 7)}}>{column.value}</div>
            <div style={{borderTop: `1px solid ${C.border}`, color: column.color, fontFamily: sans, fontSize: 21, fontWeight: 800, marginTop: 13, paddingTop: 20, ...reveal(frame, 34 + index * 7)}}>{column.result}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    ["Function Declaration", "function available during setup", C.green],
    ["var + Function Expression", "undefined until assignment executes", C.cyan],
    ["let/const + Function Expression", "TDZ until initialization", C.violet],
  ] as const;
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", padding: "50px 100px"}}>
      <div style={{width: 1030}}>
        <Eyebrow>Final mental model</Eyebrow>
        <div style={{display: "grid", gap: 12, marginTop: 20}}>
          {rows.map((row, index) => (
            <div key={row[0]} style={{alignItems: "center", backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 15, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", padding: "17px 21px", ...reveal(frame, 5 + index * 9)}}>
              <div style={{color: row[2], fontFamily: sans, fontSize: 20, fontWeight: 800}}>{row[0]}</div>
              <div style={{color: C.text, fontFamily: sans, fontSize: 20}}>→ {row[1]}</div>
            </div>
          ))}
        </div>
        <div style={{color: C.text, fontFamily: sans, fontSize: 36, fontWeight: 840, letterSpacing: -1, marginTop: 28, textAlign: "center", ...reveal(frame, 35)}}>
          Hoisting behavior depends on <span style={{color: C.yellow}}>how the function is declared</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const FunctionHoisting: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage:
          "radial-gradient(circle at 84% 12%, rgba(93,220,255,0.07), transparent 28%), radial-gradient(circle at 10% 88%, rgba(167,139,250,0.08), transparent 30%)",
      }}
    >
      <Sequence durationInFrames={55} name="Hook"><Hook /></Sequence>
      <Sequence from={55} durationInFrames={65} name="Declaration setup"><CaseScene kind="declaration" phase="Creation Phase" note="Binding created and initialized with the actual function" /></Sequence>
      <Sequence from={120} durationInFrames={65} name="Declaration executes"><CaseScene kind="declaration" phase="Execution Phase" active={0} consoleVisible note="Lookup finds ƒ sayHello() · call executes · Hello" /></Sequence>
      <Sequence from={185} durationInFrames={45} name="Why declaration works"><WhyDeclarationWorks /></Sequence>
      <Sequence from={230} durationInFrames={65} name="Var expression setup"><CaseScene kind="var" phase="Creation Phase" note="The var binding exists and is initialized with undefined" /></Sequence>
      <Sequence from={295} durationInFrames={75} name="Var expression fails"><CaseScene kind="var" phase="Execution Phase" active={0} consoleVisible note="undefined() is a call on a non-function value · TypeError" /></Sequence>
      <Sequence from={370} durationInFrames={65} name="Const expression setup"><CaseScene kind="const" phase="Creation Phase" note="Binding exists, but remains uninitialized in the TDZ" /></Sequence>
      <Sequence from={435} durationInFrames={75} name="Const expression fails"><CaseScene kind="const" phase="Execution Phase" active={0} consoleVisible note="Binding lookup is blocked before initialization · ReferenceError" /></Sequence>
      <Sequence from={510} durationInFrames={65} name="Comparison"><Comparison /></Sequence>
      <Sequence from={575} durationInFrames={65} name="Summary"><Summary /></Sequence>
    </AbsoluteFill>
  );
};
