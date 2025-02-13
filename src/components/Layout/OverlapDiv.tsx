import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  interpolateColors,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

export const OverlapDiv: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const numCircles = 70;
  const pos = useMemo(() =>
    new Array(numCircles)
      .fill(0)
      .map((_, i) => {
        return {
          r: interpolate(random(i), [0, 1], [20, 100]),
          x: interpolate(random(i * width), [0, 1], [-50, width + 150]),
          y: interpolate(random(i * height), [0, 1], [0, height]),
          color: interpolateColors(random(i), [0, 1], ["#FF0000", "#00FF00"])
        };
      }),
    [numCircles]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f3eed5",
        isolation: "isolate",
      }}
    >
      {pos.map(({ r, x, y, color }, i) => {
        const offset = interpolate(
          frame,
          [0, durationInFrames - 10],
          [-50, 150],
          {
            easing: Easing.linear
          }
        ) * random(i) * 2.4;
        const blur = interpolate(
          pos.length - i,
          [0, pos.length],
          [0, 1.4],
          {
            easing: Easing.cubic
          }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: y,
              left: x - offset,
              width: r,
              height: r,
              borderRadius: r,
              borderStyle: i % 2 ? "outset" : "inset",
              borderColor: color,
              borderWidth: random(i) * 16,
              mixBlendMode: "exclusion",
              filter: `blur(${blur}px)`
            }}
          ></div>
        );
      })}
    </AbsoluteFill>
  )
};
