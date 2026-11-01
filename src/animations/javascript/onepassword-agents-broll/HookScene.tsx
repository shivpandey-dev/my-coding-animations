import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Glow, colors, fontFamilies} from "../../../design-system";
import {LockOpen, MousePointer2} from "lucide-react";
import {brand, clamp, useEnter} from "./shared";

const CARD_W = 968;
const CARD_H = 540;

const Field: React.FC<{top: number; label: string; border: string; children: React.ReactNode}> = ({top, label, border, children}) => (
  <div style={{position: "absolute", left: 40, right: 40, top}}>
    <div style={{fontSize: 22, color: colors.textMuted, marginBottom: 8, fontWeight: 550}}>{label}</div>
    <div
      style={{
        height: 76,
        borderRadius: 16,
        border: `2px solid ${border}`,
        background: "#0A0F1C",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        fontSize: 32,
        fontFamily: fontFamilies.mono,
      }}
    >
      {children}
    </div>
  </div>
);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const card = useEnter(0);
  const stamp = useEnter(58, {damping: 9, stiffness: 220, mass: 0.6});
  const caption = useEnter(36);

  const dots = Math.floor(interpolate(frame, [24, 54], [0, 9], clamp));
  const leaked = frame >= 58;
  const passwordBorder = leaked ? colors.danger : frame >= 22 ? brand.blue : colors.border;

  const cursorX = interpolate(frame, [0, 22, 62, 82], [760, 330, 330, 700], clamp);
  const cursorY = interpolate(frame, [0, 22, 62, 82], [470, 345, 345, 440], clamp);
  const press = frame >= 22 && frame < 28 ? 0.85 : 1;

  const shakeDecay = interpolate(frame, [58, 80], [1, 0], clamp);
  const shake = leaked ? Math.sin(frame * 2.4) * 9 * shakeDecay : 0;
  const redFlash = interpolate(frame, [58, 64, 90], [0, 0.35, 0.18], clamp);

  return (
    <>
      <Glow color={colors.danger} x="50%" y="42%" size={620} opacity={redFlash} />
      <AbsoluteFill style={{alignItems: "center", justifyContent: "center", gap: 36, translate: `${shake}px 0`}}>
        <div
          style={{
            position: "relative",
            width: CARD_W,
            height: CARD_H,
            borderRadius: 28,
            background: `${colors.surface}F2`,
            border: `1px solid ${leaked ? colors.danger : colors.border}`,
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            overflow: "hidden",
            opacity: card,
            scale: String(0.92 + card * 0.08),
          }}
        >
          <div style={{height: 64, borderBottom: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: 10, padding: "0 24px"}}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <div key={c} style={{width: 14, height: 14, borderRadius: 7, background: c}} />
            ))}
            <div style={{marginLeft: 20, flex: 1, height: 34, borderRadius: 17, background: "#0A0F1C", color: colors.textMuted, fontSize: 20, display: "flex", alignItems: "center", padding: "0 18px", fontFamily: fontFamilies.mono}}>
              app.example.com/login
            </div>
          </div>
          <div style={{position: "absolute", left: 40, top: 80, fontSize: 40, fontWeight: 700}}>Sign in</div>
          <Field top={150} label="Email" border={colors.border}>
            <span style={{color: colors.text}}>agent@work.dev</span>
          </Field>
          <Field top={270} label="Password" border={passwordBorder}>
            {leaked ? (
              <span style={{color: colors.danger, fontWeight: 700}}>hunter2!!</span>
            ) : (
              <span style={{color: colors.text, letterSpacing: 6}}>{"●".repeat(dots)}</span>
            )}
          </Field>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              top: 410,
              height: 76,
              borderRadius: 16,
              background: brand.blue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Sign in
          </div>

          <div
            style={{
              position: "absolute",
              right: 36,
              top: 262,
              padding: "14px 26px",
              border: `5px solid ${colors.danger}`,
              borderRadius: 14,
              color: colors.danger,
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: 2,
              background: `${colors.background}CC`,
              display: leaked ? "flex" : "none",
              alignItems: "center",
              gap: 14,
              opacity: Math.min(1, stamp),
              scale: String(interpolate(stamp, [0, 1], [2.6, 1], clamp)),
              rotate: `${interpolate(stamp, [0, 1], [-24, -8], clamp)}deg`,
            }}
          >
            <LockOpen size={46} strokeWidth={2.6} />
            LEAKED
          </div>

          <div style={{position: "absolute", left: cursorX, top: cursorY, scale: String(press), transformOrigin: "top left"}}>
            <MousePointer2 size={52} color="#FFFFFF" fill={brand.blue} strokeWidth={1.6} />
            <div style={{marginTop: 4, marginLeft: 30, padding: "6px 14px", borderRadius: 10, background: brand.blue, fontSize: 20, fontWeight: 700, whiteSpace: "nowrap"}}>AI Agent</div>
          </div>
        </div>

        <div style={{fontSize: 56, fontWeight: 750, letterSpacing: -1, textAlign: "center", opacity: caption, translate: `0 ${(1 - caption) * 24}px`}}>
          Agent + raw password = <span style={{color: colors.danger}}>risk</span>
        </div>
      </AbsoluteFill>
    </>
  );
};
