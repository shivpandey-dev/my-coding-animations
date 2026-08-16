import type {CSSProperties, PropsWithChildren} from "react";
import {AbsoluteFill} from "remotion";
import {colors} from "../../design-system";

export const REEL_CANVAS_WIDTH = 1080;
export const REEL_CANVAS_HEIGHT = 1920;
export const REEL_GRAPHICS_HEIGHT = 880;
export const REEL_HORIZONTAL_PADDING = 72;
export const REEL_TOP_PADDING = 64;

type ReelEducationLayoutProps = PropsWithChildren<{
  graphicsStyle?: CSSProperties;
}>;

export const ReelEducationLayout = ({children, graphicsStyle}: ReelEducationLayoutProps) => (
  <AbsoluteFill style={{backgroundColor: "transparent"}}>
    <div
      style={{
        backgroundColor: colors.background,
        backgroundImage:
          "radial-gradient(circle at 82% 12%, rgba(6,182,212,0.13), transparent 34%), radial-gradient(circle at 12% 88%, rgba(124,58,237,0.14), transparent 35%)",
        height: REEL_GRAPHICS_HEIGHT,
        overflow: "hidden",
        position: "relative",
        width: REEL_CANVAS_WIDTH,
        ...graphicsStyle,
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(39,52,73,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(39,52,73,0.26) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          inset: 0,
          maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          position: "absolute",
        }}
      />
      <div
        style={{
          inset: 0,
          padding: `${REEL_TOP_PADDING}px ${REEL_HORIZONTAL_PADDING}px 54px`,
          position: "absolute",
        }}
      >
        {children}
      </div>
    </div>
  </AbsoluteFill>
);
