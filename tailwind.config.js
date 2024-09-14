import { join } from "path";

import { skeleton } from "@skeletonlabs/tw-plugin";

const config = {
  darkMode: "media",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [skeleton({ themes: { preset: ["wintry"] } })],
};

export default config;
