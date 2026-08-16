import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {colors, motion, spacing, typography} from "../tokens";

export type SceneTitleProps = {title: string; subtitle?: string; align?: "left" | "center" | "right"; enterAt?: number};

export const SceneTitle = ({title, subtitle, align = "left", enterAt = 0}: SceneTitleProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - enterAt, fps, config: motion.smooth});
  return (
    <div style={{textAlign: align, opacity: interpolate(progress, [0, 1], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), translate: `0 ${interpolate(progress, [0, 1], [20, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px`}}>
      <div style={{...typography.sceneTitle, color: colors.text}}>{title}</div>
      {subtitle ? <div style={{...typography.body, color: colors.textMuted, marginTop: spacing.sm}}>{subtitle}</div> : null}
    </div>
  );
};
