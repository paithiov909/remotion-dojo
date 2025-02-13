import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import {
  Sequence,
  Loop,
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Player } from "@remotion/player";
import React, { useMemo } from "react";


const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function HoveringImg({ Svg }) {
  const frame = useCurrentFrame();
  const trans = interpolate(frame, [0, 14, 15, 30], [1, -5, -5, 1], {
    easing: Easing.ease,
    extrapolateRight: 'clamp',
  });
  const hovering = useMemo(() => {
    return {
      transform: `translateY(${trans}px)`,
    };
  }, [trans]);
  return (
    <Svg
      className={styles.featureSvg}
      role="img"
      style={hovering}
    />
  );
}

function FeatureInner({ Svg, title, description }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = useMemo(() => {
    return interpolate(
      frame,
      [0, fps, fps * 5 - 15, fps * 5],
      [0, 1, 1, 0],
      {
        easing: Easing.ease,
      }
    )
  }, [frame])

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div className="text--center">
        <Loop durationInFrames={fps} layout="none">
          <HoveringImg Svg={Svg} />
        </Loop>
      </div>
      <div className="text--center padding-horiz--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </AbsoluteFill>
  );
}

function FeatureComp() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, height, width } = useVideoConfig();
  const trans = interpolate(
    frame,
    [0, durationInFrames],
    [0, Math.floor(durationInFrames / fps) * 10],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${require("@site/static/img/docusaurus.png").default})`,
        backgroundSize: `${width / 16}`,
        backgroundPosition: `${trans}% -${trans}%`,
      }}
    >
      <AbsoluteFill style={{ backdropFilter: "contrast(.5) blur(5px)" }} >
        <AbsoluteFill style={{ top: height / 16 }}>
          <h3 className="text--center">
            Remotion Dojo was built with Docusaurus <br />
            🥋🦖💖📼
          </h3>
        </AbsoluteFill>
        {FeatureList.map((props, idx) => (
          <Sequence key={idx} from={idx == 0 ? 0 : idx * fps * 5} durationInFrames={fps * 5}>
            <FeatureInner {...props} />
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function Feature() {
  const fps = 30;
  const len = FeatureList.length;
  return (
    <div className={clsx('col col--12')}>
      <Player
        component={FeatureComp}
        durationInFrames={fps * len * 5}
        compositionWidth={768}
        compositionHeight={432}
        fps={fps}
        controls
        loop
        autoPlay
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Feature />
        </div>
      </div>
    </section>
  );
}
