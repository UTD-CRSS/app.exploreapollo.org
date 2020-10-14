# app.exploreapollo.org

![NASA](./NASA_logo.png?raw=true)

[![Build Status](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org.svg?branch=master)](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org)
[![Dependency Status](https://david-dm.org/UTD-CRSS/app.exploreapollo.org.svg)](https://david-dm.org/UTD-CRSS/app.exploreapollo.org)
[![devDependency Status](https://david-dm.org/UTD-CRSS/app.exploreapollo.org/dev-status.svg)](https://david-dm.org/UTD-CRSS/app.exploreapollo.org#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/UTD-CRSS/app.exploreapollo.org/badges/gpa.svg)](https://codeclimate.com/github/UTD-CRSS/app.exploreapollo.org)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/utd-crss.svg)](https://saucelabs.com/u/utd-crss)

## Development

This project requires Node >=12.X and npm >=6.X You should install node using [nvm][].

### Start Hacking

1. `npm install` to grab all the goodies
2. `npm run dev` to start a hot-reloading development server
3. No step 3

Other useful commands:

* `npm test` to run the tests
* `npm run tdd` to continuously run tests as you code
* `npm run lint` to check your changes against the linting guidelines

**Note about HTTPS and the development server:** the development server uses a
self-signed SSL certificate. When you open the development server for the first
time it will squawk about the certificate being invalid. The certificate is not
invalid or insecure, it is just self-signed.

### Branches and Versioning

The `master` is considered "hot" and is continuously deployed to a staging
server. Every tagged version is automatically deployed to production.

Day-to-day development is done on the `develop` branch. The `develop` branch is continuously deployed to a development server for evaluation.

The development promotion workflow is as such:

1. Work on a feature branch
2. Pull request the `develop` branch
3. `develop` branch is merged into master when ready

This project is semantically versioned. Changes that break compatibility with
the remote API are considered breaking changes.

### Debugging

When in doubt: delete the node modules folder and npm install again.

```bash
rm -rf node_modules
npm cache clean
npm i --progress=false
```

### Project Structure

Source lives in `src/`. Compiled output goes in `dist/`. Configuration goes in
`config/`.

#### Source Files

- `containers/`: [Stateful][dumb-comp] react components. These are usually top-level route handlers.
- `components/`: [Stateless/Dumb][dumb-comp] react components. These guys determininstically render based on props.


### Configuration Values

Configuration values are stored in the `config/` directory. You gain access to the configuration values by importing the config object from `config/index.js`. The configuration values are loaded as such:

1. The values in `config/default.js`
2. The values in `config/{{APP_ENV}}.js` where `APP_ENV` is an environment variable.
3. If `APP_ENV` is not set, `config/development.js` will be loaded by default.

[the logic for loading the config is here](https://github.com/UTD-CRSS/app.exploreapollo.org/blob/master/config/index.js).

#### Example

We use the configuration file to determine the API entry point in our actions.

1. [import the configuration object](https://github.com/UTD-CRSS/app.exploreapollo.org/blob/a999375d881ed763fd18b852b402582b5a6e647b/src/actions/index.js#L5)
2. [use the configuration object](https://github.com/UTD-CRSS/app.exploreapollo.org/blob/a999375d881ed763fd18b852b402582b5a6e647b/src/actions/index.js#L31)
3. If the `APP_ENV` is set to `staging`, [this](https://github.com/UTD-CRSS/app.exploreapollo.org/blob/a999375d881ed763fd18b852b402582b5a6e647b/config/staging.js#L3) will be the value for `config.apiEntry`.

Consider the following example commands:

```bash
npm run dev                     # runs dev server with development API
APP_ENV=staging npm run dev     # runs dev server with staging API
APP_ENV=production npm run dev  # runs dev server with production API
```

[nvm]: https://github.com/creationix/nvm
[jest]: https://facebook.github.io/jest/
[dumb-comp]: https://github.com/uberVU/react-guide/blob/master/props-vs-state.md#component-types
