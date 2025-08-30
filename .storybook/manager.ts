import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: themes.light,
  sidebar: {
    showRoots: true,
    collapsedRoots: ["utilities", "hooks"],
  },
});
