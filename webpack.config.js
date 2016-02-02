/*eslint-env node*/
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "src"),

  entry: ["./"],

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: process.env.NODE_ENV === "production" ? "bundle-[hash].js" : "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Explore Apollo",
      template: "./src/index.html", // Load a custom template
      inject: "body", //scripts are injected to here
      favicon: "src/favicon.ico"
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new webpack.DefinePlugin({
      "process.env": {
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
        loaders: process.env.NODE_ENV === "production" ? [
          "babel"
        ] : [
          "react-hot",
          "babel"
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
  }
};
