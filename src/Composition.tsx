import {Composition} from "remotion";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";
import {Aws12Services} from "./aws-12-services/Aws12Services";

export const MyComposition = () => {
  return (<>
    <Composition
      id="SpringAnimation"
      component={SpringAnimation}
      durationInFrames={120}
      fps={30}
      width={1280}
      height={720}
    />
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
