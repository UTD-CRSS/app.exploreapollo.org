/*eslint-env node*/
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var config = require("./config");

var isProduction = process.env.NODE_ENV === "production";

var babelLoader = "babel-loader?" + [
  "presets[]=@babel/react",
  "presets[]=@babel/preset-env",
  "plugins[]=@babel/transform-runtime",
  "plugins[]=@babel/plugin-syntax-export-default-from"
].join(",");

module.exports = {
  context: path.join(__dirname, "src"),
  mode: 'development',

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
    modules: ["node_modules",
            path.join(__dirname, "src")],
    alias: {
      test: path.join(__dirname, "test")
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Explore Apollo",
      template: "index.html", // Load a custom template
      inject: "body", //scripts are injected to here
      favicon: "./favicon.ico",
      GoogleAnalyticsCode: config.GoogleAnalyticsCode
    }),
    new webpack.ProvidePlugin({
      fetch: "exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd",
      //fetch: "imports-loader?this=>global.fetch!whatwg-fetch"
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
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: isProduction ? [
          babelLoader
        ] : [
          "react-hot-loader/webpack",
          babelLoader
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.png$/,    loader: "file-loader" },
      { test: /\.jpg$/,    loader: "file-loader" },
      { test: /\.gif$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },
      { test: /\.json$/,   loader: "json-loader" }
    ]
  },

  externals: {
    "ga": "ga"
  }
};
