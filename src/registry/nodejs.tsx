import { Composition, Folder } from "remotion";
import {
  NODE_TYPESCRIPT_DURATION,
  NodeTypeScriptExecution,
} from "../animations/javascript/node-typescript-execution/NodeTypeScriptExecution";

export const NodeJsCompositions = () => {
  return (
    <>
      <Folder name="NodeJS">
        <Composition
          id="NodeTypeScriptExecution"
          component={NodeTypeScriptExecution}
          durationInFrames={NODE_TYPESCRIPT_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
