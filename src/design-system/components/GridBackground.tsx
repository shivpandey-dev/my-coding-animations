import {colors} from "../tokens";

export type GridBackgroundProps = {color?: string; size?: number; opacity?: number};

export const GridBackground = ({color = colors.border, size = 48, opacity = 0.36}: GridBackgroundProps) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      maskImage: "linear-gradient(to bottom, black, transparent 88%)",
    }}
  />
);
