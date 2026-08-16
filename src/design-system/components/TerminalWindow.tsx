import {colors, fontFamilies, radii, spacing, typography} from "../tokens";
import {GlassCard} from "./GlassCard";

export type TerminalEntry = {command: string; output?: string};
export type TerminalWindowProps = {entries: readonly TerminalEntry[]; prompt?: string; title?: string; enterAt?: number};

export const TerminalWindow = ({entries, prompt = "$", title = "Terminal", enterAt = 0}: TerminalWindowProps) => (
  <GlassCard animated enterAt={enterAt} radius={radii.md} style={{padding: 0, background: "#05070C"}}>
    <div style={{padding: `${spacing.sm + 2}px ${spacing.md}px`, borderBottom: `1px solid ${colors.border}`, ...typography.caption, color: colors.textMuted}}>{title}</div>
    <div style={{padding: spacing.md, fontFamily: fontFamilies.mono, fontSize: 16, lineHeight: 1.6}}>
      {entries.map((entry) => <div key={entry.command} style={{marginBottom: spacing.sm}}><div><span style={{color: colors.success}}>{prompt}</span> <span style={{color: colors.text}}>{entry.command}</span></div>{entry.output ? <div style={{color: colors.textMuted, whiteSpace: "pre-wrap"}}>{entry.output}</div> : null}</div>)}
    </div>
  </GlassCard>
);
