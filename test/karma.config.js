/*eslint-env node*/
var webpackConfig = require("../webpack.config.js");
var _ = require("lodash");

function base() {
  return {
    frameworks: ["mocha"],
    files: ["tests.webpack.js"],
    preprocessors: {
      "tests.webpack.js": [ "webpack", "sourcemap" ]
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  };
}

function local() {
  return _.extend(base(), {
    browsers: ["Chrome"],
    reporters: ["mocha"]
  });
}

function sauceLabs() {
  var customLaunchers = {
    sl_chrome: {
      base: "SauceLabs",
      browserName: "chrome"
    },
    sl_firefox: {
      base: "SauceLabs",
      browserName: "firefox"
    },
    sl_safari: {
      base: "SauceLabs",
      browserName: "safari",
      platform: "OS X 10.10"
    },
    sl_iphone_ios_8: {
      base: "SauceLabs",
      browserName: "iphone",
      version: "8.4",
      deviceName: "iPhone 6 Plus",
      deviceOrientation: "portrait"
    },
    sl_ie_11: {
      base: "SauceLabs",
      browserName: "internet explorer",
      platform: "Windows 8.1",
      version: "11"
    }
  };

  return _.extend(base(), {
    sauceLabs: {
      testName: "UTD CRSS Apollo SPA Tests"
    },
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ["dots", "saucelabs"],
    singleRun: true
  });
}

module.exports = function (config) {
  if (process.env.CONTINUOUS_INTEGRATION) {
    // We are on travis
    config.set(sauceLabs());
  } else {
    config.set(local());
  }
};
