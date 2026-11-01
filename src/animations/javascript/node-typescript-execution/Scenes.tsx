import type {CSSProperties, PropsWithChildren, ReactNode} from "react";
import {Check, CirclePlay, Code2, GitCompareArrows, ScanSearch, Terminal as TerminalIcon, X} from "lucide-react";
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {GlassCard, GridBackground, Glow, TechLogo, colors, fontFamilies} from "../../../design-system";

const TOP = 110;
const SAFE_H = 1120;
const PAD_X = 82;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

const SceneShell = ({children, accent = colors.typescript}: PropsWithChildren<{accent?: string}>) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{background: colors.background, color: colors.text, fontFamily: fontFamilies.sans, overflow: "hidden", opacity: interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], clamp)}}>
    <GridBackground size={54} opacity={0.24} />
    <Glow color={accent} size={650} x="50%" y="18%" opacity={0.18} />
    <div style={{position: "absolute", left: PAD_X, right: PAD_X, top: TOP, height: SAFE_H, display: "flex", alignItems: "center", justifyContent: "center"}}>{children}</div>
    <div style={{position: "absolute", left: PAD_X, right: PAD_X, top: 1260, height: 1, background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`, opacity: 0.45}} />
  </AbsoluteFill>;
};

const Eyebrow = ({children}: PropsWithChildren) => <div style={{fontSize: 25, fontWeight: 750, letterSpacing: 4, color: colors.secondary, textTransform: "uppercase"}}>{children}</div>;

const Pop = ({children, delay = 0, style}: PropsWithChildren<{delay?: number; style?: CSSProperties}>) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 13, stiffness: 150, mass: 0.75}});
  return <div style={{opacity: interpolate(p, [0, 1], [0, 1], clamp), scale: interpolate(p, [0, 1], [0.72, 1], {...clamp, easing: Easing.out(Easing.cubic)}), ...style}}>{children}</div>;
};

export const Scene1Hook = () => <SceneShell accent={colors.node}><Pop style={{textAlign: "center", marginTop: -170}}><Eyebrow>Native TypeScript</Eyebrow><div style={{fontFamily: fontFamilies.mono, fontSize: 104, fontWeight: 800, marginTop: 28, letterSpacing: -5}}><span style={{color: colors.node}}>$</span> node app.ts <span style={{fontFamily: fontFamilies.sans}}>🤯</span></div><div style={{width: 560, height: 5, borderRadius: 9, margin: "32px auto", background: `linear-gradient(90deg, ${colors.node}, ${colors.typescript})`}} /></Pop></SceneShell>;

export const Scene2Terminal = () => {
  const frame = useCurrentFrame();
  const typed = "node app.ts".slice(0, Math.floor(interpolate(frame, [35, 76], [0, 11], clamp)));
  const output = interpolate(frame, [103, 115], [0, 1], clamp);
  return <SceneShell accent={colors.node}><div style={{width: "100%", marginTop: -80}}><Pop><Eyebrow>Direct execution</Eyebrow><div style={{fontSize: 61, fontWeight: 760, margin: "16px 0 42px"}}>Node.js runs the <span style={{color: colors.typescript}}>.ts</span> file</div></Pop><GlassCard animated enterAt={12} style={{padding: 0, background: "#05070C", borderRadius: 30, boxShadow: `0 36px 100px #000A, 0 0 70px ${colors.node}18`}}><div style={{height: 75, display: "flex", alignItems: "center", gap: 14, padding: "0 28px", borderBottom: `1px solid ${colors.border}`}}>{[colors.danger, colors.warning, colors.success].map(c => <span key={c} style={{width: 15, height: 15, borderRadius: "50%", background: c}} />)}<span style={{marginLeft: "auto", color: colors.textMuted, fontSize: 20}}>app.ts — terminal</span></div><div style={{height: 350, padding: "52px 46px", fontFamily: fontFamilies.mono, fontSize: 45, lineHeight: 1.8}}><div><span style={{color: colors.node}}>$</span> {typed}<span style={{opacity: Math.floor(frame / 10) % 2 ? 0.2 : 1, color: colors.secondary}}>▌</span></div><div style={{opacity: output, translate: `0 ${interpolate(output, [0, 1], [18, 0], clamp)}px`, color: colors.textMuted}}>Hello from TypeScript</div><div style={{opacity: interpolate(frame, [132, 144], [0, 1], clamp), marginTop: 20, color: colors.success, fontFamily: fontFamilies.sans, fontSize: 28, display: "flex", alignItems: "center", gap: 12}}><Check size={31} strokeWidth={3} /> Process completed</div></div></GlassCard></div></SceneShell>;
};

const FlowBox = ({children, color = colors.border, faded = false}: PropsWithChildren<{color?: string; faded?: boolean}>) => <div style={{width: 260, height: 150, borderRadius: 26, border: `2px solid ${color}`, background: `${colors.surface}F2`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontFamilies.mono, fontSize: 34, fontWeight: 700, opacity: faded ? 0.32 : 1, boxShadow: `0 0 36px ${color}20`}}>{children}</div>;

export const Scene3Flow = () => {
  const frame = useCurrentFrame();
  const switchP = interpolate(frame, [105, 145], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const packet = interpolate(frame % 52, [0, 52], [0, 1], clamp);
  return <SceneShell><div style={{width: "100%", marginTop: -90}}><div style={{display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 70}}><div><Eyebrow>{switchP < 0.5 ? "Old flow" : "Direct execution"}</Eyebrow><div style={{fontSize: 62, fontWeight: 760, marginTop: 16}}>One less hop.</div></div><GitCompareArrows size={70} color={colors.secondary} /></div><div style={{position: "relative", height: 410, display: "flex", alignItems: "center", justifyContent: "space-between"}}><FlowBox color={colors.typescript}>app.ts</FlowBox><div style={{position: "relative", width: 235, height: 8, borderRadius: 8, background: colors.border}}><div style={{position: "absolute", width: 22, height: 22, borderRadius: "50%", background: colors.secondary, top: -7, left: `${packet * 90}%`, boxShadow: `0 0 24px ${colors.secondary}`}} /></div><div style={{opacity: 1 - switchP, translate: `0 ${switchP * 100}px`, filter: `blur(${switchP * 8}px)`}}><FlowBox color={colors.accent} faded={switchP > .35}>ts-node / tsx</FlowBox></div><div style={{position: "relative", width: interpolate(switchP, [0, 1], [100, 235], clamp), height: 8, borderRadius: 8, background: switchP > .5 ? colors.node : colors.border}} /><div style={{scale: interpolate(switchP, [0, 1], [.86, 1], clamp)}}><FlowBox color={colors.node}>{switchP < .45 ? "Run" : <span style={{display: "flex", alignItems: "center", gap: 15}}><TechLogo name="node" size={48} />Node.js</span>}</FlowBox></div>{switchP > .35 && <div style={{position: "absolute", left: 275, right: 278, top: 193, height: 8, background: colors.node, borderRadius: 8, scale: `${switchP} 1`, transformOrigin: "left", boxShadow: `0 0 24px ${colors.node}`}} />}</div></div></SceneShell>;
};

export const Scene4Question = () => {
  const frame = useCurrentFrame();
  return <SceneShell><Pop style={{width: "100%", marginTop: -100}}><GlassCard style={{padding: "82px 52px", textAlign: "center", borderRadius: 38, borderColor: `${colors.typescript}88`, boxShadow: `0 28px 100px #0008, 0 0 80px ${colors.typescript}22`}}><div style={{display: "flex", justifyContent: "center", marginBottom: 45}}><TechLogo name="typescript" size={90} /></div><div style={{fontSize: 71, lineHeight: 1.13, fontWeight: 760}}>Do we still need<br/><span style={{color: "#62A9E8"}}>TypeScript compiler</span><span style={{display: "inline-block", marginLeft: 14, scale: interpolate(frame, [30, 45, 60], [1, 1.16, 1], clamp), color: colors.accent}}>?</span></div></GlassCard></Pop></SceneShell>;
};

export const Scene5TypeStripping = () => {
  const frame = useCurrentFrame();
  const strip = interpolate(frame, [180, 240], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const highlight = interpolate(frame, [90, 125], [0, 1], clamp);
  return <SceneShell><div style={{width: "100%", marginTop: -95}}><Eyebrow>What Node.js does</Eyebrow><div style={{fontSize: 63, fontWeight: 760, margin: "15px 0 44px"}}>It strips the type syntax.</div><GlassCard animated enterAt={12} style={{padding: 0, borderRadius: 30, overflow: "visible"}}><div style={{height: 72, padding: "0 28px", display: "flex", alignItems: "center", borderBottom: `1px solid ${colors.border}`, color: colors.textMuted, fontSize: 21}}><Code2 size={25} style={{marginRight: 12}} /> app.ts <span style={{marginLeft: "auto", color: colors.typescript}}>TypeScript</span></div><div style={{height: 310, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: fontFamilies.mono, fontSize: 50, whiteSpace: "pre"}}><span style={{color: "#C084FC"}}>const</span><span> age</span><span style={{display: "inline-block", width: interpolate(strip, [0, 1], [240, 0], clamp), opacity: 1 - strip, filter: `blur(${strip * 13}px)`, overflow: "hidden", color: "#62A9E8", background: `rgba(49,120,198,${highlight * .22})`, boxShadow: highlight ? `0 0 30px ${colors.typescript}30` : "none", borderRadius: 8}}>: number</span><span style={{color: colors.secondary}}> = </span><span style={{color: colors.accent}}>30</span><span>;</span></div><div style={{position: "absolute", top: 245, left: 385, opacity: highlight * (1 - strip), color: colors.typescript, fontSize: 25, fontWeight: 700, padding: "12px 18px", borderRadius: 14, background: colors.surfaceElevated}}>Type syntax ↑</div></GlassCard><div style={{opacity: interpolate(frame, [258, 282], [0, 1], clamp), fontSize: 34, color: colors.textMuted, textAlign: "center", marginTop: 36}}><span style={{color: colors.node, fontWeight: 800}}>JavaScript</span> executes this</div></div></SceneShell>;
};

const CompareSide = ({title, icon, detail, command, accent}: {title: string; icon: ReactNode; detail: string; command: string; accent: string}) => <div style={{flex: 1, padding: "52px 35px", textAlign: "center"}}><div style={{fontSize: 30, letterSpacing: 3, fontWeight: 800, color: accent}}>{title}</div><div style={{height: 165, display: "flex", alignItems: "center", justifyContent: "center"}}>{icon}</div><div style={{fontSize: 32, color: colors.textMuted, minHeight: 70}}>{detail}</div><div style={{fontFamily: fontFamilies.mono, fontSize: 27, marginTop: 30, padding: "20px 16px", background: "#05070C", borderRadius: 16, border: `1px solid ${colors.border}`}}>{command}</div></div>;

export const Scene6RunVsCheck = () => {
  const frame = useCurrentFrame();
  const divider = interpolate(frame, [15, 42], [0, 1], clamp);
  return <SceneShell accent={colors.secondary}><div style={{width: "100%", marginTop: -95}}><Pop><Eyebrow>Two different jobs</Eyebrow><div style={{fontSize: 61, fontWeight: 770, margin: "15px 0 40px"}}>RUN <span style={{color: colors.accent}}>≠</span> TYPE CHECK</div></Pop><GlassCard style={{padding: 0, display: "flex", minHeight: 530, borderRadius: 32}}><div style={{opacity: interpolate(frame, [42, 68], [0, 1], clamp), flex: 1, display: "flex"}}><CompareSide title="RUN" icon={<div style={{position: "relative"}}><CirclePlay size={105} color={colors.node}/><Check size={50} strokeWidth={4} color={colors.text} style={{position: "absolute", right: -30, bottom: -10, padding: 8, borderRadius: "50%", background: colors.node}}/></div>} detail="Node.js executes" command="node app.ts" accent={colors.node}/></div><div style={{width: 3, alignSelf: "stretch", scale: `1 ${divider}`, background: `linear-gradient(${colors.secondary}, ${colors.primary})`}}/><div style={{opacity: interpolate(frame, [70, 96], [0, 1], clamp), flex: 1, display: "flex"}}><CompareSide title="TYPE CHECK" icon={<div style={{position: "relative"}}><ScanSearch size={105} color={colors.typescript}/><X size={50} strokeWidth={4} color={colors.text} style={{position: "absolute", right: -30, bottom: -10, padding: 8, borderRadius: "50%", background: colors.danger}}/></div>} detail="Not automatic" command="no type analysis" accent="#62A9E8"/></div></GlassCard></div></SceneShell>;
};

const CommandCard = ({title, command, subtitle, color, icon, delay}: {title: string; command: string; subtitle: string; color: string; icon: ReactNode; delay: number}) => <Pop delay={delay} style={{flex: 1}}><GlassCard accentColor={color} style={{height: 310, padding: 38}}><div style={{display: "flex", justifyContent: "space-between", alignItems: "center", color, fontSize: 24, fontWeight: 800, letterSpacing: 2.4}}>{title}{icon}</div><div style={{fontFamily: fontFamilies.mono, fontSize: 34, margin: "48px 0 28px", fontWeight: 700}}>$ {command}</div><div style={{fontSize: 28, color: colors.textMuted}}>{subtitle}</div></GlassCard></Pop>;

export const Scene7Responsibilities = () => {
  const frame = useCurrentFrame();
  const final = interpolate(frame, [210, 244], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <SceneShell accent={colors.accent}><div style={{width: "100%", marginTop: -80}}><div style={{opacity: 1 - final, translate: `0 ${final * -35}px`}}><Eyebrow>Use both responsibilities</Eyebrow><div style={{display: "flex", gap: 25, marginTop: 42}}><CommandCard title="TYPE CHECKING" command="tsc --noEmit" subtitle="Find type errors" color={colors.typescript} icon={<ScanSearch size={38}/>} delay={8}/><CommandCard title="EXECUTION" command="node app.ts" subtitle="Run the program" color={colors.node} icon={<TerminalIcon size={38}/>} delay={22}/></div><div style={{height: 62, display: "flex", justifyContent: "center", alignItems: "center", color: colors.textMuted, fontSize: 25}}><GitCompareArrows size={30} style={{marginRight: 12}}/> Different jobs. Better together.</div></div><div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", opacity: final, scale: interpolate(final, [0, 1], [.88, 1], clamp)}}><div style={{fontSize: 92, fontWeight: 850, letterSpacing: -4}}>RUN <span style={{display: "inline-block", color: colors.accent, scale: interpolate(frame, [245, 260, 277], [1, 1.22, 1], clamp)}}>≠</span> TYPE CHECK</div><div style={{fontSize: 35, color: colors.textMuted, marginTop: 34}}>Execution and type safety are different jobs.</div></div></div></SceneShell>;
};
