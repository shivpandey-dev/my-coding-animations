import type {CSSProperties} from "react";
import {colors} from "../tokens";
import {techLogoRegistry, type TechLogoName} from "./registry";

const defaultColors: Record<TechLogoName, string> = {
  javascript: colors.javascript,
  typescript: colors.typescript,
  react: colors.react,
  node: colors.node,
  docker: colors.docker,
  kubernetes: colors.kubernetes,
  github: colors.text,
};

export type TechLogoProps = {name: TechLogoName; size?: number; color?: string; title?: string; style?: CSSProperties};

export const TechLogo = ({name, size = 64, color, title, style}: TechLogoProps) => {
  const icon = techLogoRegistry[name];
  const fill = color ?? defaultColors[name];
  return (
    <svg aria-label={title ?? icon.title} role="img" viewBox="0 0 24 24" width={size} height={size} style={style}>
      <path d={icon.path} fill={fill} />
    </svg>
  );
};
