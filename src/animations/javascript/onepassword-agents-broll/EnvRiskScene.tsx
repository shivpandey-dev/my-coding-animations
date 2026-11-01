import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {colors, fontFamilies, motion} from "../../../design-system";
import {TriangleAlert} from "lucide-react";
import {clamp, useEnter} from "./shared";

const LINES = [
  "# my-agent/.env",
  "GITHUB_USER=shiv",
  "GITHUB_PASSWORD=hunter2",
  "OPENAI_API_KEY=sk-demo-1234abcd",
  "DB_URL=postgres://admin:pass123@db",
] as const;

const LINE_H = 64;
const BODY_PAD = 28;
const HEADER_H = 64;
const SCAN_START = 100;
const SCAN_END = 170;

export const EnvRiskScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useEnter(0);
  const card = useEnter(4);
  const warn = useEnter(190, motion.bouncy);

  const scan = interpolate(frame, [SCAN_START, SCAN_END], [0, 1], clamp);
  const bodyH = LINES.length * LINE_H + BODY_PAD * 2;
  const scanY = scan * bodyH;
  const exposed = frame >= SCAN_START;

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "stretch", gap: 34}}>
      <div style={{fontSize: 48, fontWeight: 750, textAlign: "center", letterSpacing: -1, opacity: heading, translate: `0 ${(1 - heading) * 20}px`}}>
        Ab tak: <span style={{color: colors.accent}}>raw credentials</span> in env vars
      </div>

      <div
        style={{
          borderRadius: 26,
          overflow: "hidden",
          background: "#05070C",
          border: `1px solid ${exposed ? colors.danger : colors.border}`,
          boxShadow: exposed ? `0 0 60px ${colors.danger}33` : "0 30px 80px rgba(0,0,0,0.45)",
          opacity: card,
          translate: `0 ${(1 - card) * 30}px`,
        }}
      >
        <div style={{height: HEADER_H, display: "flex", alignItems: "center", padding: "0 26px", gap: 10, borderBottom: `1px solid ${colors.border}`, color: colors.textMuted, fontSize: 24, fontFamily: fontFamilies.mono}}>
          .env
        </div>
        <div style={{position: "relative", padding: `${BODY_PAD}px 30px`}}>
          {LINES.map((line, i) => {
            const start = 10 + i * 14;
            const reveal = interpolate(frame, [start, start + 16], [0, 100], clamp);
            const lineY = BODY_PAD + i * LINE_H + LINE_H / 2;
            const hit = exposed && i > 0 && scanY > lineY - BODY_PAD;
            return (
              <div
                key={line}
                style={{
                  height: LINE_H,
                  display: "flex",
                  alignItems: "center",
                  fontFamily: fontFamilies.mono,
                  fontSize: 32,
                  whiteSpace: "pre",
                  color: i === 0 ? colors.textSubtle : hit ? colors.danger : colors.text,
                  textDecoration: hit ? "line-through" : "none",
                  clipPath: `inset(0 ${100 - reveal}% 0 0)`,
                }}
              >
                {line}
              </div>
            );
          })}
          {exposed && scan < 1 ? (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: scanY - 2,
                height: 4,
                background: colors.danger,
                boxShadow: `0 0 30px 8px ${colors.danger}99`,
              }}
            />
          ) : null}
        </div>
      </div>

      <div style={{display: "flex", justifyContent: "center", opacity: Math.min(1, warn), scale: String(interpolate(warn, [0, 1], [0.6, 1], clamp))}}>
        <div style={{display: "flex", alignItems: "center", gap: 18, padding: "18px 36px", borderRadius: 22, background: `${colors.danger}26`, border: `2px solid ${colors.danger}`, fontSize: 42, fontWeight: 750, color: colors.danger}}>
          <TriangleAlert size={48} strokeWidth={2.4} />
          Big security risk
        </div>
      </div>
    </AbsoluteFill>
  );
};
