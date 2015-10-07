# app.exploreapollo.org

[![Build Status](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org.svg?branch=master)](https://travis-ci.org/UTD-CRSS/app.exploreapollo.org)
[![Dependency Status](https://david-dm.org/UTD-CRSS/app.exploreapollo.org.svg)](https://david-dm.org/UTD-CRSS/app.exploreapollo.org)
[![devDependency Status](https://david-dm.org/UTD-CRSS/app.exploreapollo.org/dev-status.svg)](https://david-dm.org/UTD-CRSS/app.exploreapollo.org#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/utd-crss.svg)](https://saucelabs.com/u/utd-crss)

## Development

This project requires Node 4.X and npm 3.X You should install node using [nvm][].

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

### Project Structure

Source lives in `src/`. Compiled output goes in `dist/`.

#### Source Files

- `containers/`: [Stateful][dumb-comp] react components. These are usually top-level route handlers.
- `components/`: [Stateless/Dumb][dumb-comp] react components. These guys determininstically render based on props.

[nvm]: https://github.com/creationix/nvm
[jest]: https://facebook.github.io/jest/
[dumb-comp]: https://github.com/uberVU/react-guide/blob/master/props-vs-state.md#component-types
