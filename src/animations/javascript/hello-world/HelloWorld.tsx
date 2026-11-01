import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor: "#0f172a",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: 80,
          fontWeight: 700,
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0, 30],
            ["-500px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        Hello JavaScript 👋
      </div>
    </AbsoluteFill>
  );
};
