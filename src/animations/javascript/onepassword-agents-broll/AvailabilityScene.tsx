import type {ReactNode} from "react";
import {AbsoluteFill} from "remotion";
import {colors, motion} from "../../../design-system";
import {Check, Clock, X} from "lucide-react";
import {brand, useEnter} from "./shared";

export type AvailabilityProps = {
  partners: readonly string[];
  comingSoon: readonly string[];
};

const Row: React.FC<{at: number; tone: string; icon: ReactNode; title: string; detail: string}> = ({at, tone, icon, title, detail}) => {
  const enter = useEnter(at);
  return (
    <div style={{display: "flex", alignItems: "center", gap: 26, padding: "26px 30px", borderRadius: 26, background: `${tone}1A`, border: `2px solid ${tone}88`, opacity: enter, translate: `${(1 - enter) * -60}px 0`}}>
      <div style={{width: 76, height: 76, borderRadius: 38, background: tone, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>{icon}</div>
      <div>
        <div style={{fontSize: 42, fontWeight: 750, letterSpacing: -0.5}}>{title}</div>
        <div style={{fontSize: 26, color: colors.textMuted, marginTop: 4}}>{detail}</div>
      </div>
    </div>
  );
};

const ChipGroup: React.FC<{at: number; label: string; tone: string; names: readonly string[]; dashed?: boolean}> = ({at, label, tone, names, dashed}) => {
  const enter = useEnter(at);
  return (
    <div style={{opacity: enter, translate: `0 ${(1 - enter) * 24}px`}}>
      <div style={{display: "flex", alignItems: "center", gap: 10, fontSize: 22, fontWeight: 800, letterSpacing: 2.5, color: tone, marginBottom: 14}}>
        {dashed ? <Clock size={24} /> : null}
        {label}
      </div>
      <div style={{display: "flex", flexWrap: "wrap", gap: 14}}>
        {names.map((name, i) => (
          <Chip key={name} at={at + 10 + i * 8} tone={tone} dashed={dashed}>
            {name}
          </Chip>
        ))}
      </div>
    </div>
  );
};

const Chip: React.FC<{at: number; tone: string; dashed?: boolean; children: ReactNode}> = ({at, tone, dashed, children}) => {
  const enter = useEnter(at, motion.bouncy);
  return (
    <div style={{padding: "14px 26px", borderRadius: 18, background: `${tone}1F`, border: `2px ${dashed ? "dashed" : "solid"} ${tone}`, fontSize: 30, fontWeight: 650, opacity: Math.min(1, enter), scale: String(0.7 + 0.3 * enter)}}>
      {children}
    </div>
  );
};

export const AvailabilityScene: React.FC<AvailabilityProps> = ({partners, comingSoon}) => (
  <AbsoluteFill style={{justifyContent: "center", gap: 22}}>
    <Row at={0} tone={colors.success} icon={<Check size={44} strokeWidth={3.4} color="#06210F" />} title="Free hai" detail="Individual & Family · 1Password.com" />
    <Row at={50} tone={colors.danger} icon={<X size={44} strokeWidth={3.4} color="#2B0808" />} title=".ca / .eu accounts" detail="Abhi available nahi" />
    <div style={{height: 6}} />
    <ChipGroup at={130} label="LAUNCH PARTNERS" tone={brand.blue} names={partners} />
    <ChipGroup at={220} label="COMING SOON" tone={colors.accent} names={comingSoon} dashed />
  </AbsoluteFill>
);
