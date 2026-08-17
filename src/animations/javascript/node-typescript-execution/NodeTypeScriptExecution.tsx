import {AbsoluteFill, Sequence} from "remotion";
import {Scene1Hook, Scene2Terminal, Scene3Flow, Scene4Question, Scene5TypeStripping, Scene6RunVsCheck, Scene7Responsibilities} from "./Scenes";

export const NODE_TYPESCRIPT_DURATION = 70 * 30;

export const NodeTypeScriptExecution = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={3 * 30}><Scene1Hook /></Sequence>
    <Sequence from={3 * 30} durationInFrames={7 * 30}><Scene2Terminal /></Sequence>
    <Sequence from={10 * 30} durationInFrames={8 * 30}><Scene3Flow /></Sequence>
    <Sequence from={18 * 30} durationInFrames={10 * 30}><Scene4Question /></Sequence>
    <Sequence from={28 * 30} durationInFrames={15 * 30}><Scene5TypeStripping /></Sequence>
    <Sequence from={43 * 30} durationInFrames={15 * 30}><Scene6RunVsCheck /></Sequence>
    <Sequence from={58 * 30} durationInFrames={12 * 30}><Scene7Responsibilities /></Sequence>
  </AbsoluteFill>
);
