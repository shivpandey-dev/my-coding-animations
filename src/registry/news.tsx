import { Composition, Folder } from "remotion";
import {
  ONEPASSWORD_BROLL_DURATION,
  OnePasswordAgentsBroll,
  onePasswordAgentsBrollDefaults,
} from "../animations/javascript/onepassword-agents-broll/OnePasswordAgentsBroll";

export const NewsCompositions = () => {
  return (
    <>
      <Folder name="News">
        <Composition
          id="OnePasswordAgentsBroll"
          component={OnePasswordAgentsBroll}
          durationInFrames={ONEPASSWORD_BROLL_DURATION}
          fps={30}
          width={1080}
          height={960}
          defaultProps={onePasswordAgentsBrollDefaults}
        />
      </Folder>
    </>
  );
};
