import {
  makeCircle,
} from "@remotion/shapes";
import {
  warpPath,
  WarpPathFn,
} from "@remotion/paths";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

export const TurbulentDisplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const r = 72;
  const scale = useMemo(() => {
    return interpolate(
      frame,
      [0, 60, 61, durationInFrames],
      [0, 1, 1.2, 10],
      {
        easing: Easing.out(Easing.circle),
      }
    );
  }, [frame]);
  const radius = r * scale;
  const fn: WarpPathFn = ({ x, y }) => ({
    x: x + random(scale > 1 ? 0 : frame) * 3,
    y: y + random(scale > 1 ? 0 : frame) * 4,
  });
  const warpedPath = useMemo(() => {
    const { path } = makeCircle({ radius: radius });
    return warpPath(
      path,
      fn
    );
  }, [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: "whitesmoke" }}>
      <svg
        style={{
          transformBox: "fill-box",
          overflow: "visible"
        }}
        viewBox={`0 0 ${width} ${height}`}
        transform={`translate(${width / 2 - radius}, ${height / 2 - radius})`}
      >
        <filter id="displacement">
          <feTurbulence
            type="fractalNoise" // "Turbulence"ではない
            baseFrequency={0.04} // 周波数。大きくすると滲みが大きくなる
            numOctaves={4} // 大きくすると滲みのディテールが増すが、計算量も増える
            seed={1}
            result="Noise"
          />
          <feDisplacementMap
            in2="Noise"
            in="SourceGraphic"
            scale={radius}
            xChannelSelector="A"
            yChannelSelector="A"
          />
        </filter>
        <path
          d={warpedPath}
          fill="midnightblue"
          stroke="none"
          filter="url(#displacement)"
        />
      </svg>
    </AbsoluteFill>
  );
};
