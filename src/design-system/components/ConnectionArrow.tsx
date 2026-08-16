import {interpolate, useCurrentFrame} from "remotion";
import {colors} from "../tokens";

export type ConnectionArrowProps = {direction?: "right" | "left" | "up" | "down"; color?: string; progress?: number; animated?: boolean; width?: number};

const rotations = {right: 0, down: 90, left: 180, up: 270} as const;

export const ConnectionArrow = ({direction = "right", color = colors.secondary, progress, animated = false, width = 150}: ConnectionArrowProps) => {
  const frame = useCurrentFrame();
  const resolvedProgress = progress ?? interpolate(frame, [0, 30], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <svg width={width} height={28} viewBox={`0 0 ${width} 28`} style={{overflow: "visible", rotate: `${rotations[direction]}deg`}}>
      <line x1="2" y1="14" x2={width - 14} y2="14" stroke={color} strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray={animated ? "0.08 0.06" : "1"} strokeDashoffset={animated ? -frame * 0.015 : 1 - resolvedProgress} />
      <path d={`M ${width - 18} 6 L ${width - 4} 14 L ${width - 18} 22`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={resolvedProgress} />
    </svg>
  );
};
