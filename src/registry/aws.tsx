import {Composition} from "remotion";
import {Aws12Services} from "../aws-12-services/Aws12Services";

export const AwsCompositions = () => {
  return (
    <>
      <Composition
        id="Aws12Services"
        component={Aws12Services}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
