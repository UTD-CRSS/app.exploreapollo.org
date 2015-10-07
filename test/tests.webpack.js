/*eslint-env node*/
var context = require.context("../src", true, /-test\.js$/);
context.keys().forEach(context);
