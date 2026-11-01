import type {ReactNode} from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {colors, fontFamilies, motion} from "../../../design-system";
import {Bot, Check, EyeOff, Fingerprint, Globe} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const STEP_AT = [0, 100, 205] as const;
const BANNER_AT = 295;

const StepCard: React.FC<{index: number; icon: ReactNode; title: string; active: boolean; children: ReactNode}> = ({index, icon, title, active, children}) => {
  const enter = useEnter(STEP_AT[index]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 26,
        padding: "22px 28px",
        height: 168,
        borderRadius: 26,
        background: `${colors.surface}F2`,
        border: `2px solid ${active ? brand.blue : colors.border}`,
        boxShadow: active ? `0 0 50px ${brand.blue}40` : "none",
        opacity: enter,
        translate: `0 ${(1 - enter) * 40}px`,
      }}
    >
      <div style={{width: 92, height: 92, borderRadius: 24, background: brand.blueSoft, border: `1px solid ${brand.blue}66`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative"}}>
        {icon}
        <div style={{position: "absolute", top: -12, left: -12, width: 36, height: 36, borderRadius: 18, background: brand.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800}}>{index + 1}</div>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: 36, fontWeight: 700, marginBottom: 10}}>{title}</div>
        {children}
      </div>
    </div>
  );
};

const Connector: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [at - 18, at], [0, 1], clamp);
  return (
    <div style={{height: 34, display: "flex", justifyContent: "center"}}>
      <div style={{width: 4, height: 34 * grow, background: brand.blue, borderRadius: 2}} />
    </div>
  );
};

const mono = {fontFamily: fontFamilies.mono, fontSize: 26} as const;

export const FlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const header = useEnter(0);
  const banner = useEnter(BANNER_AT, motion.bouncy);
  const showBanner = frame >= BANNER_AT;

  const command = 'agent.login("github.com")';
  const typed = command.slice(0, Math.max(0, Math.floor((frame - 14) / 1.6)));

  const tapAt = STEP_AT[1] + 46;
  const approved = frame >= tapAt + 6;
  const ripple = interpolate(frame, [tapAt, tapAt + 22], [0, 1], clamp);
  const lastEnter = STEP_AT[2];

  return (
    <AbsoluteFill style={{justifyContent: "center"}}>
      <div style={{height: 96, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 14}}>
        <div style={{position: "absolute", fontSize: 50, fontWeight: 750, opacity: showBanner ? 0 : header, letterSpacing: -1}}>
          Kaise kaam karta hai?
        </div>
        {showBanner ? (
          <div
            style={{
              padding: "16px 30px",
              borderRadius: 20,
              background: `linear-gradient(90deg, ${brand.blue}, ${brand.blueDeep})`,
              fontSize: 40,
              fontWeight: 760,
              opacity: banner,
              scale: String(0.8 + banner * 0.2),
              boxShadow: `0 10px 50px ${brand.blue}66`,
              textAlign: "center",
            }}
          >
            Agent ne password dekha hi nahi
          </div>
        ) : null}
      </div>

      <StepCard index={0} icon={<Bot size={52} color={brand.blue} />} title="Agent login maangta hai" active={frame < STEP_AT[1]}>
        <div style={{...mono, color: colors.secondary, whiteSpace: "pre"}}>
          {typed}
          <span style={{opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0}}>▍</span>
        </div>
      </StepCard>
      <Connector at={STEP_AT[1]} />
      <StepCard index={1} icon={<Fingerprint size={52} color={brand.blue} />} title="Tum 1Password mein approve karo" active={frame >= STEP_AT[1] && frame < STEP_AT[2]}>
        <div style={{position: "relative", display: "inline-block"}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 26px",
              borderRadius: 14,
              background: approved ? colors.success : brand.blue,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {approved ? <Check size={28} strokeWidth={3} /> : null}
            {approved ? "Approved" : "Approve"}
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 90,
              height: 90,
              marginLeft: -45,
              marginTop: -45,
              borderRadius: "50%",
              border: "4px solid #FFFFFF",
              opacity: frame >= tapAt ? 1 - ripple : 0,
              scale: String(0.3 + ripple * 1.2),
            }}
          />
        </div>
      </StepCard>
      <Connector at={STEP_AT[2]} />
      <StepCard index={2} icon={<Globe size={52} color={brand.blue} />} title="Site mein credential fill" active={frame >= lastEnter}>
        <div style={{...mono, color: colors.textMuted, display: "flex", flexDirection: "column", gap: 4}}>
          <div>
            site gets <span style={{color: colors.text, letterSpacing: 3}}>●●●●●●●●</span>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <EyeOff size={26} color={colors.success} />
            agent sees <span style={{color: colors.success, fontWeight: 700}}>[hidden]</span>
          </div>
        </div>
      </StepCard>
    </AbsoluteFill>
  );
};
