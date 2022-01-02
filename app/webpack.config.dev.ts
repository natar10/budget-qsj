import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.json$/,
        use: [{ loader: "json" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  devtool: "source-map",
};
