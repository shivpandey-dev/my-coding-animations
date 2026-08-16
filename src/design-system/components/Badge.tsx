import type {PropsWithChildren} from "react";
import {colors, radii, spacing, typography} from "../tokens";

export type BadgeProps = PropsWithChildren<{color?: string; background?: string}>;

export const Badge = ({children, color = colors.primaryLight, background = `${colors.primary}26`}: BadgeProps) => (
  <span style={{...typography.badge, display: "inline-flex", alignItems: "center", padding: `${spacing.sm}px ${spacing.md}px`, borderRadius: radii.pill, color, background, border: `1px solid ${color}55`, textTransform: "uppercase", letterSpacing: 1.1}}>{children}</span>
);
