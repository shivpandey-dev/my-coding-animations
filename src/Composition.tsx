import {Composition, Folder} from "remotion";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";
import {DesignSystemShowcase} from "./compositions/design-system/DesignSystemShowcase";
import {NODE_TYPESCRIPT_DURATION, NodeTypeScriptExecution} from "./animations/javascript/node-typescript-execution/NodeTypeScriptExecution";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="SpringAnimation"
        component={SpringAnimation}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="NodeTypeScriptExecution"
        component={NodeTypeScriptExecution}
        durationInFrames={NODE_TYPESCRIPT_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Internal">
        <Composition
          id="DesignSystemShowcase"
          component={DesignSystemShowcase}
          durationInFrames={180}
          fps={30}
          width={1280}
          height={720}
        />
      </Folder>
    </>
  );
};
