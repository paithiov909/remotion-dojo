import {
  makeCircle,
  makeEllipse,
} from "@remotion/shapes";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import React, { useMemo } from "react";

// 円の描画｜クリエイティブコーディングの教科書
// ランダムを利用する その2
export const MyComp1 = () => {
  const { durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numCircles = 100;
  const step = interpolate(
    frame,
    [0, durationInFrames - 20],
    [0, numCircles],
    {
      easing: Easing.linear,
      extrapolateRight: "clamp",
    }
  );
  const radius = useMemo(() => {
    return new Array(numCircles)
      .fill(0)
      .map((_, i) => Math.round(random(i) * 100));
  }, [numCircles]);
  const circles = radius.slice(0, Math.round(step));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "whitesmoke",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <React.Fragment>
        {circles.map((r, i) => (
          <svg
            key={i}
            style={{ position: "absolute" }}
            viewBox={`0 0 ${width} ${height}`}
            transform={`translate(${width / 2 - r}, ${height / 2 - r})`}
          >
            <path
              d={((r) => {
                const { path } = makeCircle({ radius: r });
                return path;
              })(r)}
              fill="none"
              stroke="black"
            />
          </svg>
        ))
        }
      </React.Fragment>
    </AbsoluteFill>
  );
};

// 楕円を利用した作例
export const MyComp2 = () => {
  const { durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numEllipses = 50;
  const ellipses = useMemo(() => {
    const rx = new Array(numEllipses)
      .fill(0)
      .map((_, i) => Math.round(random(i * 2) * 100));
    const ry = new Array(numEllipses)
      .fill(0)
      .map((_, i) => Math.round(random(i * 3) * 100));
    return new Array(numEllipses)
      .fill(0)
      .map((_, i) => {
        const { path, transformOrigin } = makeEllipse({ rx: rx[i], ry: ry[i] });
        return { path: path, rx: rx[i], ry: ry[i], transformOrigin: transformOrigin };
      });
  }, [numEllipses]);
  const step = interpolate(
    frame,
    [0, durationInFrames - 20],
    [0, numEllipses],
    {
      easing: Easing.linear,
      extrapolateRight: "clamp",
    }
  );
  const toShow = ellipses.slice(0, Math.round(step));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "whitesmoke",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <React.Fragment>
        {toShow.map((e, i) => (
          <svg
            key={i}
            style={{
              position: "absolute",
              transformBox: "fill-box",
              transformOrigin: e.transformOrigin
            }}
            viewBox={`0 0 ${width} ${height}`}
            transform={`translate(${width / 2 - e.rx}, ${height / 2 - e.ry})`}
          >
            <path
              d={e.path}
              fill="none"
              stroke="black"
            />
          </svg>
        ))
        }
      </React.Fragment>
    </AbsoluteFill>
  );
};

// 等速の変化｜クリエイティブコーディングの教科書
export const MyComp3 = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numCircles = 3;
  if (durationInFrames < numCircles * fps + 10) {
    throw new Error("durationInFrames is too short");
  }

  const circles = new Array(numCircles)
    .fill(0)
    .map((_, i) => {
      return i * fps;
    })
    .map((start, i) => {
      const end = (i + 1) * fps
      const step = interpolate(
        frame,
        [start, end],
        [0, 1],
        {
          easing: Easing.exp,
          extrapolateRight: "clamp",
        }
      );
      const r = step * Math.max(width, height);
      const { path } = makeCircle({ radius: r });
      return { path: path, radius: r };
    })

  return (
    <AbsoluteFill
      style={{ backgroundColor: "whitesmoke", justifyContent: "center", alignItems: "center" }}
    >
      {circles.map((c, i) => (
        <svg
          key={i}
          style={{
            position: "absolute",
            transformBox: "fill-box",
            overflow: "visible"
          }}
          viewBox={`0 0 ${width} ${height}`}
          transform={`translate(${width / 2 - c.radius}, ${height / 2 - c.radius})`}
        >
          <path
            d={c.path}
            fill={`${i % 2 === 0 ? "cornflowerblue" : "whitesmoke"}`}
            stroke="none"
            strokeWidth={0}
          />
        </svg>
      ))}
    </AbsoluteFill>
  );
};
