import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

export const DropshadowText: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const inAmount = useMemo(() => {
    return interpolate(
      frame,
      [0, 30],
      [0, 1],
      {
        easing: Easing.bounce,
        extrapolateRight: "clamp",
      }
    );
  }, [frame]);
  const dx = useMemo(() => {
    return interpolate(
      frame,
      [10, 50],
      [-12, 24],
      {
        easing: Easing.cubic,
        extrapolateRight: "clamp",
      }
    );
  }, [frame]);
  const outAmount = useMemo(() => {
    return interpolate(
      frame,
      [60, 90],
      [0, 1],
      {
        easing: Easing.cubic,
        extrapolateRight: "clamp",
      }
    );
  }, [frame]);

  return (
    <>
      <svg
        width={width}
        height={height}
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="shadow">
            <feMorphology operator="erode" radius={10 * outAmount} />
            <feDropShadow
              dx={dx}
              dy={8}
              stdDeviation={3}
              floodOpacity={0.8}
              floodColor="gold"
            />
          </filter>
        </defs>
      </svg>
      <AbsoluteFill
        style={{
          backgroundColor: "antiquewhite",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "firebrick",
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: 64,
            filter: "url(#shadow)",
            transform: `scale(${inAmount})`,
            opacity: 1 - outAmount,
          }}
        >
          Hello, Remotion!!
        </h2>
      </AbsoluteFill>
    </>
  );
};
