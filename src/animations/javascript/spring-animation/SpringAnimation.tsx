import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SpringAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 1,
    },
  });

  const translateY = interpolate(progress, [0, 1], [180, 0]);
  const scale = interpolate(progress, [0, 1], [0.88, 1]);
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor: "#0b1020",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#151c31",
          border: "1px solid #29324d",
          borderRadius: 24,
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
          color: "#f8fafc",
          opacity,
          padding: "52px 76px",
          scale,
          textAlign: "center",
          translate: `0 ${translateY}px`,
        }}
      >
        <div
          style={{
            color: "#f7df1e",
            fontFamily: "Arial, sans-serif",
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          JavaScript
        </div>
        <div
          style={{
            color: "#aeb9d4",
            fontFamily: "Arial, sans-serif",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 1.5,
            marginTop: 14,
          }}
        >
          Spring Animation
        </div>
      </div>
    </AbsoluteFill>
  );
};
