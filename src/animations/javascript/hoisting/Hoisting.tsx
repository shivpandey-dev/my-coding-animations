import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const colors = {
  background: "#070b14",
  panel: "#0d1423",
  panelRaised: "#111b2e",
  border: "#263552",
  text: "#f4f7fb",
  muted: "#8c9bb6",
  yellow: "#f7df1e",
  cyan: "#61dafb",
  green: "#68e0a5",
  violet: "#a78bfa",
  red: "#ff7a90",
};

const sans = "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";
const mono = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

const fadeUp = (frame: number, start = 0, duration = 14) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.out(Easing.cubic),
  }),
  translate: interpolate(
    frame,
    [start, start + duration],
    ["0px 18px", "0px 0px"],
    {
      extrapolateLeft: "clamp" as const,
      extrapolateRight: "clamp" as const,
      easing: Easing.out(Easing.cubic),
    },
  ),
});

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const questionOpacity = interpolate(frame, [38, 47, 55, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{textAlign: "center", width: 820}}>
        <div
          style={{
            color: colors.yellow,
            fontFamily: sans,
            fontSize: 24,
            fontWeight: 750,
            letterSpacing: 3,
            textTransform: "uppercase",
            ...fadeUp(frame, 0),
          }}
        >
          JavaScript Hoisting
        </div>
        <div
          style={{
            backgroundColor: colors.panel,
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            boxShadow: "0 22px 70px rgba(0,0,0,0.38)",
            marginTop: 22,
            padding: "25px 34px",
            textAlign: "left",
            ...fadeUp(frame, 8),
          }}
        >
          {[
            'console.log(name);',
            'var name = "Shiv";',
            'console.log(name);',
          ].map((line, index) => (
            <div
              key={line + index}
              style={{
                color: colors.text,
                fontFamily: mono,
                fontSize: 27,
                lineHeight: 1.65,
                ...fadeUp(frame, 13 + index * 7, 10),
              }}
            >
              <span style={{color: colors.muted, display: "inline-block", width: 38}}>
                {index * 2 + 1}
              </span>
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            color: colors.cyan,
            fontFamily: sans,
            fontSize: 30,
            fontWeight: 700,
            marginTop: 20,
            opacity: questionOpacity,
          }}
        >
          What will this print?
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PhaseLabel: React.FC<{phase: "Creation Phase" | "Execution Phase"}> = ({
  phase,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: phase === "Creation Phase" ? "#2a2142" : "#102d39",
        border: `1px solid ${phase === "Creation Phase" ? colors.violet : colors.cyan}`,
        borderRadius: 999,
        color: phase === "Creation Phase" ? "#d8cbff" : "#a9ebff",
        display: "flex",
        fontFamily: sans,
        fontSize: 17,
        fontWeight: 750,
        gap: 9,
        padding: "8px 15px",
        ...fadeUp(frame, 0, 10),
      }}
    >
      <span
        style={{
          backgroundColor: phase === "Creation Phase" ? colors.violet : colors.cyan,
          borderRadius: 999,
          height: 8,
          width: 8,
        }}
      />
      {phase}
    </div>
  );
};

const CodePanel: React.FC<{activeLine?: 1 | 3 | 5; creation?: boolean}> = ({
  activeLine,
  creation = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pointer = spring({frame, fps, config: {damping: 22, stiffness: 140}});
  const activeIndex = activeLine === 1 ? 0 : activeLine === 3 ? 1 : 2;
  const lines = [
    {number: 1, content: "console.log(name);"},
    {number: 3, content: 'var name = "Shiv";'},
    {number: 5, content: "console.log(name);"},
  ] as const;

  return (
    <div style={{flex: 1}}>
      <div style={{color: colors.muted, fontFamily: sans, fontSize: 15, fontWeight: 750, letterSpacing: 2, marginBottom: 12}}>
        SOURCE CODE
      </div>
      <div
        style={{
          backgroundColor: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 18,
          height: 274,
          overflow: "hidden",
          padding: "20px 18px",
          position: "relative",
        }}
      >
        {activeLine ? (
          <div
            style={{
              backgroundColor: "rgba(97,218,251,0.10)",
              border: `1px solid rgba(97,218,251,${0.28 + pointer * 0.45})`,
              borderRadius: 10,
              height: 58,
              left: 14,
              position: "absolute",
              right: 14,
              top: 18 + activeIndex * 82,
              translate: `${interpolate(pointer, [0, 1], [-16, 0])}px 0`,
            }}
          />
        ) : null}
        {lines.map((line) => (
          <div
            key={line.number}
            style={{
              alignItems: "center",
              color: colors.text,
              display: "flex",
              fontFamily: mono,
              fontSize: 23,
              height: 82,
              opacity: activeLine && activeLine !== line.number ? 0.48 : 1,
              position: "relative",
            }}
          >
            <span style={{color: colors.muted, fontSize: 17, width: 34}}>{line.number}</span>
            {creation && line.number === 3 ? (
              <>
                <span
                  style={{
                    backgroundColor: "rgba(167,139,250,0.16)",
                    borderRadius: 6,
                    color: "#d8cbff",
                    padding: "4px 7px",
                  }}
                >
                  var name
                </span>
                <span style={{color: colors.muted}}> = "Shiv";</span>
              </>
            ) : (
              line.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MemoryPanel: React.FC<{value: "undefined" | '"Shiv"'; emphasize?: boolean}> = ({
  value,
  emphasize = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entry = spring({frame: frame - 7, fps, config: {damping: 20, stiffness: 130}});
  const change = spring({frame, fps, config: {damping: 18, stiffness: 150}});
  return (
    <div>
      <div style={{color: colors.muted, fontFamily: sans, fontSize: 15, fontWeight: 750, letterSpacing: 2, marginBottom: 12}}>
        MEMORY / EXECUTION CONTEXT
      </div>
      <div
        style={{
          alignItems: "center",
          backgroundColor: colors.panelRaised,
          border: `1px solid ${emphasize ? colors.cyan : colors.border}`,
          borderRadius: 18,
          boxShadow: emphasize ? "0 0 30px rgba(97,218,251,0.12)" : undefined,
          display: "flex",
          height: 103,
          justifyContent: "space-between",
          opacity: entry,
          padding: "0 25px",
          scale: interpolate(entry, [0, 1], [0.94, 1]),
        }}
      >
        <span style={{color: colors.text, fontFamily: mono, fontSize: 25}}>name</span>
        <span style={{color: colors.muted, fontFamily: mono, fontSize: 24}}>→</span>
        <span
          style={{
            color: value === "undefined" ? colors.red : colors.green,
            fontFamily: mono,
            fontSize: 25,
            fontWeight: 750,
            opacity: change,
            scale: interpolate(change, [0, 1], [0.88, 1]),
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

const ConsolePanel: React.FC<{showUndefined: boolean; showShiv: boolean}> = ({
  showUndefined,
  showShiv,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{marginTop: 20}}>
      <div style={{color: colors.muted, fontFamily: sans, fontSize: 15, fontWeight: 750, letterSpacing: 2, marginBottom: 12}}>
        CONSOLE
      </div>
      <div
        style={{
          backgroundColor: "#060a11",
          border: `1px solid ${colors.border}`,
          borderRadius: 18,
          height: 117,
          padding: "18px 23px",
        }}
      >
        {showUndefined ? (
          <div style={{color: colors.red, fontFamily: mono, fontSize: 22, ...fadeUp(frame, 8, 10)}}>
            <span style={{color: colors.muted, marginRight: 12}}>›</span>undefined
          </div>
        ) : null}
        {showShiv ? (
          <div style={{color: colors.green, fontFamily: mono, fontSize: 22, marginTop: 12, ...fadeUp(frame, 8, 10)}}>
            <span style={{color: colors.muted, marginRight: 12}}>›</span>Shiv
          </div>
        ) : null}
      </div>
    </div>
  );
};

type StageProps = {
  phase: "Creation Phase" | "Execution Phase";
  activeLine?: 1 | 3 | 5;
  creation?: boolean;
  memoryValue: "undefined" | '"Shiv"';
  showUndefined?: boolean;
  showShiv?: boolean;
  callout: string;
};

const Stage: React.FC<StageProps> = ({
  phase,
  activeLine,
  creation,
  memoryValue,
  showUndefined = false,
  showShiv = false,
  callout,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: "38px 64px 46px"}}>
      <div style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
        <div style={{color: colors.text, fontFamily: sans, fontSize: 34, fontWeight: 800, letterSpacing: -1}}>
          JavaScript <span style={{color: colors.yellow}}>Hoisting</span>
        </div>
        <PhaseLabel phase={phase} />
      </div>
      <div style={{display: "flex", gap: 34, marginTop: 28}}>
        <CodePanel activeLine={activeLine} creation={creation} />
        <div style={{width: 470}}>
          <MemoryPanel value={memoryValue} emphasize={Boolean(activeLine)} />
          <ConsolePanel showUndefined={showUndefined} showShiv={showShiv} />
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          bottom: 43,
          color: colors.text,
          display: "flex",
          fontFamily: sans,
          fontSize: 21,
          fontWeight: 650,
          gap: 12,
          left: 64,
          position: "absolute",
          ...fadeUp(frame, 8, 12),
        }}
      >
        <span style={{color: phase === "Creation Phase" ? colors.violet : colors.cyan}}>●</span>
        {callout}
      </div>
    </AbsoluteFill>
  );
};

const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", padding: "70px 100px"}}>
      <div style={{maxWidth: 970, textAlign: "center"}}>
        <div style={{color: colors.yellow, fontFamily: sans, fontSize: 24, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", ...fadeUp(frame, 0)}}>
          The mental model
        </div>
        <div style={{color: colors.text, fontFamily: sans, fontSize: 48, fontWeight: 800, letterSpacing: -1.6, lineHeight: 1.18, marginTop: 22, ...fadeUp(frame, 8)}}>
          <span style={{color: colors.violet}}>var</span> is hoisted and initialized with{" "}
          <span style={{color: colors.red}}>undefined</span>.
        </div>
        <div style={{color: "#c3ccdc", fontFamily: sans, fontSize: 27, lineHeight: 1.45, marginTop: 24, ...fadeUp(frame, 18)}}>
          The assignment happens only when execution reaches that line.
        </div>
        <div style={{borderTop: `1px solid ${colors.border}`, color: colors.muted, fontFamily: sans, fontSize: 20, marginTop: 34, paddingTop: 22, ...fadeUp(frame, 29)}}>
          Conceptual execution-context model — the source code is not physically moved.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Hoisting: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        backgroundImage:
          "radial-gradient(circle at 82% 12%, rgba(97,218,251,0.08), transparent 28%), radial-gradient(circle at 12% 88%, rgba(167,139,250,0.08), transparent 30%)",
      }}
    >
      <Sequence durationInFrames={60} name="Intro">
        <Intro />
      </Sequence>
      <Sequence from={60} durationInFrames={60} name="Creation phase">
        <Stage
          phase="Creation Phase"
          creation
          memoryValue="undefined"
          callout="var declaration → binding created → initialized to undefined"
        />
      </Sequence>
      <Sequence from={120} durationInFrames={30} name="Execution begins">
        <Stage
          phase="Execution Phase"
          activeLine={1}
          memoryValue="undefined"
          callout="Execution starts at the first statement"
        />
      </Sequence>
      <Sequence from={150} durationInFrames={60} name="First console log">
        <Stage
          phase="Execution Phase"
          activeLine={1}
          memoryValue="undefined"
          showUndefined
          callout="Memory lookup finds name → undefined"
        />
      </Sequence>
      <Sequence from={210} durationInFrames={55} name="Assignment">
        <Stage
          phase="Execution Phase"
          activeLine={3}
          memoryValue={'"Shiv"'}
          showUndefined
          callout={'Assignment updates the existing binding to "Shiv"'}
        />
      </Sequence>
      <Sequence from={265} durationInFrames={50} name="Second console log">
        <Stage
          phase="Execution Phase"
          activeLine={5}
          memoryValue={'"Shiv"'}
          showUndefined
          showShiv
          callout={'Memory lookup now finds name → "Shiv"'}
        />
      </Sequence>
      <Sequence from={315} durationInFrames={75} name="Summary">
        <Summary />
      </Sequence>
    </AbsoluteFill>
  );
};
