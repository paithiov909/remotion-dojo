import { Composition } from "remotion";
import {
  TrimCircle,
} from "./src/components/Effects/TrimCircle";
import {
  MyComp1,
  MyComp2,
  MyComp3,
} from "./src/components/Sample";
import React from "react";

import "./src/css/custom.css";

const fps = 30;
const width = 768;
const height = 432;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={TrimCircle}
        durationInFrames={6 * fps}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="MyComp1"
        component={MyComp1}
        durationInFrames={5 * fps}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="MyComp2"
        component={MyComp2}
        durationInFrames={5 * fps}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="MyComp3"
        component={MyComp3}
        durationInFrames={5 * fps}
        fps={fps}
        width={width}
        height={height}
      />
    </>
  );
};
