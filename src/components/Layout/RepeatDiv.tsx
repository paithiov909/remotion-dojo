import { noise2D } from "@remotion/noise";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

const Shapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const MARGIN = 24;
  const N = MARGIN - 2;
  const time = useMemo(() => frame / fps * 1.2, [frame]);

  return (
    <>
      {new Array(N).fill(0).map((_, i) => {
        const noise = noise2D(i, MARGIN, time);
        const l = 12 + MARGIN * Math.abs(noise);
        const r = MARGIN * interpolate(noise, [-1, 1], [0, 1], { easing: Easing.cubic })
        return (
          <div
            key={i}
            style={{
              width: l,
              height: l,
              borderRadius: r,
              backgroundColor: "whitesmoke",
            }}
          >
          </div>
        );
      })
      }
    </>
  );
};

export const RepeatDiv: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#292a33",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexFlow: "row wrap",
      }}
    >
      <Shapes />
    </AbsoluteFill>
  );
};
