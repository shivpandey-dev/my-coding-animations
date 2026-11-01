import type {ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {colors, fontFamilies, motion, radii, shadows} from "../../../design-system";
import {ReelEducationLayout} from "../../../components/reel/ReelEducationLayout";

export const CALL_STACK_DURATION = 620;

const C = {
  ...colors,
  active: "#5DDCFF",
  activeSurface: "#10263A",
  global: "#182131",
};

const fadeUp = (frame: number, start = 0, duration = 12) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.out(Easing.cubic),
  }),
  translate: interpolate(frame, [start, start + duration], ["0px 18px", "0px 0px"], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.out(Easing.cubic),
  }),
});

const SceneShell = ({children, eyebrow}: {children: ReactNode; eyebrow?: string}) => (
  <AbsoluteFill>
    {eyebrow ? (
      <div
        style={{
          color: C.javascript,
          fontFamily: fontFamilies.sans,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>
    ) : null}
    {children}
  </AbsoluteFill>
);

const HookScene = () => {
  const frame = useCurrentFrame();
  const questionOut = interpolate(frame, [42, 55], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const answerIn = spring({frame: frame - 50, fps: 30, config: motion.smooth});

  return (
    <SceneShell>
      <div style={{alignItems: "center", display: "flex", height: "100%", justifyContent: "center", textAlign: "center"}}>
        <div style={{position: "relative", width: 900}}>
          <div
            style={{
              ...fadeUp(frame, 0, 14),
              color: C.text,
              fontFamily: fontFamilies.sans,
              fontSize: 82,
              fontWeight: 820,
              letterSpacing: -3.2,
              lineHeight: 1.08,
              opacity: questionOut,
            }}
          >
            How does JavaScript know which function runs next?
          </div>
          <div
            style={{
              color: C.text,
              fontFamily: fontFamilies.sans,
              fontSize: 94,
              fontWeight: 850,
              inset: 0,
              letterSpacing: -4,
              opacity: answerIn,
              position: "absolute",
              scale: interpolate(answerIn, [0, 1], [0.92, 1]),
            }}
          >
            The <span style={{color: C.active}}>Call Stack.</span>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const codeRows = [
  ["function third()", 'console.log("third");'],
  ["function second()", "third();"],
  ["function first()", "second();"],
  ["start", "first();"],
] as const;

const CodeScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="The example">
      <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 50, fontWeight: 780, marginTop: 18}}>Three calls. One stack.</div>
      <div style={{display: "grid", gap: 12, marginTop: 26}}>
        {codeRows.map(([label, call], index) => (
          <div
            key={label}
            style={{
              alignItems: "center",
              backgroundColor: C.surface,
              border: `1px solid ${index === 3 ? C.javascript : C.border}`,
              borderRadius: radii.md,
              display: "grid",
              gridTemplateColumns: "1.25fr 0.75fr",
              padding: "15px 22px",
              ...fadeUp(frame, 4 + index * 8, 10),
            }}
          >
            <span style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 29, fontWeight: 650}}>{label}</span>
            <span style={{color: index === 3 ? C.javascript : C.active, fontFamily: fontFamilies.mono, fontSize: 29, fontWeight: 700}}>{call}</span>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};

type StackName = "Global" | "first()" | "second()" | "third()";

const StackCard = ({name, active, style}: {name: StackName; active: boolean; style?: React.CSSProperties}) => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: active ? C.activeSurface : name === "Global" ? C.global : C.surface,
      border: `2px solid ${active ? C.active : C.border}`,
      borderRadius: radii.md,
      boxShadow: active ? `0 0 34px ${C.active}30` : shadows.soft,
      color: C.text,
      display: "flex",
      fontFamily: fontFamilies.mono,
      fontSize: 35,
      fontWeight: 760,
      height: 92,
      justifyContent: "center",
      position: "relative",
      width: 560,
      ...style,
    }}
  >
    {active ? <span style={{color: C.active, left: 24, position: "absolute"}}>▶</span> : null}
    {name}
    {active ? <span style={{color: C.active, fontFamily: fontFamilies.sans, fontSize: 16, fontWeight: 850, letterSpacing: 1.4, position: "absolute", right: 22}}>ACTIVE</span> : null}
  </div>
);

const StackDiagram = ({
  entries,
  entering,
  exiting,
}: {
  entries: StackName[];
  entering?: StackName;
  exiting?: StackName;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const push = spring({frame: frame - 8, fps, config: motion.smooth});
  const pop = interpolate(frame, [12, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const remaining = exiting ? entries.filter((entry) => entry !== exiting) : entries;
  const activeName = exiting && pop > 0.55 ? remaining[remaining.length - 1] : entries[entries.length - 1];

  return (
    <div style={{height: 470, position: "relative"}}>
      {entries.map((name, index) => {
        const isEntering = name === entering;
        const isExiting = name === exiting;
        return (
          <StackCard
            key={name}
            name={name}
            active={name === activeName}
            style={{
              opacity: isEntering ? push : isExiting ? 1 - pop : 1,
              bottom: index * 101,
              left: "50%",
              marginLeft: -280,
              position: "absolute",
              scale: isEntering ? interpolate(push, [0, 1], [0.94, 1]) : isExiting ? interpolate(pop, [0, 1], [1, 0.96]) : 1,
              translate: isEntering
                ? `0px ${interpolate(push, [0, 1], [-210, 0])}px`
                : isExiting
                  ? `0px ${interpolate(pop, [0, 1], [0, -170])}px`
                  : "0px 0px",
            }}
          />
        );
      })}
    </div>
  );
};

const StackScene = ({
  title,
  note,
  entries,
  entering,
  exiting,
  operation,
}: {
  title: string;
  note: string;
  entries: StackName[];
  entering?: StackName;
  exiting?: StackName;
  operation?: "PUSH" | "POP";
}) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="Call stack">
      <div style={{alignItems: "end", display: "flex", justifyContent: "space-between", marginTop: 12}}>
        <div>
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 49, fontWeight: 800, letterSpacing: -1.5}}>{title}</div>
          <div style={{color: C.textMuted, fontFamily: fontFamilies.sans, fontSize: 25, marginTop: 6}}>{note}</div>
        </div>
        {operation ? (
          <div style={{backgroundColor: `${operation === "PUSH" ? C.success : C.accent}20`, border: `1px solid ${operation === "PUSH" ? C.success : C.accent}`, borderRadius: radii.pill, color: operation === "PUSH" ? C.success : C.accent, fontFamily: fontFamilies.sans, fontSize: 22, fontWeight: 850, padding: "10px 18px", ...fadeUp(frame, 8, 8)}}>{operation} {operation === "PUSH" ? "↓" : "↑"}</div>
        ) : null}
      </div>
      <div style={{marginTop: 24}}><StackDiagram entries={entries} entering={entering} exiting={exiting} /></div>
    </SceneShell>
  );
};

const LifoScene = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell eyebrow="The rule">
      <div style={{alignItems: "center", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", height: 700}}>
        <div style={{...fadeUp(frame)}}>
          <div style={{color: C.javascript, fontFamily: fontFamilies.sans, fontSize: 104, fontWeight: 900, letterSpacing: -4}}>LIFO</div>
          <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 38, fontWeight: 750, lineHeight: 1.25, marginTop: 8}}>Last In<br /><span style={{color: C.active}}>First Out</span></div>
        </div>
        <div style={{scale: 0.78, ...fadeUp(frame, 10)}}><StackDiagram entries={["Global", "first()", "second()", "third()"]} /></div>
      </div>
    </SceneShell>
  );
};

const SummaryScene = () => {
  const frame = useCurrentFrame();
  const column = (title: string, items: string[], accent: string, delay: number) => (
    <div style={{backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: radii.lg, padding: "24px 28px", ...fadeUp(frame, delay)}}>
      <div style={{color: accent, fontFamily: fontFamilies.sans, fontSize: 24, fontWeight: 850, letterSpacing: 2}}>{title}</div>
      <div style={{color: C.text, fontFamily: fontFamilies.mono, fontSize: 30, fontWeight: 700, lineHeight: 1.65, marginTop: 12}}>{items.map((item, index) => <div key={item}>{item}{index < items.length - 1 ? <span style={{color: C.textMuted}}> ↓</span> : null}</div>)}</div>
    </div>
  );
  return (
    <SceneShell eyebrow="Final mental model">
      <div style={{color: C.text, fontFamily: fontFamilies.sans, fontSize: 52, fontWeight: 820, marginTop: 14}}>Call Stack = <span style={{color: C.javascript}}>LIFO</span></div>
      <div style={{display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr", marginTop: 26}}>
        {column("CALL · PUSH", ["first()", "second()", "third()"], C.success, 6)}
        {column("RETURN · POP", ["third()", "second()", "first()"], C.accent, 14)}
      </div>
      <div style={{color: C.active, fontFamily: fontFamilies.sans, fontSize: 38, fontWeight: 780, marginTop: 32, textAlign: "center", ...fadeUp(frame, 28)}}>Push on call. Pop on return.</div>
    </SceneShell>
  );
};

export const CallStack = () => (
  <ReelEducationLayout>
    <Sequence durationInFrames={95} name="Hook"><HookScene /></Sequence>
    <Sequence from={95} durationInFrames={55} name="Simplified code"><CodeScene /></Sequence>
    <Sequence from={150} durationInFrames={45} name="Global stack"><StackScene title="JavaScript starts" note="Active execution is tracked here." entries={["Global"]} /></Sequence>
    <Sequence from={195} durationInFrames={50} name="Push first"><StackScene title="first() is called" note="A new frame enters the stack." entries={["Global", "first()"]} entering="first()" operation="PUSH" /></Sequence>
    <Sequence from={245} durationInFrames={50} name="Push second"><StackScene title="first() calls second()" note="The active frame moves to the top." entries={["Global", "first()", "second()"]} entering="second()" operation="PUSH" /></Sequence>
    <Sequence from={295} durationInFrames={55} name="Push third"><StackScene title="second() calls third()" note="third() is now executing." entries={["Global", "first()", "second()", "third()"]} entering="third()" operation="PUSH" /></Sequence>
    <Sequence from={350} durationInFrames={45} name="Explain LIFO"><LifoScene /></Sequence>
    <Sequence from={395} durationInFrames={55} name="Pop third"><StackScene title={'console.log("third")'} note="third() finishes. second() resumes." entries={["Global", "first()", "second()", "third()"]} exiting="third()" operation="POP" /></Sequence>
    <Sequence from={450} durationInFrames={45} name="Pop second"><StackScene title="second() finishes" note="first() becomes active again." entries={["Global", "first()", "second()"]} exiting="second()" operation="POP" /></Sequence>
    <Sequence from={495} durationInFrames={45} name="Pop first"><StackScene title="first() finishes" note="Execution returns to Global." entries={["Global", "first()"]} exiting="first()" operation="POP" /></Sequence>
    <Sequence from={540} durationInFrames={80} name="Summary"><SummaryScene /></Sequence>
  </ReelEducationLayout>
);
