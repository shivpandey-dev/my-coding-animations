import type {PropsWithChildren} from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {motion} from "../tokens";

export type AnimatedIconProps = PropsWithChildren<{delay?: number; mode?: "fade" | "scale" | "slide"; distance?: number}>;

export const AnimatedIcon = ({children, delay = 0, mode = "scale", distance = motion.slideTiming.distance}: AnimatedIconProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: motion.snappy});
  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
        scale: mode === "scale" ? interpolate(progress, [0, 1], [0.72, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 1,
        translate: mode === "slide" ? `${interpolate(progress, [0, 1], [distance, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px 0` : undefined,
      }}
    >
      {children}
    </div>
  );
};
