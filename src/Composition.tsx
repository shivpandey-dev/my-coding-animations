import {Composition} from "remotion";
import {HelloWorld} from "./animations/javascript/hello-world/HelloWorld";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SpringAnimation"
        component={SpringAnimation}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
