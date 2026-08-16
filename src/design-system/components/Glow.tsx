import type {CSSProperties} from "react";
import {colors} from "../tokens";

export type GlowProps = {color?: string; size?: number; x?: string; y?: string; opacity?: number; style?: CSSProperties};

export const Glow = ({color = colors.primary, size = 520, x = "68%", y = "14%", opacity = 0.2, style}: GlowProps) => (
  <div style={{position: "absolute", left: x, top: y, width: size, height: size, translate: "-50% -50%", borderRadius: "50%", background: color, filter: `blur(${size * 0.42}px)`, opacity, ...style}} />
);
