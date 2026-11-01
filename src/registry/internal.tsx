import {Composition, Folder} from "remotion";
import {DesignSystemShowcase} from "../compositions/design-system/DesignSystemShowcase";

export const InternalCompositions = () => {
  return (
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
  );
};
