import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";

export const fontFamilies = {
  sans: "Inter",
  mono: "JetBrains Mono",
} as const;

void loadFont({
  family: fontFamilies.sans,
  url: staticFile("assets/fonts/InterVariable.woff2"),
  format: "woff2",
  weight: "100 900",
});

void loadFont({
  family: fontFamilies.mono,
  url: staticFile("assets/fonts/JetBrainsMono-Variable.woff2"),
  format: "woff2",
  weight: "100 800",
});

export const typography = {
  display: {fontFamily: fontFamilies.sans, fontSize: 88, fontWeight: 750, lineHeight: 1.02},
  sceneTitle: {fontFamily: fontFamilies.sans, fontSize: 52, fontWeight: 700, lineHeight: 1.08},
  heading: {fontFamily: fontFamilies.sans, fontSize: 30, fontWeight: 650, lineHeight: 1.2},
  body: {fontFamily: fontFamilies.sans, fontSize: 22, fontWeight: 450, lineHeight: 1.5},
  caption: {fontFamily: fontFamilies.sans, fontSize: 16, fontWeight: 500, lineHeight: 1.4},
  code: {fontFamily: fontFamilies.mono, fontSize: 17, fontWeight: 450, lineHeight: 1.55},
  badge: {fontFamily: fontFamilies.sans, fontSize: 14, fontWeight: 700, lineHeight: 1},
} as const;
