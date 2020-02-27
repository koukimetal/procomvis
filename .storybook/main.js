const path = require("path");

module.exports = {
  webpackFinal: (config) => {
    // https://github.com/storybookjs/storybook/issues/457
    config.devtool = 'inline-source-map';
    return config;
  },
  stories: ["../src/contest/**/*.stories.(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
        }
      }
    },
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      }
    }
  ]
};