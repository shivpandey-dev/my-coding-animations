import {Composition} from "remotion";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";

export const MyComposition = () => {
  return (
    <Composition
      id="SpringAnimation"
      component={SpringAnimation}
      durationInFrames={120}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
