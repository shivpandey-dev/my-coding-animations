import {AbsoluteFill, Sequence} from "remotion";
import {Glow, GridBackground, colors} from "../../../design-system";
import {AvailabilityScene, type AvailabilityProps} from "./AvailabilityScene";
import {BouncerScene} from "./BouncerScene";
import {CtaScene} from "./CtaScene";
import {EnvRiskScene} from "./EnvRiskScene";
import {FlowScene} from "./FlowScene";
import {HookScene} from "./HookScene";
import {MustKnowScene} from "./MustKnowScene";
import {SceneShell, brand} from "./shared";
import {TitleScene} from "./TitleScene";

const FPS = 30;

// Durations follow the script timing (seconds); retime here after recording.
const SCENES = [
  {id: "hook", seconds: 3},
  {id: "title", seconds: 5},
  {id: "flow", seconds: 12},
  {id: "env", seconds: 10},
  {id: "bouncer", seconds: 8},
  {id: "availability", seconds: 12},
  {id: "mustKnow", seconds: 6},
  {id: "cta", seconds: 10},
] as const;

export const ONEPASSWORD_BROLL_DURATION = SCENES.reduce((sum, scene) => sum + scene.seconds * FPS, 0);

export type OnePasswordAgentsBrollProps = AvailabilityProps;

export const onePasswordAgentsBrollDefaults: OnePasswordAgentsBrollProps = {
  // Verify these names against the official announcement before publishing.
  partners: ["Muse (Meta)", "Grok Bot"],
  comingSoon: ["Claude Duet", "ChatGPT Work"],
};

export const OnePasswordAgentsBroll: React.FC<OnePasswordAgentsBrollProps> = ({partners, comingSoon}) => {
  let cursor = 0;
  const renderScene = (id: (typeof SCENES)[number]["id"]) => {
    switch (id) {
      case "hook":
        return <HookScene />;
      case "title":
        return <TitleScene />;
      case "flow":
        return <FlowScene />;
      case "env":
        return <EnvRiskScene />;
      case "bouncer":
        return <BouncerScene />;
      case "availability":
        return <AvailabilityScene partners={partners} comingSoon={comingSoon} />;
      case "mustKnow":
        return <MustKnowScene />;
      case "cta":
        return <CtaScene />;
    }
  };

  return (
    <AbsoluteFill style={{background: colors.background, overflow: "hidden"}}>
      <GridBackground />
      <Glow color={brand.blue} x="50%" y="34%" size={640} opacity={0.2} />
      {SCENES.map((scene) => {
        const from = cursor;
        const duration = scene.seconds * FPS;
        cursor += duration;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={duration} name={scene.id}>
            <SceneShell duration={duration}>{renderScene(scene.id)}</SceneShell>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
