import {Composition} from "remotion";
import {FunctionHoisting} from "./animations/javascript/function-hoisting/FunctionHoisting";
import {HelloWorld} from "./animations/javascript/hello-world/HelloWorld";
import {Hoisting} from "./animations/javascript/hoisting/Hoisting";
import {LetConstHoisting} from "./animations/javascript/let-const-hoisting/LetConstHoisting";
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
      <Composition
        id="JS-Hoisting"
        component={Hoisting}
        durationInFrames={390}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="JS-LetConstHoisting"
        component={LetConstHoisting}
        durationInFrames={540}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="JS-FunctionHoisting"
        component={FunctionHoisting}
        durationInFrames={640}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
