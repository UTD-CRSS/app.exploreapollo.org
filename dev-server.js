/*eslint-env node*/
/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require("browser-sync");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var historyApiFallback = require("connect-history-api-fallback");

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require("./webpack.config");

/**
 * dev-specific modifications
 */
webpackConfig.entry = [].concat([
  "webpack/hot/dev-server",
  "webpack-hot-middleware/client"
], webpackConfig.entry);

webpackConfig.debug = true;
webpackConfig.devtool = "#eval-source-map";

webpackConfig.plugins = [].concat(webpackConfig.plugins, [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);

var bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync({
  https: true,
  notify: false,
  server: {
    baseDir: "app",
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can’t access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: {
          colors: true,
          chunkModules: false,
          modules: false
        }

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  }
});
