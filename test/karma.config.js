/*eslint-env node*/
var webpackConfig = require("../webpack.config.js");

module.exports = function (config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? "Firefox" : "Chrome" ],

    frameworks: [ "mocha" ],

    files: [
      "tests.webpack.js"
    ],

    preprocessors: {
      "tests.webpack.js": [ "webpack", "sourcemap" ]
    },

    reporters: [ "mocha" ],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    }

  });
};
