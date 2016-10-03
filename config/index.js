var defaultConfig = require("./default");

// TODO: more robust config management
const specificConfig = require(`./${process.env.APP_ENV || "development"}.js`);

module.exports = Object.assign(
  {},
  defaultConfig,
  specificConfig
);
