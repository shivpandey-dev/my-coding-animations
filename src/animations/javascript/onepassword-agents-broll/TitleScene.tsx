import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Badge, colors, motion} from "../../../design-system";
import {Lock} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const RING_PERIOD = 70;

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const badge = useEnter(0, motion.bouncy);
  const icon = useEnter(6, motion.bouncy);
  const wordA = useEnter(22);
  const wordB = useEnter(32);
  const sub = useEnter(56);

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center", gap: 34}}>
      <div style={{opacity: badge, scale: String(badge)}}>
        <Badge color={brand.blue} background={brand.blueSoft}>New launch</Badge>
      </div>

      <div style={{position: "relative", width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center"}}>
        {[0, 1, 2].map((i) => {
          const t = ((frame - 14 - i * (RING_PERIOD / 3)) % RING_PERIOD + RING_PERIOD) % RING_PERIOD;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `3px solid ${brand.blue}`,
                opacity: frame < 14 ? 0 : interpolate(t, [0, RING_PERIOD], [0.55, 0], clamp),
                scale: String(interpolate(t, [0, RING_PERIOD], [0.8, 1.9], clamp)),
              }}
            />
          );
        })}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 52,
            background: `linear-gradient(145deg, ${brand.blue}, ${brand.blueDeep})`,
            boxShadow: `0 20px 70px ${brand.blue}80`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: String(icon),
            rotate: `${(1 - icon) * -20}deg`,
          }}
        >
          <Lock size={104} color="#FFFFFF" strokeWidth={2.2} />
        </div>
      </div>

      <div style={{textAlign: "center", lineHeight: 1.02}}>
        <div style={{fontSize: 104, fontWeight: 780, letterSpacing: -3, opacity: wordA, translate: `0 ${(1 - wordA) * 40}px`}}>1Password</div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 780,
            letterSpacing: -3,
            opacity: wordB,
            translate: `0 ${(1 - wordB) * 40}px`,
            background: `linear-gradient(90deg, ${brand.blue}, ${colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          for Agents
        </div>
      </div>

      <div style={{fontSize: 32, color: colors.textMuted, fontWeight: 500, opacity: sub, translate: `0 ${(1 - sub) * 16}px`, textAlign: "center"}}>
        Security update for agentic AI developers
      </div>
    </AbsoluteFill>
  );
};
