/*eslint-env node*/
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),

  entry: ["./"],

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: process.env.NODE_ENV === "production" ? "bundle-[hash].js" : "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin()
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
        test: /\.scss?$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
};
