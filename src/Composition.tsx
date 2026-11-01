import {AwsCompositions} from "./registry/aws";
import {InternalCompositions} from "./registry/internal";
import {JavascriptCompositions} from "./registry/javascript";
import {NewsCompositions} from "./registry/news";
import {NodeJsCompositions} from "./registry/nodejs";

// Each category registers its own compositions in src/registry/<category>.tsx,
// so category branches never edit this file and merge into main without conflicts.
export const MyComposition = () => {
  return (
    <>
      <JavascriptCompositions />
      <NodeJsCompositions />
      <AwsCompositions />
      <NewsCompositions />
      <InternalCompositions />
    </>
  );
};
