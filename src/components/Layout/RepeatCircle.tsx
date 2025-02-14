import {
  AbsoluteFill,
  Loop,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

import { ResizingCircle } from "./ResizeCircle";

const Circles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const margin = 32;
  const cols = 15;
  const rows = 12;

  const opacity = useMemo(() => {
    return interpolate(
      frame,
      [0, fps, fps * 2 - 10, fps * 2],
      [0, 1, 1, 0],
      {
        easing: Easing.ease,
      }
    );
  }, [frame]);

  const loop = Loop.useLoop();
  const iteration = useMemo(() => {
    return loop ? loop.iteration : 0;
  }, [loop]);

  return (
    <svg width={width} height={height} style={{ overflow: "visible", opacity }}>
      {new Array(cols).fill(0).map((_, i) => {
        return new Array(rows).fill(0).map((__, j) => {
          const key = `${i}-${j}`;
          const r = random(`${key}-${iteration}`) * margin / 2;
          const x = i * (width + margin) / cols;
          const y = j * (height + margin) / rows;
          return (
            <ResizingCircle
              key={key}
              startRadius={0}
              endRadius={r}
              cx={x}
              cy={y}
            />
          );
        })
      })
      }
    </svg>
  );
};

export const RepeatCircle: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#292a33" }}>
      <Loop durationInFrames={durationInFrames / 4}>
        <Circles />
      </Loop>
    </AbsoluteFill>
  );
};
