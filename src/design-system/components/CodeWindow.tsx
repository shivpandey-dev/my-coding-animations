import type {ReactNode} from "react";
import {colors, radii, shadows, spacing, typography} from "../tokens";
import {GlassCard} from "./GlassCard";

export type CodeWindowProps = {filename: string; language?: string; code?: string; children?: ReactNode; lineNumbers?: boolean; highlightedLines?: readonly number[]; enterAt?: number};

export const CodeWindow = ({filename, language, code, children, lineNumbers = true, highlightedLines = [], enterAt = 0}: CodeWindowProps) => {
  const lines = code?.split("\n") ?? [];
  return (
    <GlassCard animated enterAt={enterAt} radius={radii.md} shadow={shadows.elevated} style={{padding: 0}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${spacing.sm + 2}px ${spacing.md}px`, background: colors.surfaceElevated, borderBottom: `1px solid ${colors.border}`}}>
        <div style={{display: "flex", gap: 7}}>{[colors.danger, colors.warning, colors.success].map((color) => <span key={color} style={{width: 10, height: 10, borderRadius: "50%", background: color}} />)}</div>
        <div style={{...typography.caption, color: colors.textMuted}}>{filename}</div>
        <div style={{...typography.caption, color: colors.secondary, width: 44, textAlign: "right"}}>{language}</div>
      </div>
      <div style={{padding: spacing.md, ...typography.code, color: colors.textMuted}}>
        {children ?? lines.map((line, index) => (
          <div key={`${index}-${line}`} style={{display: "flex", background: highlightedLines.includes(index + 1) ? `${colors.primary}22` : "transparent", margin: `0 -${spacing.sm}px`, padding: `0 ${spacing.sm}px`}}>
            {lineNumbers ? <span style={{width: 32, color: colors.textSubtle, userSelect: "none"}}>{index + 1}</span> : null}
            <span style={{whiteSpace: "pre"}}>{line || " "}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
