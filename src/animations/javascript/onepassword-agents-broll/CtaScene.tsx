import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Badge, colors, fontFamilies, motion} from "../../../design-system";
import {MessageCircle, UserPlus} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const REPLIES = [".env file mein", "Secrets manager / vault", "Seedha code mein (oops)"] as const;
const NEXT_AT = 140;

const Reply: React.FC<{at: number; text: string; index: number}> = ({at, text, index}) => {
  const enter = useEnter(at, motion.snappy);
  const hue = [colors.primaryLight, colors.secondary, colors.accent][index];
  return (
    <div style={{display: "flex", alignItems: "center", gap: 18, opacity: enter, translate: `0 ${(1 - enter) * 36}px`}}>
      <div style={{width: 54, height: 54, borderRadius: 27, background: hue, flexShrink: 0}} />
      <div style={{padding: "14px 28px", borderRadius: "8px 26px 26px 26px", background: colors.surfaceElevated, border: `1px solid ${colors.border}`, fontSize: 32, fontWeight: 550}}>{text}</div>
    </div>
  );
};

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const question = useEnter(0);
  const next = useEnter(NEXT_AT);
  const follow = useEnter(NEXT_AT + 50, motion.bouncy);
  const pulse = frame > NEXT_AT + 60 ? 1 + Math.max(0, Math.sin((frame - NEXT_AT - 60) * 0.22)) * 0.06 : 1;

  const snippet = 'agent.login("site", via="1password")';
  const typed = snippet.slice(0, Math.max(0, Math.floor((frame - NEXT_AT - 14) / 1.3)));

  return (
    <AbsoluteFill style={{justifyContent: "center", gap: 26}}>
      <div style={{opacity: question, translate: `0 ${(1 - question) * 24}px`}}>
        <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 14}}>
          <MessageCircle size={36} color={brand.blue} />
          <Badge color={brand.blue} background={brand.blueSoft}>Comment karo</Badge>
        </div>
        <div style={{fontSize: 52, fontWeight: 760, letterSpacing: -1, lineHeight: 1.1}}>Credentials kaise handle karte ho?</div>
      </div>

      <div style={{display: "flex", flexDirection: "column", gap: 16}}>
        {REPLIES.map((text, i) => (
          <Reply key={text} at={30 + i * 22} text={text} index={i} />
        ))}
      </div>

      <div style={{opacity: next, translate: `0 ${(1 - next) * 40}px`, padding: "26px 30px", borderRadius: 26, background: `${colors.surface}F2`, border: `2px solid ${brand.blue}`, boxShadow: `0 0 50px ${brand.blue}33`}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14}}>
          <Badge color={colors.accent} background={`${colors.accent}26`}>Next video</Badge>
          <div style={{fontSize: 26, color: colors.textMuted, fontWeight: 600}}>Secure Login Agent</div>
        </div>
        <div style={{fontFamily: fontFamilies.mono, fontSize: 26, color: colors.secondary, minHeight: 40, whiteSpace: "pre", overflow: "hidden"}}>
          {typed}
          <span style={{opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0}}>▍</span>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20, opacity: Math.min(1, follow), scale: String(interpolate(follow, [0, 1], [0.6, 1], clamp) * pulse)}}>
          <div style={{display: "flex", alignItems: "center", gap: 14, padding: "16px 44px", borderRadius: 999, background: brand.blue, fontSize: 34, fontWeight: 750, boxShadow: `0 10px 40px ${brand.blue}77`}}>
            <UserPlus size={34} />
            Follow karo
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
