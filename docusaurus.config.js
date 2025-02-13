// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Remotion Dojo',
  tagline: 'Learn how to animate your JSX with Remotion!!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://paithiov909.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/remotion-dojo/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'paithiov909', // Usually your GitHub org/user name.
  projectName: 'remotion-dojo', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Remotion Dojo',
        logo: {
          alt: 'Learn how to animate your JSX with Remotion!!',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'workoutSidebar',
            position: 'left',
            label: 'Workouts',
          },
          {
            to: '/resources',
            label: 'Resources',
            position: 'left',
          },
          {
            href: 'https://github.com/paithiov909/remotion-dojo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'CONTENTS',
            items: [
              {
                label: 'Workouts',
                to: '/docs/overview',
              },
              {
                label: 'Resources',
                to: '/resources',
              },
            ],
          },
          {
            title: 'MORE',
            items: [
              {
                label: 'GitHub Repo',
                href: 'https://github.com/paithiov909/remotion-dojo',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} paithiov909`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
