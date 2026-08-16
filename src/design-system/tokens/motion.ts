export const motion = {
  snappy: {damping: 18, stiffness: 220, mass: 0.7},
  smooth: {damping: 24, stiffness: 130, mass: 0.9},
  gentle: {damping: 30, stiffness: 90, mass: 1.1},
  bouncy: {damping: 10, stiffness: 170, mass: 0.8},
  fadeTiming: {durationInFrames: 18},
  slideTiming: {durationInFrames: 24, distance: 28},
} as const;
