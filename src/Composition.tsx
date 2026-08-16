import {Composition, Folder} from "remotion";
import {ExecutionContext} from "./animations/javascript/execution-context/ExecutionContext";
import {CallStack, CALL_STACK_DURATION} from "./animations/javascript/call-stack/CallStack";
import {FunctionHoisting} from "./animations/javascript/function-hoisting/FunctionHoisting";
import {HelloWorld} from "./animations/javascript/hello-world/HelloWorld";
import {Hoisting} from "./animations/javascript/hoisting/Hoisting";
import {LetConstHoisting} from "./animations/javascript/let-const-hoisting/LetConstHoisting";
import {LexicalScope, LEXICAL_SCOPE_DURATION} from "./animations/javascript/lexical-scope/LexicalScope";
import {SpringAnimation} from "./animations/javascript/spring-animation/SpringAnimation";
import {DesignSystemShowcase} from "./compositions/design-system/DesignSystemShowcase";

export const MyComposition = () => {
  return (
    <>
      <Folder name="JavaScript">
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
        <Composition
          id="JS-ExecutionContext"
          component={ExecutionContext}
          durationInFrames={660}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="JS-CallStack"
          component={CallStack}
          durationInFrames={CALL_STACK_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="JS-LexicalScope"
          component={LexicalScope}
          durationInFrames={LEXICAL_SCOPE_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
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
