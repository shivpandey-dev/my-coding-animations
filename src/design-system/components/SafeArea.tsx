import type {CSSProperties, PropsWithChildren} from "react";
import {useVideoConfig} from "remotion";
import {layout} from "../tokens";

export type SafeAreaProps = PropsWithChildren<{style?: CSSProperties}>;

export const SafeArea = ({children, style}: SafeAreaProps) => {
  const {width, height} = useVideoConfig();
  const padding = Math.min(layout.safeAreaMax, Math.max(layout.safeAreaMin, Math.min(width, height) * layout.safeAreaRatio));
  return <div style={{position: "absolute", inset: 0, padding, ...style}}>{children}</div>;
};
