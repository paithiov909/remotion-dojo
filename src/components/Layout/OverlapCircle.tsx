import {
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
  const circles = useMemo(() => {
    const step = interpolate(
      frame,
      [0, durationInFrames - 30],
      [0, numCircles],
      {
        easing: Easing.out(Easing.cubic),
      }
    );
    return new Array(numCircles)
      .fill(0)
      .map((_, i) => i * 3)
      .slice(0, Math.round(step));
  }, [frame]);

  return (
    <svg
      style={{
        position: "absolute",
        transformBox: "fill-box",
        backgroundColor: "#f3eed5",
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {circles.map((r, i) => {
        return (
          <circle
            key={i}
            cx={r}
            cy={r}
            r={r}
            fill="none"
            stroke="#e5af9b"
            strokeWidth={3 * random(i)}
            transform={`translate(${r}, ${r})`}
          />
        );
      })}
    </svg>
  );
};
