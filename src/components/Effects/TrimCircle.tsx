import {
  makeCircle,
} from "@remotion/shapes";
import {
  evolvePath,
  translatePath,
} from "@remotion/paths";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

const Circle: React.FC<{ n: number }> = ({ n }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const sw = 12;
  const r = 100;
  const delay = 5;

  const { path } = makeCircle({ radius: r });
  const evolved = useMemo(() => {
    return new Array(n).fill(0).map((_, i) => {
      const step = interpolate(
        frame,
        [i * delay, i * delay + fps],
        [0, 1],
        {
          easing: Easing.out(Easing.poly(5)),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );
      return {
        ...evolvePath(step, path),
        stroke: `${interpolateColors(i, [0, n], ["#c4ffea", "#ff7b00"])}`,
      };
    });
  }, [frame]);

  return (
    <>
      {evolved.map((p, i) => {
        return (
          <path
            key={i}
            d={translatePath(path, width / 2 - r, height / 2 - r)}
            stroke={p.stroke}
            strokeWidth={sw}
            strokeDasharray={p.strokeDasharray}
            strokeDashoffset={p.strokeDashoffset}
            fill="none"
            style={{
              transformOrigin: "center",
            }}
          />
        )
      })}
    </>
  );
};

export const TrimCircle: React.FC = () => {
  const { width, height } = useVideoConfig();
  const n = 9;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        backgroundColor: "#f3eed5",
      }}
    >
      <Circle n={n} />
    </svg>
  );
}
