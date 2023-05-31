const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  // The entry point file described above
  entry: "./src/main.js",
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
