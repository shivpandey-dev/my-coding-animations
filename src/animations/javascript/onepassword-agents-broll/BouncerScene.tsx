import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {colors, motion} from "../../../design-system";
import {Bot, KeyRound, ShieldCheck, X} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const STAGE_W = 968;
const STAGE_H = 600;
const FLOOR_Y = 548;
const APPROVE_AT = 112;
const DOOR_OPEN_AT = 138;
const WALK_AT = 160;

export const BouncerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useEnter(0);
  const arrive = useEnter(6, motion.gentle);
  const noKey = useEnter(52, motion.bouncy);
  const stamp = useEnter(APPROVE_AT, {damping: 9, stiffness: 220, mass: 0.6});
  const door = useEnter(DOOR_OPEN_AT, motion.smooth);

  const approved = frame >= APPROVE_AT;
  const robotX = interpolate(arrive, [0, 1], [-220, 70]) + interpolate(frame, [WALK_AT, WALK_AT + 48], [0, 650], clamp);
  const robotScale = interpolate(frame, [WALK_AT + 30, WALK_AT + 56], [1, 0.55], clamp);
  const robotOpacity = interpolate(frame, [WALK_AT + 36, WALK_AT + 56], [1, 0], clamp);

  const stepAside = useEnter(DOOR_OPEN_AT + 6, motion.smooth);
  const tagOpacity = Math.min(1, noKey) * interpolate(frame, [WALK_AT - 8, WALK_AT], [1, 0], clamp);
  const checkRing =interpolate(frame, [58, 100], [0, 1], clamp);
  const neon = 0.75 + Math.sin(frame * 0.5) * 0.25;
  const shieldColor = approved ? colors.success : brand.blue;

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center", gap: 20}}>
      <div style={{fontSize: 50, fontWeight: 750, letterSpacing: -1, opacity: heading, translate: `0 ${(1 - heading) * 20}px`}}>
        1Password = <span style={{color: brand.blue}}>bouncer</span>
      </div>

      <div style={{position: "relative", width: STAGE_W, height: STAGE_H, overflow: "hidden", borderRadius: 28, background: `${colors.surface}CC`, border: `1px solid ${colors.border}`}}>
        <div style={{position: "absolute", left: 0, right: 0, top: FLOOR_Y, height: 2, background: colors.border}} />

        <div style={{position: "absolute", left: 640, top: 34, width: 270, textAlign: "center", fontSize: 44, fontWeight: 800, letterSpacing: 8, color: "#FF4DD8", opacity: neon, textShadow: "0 0 24px #FF4DD8"}}>
          CLUB
        </div>
        <div style={{position: "absolute", left: 640, top: 110, width: 270, height: FLOOR_Y - 110, borderRadius: "20px 20px 0 0", border: `4px solid ${colors.textSubtle}`, borderBottom: "none", overflow: "hidden", background: "radial-gradient(circle at 50% 70%, #FFB84D 0%, #FF4DD8 55%, #3B0A57 100%)", perspective: 900}}>
          <div style={{position: "absolute", inset: 0, background: colors.surfaceElevated, borderRight: `4px solid ${colors.border}`, transformOrigin: "left center", transform: `rotateY(${-interpolate(door, [0, 1], [0, 100], clamp)}deg)`}}>
            <div style={{position: "absolute", right: 22, top: "50%", width: 14, height: 14, borderRadius: 7, background: colors.accent}} />
          </div>
        </div>

        <div style={{position: "absolute", left: 420, top: FLOOR_Y - 215, width: 190, height: 215, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, translate: `0 ${-260 * stepAside}px`, scale: String(1 - 0.25 * stepAside)}}>
          {frame >= 58 && frame < 100 ? (
            <div style={{position: "absolute", top: 0, left: 0, width: 190, height: 190, borderRadius: 52, border: `3px solid ${brand.blue}`, opacity: 1 - checkRing, scale: String(1 + checkRing * 0.6)}} />
          ) : null}
          <div style={{width: 190, height: 190, borderRadius: 52, background: `${shieldColor}26`, border: `3px solid ${shieldColor}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 50px ${shieldColor}55`}}>
            <ShieldCheck size={112} color={shieldColor} strokeWidth={2} />
          </div>
          <div style={{fontSize: 22, fontWeight: 700, color: colors.textMuted}}>1Password</div>
          {approved ? (
            <div style={{position: "absolute", top: -34, left: -26, padding: "8px 18px", border: `4px solid ${colors.success}`, borderRadius: 12, color: colors.success, fontSize: 30, fontWeight: 800, letterSpacing: 1.5, background: `${colors.background}E6`, opacity: Math.min(1, stamp), scale: String(interpolate(stamp, [0, 1], [2.2, 1], clamp)), rotate: "-10deg"}}>
              APPROVED
            </div>
          ) : null}
        </div>

        <div style={{position: "absolute", left: robotX, top: FLOOR_Y - 200, width: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: robotOpacity, scale: String(robotScale), transformOrigin: "bottom center", zIndex: 5}}>
          <div style={{position: "absolute", top: -62, left: "50%", marginLeft: -92, display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: `${colors.danger}26`, border: `2px solid ${colors.danger}`, color: colors.danger, fontSize: 22, fontWeight: 700, whiteSpace: "nowrap", opacity: tagOpacity, scale: String(noKey)}}>
            <KeyRound size={24} />
            <X size={24} strokeWidth={3} />
            chaabi nahi
          </div>
          <div style={{width: 150, height: 150, borderRadius: 75, background: `${colors.secondary}22`, border: `3px solid ${colors.secondary}`, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Bot size={86} color={colors.secondary} strokeWidth={1.8} />
          </div>
          <div style={{fontSize: 22, fontWeight: 700, color: colors.textMuted}}>AI Agent</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
