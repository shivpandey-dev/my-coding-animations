import type {CSSProperties, PropsWithChildren} from "react";
import {AbsoluteFill} from "remotion";
import {colors, fontFamilies} from "../tokens";
import {Glow} from "./Glow";
import {GridBackground} from "./GridBackground";
import {SafeArea} from "./SafeArea";

export type SceneProps = PropsWithChildren<{background?: string; grid?: boolean; glow?: boolean; safePadding?: boolean; style?: CSSProperties}>;

export const Scene = ({children, background = colors.background, grid = true, glow = true, safePadding = true, style}: SceneProps) => {
  const content = safePadding ? <SafeArea>{children}</SafeArea> : children;
  return (
    <AbsoluteFill style={{background, color: colors.text, fontFamily: fontFamilies.sans, overflow: "hidden", ...style}}>
      {grid ? <GridBackground /> : null}
      {glow ? <Glow /> : null}
      {content}
    </AbsoluteFill>
  );
};
