import type {CSSProperties} from "react";
import {colors} from "../tokens";
import {techIconRegistry, type TechIconName} from "./registry";

export type TechIconProps = {
  name: TechIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

export const TechIcon = ({name, size = 64, color = colors.text, strokeWidth = 1.8, style}: TechIconProps) => {
  const Icon = techIconRegistry[name];
  return <Icon aria-label={name} color={color} size={size} strokeWidth={strokeWidth} style={style} />;
};
