import {colors, fontFamilies, spacing} from "../tokens";

export type BrandWatermarkProps = {text: string; color?: string};

export const BrandWatermark = ({text, color = colors.textMuted}: BrandWatermarkProps) => (
  <div style={{position: "absolute", right: spacing.xl, bottom: spacing.lg, fontFamily: fontFamilies.sans, fontSize: 14, fontWeight: 650, letterSpacing: 1.4, textTransform: "uppercase", color, opacity: 0.72}}>{text}</div>
);
