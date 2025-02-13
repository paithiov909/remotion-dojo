import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

export const OverlapCircle: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const numCircles = 40;
  const radius = useMemo(() => {
    return new Array(numCircles)
    .fill(0)
    .map((_, i) => i * 3);
  }, [numCircles]);
  const step = interpolate(
    frame,
    [0, durationInFrames - 30],
    [0, numCircles],
    {
      easing: Easing.out(Easing.cubic),
    }
  );
  const circles = radius.slice(0, Math.round(step));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f3eed5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {circles.map((r, i) => {
        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              transformBox: "fill-box",
            }}
            viewBox={`0 0 ${width} ${height}`}
            transform={`translate(${r}, ${r})`}
          >
            <circle
              cx={r}
              cy={r}
              r={r}
              fill="none"
              stroke="#e5af9b"
              strokeWidth={3 * random(i)}
            />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};
