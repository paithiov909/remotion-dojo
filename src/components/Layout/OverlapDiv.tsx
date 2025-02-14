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
  const props = useMemo(() =>
    new Array(numCircles)
      .fill(0)
      .map((_, i) => {
        const offset = interpolate(
          frame,
          [0, durationInFrames - 10],
          [-50, 150],
          {
            easing: Easing.linear
          }
        ) * random(i) * 2.4;
        return {
          r: interpolate(random(i), [0, 1], [20, 100]),
          top: interpolate(random(i * height), [0, 1], [0, height]),
          left: interpolate(random(i * width), [0, 1], [-50, width + 150]) - offset,
          borderColor: interpolateColors(random(i), [0, 1], ["#FF0000", "#00FF00",]),
          borderStyle: i % 2 ? "outset" : "inset",
          borderWidth: random(i) * 16,
          blurAmount: interpolate(
            numCircles - i,
            [0, numCircles],
            [0, 1.4],
            {
              easing: Easing.cubic
            }
          ),
        };
      }),
    [frame]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f3eed5",
        isolation: "isolate",
      }}
    >
      {props.map(({ r, top, left, borderColor, borderStyle, borderWidth, blurAmount }, i) => {
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top,
              left,
              width: r,
              height: r,
              borderRadius: r,
              borderStyle,
              borderColor,
              borderWidth,
              mixBlendMode: "exclusion",
              filter: `blur(${blurAmount}px)`
            }}
          ></div>
        );
      })}
    </AbsoluteFill>
  )
};
