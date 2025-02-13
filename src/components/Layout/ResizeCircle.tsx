import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

export const ResizingCircle: React.FC<{
  startRadius: number;
  endRadius: number;
  cx: number;
  cy: number;
}> = ({ startRadius, endRadius, cx, cy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentRadius = useMemo(() => {
    return interpolate(
      frame,
      [0, fps * 2 - 10],
      [startRadius, endRadius],
      {
        easing: Easing.inOut(Easing.back(3)),
        extrapolateRight: "clamp",
      }
    );
  }, [frame]);

  return (
    <circle cx={cx} cy={cy} r={currentRadius} fill="whitesmoke" />
  );
};

export const ResizeCircle: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const numChanges = 4 + 1;
  const radii = new Array(numChanges).fill(0).map((_, i) => random(`${i}th radius`) * 200);

  return (
    <>
      {radii.slice(1, numChanges).map((endRadius, i) => (
        <Sequence
          key={i}
          from={i * fps * 2}
          durationInFrames={i != numChanges - 2 ? fps * 2 : durationInFrames - i * fps * 2}
        >
          <AbsoluteFill style={{ backgroundColor: "#292a33" }}>
            <svg width={width} height={height} >
              <ResizingCircle
                key={i}
                startRadius={radii[i]}
                endRadius={endRadius}
                cx={width / 2}
                cy={height / 2}
              />
            </svg>
          </AbsoluteFill>
        </Sequence>
      ))}
    </>
  );
};
