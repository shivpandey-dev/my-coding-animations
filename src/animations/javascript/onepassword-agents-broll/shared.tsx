import type {PropsWithChildren} from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {colors, fontFamilies, motion} from "../../../design-system";

export const brand = {blue: "#1A8CFF", blueDeep: "#0A5FD1", blueSoft: "#1A8CFF26"} as const;

// Reels/Shorts UI covers the top of the screen, so scenes keep clear of it.
export const TOP_SAFE = 150;

export const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

export const useEnter = (at = 0, config: {damping: number; stiffness: number; mass: number} = motion.smooth) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config});
};

export const SceneShell: React.FC<PropsWithChildren<{duration: number}>> = ({children, duration}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6, duration - 6, duration], [0, 1, 1, 0], clamp);
  const translateY = interpolate(frame, [0, 10], [18, 0], clamp);
  return (
    <AbsoluteFill style={{fontFamily: fontFamilies.sans, color: colors.text, opacity, translate: `0 ${translateY}px`}}>
      {/* Positioned content box: scene AbsoluteFill children resolve against this, not the full frame. */}
      <div style={{position: "absolute", top: TOP_SAFE, left: 56, right: 56, bottom: 40}}>{children}</div>
    </AbsoluteFill>
  );
};
