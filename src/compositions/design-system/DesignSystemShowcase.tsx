import {
  AnimatedIcon,
  AwsServiceIcon,
  Badge,
  BrandWatermark,
  CodeWindow,
  ConnectionArrow,
  GlassCard,
  Scene,
  SceneTitle,
  TechIcon,
  TechLogo,
  TerminalWindow,
  awsServiceRegistry,
  colors,
  spacing,
  techLogoRegistry,
  typography,
  type AwsServiceName,
  type TechIconName,
  type TechLogoName,
} from "../../design-system";

const swatches = ["primary", "secondary", "accent", "success", "warning", "danger"] as const;
const commonIcons: readonly TechIconName[] = ["folder", "cloud", "users", "database", "server", "lock", "globe", "network"];
const techLogos = Object.keys(techLogoRegistry) as TechLogoName[];
const awsServices = Object.keys(awsServiceRegistry) as AwsServiceName[];

export const DesignSystemShowcase = () => (
  <Scene>
    <div style={{display: "flex", flexDirection: "column", height: "100%", gap: spacing.md}}>
      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
        <SceneTitle title="Design System" subtitle="A shared visual language for technical storytelling." />
        <Badge>Internal reference</Badge>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: spacing.md, flex: 1, minHeight: 0}}>
        <div style={{display: "grid", gridTemplateRows: "auto 1fr", gap: spacing.md, minHeight: 0}}>
          <GlassCard animated enterAt={5} style={{padding: spacing.md}}>
            <div style={{...typography.caption, color: colors.textMuted, marginBottom: spacing.sm}}>TOKENS & TYPOGRAPHY</div>
            <div style={{display: "flex", gap: spacing.sm}}>
              {swatches.map((name) => <div key={name} style={{flex: 1}}><div style={{height: 32, borderRadius: 8, background: colors[name]}} /><div style={{fontSize: 10, marginTop: 4, color: colors.textMuted}}>{name}</div></div>)}
            </div>
            <div style={{display: "flex", alignItems: "baseline", gap: spacing.md, marginTop: spacing.md}}>
              <span style={{...typography.heading}}>Heading</span>
              <span style={{...typography.body, color: colors.textMuted}}>Body text</span>
              <code style={{...typography.code, color: colors.secondary}}>const code = true;</code>
            </div>
          </GlassCard>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.md, minHeight: 0}}>
            <CodeWindow filename="Scene.tsx" language="tsx" enterAt={10} highlightedLines={[2]} code={'import {Scene} from "./design-system";\n<Scene grid glow>\n  <TechIcon name="cloud" />\n</Scene>'} />
            <TerminalWindow enterAt={14} entries={[{command: "npm run lint", output: "✓ ESLint  ✓ TypeScript"}, {command: "npx remotion compositions", output: "DesignSystemShowcase"}]} />
          </div>
        </div>

        <div style={{display: "grid", gridTemplateRows: "auto auto 1fr", gap: spacing.md, minHeight: 0}}>
          <GlassCard animated enterAt={8} style={{padding: spacing.md}}>
            <div style={{...typography.caption, color: colors.textMuted, marginBottom: spacing.sm}}>GENERAL ICONS</div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              {commonIcons.map((name, index) => <AnimatedIcon key={name} delay={10 + index * 2}><TechIcon name={name} size={34} color={index % 2 ? colors.primaryLight : colors.secondary} /></AnimatedIcon>)}
              <ConnectionArrow width={92} animated />
            </div>
          </GlassCard>

          <GlassCard animated enterAt={12} style={{padding: spacing.md}}>
            <div style={{...typography.caption, color: colors.textMuted, marginBottom: spacing.sm}}>TECHNOLOGY LOGOS</div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              {techLogos.map((name, index) => <AnimatedIcon key={name} delay={14 + index * 2} mode="slide"><TechLogo name={name} size={34} /></AnimatedIcon>)}
            </div>
          </GlassCard>

          <GlassCard animated enterAt={16} accentColor={colors.aws} style={{padding: spacing.md, minHeight: 0}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm}}>
              <div style={{...typography.caption, color: colors.textMuted}}>OFFICIAL AWS ARCHITECTURE ICONS</div>
              <span style={{fontSize: 12, color: colors.aws}}>2026 Q3</span>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", rowGap: spacing.md, alignItems: "start"}}>
              {awsServices.map((name) => <AwsServiceIcon key={name} name={name} size={38} showLabel />)}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
    <BrandWatermark text="Remotion Design System" />
  </Scene>
);
