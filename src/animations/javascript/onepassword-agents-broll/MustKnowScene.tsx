import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {colors} from "../../../design-system";
import {ShieldCheck} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const Line: React.FC<{at: number; children: string; color?: string; highlight?: boolean}> = ({at, children, color = colors.text, highlight}) => {
  const enter = useEnter(at);
  const sweep = useEnter(at + 14);
  return (
    <div style={{position: "relative", alignSelf: "flex-start", opacity: enter, translate: `${(1 - enter) * -120}px 0`}}>
      {highlight ? (
        <div style={{position: "absolute", inset: "4px -22px", borderRadius: 18, background: `linear-gradient(90deg, ${brand.blue}, ${brand.blueDeep})`, transformOrigin: "left center", scale: `${sweep} 1`}} />
      ) : null}
      <div style={{position: "relative", fontSize: 104, fontWeight: 800, letterSpacing: -3, lineHeight: 1.12, color}}>{children}</div>
    </div>
  );
};

export const MustKnowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.18) * 0.05;
  const icon = useEnter(0);

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "flex-start", gap: 14, paddingLeft: 24}}>
      <div style={{opacity: icon, scale: String(interpolate(icon, [0, 1], [0.5, 1], clamp) * pulse), marginBottom: 20}}>
        <ShieldCheck size={110} color={brand.blue} strokeWidth={1.8} />
      </div>
      <Line at={6}>REAL ACCOUNTS</Line>
      <Line at={26} color={colors.secondary}>+ AGENTS</Line>
      <Line at={50} highlight>= MUST-KNOW</Line>
    </AbsoluteFill>
  );
};
