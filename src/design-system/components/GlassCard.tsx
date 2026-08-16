import type {CSSProperties, PropsWithChildren} from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {colors, motion, radii, shadows, spacing} from "../tokens";

export type GlassCardProps = PropsWithChildren<{
  background?: string;
  borderColor?: string;
  radius?: number;
  shadow?: string;
  accentColor?: string;
  enterAt?: number;
  animated?: boolean;
  style?: CSSProperties;
}>;

export const GlassCard = ({children, background = `${colors.surface}E6`, borderColor = colors.border, radius = radii.lg, shadow = shadows.soft, accentColor, enterAt = 0, animated = false, style}: GlassCardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = animated ? spring({frame: frame - enterAt, fps, config: motion.smooth}) : 1;
  return (
    <div
      style={{
        position: "relative",
        padding: spacing.lg,
        background,
        border: `1px solid ${borderColor}`,
        borderRadius: radius,
        boxShadow: shadow,
        overflow: "hidden",
        opacity: interpolate(progress, [0, 1], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
        translate: `0 ${interpolate(progress, [0, 1], [18, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px`,
        ...style,
      }}
    >
      {accentColor ? <div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: accentColor}} /> : null}
      {children}
    </div>
  );
};
