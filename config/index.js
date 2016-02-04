import defaultConfig from "./default";

// TODO: more robust config management
const specificConfig = require(`./${process.env.APP_ENV}.js`).default;

export default Object.assign(
  {},
  defaultConfig,
  specificConfig
);
