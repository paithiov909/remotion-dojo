import {
  makeRect,
} from "@remotion/shapes";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
  interpolate,
  Easing,
} from "remotion";
import { useMemo } from "react";

export const MyComp = () => {
  const { durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numRects = 8;
  const speed = 1.2;

  const rects = useMemo(() => {
    return new Array(numRects)
      .fill(0)
      .map((_, i) => {
        const r: number = random(i) * 300;
        const { path } = makeRect({ width: r, height: r });
        return { len: r, path: path };
      })
  }, [numRects]);
  const rotate = interpolate(
    frame,
    [0, durationInFrames - 10],
    [0, Math.PI * 2 * speed],
    {
      easing: Easing.linear,
    }
  ) * 180 / Math.PI;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "whitesmoke",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>{Math.floor(rotate)}</h3>
      <svg
        style={{
          position: "absolute",
          overflow: "visible",
          transformBox: "fill-box",
          transformOrigin: `${width / 2 - 25} ${height / 2 - 25}`,
        }}
        transform={`rotate(${rotate})`}
      >
        <path
          d={makeRect({ width: 50, height: 50 }).path}
          fill="none"
          stroke="red"
          strokeWidth={2}
        />
      </svg>
      {rects.map((r, i) => (
        <svg
          key={i}
          style={{
            position: "absolute",
            overflow: "visible",
            transformBox: "fill-box",
            transformOrigin: `center`
          }}
          viewBox={`0 0 ${width} ${height}`}
          transform={`rotate(${rotate + 45 * i}) scale(0.3)`}
        >
          <path
            d={r.path}
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
        </svg>
      ))}
      {rects.map((r, i) => (
        <svg
          key={i}
          style={{
            position: "absolute",
            overflow: "visible",
            transformBox: "fill-box",
            transformOrigin: `${r.len / 2}px ${r.len / 2}px`,
          }}
          viewBox={`0 0 ${width} ${height}`}
          transform={`translate(${width / 2 - r.len}, ${height / 2}) rotate(${r.len + rotate})`}
        >
          <path
            d={r.path}
            fill="none"
            stroke="steelblue"
            strokeWidth={2}
          />
        </svg>
      ))}
    </AbsoluteFill>
  );
};
