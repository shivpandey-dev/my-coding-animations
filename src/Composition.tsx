import {Composition, Folder} from "remotion";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";
import {DesignSystemShowcase} from "./compositions/design-system/DesignSystemShowcase";

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
