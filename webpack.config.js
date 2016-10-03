/*eslint-env node*/
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var isProduction = process.env.NODE_ENV === "production";

var babelLoader = "babel?" + [
  "presets[]=react",
  "presets[]=es2015",
  "presets[]=stage-0",
  "plugins[]=transform-runtime"
].join(",");

module.exports = {
  context: path.join(__dirname, "src"),

  entry: ["./"],

  devtool: !isProduction && "#source-map",

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: process.env.NODE_ENV === "production"
      ? "bundle-[hash].js"
      : "bundle.js"
  },

  resolve: {
    root: path.join(__dirname, "src"),
    alias: {
      test: path.join(__dirname, "test")
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Explore Apollo",
      template: "index.html", // Load a custom template
      inject: "body", //scripts are injected to here
      favicon: "./favicon.ico"
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        COMMIT: JSON.stringify(
          process.env.TRAVIS_COMMIT ||
          process.env.GIT_COMMIT ||
          "none"
        ),
        TRAVIS_BUILD_ID: JSON.stringify(
          process.env.TRAVIS_BUILD_ID ||
          "N/A"
        ),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
        APP_ENV: JSON.stringify(process.env.APP_ENV || "development")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: isProduction ? [
          babelLoader
        ] : [
          "react-hot",
          babelLoader
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  },

  externals: {
    "ga": "ga"
  }
};
