import type {ReactNode} from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {clamp, colors, sans} from "../theme";

export const SceneLayout: React.FC<{children: ReactNode; accent?: string}> = ({children, accent = colors.orange}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: colors.bg, color: colors.text, fontFamily: sans, overflow: "hidden"}}>
    <AbsoluteFill style={{opacity: 0.16, backgroundImage: "linear-gradient(rgba(148,163,184,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.18) 1px,transparent 1px)", backgroundSize: "64px 64px", backgroundPosition: `${interpolate(frame,[0,180],[0,64],clamp)}px 0`}} />
    <div style={{position:"absolute", left:100, top:105, width:880, height:4, borderRadius:4, background:`linear-gradient(90deg,${accent},transparent)`, opacity:.65}} />
    <div style={{position:"absolute", inset:0, background:"radial-gradient(circle at 50% 48%,rgba(255,153,0,.075),transparent 48%)"}} />
    {children}
  </AbsoluteFill>;
};

export const Panel: React.FC<{children: ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{background:colors.surface, border:"1px solid rgba(148,163,184,.22)", borderRadius:32, boxShadow:"0 24px 80px rgba(0,0,0,.32)", ...style}}>{children}</div>;

export const Pill: React.FC<{children: ReactNode; color?: string}> = ({children,color=colors.orange}) => <span style={{fontFamily:"ui-monospace,monospace", color, border:`1px solid ${color}55`, background:`${color}12`, borderRadius:999, padding:"10px 18px", fontSize:22, letterSpacing:2}}>{children}</span>;
