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

const Eyebrow: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = C.yellow,
}) => (
  <div
    style={{
      color,
      fontFamily: sans,
      fontSize: 20,
      fontWeight: 800,
      letterSpacing: 2.6,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Misconception: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{textAlign: "center", width: 1000}}>
        <div style={{color: C.text, fontFamily: sans, fontSize: 53, fontWeight: 830, letterSpacing: -1.7, ...reveal(frame)}}>
          Are <span style={{color: C.violet}}>let</span> and{" "}
          <span style={{color: C.cyan}}>const</span> hoisted?
        </div>
        <div style={{display: "flex", gap: 22, justifyContent: "center", marginTop: 38}}>
          <div
            style={{
              backgroundColor: "rgba(255,112,138,0.08)",
              border: `1px solid rgba(255,112,138,0.35)`,
              borderRadius: 17,
              color: C.muted,
              fontFamily: sans,
              fontSize: 22,
              padding: "20px 28px",
              ...reveal(frame, 14),
            }}
          >
            Common answer: <span style={{color: C.red, fontWeight: 800}}>✕ “No”</span>
          </div>
          <div
            style={{
              backgroundColor: "rgba(104,224,165,0.08)",
              border: `1px solid rgba(104,224,165,0.38)`,
              borderRadius: 17,
              color: C.text,
              fontFamily: sans,
              fontSize: 22,
              fontWeight: 650,
              padding: "20px 28px",
              ...reveal(frame, 30),
            }}
          >
            <span style={{color: C.green}}>✓ Yes</span> — but not initialized immediately
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

type LineNumber = 1 | 3 | 5;

const CodeCard: React.FC<{
  active?: LineNumber;
  keyword?: "let" | "const";
  compact?: boolean;
}> = ({active, keyword = "let", compact = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pointer = spring({frame, fps, config: {damping: 24, stiffness: 150}});
  const lines =
    keyword === "let"
      ? ["console.log(name);", 'let name = "Shiv";', "console.log(name);"]
      : ["console.log(age);", "const age = 30;"];
  const numbers = keyword === "let" ? [1, 3, 5] : [1, 3];
  const activeIndex = active === 1 ? 0 : active === 3 ? 1 : 2;
  const rowHeight = compact ? 70 : 78;

  return (
    <div>
      <Eyebrow color={C.muted}>Source code</Eyebrow>
      <div
        style={{
          backgroundColor: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          marginTop: 12,
          overflow: "hidden",
          padding: "14px 15px",
          position: "relative",
        }}
      >
        {active ? (
          <div
            style={{
              backgroundColor: "rgba(93,220,255,0.10)",
              border: `1px solid rgba(93,220,255,${0.35 + pointer * 0.4})`,
              borderRadius: 9,
              height: rowHeight - 14,
              left: 12,
              position: "absolute",
              right: 12,
              top: 21 + activeIndex * rowHeight,
              translate: `${interpolate(pointer, [0, 1], [-12, 0])}px 0px`,
            }}
          />
        ) : null}
        {lines.map((line, index) => (
          <div
            key={line}
            style={{
              alignItems: "center",
              color: active && active !== numbers[index] ? C.muted : C.text,
              display: "flex",
              fontFamily: mono,
              fontSize: compact ? 20 : 23,
              height: rowHeight,
              opacity: active && active !== numbers[index] ? 0.46 : 1,
              position: "relative",
            }}
          >
            <span style={{color: C.muted, fontSize: 16, width: 35}}>{numbers[index]}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const BindingCard: React.FC<{
  identifier: "name" | "age";
  value: "uninitialized" | '"Shiv"' | "30";
}> = ({identifier, value}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const settle = spring({frame: frame - 4, fps, config: {damping: 22, stiffness: 145}});
  const isTdz = value === "uninitialized";
  return (
    <div>
      <Eyebrow color={C.muted}>Execution context / memory</Eyebrow>
      <div
        style={{
          backgroundColor: C.raised,
          border: `1px solid ${isTdz ? "rgba(255,200,87,0.6)" : "rgba(104,224,165,0.6)"}`,
          borderRadius: 18,
          boxShadow: isTdz
            ? "0 0 32px rgba(255,200,87,0.08)"
            : "0 0 32px rgba(104,224,165,0.08)",
          marginTop: 12,
          opacity: settle,
          padding: "20px 24px",
          scale: interpolate(settle, [0, 1], [0.95, 1]),
        }}
      >
        <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
          <span style={{color: C.text, fontFamily: mono, fontSize: 25, fontWeight: 700}}>{identifier}</span>
          <span
            style={{
              backgroundColor: isTdz ? "rgba(255,200,87,0.12)" : "rgba(104,224,165,0.12)",
              borderRadius: 999,
              color: isTdz ? C.amber : C.green,
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 800,
              padding: "7px 11px",
            }}
          >
            {isTdz ? "⚠ UNINITIALIZED" : "✓ INITIALIZED"}
          </span>
        </div>
        <div style={{color: isTdz ? C.amber : C.green, fontFamily: mono, fontSize: 27, fontWeight: 750, marginTop: 18}}>
          {isTdz ? "<uninitialized>" : value}
        </div>
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            color: isTdz ? C.amber : C.green,
            fontFamily: sans,
            fontSize: 17,
            fontWeight: 650,
            marginTop: 17,
            paddingTop: 13,
          }}
        >
          {isTdz ? "Temporal Dead Zone · cannot access" : "TDZ ended at the declaration"}
        </div>
      </div>
    </div>
  );
};

const ConsoleCard: React.FC<{error?: boolean; success?: boolean}> = ({error, success}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{marginTop: 17}}>
      <Eyebrow color={C.muted}>Console</Eyebrow>
      <div
        style={{
          backgroundColor: "#050910",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          height: 100,
          marginTop: 10,
          padding: "15px 20px",
        }}
      >
        {error ? (
          <div style={{color: C.red, fontFamily: mono, fontSize: 20, ...reveal(frame, 7, 10)}}>
            <span style={{color: C.muted, marginRight: 10}}>›</span>ReferenceError
          </div>
        ) : null}
        {success ? (
          <div style={{color: C.green, fontFamily: mono, fontSize: 20, marginTop: error ? 10 : 0, ...reveal(frame, 9, 10)}}>
            <span style={{color: C.muted, marginRight: 10}}>›</span>Shiv
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Header: React.FC<{phase?: "Creation Phase" | "Execution Phase"}> = ({phase}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
      <div style={{color: C.text, fontFamily: sans, fontSize: 32, fontWeight: 820, letterSpacing: -1}}>
        <span style={{color: C.violet}}>let</span> / <span style={{color: C.cyan}}>const</span> Hoisting
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

const SourceQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "42px 90px"}}>
      <Header />
      <div style={{margin: "38px auto 0", width: 760, ...reveal(frame, 3)}}>
        <CodeCard />
      </div>
      <div style={{color: C.cyan, fontFamily: sans, fontSize: 28, fontWeight: 750, marginTop: 25, textAlign: "center", ...reveal(frame, 28)}}>
        What happens on the first line?
      </div>
    </AbsoluteFill>
  );
};

const LetStage: React.FC<{
  phase: "Creation Phase" | "Execution Phase";
  active?: LineNumber;
  value: "uninitialized" | '"Shiv"';
  error?: boolean;
  success?: boolean;
  note: string;
}> = ({phase, active, value, error, success, note}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "38px 64px 44px"}}>
      <Header phase={phase} />
      <div style={{display: "grid", gap: 34, gridTemplateColumns: "1.13fr 0.87fr", marginTop: 27}}>
        <CodeCard active={active} />
        <div>
          <BindingCard identifier="name" value={value} />
          <ConsoleCard error={error} success={success} />
        </div>
      </div>
      <div style={{alignItems: "center", bottom: 37, color: C.text, display: "flex", fontFamily: sans, fontSize: 20, fontWeight: 650, gap: 11, left: 64, position: "absolute", ...reveal(frame, 8)}}>
        <span style={{color: value === "uninitialized" ? C.amber : C.green}}>●</span>{note}
      </div>
    </AbsoluteFill>
  );
};

const ConstExample: React.FC = () => {
  const frame = useCurrentFrame();
  const initialized = frame >= 52;
  return (
    <AbsoluteFill style={{padding: "40px 74px"}}>
      <Header phase="Execution Phase" />
      <div style={{color: C.text, fontFamily: sans, fontSize: 26, fontWeight: 750, marginTop: 25, ...reveal(frame)}}>
        <span style={{color: C.cyan}}>const</span> follows the same TDZ rule
      </div>
      <div style={{display: "grid", gap: 35, gridTemplateColumns: "1.05fr 0.95fr", marginTop: 20}}>
        <CodeCard active={initialized ? 3 : 1} keyword="const" compact />
        <div>
          <BindingCard identifier="age" value={initialized ? "30" : "uninitialized"} />
          <div style={{backgroundColor: "#050910", border: `1px solid ${C.border}`, borderRadius: 15, color: initialized ? C.green : C.red, fontFamily: mono, fontSize: 20, marginTop: 17, padding: "17px 20px", ...reveal(frame, initialized ? 52 : 15)}}>
            › {initialized ? "age → 30" : "ReferenceError"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const comparisonRows = [
  ["binding created", "binding created"],
  ["initialized as undefined", "uninitialized"],
  ["accessible before declaration", "TDZ · cannot access"],
  ["console.log → undefined", "console.log → ReferenceError"],
] as const;

const Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "42px 80px"}}>
      <div style={{alignItems: "end", display: "flex", justifyContent: "space-between"}}>
        <div>
          <Eyebrow>Creation phase</Eyebrow>
          <div style={{color: C.text, fontFamily: sans, fontSize: 39, fontWeight: 820, letterSpacing: -1, marginTop: 7}}>Same preparation. Different initialization.</div>
        </div>
      </div>
      <div style={{display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginTop: 28}}>
        <div style={{backgroundColor: "rgba(93,220,255,0.09)", border: `1px solid rgba(93,220,255,0.35)`, borderRadius: 14, color: C.cyan, fontFamily: mono, fontSize: 25, fontWeight: 800, padding: "16px 21px"}}>var</div>
        <div style={{backgroundColor: "rgba(167,139,250,0.09)", border: `1px solid rgba(167,139,250,0.35)`, borderRadius: 14, color: "#d1c4ff", fontFamily: mono, fontSize: 25, fontWeight: 800, padding: "16px 21px"}}>let / const</div>
        {comparisonRows.map((row, index) => (
          <Sequence key={row[0]} from={index * 11} layout="none">
            <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 13, color: index === 3 ? C.cyan : C.text, fontFamily: sans, fontSize: 20, fontWeight: 650, padding: "15px 20px", ...reveal(frame - index * 11, 0, 9)}}>{row[0]}</div>
            <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 13, color: index === 3 ? C.red : index === 1 || index === 2 ? C.amber : C.text, fontFamily: sans, fontSize: 20, fontWeight: 650, padding: "15px 20px", ...reveal(frame - index * 11, 0, 9)}}>{row[1]}</div>
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", padding: "60px 95px"}}>
      <div style={{textAlign: "center", width: 1050}}>
        <Eyebrow>Final mental model</Eyebrow>
        <div style={{color: C.text, fontFamily: sans, fontSize: 50, fontWeight: 850, letterSpacing: -1.6, marginTop: 17, ...reveal(frame, 3)}}>
          All three are <span style={{color: C.yellow}}>hoisted</span>.
        </div>
        <div style={{display: "flex", gap: 20, marginTop: 30}}>
          <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 17, flex: 1, padding: "22px", ...reveal(frame, 13)}}>
            <div style={{color: C.cyan, fontFamily: mono, fontSize: 25, fontWeight: 800}}>var</div>
            <div style={{color: C.text, fontFamily: sans, fontSize: 20, lineHeight: 1.5, marginTop: 12}}>created + initialized with <span style={{color: C.red}}>undefined</span></div>
          </div>
          <div style={{backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 17, flex: 1, padding: "22px", ...reveal(frame, 22)}}>
            <div style={{color: C.violet, fontFamily: mono, fontSize: 25, fontWeight: 800}}>let / const</div>
            <div style={{color: C.text, fontFamily: sans, fontSize: 20, lineHeight: 1.5, marginTop: 12}}>created but <span style={{color: C.amber}}>uninitialized</span> · TDZ until declaration</div>
          </div>
        </div>
        <div style={{borderTop: `1px solid ${C.border}`, color: C.muted, fontFamily: sans, fontSize: 19, lineHeight: 1.45, marginTop: 27, paddingTop: 20, ...reveal(frame, 32)}}>
          Hoisting prepares bindings before execution — it does not physically move source code.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LetConstHoisting: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage:
          "radial-gradient(circle at 84% 12%, rgba(93,220,255,0.07), transparent 28%), radial-gradient(circle at 10% 88%, rgba(167,139,250,0.08), transparent 30%)",
      }}
    >
      <Sequence durationInFrames={55} name="Misconception">
        <Misconception />
      </Sequence>
      <Sequence from={55} durationInFrames={55} name="Source code">
        <SourceQuestion />
      </Sequence>
      <Sequence from={110} durationInFrames={70} name="Creation phase and TDZ">
        <LetStage phase="Creation Phase" value="uninitialized" note="Binding exists · uninitialized · access is forbidden in the TDZ" />
      </Sequence>
      <Sequence from={180} durationInFrames={65} name="First access">
        <LetStage phase="Execution Phase" active={1} value="uninitialized" error note="Binding exists, but is still in the Temporal Dead Zone" />
      </Sequence>
      <Sequence from={245} durationInFrames={60} name="Declaration initializes binding">
        <LetStage phase="Execution Phase" active={3} value={'"Shiv"'} error note="Declaration executes: binding initialized · TDZ ends here" />
      </Sequence>
      <Sequence from={305} durationInFrames={50} name="Successful access">
        <LetStage phase="Execution Phase" active={5} value={'"Shiv"'} error success note={'Memory lookup now finds name → "Shiv"'} />
      </Sequence>
      <Sequence from={355} durationInFrames={70} name="Const example">
        <ConstExample />
      </Sequence>
      <Sequence from={425} durationInFrames={55} name="Var comparison">
        <Comparison />
      </Sequence>
      <Sequence from={480} durationInFrames={60} name="Summary">
        <Summary />
      </Sequence>
    </AbsoluteFill>
  );
};
