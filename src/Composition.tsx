import {CalculateMetadataFunction, Composition} from "remotion";
import {HelloWorld} from "./animations/javascript/hello-world/HelloWorld";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={HelloWorld}
      durationInFrames={90}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};
